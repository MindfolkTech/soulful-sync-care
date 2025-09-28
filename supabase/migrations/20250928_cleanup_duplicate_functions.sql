-- Migration: cleanup_duplicate_functions
-- Author: MindFolk Foundation Agent (Collaborative with Therapist Onboarding + Postgres Reviewer)
-- Date: 2025-09-28
-- Purpose: Remove duplicate function versions while preserving app functionality and adding security
--
-- CRITICAL PRESERVATIONS:
--   - Keep update_onboarding_progress(p_user_id, p_step_id, p_action) - USED BY APP
--   - Keep generate_personality_tags() trigger function - USED BY update_personality_tags TRIGGER
--   - Keep log_impersonation_event(target_user_id, event_type) - USED BY ADMIN PANEL
--
-- CHANGES:
--   1. Add search_path security to existing app-dependent functions
--   2. Drop unused duplicate function versions
--   3. Create single clean calculate_profile_strength function
--   4. Ensure all remaining functions have proper search_path
--
-- DEPENDENCIES:
--   - update_personality_tags trigger on therapist_profiles table
--   - App code in useContextualOnboarding.tsx and ContextualOnboarding.tsx
--   - Admin panel impersonation logging in Users.tsx
--
-- ROLLBACK: See rollback_20250928_cleanup_duplicate_functions.sql
-- BACKUP: All original functions backed up in backup_function_definitions_20250928.sql

BEGIN;

-- =============================================================================
-- PHASE 1: ADD SEARCH_PATH TO EXISTING APP-DEPENDENT FUNCTIONS
-- =============================================================================

