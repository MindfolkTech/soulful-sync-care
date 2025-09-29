-- ROLLBACK Migration: Remove profile_strength from therapist_profiles_public view
-- Date: 2025-09-29
--
-- WHEN TO USE THIS ROLLBACK:
-- 1. If the migration causes frontend errors related to profile_strength field access
-- 2. If there are performance issues with the updated view (unlikely but possible)
-- 3. If you need to revert to the previous view structure for any reason
-- 4. If the matching algorithm needs to be disabled temporarily
--
-- WHAT THIS ROLLBACK DOES:
-- - Drops the current therapist_profiles_public view (with profile_strength)
-- - Recreates the original view without the profile_strength field
-- - Restores the exact same structure and filters as before the migration
-- - Maintains all existing permissions and RLS inheritance

-- Drop the current view with profile_strength
DROP VIEW IF EXISTS therapist_profiles_public;

-- Recreate the original view without profile_strength
CREATE VIEW therapist_profiles_public AS
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
    -- NOTE: profile_strength field is intentionally excluded (original structure)
FROM therapist_profiles
WHERE is_active = true
  AND verified = true;  -- NOTE: Restored original filter (without accepts_new_clients = true)

-- Restore original comment
COMMENT ON VIEW therapist_profiles_public IS
'Public read-only view of verified, active therapist profiles.
Used by frontend for therapist discovery.';

-- Grant appropriate permissions (same as before)
GRANT SELECT ON therapist_profiles_public TO authenticated;
GRANT SELECT ON therapist_profiles_public TO anon;