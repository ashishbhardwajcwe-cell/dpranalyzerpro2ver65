/**
 * get-config.js — Public configuration endpoint
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * Returns feature-availability flags to the browser.
 * - gemini: boolean — true when GEMINI_API_KEY is present
 * NOTE: ANTHROPIC_API_KEY is intentionally NOT returned here.
 *       All Anthropic calls go through analyze.js or anthropic-proxy.js
 *       server-side, never directly from the browser.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      status: 'ok',
      gemini: !!process.env.GEMINI_API_KEY,
    }),
  };
};
