-- Migration: Standardise Communication Format to Ampersand (&) for Matching Algorithm Alignment
-- Author: Foundation Agent
-- Date: 2025-09-30
-- Purpose: Resolve format inconsistencies between client assessments (using "and") and therapist profiles (using "&")
--          that are breaking the personality tag matching algorithm. Standardises on "&" format to align with
--          existing enum types and trigger function expectations.
--
-- Changes:
--   1. Update client_assessments.communication_preferences array elements: replace "and" with "&"
--   2. Update therapist_profiles.communication_style: replace " and " with " & " (preserves hyphenated terms like "goal-oriented")
--   3. Update therapist_profiles.session_format: replace " and " with " & "
--   4. Add check constraints to enforce "&" format on therapist_profiles columns
--   5. Regenerate personality_tags for all therapist profiles to ensure consistency
--
-- Dependencies:
--   - Existing communication_style_enum and session_format_enum types (already use "&" format)
--   - Existing generate_personality_tags() trigger function (already expects "&" format via LIKE patterns)
--   - TypeScript parseStyleSentence() function handles both formats gracefully
--
-- Performance Impact: Minimal - affects 51 client assessment records and 12 therapist profiles
--
-- Rollback Strategy: Reverse transformation available in companion rollback file
--                    Data can be restored by replacing "&" with "and"

-- =====================================================
-- PART 1: PRE-MIGRATION VALIDATION
-- =====================================================

-- Store counts before migration for validation
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

  raise notice 'Pre-migration counts: client_assessments=%, therapist communication_style=%, therapist session_format=%',
    v_client_count, v_therapist_style_count, v_therapist_format_count;
end $$;

-- =====================================================
-- PART 2: DATA TRANSFORMATION (IDEMPOTENT)
-- =====================================================

-- Update client_assessments.communication_preferences array
-- Replace "and" with "&" in each array element while preserving hyphenated terms
update public.client_assessments
set communication_preferences = array(
  select replace(
    replace(
      unnest(communication_preferences),
      ' and ',  -- Replace " and " with " & " (space-delimited to preserve "goal-oriented")
      ' & '
    ),
    ' And ',  -- Handle capitalised "And" as well
    ' & '
  )
)
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0
  and exists (
    select 1 from unnest(communication_preferences) elem
    where elem like '% and %' or elem like '% And %'
  );

-- Update therapist_profiles.communication_style
-- Replace " and " with " & " while preserving hyphenated terms
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

-- Update therapist_profiles.session_format
-- Replace " and " with " & " while preserving hyphenated terms
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
-- PART 3: ADD VALIDATION CONSTRAINTS
-- =====================================================

-- Add check constraint to therapist_profiles.communication_style
-- Ensures values match the enum format (using "&" not "and")
alter table public.therapist_profiles
drop constraint if exists check_communication_style_format;

alter table public.therapist_profiles
add constraint check_communication_style_format
check (
  communication_style is null
  or communication_style like 'Supportive & Relational%'
  or communication_style like 'Motivational & Encouraging%'
  or communication_style like 'Pragmatic & Problem-solving%'
  or communication_style like 'Flexible & Adaptive%'
);

-- Add check constraint to therapist_profiles.session_format
-- Ensures values match the enum format (using "&" not "and")
alter table public.therapist_profiles
drop constraint if exists check_session_format_format;

alter table public.therapist_profiles
add constraint check_session_format_format
check (
  session_format is null
  or session_format like 'Structured & Goal-oriented%'
  or session_format like 'Exploratory & Insight-based%'
  or session_format like 'Interactive & Dynamic%'
  or session_format like 'Calm & Process-Focused%'
);

-- =====================================================
-- PART 4: REGENERATE PERSONALITY TAGS
-- =====================================================

-- Trigger the personality tag regeneration for all therapist profiles
-- This ensures personality_tags arrays are consistent with the new format
update public.therapist_profiles
set updated_at = now()
where communication_style is not null or session_format is not null;

-- =====================================================
-- PART 5: POST-MIGRATION VALIDATION
-- =====================================================

-- Validate no "and" format remains in the data
do $$
declare
  v_client_and_count integer;
  v_therapist_style_and_count integer;
  v_therapist_format_and_count integer;
  v_client_ampersand_count integer;
  v_therapist_style_ampersand_count integer;
  v_therapist_format_ampersand_count integer;
begin
  -- Count remaining "and" occurrences (should be 0)
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

  -- Count "&" occurrences (should match original counts)
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

  raise notice 'Post-migration validation:';
  raise notice '  Remaining "and" format - clients: %, therapist style: %, therapist format: %',
    v_client_and_count, v_therapist_style_and_count, v_therapist_format_and_count;
  raise notice '  Now using "&" format - clients: %, therapist style: %, therapist format: %',
    v_client_ampersand_count, v_therapist_style_ampersand_count, v_therapist_format_ampersand_count;

  if v_client_and_count > 0 or v_therapist_style_and_count > 0 or v_therapist_format_and_count > 0 then
    raise warning 'Migration incomplete: Some records still contain "and" format';
  else
    raise notice '✅ Migration successful: All formats standardised to "&"';
  end if;
end $$;

-- =====================================================
-- PART 6: VERIFICATION QUERY
-- =====================================================

-- Query to verify the migration results
-- Run this manually after migration to inspect the data
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

-- Expected output:
-- | table_name          | column_name               | total_records | with_ampersand | with_and |
-- |---------------------|---------------------------|---------------|----------------|----------|
-- | client_assessments  | communication_preferences | 44-51         | 44-51          | 0        |
-- | therapist_profiles  | communication_style       | 10            | 10             | 0        |
-- | therapist_profiles  | session_format            | 10            | 10             | 0        |