-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT,
  location_city TEXT,
  location_country TEXT,
  timezone TEXT,
  language_preference TEXT DEFAULT 'en',
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'therapist', 'admin')),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create therapist profiles table
CREATE TABLE public.therapist_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  license_number TEXT,
  license_state TEXT,
  license_expiry DATE,
  years_experience INTEGER,
  education TEXT,
  bio TEXT,
  hourly_rate_cents INTEGER,
  currency TEXT DEFAULT 'GBP',
  video_intro_url TEXT,
  is_accepting_clients BOOLEAN DEFAULT TRUE,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'suspended')),
  stripe_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create therapist specialties table
CREATE TABLE public.therapist_specialties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(id) ON DELETE CASCADE,
  specialty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create therapist modalities table
CREATE TABLE public.therapist_modalities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(id) ON DELETE CASCADE,
  modality TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create therapist identity tags table
CREATE TABLE public.therapist_identity_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(id) ON DELETE CASCADE,
  identity_tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create therapist personality tags table
CREATE TABLE public.therapist_personality_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(id) ON DELETE CASCADE,
  personality_tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create user assessments table
CREATE TABLE public.user_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  score JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create assessment answers table
CREATE TABLE public.assessment_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID NOT NULL REFERENCES public.user_assessments(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer_value TEXT,
  answer_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create therapy goals table
CREATE TABLE public.therapy_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  goal_category TEXT NOT NULL,
  goal_description TEXT,
  priority INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  session_type TEXT NOT NULL DEFAULT 'therapy' CHECK (session_type IN ('chemistry_call', 'therapy')),
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 50,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  daily_room_url TEXT,
  daily_room_name TEXT,
  price_cents INTEGER,
  currency TEXT DEFAULT 'GBP',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  session_notes TEXT,
  therapist_notes TEXT,
  client_feedback_rating INTEGER CHECK (client_feedback_rating >= 1 AND client_feedback_rating <= 5),
  client_feedback_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  thread_id UUID NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'system', 'appointment_reminder')),
  is_read BOOLEAN DEFAULT FALSE,
  is_flagged BOOLEAN DEFAULT FALSE,
  flagged_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  is_flagged BOOLEAN DEFAULT FALSE,
  flagged_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES public.therapist_profiles(user_id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  therapist_id UUID NOT NULL REFERENCES public.therapist_profiles(user_id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'GBP',
  platform_fee_cents INTEGER,
  therapist_payout_cents INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create admin actions table
CREATE TABLE public.admin_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_modalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_identity_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_personality_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- Create function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Create function to check if user is therapist
CREATE OR REPLACE FUNCTION public.is_therapist()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'therapist'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Profiles RLS Policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin());

-- Therapist profiles RLS Policies
CREATE POLICY "Therapists can view their own profile" ON public.therapist_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Therapists can update their own profile" ON public.therapist_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Therapists can insert their own profile" ON public.therapist_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Clients can view approved therapist profiles" ON public.therapist_profiles
  FOR SELECT USING (verification_status = 'approved');

CREATE POLICY "Admins can view all therapist profiles" ON public.therapist_profiles
  FOR ALL USING (public.is_admin());

-- Therapist specialties RLS Policies
CREATE POLICY "Public can view therapist specialties" ON public.therapist_specialties
  FOR SELECT USING (TRUE);

CREATE POLICY "Therapists can manage their own specialties" ON public.therapist_specialties
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.therapist_profiles 
      WHERE id = therapist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all specialties" ON public.therapist_specialties
  FOR ALL USING (public.is_admin());

-- Therapist modalities RLS Policies  
CREATE POLICY "Public can view therapist modalities" ON public.therapist_modalities
  FOR SELECT USING (TRUE);

CREATE POLICY "Therapists can manage their own modalities" ON public.therapist_modalities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.therapist_profiles 
      WHERE id = therapist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all modalities" ON public.therapist_modalities
  FOR ALL USING (public.is_admin());

-- Therapist identity tags RLS Policies
CREATE POLICY "Public can view therapist identity tags" ON public.therapist_identity_tags
  FOR SELECT USING (TRUE);

CREATE POLICY "Therapists can manage their own identity tags" ON public.therapist_identity_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.therapist_profiles 
      WHERE id = therapist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all identity tags" ON public.therapist_identity_tags
  FOR ALL USING (public.is_admin());

-- Therapist personality tags RLS Policies
CREATE POLICY "Public can view therapist personality tags" ON public.therapist_personality_tags
  FOR SELECT USING (TRUE);

CREATE POLICY "Therapists can manage their own personality tags" ON public.therapist_personality_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.therapist_profiles 
      WHERE id = therapist_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all personality tags" ON public.therapist_personality_tags
  FOR ALL USING (public.is_admin());

-- User assessments RLS Policies
CREATE POLICY "Users can view their own assessments" ON public.user_assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own assessments" ON public.user_assessments
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Therapists can view client assessments" ON public.user_assessments
  FOR SELECT USING (
    public.is_therapist() AND EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE client_id = user_id AND therapist_id IN (
        SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can view all assessments" ON public.user_assessments
  FOR ALL USING (public.is_admin());

-- Assessment answers RLS Policies
CREATE POLICY "Users can view their own assessment answers" ON public.assessment_answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_assessments 
      WHERE id = assessment_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own assessment answers" ON public.assessment_answers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_assessments 
      WHERE id = assessment_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all assessment answers" ON public.assessment_answers
  FOR ALL USING (public.is_admin());

-- Therapy goals RLS Policies
CREATE POLICY "Users can view their own therapy goals" ON public.therapy_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own therapy goals" ON public.therapy_goals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Therapists can view client therapy goals" ON public.therapy_goals
  FOR SELECT USING (
    public.is_therapist() AND EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE client_id = user_id AND therapist_id IN (
        SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can view all therapy goals" ON public.therapy_goals
  FOR ALL USING (public.is_admin());

-- Appointments RLS Policies
CREATE POLICY "Clients can view their own appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Therapists can view their own appointments" ON public.appointments
  FOR SELECT USING (
    therapist_id IN (
      SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Participants can update appointments" ON public.appointments
  FOR UPDATE USING (
    auth.uid() = client_id OR 
    therapist_id IN (
      SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all appointments" ON public.appointments
  FOR ALL USING (public.is_admin());

-- Sessions RLS Policies
CREATE POLICY "Participants can view their sessions" ON public.sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE id = appointment_id AND (
        client_id = auth.uid() OR 
        therapist_id IN (
          SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Therapists can manage sessions" ON public.sessions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE id = appointment_id AND therapist_id IN (
        SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Admins can view all sessions" ON public.sessions
  FOR ALL USING (public.is_admin());

-- Messages RLS Policies
CREATE POLICY "Users can view their own messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages" ON public.messages
  FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Admins can view all messages" ON public.messages
  FOR ALL USING (public.is_admin());

-- Reviews RLS Policies
CREATE POLICY "Clients can view and create their own reviews" ON public.reviews
  FOR ALL USING (auth.uid() = client_id);

CREATE POLICY "Therapists can view reviews about them" ON public.reviews
  FOR SELECT USING (
    therapist_id IN (
      SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view published reviews" ON public.reviews
  FOR SELECT USING (is_published = TRUE AND is_flagged = FALSE);

CREATE POLICY "Admins can manage all reviews" ON public.reviews
  FOR ALL USING (public.is_admin());

-- Tasks RLS Policies
CREATE POLICY "Users can view their own tasks" ON public.tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" ON public.tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Therapists can create tasks for their clients" ON public.tasks
  FOR INSERT WITH CHECK (
    public.is_therapist() AND EXISTS (
      SELECT 1 FROM public.appointments 
      WHERE client_id = user_id AND therapist_id IN (
        SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Therapists can view tasks for their clients" ON public.tasks
  FOR SELECT USING (
    assigned_by IN (
      SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all tasks" ON public.tasks
  FOR ALL USING (public.is_admin());

-- Payments RLS Policies
CREATE POLICY "Clients can view their own payments" ON public.payments
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Therapists can view their payments" ON public.payments
  FOR SELECT USING (
    therapist_id IN (
      SELECT user_id FROM public.therapist_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can create payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "System can update payments" ON public.payments
  FOR UPDATE USING (TRUE);

CREATE POLICY "Admins can manage all payments" ON public.payments
  FOR ALL USING (public.is_admin());

-- Admin actions RLS Policies
CREATE POLICY "Admins can view all admin actions" ON public.admin_actions
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can create admin actions" ON public.admin_actions
  FOR INSERT WITH CHECK (public.is_admin() AND auth.uid() = admin_id);

-- Create indexes for performance
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_therapist_profiles_user_id ON public.therapist_profiles(user_id);
CREATE INDEX idx_therapist_profiles_verification_status ON public.therapist_profiles(verification_status);
CREATE INDEX idx_appointments_client_id ON public.appointments(client_id);
CREATE INDEX idx_appointments_therapist_id ON public.appointments(therapist_id);
CREATE INDEX idx_appointments_scheduled_at ON public.appointments(scheduled_at);
CREATE INDEX idx_messages_thread_id ON public.messages(thread_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);
CREATE INDEX idx_reviews_therapist_id ON public.reviews(therapist_id);
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_payments_client_id ON public.payments(client_id);
CREATE INDEX idx_payments_therapist_id ON public.payments(therapist_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_therapist_profiles_updated_at
  BEFORE UPDATE ON public.therapist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_assessments_updated_at
  BEFORE UPDATE ON public.user_assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_therapy_goals_updated_at
  BEFORE UPDATE ON public.therapy_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON public.sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();