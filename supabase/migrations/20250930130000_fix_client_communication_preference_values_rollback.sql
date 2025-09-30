-- Rollback Migration: Fix Wrong Client Communication Preference Values
-- Author: Foundation Agent
-- Date: 2025-09-30
-- Purpose: Safely rollback the client communication preference value corrections.
--          Restores original incorrect values if the forward migration causes issues.
--
-- Rollback Strategy:
--   1. Remove validation constraint added by forward migration
--   2. Restore original incorrect preference values to pre-migration state
--   3. Validate rollback completion
--
-- WARNING: This rollback restores the INCORRECT values that don't match the specification.
--          Only use if the forward migration causes unexpected problems.
--          After rollback, the matching algorithm will continue to fail.
--
-- Data Loss Warning: Any assessments created AFTER the forward migration with correct
--                    values will be reverted to incorrect values where mappings exist.
--                    This is unavoidable in a rollback scenario.

-- =====================================================
-- PART 1: PRE-ROLLBACK VALIDATION
-- =====================================================

do $$
declare
  v_total_assessments integer;
  v_assessments_with_prefs integer;
  v_correct_value_count integer;
begin
  -- Count total assessments
  select count(*) into v_total_assessments
  from public.client_assessments;

  -- Count assessments with communication preferences
  select count(*) into v_assessments_with_prefs
  from public.client_assessments
  where communication_preferences is not null
    and array_length(communication_preferences, 1) > 0;

  -- Count assessments with correct specification values
  select count(distinct id) into v_correct_value_count
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

  raise notice '=== PRE-ROLLBACK STATE ===';
  raise notice 'Total client assessments: %', v_total_assessments;
  raise notice 'Assessments with communication preferences: %', v_assessments_with_prefs;
  raise notice 'Assessments with correct specification values: %', v_correct_value_count;
  raise notice '';
  raise notice '⚠️  WARNING: Rolling back to incorrect values';
end $$;

-- =====================================================
-- PART 2: REMOVE VALIDATION CONSTRAINT
-- =====================================================

-- Remove the check constraint that enforces correct values
alter table public.client_assessments
drop constraint if exists check_communication_preferences_values;

-- Drop the validation function added by forward migration
drop function if exists public.is_valid_communication_preferences(text[]);

-- =====================================================
-- PART 3: RESTORE INCORRECT VALUES (IDEMPOTENT)
-- =====================================================

-- Restore original incorrect values
-- This reverses the forward migration mapping
update public.client_assessments
set communication_preferences = (
  select array(
    select case elem
      -- Reverse map correct values back to incorrect originals
      when 'Warm & empathetic' then 'Empathetic and understanding'
      when 'Flexible & empathetic' then 'Flexible and adaptable'
      when 'Calm & gentle' then 'Calm and process-focused'
      when 'Pragmatic & action-focused' then 'Pragmatic and problem solving'
      when 'Gently challenging' then 'Gently challenging and direct'

      -- Note: Cannot restore removed invalid values (empathetic, warm, structured)
      -- as we don't know which records originally had them

      -- Keep other values unchanged
      else elem
    end
    from unnest(communication_preferences) as elem
  )
)
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0
  and (
    -- Only update records that have corrected values
    'Warm & empathetic' = any(communication_preferences)
    or 'Flexible & empathetic' = any(communication_preferences)
    or 'Calm & gentle' = any(communication_preferences)
    or 'Pragmatic & action-focused' = any(communication_preferences)
    or 'Gently challenging' = any(communication_preferences)
  );

-- =====================================================
-- PART 4: POST-ROLLBACK VALIDATION
-- =====================================================

do $$
declare
  v_remaining_correct_count integer;
  v_restored_wrong_count integer;
begin
  -- Count any remaining correct values (should be minimal/zero)
  select count(distinct id) into v_remaining_correct_count
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

  -- Count records with restored incorrect values
  select count(distinct id) into v_restored_wrong_count
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

  raise notice '';
  raise notice '=== POST-ROLLBACK VALIDATION ===';
  raise notice 'Records still with correct values: %', v_remaining_correct_count;
  raise notice 'Records with restored incorrect values: %', v_restored_wrong_count;

  if v_remaining_correct_count > 0 then
    raise warning 'Rollback incomplete: % records still contain correct specification values', v_remaining_correct_count;
  else
    raise notice '✅ Rollback successful: Incorrect values restored (matching will fail again)';
  end if;
end $$;

-- =====================================================
-- PART 5: VERIFICATION QUERY
-- =====================================================

-- Display current state after rollback for manual verification
select
  'client_assessments' as table_name,
  'communication_preferences' as column_name,
  count(*) as total_records,
  count(*) filter (where
    'Empathetic and understanding' = any(communication_preferences)
  ) as empathetic_understanding_count,
  count(*) filter (where
    'Flexible and adaptable' = any(communication_preferences)
  ) as flexible_adaptable_count,
  count(*) filter (where
    'Calm and process-focused' = any(communication_preferences)
  ) as calm_process_count,
  count(*) filter (where
    'Pragmatic and problem solving' = any(communication_preferences)
  ) as pragmatic_problem_count,
  count(*) filter (where
    'Gently challenging and direct' = any(communication_preferences)
  ) as gently_challenging_direct_count
from public.client_assessments
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0;

-- Show all distinct values after rollback
select
  distinct unnest(communication_preferences) as preference_value,
  count(*) as occurrence_count
from public.client_assessments
where communication_preferences is not null
  and array_length(communication_preferences, 1) > 0
group by preference_value
order by occurrence_count desc;

-- Expected output after rollback: Should see original incorrect values restored

do $$
begin
  raise notice '';
  raise notice '=== ROLLBACK COMPLETE ===';
  raise notice '⚠️  WARNING: Original INCORRECT values have been restored.';
  raise notice '⚠️  The matching algorithm will continue to fail until forward migration is re-applied.';
  raise notice '⚠️  Note: Invalid standalone values (empathetic, warm, structured) cannot be restored';
  raise notice '         as we did not track which specific records originally had them.';
end $$;
