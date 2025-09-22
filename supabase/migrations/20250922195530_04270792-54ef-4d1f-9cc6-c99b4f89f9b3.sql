-- Fix profile data for the user
UPDATE public.profiles 
SET email = 'info@mindfolk.io'
WHERE id = '3982d0fc-9a3e-4d4f-8e67-449086469717' 
AND email != 'info@mindfolk.io';

-- Ensure the user has a complete profile record
INSERT INTO public.profiles (id, email, first_name, last_name, role)
VALUES (
  '3982d0fc-9a3e-4d4f-8e67-449086469717',
  'info@mindfolk.io',
  'User',
  'Name',
  'therapist'
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  role = EXCLUDED.role;