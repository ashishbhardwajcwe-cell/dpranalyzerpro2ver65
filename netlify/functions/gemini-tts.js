/**
 * gemini-tts.js — Gemini multi-speaker TTS proxy
 * AURIS DPR Analyzer | Netlify Serverless Function
 *
 * Forwards POST bodies to the Gemini TTS endpoint, appending
 * the GEMINI_API_KEY as a query parameter server-side.
 * The key is never exposed to the browser.
 *
 * Target model: gemini-2.5-flash-preview-tts
 * Returns: raw upstream JSON (candidates[0].content.parts[0].inlineData.data
 *          is base64 PCM audio at 24 kHz / 16-bit / mono)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

const GEMINI_TTS_BASE =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent';

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

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'GEMINI_API_KEY is not configured on this server.' }),
    };
  }

  const url = GEMINI_TTS_BASE + '?key=' + apiKey;

  let upstream;
  try {
    upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body,
    });
  } catch (err) {
    console.error('gemini-tts: upstream fetch failed:', err.message);
    return {
      statusCode: 502,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Voice service request failed: ' + err.message }),
    };
  }

  const responseText = await upstream.text();

  if (!upstream.ok) {
    console.error('gemini-tts: upstream error', upstream.status, responseText.substring(0, 400));
  }

  return {
    statusCode: upstream.status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    body: responseText,
  };
};
