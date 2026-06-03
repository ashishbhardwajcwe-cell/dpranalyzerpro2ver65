/**
 * analyze-background.js - Heavy Anthropic Worker (Netlify Background Function)
 * AURIS DPR Analyzer
 *
 * Netlify auto-detects the "-background" filename suffix and runs this
 * function with a 15-minute timeout (vs. 26s for sync functions). The
 * client never sees the response body — Netlify replies 202 immediately
 * and lets this function continue in the background.
 *
 * The function reads its work from the analysis_jobs table (queued by
 * analyze.js) and writes the result back to the same row. The frontend
 * polls analyze-status to retrieve it.
 *
 * SECURITY:
 *   - The Anthropic API key, system prompt, IRC reference text, and
 *     the rich schema definition NEVER leave this function.
 *   - The function decrements credits and writes the usage_log row
 *     only on successful analysis (matches v63's behaviour).
 *
 * Input  (POST JSON):  { job_id }
 * Output:              Netlify-managed 202 (body discarded)
 */

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');
const XLSX = require('xlsx');
const mammoth = require('mammoth');
const officeParser = require('officeparser');

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

const IRC_DATA_DIR = path.join(__dirname, '..', '..', 'irc-data');

// Pre-load IRC files once at cold start. They're identical across all
// requests, server-side only, and never sent back to the browser.
let IRC_CACHE = null;
function loadIrc() {
  if (IRC_CACHE !== null) return IRC_CACHE;
  const blocks = [];
  let loaded = 0;
  for (const filename of IRC_FILES) {
    const filePath = path.join(IRC_DATA_DIR, filename);
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        // v63 framing: each block prefixed with [IRC REFERENCE: filename]
        // so the model can cite the source verbatim.
        blocks.push(`[IRC REFERENCE: ${filename}]\n${content}`);
        loaded++;
      } else {
        console.warn(`IRC file not found: ${filename}`);
      }
    } catch (err) {
      console.warn(`Could not read IRC file ${filename}:`, err.message);
    }
  }
  console.log(`IRC reference: ${loaded}/${IRC_FILES.length} files loaded`);
  IRC_CACHE = { blocks, loaded };
  return IRC_CACHE;
}

function getFileType(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === '.pdf')                    return 'pdf';
  if (ext === '.xlsx' || ext === '.xls') return 'excel';
  if (ext === '.csv')                    return 'csv';
  if (ext === '.doc'  || ext === '.docx') return 'word';
  if (ext === '.ppt'  || ext === '.pptx') return 'ppt';
  if (ext === '.txt')                    return 'text';
  return 'unknown';
}

async function extractTextFromFile(buffer, filename, fileType) {
  try {
    if (fileType === 'excel') {
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
      const ext = path.extname(filename).toLowerCase();
      if (ext === '.docx') {
        const result = await mammoth.extractRawText({ buffer });
        return { text: result.value, error: null };
      }
      const text = await officeParser.parseOffice(buffer, { outputErrorToConsole: false });
      return { text, error: null };
    }
    if (fileType === 'ppt') {
      const text = await officeParser.parseOffice(buffer, { outputErrorToConsole: false });
      return { text, error: null };
    }
    return { text: null, error: `Unsupported file type: ${path.extname(filename)}` };
  } catch (err) {
    return { text: null, error: `Failed to parse ${path.extname(filename)} file: ${err.message}` };
  }
}

// ============================================================
// v63 SYSTEM PROMPT (verbatim — proven to produce correct output)
// ============================================================
const SYSTEM_PROMPT =
  'You are a senior highway design auditor with 20+ years experience in IRC Codes, ' +
  'MoRTH Specifications (5th Revision), Bridge and Culvert Codes, Pavement Design, ' +
  'Geometric Design, Road Safety, Drainage, Land Acquisition and Environmental norms. ' +
  'You perform professional DPR compliance audits for Indian Road/Highway projects. ' +
  'You are technically rigorous. You NEVER hallucinate clause numbers. Every deficiency ' +
  'you produce MUST cite a specific document (e.g. IRC:SP:42), an exact clause number ' +
  '(e.g. Clause 4.3.2), a one-line summary of what that clause requires, and a precise ' +
  "description of how the DPR fails it. If — and only if — a relevant clause is not " +
  "present in the loaded reference documents, you must emit the finding as 'General " +
  "Observation — clause reference not available' rather than invent a clause number. " +
  'Code references that have no [IRC REFERENCE: filename] block above are NOT loaded ' +
  'and must not be cited.';

