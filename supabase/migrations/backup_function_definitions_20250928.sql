-- Backup of Function Definitions Before Cleanup
-- Date: 2025-09-28
-- Purpose: Complete backup of all duplicate functions before cleanup migration
-- This file contains ALL current function versions for emergency restoration

-- =============================================================================
-- CALCULATE_PROFILE_STRENGTH FUNCTIONS (2 versions)
-- =============================================================================

-- Version 1 (OID: 32265) - Original version taking therapist_profiles row
CREATE OR REPLACE FUNCTION public.calculate_profile_strength(therapist_row therapist_profiles)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  strength integer := 0;
  basic_info_score integer := 0;
  specialties_score integer := 0;
  communication_score integer := 0;
  policies_score integer := 0;
  media_score integer := 0;
BEGIN
  -- Basic info (20%): name, license_number, bio
  IF therapist_row.name IS NOT NULL AND therapist_row.name != '' THEN
    basic_info_score := basic_info_score + 7;
  END IF;

  IF therapist_row.license_number IS NOT NULL AND
     therapist_row.license_number != '' AND
     therapist_row.license_number != 'PENDING_SETUP' THEN
    basic_info_score := basic_info_score + 7;
  END IF;

  IF therapist_row.bio IS NOT NULL AND therapist_row.bio != '' THEN
    basic_info_score := basic_info_score + 6;
  END IF;

  -- Specialties/modalities (20%): at least 2 of each
  IF array_length(therapist_row.specialties, 1) >= 2 THEN
    specialties_score := specialties_score + 10;
  END IF;

  IF array_length(therapist_row.modalities, 1) >= 2 THEN
    specialties_score := specialties_score + 10;
  END IF;

  -- Communication preferences (20%): communication_style, session_format
  IF therapist_row.communication_style IS NOT NULL AND therapist_row.communication_style != '' THEN
    communication_score := communication_score + 10;
  END IF;

  IF therapist_row.session_format IS NOT NULL AND therapist_row.session_format != '' THEN
    communication_score := communication_score + 10;
  END IF;

  -- Policies (20%): cancellation_policy, rescheduling_policy
  IF therapist_row.cancellation_policy IS NOT NULL AND therapist_row.cancellation_policy != '' THEN
    policies_score := policies_score + 10;
  END IF;

  IF therapist_row.rescheduling_policy IS NOT NULL AND therapist_row.rescheduling_policy != '' THEN
    policies_score := policies_score + 10;
  END IF;

  -- Media (20%): avatar_url, video_url or quote
  IF therapist_row.avatar_url IS NOT NULL AND therapist_row.avatar_url != '' THEN
    media_score := media_score + 10;
  END IF;

  IF (therapist_row.video_url IS NOT NULL AND therapist_row.video_url != '') OR
     (therapist_row.quote IS NOT NULL AND therapist_row.quote != '') THEN
    media_score := media_score + 10;
  END IF;

  -- Calculate total strength
  strength := basic_info_score + specialties_score + communication_score + policies_score + media_score;

  -- Ensure we don't exceed 100
  IF strength > 100 THEN
    strength := 100;
  END IF;

  RETURN strength;
END;
$function$;

-- Version 2 (OID: 32766) - V2 onboarding version with individual parameters
CREATE OR REPLACE FUNCTION public.calculate_profile_strength(p_license_number text DEFAULT NULL::text, p_insurance_accepted boolean DEFAULT false, p_bio text DEFAULT NULL::text, p_profile_image_url text DEFAULT NULL::text, p_specialties text[] DEFAULT ARRAY[]::text[], p_communication_style text DEFAULT NULL::text, p_session_format text DEFAULT NULL::text, p_insurance_confirmed boolean DEFAULT false, p_id_document_url text DEFAULT NULL::text)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    strength integer := 0;
BEGIN
    -- Credentials (20%): license_number, insurance_accepted
    IF p_license_number IS NOT NULL AND p_license_number != '' THEN
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

    -- Specialties (20%): specialties array length
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

    RETURN strength;
END;
$function$;

-- =============================================================================
-- GENERATE_PERSONALITY_TAGS FUNCTIONS (2 versions)
-- =============================================================================

-- Version 1 (OID: 29475) - Trigger function (USED BY TRIGGER)
CREATE OR REPLACE FUNCTION public.generate_personality_tags()
 RETURNS trigger
 LANGUAGE plpgsql
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

-- Version 2 (OID: 32767) - Standalone function with JSONB parameter
CREATE OR REPLACE FUNCTION public.generate_personality_tags(profile_data jsonb)
 RETURNS text[]
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    tags text[] := ARRAY[]::text[];
    communication_style text;
    specialties text[];
    modalities text[];
