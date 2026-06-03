/**
 * auth.js - Token Validation Function
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * Validates a firm's access token against Supabase.
 * Called by login.html before granting app access.
 *
 * Input  (POST JSON): { token: "AURIS-XXXX-YYYY" }
 * Output (JSON):      { valid, firm_name, analyses_remaining, expiry_date, message }
 */

const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

// Standard CORS headers — applied to every response
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ valid: false, message: 'Method not allowed' }),
    };
  }

  // Parse request body
  let token;
  try {
    const body = JSON.parse(event.body || '{}');
    token = (body.token || '').trim();
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ valid: false, message: 'Invalid request body' }),
    };
  }

  console.log('SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
  console.log('SUPABASE_SERVICE_KEY exists:', !!process.env.SUPABASE_SERVICE_KEY);
  console.log('Token received:', token);

  if (!token) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ valid: false, message: 'Access token is required' }),
    };
  }

  // Initialise Supabase with service role key (server-side only)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { realtime: { transport: ws } }
  );

  try {
    // Lookup token in firms table
    const { data: firm, error } = await supabase
      .from('firms')
      .select('id, firm_name, analyses_total, analyses_used, is_active, expiry_date, license_type')
      .eq('access_token', token)
      .single();

    if (error || !firm) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ valid: false, message: 'Invalid access token. Please check your token and try again.' }),
      };
    }

    // Check account is active
    if (!firm.is_active) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ valid: false, message: 'This account has been deactivated. Contact support at auris8.office@gmail.com' }),
      };
    }

    // Check expiry date
    if (firm.expiry_date) {
      const expiry = new Date(firm.expiry_date);
      expiry.setHours(23, 59, 59, 999); // End of expiry day
      if (expiry < new Date()) {
        return {
          statusCode: 200,
          headers: CORS_HEADERS,
          body: JSON.stringify({ valid: false, message: 'Your license has expired. Contact AURIS to renew.' }),
        };
      }
    }

    // Check remaining analyses
    const analysesRemaining = firm.analyses_total - firm.analyses_used;
    if (analysesRemaining <= 0) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          valid: false,
          message: 'No analyses remaining. Contact AURIS at auris8.office@gmail.com to top up your account.',
        }),
      };
    }

    // All checks passed — return success
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        valid: true,
        firm_name: firm.firm_name,
        firm_id: firm.id,
        analyses_remaining: analysesRemaining,
        analyses_total: firm.analyses_total,
        analyses_used: firm.analyses_used,
        expiry_date: firm.expiry_date,
        license_type: firm.license_type,
        message: 'Authentication successful',
      }),
    };
  } catch (err) {
    console.error('auth.js error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ valid: false, message: 'Server error. Please try again later.' }),
    };
  }
};
