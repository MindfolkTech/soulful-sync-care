-- Rollback Migration: Restore original profile strength calculation
-- Author: Claude Code Assistant
-- Date: 2025-09-29
-- Purpose: Revert profile strength calculation back to original version
--
-- WARNING: This rollback uses current schema columns, not original column names
-- The original function referenced columns that may not exist in current schema:
--   - insurance_accepted (not in current schema)
--   - profile_image_url (current schema uses avatar_url)
--
-- This rollback adapts the original logic to work with current schema
-- The calculation percentages remain the same as the original, but column
-- references are updated to match what exists in the database now
--
-- Performance Impact: One-time UPDATE on all therapist_profiles rows
-- Dependencies: Current therapist_profiles schema

BEGIN;

-- Drop the updated function with correct PostgreSQL syntax (only parameter types)
DROP FUNCTION IF EXISTS calculate_profile_strength(
    text,
    text,
    text,
    text[],
    text[],
    text,
    text,
    text,
    text,
    text,
    text,
    text
);

-- Add column validation before proceeding
DO $$
BEGIN
    -- Validate required columns exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'insurance_confirmed') THEN
        RAISE EXCEPTION 'Required column insurance_confirmed does not exist in therapist_profiles';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'therapist_profiles' AND column_name = 'id_document_url') THEN
        RAISE EXCEPTION 'Required column id_document_url does not exist in therapist_profiles';
    END IF;
END $$;

-- Restore original function logic adapted for current schema
CREATE OR REPLACE FUNCTION calculate_profile_strength(
    p_license_number text,
    p_bio text,
    p_avatar_url text,
    p_specialties text[],
    p_communication_style text,
    p_session_format text,
    p_insurance_confirmed boolean,
    p_id_document_url text
) RETURNS integer AS $$
DECLARE
    strength integer := 0;
BEGIN
    -- Credentials (20%): license_number (10%), insurance_confirmed (10%)
    IF p_license_number IS NOT NULL AND p_license_number != '' AND p_license_number != 'PENDING_SETUP' THEN
        strength := strength + 10;
    END IF;
    IF p_insurance_confirmed = true THEN
        strength := strength + 10;
    END IF;

    -- Profile Content (20%): bio ≥50 chars (10%), avatar_url (10%)
    IF p_bio IS NOT NULL AND length(p_bio) >= 50 THEN
        strength := strength + 10;
    END IF;
    IF p_avatar_url IS NOT NULL AND p_avatar_url != '' THEN
        strength := strength + 10;
    END IF;

    -- Specialties (20%): specialties array length (at least 1 for full points)
    IF p_specialties IS NOT NULL AND COALESCE(array_length(p_specialties, 1), 0) >= 1 THEN
        strength := strength + 20;
    END IF;

    -- Communication (20%): communication_style (10%), session_format (10%)
    IF p_communication_style IS NOT NULL AND p_communication_style != '' THEN
        strength := strength + 10;
    END IF;
    IF p_session_format IS NOT NULL AND p_session_format != '' THEN
        strength := strength + 10;
    END IF;

    -- Verification (20%): Second insurance_confirmed check (10%), id_document_url (10%)
    -- FIXED: This maintains the original double-counting behavior for true rollback compatibility
    IF p_insurance_confirmed = true THEN
        strength := strength + 10;
    END IF;
    IF p_id_document_url IS NOT NULL AND p_id_document_url != '' THEN
        strength := strength + 10;
    END IF;

    -- Ensure we don't exceed 100
    IF strength > 100 THEN
        strength := 100;
    END IF;

    RETURN strength;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Restore original trigger function with adapted parameters
CREATE OR REPLACE FUNCTION update_profile_strength_trigger()
RETURNS TRIGGER AS $$
BEGIN
    NEW.profile_strength := calculate_profile_strength(
        NEW.license_number,
        NEW.bio,
        NEW.avatar_url,
        NEW.specialties,
        NEW.communication_style,
        NEW.session_format,
        NEW.insurance_confirmed,
        NEW.id_document_url
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recalculate profile strength using adapted original method
UPDATE therapist_profiles
SET profile_strength = calculate_profile_strength(
    license_number,
    bio,
    avatar_url,
    specialties,
    communication_style,
    session_format,
    insurance_confirmed,
    id_document_url
)
WHERE profile_strength IS NOT NULL;

-- Restore original comment (adapted for current schema)
COMMENT ON FUNCTION calculate_profile_strength IS
'Original profile strength calculation adapted for current schema:
- Credentials (20%): license_number (10%) + insurance_confirmed (10%)
- Profile Content (20%): bio ≥50 chars (10%) + avatar_url (10%)
- Specialties (20%): At least 1 specialty (20%)
- Communication (20%): communication_style (10%) + session_format (10%)
- Verification (20%): insurance_confirmed again (10%) + id_document_url (10%)
NOTE: Intentionally double-counts insurance_confirmed to maintain original behavior';

COMMIT;