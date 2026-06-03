/**
 * app.js - Shared Frontend Utilities
 * AURIS DPR Analyzer
 *
 * Contains only UI helpers, sessionStorage access, and API call wrappers.
 * No sensitive data, no API keys, no AI prompts.
 */

'use strict';

// ---- Session helpers ----

const Session = {
  set(key, value) {
    sessionStorage.setItem('auris_' + key, typeof value === 'object' ? JSON.stringify(value) : value);
  },
  get(key) {
    const v = sessionStorage.getItem('auris_' + key);
    try { return JSON.parse(v); } catch { return v; }
  },
  remove(key) { sessionStorage.removeItem('auris_' + key); },
  clear() {
    Object.keys(sessionStorage)
      .filter(k => k.startsWith('auris_'))
      .forEach(k => sessionStorage.removeItem(k));
  },
};

// ---- Auth guard — call on index.html and admin.html ----

function requireAuth() {
  const token = Session.get('token');
  if (!token) {
    window.location.href = '/login.html';
    return null;
  }
  return token;
}

// ---- API wrappers ----

async function callAuth(token) {
  const res = await fetch('/.netlify/functions/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { valid: false, message: `Server error (${res.status}). Please retry or contact support.` };
  }
}

async function callAnalyze(payload) {
  const res = await fetch('/.netlify/functions/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    // Function returned non-JSON — infrastructure-level error
    if (res.status === 413) {
      return { error: 'File too large to upload. For very large PDF/Word/PowerPoint files, split the document into smaller sections and analyze each separately.' };
    }
    if (res.status === 504 || res.status === 502) {
      return { error: 'Analysis timed out. Please try a smaller document or split it into sections.' };
    }
    return { error: `Server error (${res.status}). Please retry. If the problem persists, contact support.` };
  }
}

async function callUsage(token, operation = 'check', extra = {}) {
  const res = await fetch('/.netlify/functions/usage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, operation, ...extra }),
  });
  return res.json();
}

async function callAdmin(operation, payload, adminSecret) {
  const res = await fetch('/.netlify/functions/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': adminSecret,
    },
    body: JSON.stringify({ operation, ...payload }),
  });
  return res.json();
}

// ---- File to base64 ----

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => {
      // Strip the data URL prefix — we only want the raw base64 string
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---- Format helpers ----

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-GB'); // DD/MM/YYYY
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---- Severity badge HTML ----

function severityBadge(severity) {
  const s = (severity || '').toLowerCase();
  const map = {
    critical:    'badge-critical',
    major:       'badge-major',
    minor:       'badge-minor',
    observation: 'badge-observation',
  };
  const cls = map[s] || 'badge-observation';
  return `<span class="badge ${cls}">${escapeHtml(severity)}</span>`;
}

// ---- Logout ----

function logout() {
  Session.clear();
  window.location.href = '/login.html';
}
