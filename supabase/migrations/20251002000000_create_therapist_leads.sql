-- ============================================================================
-- Migration: Create therapist_leads table for abandoned Quick Start follow-ups
-- ============================================================================
-- Author: Claude (Mindfolk AI Assistant)
-- Date: 2025-10-02
-- Version: 1.0
--
-- DESCRIPTION:
--   Creates therapist_leads table to track therapists who start Quick Start
--   but don't complete sign-up. Enables GDPR-compliant abandoned cart email
--   sequences with explicit marketing consent.
--
-- CHANGES:
--   Tables:
--     - therapist_leads (new) - Stores lead data and consent
--
--   Columns:
--     - id (UUID) - Primary key
--     - email (TEXT) - Unique email address (validated)
--     - first_name (TEXT) - First name from Quick Start Screen 1
--     - marketing_consent (BOOLEAN) - Explicit consent for reminder emails
--     - consent_timestamp (TIMESTAMPTZ) - When consent was given (GDPR)
--     - quick_start_data (JSONB) - Full Quick Start form data
--     - source (TEXT) - Lead source (always 'quick_start')
--     - status (TEXT) - Lead status with CHECK constraint
--     - created_at, updated_at (TIMESTAMPTZ) - Audit timestamps
--     - last_email_sent_at (TIMESTAMPTZ) - Email rate limiting
--     - email_sequence_step (INTEGER) - Email sequence tracker
--     - unsubscribed (BOOLEAN) - Unsubscribe flag
--     - unsubscribed_at (TIMESTAMPTZ) - When unsubscribed
--     - converted_at (TIMESTAMPTZ) - When signed up
--
--   Indexes:
--     - idx_therapist_leads_email - Fast email lookups
--     - idx_therapist_leads_status - Status filtering
--     - idx_therapist_leads_created_at - Cron job queries
--     - idx_therapist_leads_status_created_at - Composite for email automation
--     - idx_therapist_leads_marketing_consent - Partial index for email lists
--     - idx_therapist_leads_unsubscribed - Partial index for filtering
--     - idx_therapist_leads_last_email_sent - Email scheduling
--
--   Constraints:
--     - valid_email - Email format validation
--     - consent_timestamp_required - GDPR compliance
--     - unsubscribe_timestamp_required - Audit trail
--     - converted_timestamp_required - Status validation
--     - status CHECK - Valid status values only
--
--   Functions:
--     - update_therapist_lead_timestamp() - Auto-update updated_at
--     - mark_lead_as_converted(TEXT) - Mark lead as converted (SECURITY DEFINER)
--     - unsubscribe_lead(TEXT) - Unsubscribe lead from emails (SECURITY DEFINER)
--
--   Triggers:
--     - update_therapist_lead_timestamp - Before UPDATE on therapist_leads
--
--   RLS Policies:
--     - "Anyone can insert lead data" - Allow anonymous inserts
--     - "Service role can read all leads" - Email automation access
--     - "Service role can delete leads" - GDPR right to erasure
--
-- DEPENDENCIES:
--   - auth schema (for auth.role() function)
--   - uuid-ossp extension (for uuid_generate_v4())
--
-- IMPACT ANALYSIS:
--   - New table, no impact on existing tables
--   - Anonymous users can INSERT lead records
--   - Only service_role can SELECT/DELETE (secure)
--   - No UPDATE policy (updates only via service_role functions)
--
-- PERFORMANCE CONSIDERATIONS:
--   - Composite index on (status, created_at) for email automation queries
--   - Partial indexes on boolean fields to save space
--   - Email validation at database level prevents invalid data
--
-- ROLLBACK STRATEGY:
--   Run 20251002000000_create_therapist_leads_rollback.sql
--   WARNING: This will permanently delete all therapist_leads data
--
-- TESTING CHECKLIST:
--   □ Verify anonymous user can INSERT lead
--   □ Verify anonymous user CANNOT SELECT leads
--   □ Verify anonymous user CANNOT UPDATE leads
--   □ Verify service_role can SELECT all leads
--   □ Verify email validation rejects invalid emails
--   □ Verify consent timestamp constraint works
--   □ Verify mark_lead_as_converted() function works
--   □ Verify unsubscribe_lead() function works
--
-- ============================================================================

BEGIN;

-- Create therapist_leads table
CREATE TABLE IF NOT EXISTS therapist_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  marketing_consent BOOLEAN DEFAULT false NOT NULL,
  consent_timestamp TIMESTAMPTZ,
  quick_start_data JSONB,
  source TEXT DEFAULT 'quick_start' NOT NULL,
  status TEXT DEFAULT 'in_progress' NOT NULL CHECK (status IN ('in_progress', 'completed_quickstart', 'converted', 'abandoned', 'unsubscribed')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_email_sent_at TIMESTAMPTZ,
  email_sequence_step INTEGER DEFAULT 0,
  unsubscribed BOOLEAN DEFAULT false NOT NULL,
  unsubscribed_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,

  -- Email format validation (more permissive pattern)
  CONSTRAINT valid_email CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),

  -- GDPR compliance: consent timestamp required when consent is true
  CONSTRAINT consent_timestamp_required CHECK (
    (marketing_consent = false) OR
    (marketing_consent = true AND consent_timestamp IS NOT NULL)
  ),

  -- Audit trail: unsubscribe timestamp required when unsubscribed
  CONSTRAINT unsubscribe_timestamp_required CHECK (
    (unsubscribed = false) OR
    (unsubscribed = true AND unsubscribed_at IS NOT NULL)
  ),

  -- Status validation: converted timestamp required when converted
  CONSTRAINT converted_timestamp_required CHECK (
    (status != 'converted') OR
    (status = 'converted' AND converted_at IS NOT NULL)
  )
);

