-- Migration: fix_identity_tags_rls
-- Author: MindFolk Foundation Agent
-- Date: 2025-09-28
-- Purpose: Fix critical security issue - enable RLS on identity_tags table
-- Issue: Supabase security advisor flagged table as public without RLS protection
-- Risk: Low - additive security measure, no breaking changes

-- Enable Row Level Security on identity_tags table
-- This adds the "lock" that was missing from this data room
ALTER TABLE public.identity_tags ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow all authenticated users to READ identity tags
-- This is safe because identity_tags is a lookup table (like a phone book)
-- Users need to see available tags to select them
CREATE POLICY "identity_tags_read_policy" ON public.identity_tags
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy 2: Only admins can modify identity tags
-- This prevents regular users from adding/changing/deleting tag definitions
CREATE POLICY "identity_tags_admin_write_policy" ON public.identity_tags
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Add helpful comments for future developers
COMMENT ON POLICY "identity_tags_read_policy" ON public.identity_tags IS
'Allows authenticated users to read identity tags for selection purposes';

COMMENT ON POLICY "identity_tags_admin_write_policy" ON public.identity_tags IS
'Restricts write operations on identity tags to admin users only';

-- Verification query - run this to confirm RLS is properly enabled
SELECT
    schemaname,
    tablename,
    rowsecurity as "RLS Enabled",
    (
        SELECT count(*)
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename = 'identity_tags'
    ) as "Number of Policies"
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'identity_tags';