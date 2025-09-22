-- Enable RLS on tables that need it
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_bodies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_profiles_internal ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_profiles_public ENABLE ROW LEVEL SECURITY;

-- Add basic policies for reference/lookup tables that should be readable by all authenticated users
CREATE POLICY "Allow authenticated users to read languages" ON public.languages
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read modalities" ON public.modalities
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read professional_bodies" ON public.professional_bodies
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read specialities" ON public.specialities
FOR SELECT TO authenticated USING (true);

-- Internal and public profile views should not have direct policies - they inherit from the main table