-- Create client_assessments table for storing mock assessment data
CREATE TABLE public.client_assessments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    communication_preferences TEXT[] NOT NULL DEFAULT '{}',
    language_preferences TEXT[] NOT NULL DEFAULT '{}',
    identity_preferences TEXT[] NOT NULL DEFAULT '{}',
    therapy_goals TEXT[] NOT NULL DEFAULT '{}',
    therapy_modalities TEXT[] NOT NULL DEFAULT '{}',
    budget_range INTEGER[] NOT NULL DEFAULT '{0,0}',
    age_group TEXT,
    preferred_times TEXT[] NOT NULL DEFAULT '{}',
    session_frequency TEXT,
    previous_therapy BOOLEAN DEFAULT false,
    crisis_support BOOLEAN DEFAULT false,
    cultural_considerations TEXT[],
    religious_preferences TEXT[],
    gender_preferences TEXT[],
    therapist_age_preference TEXT,
    session_length_preference INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on client_assessments
ALTER TABLE public.client_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for client_assessments
CREATE POLICY "Users can view their own assessments" 
ON public.client_assessments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments" 
ON public.client_assessments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments" 
ON public.client_assessments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add missing fields to therapist_profiles table
ALTER TABLE public.therapist_profiles 
ADD COLUMN identity_tags TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN gender_identity TEXT,
ADD COLUMN age_group TEXT,
ADD COLUMN cultural_background TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN years_experience TEXT;

-- Create trigger for updated_at on client_assessments
CREATE TRIGGER update_client_assessments_updated_at
BEFORE UPDATE ON public.client_assessments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert mock assessment data
INSERT INTO public.client_assessments (
    user_id,
    communication_preferences,
    language_preferences,
    identity_preferences,
    therapy_goals,
    therapy_modalities,
    budget_range,
    age_group,
    preferred_times,
    session_frequency,
    previous_therapy,
    crisis_support,
    cultural_considerations,
    religious_preferences,
    gender_preferences,
    therapist_age_preference,
    session_length_preference
) VALUES (
    '3982d0fc-9a3e-4d4f-8e67-449086469717',
    ARRAY['empathetic', 'warm', 'structured'],
    ARRAY['English'],
    ARRAY['culturally sensitive', 'LGBTQ+ affirming'],
    ARRAY['anxiety', 'depression', 'stress management'],
    ARRAY['CBT', 'mindfulness-based therapy'],
    ARRAY[60, 120],
    '25–34',
    ARRAY['14:00', '15:00', '16:00'],
    'weekly',
    false,
    false,
    ARRAY['Asian-friendly', 'inclusive'],
    ARRAY[]::TEXT[],
    ARRAY[]::TEXT[],
    'no preference',
    60
);

-- Update existing therapist profile with new fields
UPDATE public.therapist_profiles 
SET 
    identity_tags = ARRAY['culturally sensitive', 'LGBTQ+ affirming', 'Asian-friendly'],
    gender_identity = 'woman',
    age_group = '35–44',
    cultural_background = ARRAY['Asian', 'Chinese'],
    is_active = true,
    years_experience = '8+ years'
WHERE user_id = '3982d0fc-9a3e-4d4f-8e67-449086469717';