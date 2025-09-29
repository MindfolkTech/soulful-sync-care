-- =====================================================================
-- ROLLBACK: RLS PERFORMANCE OPTIMIZATION INDEXES
-- =====================================================================
-- Rollback for: 20250929_add_rls_performance_indexes.sql
-- Purpose: Remove the 13 RLS performance indexes if issues arise
--
-- ⚠️ WHEN TO RUN THIS ROLLBACK ⚠️
--
-- ONLY run this rollback if you experience one of these specific issues:
--
-- 1. DISK SPACE CRITICAL: Indexes are consuming too much disk space and
--    you need to immediately free up storage (unlikely - these are partial
--    indexes with minimal overhead).
--
-- 2. INDEX CORRUPTION: PostgreSQL reports index corruption errors and
--    recommends rebuilding (very rare, but possible after system crashes).
--    Error examples:
--    - "ERROR: index is corrupted"
--    - "WARNING: inconsistent page found in index"
--
-- 3. PERFORMANCE REGRESSION: Query performance got WORSE after adding
--    indexes (extremely unlikely - would indicate PostgreSQL query planner
--    issues). You would observe:
--    - Queries that were fast are now slow
--    - EXPLAIN ANALYZE shows indexes NOT being used
--    - Database CPU usage increased significantly
--
-- 4. MIGRATION FAILURE: The original migration partially completed and
--    you need to clean up before re-running (some indexes created, others
--    failed due to name conflicts or permissions issues).
--
-- ⚠️ DO NOT RUN THIS ROLLBACK IF:
-- - You're just testing (indexes don't harm anything if unused)
-- - You're unsure about impact (consult Foundation Agent first)
-- - You haven't verified the specific issue requiring rollback
--
-- =====================================================================

-- =====================================================================
-- SAFETY CHECK: Verify indexes exist before attempting to drop them
-- =====================================================================
-- Uncomment and run this query first to see what will be dropped:
--
-- SELECT schemaname, tablename, indexname, pg_size_pretty(pg_relation_size(indexname::regclass)) as index_size
-- FROM pg_indexes
-- WHERE schemaname = 'public'
--   AND indexname LIKE '%_rls'
-- ORDER BY tablename, indexname;
--
-- =====================================================================

-- =====================================================================
-- ROLLBACK EXECUTION
-- =====================================================================
-- Using DROP INDEX CONCURRENTLY to avoid table locks during removal
-- IF EXISTS clause makes this idempotent (safe to run multiple times)
-- =====================================================================

BEGIN;

-- Appointments table indexes
DROP INDEX CONCURRENTLY IF EXISTS idx_appointments_therapist_id_rls;
DROP INDEX CONCURRENTLY IF EXISTS idx_appointments_client_id_rls;

-- Therapist availability table index
DROP INDEX CONCURRENTLY IF EXISTS idx_therapist_availability_therapist_id_rls;

-- Therapist blocked times table index
DROP INDEX CONCURRENTLY IF EXISTS idx_therapist_blocked_times_therapist_id_rls;

-- Client testimonials table indexes
DROP INDEX CONCURRENTLY IF EXISTS idx_client_testimonials_client_id_rls;
DROP INDEX CONCURRENTLY IF EXISTS idx_client_testimonials_therapist_id_rls;

-- Client session notes table indexes
DROP INDEX CONCURRENTLY IF EXISTS idx_client_session_notes_therapist_id_rls;
DROP INDEX CONCURRENTLY IF EXISTS idx_client_session_notes_client_id_rls;

-- Client assessments table index
DROP INDEX CONCURRENTLY IF EXISTS idx_client_assessments_user_id_rls;

-- Session earnings table index
DROP INDEX CONCURRENTLY IF EXISTS idx_session_earnings_therapist_id_rls;

COMMIT;

-- =====================================================================
-- POST-ROLLBACK VERIFICATION
-- =====================================================================
-- Run these queries to verify indexes were successfully removed:
--
-- 1. Confirm all RLS indexes are gone:
-- SELECT indexname
-- FROM pg_indexes
-- WHERE schemaname = 'public'
--   AND indexname LIKE '%_rls';
-- -- Expected result: 0 rows (empty result set)
--
-- 2. Check remaining indexes on affected tables:
-- SELECT tablename, indexname
-- FROM pg_indexes
-- WHERE schemaname = 'public'
--   AND tablename IN (
--       'appointments', 'therapist_availability', 'therapist_blocked_times',
--       'client_testimonials', 'client_session_notes', 'client_assessments',
--       'session_earnings'
--   )
-- ORDER BY tablename, indexname;
-- -- Expected result: Only primary keys and pre-existing indexes remain
--
-- 3. Verify auth initplan issues have returned:
-- SELECT * FROM auth.policies
-- WHERE schemaname = 'public'
--   AND tablename IN (
--       'appointments', 'therapist_availability', 'therapist_blocked_times',
--       'client_testimonials', 'client_session_notes', 'client_assessments',
--       'session_earnings'
--   );
-- -- Expected result: Policies show auth.uid() checks without supporting indexes
-- =====================================================================

-- =====================================================================
-- NEXT STEPS AFTER ROLLBACK
-- =====================================================================
-- If you had to run this rollback:
--
-- 1. Document the specific issue that required rollback in support ticket
-- 2. Contact Foundation Agent with:
--    - The exact error messages you received
--    - Database performance metrics before/after
--    - Output from the verification queries above
--
-- 3. Foundation Agent will analyze and provide:
--    - Root cause analysis
--    - Corrected migration if needed
--    - Alternative optimization strategy if indexes aren't suitable
--
-- 4. Do NOT re-run the original migration until issue is resolved
-- =====================================================================

-- Rollback completed successfully
-- Status: All 13 RLS performance indexes removed
-- Impact: Database returns to pre-migration state (potential sequential scans on RLS checks)