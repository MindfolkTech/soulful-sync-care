-- Cleanup duplicate and unused columns after matching system update
-- Date: September 26, 2025

-- ============================================
-- STEP 1: Migrate any remaining data from duplicate columns
-- ============================================

-- Migrate specialities (typo) to specialties if any data exists
UPDATE therapist_profiles
SET specialties = COALESCE(
    CASE 
        WHEN array_length(specialties, 1) > 0 THEN specialties
        WHEN array_length(specialities, 1) > 0 THEN specialities
        ELSE '{}'::text[]
    END,
    '{}'::text[]
)
WHERE specialities IS NOT NULL 
AND array_length(specialities, 1) > 0
AND (specialties IS NULL OR array_length(specialties, 1) = 0);

-- Migrate experience_years integer to years_experience text if missing
UPDATE therapist_profiles
SET years_experience = CASE
    WHEN years_experience IS NULL AND experience_years IS NOT NULL THEN
        CASE
            WHEN experience_years < 2 THEN 'Less than 2 years'
            WHEN experience_years < 5 THEN 'More than 2 years'
            WHEN experience_years < 10 THEN 'More than 5 years'
            ELSE 'More than 10 years'
        END
    ELSE years_experience
END
WHERE experience_years IS NOT NULL AND years_experience IS NULL;

-- ============================================
-- STEP 2: Drop duplicate/unused columns from client_assessments
-- ============================================

ALTER TABLE client_assessments 
-- Keep age_group - needed for "similar age" matching
-- Keep gender_identity - needed for "same gender" matching
DROP COLUMN IF EXISTS therapist_age_preference, -- Replaced by experience_preference
DROP COLUMN IF EXISTS gender_preferences, -- Replaced by prefers_same_gender boolean
DROP COLUMN IF EXISTS cultural_considerations, -- Vague, replaced by cultural_identity
DROP COLUMN IF EXISTS religious_preferences, -- Not used in UI
DROP COLUMN IF EXISTS session_frequency, -- Not used in filters
DROP COLUMN IF EXISTS session_length_preference; -- Not used in filters

-- ============================================
-- STEP 3: Handle view dependencies before dropping columns
-- ============================================

-- Store the current view definition (if needed for recreation)
-- Note: session_focus is being dropped, so we need to handle the view

-- Drop the view that depends on session_focus
DROP VIEW IF EXISTS therapist_profiles_public CASCADE;

-- ============================================
-- STEP 4: Drop duplicate/unused columns from therapist_profiles
-- ============================================

ALTER TABLE therapist_profiles
DROP COLUMN IF EXISTS experience_years, -- Duplicate of years_experience
DROP COLUMN IF EXISTS specialities, -- Typo of specialties
DROP COLUMN IF EXISTS pride_attributes, -- Old naming, replaced by identity_tags
DROP COLUMN IF EXISTS session_focus; -- Unclear purpose, not used in matching

-- ============================================
-- STEP 5: Recreate the view without the dropped columns
-- ============================================

-- Recreate therapist_profiles_public view without session_focus
CREATE OR REPLACE VIEW therapist_profiles_public AS
SELECT 
    id,
    user_id,
    name,
    tagline,
    bio,
    avatar_url,
    specialties,
    modalities,
    languages,
    personality_tags,
    session_rates,
    availability,
    location_city,
    location_state,
    location_country,
    timezone,
    accepts_new_clients,
    online_sessions,
    in_person_sessions,
    verified,
    identity_tags,
    gender_identity,
    age_group,
    cultural_background,
    years_experience,
    communication_style,
    session_format,
    video_url,
    quote
FROM therapist_profiles
WHERE is_active = true AND verified = true;

-- ============================================
-- STEP 6: Add comments for clarity on remaining columns
-- ============================================

-- Client assessment columns
COMMENT ON COLUMN client_assessments.age_group IS 'Client age group for similar age matching';
COMMENT ON COLUMN client_assessments.gender_identity IS 'Client gender for same gender matching';
COMMENT ON COLUMN client_assessments.prefers_similar_age IS 'Client wants therapist of similar age';
COMMENT ON COLUMN client_assessments.prefers_same_gender IS 'Client wants therapist of same gender';

-- Therapist profile columns
COMMENT ON COLUMN therapist_profiles.age_group IS 'Therapist age group for similar age matching';
COMMENT ON COLUMN therapist_profiles.gender_identity IS 'Therapist gender for same gender matching';
COMMENT ON COLUMN therapist_profiles.specialties IS 'Main specialties column (NOT specialities)';
COMMENT ON COLUMN therapist_profiles.years_experience IS 'Experience in new format: Less than 2 years, More than 2 years, etc.';

-- ============================================
-- STEP 7: Verify data integrity
-- ============================================

-- Log the cleanup results
DO $$
DECLARE
    client_count INTEGER;
    therapist_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO client_count FROM client_assessments;
    SELECT COUNT(*) INTO therapist_count FROM therapist_profiles;
    
    RAISE NOTICE 'Column cleanup complete. % client assessments and % therapist profiles processed.', 
        client_count, therapist_count;
END $$;
