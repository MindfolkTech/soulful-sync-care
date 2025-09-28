-- ROLLBACK MIGRATION: Remove added columns from therapist_profiles
--
-- PURPOSE: This rollback removes the three columns added in 20250928_add_missing_therapist_columns.sql
--
-- WHEN TO RUN THIS ROLLBACK:
-- 1. If the V2 onboarding system fails integration testing
-- 2. If the new columns cause unexpected database performance issues
-- 3. If there are conflicts with the availability_hours JSONB structure
-- 4. If the auto_accept_hours feature needs to be redesigned
-- 5. If Caroline requests removal of these features before launch
--
-- WHAT THIS ROLLBACK DOES:
-- - Removes availability_hours column (loses any schedule data stored)
-- - Removes cancellation_notice column (loses any custom cancellation text)
-- - Removes auto_accept_hours column (loses any auto-booking settings)
--
-- DATA LOSS WARNING:
-- Running this rollback will permanently delete any data stored in these columns.
-- Ensure you have a backup if you need to preserve this data.
--
-- VERIFICATION AFTER ROLLBACK:
-- Run this query to confirm columns are removed:
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'therapist_profiles'
-- AND column_name IN ('availability_hours', 'cancellation_notice', 'auto_accept_hours');
--
-- Date: 2025-09-28
-- Author: MindFolk Foundation Agent

-- Remove auto_accept_hours column
ALTER TABLE therapist_profiles
DROP COLUMN IF EXISTS auto_accept_hours;

-- Remove cancellation_notice column
ALTER TABLE therapist_profiles
DROP COLUMN IF EXISTS cancellation_notice;

-- Remove availability_hours column
ALTER TABLE therapist_profiles
DROP COLUMN IF EXISTS availability_hours;

-- Verify columns were removed successfully
-- This query should return no rows if rollback was successful
SELECT
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'therapist_profiles'
    AND table_schema = 'public'
    AND column_name IN ('availability_hours', 'cancellation_notice', 'auto_accept_hours');