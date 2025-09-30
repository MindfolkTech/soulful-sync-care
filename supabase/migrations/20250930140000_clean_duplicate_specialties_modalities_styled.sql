-- Migration: Clean Duplicate Specialties and Modalities
-- Author: Assistant
-- Date: 2025-09-30
-- Purpose: Standardise specialties and modalities to match taxonomy tables,
--          removing duplicates and non-standard values
--
-- Issues Fixed:
--   1. Duplicate specialties with different casing (e.g., "Anxiety" vs "anxiety")
--   2. Non-standard specialty additions not in taxonomy table
--   3. Duplicate modalities with different formats (e.g., "CBT" vs "Cognitive Behavioural Therapy (CBT)")
--   4. Non-standard modality additions not in taxonomy table

-- =====================================================
-- PART 1: PRE-MIGRATION VALIDATION
-- =====================================================

do $$
declare
  v_therapist_count integer;
  v_unique_specialties text[];
  v_unique_modalities text[];
begin
  -- Count affected therapists
  select count(*) into v_therapist_count
  from public.therapist_profiles
  where (specialties is not null and array_length(specialties, 1) > 0)
     or (modalities is not null and array_length(modalities, 1) > 0);

  -- Get unique values before migration
  select array_agg(distinct spec) into v_unique_specialties
  from (
    select unnest(specialties) as spec
    from public.therapist_profiles
    where specialties is not null and array_length(specialties, 1) > 0
  ) s;

  select array_agg(distinct mod) into v_unique_modalities
  from (
    select unnest(modalities) as mod
    from public.therapist_profiles
    where modalities is not null and array_length(modalities, 1) > 0
  ) m;

  raise notice 'Pre-migration state:';
  raise notice '  Therapist profiles to update: %', v_therapist_count;
  raise notice '  Unique specialties count: %', array_length(v_unique_specialties, 1);
  raise notice '  Unique modalities count: %', array_length(v_unique_modalities, 1);
end $$;

-- =====================================================
-- PART 2: CLEAN SPECIALTIES
-- =====================================================

-- Standardise casing for specialties
update public.therapist_profiles
set specialties = (
  select array_agg(distinct
    case
      -- Fix casing inconsistencies
      when spec = 'anxiety' then 'Anxiety'
      when spec = 'depression' then 'Depression'
      -- Remove non-standard additions (not in taxonomy)
      when spec = 'cultural identity' then null
      when spec = 'mindfulness' then null
      when spec = 'stress management' then 'Anxiety'  -- Map to closest standard
      when spec = 'work-life balance' then 'Career difficulties'  -- Map to closest standard
      -- Keep everything else as-is
      else spec
    end
  )
  from unnest(specialties) as spec
  where spec is not null
    and case
      when spec = 'cultural identity' then false
      when spec = 'mindfulness' then false
      else true
    end
),
updated_at = now()
where specialties is not null
  and array_length(specialties, 1) > 0
  and (
    -- Only update if changes needed
    'anxiety' = any(specialties)
    or 'depression' = any(specialties)
    or 'cultural identity' = any(specialties)
    or 'mindfulness' = any(specialties)
    or 'stress management' = any(specialties)
    or 'work-life balance' = any(specialties)
  );

-- Log specialties update
do $$
declare
  v_specialties_updated integer;
begin
  get diagnostics v_specialties_updated = row_count;
  raise notice 'Specialties cleaned in % profiles', v_specialties_updated;
end $$;

-- =====================================================
-- PART 3: CLEAN MODALITIES
-- =====================================================

-- Standardise modalities to full names (as in taxonomy table)
update public.therapist_profiles
set modalities = (
  select array_agg(distinct
    case
      -- Standardise to full names from taxonomy
      when mod = 'CBT' then 'Cognitive Behavioural Therapy (CBT)'
      when mod = 'mindfulness-based therapy' then 'Mindfulness-based Therapy (MBCT)'
      -- Remove non-standard additions (not in taxonomy)
      when mod = 'culturally adapted therapy' then 'Integrative/eclectic approach'  -- Map to closest
      when mod = 'solution-focused therapy' then 'Cognitive Behavioural Therapy (CBT)'  -- Map to closest
      -- Keep everything else as-is
      else mod
    end
  )
  from unnest(modalities) as mod
  where mod is not null
),
updated_at = now()
where modalities is not null
  and array_length(modalities, 1) > 0
  and (
    -- Only update if changes needed
    'CBT' = any(modalities)
    or 'mindfulness-based therapy' = any(modalities)
    or 'culturally adapted therapy' = any(modalities)
    or 'solution-focused therapy' = any(modalities)
  );

