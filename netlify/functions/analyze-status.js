/**
 * analyze-status.js - Job Status Poller
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * The frontend polls this endpoint every few seconds with a
 * job_id (returned by analyze.js) plus the firm's access token.
 * Returns the current row from analysis_jobs.
 *
 * SECURITY:
 *   - The token MUST resolve to the same firm that owns the job.
 *     Otherwise we return 403. This prevents one firm from polling
 *     another firm's analysis just by guessing a job_id.
 *   - Only the result_json (output) and error_message are returned;
 *     the original document payload is NEVER echoed back.
 *
 * Input  (POST JSON):  { token, job_id }
 * Output (JSON):
 *   200 { status:'pending'|'processing', analyses_remaining }
 *   200 { status:'complete',   result, analyses_remaining }
 *   200 { status:'failed',     error,  analyses_remaining }
 *   401/403/404/500 with { error }
 */

const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type':                 'application/json',
};

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

  let token, jobId;
  try {
    const body = JSON.parse(event.body || '{}');
    token = (body.token  || '').trim();
    jobId = (body.job_id || '').trim();
  } catch {
    return {
      statusCode: 400,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Invalid request body' }),
    };
  }
  if (!token || !jobId) {
    return {
      statusCode: 400,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Token and job_id are required' }),
    };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return {
      statusCode: 500,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Server misconfiguration' }),
    };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { realtime: { transport: ws } },
  );

  try {
    // Resolve firm from token
    const { data: firm, error: firmError } = await supabase
      .from('firms')
      .select('id, analyses_total, analyses_used, is_active')
      .eq('access_token', token)
      .single();

    if (firmError || !firm || !firm.is_active) {
      return {
        statusCode: 401,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'Invalid access token' }),
      };
    }

    // Fetch the job
    const { data: job, error: jobError } = await supabase
      .from('analysis_jobs')
      .select('id, firm_id, status, result_json, error_message, truncation_notice, started_at, completed_at')
      .eq('id', jobId)
      .single();

    if (jobError || !job) {
      return {
        statusCode: 404,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'Job not found' }),
      };
    }

    // Authorisation: firm must own the job
    if (job.firm_id !== firm.id) {
      return {
        statusCode: 403,
        headers:    CORS_HEADERS,
        body:       JSON.stringify({ error: 'Not authorized to view this job' }),
      };
    }

    const analysesRemaining = Math.max(0, firm.analyses_total - firm.analyses_used);

    if (job.status === 'complete') {
      return {
        statusCode: 200,
        headers:    CORS_HEADERS,
        body: JSON.stringify({
          success:            true,
          status:             'complete',
          analyses_remaining: analysesRemaining,
          result:             job.result_json,
        }),
      };
    }

    if (job.status === 'failed') {
      return {
        statusCode: 200,
        headers:    CORS_HEADERS,
        body: JSON.stringify({
          success:            false,
          status:             'failed',
          analyses_remaining: analysesRemaining,
          error:              job.error_message || 'Analysis failed. Please retry.',
        }),
      };
    }

    // pending | processing
    return {
      statusCode: 200,
      headers:    CORS_HEADERS,
      body: JSON.stringify({
        success:            true,
        status:             job.status,
        analyses_remaining: analysesRemaining,
        started_at:         job.started_at,
      }),
    };
  } catch (err) {
    console.error('analyze-status.js error:', err);
    return {
      statusCode: 500,
      headers:    CORS_HEADERS,
      body:       JSON.stringify({ error: 'Status check failed: ' + (err.message || String(err)).substring(0, 200) }),
    };
  }
};
