-- Add missing columns to therapist_profiles (if they don't exist)
DO $$ 
BEGIN
  -- Add onboarding_state if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'therapist_profiles' AND column_name = 'onboarding_state'
  ) THEN
    ALTER TABLE public.therapist_profiles
    ADD COLUMN onboarding_state jsonb DEFAULT '{
      "current_step": null,
      "skipped_steps": [],
      "completed_steps": [],
      "last_step_completed_at": null,
      "contextual_onboarding_started": false,
      "contextual_onboarding_completed": false,
      "contextual_onboarding_deferred": false,
      "deferred_at": null,
      "profile_completion_milestones": {
        "40_percent": null,
        "60_percent": null,
        "80_percent": null,
        "100_percent": null
      }
    }'::jsonb;
  END IF;

  -- Add profile_strength if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'therapist_profiles' AND column_name = 'profile_strength'
  ) THEN
    ALTER TABLE public.therapist_profiles
    ADD COLUMN profile_strength integer DEFAULT 0;
  END IF;

  -- Add quote if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'therapist_profiles' AND column_name = 'quote'
  ) THEN
    ALTER TABLE public.therapist_profiles
    ADD COLUMN quote text;
  END IF;

  -- Add setup_completed if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'therapist_profiles' AND column_name = 'setup_completed'
  ) THEN
    ALTER TABLE public.therapist_profiles
    ADD COLUMN setup_completed boolean DEFAULT false;
  END IF;

  -- Add setup_steps if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'therapist_profiles' AND column_name = 'setup_steps'
  ) THEN
    ALTER TABLE public.therapist_profiles
    ADD COLUMN setup_steps jsonb DEFAULT '{}'::jsonb;
  END IF;

  -- Add feature_flags if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'therapist_profiles' AND column_name = 'feature_flags'
  ) THEN
    ALTER TABLE public.therapist_profiles
    ADD COLUMN feature_flags jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Create or replace the update_onboarding_progress function with defer support
CREATE OR REPLACE FUNCTION public.update_onboarding_progress(
  p_user_id uuid,
  p_step_id text,
  p_action text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_state JSONB;
  updated_state JSONB;
  completed_steps JSONB;
  skipped_steps JSONB;
BEGIN
  -- Validate input
  IF p_user_id IS NULL OR p_step_id IS NULL OR p_action IS NULL THEN
    RAISE EXCEPTION 'All parameters required';
  END IF;

  IF p_action NOT IN ('complete', 'skip', 'start', 'defer') THEN
    RAISE EXCEPTION 'Invalid action';
  END IF;

  -- Get current state
  SELECT onboarding_state INTO current_state
  FROM therapist_profiles
  WHERE user_id = p_user_id;

  IF current_state IS NULL THEN
    RAISE EXCEPTION 'Profile not found';
  END IF;

  completed_steps := COALESCE(current_state->'completed_steps', '[]'::jsonb);
  skipped_steps := COALESCE(current_state->'skipped_steps', '[]'::jsonb);

  -- Handle action
  CASE p_action
    WHEN 'complete' THEN
      IF NOT (completed_steps ? p_step_id) THEN
        completed_steps := completed_steps || to_jsonb(p_step_id);
      END IF;
      skipped_steps := (
        SELECT COALESCE(jsonb_agg(elem), '[]'::jsonb)
        FROM jsonb_array_elements_text(skipped_steps) AS elem
        WHERE elem != p_step_id
      );
      updated_state := jsonb_set(
        jsonb_set(current_state, '{completed_steps}', completed_steps),
        '{skipped_steps}', skipped_steps
      );
      updated_state := jsonb_set(updated_state, '{last_step_completed_at}', to_jsonb(now()::text));

    WHEN 'skip' THEN
      IF NOT (skipped_steps ? p_step_id) THEN
        skipped_steps := skipped_steps || to_jsonb(p_step_id);
      END IF;
      completed_steps := (
        SELECT COALESCE(jsonb_agg(elem), '[]'::jsonb)
        FROM jsonb_array_elements_text(completed_steps) AS elem
        WHERE elem != p_step_id
      );
      updated_state := jsonb_set(
        jsonb_set(current_state, '{completed_steps}', completed_steps),
        '{skipped_steps}', skipped_steps
      );

    WHEN 'start' THEN
      updated_state := jsonb_set(
        jsonb_set(current_state, '{current_step}', to_jsonb(p_step_id)),
        '{contextual_onboarding_started}', 'true'::jsonb
      );

    WHEN 'defer' THEN
      updated_state := jsonb_set(
        jsonb_set(
          jsonb_set(current_state, '{contextual_onboarding_deferred}', 'true'::jsonb),
          '{deferred_at}', to_jsonb(now()::text)
        ),
        '{current_step}', 'null'::jsonb
      );
  END CASE;

  -- Update database
  UPDATE therapist_profiles
  SET onboarding_state = updated_state, updated_at = now()
  WHERE user_id = p_user_id;

  RETURN updated_state;
END;
$$;

-- Fix RLS performance: Optimize auth.uid() calls with subqueries
-- Drop old policies and create optimized versions

-- therapist_profiles policies
DROP POLICY IF EXISTS "Therapists can update their own profile" ON public.therapist_profiles;
DROP POLICY IF EXISTS "View therapist profiles" ON public.therapist_profiles;
DROP POLICY IF EXISTS "Admins can manage all therapist profiles" ON public.therapist_profiles;

CREATE POLICY "therapist_profiles_own_update"
  ON public.therapist_profiles FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "therapist_profiles_own_insert"
  ON public.therapist_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT auth.uid()) = user_id AND
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'therapist'
  );

CREATE POLICY "therapist_profiles_public_select"
  ON public.therapist_profiles FOR SELECT
  USING (
    (SELECT auth.uid()) = user_id OR
    is_admin() OR
    (verified = true AND accepts_new_clients = true AND is_active = true)
  );

CREATE POLICY "therapist_profiles_admin_all"
  ON public.therapist_profiles FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- appointments policies  
DROP POLICY IF EXISTS "Therapists can manage their appointments" ON public.appointments;
DROP POLICY IF EXISTS "View appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.appointments;

CREATE POLICY "appointments_client_insert"
  ON public.appointments FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) = client_id);

CREATE POLICY "appointments_therapist_all"
  ON public.appointments FOR ALL
  TO authenticated
  USING ((SELECT auth.uid()) = therapist_id)
  WITH CHECK ((SELECT auth.uid()) = therapist_id);

CREATE POLICY "appointments_participant_select"
  ON public.appointments FOR SELECT
  TO authenticated
  USING (
    (SELECT auth.uid()) = client_id OR
    (SELECT auth.uid()) = therapist_id OR
    is_admin()
  );

CREATE POLICY "appointments_admin_all"
  ON public.appointments FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Fix function search paths
ALTER FUNCTION public.generate_personality_tags() SET search_path = public;
ALTER FUNCTION public.calculate_profile_strength(text, text, text, text[], text[], text, text, text, text, text, text, text) SET search_path = public;
ALTER FUNCTION public.update_profile_strength_trigger() SET search_path = public;

-- Create index for better RLS performance
CREATE INDEX IF NOT EXISTS idx_therapist_profiles_user_id ON public.therapist_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON public.appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_therapist_id ON public.appointments(therapist_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);