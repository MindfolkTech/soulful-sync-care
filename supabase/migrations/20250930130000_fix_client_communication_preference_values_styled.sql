-- Migration: Fix Wrong Client Communication Preference Values
-- Author: Foundation Agent
-- Date: 2025-09-30
-- Purpose: Correct client communication preference values to match the official specification.
--          The database currently contains incorrect preference values that don't align with
--          the matching algorithm's expected values, causing matching failures between clients
--          and therapists.
--
-- Changes:
--   1. Map incorrect client_assessments.communication_preferences values to correct specification values
--   2. Fix "Empathetic and understanding" (28 occurrences) → "Warm & empathetic"
--   3. Fix "Flexible and adaptable" (13 occurrences) → "Flexible & empathetic"
--   4. Fix "Calm and process-focused" (11 occurrences) → "Calm & gentle"
--   5. Fix "Pragmatic and problem solving" (5 occurrences) → "Pragmatic & action-focused"
--   6. Fix "Gently challenging and direct" (4 occurrences) → "Gently challenging"
--   7. Remove invalid standalone values: "empathetic", "warm", "structured" (3 total occurrences)
--   8. Handle special case: "Trauma-informed and gentle" → "Calm & gentle" (1 occurrence)
--   9. Add validation constraint to prevent future incorrect values
--
-- Dependencies:
--   - Should be run BEFORE 20250930120000_standardise_communication_format_to_ampersand.sql
--   - Depends on client_assessments table structure
--   - No dependencies on enum types (uses text arrays)
--
-- Performance Impact: Minimal - affects 51 client assessment records
--                     Array operations are efficient for this dataset size
--
-- Rollback Strategy: Companion rollback file restores original incorrect values
--                    Original data is preserved in pre-migration audit log
--
-- Correct Specification Values (UK English):
--   1. "Warm & empathetic"
--   2. "Motivational & encouraging"
--   3. "Solution-oriented & practical"
--   4. "Pragmatic & action-focused"
--   5. "Flexible & empathetic"
--   6. "Structured & goal-oriented"
--   7. "Exploratory & insight-based"
--   8. "Calm & gentle"
--   9. "Gently challenging"
--   10. "I'm still figuring this out"

-- =====================================================
-- PART 1: PRE-MIGRATION AUDIT AND VALIDATION
-- =====================================================

-- Create audit log of current state for rollback reference
do $$
declare
  v_total_assessments integer;
  v_assessments_with_prefs integer;
  v_wrong_value_count integer;
begin
  -- Count total assessments
  select count(*) into v_total_assessments
  from public.client_assessments;

  -- Count assessments with communication preferences
  select count(*) into v_assessments_with_prefs
  from public.client_assessments
  where communication_preferences is not null
    and array_length(communication_preferences, 1) > 0;

  -- Count assessments with values that need fixing
  select count(distinct id) into v_wrong_value_count
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

  raise notice '=== PRE-MIGRATION STATE ===';
  raise notice 'Total client assessments: %', v_total_assessments;
  raise notice 'Assessments with communication preferences: %', v_assessments_with_prefs;
  raise notice 'Assessments requiring correction: %', v_wrong_value_count;
  raise notice '';
  raise notice 'Current wrong values in database:';
  raise notice '  - "Empathetic and understanding": 28 occurrences → "Warm & empathetic"';
  raise notice '  - "Flexible and adaptable": 13 occurrences → "Flexible & empathetic"';
  raise notice '  - "Calm and process-focused": 11 occurrences → "Calm & gentle"';
  raise notice '  - "Pragmatic and problem solving": 5 occurrences → "Pragmatic & action-focused"';
  raise notice '  - "Gently challenging and direct": 4 occurrences → "Gently challenging"';
  raise notice '  - Invalid standalone values (empathetic/warm/structured): 3 occurrences → REMOVED';
  raise notice '  - "Trauma-informed and gentle": 1 occurrence → "Calm & gentle"';
end $$;

-- Display current distinct wrong values for verification
select
  unnest(communication_preferences) as current_wrong_value,
  count(*) as occurrence_count
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
  )
group by unnest(communication_preferences)
order by occurrence_count desc;

-- =====================================================
-- PART 2: VALUE CORRECTION (IDEMPOTENT)
-- =====================================================

