# Pre-Migration Checks for Format Standardisation Migration

**Migration File:** `20250930120000_standardise_communication_format_to_ampersand.sql`
**Rollback File:** `20250930120000_standardise_communication_format_to_ampersand_rollback.sql`
**Author:** Foundation Agent
**Date:** 2025-09-30

## Overview

This migration resolves format inconsistencies between client assessments (using "and") and therapist profiles (using "&") that are breaking the personality tag matching algorithm. It standardises on "&" format to align with existing enum types and trigger function expectations.

---

## Pre-Migration Checks (Run These Before Migration)

### 1. Verify Current Data State

```sql
-- Check current format distribution
SELECT
  'client_assessments' as table_name,
  'communication_preferences' as column_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM unnest(communication_preferences) cp WHERE cp LIKE '% & %'
  )) as with_ampersand,
  COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM unnest(communication_preferences) cp WHERE cp LIKE '% and %'
  )) as with_and
FROM client_assessments
WHERE communication_preferences IS NOT NULL AND array_length(communication_preferences, 1) > 0

UNION ALL

SELECT
  'therapist_profiles' as table_name,
  'communication_style' as column_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE communication_style LIKE '% & %') as with_ampersand,
  COUNT(*) FILTER (WHERE communication_style LIKE '% and %') as with_and
FROM therapist_profiles
WHERE communication_style IS NOT NULL

UNION ALL

SELECT
  'therapist_profiles' as table_name,
  'session_format' as column_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE session_format LIKE '% & %') as with_ampersand,
  COUNT(*) FILTER (WHERE session_format LIKE '% and %') as with_and
FROM therapist_profiles
WHERE session_format IS NOT NULL;
```

**Expected Current State:**
- client_assessments: ~44-51 with "and", 0 with "&"
- therapist communication_style: 10 with "&", ~5 with "and" (mixed)
- therapist session_format: 10 with "&", ~7 with "and" (mixed)

### 2. Verify Enum Types Exist

```sql
-- Check existing enum types
SELECT
  t.typname as enum_name,
  e.enumlabel as enum_value,
  e.enumsortorder
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
WHERE t.typname IN ('communication_style_enum', 'session_format_enum')
ORDER BY t.typname, e.enumsortorder;
```

**Expected Output:**
- communication_style_enum values should include:
  - 'Supportive & Relational'
  - 'Motivational & Encouraging'
  - 'Pragmatic & Problem-solving'
  - 'Flexible & Adaptive'

- session_format_enum values should include:
  - 'Structured & Goal-oriented'
  - 'Exploratory & Insight-based'
  - 'Interactive & Dynamic'
  - 'Calm & Process-Focused'

### 3. Verify Trigger Function Exists

```sql
-- Check generate_personality_tags function
SELECT
  pg_get_functiondef(oid) as function_definition
FROM pg_proc
WHERE proname = 'generate_personality_tags';
```

**Expected:** Function should exist and contain LIKE patterns with "&" format (e.g., `'Supportive & Relational%'`)

### 4. Check for Existing Constraints

```sql
-- Check for existing check constraints on target columns
SELECT
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'therapist_profiles'::regclass
  AND contype = 'c'
  AND conname IN ('check_communication_style_format', 'check_session_format_format');
```

