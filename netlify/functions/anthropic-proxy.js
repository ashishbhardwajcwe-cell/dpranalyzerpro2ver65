/**
 * anthropic-proxy.js — Anthropic API proxy for podcast script generation
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * Forwards POST bodies to api.anthropic.com/v1/messages, injecting
 * the x-api-key and anthropic-version headers server-side so the
 * browser never sees the API key.
 *
 * Used by: Audio Overview podcast script generation (small payloads only).
 * NOTE: Large base64 document analysis goes through analyze.js instead,
 *       because Netlify's 6 MB payload limit would reject those requests.
 */

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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'ANTHROPIC_API_KEY is not configured on this server.' }),
    };
  }

  let upstream;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: event.body,
    });
  } catch (err) {
    console.error('anthropic-proxy: upstream fetch failed:', err.message);
    return {
      statusCode: 502,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Upstream request failed: ' + err.message }),
    };
  }

  const responseText = await upstream.text();

  return {
    statusCode: upstream.status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    body: responseText,
  };
};
