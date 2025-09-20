-- Fix critical security vulnerability: Restrict public access to therapist data
-- Remove the overly permissive public policy
DROP POLICY IF EXISTS "Clients can view verified therapist profiles" ON public.therapist_profiles;

-- Create a restricted view for public access with only basic, non-sensitive information
CREATE OR REPLACE VIEW public.therapist_profiles_public AS 
SELECT 
    id,
    name,
    tagline,
    bio,
    avatar_url,
    specialties,
    modalities,
    languages,
    personality_tags,
    session_focus,
    identity_tags,
    age_group,
    cultural_background,
    session_rates,
    availability,
    accepts_new_clients,
    online_sessions,
    in_person_sessions,
    verified,
    created_at,
    updated_at,
    years_experience
FROM public.therapist_profiles 
WHERE verified = true 
  AND accepts_new_clients = true 
  AND is_active = true;

-- Enable RLS on the public view
ALTER VIEW public.therapist_profiles_public SET (security_invoker = true);

-- Create a new policy for authenticated users to access basic therapist info
CREATE POLICY "Authenticated users can view basic therapist profiles" 
ON public.therapist_profiles 
FOR SELECT 
TO authenticated
USING ((verified = true) AND (accepts_new_clients = true) AND (is_active = true));

-- Grant access to the public view for anonymous users
GRANT SELECT ON public.therapist_profiles_public TO anon;
GRANT SELECT ON public.therapist_profiles_public TO authenticated;