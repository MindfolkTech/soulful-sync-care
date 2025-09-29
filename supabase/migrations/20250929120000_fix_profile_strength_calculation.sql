-- Migration: Fix profile strength calculation to match frontend
-- Author: Claude Code Assistant
-- Date: 2025-09-29
-- Purpose: Align database profile strength calculation with frontend ProfileStrengthIndicator component
--
-- CRITICAL ISSUE IDENTIFIED: Database and frontend calculate profile strength differently
-- This causes therapists to see inconsistent percentages across different pages
--
-- Changes:
--   1. Drop existing calculate_profile_strength function with old parameters
--   2. Create new function matching frontend logic exactly
--   3. Update trigger function to use new parameters
--   4. Recalculate all existing profile strengths with new logic
--
-- NEW CALCULATION (matching frontend):
--   - Basic Info (20%): name (7%) + license_number (7%) + bio (6%)
--   - Specialties (20%): ≥2 specialties (10%) + ≥2 modalities (10%)
--   - Communication (20%): communication_style (10%) + session_format (10%)
--   - Policies (20%): cancellation_policy (10%) + rescheduling_policy (10%)
--   - Media (20%): avatar_url (10%) + (video_url OR quote) (10%)
--
-- OLD CALCULATION (inconsistent):
--   - Credentials (20%): license_number (10%) + insurance_accepted (10%)
--   - Profile Content (20%): bio ≥50 chars (10%) + profile_image_url (10%)
--   - Specialties (20%): At least 1 specialty (20%)
--   - Communication (20%): communication_style (10%) + session_format (10%)
--   - Verification (20%): insurance_confirmed (10%) + id_document_url (10%)
--
-- Dependencies: therapist_profiles table with columns: name, license_number, bio, specialties,
--              modalities, communication_style, session_format, cancellation_policy,
--              rescheduling_policy, avatar_url, video_url, quote
-- Performance Impact: One-time UPDATE on all therapist_profiles rows (~12 current rows)
-- Rollback Strategy: Restore original function (requires matching current schema)
-- Testing: After migration, frontend and database should show identical percentages

BEGIN;

-- Validate that all required columns exist before proceeding
DO $$
BEGIN
    -- Check for all columns required by new calculation
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'name') THEN
        RAISE EXCEPTION 'Required column name does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'license_number') THEN
        RAISE EXCEPTION 'Required column license_number does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'bio') THEN
        RAISE EXCEPTION 'Required column bio does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'specialties') THEN
        RAISE EXCEPTION 'Required column specialties does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'modalities') THEN
        RAISE EXCEPTION 'Required column modalities does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'communication_style') THEN
        RAISE EXCEPTION 'Required column communication_style does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'session_format') THEN
        RAISE EXCEPTION 'Required column session_format does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'cancellation_policy') THEN
        RAISE EXCEPTION 'Required column cancellation_policy does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'rescheduling_policy') THEN
        RAISE EXCEPTION 'Required column rescheduling_policy does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'avatar_url') THEN
        RAISE EXCEPTION 'Required column avatar_url does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'video_url') THEN
        RAISE EXCEPTION 'Required column video_url does not exist in therapist_profiles';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'quote') THEN
        RAISE EXCEPTION 'Required column quote does not exist in therapist_profiles';
    END IF;

    RAISE NOTICE 'All required columns validated successfully';
END $$;

-- Drop existing function with correct PostgreSQL syntax (parameter types matching current function)
DROP FUNCTION IF EXISTS calculate_profile_strength(
    text,          -- p_license_number
    boolean,       -- p_insurance_accepted
    text,          -- p_bio
    text,          -- p_profile_image_url
    text[],        -- p_specialties
    text,          -- p_communication_style
    text,          -- p_session_format
    boolean,       -- p_insurance_confirmed
    text           -- p_id_document_url
);

