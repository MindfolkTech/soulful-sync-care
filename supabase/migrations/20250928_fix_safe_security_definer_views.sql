-- Migration: fix_safe_security_definer_views
-- Author: MindFolk Foundation Agent
-- Date: 2025-09-28
-- Purpose: Fix 2 safe SECURITY DEFINER views that don't need special permissions
-- Views: therapist_profiles_public, migration_documentation
-- Risk: Low - these views don't contain sensitive data requiring SECURITY DEFINER

-- Fix 1: therapist_profiles_public
-- This view shows public therapist information (like a business directory)
-- No sensitive data here - just what clients should see anyway
CREATE OR REPLACE VIEW public.therapist_profiles_public
WITH (security_invoker = true) AS
SELECT
    id,
    user_id,
    name,
    tagline,
    bio,
    avatar_url,
    specialties,
    modalities,
    languages,
    personality_tags,
    session_rates,
    availability,
    location_city,
    location_state,
    location_country,
    timezone,
    accepts_new_clients,
    online_sessions,
    in_person_sessions,
    verified,
    identity_tags,
    gender_identity,
    age_group,
    cultural_background,
    years_experience,
    communication_style,
    session_format,
    video_url,
    quote
FROM therapist_profiles
WHERE (is_active = true) AND (verified = true);

-- Fix 2: migration_documentation
-- This view shows which database updates have been applied
-- No user data here - just technical info for developers
CREATE OR REPLACE VIEW public.migration_documentation
WITH (security_invoker = true) AS
SELECT
    version,
    name,
    CASE version
        WHEN '20250922193954' THEN 'Fixes authentication flow and auto-creates therapist profiles on signup'
        WHEN '20250922194028' THEN 'Enables RLS on taxonomy tables and fixes missing therapist profiles'
        WHEN '20250922194120' THEN 'Makes application_id nullable for existing therapist profiles'
        WHEN '20250922194228' THEN 'Forces RLS to be properly enabled on taxonomy tables'
        WHEN '20250922194934' THEN 'Activates specific therapist profile for testing purposes'
        WHEN '20250922195530' THEN 'Updates and fixes user profile data consistency'
        WHEN '20250922195958' THEN 'Upgrades specific user to admin role'
        WHEN '20250922200021' THEN 'Comprehensive RLS setup for all tables with read policies'
        WHEN '20250922200041' THEN 'Fixes and cleans up RLS policies for taxonomy tables'
        WHEN '20250922215052' THEN 'Creates complete booking system: appointments, availability, earnings, analytics with triggers'
        WHEN '20250922220209' THEN 'Inserts comprehensive sample data: clients, assessments, appointments, notes'
        WHEN '20250922220255' THEN 'Inserts detailed appointment history with realistic session data'
        WHEN '20250922222035' THEN 'Creates client testimonials system with RLS and policies'
        WHEN '20250923192500' THEN 'Sprint 1.1 core: audit_trail, moderation_queue, notifications, favorites, support_tickets'
        WHEN '20250924133712' THEN 'Decision audit triggers and basic impersonation logging functions'
        WHEN '20250924140900' THEN 'Enhanced impersonation logging with additional columns and functions'
        ELSE 'No description available'
    END AS description,
    CASE
        WHEN (version >= '20250922193954' AND version <= '20250922222035') THEN 'Foundation & Core Tables'
        WHEN version = '20250923192500' THEN 'Sprint 1.1 - Compliance & Trust'
        WHEN (version >= '20250924133712' AND version <= '20250924140900') THEN 'Sprint 1.1 - Audit Enhancements'
        ELSE 'Other'
    END AS migration_group
FROM supabase_migrations.schema_migrations
WHERE version >= '20250922150000'
ORDER BY version;

-- Add helpful comments
COMMENT ON VIEW public.therapist_profiles_public IS
'Public-facing therapist directory view - safe to use security_invoker';

COMMENT ON VIEW public.migration_documentation IS
'Developer view of database migrations - safe to use security_invoker';

-- Verification query - check that views are now using security_invoker
SELECT
    schemaname,
    viewname,
    definition LIKE '%security_invoker = true%' as "Fixed (should be true)"
FROM pg_views
WHERE viewname IN ('therapist_profiles_public', 'migration_documentation')
ORDER BY viewname;