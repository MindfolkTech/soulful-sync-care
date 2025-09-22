-- The RLS was not properly applied because the queries show the tables still have RLS disabled
-- Let's force enable RLS on all taxonomy tables again

-- Double-check RLS is enabled on taxonomy tables
ALTER TABLE public.professional_bodies FORCE ROW LEVEL SECURITY;
ALTER TABLE public.specialities FORCE ROW LEVEL SECURITY;  
ALTER TABLE public.modalities FORCE ROW LEVEL SECURITY;
ALTER TABLE public.languages FORCE ROW LEVEL SECURITY;