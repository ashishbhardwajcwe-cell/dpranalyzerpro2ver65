/**
 * analyze.js - Job Orchestrator
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * This function validates the request, reserves a job row in
 * analysis_jobs, fires-and-forgets the analyze-background function,
 * and returns the job_id immediately. The client then polls
 * analyze-status with the job_id until status === 'complete'.
 *
 * This architecture exists to bypass Netlify's 26-second sync-function
 * timeout: real DPR analyses with the full IRC reference set routinely
 * take 30-60 seconds. analyze-background is a Netlify Background
 * Function (file suffix -background) with a 15-minute ceiling.
 *
 * SECURITY:
 *   - Anthropic API key, system prompt, and IRC reference data are
 *     never exposed to the frontend. All AI logic lives in
 *     analyze-background.js, which is server-only.
 *   - Token validation, credit check, rate limit are enforced here
 *     BEFORE any background work is scheduled.
 *   - Credits are NOT decremented here — only after the background
 *     analysis succeeds (matches v63 behavior).
 *
 * Input  (POST JSON):
 *   { token, document_name, project_name, file_type,
 *     document_text? | document_base64? }
 *
 * Output (JSON):
 *   202 { success:true, job_id, status:'pending' }
 *   401/402/403/429/500 with { error }
 */

const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type':                 'application/json',
};

// Rate limit: max 10 analyses per token per hour
async function checkRateLimit(supabase, firmId) {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await supabase
    .from('usage_log')
    .select('id', { count: 'exact', head: true })
    .eq('firm_id', firmId)
    .gte('analysis_timestamp', oneHourAgo);
  if (error) return true;             // Fail open on DB hiccup
  return count < 10;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let token, documentBase64, documentText, documentName, projectName, fileTypeHint;
  try {
    const body = JSON.parse(event.body || '{}');
    token          = (body.token || '').trim();
    documentBase64 = body.document_base64 || '';
    documentText   = body.document_text || '';
    documentName   = (body.document_name || 'Unnamed Document').trim();
    projectName    = (body.project_name  || 'Unnamed Project').trim();
    fileTypeHint   = (body.file_type     || '').trim().toLowerCase();
  } catch {
    return {
      statusCode: 400,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  if (!token || (!documentBase64 && !documentText)) {
    return {
      statusCode: 400,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Token and document are required' }),
    };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error('analyze.js: missing Supabase env vars');
    return {
      statusCode: 500,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Server misconfiguration: database credentials not set. Contact support.' }),
    };
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('analyze.js: missing ANTHROPIC_API_KEY');
    return {
      statusCode: 500,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Server misconfiguration: AI credentials not set. Contact support.' }),
    };
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
      { realtime: { transport: ws } },
    );

    // Step 1: validate token & firm
    const { data: firm, error: firmError } = await supabase
      .from('firms')
      .select('id, firm_name, analyses_total, analyses_used, is_active, expiry_date')
      .eq('access_token', token)
      .single();

    if (firmError || !firm) {
      return {
        statusCode: 401,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'Invalid access token' }),
      };
    }

    if (!firm.is_active) {
      return {
        statusCode: 403,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'Account deactivated. Contact auris8.office@gmail.com' }),
      };
    }

    if (firm.expiry_date) {
      const expiry = new Date(firm.expiry_date);
      expiry.setHours(23, 59, 59, 999);
      if (expiry < new Date()) {
        return {
          statusCode: 403,
          headers:    CORS_HEADERS,
          body:       JSON.stringify({ error: 'License expired. Contact AURIS to renew.' }),
        };
      }
    }

    // Step 2: credit check
    const analysesRemaining = firm.analyses_total - firm.analyses_used;
    if (analysesRemaining <= 0) {
      return {
        statusCode: 402,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'No analyses remaining. Contact auris8.office@gmail.com to top up.' }),
      };
    }

    // Step 3: rate limit
    const withinRateLimit = await checkRateLimit(supabase, firm.id);
    if (!withinRateLimit) {
      return {
        statusCode: 429,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'Rate limit exceeded. Maximum 10 analyses per hour per token.' }),
      };
    }

    // Step 4: create the job row. We store the full payload here so the
    // background function can read it without us needing to hand it 5+ MB
    // of base64 through an internal HTTP call.
    const { data: jobRow, error: jobError } = await supabase
      .from('analysis_jobs')
      .insert({
        firm_id:          firm.id,
        firm_name:        firm.firm_name,
        project_name:     projectName,
        document_name:    documentName,
        file_type:        fileTypeHint || '',
        document_text:    documentText    || null,
        document_base64:  documentBase64  || null,
        analyses_before:  analysesRemaining,
        status:           'pending',
      })
      .select('id')
      .single();

    if (jobError || !jobRow) {
      console.error('analyze.js: failed to insert job row:', jobError);
      return {
        statusCode: 500,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'Could not queue analysis. Please retry.' }),
      };
    }

    const jobId = jobRow.id;

    // Step 5: fire-and-forget the background function.
    // Netlify returns 202 immediately; we don't wait for completion.
    // If this trigger fails, the row stays as 'pending' — the status
    // endpoint will surface that and the client can retry.
    const proto   = event.headers['x-forwarded-proto'] || 'https';
    const host    = event.headers.host;
    const trigger = `${proto}://${host}/.netlify/functions/analyze-background`;

    try {
      const resp = await fetch(trigger, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ job_id: jobId }),
      });
      // Background functions reply 202 immediately. Anything else is a problem.
      if (resp.status !== 202 && resp.status !== 200) {
        console.warn(`analyze.js: background trigger returned status ${resp.status}`);
      }
    } catch (triggerErr) {
      console.error('analyze.js: background trigger failed:', triggerErr);
      // Mark the job as failed so the client doesn't poll forever.
      await supabase
        .from('analysis_jobs')
        .update({ status: 'failed', error_message: 'Background scheduler unreachable', completed_at: new Date().toISOString() })
        .eq('id', jobId);
      return {
        statusCode: 502,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'Could not start analysis. Please retry.' }),
      };
    }

    return {
      statusCode: 202,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ success: true, job_id: jobId, status: 'pending' }),
    };
  } catch (err) {
    console.error('analyze.js unhandled error:', err.name, err.message, err.stack);
    const msg = err.message || String(err);
    return {
      statusCode: 500,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Unexpected server error: ' + msg.substring(0, 200) }),
    };
  }
};
