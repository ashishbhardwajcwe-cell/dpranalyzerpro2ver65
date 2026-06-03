/**
 * admin.js - Administrator Operations Function
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * Protected by x-admin-secret header matching ADMIN_SECRET env variable.
 *
 * Operations:
 *   list_firms  - Return all firms with full stats
 *   add_firm    - Create new firm with starting credits
 *   topup       - Add analyses to existing firm
 *   deactivate  - Set is_active to false for a firm
 *   get_usage   - Full usage_log for a specific firm
 *
 * Input  (POST JSON): { operation, ...fields }
 * Header required:    x-admin-secret: <ADMIN_SECRET value>
 */

const { createClient } = require('@supabase/supabase-js');
const ws = require('ws');

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// Generates a token in format AURIS-FIRMNAME-XXXX
function generateToken(firmName) {
  const slug = firmName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .substring(0, 8);
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AURIS-${slug}-${suffix}`;
}

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

  // Verify admin secret
  const adminSecret = event.headers['x-admin-secret'] || event.headers['X-Admin-Secret'];
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return {
      statusCode: 401,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Unauthorized. Invalid admin secret.' }),
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

  const { operation } = body;
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { realtime: { transport: ws } }
  );

  try {
    // ---- list_firms ----
    if (operation === 'list_firms') {
      const { data, error } = await supabase
        .from('firms')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Add computed analyses_remaining
      const firms = (data || []).map((f) => ({
        ...f,
        analyses_remaining: f.analyses_total - f.analyses_used,
      }));

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, firms }),
      };
    }

    // ---- add_firm ----
    if (operation === 'add_firm') {
      const {
        firm_name,
        contact_person,
        email,
        phone,
        analyses_total,
        expiry_date,
        license_type = 'starter',
        notes,
      } = body;

      if (!firm_name || !analyses_total) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'firm_name and analyses_total are required' }),
        };
      }

      // Generate unique token (retry up to 3 times on collision)
      let access_token, insertError, newFirm;
      for (let attempt = 0; attempt < 3; attempt++) {
        access_token = generateToken(firm_name);
        const result = await supabase
          .from('firms')
          .insert({
            firm_name,
            contact_person,
            email,
            phone,
            access_token,
            analyses_total: parseInt(analyses_total, 10),
            analyses_used: 0,
            license_type,
            expiry_date: expiry_date || null,
            is_active: true,
            notes,
          })
          .select()
          .single();

        insertError = result.error;
        newFirm = result.data;
        if (!insertError) break;
        if (!insertError.message.includes('unique')) throw insertError;
      }

      if (insertError) throw insertError;

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          message: 'Firm created successfully',
          firm: { ...newFirm, analyses_remaining: parseInt(analyses_total, 10) },
        }),
      };
    }

    // ---- topup ----
    if (operation === 'topup') {
      const { firm_id, add_analyses } = body;

      if (!firm_id || !add_analyses) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'firm_id and add_analyses are required' }),
        };
      }

      // Fetch current total
      const { data: firm, error: fetchError } = await supabase
        .from('firms')
        .select('analyses_total, analyses_used')
        .eq('id', firm_id)
        .single();

      if (fetchError || !firm) {
        return {
          statusCode: 404,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'Firm not found' }),
        };
      }

      const newTotal = firm.analyses_total + parseInt(add_analyses, 10);

      const { data: updated, error: updateError } = await supabase
        .from('firms')
        .update({ analyses_total: newTotal })
        .eq('id', firm_id)
        .select()
        .single();

      if (updateError) throw updateError;

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          message: `Added ${add_analyses} analyses. New total: ${newTotal}`,
          firm: { ...updated, analyses_remaining: newTotal - updated.analyses_used },
        }),
      };
    }

    // ---- deactivate ----
    if (operation === 'deactivate') {
      const { firm_id } = body;

      if (!firm_id) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'firm_id is required' }),
        };
      }

      const { error } = await supabase
        .from('firms')
        .update({ is_active: false })
        .eq('id', firm_id);

      if (error) throw error;

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, message: 'Firm deactivated' }),
      };
    }

    // ---- get_usage ----
    if (operation === 'get_usage') {
      const { firm_id } = body;

      if (!firm_id) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'firm_id is required' }),
        };
      }

      const { data, error } = await supabase
        .from('usage_log')
        .select('*')
        .eq('firm_id', firm_id)
        .order('analysis_timestamp', { ascending: false });

      if (error) throw error;

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true, usage_log: data || [] }),
      };
    }

    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: `Unknown operation: ${operation}. Valid: list_firms, add_firm, topup, deactivate, get_usage`,
      }),
    };
  } catch (err) {
    console.error('admin.js error:', err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: err.message || 'Server error' }),
    };
  }
};
