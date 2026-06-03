/**
 * usage.js - Credit Check & Audit Log Function
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * Operations:
 *   check  - Returns current analyses_remaining for a token (GET/POST)
 *   log    - Writes an entry to usage_log for audit purposes (POST)
 *
 * Input  (POST JSON): { token, operation: "check" | "log", ...log fields }
 * Output (JSON):      { success, analyses_remaining } or { success, message }
 */

const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
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

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  const { token, operation } = body;

  if (!token) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Token is required' }),
    };
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { realtime: { transport: ws } }
  );

  // Fetch firm by token
  const { data: firm, error: firmError } = await supabase
    .from('firms')
    .select('id, firm_name, analyses_total, analyses_used, is_active')
    .eq('access_token', token)
    .single();

  if (firmError || !firm) {
    return {
      statusCode: 401,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid access token' }),
    };
  }

  const analysesRemaining = firm.analyses_total - firm.analyses_used;

  // --- Operation: check ---
  if (!operation || operation === 'check') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        firm_name: firm.firm_name,
        analyses_remaining: analysesRemaining,
        analyses_total: firm.analyses_total,
        analyses_used: firm.analyses_used,
        is_active: firm.is_active,
      }),
    };
  }

  // --- Operation: log ---
  if (operation === 'log') {
    const { project_name, document_name, status = 'success' } = body;

    const { error: logError } = await supabase
      .from('usage_log')
      .insert({
        firm_id:       firm.id,
        firm_name:     firm.firm_name,
        project_name:  project_name || 'Unknown Project',
        document_name: document_name || 'Unknown Document',
        analyses_before: analysesRemaining + 1, // Before this usage
        analyses_after:  analysesRemaining,
        status,
      });

    if (logError) {
      console.error('usage.js log error:', logError);
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Failed to write log entry' }),
      };
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, message: 'Log entry written' }),
    };
  }

  return {
    statusCode: 400,
    headers: CORS_HEADERS,
    body: JSON.stringify({ error: `Unknown operation: ${operation}. Use "check" or "log".` }),
  };
};
