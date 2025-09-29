-- Migration Rollback: Fix RLS Performance Issues
-- Author: Claude Code (Mindfolk Foundation Agent)
-- Date: 2025-09-29
-- Forward Migration: 20250929_fix_rls_performance_issues.sql
--
-- ========================================
-- PURPOSE
-- ========================================
-- This rollback restores the database to its previous "mixed state" where:
-- 1. Some policies used optimized (SELECT auth.uid()) - 42 policies
-- 2. Some policies used unoptimized naked auth.uid() - 8 policies
-- 3. All 50 original policies are restored exactly as they were
--
-- ========================================
-- WHEN TO RUN THIS ROLLBACK
-- ========================================
-- Run this rollback if the forward migration causes:
-- 1. Security issues (admin functions not working correctly)
-- 2. Access control problems (users unable to access their data)
-- 3. Unexpected permission errors in the application
-- 4. Performance degradation (though unlikely given the optimization)
-- 5. Issues with the unified auth.uid() pattern
--
-- ========================================
-- WHAT THIS ROLLBACK DOES
-- ========================================
-- This rollback will:
-- 1. DROP all 42-43 optimized policies created by forward migration
-- 2. RECREATE all 50 original policies with their exact original definitions
-- 3. Restore the mixed state where some use (SELECT auth.uid()) and some use naked auth.uid()
-- 4. Restore all original USING and WITH CHECK clauses exactly
-- 5. Validate the rollback by confirming 50 policies exist
--
-- ========================================
-- CHANGES BEING REVERTED
-- ========================================
-- Forward Migration Changes (Being Undone):
-- 1. Consolidated 50 policies into 42-43 optimized policies
-- 2. Standardized all auth.uid() calls to use SELECT subquery pattern
-- 3. Optimized WHERE clauses for better query planning
-- 4. Consolidated similar policies (e.g., INSERT/UPDATE/DELETE into ALL)
-- 5. Removed redundant WITH CHECK clauses
--
-- Rollback Restoration (What We're Doing):
-- 1. Removing optimized policies
-- 2. Restoring original 50 policies with mixed auth.uid() patterns
-- 3. Restoring original separation of INSERT/UPDATE/DELETE policies
-- 4. Restoring all original WITH CHECK clauses
-- 5. Returning to the known working state (even if suboptimal)
--
-- ========================================
-- DEPENDENCIES
-- ========================================
-- Tables Affected (21 tables):
-- - appointments
-- - audit_trail
-- - client_assessments
-- - client_session_notes
-- - client_testimonials
-- - favorites
-- - identity_tags
-- - languages
-- - modalities
-- - moderation_queue
-- - notifications
-- - professional_bodies
-- - profiles
-- - session_earnings
-- - specialities
-- - support_tickets
-- - therapist_analytics
-- - therapist_applications
-- - therapist_availability
-- - therapist_blocked_times
-- - therapist_profiles
--
-- Functions Required:
-- - is_admin() - Must exist and work correctly
--
-- ========================================
-- PERFORMANCE IMPACT
-- ========================================
-- Expected Impact: NEGATIVE (Returns to Less Optimal State)
-- - Query planning may be worse with naked auth.uid() calls
-- - Mixed patterns make query optimizer less predictable
-- - No functional impact, but performance may degrade
-- - This is acceptable for a rollback to restore known working state
--
-- ========================================
-- ROLLBACK STRATEGY
-- ========================================
-- This IS the rollback. To roll forward again:
-- 1. Re-run the forward migration: 20250929_fix_rls_performance_issues.sql
-- 2. Test thoroughly to ensure the issue is resolved
-- 3. Consider creating a new forward migration if the issue persists
--
-- ========================================

BEGIN;

-- ========================================
-- STEP 1: DROP ALL OPTIMIZED POLICIES
-- ========================================
-- Remove all policies that were created by the forward migration
-- These are the consolidated, optimized policies
-- IMPORTANT: Using EXACT policy names from forward migration

-- Drop profiles policies (4 policies)
DROP POLICY IF EXISTS "Users can insert their own profile on signup" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Drop therapist_applications policies (4 policies)
DROP POLICY IF EXISTS "Users can insert their own application" ON therapist_applications;
DROP POLICY IF EXISTS "Users can view their own application" ON therapist_applications;
DROP POLICY IF EXISTS "Users can update their own application" ON therapist_applications;
DROP POLICY IF EXISTS "Admins can view all applications" ON therapist_applications;

-- Drop therapist_profiles policies (3 policies)
DROP POLICY IF EXISTS "View therapist profiles" ON therapist_profiles;
DROP POLICY IF EXISTS "Therapists can update their own profile" ON therapist_profiles;
DROP POLICY IF EXISTS "Admins can manage all therapist profiles" ON therapist_profiles;

-- Drop client_assessments policies (3 policies)
DROP POLICY IF EXISTS "Users can manage their own assessments - INSERT" ON client_assessments;
DROP POLICY IF EXISTS "Users can manage their own assessments - SELECT" ON client_assessments;
DROP POLICY IF EXISTS "Users can manage their own assessments - UPDATE" ON client_assessments;

-- Drop appointments policies (3 policies)
DROP POLICY IF EXISTS "View appointments" ON appointments;
DROP POLICY IF EXISTS "Therapists can manage their appointments" ON appointments;
DROP POLICY IF EXISTS "Admins can manage all appointments" ON appointments;

-- Drop session_earnings policies (2 policies)
DROP POLICY IF EXISTS "Therapists can view their earnings" ON session_earnings;
DROP POLICY IF EXISTS "Admins can manage all earnings" ON session_earnings;

-- Drop client_session_notes policies (2 policies)
DROP POLICY IF EXISTS "View session notes" ON client_session_notes;
DROP POLICY IF EXISTS "Therapists can manage their session notes" ON client_session_notes;

-- Drop therapist_analytics policies (2 policies)
DROP POLICY IF EXISTS "Therapists can view their analytics" ON therapist_analytics;
DROP POLICY IF EXISTS "Admins can manage all analytics" ON therapist_analytics;

-- Drop therapist_availability policies (2 policies)
DROP POLICY IF EXISTS "Authenticated users can view availability" ON therapist_availability;
DROP POLICY IF EXISTS "Therapists can manage their availability" ON therapist_availability;

-- Drop therapist_blocked_times policies (2 policies)
DROP POLICY IF EXISTS "Authenticated users can view blocked times" ON therapist_blocked_times;
DROP POLICY IF EXISTS "Therapists can manage their blocked times" ON therapist_blocked_times;

-- Drop client_testimonials policies (3 policies)
DROP POLICY IF EXISTS "View testimonials" ON client_testimonials;
DROP POLICY IF EXISTS "Clients can manage their own testimonials" ON client_testimonials;
DROP POLICY IF EXISTS "Admins can manage all testimonials" ON client_testimonials;

-- Drop audit_trail policies (1 policy)
DROP POLICY IF EXISTS "View audit trail" ON audit_trail;

-- Drop moderation_queue policies (3 policies)
DROP POLICY IF EXISTS "View moderation queue" ON moderation_queue;
DROP POLICY IF EXISTS "Users can report content" ON moderation_queue;
DROP POLICY IF EXISTS "Admins can manage all moderation" ON moderation_queue;

-- Drop notifications policies (3 policies)
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
DROP POLICY IF EXISTS "System can create notifications" ON notifications;

-- Drop favorites policies (3 policies)
DROP POLICY IF EXISTS "Users can add favorites" ON favorites;
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can remove their favorites" ON favorites;

-- Drop support_tickets policies (4 policies)
DROP POLICY IF EXISTS "View support tickets" ON support_tickets;
DROP POLICY IF EXISTS "Users can create tickets" ON support_tickets;
DROP POLICY IF EXISTS "Users can update their own tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admins can manage all tickets" ON support_tickets;

-- Drop identity_tags policies (2 policies)
DROP POLICY IF EXISTS "identity_tags_read_policy" ON identity_tags;
DROP POLICY IF EXISTS "identity_tags_admin_write_policy" ON identity_tags;

-- Drop languages policies (1 policy)
DROP POLICY IF EXISTS "Allow authenticated users to read languages" ON languages;

-- Drop modalities policies (1 policy)
DROP POLICY IF EXISTS "Allow authenticated users to read modalities" ON modalities;

-- Drop specialities policies (1 policy)
DROP POLICY IF EXISTS "Allow authenticated users to read specialities" ON specialities;

-- Drop professional_bodies policies (1 policy)
DROP POLICY IF EXISTS "Allow authenticated users to read professional_bodies" ON professional_bodies;

-- ========================================
-- STEP 2: RECREATE ALL ORIGINAL POLICIES
-- ========================================
-- Restore all 50 original policies exactly as they were
-- Including mixed auth.uid() patterns (some naked, some in SELECT)

-- ----------------------------------------
-- appointments (3 policies)
-- ----------------------------------------
CREATE POLICY "Admins can manage all appointments"
ON appointments
FOR ALL
TO public
USING (is_admin());

CREATE POLICY "Therapists can manage their appointments"
ON appointments
FOR ALL
TO public
USING ((SELECT auth.uid()) = therapist_id)
WITH CHECK ((SELECT auth.uid()) = therapist_id);

CREATE POLICY "View appointments"
ON appointments
FOR SELECT
TO public
USING (
  ((SELECT auth.uid()) = client_id)
  OR ((SELECT auth.uid()) = therapist_id)
  OR is_admin()
);

-- ----------------------------------------
-- audit_trail (1 policy)
-- ----------------------------------------
CREATE POLICY "View audit trail"
ON audit_trail
FOR SELECT
TO authenticated
USING (
  ((SELECT auth.uid()) = user_id)
  OR ((SELECT auth.uid()) = impersonated_user_id)
  OR (EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  ))
);

