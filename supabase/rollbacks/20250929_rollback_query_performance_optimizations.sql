-- =====================================================================
-- ROLLBACK: QUERY PERFORMANCE OPTIMIZATIONS
-- =====================================================================
-- Rollback for: 20250929_query_performance_optimizations.sql
-- Purpose: Remove GIN and composite indexes if issues arise
-- Rollback Date: 2025-09-29
--
-- ⚠️ WHEN TO RUN THIS ROLLBACK ⚠️
--
-- ONLY run this rollback if you experience:
--
-- 1. DISK SPACE CRITICAL: Indexes consuming too much space
--    (unlikely - GIN indexes are efficient for arrays)
--
-- 2. WRITE PERFORMANCE DEGRADATION: INSERT/UPDATE operations slowed down
--    (check if write times increased significantly after migration)
--
-- 3. INDEX CORRUPTION: PostgreSQL reports corrupted indexes
--    (very rare, usually after system crashes)
--
-- 4. QUERY PERFORMANCE WORSE: Queries slower after adding indexes
--    (extremely unlikely - would indicate PostgreSQL planner issues)
--
-- ⚠️ DO NOT RUN THIS ROLLBACK IF:
-- - You're just testing (indexes don't harm if unused)
-- - Query performance is acceptable or improved
-- - No specific issues have been identified
--
-- =====================================================================

-- =====================================================================
-- SAFETY CHECK: Verify indexes exist before dropping
-- =====================================================================
-- Uncomment and run this query first to see what will be dropped:
--
-- SELECT schemaname, tablename, indexname,
--        pg_size_pretty(pg_relation_size(indexname::regclass)) as index_size
-- FROM pg_indexes
-- WHERE schemaname = 'public'
--   AND (
--     indexname LIKE '%_gin'
--     OR indexname IN (
--       'idx_therapist_profiles_active_verified',
--       'idx_appointments_date_status',
--       'idx_appointments_therapist_date'
--     )
--   )
-- ORDER BY tablename, indexname;
--
-- =====================================================================

-- =====================================================================
-- DROP COMPOSITE INDEXES
-- =====================================================================
-- Drop in reverse order of creation for clean rollback
-- =====================================================================

DROP INDEX IF EXISTS idx_appointments_therapist_date;
DROP INDEX IF EXISTS idx_appointments_date_status;
DROP INDEX IF EXISTS idx_therapist_profiles_active_verified;

-- =====================================================================
-- DROP GIN INDEXES
-- =====================================================================
-- GIN indexes for array searches
-- =====================================================================

DROP INDEX IF EXISTS idx_client_assessments_therapy_modalities_gin;
DROP INDEX IF EXISTS idx_therapist_profiles_identity_tags_gin;
DROP INDEX IF EXISTS idx_therapist_profiles_personality_tags_gin;
DROP INDEX IF EXISTS idx_therapist_profiles_modalities_gin;
DROP INDEX IF EXISTS idx_therapist_profiles_specialties_gin;

-- =====================================================================
-- NOTE: VACUUM CANNOT BE ROLLED BACK
-- =====================================================================
-- The VACUUM ANALYZE operations from the forward migration cannot be
-- undone. However, VACUUM is a maintenance operation that only improves
-- performance - it doesn't change data or schema.
--
-- If you need to "undo" VACUUM effects (which is rarely needed), you would:
-- 1. Let PostgreSQL's autovacuum handle maintenance going forward
-- 2. The database will naturally accumulate statistics again over time
-- 3. VACUUM ANALYZE can be run again at any time without harm
-- =====================================================================

-- =====================================================================
-- VERIFICATION QUERY
-- =====================================================================
-- Run this to confirm all indexes have been removed:
--
-- SELECT schemaname, tablename, indexname
-- FROM pg_indexes
-- WHERE schemaname = 'public'
--   AND (
--     indexname LIKE '%_gin'
--     OR indexname IN (
--       'idx_therapist_profiles_active_verified',
--       'idx_appointments_date_status',
--       'idx_appointments_therapist_date'
--     )
--   )
-- ORDER BY tablename, indexname;
--
-- Expected result: 0 rows (all indexes successfully dropped)
-- =====================================================================

-- =====================================================================
-- POST-ROLLBACK STATUS
-- =====================================================================
-- After Rollback:
--   - GIN indexes removed: 5
--   - Composite indexes removed: 3
--   - Total indexes removed: 8
--   - Array searches: Back to sequential scans (slower)
--   - Multi-column queries: Back to multiple index scans (slower)
--   - VACUUM effects: Remain (cannot be rolled back, but harmless)
--
-- Expected Performance Impact:
--   - Matching algorithm: 10-50x slower for specialty/tag searches
--   - Therapist search: 5-10x slower for active/verified filtering
--   - Appointment queries: 5-10x slower for date-based lookups
--
-- Re-apply Migration:
-- To re-apply the optimizations after rollback:
-- 1. Investigate what caused the rollback need
-- 2. Fix any underlying issues
-- 3. Re-run: 20250929_query_performance_optimizations.sql
-- 4. Monitor performance and disk usage
-- =====================================================================

-- Rollback completed successfully
-- Next steps: Monitor query performance and investigate rollback cause