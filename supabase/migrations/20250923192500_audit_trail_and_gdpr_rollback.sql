-- Rollback script for Sprint 1.1 audit trail and GDPR migration
-- This removes all Sprint 1.1 compliance and trust features
-- Created: 2025-09-24
-- WARNING: Only use in emergency - this will remove GDPR compliance features

-- Drop Edge Functions (these need to be removed via Supabase dashboard)
-- DROP FUNCTION IF EXISTS public.gdpr_export_user_data(uuid);
-- DROP FUNCTION IF EXISTS public.gdpr_delete_user_data(uuid);
-- DROP FUNCTION IF EXISTS public.content_moderation_check(text);

-- Drop the new tables in reverse dependency order
DROP TABLE IF EXISTS public.support_tickets CASCADE;
DROP TABLE IF EXISTS public.favorites CASCADE;
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.moderation_queue CASCADE;
DROP TABLE IF EXISTS public.audit_trail CASCADE;

-- Drop any views that depend on these tables
DROP VIEW IF EXISTS public.impersonation_audit_log CASCADE;

-- Drop functions related to audit trail
DROP FUNCTION IF EXISTS public.audit_trigger_function() CASCADE;
DROP FUNCTION IF EXISTS public.log_impersonation_event(uuid, text) CASCADE;

-- Drop triggers that reference audit functions
DROP TRIGGER IF EXISTS audit_profiles_trigger ON public.profiles;
DROP TRIGGER IF EXISTS audit_therapist_profiles_trigger ON public.therapist_profiles;
DROP TRIGGER IF EXISTS audit_appointments_trigger ON public.appointments;

-- Note: This rollback removes GDPR compliance features
-- You will need to manually remove Edge Functions from Supabase dashboard:
-- 1. gdpr-export
-- 2. gdpr-delete  
-- 3. content-moderation

SELECT 'Sprint 1.1 audit trail and GDPR features rolled back - GDPR compliance removed' as status;
