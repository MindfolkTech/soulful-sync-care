-- ========================================
-- ADD QUOTE FIELD TO THERAPIST PROFILES
-- Add quote field for short client-facing messages
-- ========================================

-- Add quote field to therapist_profiles table
ALTER TABLE therapist_profiles 
ADD COLUMN quote TEXT;

-- Add comment explaining the field
COMMENT ON COLUMN therapist_profiles.quote IS 'Short client-facing message or tagline (max 60 characters recommended)';

-- Update therapist_profiles_public view to include the new quote field
DROP VIEW IF EXISTS therapist_profiles_public;

CREATE VIEW therapist_profiles_public AS
SELECT 
  id,
  name,
  tagline,
  bio,
  quote,  -- NEW FIELD ADDED HERE
  avatar_url,
  video_url,
  communication_style,
  session_format,
  gender_identity,
  specialties,
  modalities,
  languages,
  personality_tags,
  session_focus,
  identity_tags,
  cultural_background,
  age_group,
  years_experience,
  location_city,
  location_country,
  session_rates,
  availability,
  accepts_new_clients,
  online_sessions,
  in_person_sessions,
  verified,
  created_at,
  updated_at
FROM therapist_profiles
WHERE verified = true 
  AND accepts_new_clients = true 
  AND is_active = true;

-- Add comment explaining the view purpose
COMMENT ON VIEW therapist_profiles_public IS 'Public view of therapist profiles with quote field included. Filters to only show verified, active therapists accepting new clients.';

-- Verify the changes
SELECT 'Quote field added to therapist_profiles and therapist_profiles_public view updated successfully' as status;
