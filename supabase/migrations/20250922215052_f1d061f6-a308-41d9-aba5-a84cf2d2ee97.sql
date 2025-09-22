-- Create comprehensive therapist functionality tables

-- Appointments table for booking management
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL DEFAULT 'therapy_session',
  session_date DATE NOT NULL,
  session_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  session_rate DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(therapist_id, session_date, session_time)
);

-- Therapist availability slots
CREATE TABLE public.therapist_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday, 6 = Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  recurring BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Blocked time slots (holidays, breaks, etc.)
CREATE TABLE public.therapist_blocked_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  all_day BOOLEAN NOT NULL DEFAULT false,
  recurring BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Session earnings and financial tracking
CREATE TABLE public.session_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  gross_amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  net_amount DECIMAL(10,2) NOT NULL,
  payout_status TEXT NOT NULL DEFAULT 'pending' CHECK (payout_status IN ('pending', 'processing', 'paid', 'failed')),
  payout_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Client session notes and progress tracking
CREATE TABLE public.client_session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_notes TEXT,
  client_progress TEXT,
  next_session_goals TEXT,
  mood_rating INTEGER CHECK (mood_rating BETWEEN 1 AND 10),
  session_rating INTEGER CHECK (session_rating BETWEEN 1 AND 5),
  private_notes TEXT, -- Only visible to therapist
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Therapist analytics and metrics
CREATE TABLE public.therapist_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  total_sessions INTEGER NOT NULL DEFAULT 0,
  completed_sessions INTEGER NOT NULL DEFAULT 0,
  cancelled_sessions INTEGER NOT NULL DEFAULT 0,
  no_show_sessions INTEGER NOT NULL DEFAULT 0,
  total_earnings DECIMAL(10,2) NOT NULL DEFAULT 0,
  average_session_rating DECIMAL(3,2),
  new_clients INTEGER NOT NULL DEFAULT 0,
  returning_clients INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(therapist_id, metric_date)
);

-- Enable RLS on all tables
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_blocked_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_earnings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for appointments
CREATE POLICY "Therapists can manage their appointments" ON public.appointments
  FOR ALL USING (therapist_id = auth.uid());

CREATE POLICY "Clients can view their appointments" ON public.appointments
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Admins can manage all appointments" ON public.appointments
  FOR ALL USING (is_admin());

-- RLS Policies for therapist availability
CREATE POLICY "Therapists can manage their availability" ON public.therapist_availability
  FOR ALL USING (therapist_id = auth.uid());

CREATE POLICY "Authenticated users can view availability" ON public.therapist_availability
  FOR SELECT TO authenticated USING (true);

-- RLS Policies for blocked times
CREATE POLICY "Therapists can manage their blocked times" ON public.therapist_blocked_times
  FOR ALL USING (therapist_id = auth.uid());

CREATE POLICY "Authenticated users can view blocked times" ON public.therapist_blocked_times
  FOR SELECT TO authenticated USING (true);

-- RLS Policies for session earnings
CREATE POLICY "Therapists can view their earnings" ON public.session_earnings
  FOR SELECT USING (therapist_id = auth.uid());

CREATE POLICY "Admins can manage all earnings" ON public.session_earnings
  FOR ALL USING (is_admin());

-- RLS Policies for session notes
CREATE POLICY "Therapists can manage their session notes" ON public.client_session_notes
  FOR ALL USING (therapist_id = auth.uid());

CREATE POLICY "Clients can view their session notes" ON public.client_session_notes
  FOR SELECT USING (client_id = auth.uid());

-- RLS Policies for analytics
CREATE POLICY "Therapists can view their analytics" ON public.therapist_analytics
  FOR SELECT USING (therapist_id = auth.uid());

CREATE POLICY "Admins can manage all analytics" ON public.therapist_analytics
  FOR ALL USING (is_admin());

-- Triggers for updated_at timestamps
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_availability_updated_at
  BEFORE UPDATE ON public.therapist_availability
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blocked_times_updated_at
  BEFORE UPDATE ON public.therapist_blocked_times
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_earnings_updated_at
  BEFORE UPDATE ON public.session_earnings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_session_notes_updated_at
  BEFORE UPDATE ON public.client_session_notes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_analytics_updated_at
  BEFORE UPDATE ON public.therapist_analytics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically calculate session earnings
CREATE OR REPLACE FUNCTION public.calculate_session_earnings()
RETURNS TRIGGER AS $$
BEGIN
  -- Only calculate earnings when appointment is completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    INSERT INTO public.session_earnings (
      appointment_id,
      therapist_id,
      gross_amount,
      platform_fee,
      net_amount
    ) VALUES (
      NEW.id,
      NEW.therapist_id,
      NEW.session_rate,
      NEW.session_rate * 0.15, -- 15% platform fee
      NEW.session_rate * 0.85  -- 85% to therapist
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for automatic earnings calculation
CREATE TRIGGER calculate_earnings_on_completion
  AFTER UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.calculate_session_earnings();

-- Function to update daily analytics
CREATE OR REPLACE FUNCTION public.update_therapist_analytics()
RETURNS TRIGGER AS $$
DECLARE
  session_date DATE := NEW.session_date;
  therapist_user_id UUID := NEW.therapist_id;
BEGIN
  -- Insert or update analytics for the session date
  INSERT INTO public.therapist_analytics (
    therapist_id,
    metric_date,
    total_sessions,
    completed_sessions,
    cancelled_sessions,
    no_show_sessions,
    total_earnings
  )
  SELECT 
    therapist_user_id,
    session_date,
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'completed'),
    COUNT(*) FILTER (WHERE status = 'cancelled'),
    COUNT(*) FILTER (WHERE status = 'no_show'),
    COALESCE(SUM(se.net_amount), 0)
  FROM public.appointments a
  LEFT JOIN public.session_earnings se ON a.id = se.appointment_id
  WHERE a.therapist_id = therapist_user_id 
    AND a.session_date = session_date
  ON CONFLICT (therapist_id, metric_date) 
  DO UPDATE SET
    total_sessions = EXCLUDED.total_sessions,
    completed_sessions = EXCLUDED.completed_sessions,
    cancelled_sessions = EXCLUDED.cancelled_sessions,
    no_show_sessions = EXCLUDED.no_show_sessions,
    total_earnings = EXCLUDED.total_earnings,
    updated_at = now();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for analytics updates
CREATE TRIGGER update_analytics_on_appointment_change
  AFTER INSERT OR UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_therapist_analytics();