**Expected:** Should return 0 rows (constraints don't exist yet)

### 5. Verify No Active Transactions

```sql
-- Check for long-running transactions that might conflict
SELECT
  pid,
  state,
  query_start,
  state_change,
  query
FROM pg_stat_activity
WHERE datname = current_database()
  AND state = 'active'
  AND query NOT LIKE '%pg_stat_activity%'
  AND query_start < NOW() - INTERVAL '5 minutes';
```

**Expected:** Should return 0 rows (no long-running transactions)

### 6. Verify Table Sizes (Performance Assessment)

```sql
-- Check table sizes to assess migration impact
SELECT
  schemaname,
  relname as table_name,
  n_live_tup as estimated_rows,
  pg_size_pretty(pg_total_relation_size(relid)) as total_size
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND relname IN ('therapist_profiles', 'client_assessments')
ORDER BY n_live_tup DESC;
```

**Expected:**
- client_assessments: ~51 rows, ~144 kB
- therapist_profiles: ~12 rows, ~448 kB

---

## Migration Execution Checklist

- [ ] All pre-migration checks completed successfully
- [ ] Confirmed enum types exist with "&" format
- [ ] Confirmed trigger function exists and expects "&" format
- [ ] Verified no existing check constraints that might conflict
- [ ] Reviewed current data format distribution
- [ ] Confirmed no long-running transactions active
- [ ] Backup taken (Supabase automatically handles this)
- [ ] Ready to execute forward migration

---

## Post-Migration Validation Queries

Run these after the migration to confirm success:

### 1. Verify Format Standardisation

```sql
-- Should show all records now use "&" format
SELECT
  'client_assessments' as table_name,
  'communication_preferences' as column_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM unnest(communication_preferences) cp WHERE cp LIKE '% & %'
  )) as with_ampersand,
  COUNT(*) FILTER (WHERE EXISTS (
    SELECT 1 FROM unnest(communication_preferences) cp WHERE cp LIKE '% and %'
  )) as with_and
FROM client_assessments
WHERE communication_preferences IS NOT NULL AND array_length(communication_preferences, 1) > 0

UNION ALL

SELECT
  'therapist_profiles' as table_name,
  'communication_style' as column_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE communication_style LIKE '% & %') as with_ampersand,
  COUNT(*) FILTER (WHERE communication_style LIKE '% and %') as with_and
FROM therapist_profiles
WHERE communication_style IS NOT NULL

UNION ALL

SELECT
  'therapist_profiles' as table_name,
  'session_format' as column_name,
  COUNT(*) as total_records,
  COUNT(*) FILTER (WHERE session_format LIKE '% & %') as with_ampersand,
  COUNT(*) FILTER (WHERE session_format LIKE '% and %') as with_and
FROM therapist_profiles
WHERE session_format IS NOT NULL;
```

**Expected After Migration:**
- All records should show with_ampersand > 0 and with_and = 0

### 2. Verify Constraints Added

```sql
-- Check constraints were successfully added
SELECT
  conname as constraint_name,
  pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint
WHERE conrelid = 'therapist_profiles'::regclass
  AND contype = 'c'
  AND conname IN ('check_communication_style_format', 'check_session_format_format');
```

**Expected:** Should return 2 rows with constraint definitions

### 3. Verify Personality Tags Regenerated

```sql
-- Check personality tags were updated
SELECT
  user_id,
  communication_style,
  session_format,
  personality_tags,
  updated_at
FROM therapist_profiles
WHERE communication_style IS NOT NULL OR session_format IS NOT NULL
ORDER BY updated_at DESC
LIMIT 5;
```

**Expected:** `updated_at` should show recent timestamps, `personality_tags` should contain relevant tags

### 4. Sample Data Inspection

```sql
-- Inspect sample records to verify format
SELECT
  communication_preferences
FROM client_assessments
WHERE communication_preferences IS NOT NULL
  AND array_length(communication_preferences, 1) > 0
LIMIT 5;

SELECT
  communication_style,
  session_format,
  personality_tags
FROM therapist_profiles
WHERE communication_style IS NOT NULL
LIMIT 5;
```

**Expected:** All values should use "&" format (e.g., "Structured & Goal-oriented")

---

## Rollback Instructions

If issues arise after migration:

1. **Immediate Rollback:**
   ```sql
   -- Execute the rollback migration file
   \i 20250930120000_standardise_communication_format_to_ampersand_rollback.sql
   ```

2. **Verify Rollback:**
   - Run post-migration validation queries
   - Confirm "and" format restored
   - Confirm constraints removed

3. **Report Issues:**
   - Document what went wrong
   - Provide error messages
   - Note any data inconsistencies observed

---

## Risk Assessment

### Low Risk
- Small dataset (51 client assessments, 12 therapist profiles)
- No indexes affected
- Migration is idempotent (can be re-run safely)
- Rollback available and tested

### Medium Risk
- Format mismatch could affect active matching queries during migration
- Personality tag regeneration could have brief performance impact

### Mitigation
- Migration runs in single transaction (atomic)
- Fast execution expected (<1 second)
- TypeScript code already handles both formats gracefully
- Constraints prevent future format drift

---

## Expected Execution Time

- **Forward Migration:** <1 second (63 rows affected)
- **Rollback Migration:** <1 second (63 rows affected)

---

## Success Criteria

✅ All client_assessments.communication_preferences use "&" format
✅ All therapist_profiles.communication_style use "&" format
✅ All therapist_profiles.session_format use "&" format
✅ Check constraints added successfully
✅ Personality tags regenerated correctly
✅ No "and" format remains in data
✅ No errors in Supabase logs
