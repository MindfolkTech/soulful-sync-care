-- Fix user_id columns to accept Clerk string IDs instead of UUIDs
-- This migration changes the user_id columns from UUID to TEXT to work with Clerk

-- Update profiles table
ALTER TABLE public.profiles 
ALTER COLUMN user_id TYPE TEXT;

-- Update therapist_profiles table  
ALTER TABLE public.therapist_profiles 
ALTER COLUMN user_id TYPE TEXT;

-- Remove the foreign key constraints since we're no longer referencing auth.users
-- (Clerk handles authentication separately)
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_user_id_fkey;

ALTER TABLE public.therapist_profiles 
DROP CONSTRAINT IF EXISTS therapist_profiles_user_id_fkey;
