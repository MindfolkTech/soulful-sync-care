-- Rollback: Pre-Migration Data Cleanup
-- Author: Foundation Agent
-- Date: 2025-09-30
-- Purpose: Restore original data values before cleanup
--
-- WARNING: This rollback restores the WRONG values that were breaking the matching algorithm
-- Only use this if you need to completely undo the data cleanup for testing purposes

-- =====================================================
-- PART 1: PRE-ROLLBACK STATE CHECK
-- =====================================================

do $$
declare
  v_current_client_count integer;
  v_current_therapist_style_count integer;
  v_current_therapist_format_count integer;
begin
  -- Count current clean data
  select count(distinct id) into v_current_client_count
  from public.client_assessments
  where communication_preferences is not null
    and array_length(communication_preferences, 1) > 0
    and (
      'Warm & empathetic' = any(communication_preferences)
      or 'Flexible & empathetic' = any(communication_preferences)
      or 'Calm & gentle' = any(communication_preferences)
      or 'Pragmatic & action-focused' = any(communication_preferences)
      or 'Gently challenging' = any(communication_preferences)
    );

  select count(*) into v_current_therapist_style_count
  from public.therapist_profiles
  where communication_style like '% & %';

  select count(*) into v_current_therapist_format_count
  from public.therapist_profiles
  where session_format like '% & %';

  raise notice '';
  raise notice '=== PRE-ROLLBACK STATE ===';
  raise notice 'Client assessments with correct values: %', v_current_client_count;
  raise notice 'Therapist profiles with "&" in communication_style: %', v_current_therapist_style_count;
  raise notice 'Therapist profiles with "&" in session_format: %', v_current_therapist_format_count;
  raise notice '';
  raise notice 'WARNING: This rollback will restore INCORRECT values that break matching!';
end $$;

-- =====================================================
-- PART 2: RESTORE ORIGINAL CLIENT COMMUNICATION PREFERENCES
-- =====================================================

-- Restore wrong client communication preference values (as they were before cleanup)
update public.client_assessments
set communication_preferences = (
  select array(
    select case elem
      -- Restore incorrect values that were in the database
      when 'Warm & empathetic' then 'Empathetic and understanding'
      when 'Flexible & empathetic' then 'Flexible and adaptable'
      when 'Calm & gentle' then 'Calm and process-focused'
      when 'Pragmatic & action-focused' then 'Pragmatic and problem solving'
      when 'Gently challenging' then 'Gently challenging and direct'

      -- Restore "and" format
      when 'Structured & goal-oriented' then 'Structured and goal-oriented'
      when 'Solution-oriented & practical' then 'Solution-oriented and practical'
      when 'Exploratory & insight-based' then 'Exploratory and insight-based'
      when 'Motivational & encouraging' then 'Motivational and encouraging'

      -- Keep other values unchanged
      else elem
    end
    from unnest(communication_preferences) as elem
  )
)
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0;

-- Note: We cannot restore the removed standalone values (empathetic, warm, structured)
-- as we don't know which records originally had them

-- =====================================================
-- PART 3: RESTORE THERAPIST COMMUNICATION STYLES
-- =====================================================

-- Replace "&" back to "and" in therapist communication styles
update public.therapist_profiles
set communication_style = replace(
  communication_style,
  ' & ',
  ' and '
)
where communication_style is not null
  and communication_style like '% & %';

-- =====================================================
-- PART 4: RESTORE THERAPIST SESSION FORMATS
-- =====================================================

-- Replace "&" back to "and" in therapist session formats
update public.therapist_profiles
set session_format = replace(
  session_format,
  ' & ',
  ' and '
)
where session_format is not null
  and session_format like '% & %';

-- =====================================================
-- PART 5: VERIFY ROLLBACK COMPLETION
-- =====================================================

do $$
declare
  v_restored_wrong_client integer;
  v_restored_and_style integer;
  v_restored_and_format integer;
begin
  -- Check for restored wrong values
  select count(distinct id) into v_restored_wrong_client
  from public.client_assessments
  where communication_preferences is not null
    and array_length(communication_preferences, 1) > 0
    and (
      'Empathetic and understanding' = any(communication_preferences)
      or 'Flexible and adaptable' = any(communication_preferences)
      or 'Calm and process-focused' = any(communication_preferences)
      or 'Pragmatic and problem solving' = any(communication_preferences)
      or 'Gently challenging and direct' = any(communication_preferences)
    );

  -- Check for restored "and" format
  select count(*) into v_restored_and_style
  from public.therapist_profiles
  where communication_style like '% and %';

  select count(*) into v_restored_and_format
  from public.therapist_profiles
  where session_format like '% and %';

  raise notice '';
  raise notice '=== POST-ROLLBACK VERIFICATION ===';
  raise notice 'Client assessments with wrong values restored: %', v_restored_wrong_client;
  raise notice 'Therapist profiles with "and" in communication_style: %', v_restored_and_style;
  raise notice 'Therapist profiles with "and" in session_format: %', v_restored_and_format;
  raise notice '';
  raise notice '⚠️ ROLLBACK COMPLETE - Database has been restored to BROKEN state';
  raise notice 'The matching algorithm will NOT work correctly with these values!';
  raise notice 'Run the cleanup migration again to fix the data.';
end $$;