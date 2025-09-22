-- Extends therapist_profiles table with new fields from the revamped onboarding questionnaire

ALTER TABLE public.therapist_profiles
ADD COLUMN IF NOT EXISTS communication_style TEXT,
ADD COLUMN IF NOT EXISTS session_format TEXT,
ADD COLUMN IF NOT EXISTS pride_attributes TEXT[],
ADD COLUMN IF NOT EXISTS specialities TEXT[],
ADD COLUMN IF NOT EXISTS languages TEXT[],
ADD COLUMN IF NOT EXISTS cancellation_policy TEXT,
ADD COLUMN IF NOT EXISTS rescheduling_policy TEXT,
ADD COLUMN IF NOT EXISTS lateness_policy TEXT,
ADD COLUMN IF NOT EXISTS communication_policy TEXT;

-- Add indexes for searchable fields to improve client discovery performance
-- GIN indexes are well-suited for searching within JSONB and array columns

CREATE INDEX IF NOT EXISTS idx_therapist_profiles_specialities ON public.therapist_profiles USING GIN(specialities);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_languages ON public.therapist_profiles USING GIN(languages);
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_pride_attributes ON public.therapist_profiles USING GIN(pride_attributes);