-- Create new function with updated parameters and logic
CREATE OR REPLACE FUNCTION calculate_profile_strength(
    p_name text,
    p_license_number text,
    p_bio text,
    p_specialties text[],
    p_modalities text[],
    p_communication_style text,
    p_session_format text,
    p_cancellation_policy text,
    p_rescheduling_policy text,
    p_avatar_url text,
    p_video_url text,
    p_quote text
) RETURNS integer AS $$
DECLARE
    strength integer := 0;
BEGIN
    -- Basic info (20%): name (7%), license_number (7%), bio (6%)
    IF p_name IS NOT NULL AND p_name != '' THEN
        strength := strength + 7;
    END IF;

    IF p_license_number IS NOT NULL AND p_license_number != '' AND p_license_number != 'PENDING_SETUP' THEN
        strength := strength + 7;
    END IF;

    IF p_bio IS NOT NULL AND p_bio != '' THEN
        strength := strength + 6;
    END IF;

    -- Specialties/modalities (20%): at least 2 of each (10% each)
    IF p_specialties IS NOT NULL AND COALESCE(array_length(p_specialties, 1), 0) >= 2 THEN
        strength := strength + 10;
    END IF;

    IF p_modalities IS NOT NULL AND COALESCE(array_length(p_modalities, 1), 0) >= 2 THEN
        strength := strength + 10;
    END IF;

    -- Communication preferences (20%): communication_style (10%), session_format (10%)
    IF p_communication_style IS NOT NULL AND p_communication_style != '' THEN
        strength := strength + 10;
    END IF;

    IF p_session_format IS NOT NULL AND p_session_format != '' THEN
        strength := strength + 10;
    END IF;

    -- Policies (20%): cancellation_policy (10%), rescheduling_policy (10%)
    IF p_cancellation_policy IS NOT NULL AND p_cancellation_policy != '' THEN
        strength := strength + 10;
    END IF;

    IF p_rescheduling_policy IS NOT NULL AND p_rescheduling_policy != '' THEN
        strength := strength + 10;
    END IF;

    -- Media (20%): avatar_url (10%), video_url or quote (10%)
    IF p_avatar_url IS NOT NULL AND p_avatar_url != '' THEN
        strength := strength + 10;
    END IF;

    IF (p_video_url IS NOT NULL AND p_video_url != '') OR
       (p_quote IS NOT NULL AND p_quote != '') THEN
        strength := strength + 10;
    END IF;

    -- Ensure we don't exceed 100
    IF strength > 100 THEN
        strength := 100;
    END IF;

    RETURN strength;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update the trigger function to use new parameters
CREATE OR REPLACE FUNCTION update_profile_strength_trigger()
RETURNS TRIGGER AS $$
BEGIN
    NEW.profile_strength := calculate_profile_strength(
        NEW.name,
        NEW.license_number,
        NEW.bio,
        NEW.specialties,
        NEW.modalities,
        NEW.communication_style,
        NEW.session_format,
        NEW.cancellation_policy,
        NEW.rescheduling_policy,
        NEW.avatar_url,
        NEW.video_url,
        NEW.quote
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recalculate profile strength for all existing therapists
UPDATE therapist_profiles
SET profile_strength = calculate_profile_strength(
    name,
    license_number,
    bio,
    specialties,
    modalities,
    communication_style,
    session_format,
    cancellation_policy,
    rescheduling_policy,
    avatar_url,
    video_url,
    quote
)
WHERE profile_strength IS NOT NULL;

-- Add comment explaining the calculation
COMMENT ON FUNCTION calculate_profile_strength IS
'Calculates profile strength percentage (0-100) based on:
- Basic Info (20%): name (7%) + license_number (7%) + bio (6%)
- Specialties (20%): ≥2 specialties (10%) + ≥2 modalities (10%)
- Communication (20%): communication_style (10%) + session_format (10%)
- Policies (20%): cancellation_policy (10%) + rescheduling_policy (10%)
- Media (20%): avatar_url (10%) + (video_url OR quote) (10%)';

-- Commit the transaction
COMMIT;