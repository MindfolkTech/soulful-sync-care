-- Migration: add_missing_therapist_columns_for_v2_onboarding
-- Author: MindFolk Foundation Agent (Fixed)
-- Date: 2025-09-28
-- Purpose: Enable V2 onboarding system with schedule management, cancellation policies, and auto-booking features
-- Risk: Low - additive columns only, no data modification

-- Add availability_hours column for storing therapist schedule
ALTER TABLE therapist_profiles
ADD COLUMN IF NOT EXISTS availability_hours JSONB DEFAULT '{}'::jsonb;

-- Add cancellation_notice column for therapist cancellation policy
ALTER TABLE therapist_profiles
ADD COLUMN IF NOT EXISTS cancellation_notice TEXT;

-- Add auto_accept_hours column for automatic booking acceptance
ALTER TABLE therapist_profiles
ADD COLUMN IF NOT EXISTS auto_accept_hours INTEGER;

-- Add comments for documentation
COMMENT ON COLUMN therapist_profiles.availability_hours IS 'JSONB storing therapist weekly availability schedule by day of week';
COMMENT ON COLUMN therapist_profiles.cancellation_notice IS 'Human-readable cancellation notice period text displayed to clients';
COMMENT ON COLUMN therapist_profiles.auto_accept_hours IS 'Hours in advance for auto-accepting bookings (NULL = manual approval only)';

-- Simple verification query
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'therapist_profiles'
  AND table_schema = 'public'
  AND column_name IN ('availability_hours', 'cancellation_notice', 'auto_accept_hours')
ORDER BY column_name;