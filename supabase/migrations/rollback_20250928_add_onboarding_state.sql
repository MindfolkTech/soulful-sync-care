-- ROLLBACK: Remove Contextual Onboarding System from therapist_profiles
-- Date: 2025-09-28
-- Purpose: Rollback for 20250928_add_onboarding_state.sql migration
--
-- WHEN TO USE THIS ROLLBACK:
-- 1. If the onboarding_state column causes application errors
-- 2. If the update_onboarding_progress function has critical bugs
-- 3. If JSONB operations are causing performance issues
-- 4. If the GIN index creation fails and blocks other operations
-- 5. If you need to revert to the previous onboarding system immediately
--
-- WHAT THIS ROLLBACK DOES:
-- 1. Drops the update_onboarding_progress function
-- 2. Drops the GIN index on onboarding_state
-- 3. Removes the onboarding_state column from therapist_profiles
-- 4. All onboarding progress data will be permanently lost
--
-- WARNING: This rollback is DESTRUCTIVE - all onboarding progress will be lost!

-- Step 1: Drop the function first (removes dependency)
DROP FUNCTION IF EXISTS update_onboarding_progress(UUID, TEXT, TEXT);

-- Step 2: Drop the GIN index (may take time on large tables)
DROP INDEX CONCURRENTLY IF EXISTS idx_therapist_profiles_onboarding_state_gin;

-- Step 3: Remove the onboarding_state column
-- WARNING: This permanently deletes all onboarding progress data
ALTER TABLE therapist_profiles
  DROP COLUMN IF EXISTS onboarding_state;

-- Verification: Check that column is removed
-- This should return 0 rows if rollback was successful
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'therapist_profiles'
  AND column_name = 'onboarding_state'
  AND table_schema = 'public';

-- Verification: Check that function is removed
-- This should return 0 rows if rollback was successful
SELECT routine_name
FROM information_schema.routines
WHERE routine_name = 'update_onboarding_progress'
  AND routine_schema = 'public';

-- Verification: Check that index is removed
-- This should return 0 rows if rollback was successful
SELECT indexname
FROM pg_indexes
WHERE tablename = 'therapist_profiles'
  AND indexname = 'idx_therapist_profiles_onboarding_state_gin';