/**
 * analyze.js - AI Document Analysis Function
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * SECURITY: The Anthropic API key, system prompt, and IRC reference data
 * are NEVER exposed to the frontend. All analysis logic lives here only.
 *
 * Input  (POST JSON):
 *   { token, document_base64, document_name, project_name }
 *
 * Output (JSON): Full analysis result with findings array
 *
 * Flow:
 *   1. Validate token + check remaining analyses
 *   2. Rate-limit check (max 10/hour per token)
 *   3. Load IRC reference MD files from irc-data/ (server-side only)
 *   4. Build prompt with system message + IRC content
 *   5. Call Anthropic API (claude-haiku-4-5-20251001)
 *   6. Parse JSON response
 *   7. ONLY on success: increment analyses_used and write usage_log
 *   8. Return analysis to frontend
 */

const fs   = require('fs');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');
const { createClient } = require('@supabase/supabase-js');

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
  'IS_1893_Part1_2016_DPR_Reference.md',
];

// The irc-data folder path (relative to the function at runtime)
const IRC_DATA_DIR = path.join(__dirname, '..', '..', 'irc-data');

/**
 * Loads all available IRC reference files from irc-data/.
 * Files not yet placed are silently skipped.
 */
function loadIrcReferenceContent() {
  let combined = '';
  for (const filename of IRC_FILES) {
    const filePath = path.join(IRC_DATA_DIR, filename);
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        combined += `\n\n=== ${filename} ===\n${content}`;
      }
    } catch (err) {
      console.warn(`Could not read IRC file ${filename}:`, err.message);
    }
  }
  return combined;
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

// System prompt embedded server-side — never sent to frontend
const SYSTEM_PROMPT = `You are a senior highway design auditor with 20 plus years experience in IRC Codes and MoRTH Specifications 5th Revision. Analyze the provided DPR document for compliance deficiencies in hill and mountain road projects for Border Roads Organisation.

For each finding provide:
- clause_reference: specific IRC or MoRTH clause number from reference documents provided
- description: detailed explanation of what is wrong
- severity: critical, major, minor, or observation
- recommendation: specific corrective action
- page_reference: location in the DPR document

Severity definitions:
critical means safety hazards, structural failures, major code violations
major means significant non-compliance, design errors, missing calculations
minor means incomplete data, minor deviations, formatting issues
observation means best practice suggestions and improvements

Check all engineering disciplines equally: pavement design, geometric design, drainage, bridges, geotechnical, safety, traffic, environmental, cost estimation, materials.

Cite ONLY clause numbers that appear in the reference documents provided. Do not hallucinate clause numbers.

Return ONLY valid JSON with no markdown backticks:
{
  "project_name": "string",
  "analysis_date": "string in DD/MM/YYYY format",
  "total_findings": number,
  "critical_count": number,
  "major_count": number,
  "minor_count": number,
  "observation_count": number,
  "executive_summary": "2 to 3 sentence summary",
  "compliance_score": number between 0 and 100,
  "findings": [
    {
      "finding_number": number,
      "clause_reference": "string",
      "severity": "string",
      "title": "string",
      "description": "string",
      "recommendation": "string",
      "page_reference": "string"
    }
  ],
  "overall_recommendation": "string"
}

Generate 12 to 18 findings with natural severity distribution across all four levels.`;

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
  let token, documentBase64, documentName, projectName;
  try {
    const body = JSON.parse(event.body || '{}');
    token        = (body.token || '').trim();
    documentBase64 = body.document_base64 || '';
    documentName   = (body.document_name || 'Unnamed Document').trim();
    projectName    = (body.project_name || 'Unnamed Project').trim();
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  if (!token || !documentBase64) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Token and document are required' }),
    };
  }

  // Initialise clients
  const supabase  = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
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

    // Step 5: Build user message and call Anthropic API
    const userMessage = `Analyze the following DPR document for compliance.

Project Name: ${projectName}
Document Name: ${documentName}
Analysis Date: ${new Date().toLocaleDateString('en-GB')}
${ircSection}

The DPR document is attached as a PDF. Analyze it thoroughly and return the compliance findings in the exact JSON format specified.`;

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 32000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: documentBase64,
              },
            },
            {
              type: 'text',
              text: userMessage,
            },
          ],
        },
      ],
    });

    // Step 6: Parse JSON response
    const rawText = response.content[0]?.text || '';
    let analysisResult;
    try {
      // Strip any accidental markdown backticks before parsing
      const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
      analysisResult = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('Failed to parse Anthropic response as JSON:', parseErr);
      console.error('Raw response text:', rawText.substring(0, 500));
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'AI returned an invalid response. Please retry.' }),
      };
    }

    // Ensure project_name is always set
    if (!analysisResult.project_name) {
      analysisResult.project_name = projectName;
    }

    // Step 7: ONLY on success — increment usage and write log
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

    // Step 8: Return result to frontend
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
    console.error('analyze.js unhandled error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
    };
  }
};