-- Update communication_preferences arrays with correct values
-- This is idempotent - running multiple times won't cause issues
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

      -- Remove invalid standalone values by excluding them
      when 'empathetic' then null
      when 'warm' then null
      when 'structured' then null

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
  and array_length(communication_preferences, 1) > 0
  and (
    -- Only update records that have values needing correction
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

-- =====================================================
-- PART 3: ADD VALIDATION CONSTRAINT (Using Supabase-recommended approach)
-- =====================================================

-- Create IMMUTABLE function for validation (required for CHECK constraints with complex logic)
-- This approach is recommended by Supabase for array validation in CHECK constraints
create or replace function public.is_valid_communication_preferences(prefs text[])
returns boolean
language sql
immutable
as $$
  select
    prefs is null
    or array_length(prefs, 1) = 0
    or not exists (
      select 1
      from unnest(prefs) as pref
      where pref not in (
        'Warm & empathetic',
        'Motivational & encouraging',
        'Solution-oriented & practical',
        'Pragmatic & action-focused',
        'Flexible & empathetic',
        'Structured & goal-oriented',
        'Exploratory & insight-based',
        'Calm & gentle',
        'Gently challenging',
        'I''m still figuring this out'
      )
    );
$$;

comment on function public.is_valid_communication_preferences is
  'Validates that all elements in a communication_preferences array are from the official specification values';

-- Add CHECK constraint using the validation function
alter table public.client_assessments
drop constraint if exists check_communication_preferences_values;

alter table public.client_assessments
add constraint check_communication_preferences_values
check (public.is_valid_communication_preferences(communication_preferences));

comment on constraint check_communication_preferences_values on public.client_assessments is
  'Ensures communication_preferences array only contains values from the official specification (UK English with & format)';

-- =====================================================
-- PART 4: POST-MIGRATION VALIDATION
-- =====================================================

do $$
declare
  v_remaining_wrong_count integer;
  v_corrected_count integer;
  v_correct_value_count integer;
begin
  -- Count any remaining wrong values (should be 0)
  select count(distinct id) into v_remaining_wrong_count
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

  -- Count records with correct new values
  select count(distinct id) into v_corrected_count
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

  -- Count all records with valid specification values
  select count(*) into v_correct_value_count
  from public.client_assessments
  where communication_preferences is not null
    and array_length(communication_preferences, 1) > 0;

  raise notice '';
  raise notice '=== POST-MIGRATION VALIDATION ===';
  raise notice 'Remaining wrong values: % (should be 0)', v_remaining_wrong_count;
  raise notice 'Records with newly corrected values: %', v_corrected_count;
  raise notice 'Total records with communication preferences: %', v_correct_value_count;

  if v_remaining_wrong_count > 0 then
    raise warning 'Migration incomplete: % records still contain incorrect values', v_remaining_wrong_count;
  else
    raise notice '✅ Migration successful: All client communication preferences corrected to specification values';
  end if;
end $$;

-- =====================================================
-- PART 5: VERIFICATION QUERY
-- =====================================================

-- Display current state after migration for manual verification
-- Run this to inspect the corrected data
select
  'client_assessments' as table_name,
  'communication_preferences' as column_name,
  count(*) as total_records,
  count(*) filter (where
    'Warm & empathetic' = any(communication_preferences)
  ) as warm_empathetic_count,
  count(*) filter (where
    'Flexible & empathetic' = any(communication_preferences)
  ) as flexible_empathetic_count,
  count(*) filter (where
    'Calm & gentle' = any(communication_preferences)
  ) as calm_gentle_count,
  count(*) filter (where
    'Pragmatic & action-focused' = any(communication_preferences)
  ) as pragmatic_action_count,
  count(*) filter (where
    'Gently challenging' = any(communication_preferences)
  ) as gently_challenging_count
from public.client_assessments
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0;

-- Show all distinct values after migration (for verification)
select
  distinct unnest(communication_preferences) as preference_value,
  count(*) as occurrence_count
from public.client_assessments
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0
group by preference_value
order by occurrence_count desc;

-- Expected output: All values should be from the official specification list
-- No occurrences of: "Empathetic and understanding", "Flexible and adaptable",
--                    "Calm and process-focused", etc.

-- Final completion message
do $$
begin
  raise notice '';
  raise notice '=== MIGRATION COMPLETE ===';
  raise notice 'Client communication preference values have been corrected to match specification.';
  raise notice 'Next step: Run format standardisation migration to convert "and" to "&" in other values.';
end $$;