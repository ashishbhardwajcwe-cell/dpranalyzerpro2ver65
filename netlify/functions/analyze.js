/**
 * analyze.js - AI Document Analysis Function
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * SECURITY: The Anthropic API key, system prompt, and IRC reference data
 * are NEVER exposed to the frontend. All analysis logic lives here only.
 *
 * Input  (POST JSON):
 *   { token, document_name, project_name, file_type,
 *     document_text? | document_base64? }
 *
 * Supported file types:
 *   Excel (.xlsx/.xls) → converted to CSV text IN THE BROWSER (SheetJS),
 *                        arrives as document_text
 *   CSV / Text (.csv/.txt) → read as text in the browser, arrives as document_text
 *   PDF              → arrives as document_base64, sent as base64 document to Anthropic
 *   Word (.doc/.docx) → arrives as document_base64, text extracted server-side
 *   PowerPoint (.ppt/.pptx) → arrives as document_base64, text extracted server-side
 *   (Legacy base64 Excel uploads still parse server-side with xlsx for compatibility.)
 *
 * Flow:
 *   1. Validate token + check remaining analyses
 *   2. Rate-limit check (max 10/hour per token)
 *   3. Load IRC reference MD files from irc-data/ (server-side only)
 *   4. Extract/decode document content based on file type
 *   5. Build prompt and call Anthropic API (no token limit)
 *   6. Parse JSON response
 *   7. ONLY on success: increment analyses_used and write usage_log
 *   8. Return analysis result to frontend
 */

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');
const XLSX = require('xlsx');
const mammoth = require('mammoth');
const officeParser = require('officeparser');

// Standard CORS headers
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// IRC reference files to load (order matters — most important first)
const IRC_FILES = [
  'MoRTH_DPR_Reference_Extract.md',
  'IRC_37_2018_Extracted.md',
  'IRC_52_2019_Extraction.md',
  'IRC_SP19_DPR_Analyzer_Extraction.md',
  'IRC_SP48_2023_DPR_Analyzer_Extraction.md',
  'IRC_73_1980_Extraction.md',
  'IRC_SP13_DPR_Analyzer_Extraction.md',
  'IRC_SP42_2014_DPR_Analyzer_Extraction.md',
];

// The irc-data folder path (relative to the function at runtime)
const IRC_DATA_DIR = path.join(__dirname, '..', '..', 'irc-data');

/**
 * Loads all available IRC reference files from irc-data/.
 * Logs which files are found/missing so Netlify logs are auditable.
 * Missing files are silently skipped — they never crash the function.
 */
function loadIrcReferenceContent() {
  let combined = '';
  let loaded = 0;
  for (const filename of IRC_FILES) {
    const filePath = path.join(IRC_DATA_DIR, filename);
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        combined += `\n\n=== ${filename} ===\n${content}`;
        loaded++;
        console.log(`IRC file loaded: ${filename} (${content.length} chars)`);
      } else {
        console.log(`IRC file not found (skipped): ${filename}`);
      }
    } catch (err) {
      console.warn(`Could not read IRC file ${filename}:`, err.message);
    }
  }
  console.log(`IRC reference: ${loaded}/${IRC_FILES.length} files loaded`);
  return combined;
}

/**
 * Determines file category from filename extension.
 * Returns one of: pdf | excel | csv | word | ppt | text | unknown
 */
function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.pdf')                       return 'pdf';
  if (ext === '.xlsx' || ext === '.xls')    return 'excel';
  if (ext === '.csv')                       return 'csv';
  if (ext === '.doc' || ext === '.docx')    return 'word';
  if (ext === '.ppt' || ext === '.pptx')    return 'ppt';
  if (ext === '.txt')                       return 'text';
  return 'unknown';
}

/**
 * Extracts readable text from non-PDF documents.
 * Returns { text, error } — text is null on failure.
 *
 * PDF files skip this function and go directly to Anthropic as base64.
 */
