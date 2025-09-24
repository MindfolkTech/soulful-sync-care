-- Sprint 1.1 Delta: Impersonation logging + decision audit triggers
-- Created: 2025-09-24 13:37
-- Purpose: Add audit triggers for moderation decisions and therapist applications; add RPC to log impersonation events by admins.

-- ========================================
-- 1. ADD AUDIT TRIGGERS TO MORE TABLES
-- ========================================
-- Ensure audit_trigger_function already exists from previous migration.

-- Audit trigger for moderation_queue (captures decisions and status changes)
CREATE TRIGGER audit_moderation_queue_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.moderation_queue
  FOR EACH ROW
  EXECUTE FUNCTION audit_trigger_function();

-- Audit trigger for therapist_applications (captures approvals/rejections and edits)
CREATE TRIGGER audit_therapist_applications_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.therapist_applications
  FOR EACH ROW
  EXECUTE FUNCTION audit_trigger_function();

-- ========================================
-- 2. ADMIN-ONLY RPC: LOG IMPERSONATION EVENTS
-- ========================================
-- This function lets admins explicitly log start/end of impersonation into audit_trail
-- even though audit_trail has no INSERT policy (function runs as SECURITY DEFINER).

CREATE OR REPLACE FUNCTION public.log_impersonation_event(target_user_id uuid, event_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  is_admin_user boolean;
BEGIN
  -- Verify caller is an authenticated admin
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  ) INTO is_admin_user;

  IF NOT is_admin_user THEN
    RAISE EXCEPTION 'Only admins can log impersonation events';
  END IF;

  -- Normalize event_type
  IF event_type IS NULL OR event_type = '' THEN
    event_type := 'UNKNOWN';
  END IF;

  INSERT INTO public.audit_trail (
    user_id,
    action,
    table_name,
    record_id,
    new_data
  ) VALUES (
    auth.uid(),
    CONCAT('IMPERSONATION_', UPPER(event_type)),
    'profiles',
    target_user_id,
    jsonb_build_object(
      'impersonation', true,
      'event_type', event_type,
      'target_user_id', target_user_id,
      'logged_at', now()
    )
  );
END;
$$;

-- Optional: allow execution to authenticated users (authorization done inside function)
REVOKE ALL ON FUNCTION public.log_impersonation_event(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.log_impersonation_event(uuid, text) TO authenticated;

-- ========================================
-- ROLLBACK STATEMENTS (commented)
-- ========================================
-- DROP FUNCTION IF EXISTS public.log_impersonation_event(uuid, text);
-- DROP TRIGGER IF EXISTS audit_therapist_applications_trigger ON public.therapist_applications;
-- DROP TRIGGER IF EXISTS audit_moderation_queue_trigger ON public.moderation_queue;