// ============================================================
// v63 USER INSTRUCTIONS (rich schema, snake_case for v65 frontend)
// ============================================================
function buildAnalysisInstructions(projectName, documentName, fileType) {
  return [
    `Analyze the DPR document(s) above against IRC and MoRTH regulatory requirements.`,
    ``,
    `Report header (use these names/IDs when referring to the project):`,
    `- Project Name: ${projectName}`,
    `- Document: ${documentName}`,
    `- File Type: ${fileType.toUpperCase()}`,
    `- Analysis Date: ${new Date().toLocaleDateString('en-GB')}`,
    ``,
    `Perform a professional DPR compliance audit specifically for an Indian highway / ` +
      `hill / mountain road project. PRIORITY CODES: IRC:SP:48 (Hill Road Design — hairpin ` +
      `bends, formation width, hill cutting, retaining walls, side drains), IRC:52 ` +
      `(Mountain Roads), IRC:73 (Geometric Design — gradients, curves, sight distance), ` +
      `IRC:37 (Flexible Pavement), IRC:SP:13 (Culverts and minor bridges), IRC:SP:42 ` +
      `(Drainage — especially cross drainage in hill terrain, catch water drains, scuppers), ` +
      `IRC:SP:19 (Traffic survey & PCU), MoRTH 5th Revision (material specifications, BOQ). ` +
      `Check all of: traffic data, geometric design, pavement, drainage, safety, ` +
      `environmental, land acquisition, cost estimation, material specs, bridges/culverts, ` +
      `survey, drawings, utilities, schedule, quality plan.`,
    ``,
    `CLAUSE-LEVEL CITATION RULES (MANDATORY):`,
    `Every deficiency MUST be backed by a specific clause from a loaded [IRC REFERENCE: filename] ` +
      `block. For every finding you MUST populate ALL of these fields:`,
    `  - document_name: the exact document code, e.g. "IRC:SP:42", "IRC:73", "IRC:SP:48", "MoRTH 5th Revision". ` +
      `Take this from the [IRC REFERENCE: filename] header of the document you pulled the clause from.`,
    `  - clause_number: the exact clause/section/table number as printed in that document, ` +
      `e.g. "Clause 4.3.2", "Section 5.4", "Table 3.1". DO NOT invent or paraphrase. Quote it verbatim.`,
    `  - clause_summary: a SINGLE concise line (max 30 words) stating what that specific clause requires.`,
    `  - failure_reason: a precise statement of HOW the DPR fails to meet this specific clause — ` +
      `quote the value/text from the DPR and contrast it with the clause's requirement.`,
    `If — and only if — the relevant clause cannot be located inside any [IRC REFERENCE: filename] ` +
      `block above, you MUST set:`,
    `  - document_name: "General Observation"`,
    `  - clause_number: "N/A"`,
    `  - clause_summary: "General Observation — clause reference not available"`,
    `  - failure_reason: still describe how the DPR is deficient on this point.`,
    `NEVER fabricate a clause number. NEVER cite a code whose [IRC REFERENCE] block is not ` +
      `present above. If unsure, fall back to the General Observation form.`,
    ``,
    `The legacy "clause_reference" field MUST still be populated for backwards compatibility — ` +
      `set it to document_name + " " + clause_number (e.g. "IRC:SP:42 Clause 4.3.2"), or ` +
      `"General Observation" when the clause is unavailable.`,
    ``,
    `CRITICAL: Output ONLY a single valid JSON object. No markdown. No backticks. No text ` +
      `before or after. No trailing commas. Ensure every array and object is properly closed.`,
    ``,
    `The output report will be used as a working guideline for engineers to carry out ` +
      `amendments in the DPR. So provide DETAILED and SPECIFIC information in every field.`,
    ``,
    `Use this exact JSON shape:`,
    `{`,
    `  "project_name": "${projectName}",`,
    `  "analysis_date": "DD/MM/YYYY",`,
    `  "compliance_score": <0-100>,`,
    `  "risk_level": "Low | Moderate | High | Severe",`,
    `  "executive_summary": "4-5 sentence overview of DPR quality, key gaps, and overall compliance assessment",`,
    `  "overall_recommendation": "2-3 sentence top-line action plan for the engineering team",`,
    `  "total_findings": <number>,`,
    `  "critical_count": <number>,`,
    `  "major_count": <number>,`,
    `  "minor_count": <number>,`,
    `  "observation_count": <number>,`,
    `  "findings": [`,
    `    {`,
    `      "finding_number": <1-based integer>,`,
    `      "severity": "critical | major | minor | observation",`,
    `      "compliance_type": "Design | Documentation",`,
    `      "category": "Design | Pavement | Drainage | Safety | Cost | Survey | Structural | Environmental | Land | Utilities | Schedule | Quality | Documentation",`,
    `      "title": "Clear issue title",`,
    `      "document_name": "IRC:SP:42 | IRC:73 | MoRTH 5th Revision | ... | General Observation",`,
    `      "clause_number": "Clause 4.3.2 | Section 5.4 | Table 3.1 | N/A",`,
    `      "clause_reference": "document_name + space + clause_number for backwards compat",`,
    `      "clause_summary": "One-line summary of what that clause requires, or 'General Observation — clause reference not available'",`,
    `      "failure_reason": "How the DPR fails to meet this specific clause — quote DPR values vs clause requirement",`,
    `      "location": "Exact DPR location — sheet name, section, page, table, row number, chainage etc.",`,
    `      "page_reference": "Same as location (kept for backwards compat).",`,
    `      "description": "Detailed technical explanation of what is wrong, what is missing, or what does not comply. Include specific values found vs required values where applicable. 2-3 sentences.",`,
    `      "impact": "Detailed consequence if this deficiency is not corrected — structural risk, cost overrun, safety hazard, project delay, regulatory rejection etc. 2-3 sentences.",`,
    `      "recommendation": "Step-by-step actionable fix with specific standards to follow, calculations to perform, data to collect, or sections to add. 2-3 sentences.",`,
    `      "corrective_action": "A precise, numbered Recommended Corrective Action the design team can execute — what to redo, recalculate, or insert, in concrete engineering terms. 2-3 sentences.",`,
    `      "severity_justification": "Explanation of why this finding is Critical / Major / Minor / Observation, anchored in the cited clause (e.g. 'Critical because IRC:SP:48 Clause 6.2 mandates minimum hairpin radius of 14 m for hill roads carrying buses; DPR shows 9 m — direct safety hazard.'). 1-2 sentences."`,
    `    }`,
    `  ]`,
    `}`,
    ``,
    `compliance_type rules: use "Documentation" for findings about missing/incomplete documents, ` +
      `signatures, drawings, registers, certifications, NOCs, approvals or report sections. Use ` +
      `"Design" for everything substantive about geometry, pavement, drainage, structures, ` +
      `safety, materials, calculations, BOQ correctness, etc.`,
    ``,
    `Severity definitions: critical = direct safety hazard or mandatory IRC/MoRTH code violation; ` +
      `major = significant technical flaw or missing mandatory calculation; minor = incomplete ` +
      `or insufficient data, missing supporting documents, inadequate detail; observation = ` +
      `suggestion for improvement or best practice recommendation. A well-prepared DPR will ` +
      `typically have a balanced mix of all four severity levels. Provide detailed content in ` +
      `description, impact, recommendation, corrective_action fields (2-3 sentences each). ` +
      `Minimum 12 findings. Maximum 20.`,
  ].join('\n');
}

