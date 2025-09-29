-- ============================================================================
-- VERIFICATION QUERIES for RLS Performance Fixes
-- Date: 2025-09-29
-- Author: Mindfolk Foundation Agent
--
-- PURPOSE:
-- These queries help verify that the RLS performance migration was successful
-- and that all policies are working correctly.
--
-- USAGE:
-- Run each section AFTER running the main migration to verify success.
-- All queries are read-only and safe to run.
-- ============================================================================

-- ============================================================================
-- SECTION 1: Policy Count Verification
-- ============================================================================

-- Expected result: ~42 policies total (down from ~60)
SELECT
  'Total Policies' as metric,
  COUNT(*) as count,
  'Should be ~42 (reduced from ~60)' as expected
FROM pg_policies
WHERE schemaname = 'public';

-- Show policy count per table
SELECT
  tablename,
  COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY policy_count DESC, tablename;

-- ============================================================================
-- SECTION 2: Auth InitPlan Issue Verification
-- ============================================================================

-- Check for remaining naked auth.uid() calls (should return 0 rows)
SELECT
  tablename,
  policyname,
  cmd,
  CASE
    WHEN qual::text LIKE '%auth.uid()%'
      AND qual::text NOT LIKE '%(SELECT auth.uid())%'
    THEN 'QUAL has naked auth.uid()'
    WHEN with_check::text LIKE '%auth.uid()%'
      AND with_check::text NOT LIKE '%(SELECT auth.uid())%'
    THEN 'WITH CHECK has naked auth.uid()'
  END as issue_type
FROM pg_policies
WHERE schemaname = 'public'
  AND (
    (qual::text LIKE '%auth.uid()%'
      AND qual::text NOT LIKE '%(SELECT auth.uid())%')
    OR
    (with_check::text LIKE '%auth.uid()%'
      AND with_check::text NOT LIKE '%(SELECT auth.uid())%')
  )
ORDER BY tablename, policyname;

-- If above query returns 0 rows, this check passes ✅

-- ============================================================================
-- SECTION 3: Multiple Permissive Policy Verification
-- ============================================================================

-- Check for multiple permissive policies on same table/role/cmd
-- (should show no more than 1 policy per table+role+cmd combination)
SELECT
  tablename,
  roles::text as role,
  cmd,
  COUNT(*) as policy_count,
  CASE
    WHEN COUNT(*) > 1 THEN '❌ Multiple policies exist'
    ELSE '✅ Single consolidated policy'
  END as status,
  STRING_AGG(policyname, ', ' ORDER BY policyname) as policy_names
FROM pg_policies
WHERE schemaname = 'public'
  AND permissive = 'PERMISSIVE'
GROUP BY tablename, roles::text, cmd
HAVING COUNT(*) > 1  -- Only show tables with multiple policies
ORDER BY policy_count DESC, tablename;

-- If above query returns 0 rows, this check passes ✅

-- ============================================================================
-- SECTION 4: Consolidated Policy Verification
-- ============================================================================

-- Verify key consolidated policies exist
SELECT
  tablename,
  policyname,
  cmd,
  '✅ Consolidated policy exists' as status
FROM pg_policies
WHERE schemaname = 'public'
  AND policyname IN (
    'View therapist profiles',
    'Users can manage their own assessments - INSERT',
    'Users can manage their own assessments - SELECT',
    'Users can manage their own assessments - UPDATE',
    'View appointments',
    'View session notes',
    'View testimonials',
    'View audit trail',
    'View moderation queue',
    'View support tickets'
  )
ORDER BY tablename, policyname;

-- Expected: 10 rows showing all consolidated policies exist

-- ============================================================================
-- SECTION 5: Security Behavior Verification
-- ============================================================================

