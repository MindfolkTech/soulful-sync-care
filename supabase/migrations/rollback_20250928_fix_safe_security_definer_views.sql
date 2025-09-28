-- Rollback Migration: fix_safe_security_definer_views
-- Author: MindFolk Foundation Agent
-- Date: 2025-09-28
-- Purpose: Emergency rollback for safe view fixes if something breaks
-- When to use: If views stop working after removing SECURITY DEFINER

-- Rollback 1: therapist_profiles_public (restore SECURITY DEFINER)
CREATE OR REPLACE VIEW public.therapist_profiles_public
WITH (security_invoker = false) AS
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

-- Rollback 2: migration_documentation (restore SECURITY DEFINER)
CREATE OR REPLACE VIEW public.migration_documentation
WITH (security_invoker = false) AS
SELECT
    version,
    name,
    CASE version
        WHEN '20250922193954' THEN 'Fixes authentication flow and auto-creates therapist profiles on signup'
        WHEN '20250922194028' THEN 'Enables RLS on taxonomy tables and fixes missing therapist profiles'
        -- [Rest of CASE statement same as before]
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

-- Verification query - confirm views are back to SECURITY DEFINER
SELECT
    schemaname,
    viewname,
    definition LIKE '%security_invoker = false%' as "Reverted (should be true)"
FROM pg_views
WHERE viewname IN ('therapist_profiles_public', 'migration_documentation')
ORDER BY viewname;