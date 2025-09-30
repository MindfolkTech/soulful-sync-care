-- Pre-Migration Data Cleanup Script
-- Author: Foundation Agent
-- Date: 2025-09-30
-- Purpose: Fix all invalid data BEFORE running migrations with constraints
--          This must run FIRST before any other migrations
--
-- This script ONLY fixes data, it does NOT add any constraints or validations
-- Those will be added by the subsequent migration files

-- =====================================================
-- PART 1: COUNT INVALID DATA BEFORE CLEANUP
-- =====================================================

do $$
declare
  v_invalid_client_count integer;
  v_invalid_therapist_style_count integer;
  v_invalid_therapist_format_count integer;
begin
  -- Count invalid client assessments
  select count(distinct id) into v_invalid_client_count
  from public.client_assessments
  where communication_preferences is not null
    and array_length(communication_preferences, 1) > 0
    and (
      'Empathetic and understanding' = any(communication_preferences)
      or 'Flexible and adaptable' = any(communication_preferences)
      or 'Calm and process-focused' = any(communication_preferences)
      or 'Pragmatic and problem solving' = any(communication_preferences)
      or 'Gently challenging and direct' = any(communication_preferences)
      or 'empathetic' = any(communication_preferences)
      or 'warm' = any(communication_preferences)
      or 'structured' = any(communication_preferences)
      or 'Trauma-informed and gentle' = any(communication_preferences)
    );

  -- Count invalid therapist communication styles
  select count(*) into v_invalid_therapist_style_count
  from public.therapist_profiles
  where communication_style like '% and %' or communication_style like '% And %';

  -- Count invalid therapist session formats
  select count(*) into v_invalid_therapist_format_count
  from public.therapist_profiles
  where session_format like '% and %' or session_format like '% And %';

  raise notice '';
  raise notice '=== PRE-CLEANUP DATA STATUS ===';
  raise notice 'Invalid client assessments: %', v_invalid_client_count;
  raise notice 'Therapist profiles with "and" in communication_style: %', v_invalid_therapist_style_count;
  raise notice 'Therapist profiles with "and" in session_format: %', v_invalid_therapist_format_count;
  raise notice '';
end $$;

-- =====================================================
-- PART 2: FIX CLIENT COMMUNICATION PREFERENCES
-- =====================================================

-- Update wrong client communication preference values to match specification
update public.client_assessments
set communication_preferences = (
  select array(
    select case elem
      -- Map incorrect values to correct specification values
      when 'Empathetic and understanding' then 'Warm & empathetic'
      when 'Flexible and adaptable' then 'Flexible & empathetic'
      when 'Calm and process-focused' then 'Calm & gentle'
      when 'Pragmatic and problem solving' then 'Pragmatic & action-focused'
      when 'Gently challenging and direct' then 'Gently challenging'
      when 'Trauma-informed and gentle' then 'Calm & gentle'

      -- Remove invalid standalone values
      when 'empathetic' then null
      when 'warm' then null
      when 'structured' then null

      -- Fix any existing "and" to "&" format
      when 'Structured and goal-oriented' then 'Structured & goal-oriented'
      when 'Solution-oriented and practical' then 'Solution-oriented & practical'
      when 'Exploratory and insight-based' then 'Exploratory & insight-based'
      when 'Motivational and encouraging' then 'Motivational & encouraging'

      -- Keep already-correct values unchanged
      else elem
    end
    from unnest(communication_preferences) as elem
    where case elem
      -- Filter out NULL values (removed invalid entries)
      when 'empathetic' then false
      when 'warm' then false
      when 'structured' then false
      else true
    end
  )
)
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0;

-- =====================================================
-- PART 3: FIX THERAPIST COMMUNICATION STYLES
-- =====================================================

-- Replace "and" with "&" in therapist communication styles
update public.therapist_profiles
set communication_style = replace(
  replace(
    communication_style,
    ' and ',
    ' & '
  ),
  ' And ',
  ' & '
)
where communication_style is not null
  and (communication_style like '% and %' or communication_style like '% And %');

-- =====================================================
-- PART 4: FIX THERAPIST SESSION FORMATS
-- =====================================================

-- Replace "and" with "&" in therapist session formats
update public.therapist_profiles
set session_format = replace(
  replace(
    session_format,
    ' and ',
    ' & '
  ),
  ' And ',
  ' & '
)
where session_format is not null
  and (session_format like '% and %' or session_format like '% And %');

-- =====================================================
-- PART 5: VERIFY CLEANUP SUCCESS
-- =====================================================

do $$
declare
  v_remaining_invalid_client integer;
  v_remaining_invalid_style integer;
  v_remaining_invalid_format integer;
begin
  -- Check for any remaining invalid client assessments
  select count(distinct id) into v_remaining_invalid_client
  from public.client_assessments
  where communication_preferences is not null
    and array_length(communication_preferences, 1) > 0
    and (
      'Empathetic and understanding' = any(communication_preferences)
      or 'Flexible and adaptable' = any(communication_preferences)
      or 'Calm and process-focused' = any(communication_preferences)
      or 'Pragmatic and problem solving' = any(communication_preferences)
      or 'Gently challenging and direct' = any(communication_preferences)
      or 'empathetic' = any(communication_preferences)
      or 'warm' = any(communication_preferences)
      or 'structured' = any(communication_preferences)
      or 'Trauma-informed and gentle' = any(communication_preferences)
    );

  -- Check for any remaining "and" in therapist profiles
  select count(*) into v_remaining_invalid_style
  from public.therapist_profiles
  where communication_style like '% and %' or communication_style like '% And %';

  select count(*) into v_remaining_invalid_format
  from public.therapist_profiles
  where session_format like '% and %' or session_format like '% And %';

  raise notice '';
  raise notice '=== POST-CLEANUP VERIFICATION ===';
  raise notice 'Remaining invalid client assessments: % (should be 0)', v_remaining_invalid_client;
  raise notice 'Remaining "and" in communication_style: % (should be 0)', v_remaining_invalid_style;
  raise notice 'Remaining "and" in session_format: % (should be 0)', v_remaining_invalid_format;

  if v_remaining_invalid_client = 0 and v_remaining_invalid_style = 0 and v_remaining_invalid_format = 0 then
    raise notice '';
    raise notice '✅ DATA CLEANUP SUCCESSFUL!';
    raise notice 'All invalid data has been fixed.';
    raise notice 'You can now safely run the migrations with constraints.';
  else
    raise warning 'DATA CLEANUP INCOMPLETE - Some invalid data remains!';
  end if;
end $$;

-- =====================================================
-- PART 6: DISPLAY CLEANED DATA SUMMARY
-- =====================================================

-- Show distribution of cleaned communication preferences
select
  'client_assessments' as table_name,
  unnest(communication_preferences) as value,
  count(*) as count
from public.client_assessments
where communication_preferences is not null
group by unnest(communication_preferences)
order by count desc;

-- Show cleaned therapist communication styles
select
  'therapist_profiles.communication_style' as field,
  communication_style as value,
  count(*) as count
from public.therapist_profiles
where communication_style is not null
group by communication_style
order by count desc;

-- Show cleaned therapist session formats
select
  'therapist_profiles.session_format' as field,
  session_format as value,
  count(*) as count
from public.therapist_profiles
where session_format is not null
group by session_format
order by count desc;