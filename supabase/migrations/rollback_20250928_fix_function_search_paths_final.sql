-- Rollback Migration: fix_function_search_paths_final
-- Author: MindFolk Foundation Agent
-- Date: 2025-09-28
-- Purpose: Emergency rollback for function search_path fixes if needed
-- When to use: If any functions break after adding explicit search_path
-- Note: This matches the FINAL migration with 6 functions (not the broken version with 8)

-- Rollback 1: calculate_profile_strength (remove search_path)
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
AS $function$
DECLARE
    strength integer := 0;
BEGIN
    -- [Same function body as before, just without SET search_path]
    IF p_license_number IS NOT NULL AND p_license_number != '' THEN
        strength := strength + 10;
    END IF;
    IF p_insurance_accepted = true THEN
        strength := strength + 10;
    END IF;
    IF p_bio IS NOT NULL AND length(p_bio) >= 50 THEN
        strength := strength + 10;
    END IF;
    IF p_profile_image_url IS NOT NULL AND p_profile_image_url != '' THEN
        strength := strength + 10;
    END IF;
    IF p_specialties IS NOT NULL AND array_length(p_specialties, 1) >= 1 THEN
        strength := strength + 20;
    END IF;
    IF p_communication_style IS NOT NULL AND p_communication_style != '' THEN
        strength := strength + 10;
    END IF;
    IF p_session_format IS NOT NULL AND p_session_format != '' THEN
        strength := strength + 10;
    END IF;
    IF p_insurance_confirmed = true THEN
        strength := strength + 10;
    END IF;
    IF p_id_document_url IS NOT NULL AND p_id_document_url != '' THEN
        strength := strength + 10;
    END IF;
    RETURN strength;
END;
$function$;

-- Rollback 2: update_profile_strength_trigger (remove search_path)
CREATE OR REPLACE FUNCTION public.update_profile_strength_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
    NEW.profile_strength := calculate_profile_strength(
        NEW.license_number,
        NEW.insurance_accepted,
        NEW.bio,
        NEW.profile_image_url,
        NEW.specialties,
        NEW.communication_style,
        NEW.session_format,
        NEW.insurance_confirmed,
        NEW.id_document_url
    );
    RETURN NEW;
END;
$function$;

-- Rollback 3: generate_personality_tags (remove search_path)
CREATE OR REPLACE FUNCTION public.generate_personality_tags(profile_data jsonb)
RETURNS text[]
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    tags text[] := ARRAY[]::text[];
    communication_style text;
    specialties text[];
    modalities text[];
BEGIN
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

-- Rollback 4: audit_trigger_function (remove search_path)
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    audit_row audit_trail%rowtype;
BEGIN
    IF TG_WHEN <> 'AFTER' THEN
        RAISE EXCEPTION 'audit_trigger_function() may only run as an AFTER trigger';
    END IF;

    audit_row.id = gen_random_uuid();
    audit_row.user_id = auth.uid();
    audit_row.action = TG_OP::text;
    audit_row.table_name = TG_TABLE_NAME::text;
    audit_row.created_at = now();

    IF TG_OP = 'UPDATE' THEN
        audit_row.record_id = NEW.id;
        audit_row.old_data = to_jsonb(OLD);
        audit_row.new_data = to_jsonb(NEW);
    ELSIF TG_OP = 'DELETE' THEN
        audit_row.record_id = OLD.id;
        audit_row.old_data = to_jsonb(OLD);
        audit_row.new_data = NULL;
    ELSIF TG_OP = 'INSERT' THEN
        audit_row.record_id = NEW.id;
        audit_row.old_data = NULL;
        audit_row.new_data = to_jsonb(NEW);
    END IF;

    INSERT INTO audit_trail VALUES (audit_row.*);

    RETURN NULL;
END;
$function$;

-- Rollback 5: update_onboarding_progress (remove search_path)
CREATE OR REPLACE FUNCTION public.update_onboarding_progress(
    user_id uuid,
    step_id text,
    completed boolean DEFAULT true,
    data jsonb DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    current_state jsonb;
    step_key text;
BEGIN
    SELECT onboarding_state INTO current_state
    FROM therapist_profiles
    WHERE therapist_profiles.user_id = update_onboarding_progress.user_id;

    IF current_state IS NULL THEN
        current_state := '{}'::jsonb;
    END IF;

    step_key := 'steps.' || step_id;
    current_state := jsonb_set(
        current_state,
        string_to_array(step_key, '.'),
        jsonb_build_object('completed', completed, 'data', COALESCE(data, '{}'::jsonb))
    );

    UPDATE therapist_profiles
    SET onboarding_state = current_state,
        updated_at = now()
    WHERE therapist_profiles.user_id = update_onboarding_progress.user_id;
END;
$function$;

-- Rollback 6: update_updated_at_column (remove search_path)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$;

-- Verification query - confirm functions no longer have explicit search_path
SELECT
    proname as "Function Name",
    proconfig as "Function Config (should be null after rollback)"
FROM pg_proc
WHERE proname IN (
    'calculate_profile_strength',
    'update_profile_strength_trigger',
    'generate_personality_tags',
    'audit_trigger_function',
    'update_onboarding_progress',
    'update_updated_at_column'
)
ORDER BY proname;