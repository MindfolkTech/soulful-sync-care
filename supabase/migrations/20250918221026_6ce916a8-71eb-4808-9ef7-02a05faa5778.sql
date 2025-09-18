-- Create profiles table for user authentication
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  email text NOT NULL,
  first_name text,
  last_name text,
  role text NOT NULL DEFAULT 'client',
  avatar_url text,
  is_verified boolean DEFAULT false,
  phone text,
  location_country text,
  location_city text,
  timezone text,
  gender text,
  language_preference text DEFAULT 'en',
  date_of_birth date,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profile access
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Admin policies
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (is_admin());

CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (is_admin());

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();