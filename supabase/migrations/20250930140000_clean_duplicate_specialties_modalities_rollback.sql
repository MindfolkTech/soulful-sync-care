-- Rollback Migration: Restore Original Specialties and Modalities
-- Author: Assistant
-- Date: 2025-09-30
-- Purpose: Rollback standardisation of specialties and modalities
--
-- WARNING: This rollback is approximate - it cannot perfectly restore the original
--          inconsistent casing and non-standard values. It attempts to restore
--          common patterns that were cleaned.

-- =====================================================
-- PART 1: RESTORE SPECIALTIES (APPROXIMATE)
-- =====================================================

-- Note: We cannot know which "Anxiety" was originally "anxiety" vs "Anxiety"
-- This is a best-effort restoration based on common patterns

update public.therapist_profiles
set specialties = (
  select array_agg(
    case
      -- Randomly restore some casing inconsistencies (approximate)
      when spec = 'Anxiety' and random() < 0.3 then 'anxiety'
      when spec = 'Depression' and random() < 0.3 then 'depression'
      -- Cannot restore removed non-standard values without backup
      -- 'cultural identity', 'mindfulness', 'stress management', 'work-life balance'
      -- were removed and mapped to standard values - cannot reverse without original data
      else spec
    end
  )
  from unnest(specialties) as spec
),
updated_at = now()
where specialties is not null
  and array_length(specialties, 1) > 0;

-- Log specialties rollback
do $$
declare
  v_specialties_updated integer;
begin
  get diagnostics v_specialties_updated = row_count;
  raise notice 'Specialties rolled back in % profiles', v_specialties_updated;
  raise warning 'Original non-standard values (cultural identity, mindfulness, etc.) cannot be restored';
end $$;

-- =====================================================
-- PART 2: RESTORE MODALITIES (APPROXIMATE)
-- =====================================================

update public.therapist_profiles
set modalities = (
  select array_agg(
    case
      -- Restore some abbreviated forms
      when mod = 'Cognitive Behavioural Therapy (CBT)' and random() < 0.3 then 'CBT'
      when mod = 'Mindfulness-based Therapy (MBCT)' and random() < 0.2 then 'mindfulness-based therapy'
      -- Cannot restore 'culturally adapted therapy' and 'solution-focused therapy'
      -- as they were mapped to other values
      else mod
    end
  )
  from unnest(modalities) as mod
),
updated_at = now()
where modalities is not null
  and array_length(modalities, 1) > 0;

-- Log modalities rollback
do $$
declare
  v_modalities_updated integer;
begin
  get diagnostics v_modalities_updated = row_count;
  raise notice 'Modalities rolled back in % profiles', v_modalities_updated;
  raise warning 'Original non-standard values (culturally adapted therapy, solution-focused therapy) cannot be restored';
end $$;

-- =====================================================
-- PART 3: REMOVE CONSTRAINTS IF ADDED
-- =====================================================

drop trigger if exists validate_specialties on public.therapist_profiles;
drop function if exists public.check_specialties_valid();
drop trigger if exists validate_modalities on public.therapist_profiles;
drop function if exists public.check_modalities_valid();

-- =====================================================
-- PART 4: POST-ROLLBACK NOTIFICATION
-- =====================================================

do $$
begin
  raise notice '⚠️ IMPORTANT: Rollback is approximate';
  raise notice 'The following cannot be perfectly restored:';
  raise notice '  1. Exact original casing (anxiety vs Anxiety)';
  raise notice '  2. Non-standard values that were removed:';
  raise notice '     - cultural identity';
  raise notice '     - mindfulness';
  raise notice '     - stress management';
  raise notice '     - work-life balance';
  raise notice '     - culturally adapted therapy';
  raise notice '     - solution-focused therapy';
  raise notice '';
  raise notice 'For perfect restoration, restore from database backup taken before migration.';
end $$;