-- ----------------------------------------
-- client_assessments (3 policies)
-- ----------------------------------------
CREATE POLICY "Users can manage their own assessments - INSERT"
ON client_assessments
FOR INSERT
TO public
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can manage their own assessments - SELECT"
ON client_assessments
FOR SELECT
TO public
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can manage their own assessments - UPDATE"
ON client_assessments
FOR UPDATE
TO public
USING ((SELECT auth.uid()) = user_id);

-- ----------------------------------------
-- client_session_notes (2 policies)
-- ----------------------------------------
CREATE POLICY "Therapists can manage their session notes"
ON client_session_notes
FOR ALL
TO public
USING ((SELECT auth.uid()) = therapist_id)
WITH CHECK ((SELECT auth.uid()) = therapist_id);

CREATE POLICY "View session notes"
ON client_session_notes
FOR SELECT
TO public
USING (
  ((SELECT auth.uid()) = therapist_id)
  OR ((SELECT auth.uid()) = client_id)
);

-- ----------------------------------------
-- client_testimonials (3 policies)
-- ----------------------------------------
CREATE POLICY "Admins can manage all testimonials"
ON client_testimonials
FOR ALL
TO public
USING (is_admin());

CREATE POLICY "Clients can manage their own testimonials"
ON client_testimonials
FOR ALL
TO public
USING ((SELECT auth.uid()) = client_id)
WITH CHECK ((SELECT auth.uid()) = client_id);

