-- Enable RLS on actual tables (not views)
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modalities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_bodies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specialities ENABLE ROW LEVEL SECURITY;

-- Add basic policies for reference/lookup tables that should be readable by all authenticated users
CREATE POLICY "Allow authenticated users to read languages" ON public.languages
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read modalities" ON public.modalities
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read professional_bodies" ON public.professional_bodies
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to read specialities" ON public.specialities
FOR SELECT TO authenticated USING (true);