-- Add setup progress fields to therapist_profiles
-- Tracks per-step completion and overall setup completion without relying on localStorage

ALTER TABLE public.therapist_profiles
ADD COLUMN IF NOT EXISTS setup_steps JSONB NOT NULL DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS setup_completed BOOLEAN NOT NULL DEFAULT false;

-- Optional helper view for internal tooling (not exposed publicly)
-- Shows whether a profile is considered "published" based on existing flags
-- published := is_active AND accepts_new_clients AND verified
CREATE OR REPLACE VIEW public.therapist_profiles_internal AS
SELECT 
  id,
  user_id,
  name,
  verified,
  is_active,
  accepts_new_clients,
  (is_active AND accepts_new_clients AND verified) AS published,
  setup_completed,
  setup_steps,
  updated_at
FROM public.therapist_profiles;

GRANT SELECT ON public.therapist_profiles_internal TO authenticated;