-- Log modalities update
do $$
declare
  v_modalities_updated integer;
begin
  get diagnostics v_modalities_updated = row_count;
  raise notice 'Modalities cleaned in % profiles', v_modalities_updated;
end $$;

-- =====================================================
-- PART 4: POST-MIGRATION VALIDATION
-- =====================================================

do $$
declare
  v_unique_specialties_after text[];
  v_unique_modalities_after text[];
  v_invalid_specialties text[];
  v_invalid_modalities text[];
begin
  -- Get unique values after migration
  select array_agg(distinct spec) into v_unique_specialties_after
  from (
    select unnest(specialties) as spec
    from public.therapist_profiles
    where specialties is not null and array_length(specialties, 1) > 0
  ) s;

  select array_agg(distinct mod) into v_unique_modalities_after
  from (
    select unnest(modalities) as mod
    from public.therapist_profiles
    where modalities is not null and array_length(modalities, 1) > 0
  ) m;

  -- Check for any remaining non-standard values
  select array_agg(distinct spec) into v_invalid_specialties
  from (
    select unnest(specialties) as spec
    from public.therapist_profiles
    where specialties is not null and array_length(specialties, 1) > 0
  ) s
  where spec not in (
    select name from public.specialities  -- Note: table has typo in name
  );

  select array_agg(distinct mod) into v_invalid_modalities
  from (
    select unnest(modalities) as mod
    from public.therapist_profiles
    where modalities is not null and array_length(modalities, 1) > 0
  ) m
  where mod not in (
    select name from public.modalities
  );

  raise notice 'Post-migration validation:';
  raise notice '  Unique specialties after: %', array_length(v_unique_specialties_after, 1);
  raise notice '  Unique modalities after: %', array_length(v_unique_modalities_after, 1);

  if v_invalid_specialties is not null and array_length(v_invalid_specialties, 1) > 0 then
    raise warning '  Invalid specialties remaining: %', v_invalid_specialties;
  else
    raise notice '  ✅ All specialties valid';
  end if;

  if v_invalid_modalities is not null and array_length(v_invalid_modalities, 1) > 0 then
    raise warning '  Invalid modalities remaining: %', v_invalid_modalities;
  else
    raise notice '  ✅ All modalities valid';
  end if;
end $$;

-- =====================================================
-- PART 5: ADD CONSTRAINTS (Optional - uncomment if desired)
-- =====================================================

-- Uncomment to add foreign key constraints to enforce taxonomy values
-- This would prevent future invalid values but might be too restrictive

-- create or replace function public.check_specialties_valid() returns trigger as $$
-- begin
--   if new.specialties is not null then
--     if exists (
--       select 1 from unnest(new.specialties) as spec
--       where spec not in (select name from public.specialities)
--     ) then
--       raise exception 'Invalid specialty value';
--     end if;
--   end if;
--   return new;
-- end;
-- $$ language plpgsql;

-- create trigger validate_specialties
-- before insert or update on public.therapist_profiles
-- for each row
-- execute function public.check_specialties_valid();

-- =====================================================
-- PART 6: VERIFICATION QUERIES
-- =====================================================

-- Run these manually after migration to verify results

-- Check specialties distribution
select spec, count(*) as count
from (
  select unnest(specialties) as spec
  from public.therapist_profiles
  where specialties is not null
) s
group by spec
order by count desc;

-- Check modalities distribution
select mod, count(*) as count
from (
  select unnest(modalities) as mod
  from public.therapist_profiles
  where modalities is not null
) m
group by mod
order by count desc;

-- Check for therapists with empty arrays after cleaning
select user_id, name, specialties, modalities
from public.therapist_profiles
where (specialties = '{}' or modalities = '{}')
  and (specialties is not null or modalities is not null);

-- Final success message
do $$
begin
  raise notice '✅ Duplicate cleaning migration complete';
end $$;