async function extractTextFromFile(buffer, filename, fileType) {
  try {
    if (fileType === 'excel') {
      // Parse every sheet and render each as CSV with a sheet-name header
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const parts = workbook.SheetNames.map((sheetName) => {
        const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        return `=== Sheet: ${sheetName} ===\n${csv}`;
      });
      return { text: parts.join('\n\n'), error: null };
    }

    if (fileType === 'csv' || fileType === 'text') {
      return { text: buffer.toString('utf8'), error: null };
    }

    if (fileType === 'word') {
      // mammoth gives cleaner plain-text output for .docx;
      // fall back to officeparser for older .doc binary format
      const ext = path.extname(filename).toLowerCase();
      if (ext === '.docx') {
        const result = await mammoth.extractRawText({ buffer });
        return { text: result.value, error: null };
      }
      // .doc → officeparser v7 (parseOffice is async, accepts Buffer)
      const text = await officeParser.parseOffice(buffer, { outputErrorToConsole: false });
      return { text, error: null };
    }

    if (fileType === 'ppt') {
      // officeparser v7 handles both .ppt and .pptx
      const text = await officeParser.parseOffice(buffer, { outputErrorToConsole: false });
      return { text, error: null };
    }

    return { text: null, error: `Unsupported file type: ${path.extname(filename)}` };
  } catch (err) {
    return { text: null, error: `Failed to parse ${path.extname(filename)} file: ${err.message}` };
  }
}

/**
 * Rate limit check: max 10 analyses per token per hour.
 * Queries usage_log for entries in the last 60 minutes.
 */
async function checkRateLimit(supabase, firmId) {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from('usage_log')
    .select('id', { count: 'exact', head: true })
    .eq('firm_id', firmId)
    .gte('analysis_timestamp', oneHourAgo);

  if (error) return false; // Fail open — don't block on DB error
  return count < 10;
}

