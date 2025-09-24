-- Rollback script for impersonation logging migration
-- This removes all impersonation logging enhancements
-- Created: 2025-09-24

-- Drop the view
DROP VIEW IF EXISTS public.impersonation_audit_log;

-- Drop the functions
DROP FUNCTION IF EXISTS public.log_impersonation_event(uuid, text, jsonb);
DROP FUNCTION IF EXISTS public.log_impersonation_end(uuid, integer);

-- Drop the policies
DROP POLICY IF EXISTS "audit_trail_admin_access" ON public.audit_trail;
DROP POLICY IF EXISTS "audit_trail_user_access" ON public.audit_trail;

-- Drop the indexes
DROP INDEX IF EXISTS public.idx_audit_trail_impersonated_user;
DROP INDEX IF EXISTS public.idx_audit_trail_session_context;

-- Remove the new columns
ALTER TABLE public.audit_trail 
DROP COLUMN IF EXISTS impersonated_user_id,
DROP COLUMN IF EXISTS impersonation_reason,
DROP COLUMN IF EXISTS session_context;