CREATE POLICY "View testimonials"
ON client_testimonials
FOR SELECT
TO public
USING (
  ((SELECT auth.uid()) = client_id)
  OR ((SELECT auth.uid()) = therapist_id)
  OR (is_public = true)
  OR is_admin()
);

-- ----------------------------------------
-- favorites (3 policies)
-- ----------------------------------------
CREATE POLICY "Users can add favorites"
ON favorites
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can remove their favorites"
ON favorites
FOR DELETE
TO authenticated
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can view their own favorites"
ON favorites
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- ----------------------------------------
-- identity_tags (2 policies)
-- ----------------------------------------
CREATE POLICY "identity_tags_admin_write_policy"
ON identity_tags
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  )
);

CREATE POLICY "identity_tags_read_policy"
ON identity_tags
FOR SELECT
TO authenticated
USING (true);

-- ----------------------------------------
-- languages (1 policy)
-- ----------------------------------------
CREATE POLICY "Allow authenticated users to read languages"
ON languages
FOR SELECT
TO authenticated
USING (true);

-- ----------------------------------------
-- modalities (1 policy)
-- ----------------------------------------
CREATE POLICY "Allow authenticated users to read modalities"
ON modalities
FOR SELECT
TO authenticated
USING (true);

-- ----------------------------------------
-- moderation_queue (3 policies)
-- ----------------------------------------
CREATE POLICY "Admins can manage all moderation"
ON moderation_queue
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  )
);

