-- Fix the remaining security definer view: therapist_profiles_public
DROP VIEW IF EXISTS public.therapist_profiles_public CASCADE;

CREATE VIEW public.therapist_profiles_public AS
SELECT 
  id,
  user_id,
  name,
  tagline,
  bio,
  avatar_url,
  specialties,
  modalities,
  languages,
  personality_tags,
  identity_tags,
  verified,
  years_experience,
  location_city,
  location_state,
  location_country,
  timezone,
  gender_identity,
  age_group,
  cultural_background,
  communication_style,
  session_format,
  in_person_sessions,
  online_sessions,
  accepts_new_clients,
  availability,
  session_rates,
  video_url,
  quote,
  profile_strength
FROM therapist_profiles
WHERE verified = true 
  AND is_active = true 
  AND accepts_new_clients = true;

-- Enable security invoker for the view
ALTER VIEW public.therapist_profiles_public SET (security_invoker = on);