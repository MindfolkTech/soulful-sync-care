-- Fix the therapist profile creation by making application_id nullable temporarily
-- and creating missing therapist profile for existing user

-- First, make application_id nullable for existing users without applications
ALTER TABLE public.therapist_profiles ALTER COLUMN application_id DROP NOT NULL;

-- Create missing therapist profile for the existing user
INSERT INTO public.therapist_profiles (
  user_id, 
  name, 
  license_number,
  verified,
  is_active,
  accepts_new_clients,
  setup_completed,
  application_id
) 
SELECT 
  id,
  CONCAT(first_name, ' ', last_name),
  'PENDING_SETUP',
  false,
  false,
  false,
  false,
  NULL  -- Allow null application_id for existing users
FROM public.profiles 
WHERE role = 'therapist' 
  AND id NOT IN (SELECT user_id FROM public.therapist_profiles WHERE user_id IS NOT NULL);