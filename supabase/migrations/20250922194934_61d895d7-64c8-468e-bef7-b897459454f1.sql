-- Temporarily set the therapist profile to published state for testing
UPDATE public.therapist_profiles 
SET 
  verified = true,
  is_active = true, 
  accepts_new_clients = true,
  setup_completed = true
WHERE user_id = '26bc5176-21ce-4d30-afba-f486c099c277';