// Token-budget calibration (per v65 history):
//   ~2.5 chars/token for dense spreadsheet CSV
//   ~3.5 chars/token for prose / extracted Word/PDF text
// We use 3.0 as a safe middle ground.
//
// Claude Haiku 4.5 context window: 200,000 tokens
// IRC reference text: ~220,000 chars = ~73,000 tokens
// Output reserve: 32,000 tokens
// Therefore document budget = 200K - 73K - 32K - 5K headroom = 90K tokens = ~270K chars
// We keep IRC loaded up to 400K char documents, then trim the document
// (the model retains the most-prominent IRC knowledge from training).
const IRC_DROP_CHARS = 400_000;
const DOC_TRIM_CHARS = 270_000;
const MODEL          = 'claude-haiku-4-5-20251001';
const MAX_OUTPUT     = 32000;       // matches v63 — prevents JSON truncation
const MAX_RETRIES    = 3;

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function callAnthropicWithRetry(anthropic, messageContent) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const stream = await anthropic.messages.stream({
        model:      MODEL,
        max_tokens: MAX_OUTPUT,
        system:     SYSTEM_PROMPT,
        messages:   [{ role: 'user', content: messageContent }],
      });
      const message = await stream.finalMessage();
      return message.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
    } catch (err) {
      lastErr = err;
      const msg = (err && err.message) ? err.message : String(err);
      const is429 = err.status === 429 || /\b429\b|rate.?limit/i.test(msg);
      const is5xx = err.status >= 500 || /\b50\d\b|timeout|timed out|fetch/i.test(msg);
      if ((is429 || is5xx) && attempt < MAX_RETRIES) {
        const waitSec = Math.min(30 * attempt, 120);          // 30s → 60s → 120s
        console.warn(`analyze-background: attempt ${attempt} failed (${msg.substring(0, 120)}). Retrying in ${waitSec}s.`);
        await sleep(waitSec * 1000);
        continue;
      }
      throw err;
    }
  }
  throw lastErr;
}

