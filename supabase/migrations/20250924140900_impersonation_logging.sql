-- Migration: Add impersonation logging to audit trail
-- This enhances the audit system to track when admins impersonate users
-- Created: 2025-09-24

-- Add new columns to audit_trail for impersonation tracking
ALTER TABLE public.audit_trail 
ADD COLUMN IF NOT EXISTS impersonated_user_id uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS impersonation_reason text,
ADD COLUMN IF NOT EXISTS session_context jsonb DEFAULT '{}';

-- Create index for efficient impersonation queries
CREATE INDEX IF NOT EXISTS idx_audit_trail_impersonated_user 
ON public.audit_trail(impersonated_user_id) 
WHERE impersonated_user_id IS NOT NULL;

-- Create index for session context queries
CREATE INDEX IF NOT EXISTS idx_audit_trail_session_context 
ON public.audit_trail USING gin(session_context) 
WHERE session_context IS NOT NULL AND session_context != '{}';

-- Create function to log impersonation events
CREATE OR REPLACE FUNCTION public.log_impersonation_event(
  target_user_id uuid,
  reason text DEFAULT 'Administrative action',
  additional_context jsonb DEFAULT '{}'
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  audit_id uuid;
BEGIN
  -- Only admins can log impersonation events
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only administrators can log impersonation events';
  END IF;

  -- Insert impersonation log entry
  INSERT INTO public.audit_trail (
    user_id,
    action,
    table_name,
    record_id,
    impersonated_user_id,
    impersonation_reason,
    session_context,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    'IMPERSONATION_START',
    'auth.users',
    target_user_id,
    target_user_id,
    reason,
    additional_context || jsonb_build_object(
      'timestamp', now(),
      'admin_id', auth.uid(),
      'target_user_id', target_user_id
    ),
    current_setting('request.headers', true)::json->>'x-real-ip',
    current_setting('request.headers', true)::json->>'user-agent'
  ) RETURNING id INTO audit_id;

  RETURN audit_id;
END;
$$;

-- Create function to log end of impersonation
CREATE OR REPLACE FUNCTION public.log_impersonation_end(
  target_user_id uuid,
  session_duration_minutes integer DEFAULT NULL
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  audit_id uuid;
BEGIN
  -- Only admins can log impersonation events
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only administrators can log impersonation events';
  END IF;

  -- Insert impersonation end log entry
  INSERT INTO public.audit_trail (
    user_id,
    action,
    table_name,
    record_id,
    impersonated_user_id,
    impersonation_reason,
    session_context,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    'IMPERSONATION_END',
    'auth.users',
    target_user_id,
    target_user_id,
    'Session ended',
    jsonb_build_object(
      'timestamp', now(),
      'admin_id', auth.uid(),
      'target_user_id', target_user_id,
      'session_duration_minutes', session_duration_minutes
    ),
    current_setting('request.headers', true)::json->>'x-real-ip',
    current_setting('request.headers', true)::json->>'user-agent'
  ) RETURNING id INTO audit_id;

  RETURN audit_id;
END;
$$;

-- Create view for easy impersonation audit queries
CREATE OR REPLACE VIEW public.impersonation_audit_log AS
SELECT 
  at.id,
  at.created_at,
  at.action,
  admin_profile.email as admin_email,
  admin_profile.first_name || ' ' || admin_profile.last_name as admin_name,
  target_profile.email as target_user_email,
  target_profile.first_name || ' ' || target_profile.last_name as target_user_name,
  at.impersonation_reason,
  at.session_context,
  at.ip_address,
  at.user_agent
FROM public.audit_trail at
LEFT JOIN public.profiles admin_profile ON at.user_id = admin_profile.id
LEFT JOIN public.profiles target_profile ON at.impersonated_user_id = target_profile.id
WHERE at.impersonated_user_id IS NOT NULL
ORDER BY at.created_at DESC;

-- Grant permissions
GRANT SELECT ON public.impersonation_audit_log TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_impersonation_event(uuid, text, jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_impersonation_end(uuid, integer) TO authenticated;

-- Add RLS policy for impersonation audit log (admins only)
ALTER TABLE public.audit_trail ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can see all audit records, users can see their own
CREATE POLICY "audit_trail_admin_access" ON public.audit_trail
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "audit_trail_user_access" ON public.audit_trail
  FOR SELECT USING (
    user_id = auth.uid() OR impersonated_user_id = auth.uid()
  );

-- Comment on new columns
COMMENT ON COLUMN public.audit_trail.impersonated_user_id IS 'User ID that was impersonated (if this was an impersonation action)';
COMMENT ON COLUMN public.audit_trail.impersonation_reason IS 'Reason provided for impersonation';
COMMENT ON COLUMN public.audit_trail.session_context IS 'Additional context about the session (duration, purpose, etc.)';

-- Comment on functions
COMMENT ON FUNCTION public.log_impersonation_event(uuid, text, jsonb) IS 'Logs the start of an admin impersonation session';
COMMENT ON FUNCTION public.log_impersonation_end(uuid, integer) IS 'Logs the end of an admin impersonation session';

-- Comment on view
COMMENT ON VIEW public.impersonation_audit_log IS 'Human-readable view of all impersonation events for compliance reporting';
