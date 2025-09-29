-- Migration: Add profile_strength to therapist_profiles_public view
-- Purpose: Enable frontend access to profile completion data for better matching and sorting
-- Date: 2025-09-29
-- Risk: Low - Only adding a field that already exists in the base table
-- Impact: Improves matching algorithm by exposing profile completion percentage

-- Drop the existing view
DROP VIEW IF EXISTS therapist_profiles_public;

-- Recreate the view with profile_strength included
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
    quote,
    profile_strength  -- NEW: Profile completion percentage for better matching
FROM therapist_profiles
WHERE is_active = true
  AND verified = true
  AND accepts_new_clients = true;

-- Add comment to document the view purpose
COMMENT ON VIEW therapist_profiles_public IS
'Public read-only view of verified, active therapist profiles accepting new clients.
Includes profile_strength for matching algorithm optimization.
Used by frontend for therapist discovery and matching.';

-- Grant appropriate permissions (same as base table)
-- Note: RLS policies from therapist_profiles table are automatically inherited
GRANT SELECT ON therapist_profiles_public TO authenticated;
GRANT SELECT ON therapist_profiles_public TO anon;