// System prompt embedded server-side — never sent to frontend.
// This is the proven "model 63" prompt — do not alter the wording.
const SYSTEM_PROMPT = `You are an expert DPR (Detailed Project Report) reviewer for Road/Highway infrastructure projects in India, particularly hill and mountain roads for Border Roads Organisation. Analyze the DPR document uploaded against the IRC reference documents provided and standard regulatory requirements.

Perform a thorough compliance check and identify ALL deficiencies, errors, missing elements, and non-compliance issues.

IMPORTANT: If the DPR data is in spreadsheet/tabular format, carefully analyze the data in each sheet - check quantities, rates, specifications, design parameters, etc.

Respond ONLY with a valid JSON object (no markdown, no backticks, no explanation before or after) in this exact format:
{
  "project_name": "string",
  "analysis_date": "string in DD/MM/YYYY format",
  "compliance_score": number 0 to 100,
  "executive_summary": "2-3 sentence overall assessment of DPR quality and completeness",
  "total_findings": number,
  "critical_count": number,
  "major_count": number,
  "minor_count": number,
  "observation_count": number,
  "findings": [
    {
      "finding_number": number,
      "severity": "critical|major|minor|observation",
      "title": "Short clear title of the issue",
      "clause_reference": "Reference clause from provided documents (e.g. IRC:37 Cl.4.2, MoRTH Cl.300)",
      "description": "Detailed explanation of what is wrong or missing",
      "recommendation": "Specific actionable fix",
      "page_reference": "Location in the DPR document"
    }
  ],
  "overall_recommendation": "string"
}

Severity definitions:
- critical: Missing mandatory components, safety hazards, major code violations, structural concerns
- major: Significant non-compliance, wrong methodology, missing calculations, incorrect design parameters
- minor: Incomplete data, minor deviations, formatting issues, unclear descriptions
- observation: Suggestions for improvement, best practice recommendations, nice-to-have items

Thoroughly check for:
1. Traffic survey data - adequacy, methodology, PCU factors, design traffic estimation (IRC:SP:19)
2. Geometric design - horizontal/vertical alignment, cross-section, sight distance (IRC:73/IRC:86)
3. Pavement design - CBR values, traffic loading, layer thickness, methodology (IRC:37/IRC:58)
4. Drainage design - hydraulic calculations, cross-drainage structures, side drains (IRC:SP:42)
5. Road safety provisions - audit, signage, markings, crash barriers (IRC:SP:55)
6. Environmental assessment - EIA/EMP, NOCs, clearances
7. Land acquisition - details, ROW, encumbrances
8. Cost estimation - BOQ completeness, rate analysis, contingency, price escalation
9. Material specifications - compliance with MoRTH 5th Revision
10. Bridge/culvert design - loading, foundations, scour depth (IRC:6/IRC:112/IRC:SP:13)
11. Survey and investigation - topographic, soil, geological, hydrological
12. Drawings - GAD, L-section, cross-sections, typical details
13. Utility shifting and relocation plans
14. Implementation schedule - milestones, critical path
15. Quality control and assurance plan

Cite ONLY clause numbers that appear in the reference documents provided. Do not hallucinate clause numbers.

Generate 15 to 20 findings with natural severity distribution across all four levels. Every real DPR has issues. Be thorough and evaluate all engineering disciplines equally.`;

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Parse request body
  // The frontend may send EITHER document_text (Excel/CSV/Text already
  // converted to text in the browser) OR document_base64 (PDF/Word/PPT raw
  // bytes). file_type is a hint from the client describing the original format.
  let token, documentBase64, documentText, documentName, projectName, fileTypeHint;
  try {
    const body = JSON.parse(event.body || '{}');
    token          = (body.token || '').trim();
    documentBase64 = body.document_base64 || '';
    documentText   = body.document_text || '';
    documentName   = (body.document_name || 'Unnamed Document').trim();
    projectName    = (body.project_name || 'Unnamed Project').trim();
    fileTypeHint   = (body.file_type || '').trim().toLowerCase();
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  if (!token || (!documentBase64 && !documentText)) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Token and document are required' }),
    };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('analyze.js: missing Supabase env vars');
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Server misconfiguration: database credentials not set. Contact support.' }),
    };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('analyze.js: missing ANTHROPIC_API_KEY');
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Server misconfiguration: AI credentials not set. Contact support.' }),
    };
  }

  try {
    // Initialise clients
    const supabase  = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, { realtime: { transport: ws } });
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    // Step 1: Validate token and get firm details
    const { data: firm, error: firmError } = await supabase
      .from('firms')
      .select('id, firm_name, analyses_total, analyses_used, is_active, expiry_date')
      .eq('access_token', token)
      .single();

    if (firmError || !firm) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Invalid access token' }),
      };
    }

    if (!firm.is_active) {
      return {
        statusCode: 403,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Account deactivated. Contact auris8.office@gmail.com' }),
      };
    }

    if (firm.expiry_date) {
      const expiry = new Date(firm.expiry_date);
      expiry.setHours(23, 59, 59, 999);
      if (expiry < new Date()) {
        return {
          statusCode: 403,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'License expired. Contact AURIS to renew.' }),
        };
      }
    }

    // Step 2: Check analyses remaining
    const analysesRemaining = firm.analyses_total - firm.analyses_used;
    if (analysesRemaining <= 0) {
      return {
        statusCode: 402,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'No analyses remaining. Contact auris8.office@gmail.com to top up.' }),
      };
    }

    // Step 3: Rate limit check (max 10/hour)
    const withinRateLimit = await checkRateLimit(supabase, firm.id);
    if (!withinRateLimit) {
      return {
        statusCode: 429,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Rate limit exceeded. Maximum 10 analyses per hour per token.' }),
      };
    }

    // Step 4: Load IRC reference files (server-side only)
    const ircContent = loadIrcReferenceContent();
    const ircSection = ircContent
      ? `\n\n=== IRC AND MoRTH REFERENCE DOCUMENTS ===\n${ircContent}`
      : '\n\n[Note: IRC reference files not yet loaded. Apply general IRC/MoRTH knowledge.]';

    // Step 5: Determine file type and build the appropriate message content.
    // Prefer the client-supplied file_type hint; fall back to the extension.
    const fileType = fileTypeHint || getFileType(documentName);

    const baseUserText = `Analyze the following DPR document for compliance.

Project Name: ${projectName}
Document Name: ${documentName}
File Type: ${fileType.toUpperCase()}
Analysis Date: ${new Date().toLocaleDateString('en-GB')}
${ircSection}

Analyze the document thoroughly and return the compliance findings in the exact JSON format specified.`;

    // Token-budget guard. Claude's window is 200K tokens (input + output). We
    // target <=175K INPUT so the output still fits with margin. Spreadsheet/CSV
    // data tokenises unpredictably, so we DON'T guess from character counts —
    // we ask the real tokenizer (count_tokens) and trim the document until it
    // actually fits, then report how much was analyzed.
    const MAX_OUTPUT_TOKENS   = 16000;   // output budget — ample for 15-20 findings
    const TARGET_INPUT_TOKENS = 175000;  // 175K in + 16K out = 191K, under 200K

    let truncationNotice = '';

    const MODEL = 'claude-haiku-4-5-20251001';

    async function countInputTokens(content) {
      const r = await anthropic.messages.countTokens({
        model:    MODEL,
        system:   SYSTEM_PROMPT,
        messages: [{ role: 'user', content }],
      });
      return r.input_tokens;
    }

    function buildTextContent(docText, truncated) {
      const tail = truncated
        ? '\n\n=== [DOCUMENT TRUNCATED to fit the model size limit] ==='
        : '';
      return [{ type: 'text', text: `${baseUserText}\n\n=== DOCUMENT CONTENT ===\n${docText}${tail}` }];
    }

    let messageContent;

    if (!documentText && fileType === 'pdf') {
      // PDFs go to Anthropic as a native base64 document (no text trimming)
      messageContent = [
        {
          type: 'document',
          source: {
            type: 'base64',
            media_type: 'application/pdf',
            data: documentBase64,
          },
        },
        { type: 'text', text: baseUserText },
      ];
    } else {
      // Text-based path: Excel/CSV/Text arrive as document_text; Word/PPT (and
      // any legacy base64 upload) are extracted server-side.
      let docText;
      if (documentText) {
        docText = documentText;
      } else {
        const docBuffer = Buffer.from(documentBase64, 'base64');
        const { text: extractedText, error: extractError } = await extractTextFromFile(docBuffer, documentName, fileType);

        if (extractError || !extractedText) {
          return {
            statusCode: 422,
            headers: CORS_HEADERS,
            body: JSON.stringify({
              error: extractError || `Could not extract content from ${path.extname(documentName)} file. Please check the file is not corrupted.`,
            }),
          };
        }
        docText = extractedText;
      }

      // Trim the document until the REAL input token count fits the budget.
      const originalLen = docText.length;
      let truncated = false;
      let content   = buildTextContent(docText, truncated);

      try {
        for (let pass = 0; pass < 6; pass++) {
          const tokens = await countInputTokens(content);
          if (tokens <= TARGET_INPUT_TOKENS) break;
          // Shrink the document proportionally, with a 6% safety cut each pass
          const ratio  = (TARGET_INPUT_TOKENS / tokens) * 0.94;
          const newLen = Math.max(0, Math.floor(docText.length * ratio));
          docText   = docText.slice(0, newLen);
          truncated = true;
          content   = buildTextContent(docText, truncated);
        }
      } catch (countErr) {
        // count_tokens unavailable → fall back to a conservative char cap
        // (2.6 chars/token is deliberately low so dense CSV still fits)
        console.warn('analyze.js: count_tokens failed, using char fallback:', countErr.message);
        const overhead  = SYSTEM_PROMPT.length + baseUserText.length + 256;
        const docBudget = Math.max(0, Math.floor(TARGET_INPUT_TOKENS * 2.6 - overhead));
        if (docText.length > docBudget) {
          docText   = docText.slice(0, docBudget);
          truncated = true;
        }
        content = buildTextContent(docText, truncated);
      }

      if (truncated) {
        const keptPct = Math.max(1, Math.round((docText.length / originalLen) * 100));
        truncationNotice =
          `The uploaded document was very large; approximately the first ${keptPct}% was analyzed ` +
          `to stay within the model's size limit. For complete coverage, split the document into ` +
          `smaller files and analyze each separately.`;
        console.log(`analyze.js: document truncated to ~${keptPct}% to fit token budget`);
      }

      messageContent = content;
    }

    // Step 6: Call Anthropic using streaming to handle long responses reliably.
    // Collect the full streamed response before processing.
    let rawText;
    try {
      const stream = await anthropic.messages.stream({
        model:      MODEL,
        max_tokens: MAX_OUTPUT_TOKENS,
        system:     SYSTEM_PROMPT,
        messages:   [{ role: 'user', content: messageContent }],
      });
      const message = await stream.finalMessage();
      rawText = message.content
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('');
    } catch (streamErr) {
      console.error('Anthropic streaming error:', streamErr);
      const errMsg = streamErr.message || String(streamErr);
      if (errMsg.includes('timeout') || errMsg.includes('timed out')) {
        return {
          statusCode: 504,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Analysis timed out. Try a smaller document or split across multiple files.' }),
        };
      }
      if (errMsg.includes('401') || errMsg.includes('authentication')) {
        return {
          statusCode: 500,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Server configuration error: invalid API credentials. Contact support.' }),
        };
      }
      return {
        statusCode: 502,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Analysis service error: ' + errMsg.substring(0, 200) }),
      };
    }

    // Step 7: Parse JSON response
    let analysisResult;
    try {
      // Strip any accidental markdown backticks before parsing
      const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
      analysisResult = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Failed to parse Anthropic response as JSON:', parseErr);
      console.error('Raw response (first 800 chars):', rawText.substring(0, 800));
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Analysis returned malformed data. Please retry — if the problem persists contact support.' }),
      };
    }

    // Ensure project_name is always set
    if (!analysisResult.project_name) {
      analysisResult.project_name = projectName;
    }

    // If the document was trimmed to fit the token budget, tell the user.
    if (truncationNotice) {
      analysisResult.truncated = true;
      analysisResult.truncation_notice = truncationNotice;
      analysisResult.executive_summary =
        (analysisResult.executive_summary ? analysisResult.executive_summary + ' ' : '') +
        '[' + truncationNotice + ']';
    }

    // Step 8: ONLY on success — increment usage and write log
    const { error: updateError } = await supabase
      .from('firms')
      .update({ analyses_used: firm.analyses_used + 1 })
      .eq('id', firm.id);

    if (updateError) {
      console.error('Failed to increment analyses_used:', updateError);
      // Do not block the response; log the issue
    }

    const { error: logError } = await supabase
      .from('usage_log')
      .insert({
        firm_id:          firm.id,
        firm_name:        firm.firm_name,
        project_name:     projectName,
        document_name:    documentName,
        analyses_before:  analysesRemaining,
        analyses_after:   analysesRemaining - 1,
        status:           'success',
      });

    if (logError) {
      console.error('Failed to write usage_log:', logError);
    }

    // Step 9: Return result to frontend
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        analyses_remaining: analysesRemaining - 1,
        result: analysisResult,
      }),
    };
  } catch (err) {
    console.error('analyze.js unhandled error:', err.name, err.message, err.stack);
    const msg = err.message || String(err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Unexpected server error: ' + msg.substring(0, 200) }),
    };
  }
};