-- Create index on email for fast lookups
CREATE INDEX idx_therapist_leads_email ON therapist_leads(email);

-- Create index on status for filtering
CREATE INDEX idx_therapist_leads_status ON therapist_leads(status);

-- Create index on created_at for cron job queries
CREATE INDEX idx_therapist_leads_created_at ON therapist_leads(created_at);

-- Composite index for email automation queries (status + created_at)
CREATE INDEX idx_therapist_leads_status_created_at ON therapist_leads(status, created_at)
  WHERE status IN ('in_progress', 'completed_quickstart', 'abandoned');

-- Create index on marketing_consent for filtering email lists
CREATE INDEX idx_therapist_leads_marketing_consent ON therapist_leads(marketing_consent) WHERE marketing_consent = true;

-- Create index on unsubscribed for filtering
CREATE INDEX idx_therapist_leads_unsubscribed ON therapist_leads(unsubscribed) WHERE unsubscribed = true;

-- Create index on last_email_sent_at for scheduling
CREATE INDEX idx_therapist_leads_last_email_sent ON therapist_leads(last_email_sent_at);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_therapist_lead_timestamp()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_therapist_lead_timestamp
  BEFORE UPDATE ON therapist_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_therapist_lead_timestamp();

-- Function to mark lead as converted (called after successful sign-up)
CREATE OR REPLACE FUNCTION mark_lead_as_converted(lead_email TEXT)
RETURNS void
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
BEGIN
  -- Verify user exists in auth.users before marking as converted
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = lead_email) THEN
    UPDATE therapist_leads
    SET
      status = 'converted',
      converted_at = NOW(),
      updated_at = NOW()
    WHERE email = lead_email
      AND status != 'converted';
  ELSE
    RAISE EXCEPTION 'User with email % not found in auth.users', lead_email;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to unsubscribe lead from emails
CREATE OR REPLACE FUNCTION unsubscribe_lead(lead_email TEXT)
RETURNS void
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE therapist_leads
  SET
    unsubscribed = true,
    unsubscribed_at = NOW(),
    marketing_consent = false,
    status = 'unsubscribed',
    updated_at = NOW()
  WHERE email = lead_email;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE therapist_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Anyone can insert lead data (anonymous Quick Start)
CREATE POLICY "Anyone can insert lead data"
  ON therapist_leads
  FOR INSERT
  WITH CHECK (true);

-- RLS Policy: Only service role can read leads (for email automation)
CREATE POLICY "Service role can read all leads"
  ON therapist_leads
  FOR SELECT
  USING (auth.role() = 'service_role');

-- RLS Policy: Only service role can delete leads (GDPR right to erasure)
CREATE POLICY "Service role can delete leads"
  ON therapist_leads
  FOR DELETE
  USING (auth.role() = 'service_role');

-- NOTE: No UPDATE policy - updates only via service_role functions for security
-- Users can unsubscribe via unsubscribe_lead() function which runs with SECURITY DEFINER

-- Add table comment
COMMENT ON TABLE therapist_leads IS 'Stores anonymous Quick Start progress and marketing consent for abandoned setup email sequences. GDPR compliant with explicit consent and unsubscribe functionality.';

-- Add column comments
COMMENT ON COLUMN therapist_leads.email IS 'Therapist email address (unique identifier)';
COMMENT ON COLUMN therapist_leads.first_name IS 'First name from Quick Start Screen 1';
COMMENT ON COLUMN therapist_leads.marketing_consent IS 'Explicit consent for setup reminder emails (GDPR compliant)';
COMMENT ON COLUMN therapist_leads.consent_timestamp IS 'When consent was given (required when marketing_consent is true)';
COMMENT ON COLUMN therapist_leads.quick_start_data IS 'Full Quick Start form data (communication style, specialities, modalities, etc.)';
COMMENT ON COLUMN therapist_leads.source IS 'Where the lead came from (always quick_start for now)';
COMMENT ON COLUMN therapist_leads.status IS 'Lead status: in_progress, completed_quickstart, converted, abandoned, unsubscribed';
COMMENT ON COLUMN therapist_leads.last_email_sent_at IS 'Last automated email sent timestamp (for rate limiting)';
COMMENT ON COLUMN therapist_leads.email_sequence_step IS 'Which email in sequence was last sent (0=none, 1=day1, 2=day3, 3=day7)';
COMMENT ON COLUMN therapist_leads.unsubscribed IS 'Whether lead unsubscribed from emails';
COMMENT ON COLUMN therapist_leads.unsubscribed_at IS 'When lead unsubscribed (required when unsubscribed is true)';
COMMENT ON COLUMN therapist_leads.converted_at IS 'When lead signed up and became a full user (required when status is converted)';

-- Validation: Verify table created successfully
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'therapist_leads') THEN
    RAISE EXCEPTION 'Migration failed: therapist_leads table not created';
  END IF;

  RAISE NOTICE '✅ Migration successful: therapist_leads table created with % policies',
    (SELECT count(*) FROM pg_policies WHERE tablename = 'therapist_leads');
END $$;

COMMIT;
