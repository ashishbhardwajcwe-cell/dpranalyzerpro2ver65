-- ============================================================
-- AURIS DPR Analyzer - Supabase Database Setup
-- Run this entire script in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- TABLE 1: firms
-- Stores all licensed consultancy firms and their quotas
-- ============================================================
CREATE TABLE IF NOT EXISTS firms (
  id                  UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_name           TEXT        NOT NULL,
  contact_person      TEXT,
  email               TEXT,
  phone               TEXT,
  access_token        TEXT        UNIQUE NOT NULL,
  analyses_total      INTEGER     DEFAULT 0,
  analyses_used       INTEGER     DEFAULT 0,
  license_type        TEXT        DEFAULT 'starter',
  expiry_date         DATE,
  is_active           BOOLEAN     DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  notes               TEXT
);

-- Computed column: analyses_remaining (as a view/generated expression)
-- PostgreSQL does not support computed columns referencing other columns directly,
-- so we use a view and also expose it via a helper function.

-- View that exposes firms with computed analyses_remaining
CREATE OR REPLACE VIEW firms_with_remaining AS
SELECT
  id,
  firm_name,
  contact_person,
  email,
  phone,
  access_token,
  analyses_total,
  analyses_used,
  (analyses_total - analyses_used) AS analyses_remaining,
  license_type,
  expiry_date,
  is_active,
  created_at,
  notes
FROM firms;

-- Fast lookup index on access_token
CREATE UNIQUE INDEX IF NOT EXISTS idx_firms_access_token ON firms(access_token);

-- ============================================================
-- TABLE 2: usage_log
-- Audit trail of every analysis performed
-- ============================================================
CREATE TABLE IF NOT EXISTS usage_log (
  id                   UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_id              UUID        REFERENCES firms(id) ON DELETE SET NULL,
  firm_name            TEXT,
  project_name         TEXT,
  document_name        TEXT,
  analysis_timestamp   TIMESTAMPTZ DEFAULT NOW(),
  analyses_before      INTEGER,
  analyses_after       INTEGER,
  status               TEXT        DEFAULT 'success'
);

-- Index for fast firm-based queries
CREATE INDEX IF NOT EXISTS idx_usage_log_firm_id ON usage_log(firm_id);
CREATE INDEX IF NOT EXISTS idx_usage_log_timestamp ON usage_log(analysis_timestamp DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on both tables
ALTER TABLE firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_log ENABLE ROW LEVEL SECURITY;

-- Policy: Service role (used by Netlify functions with SUPABASE_SERVICE_KEY)
-- has unrestricted access. Anonymous/authenticated users have no direct access.
-- All access goes through Netlify functions which use the service role key.

-- Firms table policies
CREATE POLICY "Service role full access on firms"
  ON firms
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Usage log policies
CREATE POLICY "Service role full access on usage_log"
  ON usage_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- SAMPLE DATA: Test firm for initial verification
-- Token: AURIS-TEST-001 with 10 analyses
-- ============================================================
INSERT INTO firms (
  firm_name,
  contact_person,
  email,
  phone,
  access_token,
  analyses_total,
  analyses_used,
  license_type,
  expiry_date,
  is_active,
  notes
) VALUES (
  'Test Consultancy Firm',
  'AURIS Admin',
  'auris8.office@gmail.com',
  '+91-0000000000',
  'AURIS-TEST-001',
  10,
  0,
  'starter',
  (NOW() + INTERVAL '1 year')::DATE,
  true,
  'Sample test firm - delete before production'
) ON CONFLICT (access_token) DO NOTHING;

-- ============================================================
-- HELPER FUNCTION: Get firm by token with remaining count
-- Used internally; actual validation done in Netlify functions
-- ============================================================
CREATE OR REPLACE FUNCTION get_firm_by_token(p_token TEXT)
RETURNS TABLE (
  id                  UUID,
  firm_name           TEXT,
  analyses_total      INTEGER,
  analyses_used       INTEGER,
  analyses_remaining  INTEGER,
  license_type        TEXT,
  expiry_date         DATE,
  is_active           BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.firm_name,
    f.analyses_total,
    f.analyses_used,
    (f.analyses_total - f.analyses_used) AS analyses_remaining,
    f.license_type,
    f.expiry_date,
    f.is_active
  FROM firms f
  WHERE f.access_token = p_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- Verify setup
-- ============================================================
SELECT
  firm_name,
  access_token,
  analyses_total,
  analyses_used,
  (analyses_total - analyses_used) AS analyses_remaining,
  is_active,
  expiry_date
FROM firms;