-- 1. Fix update_onboarding_progress function (USED BY APP - KEEP SIGNATURE)
-- Add search_path to the version that app uses (p_ prefixed parameters)
CREATE OR REPLACE FUNCTION public.update_onboarding_progress(p_user_id uuid, p_step_id text, p_action text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  current_state JSONB;
  updated_state JSONB;
  completed_steps JSONB;
  skipped_steps JSONB;
BEGIN
  -- Validate input parameters
  IF p_user_id IS NULL OR p_step_id IS NULL OR p_action IS NULL THEN
    RAISE EXCEPTION 'All parameters (user_id, step_id, action) are required';
  END IF;

  IF p_action NOT IN ('complete', 'skip', 'start') THEN
    RAISE EXCEPTION 'Action must be one of: complete, skip, start';
  END IF;

  -- Get current onboarding state
  SELECT onboarding_state INTO current_state
  FROM therapist_profiles
  WHERE user_id = p_user_id;

  IF current_state IS NULL THEN
    RAISE EXCEPTION 'Therapist profile not found for user_id: %', p_user_id;
  END IF;

  -- Initialize arrays if they don't exist
  completed_steps := COALESCE(current_state->'completed_steps', '[]'::jsonb);
  skipped_steps := COALESCE(current_state->'skipped_steps', '[]'::jsonb);

  -- Update state based on action
  CASE p_action
    WHEN 'complete' THEN
      -- Add to completed_steps if not already there
      IF NOT (completed_steps ? p_step_id) THEN
        completed_steps := completed_steps || to_jsonb(p_step_id);
      END IF;
      -- Remove from skipped_steps if it exists there
      skipped_steps := (
        SELECT jsonb_agg(elem)
        FROM jsonb_array_elements_text(skipped_steps) AS elem
        WHERE elem != p_step_id
      );
      -- Set last completion time and current step
      updated_state := jsonb_set(
        jsonb_set(
          jsonb_set(current_state, '{completed_steps}', completed_steps),
          '{skipped_steps}', COALESCE(skipped_steps, '[]'::jsonb)
        ),
        '{last_step_completed_at}',
        to_jsonb(now()::text)
      );

    WHEN 'skip' THEN
      -- Add to skipped_steps if not already there
      IF NOT (skipped_steps ? p_step_id) THEN
        skipped_steps := skipped_steps || to_jsonb(p_step_id);
      END IF;
      -- Remove from completed_steps if it exists there
      completed_steps := (
        SELECT jsonb_agg(elem)
        FROM jsonb_array_elements_text(completed_steps) AS elem
        WHERE elem != p_step_id
      );
      -- Update state
      updated_state := jsonb_set(
        jsonb_set(current_state, '{completed_steps}', COALESCE(completed_steps, '[]'::jsonb)),
        '{skipped_steps}', skipped_steps
      );

    WHEN 'start' THEN
      -- Set current step and mark onboarding as started
      updated_state := jsonb_set(
        jsonb_set(current_state, '{current_step}', to_jsonb(p_step_id)),
        '{contextual_onboarding_started}',
        'true'::jsonb
      );
  END CASE;

  -- Update the database
  UPDATE therapist_profiles
  SET
    onboarding_state = updated_state,
    updated_at = now()
  WHERE user_id = p_user_id;

  -- Return the updated state
  RETURN updated_state;

EXCEPTION
  WHEN OTHERS THEN
    -- Log error and re-raise with context
    RAISE EXCEPTION 'Error updating onboarding progress for user %, step %, action %: %',
      p_user_id, p_step_id, p_action, SQLERRM;
END;
$function$;

-- 2. Fix generate_personality_tags trigger function (USED BY TRIGGER - KEEP SIGNATURE)
-- Add search_path to the trigger version
CREATE OR REPLACE FUNCTION public.generate_personality_tags()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  -- Clear existing personality_tags
  NEW.personality_tags := ARRAY[]::text[];

  -- Add tags based on communication_style (handle both short and long formats)
  IF NEW.communication_style IS NOT NULL THEN
    CASE
      WHEN NEW.communication_style LIKE 'Supportive & Relational%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'supportive');
        NEW.personality_tags := array_append(NEW.personality_tags, 'empathetic');
        NEW.personality_tags := array_append(NEW.personality_tags, 'warm');
      WHEN NEW.communication_style LIKE 'Motivational & Encouraging%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'motivational');
        NEW.personality_tags := array_append(NEW.personality_tags, 'encouraging');
        NEW.personality_tags := array_append(NEW.personality_tags, 'positive');
      WHEN NEW.communication_style LIKE 'Pragmatic & Problem-solving%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'pragmatic');
        NEW.personality_tags := array_append(NEW.personality_tags, 'solution-oriented');
        NEW.personality_tags := array_append(NEW.personality_tags, 'practical');
      WHEN NEW.communication_style LIKE 'Flexible & Adaptive%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'flexible');
        NEW.personality_tags := array_append(NEW.personality_tags, 'adaptive');
        NEW.personality_tags := array_append(NEW.personality_tags, 'empathetic');
    END CASE;
  END IF;

  -- Add tags based on session_format (handle both short and long formats)
  IF NEW.session_format IS NOT NULL THEN
    CASE
      WHEN NEW.session_format LIKE 'Structured & Goal-oriented%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'structured');
        NEW.personality_tags := array_append(NEW.personality_tags, 'goal-oriented');
        NEW.personality_tags := array_append(NEW.personality_tags, 'focused');
      WHEN NEW.session_format LIKE 'Exploratory & Insight-based%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'exploratory');
        NEW.personality_tags := array_append(NEW.personality_tags, 'insight-based');
        NEW.personality_tags := array_append(NEW.personality_tags, 'reflective');
      WHEN NEW.session_format LIKE 'Interactive & Dynamic%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'interactive');
        NEW.personality_tags := array_append(NEW.personality_tags, 'dynamic');
        NEW.personality_tags := array_append(NEW.personality_tags, 'engaging');
      WHEN NEW.session_format LIKE 'Calm & Process-Focused%' THEN
        NEW.personality_tags := array_append(NEW.personality_tags, 'calm');
        NEW.personality_tags := array_append(NEW.personality_tags, 'gentle');
    END CASE;
  END IF;

  RETURN NEW;
END;
$function$;

-- 3. Fix log_impersonation_event function (USED BY ADMIN PANEL - KEEP SIGNATURE)
-- Add search_path to the version that admin panel uses (event_type parameter)
CREATE OR REPLACE FUNCTION public.log_impersonation_event(target_user_id uuid, event_type text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  is_admin_user boolean;
BEGIN
  -- Verify caller is an authenticated admin
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  ) INTO is_admin_user;

  IF NOT is_admin_user THEN
    RAISE EXCEPTION 'Only admins can log impersonation events';
  END IF;

  -- Normalize event_type
  IF event_type IS NULL OR event_type = '' THEN
    event_type := 'UNKNOWN';
  END IF;

  INSERT INTO public.audit_trail (
    user_id,
    action,
    table_name,
    record_id,
    new_data
  ) VALUES (
    auth.uid(),
    CONCAT('IMPERSONATION_', UPPER(event_type)),
    'profiles',
    target_user_id,
    jsonb_build_object(
      'impersonation', true,
      'event_type', event_type,
      'target_user_id', target_user_id,
      'logged_at', now()
    )
  );
END;
$function$;

-- 4. Fix log_impersonation_end function (ADD SEARCH_PATH)
CREATE OR REPLACE FUNCTION public.log_impersonation_end(target_user_id uuid, session_duration_minutes integer DEFAULT NULL::integer)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  audit_id uuid;
BEGIN
  -- Only admins can log impersonation events
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only administrators can log impersonation events';
  END IF;

  -- Insert impersonation end log entry
  INSERT INTO public.audit_trail (
    user_id,
    action,
    table_name,
    record_id,
    impersonated_user_id,
    impersonation_reason,
    session_context,
    ip_address,
    user_agent
  ) VALUES (
    auth.uid(),
    'IMPERSONATION_END',
    'auth.users',
    target_user_id,
    target_user_id,
    'Session ended',
    jsonb_build_object(
      'timestamp', now(),
      'admin_id', auth.uid(),
      'target_user_id', target_user_id,
      'session_duration_minutes', session_duration_minutes
    ),
    current_setting('request.headers', true)::json->>'x-real-ip',
    current_setting('request.headers', true)::json->>'user-agent'
  ) RETURNING id INTO audit_id;

  RETURN audit_id;
END;
$function$;

-- =============================================================================
-- PHASE 2: DROP UNUSED DUPLICATE FUNCTION VERSIONS
-- =============================================================================

-- Drop the newer update_onboarding_progress version that's not used by the app
DROP FUNCTION IF EXISTS public.update_onboarding_progress(user_id uuid, step_id text, completed boolean, data jsonb);

-- Drop the newer generate_personality_tags version that's not used by trigger
DROP FUNCTION IF EXISTS public.generate_personality_tags(profile_data jsonb);

-- Drop the newer log_impersonation_event version that's not used by admin panel
DROP FUNCTION IF EXISTS public.log_impersonation_event(target_user_id uuid, reason text, additional_context jsonb);

-- =============================================================================
-- PHASE 3: CREATE CLEAN CALCULATE_PROFILE_STRENGTH FUNCTION
-- =============================================================================

-- Drop both existing calculate_profile_strength versions
DROP FUNCTION IF EXISTS public.calculate_profile_strength(therapist_row therapist_profiles);
DROP FUNCTION IF EXISTS public.calculate_profile_strength(p_license_number text, p_insurance_accepted boolean, p_bio text, p_profile_image_url text, p_specialties text[], p_communication_style text, p_session_format text, p_insurance_confirmed boolean, p_id_document_url text);

-- Create single clean version that combines best of both
CREATE OR REPLACE FUNCTION public.calculate_profile_strength(
    p_license_number text DEFAULT NULL,
    p_insurance_accepted boolean DEFAULT false,
    p_bio text DEFAULT NULL,
    p_profile_image_url text DEFAULT NULL,
    p_specialties text[] DEFAULT ARRAY[]::text[],
    p_communication_style text DEFAULT NULL,
    p_session_format text DEFAULT NULL,
    p_insurance_confirmed boolean DEFAULT false,
    p_id_document_url text DEFAULT NULL
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    strength integer := 0;
BEGIN
    -- Credentials (20%): license_number, insurance_accepted
    IF p_license_number IS NOT NULL AND p_license_number != '' AND p_license_number != 'PENDING_SETUP' THEN
        strength := strength + 10;
    END IF;
    IF p_insurance_accepted = true THEN
        strength := strength + 10;
    END IF;

    -- Profile Content (20%): bio, profile_image_url
    IF p_bio IS NOT NULL AND length(p_bio) >= 50 THEN
        strength := strength + 10;
    END IF;
    IF p_profile_image_url IS NOT NULL AND p_profile_image_url != '' THEN
        strength := strength + 10;
    END IF;

    -- Specialties (20%): specialties array length (at least 1 for full points)
    IF p_specialties IS NOT NULL AND array_length(p_specialties, 1) >= 1 THEN
        strength := strength + 20;
    END IF;

    -- Communication (20%): communication_style, session_format
    IF p_communication_style IS NOT NULL AND p_communication_style != '' THEN
        strength := strength + 10;
    END IF;
    IF p_session_format IS NOT NULL AND p_session_format != '' THEN
        strength := strength + 10;
    END IF;

    -- Verification (20%): insurance_confirmed, id_document_url
    IF p_insurance_confirmed = true THEN
        strength := strength + 10;
    END IF;
    IF p_id_document_url IS NOT NULL AND p_id_document_url != '' THEN
        strength := strength + 10;
    END IF;

    -- Ensure we don't exceed 100
    IF strength > 100 THEN
        strength := 100;
    END IF;

    RETURN strength;
END;
$function$;

-- =============================================================================
-- PHASE 4: VERIFICATION AND CLEANUP VALIDATION
-- =============================================================================

-- Verify no duplicate functions remain
DO $$
DECLARE
    func_count integer;
    trigger_exists boolean;
    app_function_exists boolean;
BEGIN
    -- Check calculate_profile_strength (should be exactly 1)
    SELECT COUNT(*) INTO func_count
    FROM pg_proc
    WHERE proname = 'calculate_profile_strength';

    IF func_count != 1 THEN
        RAISE EXCEPTION 'Expected 1 calculate_profile_strength function, found %', func_count;
    END IF;

    -- Check update_onboarding_progress (should be exactly 1 with correct signature)
    SELECT EXISTS(
        SELECT 1 FROM pg_proc p, pg_type t1, pg_type t2, pg_type t3
        WHERE p.proname = 'update_onboarding_progress'
        AND p.proargtypes[0] = t1.oid AND t1.typname = 'uuid'
        AND p.proargtypes[1] = t2.oid AND t2.typname = 'text'
        AND p.proargtypes[2] = t3.oid AND t3.typname = 'text'
        AND p.pronargs = 3
    ) INTO app_function_exists;

    IF NOT app_function_exists THEN
        RAISE EXCEPTION 'App-compatible update_onboarding_progress function not found';
    END IF;

    -- Check generate_personality_tags trigger still works
    SELECT EXISTS(
        SELECT 1 FROM pg_trigger t
        JOIN pg_proc p ON t.tgfoid = p.oid
        WHERE p.proname = 'generate_personality_tags'
        AND t.tgname = 'update_personality_tags'
    ) INTO trigger_exists;

    IF NOT trigger_exists THEN
        RAISE EXCEPTION 'generate_personality_tags trigger is broken';
    END IF;

    -- Check all remaining functions have search_path
    SELECT COUNT(*) INTO func_count
    FROM pg_proc
    WHERE proname IN (
        'calculate_profile_strength',
        'update_onboarding_progress',
        'generate_personality_tags',
        'log_impersonation_event',
        'log_impersonation_end'
    )
    AND (proconfig IS NULL OR NOT (proconfig::text LIKE '%search_path%'));

    IF func_count > 0 THEN
        RAISE EXCEPTION 'Found % functions without search_path configuration', func_count;
    END IF;

    RAISE NOTICE 'Function cleanup completed successfully - all validations passed';
END $$;

-- Final verification query for manual check
SELECT
    proname as "Function Name",
    pronargs as "Arg Count",
    CASE WHEN proconfig IS NOT NULL AND proconfig::text LIKE '%search_path%'
         THEN 'YES' ELSE 'NO' END as "Has Search Path"
FROM pg_proc
WHERE proname IN (
    'calculate_profile_strength',
    'update_onboarding_progress',
    'generate_personality_tags',
    'log_impersonation_event',
    'log_impersonation_end'
)
ORDER BY proname;

COMMIT;