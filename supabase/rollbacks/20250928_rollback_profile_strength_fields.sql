-- ROLLBACK: Remove Profile Strength System from therapist_profiles
-- Date: 2025-09-28
--
-- WHEN TO USE THIS ROLLBACK:
-- 1. Profile strength calculations are incorrect and causing issues
-- 2. Trigger is causing performance problems on therapist_profiles updates
-- 3. New fields are interfering with existing application logic
-- 4. Migration caused data corruption (though this should not happen)
--
-- WHAT THIS ROLLBACK DOES:
-- - Removes the auto-update trigger for profile_strength
-- - Drops the profile strength calculation functions
-- - Removes the 3 new columns: profile_strength, insurance_confirmed, id_document_url
-- - All existing data in other columns will remain intact
--
-- RISK LEVEL: Low - Only removes new additions, no existing data affected

-- Step 1: Remove the trigger first
DROP TRIGGER IF EXISTS trigger_update_profile_strength ON therapist_profiles;

-- Step 2: Drop the trigger function
DROP FUNCTION IF EXISTS update_profile_strength_trigger();

-- Step 3: Drop the calculation function
DROP FUNCTION IF EXISTS calculate_profile_strength(therapist_profiles);

-- Step 4: Remove the new columns
ALTER TABLE therapist_profiles
  DROP COLUMN IF EXISTS profile_strength,
  DROP COLUMN IF EXISTS insurance_confirmed,
  DROP COLUMN IF EXISTS id_document_url;

-- Verification: Check that columns are removed
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'therapist_profiles'
AND column_name IN ('profile_strength', 'insurance_confirmed', 'id_document_url');

-- If rollback successful, this query should return 0 rows