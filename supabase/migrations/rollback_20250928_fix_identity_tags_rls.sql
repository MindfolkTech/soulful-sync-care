-- Rollback Migration: fix_identity_tags_rls
-- Author: MindFolk Foundation Agent
-- Date: 2025-09-28
-- Purpose: Emergency rollback for identity_tags RLS if something breaks
-- When to use: If identity tags become inaccessible to users after migration

-- Remove the policies we created (unlock the specific locks)
DROP POLICY IF EXISTS "identity_tags_read_policy" ON public.identity_tags;
DROP POLICY IF EXISTS "identity_tags_admin_write_policy" ON public.identity_tags;

-- Disable Row Level Security (remove the main lock)
-- WARNING: This puts the table back to its insecure state
ALTER TABLE public.identity_tags DISABLE ROW LEVEL SECURITY;

-- Verification query - confirm RLS is disabled and policies are gone
SELECT
    schemaname,
    tablename,
    rowsecurity as "RLS Enabled (should be false)",
    (
        SELECT count(*)
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename = 'identity_tags'
    ) as "Number of Policies (should be 0)"
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'identity_tags';