-- Fix the authentication flow by enhancing the database trigger and ensuring role consistency

-- Update the handle_new_user trigger to properly handle therapist signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Insert profile with role from metadata (database as source of truth)
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'client')
  );

  -- If this is a therapist signup, create a therapist profile
  IF (NEW.raw_user_meta_data->>'role' = 'therapist') THEN
    INSERT INTO public.therapist_profiles (
      user_id, 
      name, 
      license_number,
      verified,
      is_active,
      accepts_new_clients,
      setup_completed
    ) VALUES (
      NEW.id,
      CONCAT(
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''), 
        ' ', 
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
      ),
      'PENDING_SETUP',
      false,
      false,
      false,
      false
    );
  END IF;

  RETURN NEW;
END;
$$;