-- Fix security issues by enabling RLS on taxonomy tables

-- Enable RLS on taxonomy tables
ALTER TABLE public.professional_bodies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;

-- Create read-only policies for taxonomy tables (they should be readable by all authenticated users)
CREATE POLICY "Everyone can view professional bodies" ON public.professional_bodies FOR SELECT USING (true);
CREATE POLICY "Everyone can view specialities" ON public.specialities FOR SELECT USING (true);
CREATE POLICY "Everyone can view modalities" ON public.modalities FOR SELECT USING (true);
CREATE POLICY "Everyone can view languages" ON public.languages FOR SELECT USING (true);

-- Create missing therapist profile for the existing user
INSERT INTO public.therapist_profiles (
  user_id, 
  name, 
  license_number,
  verified,
  is_active,
  accepts_new_clients,
  setup_completed
) 
SELECT 
  id,
  CONCAT(first_name, ' ', last_name),
  'PENDING_SETUP',
  false,
  false,
  false,
  false
FROM public.profiles 
WHERE role = 'therapist' 
  AND id NOT IN (SELECT user_id FROM public.therapist_profiles);