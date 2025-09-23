-- Sprint 1.1: Compliance & Trust - Audit Trail, GDPR, and Core Tables
-- Created: 2025-09-23
-- Purpose: Add audit logging, moderation, notifications, and missing core tables

-- ========================================
-- 1. CREATE AUDIT TRAIL TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.audit_trail (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.audit_trail ENABLE ROW LEVEL SECURITY;

-- RLS Policies for audit_trail
CREATE POLICY "Users can view their own audit logs"
  ON public.audit_trail
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all audit logs"
  ON public.audit_trail
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create index for performance
CREATE INDEX idx_audit_trail_user_id ON public.audit_trail(user_id);
CREATE INDEX idx_audit_trail_created_at ON public.audit_trail(created_at DESC);

-- ========================================
-- 2. CREATE MODERATION QUEUE TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.moderation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL, -- 'profile', 'message', 'testimonial', etc.
  content_id UUID NOT NULL,
  reported_by UUID REFERENCES auth.users(id),
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  moderator_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.moderation_queue ENABLE ROW LEVEL SECURITY;

-- RLS Policies for moderation_queue
CREATE POLICY "Users can report content"
  ON public.moderation_queue
  FOR INSERT
  TO authenticated
  WITH CHECK (reported_by = auth.uid());

CREATE POLICY "Users can view their own reports"
  ON public.moderation_queue
  FOR SELECT
  TO authenticated
  USING (reported_by = auth.uid());

CREATE POLICY "Admins can manage all moderation"
  ON public.moderation_queue
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create index for performance
CREATE INDEX idx_moderation_queue_status ON public.moderation_queue(status);
CREATE INDEX idx_moderation_queue_created_at ON public.moderation_queue(created_at DESC);

-- ========================================
-- 3. CREATE NOTIFICATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'appointment_reminder', 'booking_confirmation', 'message', etc.
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON public.notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(user_id, read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);

-- ========================================
-- 4. CREATE FAVORITES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, therapist_id)
);

-- Enable RLS
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for favorites
CREATE POLICY "Users can view their own favorites"
  ON public.favorites
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can add favorites"
  ON public.favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove their favorites"
  ON public.favorites
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create index for performance
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_therapist_id ON public.favorites(therapist_id);

-- ========================================
-- 5. CREATE SUPPORT TICKETS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('technical', 'billing', 'therapy', 'safety', 'other')),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to UUID REFERENCES auth.users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for support_tickets
CREATE POLICY "Users can view their own tickets"
  ON public.support_tickets
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create tickets"
  ON public.support_tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own tickets"
  ON public.support_tickets
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all tickets"
  ON public.support_tickets
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create index for performance
CREATE INDEX idx_support_tickets_user_id ON public.support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON public.support_tickets(status);
CREATE INDEX idx_support_tickets_priority ON public.support_tickets(priority);

-- ========================================
-- 6. CREATE AUDIT LOGGING FUNCTION
-- ========================================
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_trail (
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN to_jsonb(NEW) ELSE NULL END,
    current_setting('request.headers')::json->>'x-real-ip',
    current_setting('request.headers')::json->>'user-agent'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 7. CREATE AUDIT TRIGGERS
-- ========================================
-- Audit trigger for profiles table
CREATE TRIGGER audit_profiles_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION audit_trigger_function();

-- Audit trigger for therapist_profiles table
CREATE TRIGGER audit_therapist_profiles_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.therapist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION audit_trigger_function();

-- Audit trigger for appointments table
CREATE TRIGGER audit_appointments_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION audit_trigger_function();

-- ========================================
-- 8. CREATE UPDATED_AT TRIGGERS
-- ========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_moderation_queue_updated_at
  BEFORE UPDATE ON public.moderation_queue
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- ROLLBACK STATEMENTS (commented)
-- ========================================
-- DROP TRIGGER IF EXISTS update_support_tickets_updated_at ON public.support_tickets;
-- DROP TRIGGER IF EXISTS update_notifications_updated_at ON public.notifications;
-- DROP TRIGGER IF EXISTS update_moderation_queue_updated_at ON public.moderation_queue;
-- DROP TRIGGER IF EXISTS audit_appointments_trigger ON public.appointments;
-- DROP TRIGGER IF EXISTS audit_therapist_profiles_trigger ON public.therapist_profiles;
-- DROP TRIGGER IF EXISTS audit_profiles_trigger ON public.profiles;
-- DROP FUNCTION IF EXISTS audit_trigger_function();
-- DROP FUNCTION IF EXISTS update_updated_at_column();
-- DROP TABLE IF EXISTS public.support_tickets;
-- DROP TABLE IF EXISTS public.favorites;
-- DROP TABLE IF EXISTS public.notifications;
-- DROP TABLE IF EXISTS public.moderation_queue;
-- DROP TABLE IF EXISTS public.audit_trail;
