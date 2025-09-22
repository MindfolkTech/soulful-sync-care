-- Adds a feature_flags column to therapist_profiles for progressive rollouts
ALTER TABLE public.therapist_profiles
ADD COLUMN IF NOT EXISTS feature_flags JSONB NOT NULL DEFAULT '{}'::jsonb;