BEGIN
    -- Extract communication style and add related tags
    communication_style := profile_data->>'communication_style';
    IF communication_style IS NOT NULL THEN
        CASE communication_style
            WHEN 'Supportive & Relational' THEN
                tags := array_append(tags, 'empathetic');
                tags := array_append(tags, 'warm');
            WHEN 'Direct & Solution-Focused' THEN
                tags := array_append(tags, 'pragmatic');
                tags := array_append(tags, 'goal-oriented');
            WHEN 'Collaborative & Exploratory' THEN
                tags := array_append(tags, 'curious');
                tags := array_append(tags, 'collaborative');
            WHEN 'Gentle & Patient' THEN
                tags := array_append(tags, 'patient');
                tags := array_append(tags, 'gentle');
        END CASE;
    END IF;

    -- Extract specialties and add relevant tags
    specialties := ARRAY(SELECT jsonb_array_elements_text(profile_data->'specialties'));
    IF 'Anxiety' = ANY(specialties) THEN
        tags := array_append(tags, 'anxiety-specialist');
    END IF;
    IF 'Depression' = ANY(specialties) THEN
        tags := array_append(tags, 'depression-specialist');
    END IF;
    IF 'Trauma' = ANY(specialties) THEN
        tags := array_append(tags, 'trauma-informed');
    END IF;

    RETURN tags;
END;
$function$;

-- =============================================================================
-- UPDATE_ONBOARDING_PROGRESS FUNCTIONS (2 versions)
-- =============================================================================

-- Version 1 (OID: 32434) - Original with p_ prefixes (USED BY APP)
CREATE OR REPLACE FUNCTION public.update_onboarding_progress(p_user_id uuid, p_step_id text, p_action text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
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

-- Version 2 (OID: 32768) - V2 version with different signature
CREATE OR REPLACE FUNCTION public.update_onboarding_progress(user_id uuid, step_id text, completed boolean DEFAULT true, data jsonb DEFAULT NULL::jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    current_state jsonb;
    step_key text;
BEGIN
    -- Get current onboarding state
    SELECT onboarding_state INTO current_state
    FROM therapist_profiles
    WHERE therapist_profiles.user_id = update_onboarding_progress.user_id;

    -- Initialize if null
    IF current_state IS NULL THEN
        current_state := '{}'::jsonb;
    END IF;

    -- Update the specific step
    step_key := 'steps.' || step_id;
    current_state := jsonb_set(
        current_state,
        string_to_array(step_key, '.'),
        jsonb_build_object('completed', completed, 'data', COALESCE(data, '{}'::jsonb))
    );

    -- Save back to database
    UPDATE therapist_profiles
    SET onboarding_state = current_state,
        updated_at = now()
    WHERE therapist_profiles.user_id = update_onboarding_progress.user_id;
END;
$function$;

-- =============================================================================
-- LOG_IMPERSONATION_EVENT FUNCTIONS (2 versions)
-- =============================================================================

-- Version 1 (OID: 24482) - Original with event_type (USED BY APP)
CREATE OR REPLACE FUNCTION public.log_impersonation_event(target_user_id uuid, event_type text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
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

-- Version 2 (OID: 25056) - Enhanced version with reason and context
CREATE OR REPLACE FUNCTION public.log_impersonation_event(target_user_id uuid, reason text DEFAULT 'Administrative action'::text, additional_context jsonb DEFAULT '{}'::jsonb)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
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

  -- Insert impersonation log entry
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
    'IMPERSONATION_START',
    'auth.users',
    target_user_id,
    target_user_id,
    reason,
    additional_context || jsonb_build_object(
      'timestamp', now(),
      'admin_id', auth.uid(),
      'target_user_id', target_user_id
    ),
    current_setting('request.headers', true)::json->>'x-real-ip',
    current_setting('request.headers', true)::json->>'user-agent'
  ) RETURNING id INTO audit_id;

  RETURN audit_id;
END;
$function$;

-- =============================================================================
-- LOG_IMPERSONATION_END FUNCTION (1 version)
-- =============================================================================

-- Version 1 (OID: 25057) - Only version
CREATE OR REPLACE FUNCTION public.log_impersonation_end(target_user_id uuid, session_duration_minutes integer DEFAULT NULL::integer)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
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
-- RESTORATION NOTES
-- =============================================================================

-- To restore any specific function, copy the appropriate CREATE OR REPLACE statement
-- and run it in Supabase SQL editor.
--
-- Current Dependencies:
-- - update_personality_tags trigger uses generate_personality_tags() (OID: 29475)
-- - App code uses update_onboarding_progress(p_user_id, p_step_id, p_action) (OID: 32434)
-- - Admin panel uses log_impersonation_event(target_user_id, event_type) (OID: 24482)