function cleanJSON(s) {
  if (!s) return '';
  return s.replace(/^﻿/, '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
}

// Normalize the parsed response so the frontend's expected fields are always
// present, regardless of small variations in what the model emitted.
function normalizeResult(parsed, projectName) {
  parsed.project_name = parsed.project_name || projectName;
  parsed.analysis_date = parsed.analysis_date || new Date().toLocaleDateString('en-GB');
  parsed.risk_level = parsed.risk_level || 'Moderate';
  parsed.executive_summary = parsed.executive_summary || '';
  parsed.overall_recommendation = parsed.overall_recommendation || '';
  if (typeof parsed.compliance_score !== 'number') {
    const n = parseInt(parsed.compliance_score, 10);
    parsed.compliance_score = isNaN(n) ? 50 : n;
  }

  const findings = Array.isArray(parsed.findings) ? parsed.findings : [];
  parsed.findings = findings
    .filter((f) => f && f.title && f.severity)
    .map((f, i) => {
      const sev = ['critical', 'major', 'minor', 'observation'].includes(f.severity)
        ? f.severity : 'observation';

      const docName    = (f.document_name && String(f.document_name).trim()) || '';
      const clauseNum  = (f.clause_number && String(f.clause_number).trim()) || '';
      const isGeneral  = !docName || !clauseNum || /general observation/i.test(docName);

      const document_name = isGeneral ? 'General Observation' : docName;
      const clause_number = isGeneral ? 'N/A' : clauseNum;
      const clause_reference = f.clause_reference
        || (isGeneral ? 'General Observation' : `${document_name} ${clause_number}`);
      const clause_summary = f.clause_summary
        || (isGeneral ? 'General Observation — clause reference not available' : '');

      const location       = f.location       || f.page_reference || '';
      const page_reference = f.page_reference || location;

      const docCats = { Documentation: true };
      const compliance_type =
        f.compliance_type === 'Design' || f.compliance_type === 'Documentation'
          ? f.compliance_type
          : (docCats[f.category] ? 'Documentation' : 'Design');

      return {
        finding_number:        f.finding_number || i + 1,
        severity:              sev,
        compliance_type,
        category:              f.category || 'Design',
        title:                 f.title,
        document_name,
        clause_number,
        clause_reference,
        clause_summary,
        failure_reason:        f.failure_reason || f.description || '',
        location,
        page_reference,
        description:           f.description || '',
        impact:                f.impact || '',
        recommendation:        f.recommendation || '',
        corrective_action:     f.corrective_action || f.recommendation || '',
        severity_justification: f.severity_justification
          || `Classified as ${sev} based on ${clause_reference}.`,
      };
    });

  // Recount severities
  const counts = { critical: 0, major: 0, minor: 0, observation: 0 };
  parsed.findings.forEach((f) => { counts[f.severity] = (counts[f.severity] || 0) + 1; });
  parsed.critical_count    = counts.critical;
  parsed.major_count       = counts.major;
  parsed.minor_count       = counts.minor;
  parsed.observation_count = counts.observation;
  parsed.total_findings    = parsed.findings.length;

  return parsed;
}

exports.handler = async (event) => {
  // Netlify background functions reply 202 to the caller automatically.
  // The body we return here is ignored. All real output goes to the DB.
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: '' };
  }

  let jobId;
  try {
    const body = JSON.parse(event.body || '{}');
    jobId = (body.job_id || '').trim();
  } catch {
    return { statusCode: 400, body: '' };
  }
  if (!jobId) {
    return { statusCode: 400, body: '' };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY || !process.env.ANTHROPIC_API_KEY) {
    console.error('analyze-background.js: missing env vars');
    return { statusCode: 500, body: '' };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { realtime: { transport: ws } },
  );

  // Mark job as processing (idempotent — if already processing/done, bail out)
  const { data: job, error: jobErr } = await supabase
    .from('analysis_jobs')
    .select('id, firm_id, firm_name, project_name, document_name, file_type, document_text, document_base64, analyses_before, status')
    .eq('id', jobId)
    .single();

  if (jobErr || !job) {
    console.error(`analyze-background: job ${jobId} not found`, jobErr);
    return { statusCode: 404, body: '' };
  }

  if (job.status !== 'pending') {
    console.warn(`analyze-background: job ${jobId} already in status ${job.status}; skipping.`);
    return { statusCode: 200, body: '' };
  }

  await supabase
    .from('analysis_jobs')
    .update({ status: 'processing', started_at: new Date().toISOString() })
    .eq('id', jobId);

  // Helper to write a terminal state and exit
  async function fail(message) {
    console.error(`analyze-background: job ${jobId} failed:`, message);
    await supabase
      .from('analysis_jobs')
      .update({
        status: 'failed',
        error_message: String(message).substring(0, 1000),
        completed_at: new Date().toISOString(),
      })
      .eq('id', jobId);
  }

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // ---- Load IRC and resolve document content ----
    const { blocks: ircBlocks, loaded: ircLoaded } = loadIrc();
    const fileType = (job.file_type || '').toLowerCase() || getFileType(job.document_name);

    let messageContent;
    let truncationNotice = '';
    let ircDropped       = false;

    if (!job.document_text && fileType === 'pdf' && job.document_base64) {
      // PDFs: pass through as native base64 document; IRC blocks first.
      messageContent = [
        ...ircBlocks.map((t) => ({ type: 'text', text: t })),
        {
          type: 'document',
          source: { type: 'base64', media_type: 'application/pdf', data: job.document_base64 },
        },
        {
          type: 'text',
          text: buildAnalysisInstructions(job.project_name, job.document_name, fileType),
        },
      ];
    } else {
      // Text-based path: Excel/CSV/Text arrive as document_text; Word/PPT
      // (and legacy base64 uploads) are extracted server-side.
      let docText = job.document_text;
      if (!docText && job.document_base64) {
        const buf = Buffer.from(job.document_base64, 'base64');
        const { text, error } = await extractTextFromFile(buf, job.document_name, fileType);
        if (error || !text) {
          await fail(error || `Could not extract content from ${path.extname(job.document_name)} file.`);
          return { statusCode: 200, body: '' };
        }
        docText = text;
      }
      if (!docText) {
        await fail('Document content is empty');
        return { statusCode: 200, body: '' };
      }

      const blocksOut = [];
      const origLen = docText.length;

      if (docText.length > IRC_DROP_CHARS) {
        ircDropped = true;
        blocksOut.push({
          type: 'text',
          text: '[Large document: IRC reference files omitted to fit model limit. Apply full IRC/MoRTH training knowledge for clause citations.]',
        });
      } else if (ircBlocks.length > 0) {
        ircBlocks.forEach((t) => blocksOut.push({ type: 'text', text: t }));
      }

      if (docText.length > DOC_TRIM_CHARS) {
        docText = docText.slice(0, DOC_TRIM_CHARS);
        const keptPct = Math.round((DOC_TRIM_CHARS / origLen) * 100);
        truncationNotice =
          `The uploaded document was very large; approximately the first ${keptPct}% was analyzed ` +
          `to stay within the model's size limit. For complete coverage, split the document into ` +
          `smaller files and analyze each separately.`;
      }

      blocksOut.push({
        type: 'text',
        text:
          buildAnalysisInstructions(job.project_name, job.document_name, fileType) +
          '\n\n=== DOCUMENT CONTENT ===\n' + docText +
          (truncationNotice ? '\n\n=== [DOCUMENT TRUNCATED to fit model limit — analyze the content above] ===' : ''),
      });

      messageContent = blocksOut;
    }

    console.log(`analyze-background: job ${jobId} — IRC loaded=${ircLoaded}, dropped=${ircDropped}, blocks=${messageContent.length}`);

    // ---- Call Anthropic with 3-attempt retry ----
    const rawText = await callAnthropicWithRetry(anthropic, messageContent);

    // ---- Parse & normalize ----
    let parsed;
    try {
      parsed = JSON.parse(cleanJSON(rawText));
    } catch (parseErr) {
      // Salvage attempt: extract the findings array if the JSON is partially malformed
      console.error('analyze-background: JSON parse failed, attempting salvage:', parseErr.message);
      try {
        const cleaned = cleanJSON(rawText);
        const sumMatch  = cleaned.match(/"executive_summary"\s*:\s*"((?:[^"\\]|\\.)*)"/);
        const scoreMatch = cleaned.match(/"compliance_score"\s*:\s*(\d+)/);
        const riskMatch  = cleaned.match(/"risk_level"\s*:\s*"([^"]*)"/);
        const findIdx = cleaned.indexOf('"findings"');
        if (findIdx === -1) throw new Error('no findings array');
        const arrStart = cleaned.indexOf('[', findIdx);
        let depth = 0, arrEnd = -1;
        for (let i = arrStart; i < cleaned.length; i++) {
          if (cleaned[i] === '[') depth++;
          if (cleaned[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
        }
        if (arrEnd === -1) arrEnd = cleaned.lastIndexOf(']');
        const arrStr = cleaned.substring(arrStart, arrEnd + 1)
          .replace(/,\s*\]/g, ']').replace(/,\s*\}/g, '}').replace(/\}\s*\{/g, '},{');
        parsed = {
          executive_summary: sumMatch ? sumMatch[1].replace(/\\"/g, '"').replace(/\\n/g, ' ') : 'Analysis complete.',
          compliance_score:  scoreMatch ? parseInt(scoreMatch[1], 10) : 50,
          risk_level:        riskMatch ? riskMatch[1] : 'Moderate',
          findings:          JSON.parse(arrStr),
        };
      } catch (salvageErr) {
        console.error('analyze-background: raw response (first 800 chars):', rawText.substring(0, 800));
        await fail('Analysis returned malformed data. Please retry.');
        return { statusCode: 200, body: '' };
      }
    }

    const result = normalizeResult(parsed, job.project_name);

    if (truncationNotice) {
      result.truncated = true;
      result.truncation_notice = truncationNotice;
      result.executive_summary =
        (result.executive_summary ? result.executive_summary + ' ' : '') +
        '[Note: ' + truncationNotice + ']';
    }
    if (ircDropped) {
      result.irc_dropped = true;
    }

    // ---- On success: write result, decrement credit, log usage ----
    await supabase
      .from('analysis_jobs')
      .update({
        status:            'complete',
        result_json:       result,
        truncation_notice: truncationNotice || null,
        completed_at:      new Date().toISOString(),
      })
      .eq('id', jobId);

    // Credit decrement (re-fetch latest count to avoid race conditions)
    const { data: firm } = await supabase
      .from('firms')
      .select('analyses_used, analyses_total')
      .eq('id', job.firm_id)
      .single();
    if (firm) {
      await supabase
        .from('firms')
        .update({ analyses_used: firm.analyses_used + 1 })
        .eq('id', job.firm_id);
    }

    await supabase
      .from('usage_log')
      .insert({
        firm_id:         job.firm_id,
        firm_name:       job.firm_name,
        project_name:    job.project_name,
        document_name:   job.document_name,
        analyses_before: job.analyses_before,
        analyses_after:  Math.max(0, (job.analyses_before || 1) - 1),
        status:          'success',
      });

    console.log(`analyze-background: job ${jobId} complete (${result.total_findings} findings).`);
    return { statusCode: 200, body: '' };
  } catch (err) {
    const msg = (err && err.message) || String(err);
    if (/401|authentication/i.test(msg)) {
      await fail('Server configuration error: invalid API credentials.');
    } else if (/timeout|timed out/i.test(msg)) {
      await fail('Analysis timed out. Try a smaller document or split it into sections.');
    } else {
      await fail('Analysis service error: ' + msg.substring(0, 200));
    }
    return { statusCode: 200, body: '' };
  }
};
