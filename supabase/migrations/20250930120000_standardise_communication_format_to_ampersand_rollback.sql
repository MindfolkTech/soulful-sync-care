-- Rollback Migration: Standardise Communication Format to Ampersand (&)
-- Author: Foundation Agent
-- Date: 2025-09-30
-- Purpose: Safely rollback the format standardisation migration if issues arise.
--          Restores "and" format in client_assessments and therapist_profiles.
--
-- Rollback Strategy:
--   1. Remove check constraints added by forward migration
--   2. Restore "and" format in client_assessments.communication_preferences
--   3. Restore "and" format in therapist_profiles.communication_style
--   4. Restore "and" format in therapist_profiles.session_format
--   5. Regenerate personality_tags with old format
--   6. Validate rollback completion
--
-- WARNING: This rollback restores the format inconsistency that was causing matching issues.
--          Only use if the forward migration causes unexpected problems.

-- =====================================================
-- PART 1: PRE-ROLLBACK VALIDATION
-- =====================================================

do $$
declare
  v_client_count integer;
  v_therapist_style_count integer;
  v_therapist_format_count integer;
begin
  select count(*) into v_client_count
  from public.client_assessments
  where communication_preferences is not null
    and array_length(communication_preferences, 1) > 0;

  select count(*) into v_therapist_style_count
  from public.therapist_profiles
  where communication_style is not null;

  select count(*) into v_therapist_format_count
  from public.therapist_profiles
  where session_format is not null;

  raise notice 'Pre-rollback counts: client_assessments=%, therapist communication_style=%, therapist session_format=%',
    v_client_count, v_therapist_style_count, v_therapist_format_count;
end $$;

-- =====================================================
-- PART 2: REMOVE VALIDATION CONSTRAINTS
-- =====================================================

-- Remove check constraints added by forward migration
alter table public.therapist_profiles
drop constraint if exists check_communication_style_format;

alter table public.therapist_profiles
drop constraint if exists check_session_format_format;

-- Log constraint removal
do $$
begin
  raise notice 'Validation constraints removed';
end $$;

-- =====================================================
-- PART 3: RESTORE "and" FORMAT (IDEMPOTENT)
-- =====================================================

-- Restore client_assessments.communication_preferences to "and" format
update public.client_assessments
set communication_preferences = array(
  select replace(
    unnest(communication_preferences),
    ' & ',
    ' and '
  )
)
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0
  and exists (
    select 1 from unnest(communication_preferences) elem
    where elem like '% & %'
  );

-- Restore therapist_profiles.communication_style to "and" format
update public.therapist_profiles
set communication_style = replace(
  communication_style,
  ' & ',
  ' and '
)
where communication_style is not null
  and communication_style like '% & %';

-- Restore therapist_profiles.session_format to "and" format
update public.therapist_profiles
set session_format = replace(
  session_format,
  ' & ',
  ' and '
)
where session_format is not null
  and session_format like '% & %';

-- =====================================================
-- PART 4: REGENERATE PERSONALITY TAGS
-- =====================================================

-- Trigger personality tag regeneration with restored format
-- NOTE: The trigger function expects "&" format, so tags may not generate correctly
-- This is expected behaviour for a rollback - it restores the original inconsistent state
update public.therapist_profiles
set updated_at = now()
where communication_style is not null or session_format is not null;

do $$
begin
  raise notice '⚠️  WARNING: Personality tags regenerated with "and" format. Matching inconsistencies restored.';
end $$;

-- =====================================================
-- PART 5: POST-ROLLBACK VALIDATION
-- =====================================================

do $$
declare
  v_client_and_count integer;
  v_therapist_style_and_count integer;
  v_therapist_format_and_count integer;
  v_client_ampersand_count integer;
  v_therapist_style_ampersand_count integer;
  v_therapist_format_ampersand_count integer;
begin
  -- Count "and" occurrences (should be restored)
  select count(*) into v_client_and_count
  from public.client_assessments
  where exists (
    select 1 from unnest(communication_preferences) elem
    where elem like '% and %'
  );

  select count(*) into v_therapist_style_and_count
  from public.therapist_profiles
  where communication_style like '% and %';

  select count(*) into v_therapist_format_and_count
  from public.therapist_profiles
  where session_format like '% and %';

  -- Count "&" occurrences (should be minimal or zero)
  select count(*) into v_client_ampersand_count
  from public.client_assessments
  where exists (
    select 1 from unnest(communication_preferences) elem
    where elem like '% & %'
  );

  select count(*) into v_therapist_style_ampersand_count
  from public.therapist_profiles
  where communication_style like '% & %';

  select count(*) into v_therapist_format_ampersand_count
  from public.therapist_profiles
  where session_format like '% & %';

  raise notice 'Post-rollback validation:';
  raise notice '  Restored "and" format - clients: %, therapist style: %, therapist format: %',
    v_client_and_count, v_therapist_style_and_count, v_therapist_format_and_count;
  raise notice '  Remaining "&" format - clients: %, therapist style: %, therapist format: %',
    v_client_ampersand_count, v_therapist_style_ampersand_count, v_therapist_format_ampersand_count;

  if v_client_ampersand_count > 0 or v_therapist_style_ampersand_count > 0 or v_therapist_format_ampersand_count > 0 then
    raise warning 'Rollback incomplete: Some records still contain "&" format';
  else
    raise notice '✅ Rollback successful: Format restored to "and" (inconsistent state restored)';
  end if;
end $$;

-- =====================================================
-- PART 6: VERIFICATION QUERY
-- =====================================================

-- Query to verify rollback results
select
  'client_assessments' as table_name,
  'communication_preferences' as column_name,
  count(*) as total_records,
  count(*) filter (where exists (
    select 1 from unnest(communication_preferences) cp where cp like '% & %'
  )) as with_ampersand,
  count(*) filter (where exists (
    select 1 from unnest(communication_preferences) cp where cp like '% and %'
  )) as with_and
from public.client_assessments
where communication_preferences is not null and array_length(communication_preferences, 1) > 0

union all

select
  'therapist_profiles' as table_name,
  'communication_style' as column_name,
  count(*) as total_records,
  count(*) filter (where communication_style like '% & %') as with_ampersand,
  count(*) filter (where communication_style like '% and %') as with_and
from public.therapist_profiles
where communication_style is not null

union all

select
  'therapist_profiles' as table_name,
  'session_format' as column_name,
  count(*) as total_records,
  count(*) filter (where session_format like '% & %') as with_ampersand,
  count(*) filter (where session_format like '% and %') as with_and
from public.therapist_profiles
where session_format is not null;

-- Expected output after rollback (original inconsistent state):
-- | table_name          | column_name               | total_records | with_ampersand | with_and |
-- |---------------------|---------------------------|---------------|----------------|----------|
-- | client_assessments  | communication_preferences | 44-51         | 0              | 44-51    |
-- | therapist_profiles  | communication_style       | 10            | 0              | 10       |
-- | therapist_profiles  | session_format            | 10            | 0              | 10       |

do $$
begin
  raise notice '⚠️  ROLLBACK COMPLETE: Original format inconsistency restored. Matching algorithm may not work correctly.';
end $$;