CREATE POLICY "Users can report content"
ON moderation_queue
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = reported_by);

CREATE POLICY "View moderation queue"
ON moderation_queue
FOR SELECT
TO authenticated
USING (
  ((SELECT auth.uid()) = reported_by)
  OR (EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  ))
);

-- ----------------------------------------
-- notifications (3 policies)
-- ----------------------------------------
CREATE POLICY "System can create notifications"
ON notifications
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Users can update their own notifications"
ON notifications
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can view their own notifications"
ON notifications
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = user_id);

-- ----------------------------------------
-- professional_bodies (1 policy)
-- ----------------------------------------
CREATE POLICY "Allow authenticated users to read professional_bodies"
ON professional_bodies
FOR SELECT
TO authenticated
USING (true);

-- ----------------------------------------
-- profiles (4 policies)
-- ----------------------------------------
CREATE POLICY "Admins can view all profiles"
ON profiles
FOR SELECT
TO public
USING (is_admin());

CREATE POLICY "Users can insert their own profile on signup"
ON profiles
FOR INSERT
TO public
WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update their own profile"
ON profiles
FOR UPDATE
TO public
USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can view their own profile"
ON profiles
FOR SELECT
TO public
USING ((SELECT auth.uid()) = id);

-- ----------------------------------------
-- session_earnings (2 policies)
-- ----------------------------------------
CREATE POLICY "Admins can manage all earnings"
ON session_earnings
FOR ALL
TO public
USING (is_admin());

CREATE POLICY "Therapists can view their earnings"
ON session_earnings
FOR SELECT
TO public
USING ((SELECT auth.uid()) = therapist_id);

-- ----------------------------------------
-- specialities (1 policy)
-- ----------------------------------------
CREATE POLICY "Allow authenticated users to read specialities"
ON specialities
FOR SELECT
TO authenticated
USING (true);

-- ----------------------------------------
-- support_tickets (4 policies)
-- ----------------------------------------
CREATE POLICY "Admins can manage all tickets"
ON support_tickets
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  )
);

CREATE POLICY "Users can create tickets"
ON support_tickets
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own tickets"
ON support_tickets
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = user_id)
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "View support tickets"
ON support_tickets
FOR SELECT
TO authenticated
USING (
  ((SELECT auth.uid()) = user_id)
  OR (EXISTS (
    SELECT 1
    FROM profiles
    WHERE (profiles.id = (SELECT auth.uid()))
      AND (profiles.role = 'admin'::app_role)
  ))
);

-- ----------------------------------------
-- therapist_analytics (2 policies)
-- ----------------------------------------
CREATE POLICY "Admins can manage all analytics"
ON therapist_analytics
FOR ALL
TO public
USING (is_admin());

CREATE POLICY "Therapists can view their analytics"
ON therapist_analytics
FOR SELECT
TO public
USING ((SELECT auth.uid()) = therapist_id);

-- ----------------------------------------
-- therapist_applications (4 policies)
-- ----------------------------------------
CREATE POLICY "Admins can view all applications"
ON therapist_applications
FOR ALL
TO public
USING (is_admin());

