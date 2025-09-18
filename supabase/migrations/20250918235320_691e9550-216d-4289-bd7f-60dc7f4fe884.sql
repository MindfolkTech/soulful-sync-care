-- Phase 1: Disable RLS and Clean Up Policies for Clerk Integration

-- Disable RLS on both tables since Clerk handles authentication
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_profiles DISABLE ROW LEVEL SECURITY;

-- Revoke anon and PUBLIC access for security
REVOKE ALL ON TABLE public.profiles FROM anon;
REVOKE ALL ON TABLE public.profiles FROM PUBLIC;
REVOKE ALL ON TABLE public.therapist_profiles FROM anon;
REVOKE ALL ON TABLE public.therapist_profiles FROM PUBLIC;

-- Drop all existing RLS policies on profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Drop all existing RLS policies on therapist_profiles table
DROP POLICY IF EXISTS "Therapists can view their own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Therapists can update their own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Therapists can insert their own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Admins can view all therapist profiles" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Clients can view approved therapist profiles" ON public.therapist_profiles;

-- Grant service role full access (for backend operations)
GRANT ALL ON TABLE public.profiles TO service_role;
GRANT ALL ON TABLE public.therapist_profiles TO service_role;

-- Make user_id nullable since we're using clerk_user_id as primary identifier
ALTER TABLE public.profiles ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.therapist_profiles ALTER COLUMN user_id DROP NOT NULL;