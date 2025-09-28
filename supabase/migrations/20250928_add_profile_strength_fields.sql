-- Migration: Add Profile Strength System to therapist_profiles
-- Date: 2025-09-28
-- Purpose: V2 Onboarding - Add missing fields for profile completion tracking
-- Risk: Low - Only adding new columns with safe defaults

-- Add the 3 missing fields
ALTER TABLE therapist_profiles
  ADD COLUMN profile_strength integer DEFAULT 0 CHECK (profile_strength >= 0 AND profile_strength <= 100),
  ADD COLUMN insurance_confirmed boolean DEFAULT false,
  ADD COLUMN id_document_url text;

-- Add comment for profile_strength field
COMMENT ON COLUMN therapist_profiles.profile_strength IS 'Profile completion percentage (0-100) calculated automatically';
COMMENT ON COLUMN therapist_profiles.insurance_confirmed IS 'Whether therapist has confirmed their insurance details';
COMMENT ON COLUMN therapist_profiles.id_document_url IS 'URL to uploaded ID document for verification';

-- Create function to calculate profile strength based on completed fields
CREATE OR REPLACE FUNCTION calculate_profile_strength(therapist_row therapist_profiles)
RETURNS integer AS $$
DECLARE
  strength integer := 0;
  basic_info_score integer := 0;
  specialties_score integer := 0;
  communication_score integer := 0;
  policies_score integer := 0;
  media_score integer := 0;
BEGIN
  -- Basic info (20%): name, license_number, bio
  IF therapist_row.name IS NOT NULL AND therapist_row.name != '' THEN
    basic_info_score := basic_info_score + 7;
  END IF;

  IF therapist_row.license_number IS NOT NULL AND
     therapist_row.license_number != '' AND
     therapist_row.license_number != 'PENDING_SETUP' THEN
    basic_info_score := basic_info_score + 7;
  END IF;

  IF therapist_row.bio IS NOT NULL AND therapist_row.bio != '' THEN
    basic_info_score := basic_info_score + 6;
  END IF;

  -- Specialties/modalities (20%): at least 2 of each
  IF array_length(therapist_row.specialties, 1) >= 2 THEN
    specialties_score := specialties_score + 10;
  END IF;

  IF array_length(therapist_row.modalities, 1) >= 2 THEN
    specialties_score := specialties_score + 10;
  END IF;

  -- Communication preferences (20%): communication_style, session_format
  IF therapist_row.communication_style IS NOT NULL AND therapist_row.communication_style != '' THEN
    communication_score := communication_score + 10;
  END IF;

  IF therapist_row.session_format IS NOT NULL AND therapist_row.session_format != '' THEN
    communication_score := communication_score + 10;
  END IF;

  -- Policies (20%): cancellation_policy, rescheduling_policy
  IF therapist_row.cancellation_policy IS NOT NULL AND therapist_row.cancellation_policy != '' THEN
    policies_score := policies_score + 10;
  END IF;

  IF therapist_row.rescheduling_policy IS NOT NULL AND therapist_row.rescheduling_policy != '' THEN
    policies_score := policies_score + 10;
  END IF;

  -- Media (20%): avatar_url, video_url or quote
  IF therapist_row.avatar_url IS NOT NULL AND therapist_row.avatar_url != '' THEN
    media_score := media_score + 10;
  END IF;

  IF (therapist_row.video_url IS NOT NULL AND therapist_row.video_url != '') OR
     (therapist_row.quote IS NOT NULL AND therapist_row.quote != '') THEN
    media_score := media_score + 10;
  END IF;

  -- Calculate total strength
  strength := basic_info_score + specialties_score + communication_score + policies_score + media_score;

  -- Ensure we don't exceed 100
  IF strength > 100 THEN
    strength := 100;
  END IF;

  RETURN strength;
END;
$$ LANGUAGE plpgsql;

-- Create trigger function to auto-update profile_strength
CREATE OR REPLACE FUNCTION update_profile_strength_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.profile_strength := calculate_profile_strength(NEW);
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update profile_strength on changes
DROP TRIGGER IF EXISTS trigger_update_profile_strength ON therapist_profiles;
CREATE TRIGGER trigger_update_profile_strength
  BEFORE UPDATE ON therapist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_strength_trigger();

-- Backfill profile_strength for existing therapists
UPDATE therapist_profiles
SET profile_strength = calculate_profile_strength(therapist_profiles.*);

-- Verify the update worked
SELECT
  name,
  profile_strength,
  CASE
    WHEN profile_strength >= 80 THEN 'Complete'
    WHEN profile_strength >= 60 THEN 'Nearly Complete'
    WHEN profile_strength >= 40 THEN 'In Progress'
    ELSE 'Incomplete'
  END as status
FROM therapist_profiles
ORDER BY profile_strength DESC;