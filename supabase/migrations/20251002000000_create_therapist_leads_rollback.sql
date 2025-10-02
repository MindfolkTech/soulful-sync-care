-- ============================================================================
-- Rollback Migration: Remove therapist_leads table
-- ============================================================================
-- Author: Claude (Mindfolk AI Assistant)
-- Date: 2025-10-02
-- Version: 1.0
-- Reverts: 20251002000000_create_therapist_leads.sql
--
-- DESCRIPTION:
--   Completely removes the therapist_leads table and all related objects
--   (indexes, functions, triggers, RLS policies). This rollback is
--   DESTRUCTIVE and will permanently delete all lead data.
--
-- ⚠️  WARNING: DATA LOSS
--   This rollback will permanently delete ALL therapist lead records,
--   including:
--   - Email addresses and marketing consent records
--   - Quick Start progress data
--   - Email sequence tracking
--   - Conversion timestamps
--
--   THERE IS NO RECOVERY after running this rollback. Ensure you have
--   a database backup if you need to preserve this data.
--
-- CHANGES (in reverse order of creation):
--   Policies:
--     - DROP "Service role can delete leads"
--     - DROP "Service role can read all leads"
--     - DROP "Anyone can insert lead data"
--
--   Functions:
--     - DROP unsubscribe_lead(TEXT)
--     - DROP mark_lead_as_converted(TEXT)
--     - DROP update_therapist_lead_timestamp()
--
--   Triggers:
--     - DROP update_therapist_lead_timestamp
--
--   Indexes:
--     - DROP idx_therapist_leads_last_email_sent
--     - DROP idx_therapist_leads_unsubscribed
--     - DROP idx_therapist_leads_marketing_consent
--     - DROP idx_therapist_leads_status_created_at
--     - DROP idx_therapist_leads_created_at
--     - DROP idx_therapist_leads_status
--     - DROP idx_therapist_leads_email
--
--   Tables:
--     - DROP therapist_leads (CASCADE will remove all constraints)
--
-- DEPENDENCIES:
--   - None (this migration removes all objects)
--
-- IMPACT ANALYSIS:
--   - All therapist lead data will be permanently deleted
--   - Email automation relying on this table will fail
--   - No impact on other tables (no foreign key dependencies)
--
-- TESTING CHECKLIST:
--   □ Verify table no longer exists
--   □ Verify all policies are removed
--   □ Verify all functions are removed
--   □ Verify all indexes are removed
--   □ Verify no orphaned dependencies remain
--
-- ============================================================================

BEGIN;

-- Drop RLS policies first (must be done before dropping table)
DROP POLICY IF EXISTS "Service role can delete leads" ON therapist_leads;
DROP POLICY IF EXISTS "Service role can read all leads" ON therapist_leads;
DROP POLICY IF EXISTS "Anyone can insert lead data" ON therapist_leads;

-- Drop trigger (must be done before dropping function)
DROP TRIGGER IF EXISTS update_therapist_lead_timestamp ON therapist_leads;

-- Drop functions
DROP FUNCTION IF EXISTS unsubscribe_lead(TEXT);
DROP FUNCTION IF EXISTS mark_lead_as_converted(TEXT);
DROP FUNCTION IF EXISTS update_therapist_lead_timestamp();

-- Drop indexes (will be dropped automatically with table, but explicit for clarity)
DROP INDEX IF EXISTS idx_therapist_leads_last_email_sent;
DROP INDEX IF EXISTS idx_therapist_leads_unsubscribed;
DROP INDEX IF EXISTS idx_therapist_leads_marketing_consent;
DROP INDEX IF EXISTS idx_therapist_leads_status_created_at;
DROP INDEX IF EXISTS idx_therapist_leads_created_at;
DROP INDEX IF EXISTS idx_therapist_leads_status;
DROP INDEX IF EXISTS idx_therapist_leads_email;

-- Drop table (CASCADE will remove all constraints and dependent objects)
-- WARNING: This permanently deletes all therapist lead data
DROP TABLE IF EXISTS therapist_leads CASCADE;

-- Validation: Verify table no longer exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'therapist_leads') THEN
    RAISE EXCEPTION 'Rollback failed: therapist_leads table still exists';
  END IF;

  RAISE NOTICE '✅ Rollback successful: therapist_leads table and all related objects removed';
END $$;

COMMIT;
