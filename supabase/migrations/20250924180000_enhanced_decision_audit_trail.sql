-- Enhanced Decision Audit Trail for Sprint 1.1
-- Comprehensive logging for all admin decisions and moderation actions
-- Created: 2025-09-24

-- Create enhanced audit trigger function that captures more context
CREATE OR REPLACE FUNCTION public.enhanced_audit_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    audit_user_id UUID;
    audit_ip TEXT;
    audit_user_agent TEXT;
BEGIN
    -- Get current user ID (works with RLS and auth.uid())
    audit_user_id := auth.uid();
    
    -- Get IP and user agent from current request context if available
    -- These would be set by your application layer
    audit_ip := current_setting('request.ip_address', true);
    audit_user_agent := current_setting('request.user_agent', true);

    -- Insert audit record
    INSERT INTO public.audit_trail (
        user_id,
        action,
        table_name,
        record_id,
        old_data,
        new_data,
        ip_address,
        user_agent,
        created_at
    ) VALUES (
        audit_user_id,
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END,
        CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN to_jsonb(NEW) ELSE NULL END,
        audit_ip,
        audit_user_agent,
        now()
    );

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create audit triggers for critical admin decision tables

-- 1. Therapist Applications (approval/rejection decisions)
DROP TRIGGER IF EXISTS enhanced_audit_trigger ON public.therapist_applications;
CREATE TRIGGER enhanced_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.therapist_applications
    FOR EACH ROW EXECUTE FUNCTION public.enhanced_audit_trigger_function();

-- 2. Moderation Queue (moderation decisions)
DROP TRIGGER IF EXISTS enhanced_audit_trigger ON public.moderation_queue;
CREATE TRIGGER enhanced_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.moderation_queue
    FOR EACH ROW EXECUTE FUNCTION public.enhanced_audit_trigger_function();

-- 3. Support Tickets (support decisions)
DROP TRIGGER IF EXISTS enhanced_audit_trigger ON public.support_tickets;
CREATE TRIGGER enhanced_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.support_tickets
    FOR EACH ROW EXECUTE FUNCTION public.enhanced_audit_trigger_function();

-- 4. Therapist Profiles (verification decisions)
DROP TRIGGER IF EXISTS enhanced_audit_trigger ON public.therapist_profiles;
CREATE TRIGGER enhanced_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.therapist_profiles
    FOR EACH ROW EXECUTE FUNCTION public.enhanced_audit_trigger_function();

-- 5. Profiles (role changes, admin actions)
DROP TRIGGER IF EXISTS enhanced_audit_trigger ON public.profiles;
CREATE TRIGGER enhanced_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.enhanced_audit_trigger_function();

-- Create admin decision audit view for easy querying
CREATE OR REPLACE VIEW public.admin_decision_audit AS
SELECT 
    at.id,
    at.user_id as admin_user_id,
    p.email as admin_email,
    CONCAT(p.first_name, ' ', p.last_name) as admin_name,
    at.action,
    at.table_name,
    at.record_id,
    at.old_data,
    at.new_data,
    
    -- Extract decision reason from new_data if available
    CASE 
        WHEN at.table_name = 'therapist_applications' AND at.new_data ? 'decision_reason' 
        THEN at.new_data->>'decision_reason'
        WHEN at.table_name = 'moderation_queue' AND at.new_data ? 'reason' 
        THEN at.new_data->>'reason'
        ELSE NULL
    END as decision_reason,
    
    -- Extract session context if available
    CASE 
        WHEN at.new_data ? 'session_context' 
        THEN at.new_data->'session_context'
        ELSE NULL
    END as session_context,
    
    at.created_at,
    
    -- Determine decision outcome
    CASE 
        WHEN at.table_name = 'therapist_applications' AND at.new_data ? 'status' 
        THEN at.new_data->>'status'
        WHEN at.table_name = 'moderation_queue' AND at.new_data ? 'status' 
        THEN at.new_data->>'status'
        ELSE at.action
    END as decision_outcome
    
FROM public.audit_trail at
LEFT JOIN public.profiles p ON at.user_id = p.id
WHERE at.table_name IN ('therapist_applications', 'moderation_queue', 'support_tickets', 'therapist_profiles', 'profiles')
ORDER BY at.created_at DESC;

-- Add helpful indexes for performance
CREATE INDEX IF NOT EXISTS idx_audit_trail_admin_decisions 
ON public.audit_trail(table_name, created_at) 
WHERE table_name IN ('therapist_applications', 'moderation_queue', 'support_tickets', 'therapist_profiles', 'profiles');

CREATE INDEX IF NOT EXISTS idx_audit_trail_user_actions 
ON public.audit_trail(user_id, created_at);

-- Add RLS policy for admin decision audit view
CREATE POLICY "Admin decision audit visible to admins" ON public.audit_trail
FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role = 'admin'
    )
);

-- Test the enhanced audit system
INSERT INTO public.audit_trail (
    user_id, 
    action, 
    table_name, 
    record_id, 
    new_data,
    created_at
) VALUES (
    (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
    'ADMIN_DECISION_TEST',
    'test_table',
    gen_random_uuid(),
    '{"test": "Enhanced audit trail system deployed"}'::jsonb,
    now()
);

-- Add comment for documentation
COMMENT ON FUNCTION public.enhanced_audit_trigger_function() IS 
'Enhanced audit trigger function that captures comprehensive context for admin decisions including user ID, IP address, user agent, and full before/after data for compliance and accountability.';

COMMENT ON VIEW public.admin_decision_audit IS 
'Comprehensive view of all admin decisions across therapist applications, moderation queue, support tickets, and profile changes. Includes decision reasons, outcomes, and admin user context for compliance reporting.';
