-- Fix Security Definer Views
-- First, let's identify and recreate the views without SECURITY DEFINER

-- Drop and recreate admin_decision_audit view if it exists
DROP VIEW IF EXISTS public.admin_decision_audit;
CREATE VIEW public.admin_decision_audit AS
SELECT 
  at.id,
  at.user_id as admin_user_id,
  p.email as admin_email,
  p.first_name || ' ' || p.last_name as admin_name,
  at.action,
  at.table_name,
  at.record_id,
  at.old_data,
  at.new_data,
  at.impersonation_reason as decision_reason,
  at.session_context->'decision_outcome' as decision_outcome,
  at.session_context,
  at.created_at
FROM audit_trail at
LEFT JOIN profiles p ON at.user_id = p.id
WHERE at.action LIKE 'ADMIN_DECISION_%';

-- Drop and recreate impersonation_audit_log view if it exists
DROP VIEW IF EXISTS public.impersonation_audit_log;
CREATE VIEW public.impersonation_audit_log AS
SELECT 
  at.id,
  at.user_id,
  p.email as admin_email,
  p.first_name || ' ' || p.last_name as admin_name,
  at.impersonated_user_id,
  pt.email as target_user_email,
  pt.first_name || ' ' || pt.last_name as target_user_name,
  at.action,
  at.impersonation_reason,
  at.ip_address,
  at.user_agent,
  at.session_context,
  at.created_at
FROM audit_trail at
LEFT JOIN profiles p ON at.user_id = p.id
LEFT JOIN profiles pt ON at.impersonated_user_id = pt.id
WHERE at.action IN ('IMPERSONATION_START', 'IMPERSONATION_END')
   OR at.impersonated_user_id IS NOT NULL;

-- Drop and recreate therapist_profiles_internal view if it exists
DROP VIEW IF EXISTS public.therapist_profiles_internal;
CREATE VIEW public.therapist_profiles_internal AS
SELECT 
  id,
  user_id,
  name,
  verified,
  is_active,
  accepts_new_clients,
  setup_completed,
  setup_steps,
  updated_at
FROM therapist_profiles;

-- Enable RLS on views
ALTER VIEW public.admin_decision_audit SET (security_invoker = on);
ALTER VIEW public.impersonation_audit_log SET (security_invoker = on);
ALTER VIEW public.therapist_profiles_internal SET (security_invoker = on);

-- Create RLS policies for the views
CREATE POLICY "admin_decision_audit_admin_only"
  ON public.audit_trail FOR SELECT
  TO authenticated
  USING (
    is_admin() AND action LIKE 'ADMIN_DECISION_%'
  );

CREATE POLICY "impersonation_audit_log_admin_only"
  ON public.audit_trail FOR SELECT
  TO authenticated
  USING (
    is_admin() AND (
      action IN ('IMPERSONATION_START', 'IMPERSONATION_END') OR
      impersonated_user_id IS NOT NULL
    )
  );