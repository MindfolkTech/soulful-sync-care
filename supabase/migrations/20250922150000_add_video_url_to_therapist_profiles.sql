-- Add a column to store the public URL of the therapist intro video
ALTER TABLE public.therapist_profiles
  ADD COLUMN IF NOT EXISTS video_url TEXT;
