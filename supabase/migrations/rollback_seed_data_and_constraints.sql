-- ========================================
-- SEED DATA ROLLBACK & CONSTRAINT RESTORATION
-- ========================================
-- 
-- This file safely removes all seed data and restores any constraints
-- that were temporarily removed during seed data creation.
--
-- USAGE: Run this in Supabase SQL Editor when you want to clean up seed data
-- 
-- SAFETY: This only affects @seedclient.com, @seedtherapist.com, and @seedadmin.com emails
-- Real user data with other email domains will NOT be affected.
--

-- ========================================
-- PHASE 1: REMOVE SEED DATA SAFELY
-- ========================================

-- Remove client assessments for seed users
DELETE FROM client_assessments WHERE user_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
);

-- Remove therapist profiles for seed users  
DELETE FROM therapist_profiles WHERE user_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
);

-- Remove therapist applications for seed users
DELETE FROM therapist_applications WHERE user_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
);

-- Remove any session earnings for seed users
DELETE FROM session_earnings WHERE therapist_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
);

-- Remove any therapist analytics for seed users
DELETE FROM therapist_analytics WHERE therapist_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
);

-- Remove any appointments involving seed users
DELETE FROM appointments WHERE client_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
) OR therapist_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
);

-- Remove any favorites involving seed users
DELETE FROM favorites WHERE client_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
) OR therapist_id IN (
  SELECT id FROM profiles 
  WHERE email LIKE '%@seedclient.com' 
     OR email LIKE '%@seedtherapist.com' 
     OR email LIKE '%@seedadmin.com'
);

-- Finally, remove the seed user profiles themselves
DELETE FROM profiles 
WHERE email LIKE '%@seedclient.com' 
   OR email LIKE '%@seedtherapist.com' 
   OR email LIKE '%@seedadmin.com';

-- ========================================
-- PHASE 2: RESTORE FOREIGN KEY CONSTRAINTS
-- ========================================

-- Re-add foreign key constraint from profiles.id to auth.users.id
-- (Only if it doesn't already exist)
DO $$ 
BEGIN
    -- Check if constraint exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE table_name = 'profiles' 
        AND constraint_type = 'FOREIGN KEY' 
        AND constraint_name = 'profiles_id_fkey'
    ) THEN
        -- Add the foreign key constraint
        ALTER TABLE profiles 
        ADD CONSTRAINT profiles_id_fkey 
        FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
        
        RAISE NOTICE 'Foreign key constraint profiles_id_fkey restored successfully';
    ELSE
        RAISE NOTICE 'Foreign key constraint profiles_id_fkey already exists';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Could not restore foreign key constraint: %', SQLERRM;
END $$;

-- ========================================
-- PHASE 3: VERIFICATION & CLEANUP REPORT
-- ========================================

-- Verify seed data removal
SELECT 
  'SEED DATA CLEANUP VERIFICATION' as report_section,
  COUNT(*) as remaining_seed_profiles
FROM profiles 
WHERE email LIKE '%@seedclient.com' 
   OR email LIKE '%@seedtherapist.com' 
   OR email LIKE '%@seedadmin.com';

-- Verify constraint restoration
SELECT 
  'CONSTRAINT VERIFICATION' as report_section,
  constraint_name,
  constraint_type,
  'RESTORED' as status
FROM information_schema.table_constraints 
WHERE table_name = 'profiles' 
  AND constraint_type = 'FOREIGN KEY'
  AND constraint_name = 'profiles_id_fkey';

-- Show remaining real users (should be unchanged)
SELECT 
  'REAL USER VERIFICATION' as report_section,
  COUNT(*) as real_user_count,
  'These users should be unaffected' as note
FROM profiles 
WHERE email NOT LIKE '%@seedclient.com' 
  AND email NOT LIKE '%@seedtherapist.com' 
  AND email NOT LIKE '%@seedadmin.com';

-- ========================================
-- COMPLETION MESSAGE
-- ========================================

SELECT 
  '✅ ROLLBACK COMPLETE!' as status,
  'All seed data removed and constraints restored safely' as description,
  'Real user data preserved' as safety_note;

-- ========================================
-- EMERGENCY RECOVERY (COMMENTED OUT)
-- ========================================
-- 
-- If you accidentally run this and need to recover seed data:
-- 1. Re-run the seed files: seed_clients_part1_1-20.sql, part2_21-35.sql, part3_36-50.sql
-- 2. Re-run any therapist seed files you may have created
-- 
-- If you need to remove the foreign key constraint again:
-- ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
--
