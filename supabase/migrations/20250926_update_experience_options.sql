-- Update experience level options for therapist profiles
-- Changes from ranges to minimum thresholds

-- First, update any existing therapist_profiles data
UPDATE therapist_profiles 
SET years_experience = CASE
  WHEN years_experience IN ('Under 5 years', '0-2 years', '<2 years', '0-2') THEN 'Less than 2 years'
  WHEN years_experience IN ('2-5 years', '3-5 years', '2-5') THEN 'More than 2 years'
  WHEN years_experience IN ('5-10 years', '5+ years', '5-10', '8+ years', '6+ years', '7+ years') THEN 'More than 5 years'
  WHEN years_experience IN ('10+ years', '10-15 years', '15+ years', 'Over 10 years', '10+') THEN 'More than 10 years'
  ELSE years_experience
END
WHERE years_experience IS NOT NULL;

-- Add new valid options as a CHECK constraint
ALTER TABLE therapist_profiles 
DROP CONSTRAINT IF EXISTS therapist_profiles_years_experience_check;

ALTER TABLE therapist_profiles
ADD CONSTRAINT therapist_profiles_years_experience_check 
CHECK (years_experience IN (
  'Less than 2 years',
  'More than 2 years',
  'More than 5 years',
  'More than 10 years'
));

-- Update client_assessments experience preference column
ALTER TABLE client_assessments 
ADD COLUMN IF NOT EXISTS experience_preference text;

-- Update any existing client preference data
UPDATE client_assessments
SET experience_preference = CASE
  WHEN therapist_age_preference IN ('Under 5 years', '0-2 years') THEN 'More than 2 years'
  WHEN therapist_age_preference IN ('5-10 years', '5+ years') THEN 'More than 5 years'
  WHEN therapist_age_preference IN ('10+ years', 'Over 10 years') THEN 'More than 10 years'
  WHEN therapist_age_preference IN ('No preference', NULL) THEN 'No preference'
  ELSE therapist_age_preference
END;

-- Add comment for clarity
COMMENT ON COLUMN therapist_profiles.years_experience IS 'Therapist years of experience: Less than 2 years, More than 2 years, More than 5 years, More than 10 years';
COMMENT ON COLUMN client_assessments.experience_preference IS 'Client preference for therapist experience: No preference, More than 2 years, More than 5 years, More than 10 years';

-- Update the matching algorithm to handle the new format
-- The algorithm should check if therapist meets minimum threshold:
-- e.g., if client wants "More than 5 years", therapist with "More than 10 years" also matches