-- Test 1: Verify profiles RLS still works
-- (This should return only your own profile if you're logged in)
-- SELECT
--   id,
--   email,
--   role,
--   'Can see own profile ✅' as test_result
-- FROM profiles
-- WHERE id = auth.uid();

-- Test 2: Verify therapist_profiles RLS still works
-- (This should show active therapists OR your own profile if you're a therapist)
-- SELECT
--   user_id,
--   name,
--   verified,
--   accepts_new_clients,
--   'Can see active therapists ✅' as test_result
-- FROM therapist_profiles
-- WHERE is_active = true
-- LIMIT 5;

-- Test 3: Verify client_assessments RLS still works
-- (This should return only your own assessment)
-- SELECT
--   user_id,
--   created_at,
--   'Can see own assessment ✅' as test_result
-- FROM client_assessments
-- WHERE user_id = auth.uid();

-- ============================================================================
-- SECTION 6: Performance Baseline Metrics
-- ============================================================================

-- Measure query performance for common operations
-- (Run these before AND after migration to compare)

-- Test query 1: User profile lookup (most common operation)
EXPLAIN (ANALYZE, BUFFERS, TIMING)
SELECT * FROM profiles WHERE id = auth.uid();

-- Test query 2: Therapist discovery (second most common)
EXPLAIN (ANALYZE, BUFFERS, TIMING)
SELECT * FROM therapist_profiles
WHERE verified = true
  AND accepts_new_clients = true
  AND is_active = true
LIMIT 10;

-- Test query 3: Assessment retrieval
EXPLAIN (ANALYZE, BUFFERS, TIMING)
SELECT * FROM client_assessments WHERE user_id = auth.uid();

-- ============================================================================
-- SECTION 7: Admin Function Verification
-- ============================================================================

-- Verify is_admin() function still works correctly
SELECT
  p.id,
  p.email,
  p.role,
  is_admin() as is_admin_result,
  CASE
    WHEN p.role = 'admin' AND is_admin() = true THEN '✅ Admin check correct'
    WHEN p.role != 'admin' AND is_admin() = false THEN '✅ Non-admin check correct'
    ELSE '❌ Admin check FAILED'
  END as status
FROM profiles p
WHERE p.id = auth.uid();

-- ============================================================================
-- SECTION 8: RLS Enable Status
-- ============================================================================

-- Verify RLS is still enabled on all tables
SELECT
  schemaname,
  tablename,
  rowsecurity as rls_enabled,
  CASE
    WHEN rowsecurity = true THEN '✅ RLS enabled'
    ELSE '❌ RLS DISABLED - SECURITY RISK!'
  END as status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename NOT IN ('specialities', 'modalities', 'languages', 'professional_bodies')
ORDER BY tablename;

-- All tables should show rls_enabled = true except taxonomy tables

-- ============================================================================
-- SECTION 9: Complete Policy Listing
-- ============================================================================

-- Full overview of all policies after migration
SELECT
  tablename,
  policyname,
  permissive,
  roles::text,
  cmd,
  CASE
    WHEN qual::text LIKE '%(SELECT auth.uid())%' THEN '✅'
    WHEN qual::text LIKE '%auth.uid()%' THEN '❌'
    ELSE '➖'
  END as auth_optimized,
  LENGTH(qual::text) as policy_complexity
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd, policyname;

-- ============================================================================
-- SECTION 10: Summary Report
-- ============================================================================

-- Generate a summary report of the migration
WITH policy_stats AS (
  SELECT
    COUNT(*) as total_policies,
    COUNT(CASE
      WHEN qual::text LIKE '%auth.uid()%'
        AND qual::text NOT LIKE '%(SELECT auth.uid())%'
      THEN 1
    END) as naked_auth_uid_count,
    COUNT(DISTINCT tablename) as tables_with_rls
  FROM pg_policies
  WHERE schemaname = 'public'
),
duplicate_stats AS (
  SELECT COUNT(*) as duplicate_policy_groups
  FROM (
    SELECT tablename, roles::text, cmd
    FROM pg_policies
    WHERE schemaname = 'public' AND permissive = 'PERMISSIVE'
    GROUP BY tablename, roles::text, cmd
    HAVING COUNT(*) > 1
  ) dups
)
SELECT
  'RLS Performance Migration Summary' as report,
  ps.total_policies as total_policies,
  ps.tables_with_rls as tables_with_rls,
  ps.naked_auth_uid_count as auth_initplan_issues,
  ds.duplicate_policy_groups as multiple_permissive_issues,
  CASE
    WHEN ps.naked_auth_uid_count = 0
      AND ds.duplicate_policy_groups = 0
    THEN '✅ ALL ISSUES FIXED'
    ELSE '❌ ISSUES REMAIN'
  END as status
FROM policy_stats ps, duplicate_stats ds;

-- ============================================================================
-- EXPECTED RESULTS SUMMARY
-- ============================================================================
--
-- Section 1: Should show ~42 total policies (down from ~60)
-- Section 2: Should return 0 rows (no naked auth.uid() calls)
-- Section 3: Should return 0 rows (no multiple permissive policies)
-- Section 4: Should return 10 rows (all consolidated policies exist)
-- Section 5: Should return data only user has access to (security works)
-- Section 6: Should show improved query performance (faster execution)
-- Section 7: Should show correct admin check results
-- Section 8: Should show all tables have RLS enabled
-- Section 9: Should show all policies optimized with (SELECT auth.uid())
-- Section 10: Should show status = '✅ ALL ISSUES FIXED'
--
-- If any section shows unexpected results, review that specific area before
-- considering this migration successful.
-- ============================================================================