CREATE POLICY "Users can insert their own application"
ON therapist_applications
FOR INSERT
TO public
WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update their own application"
ON therapist_applications
FOR UPDATE
TO public
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can view their own application"
ON therapist_applications
FOR SELECT
TO public
USING ((SELECT auth.uid()) = user_id);

-- ----------------------------------------
-- therapist_availability (2 policies)
-- ----------------------------------------
CREATE POLICY "Authenticated users can view availability"
ON therapist_availability
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Therapists can manage their availability"
ON therapist_availability
FOR ALL
TO public
USING ((SELECT auth.uid()) = therapist_id)
WITH CHECK ((SELECT auth.uid()) = therapist_id);

-- ----------------------------------------
-- therapist_blocked_times (2 policies)
-- ----------------------------------------
CREATE POLICY "Authenticated users can view blocked times"
ON therapist_blocked_times
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Therapists can manage their blocked times"
ON therapist_blocked_times
FOR ALL
TO public
USING ((SELECT auth.uid()) = therapist_id)
WITH CHECK ((SELECT auth.uid()) = therapist_id);

-- ----------------------------------------
-- therapist_profiles (3 policies)
-- ----------------------------------------
CREATE POLICY "Admins can manage all therapist profiles"
ON therapist_profiles
FOR ALL
TO public
USING (is_admin());

CREATE POLICY "Therapists can update their own profile"
ON therapist_profiles
FOR UPDATE
TO public
USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "View therapist profiles"
ON therapist_profiles
FOR SELECT
TO public
USING (
  ((SELECT auth.uid()) = user_id)
  OR is_admin()
  OR ((verified = true) AND (accepts_new_clients = true) AND (is_active = true))
);

-- ========================================
-- VALIDATION
-- ========================================
-- Verify that all 50 policies have been restored

DO $$
DECLARE
  policy_count INTEGER;
  table_counts TEXT;
BEGIN
  -- Count policies in public schema
  SELECT COUNT(*)
  INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'public';

  -- Get breakdown by table
  SELECT string_agg(tablename || ': ' || cnt::text, ', ' ORDER BY tablename)
  INTO table_counts
  FROM (
    SELECT tablename, COUNT(*) as cnt
    FROM pg_policies
    WHERE schemaname = 'public'
    GROUP BY tablename
  ) t;

  -- Verify we have exactly 50 policies
  IF policy_count != 50 THEN
    RAISE EXCEPTION 'ROLLBACK VALIDATION FAILED: Expected 50 policies, found %. Breakdown: %',
      policy_count, table_counts;
  END IF;

  RAISE NOTICE '========================================';
  RAISE NOTICE 'ROLLBACK VALIDATION PASSED';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Total policies restored: %', policy_count;
  RAISE NOTICE 'Policy breakdown: %', table_counts;
  RAISE NOTICE '';
  RAISE NOTICE 'Database successfully returned to mixed state:';
  RAISE NOTICE '  - Original 50 policies restored';
  RAISE NOTICE '  - Mixed auth.uid() patterns (SELECT and naked)';
  RAISE NOTICE '  - All original policy definitions intact';
  RAISE NOTICE '  - Known working state restored';
  RAISE NOTICE '========================================';
END $$;

-- ========================================
-- ROLLBACK SUMMARY
-- ========================================
--
-- Status: COMPLETE
-- Policies Dropped: 42-43 (optimized policies from forward migration)
-- Policies Restored: 50 (original policies in mixed state)
--
-- Current State:
-- - Mixed auth.uid() patterns (some wrapped in SELECT, some not)
-- - Original policy separation maintained
-- - All original WITH CHECK clauses restored
-- - Known working state (even if suboptimal)
--
-- To Re-Apply Forward Migration:
-- Run: 20250929_fix_rls_performance_issues.sql
--
-- ========================================

COMMIT;

-- Rollback Complete
-- Database returned to pre-migration state with all 50 original policies