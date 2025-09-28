# Function Cleanup Migration - Verification & Testing Guide
**Migration:** `20250928_cleanup_duplicate_functions.sql`
**Rollback:** `rollback_20250928_cleanup_duplicate_functions.sql`
**Author:** MindFolk Foundation Agent (Collaborative)
**Date:** 2025-09-28

## ⚠️ CRITICAL BEFORE RUNNING MIGRATION

### Pre-Migration Safety Checks

1. **Verify Current App State**
   ```sql
   -- Check if app-critical functions exist with expected signatures
   SELECT
       proname,
       pronargs,
       pg_get_function_arguments(oid) as arguments
   FROM pg_proc
   WHERE proname IN (
       'update_onboarding_progress',
       'generate_personality_tags',
       'log_impersonation_event'
   );
   ```
   **Expected Results:**
   - `update_onboarding_progress` with 3 args: `p_user_id uuid, p_step_id text, p_action text`
   - `generate_personality_tags` with 0 args (trigger function)
   - `log_impersonation_event` with 2 args: `target_user_id uuid, event_type text`

2. **Test Critical App Functions BEFORE Migration**
   ```sql
   -- Test onboarding function (should work)
   SELECT update_onboarding_progress(
       'some-test-uuid'::uuid,
       'test-step',
       'start'
   );

   -- Test trigger function exists
   SELECT EXISTS(
       SELECT 1 FROM pg_trigger t
       JOIN pg_proc p ON t.tgfoid = p.oid
       WHERE p.proname = 'generate_personality_tags'
       AND t.tgname = 'update_personality_tags'
   ) as trigger_exists;
   ```

3. **Check Current Function Count (Should Be > 1 for duplicates)**
   ```sql
   SELECT
       proname,
       COUNT(*) as duplicate_count
   FROM pg_proc
   WHERE proname IN (
       'calculate_profile_strength',
       'update_onboarding_progress',
       'generate_personality_tags',
       'log_impersonation_event'
   )
   GROUP BY proname
   ORDER BY proname;
   ```

## 🚀 RUNNING THE MIGRATION

### Step 1: Backup Verification
Ensure backup file exists: `backup_function_definitions_20250928.sql`

### Step 2: Execute Migration
Run in Supabase SQL Editor:
```sql
-- File: 20250928_cleanup_duplicate_functions.sql
-- (Copy and paste entire contents)
```

### Step 3: Immediate Post-Migration Verification
The migration includes built-in verification. Look for this output:
```
NOTICE: Function cleanup completed successfully - all validations passed
```

If you see any EXCEPTION messages, **IMMEDIATELY RUN ROLLBACK**.

## ✅ POST-MIGRATION TESTING

### 1. Function Count Verification
```sql
-- Should show exactly 1 of each function
SELECT
    proname as "Function Name",
    COUNT(*) as "Count (should be 1)"
FROM pg_proc
WHERE proname IN (
    'calculate_profile_strength',
    'update_onboarding_progress',
    'generate_personality_tags',
    'log_impersonation_event',
    'log_impersonation_end'
)
GROUP BY proname
ORDER BY proname;
```

### 2. Search Path Security Verification
```sql
-- All functions should have search_path = public
SELECT
    proname as "Function Name",
    pronargs as "Arg Count",
    CASE WHEN proconfig IS NOT NULL AND proconfig::text LIKE '%search_path%'
         THEN 'YES' ELSE 'NO' END as "Has Search Path"
FROM pg_proc
WHERE proname IN (
    'calculate_profile_strength',
    'update_onboarding_progress',
    'generate_personality_tags',
    'log_impersonation_event',
    'log_impersonation_end'
)
ORDER BY proname;
```
**Expected:** All should show "YES" for "Has Search Path"

### 3. Critical App Function Testing
```sql
-- Test onboarding progress function (APP CRITICAL)
SELECT update_onboarding_progress(
    'test-user-id'::uuid,
    'test-step-id',
    'complete'
) IS NOT NULL as onboarding_function_works;

-- Test trigger function still works
SELECT EXISTS(
    SELECT 1 FROM pg_trigger t
    JOIN pg_proc p ON t.tgfoid = p.oid
    WHERE p.proname = 'generate_personality_tags'
    AND t.tgname = 'update_personality_tags'
) as personality_trigger_works;

-- Test profile strength calculation
SELECT calculate_profile_strength(
    p_license_number := 'TEST123',
    p_bio := 'This is a test bio that is longer than 50 characters to meet the requirements.',
    p_specialties := ARRAY['Anxiety', 'Depression']
) >= 40 as profile_strength_works;
```

### 4. Application Integration Testing

**Frontend Tests to Run:**
1. **Therapist Onboarding:**
   - Navigate to `/therapist/quickstart`
   - Complete a step in the onboarding flow
   - Verify step completion saves correctly

2. **Profile Strength Indicator:**
   - Edit therapist profile fields
   - Verify profile strength updates automatically
   - Check ProfileStrengthIndicator component shows correct percentage

3. **Admin Panel (if applicable):**
   - Test user impersonation logging
   - Verify impersonation events are recorded in audit_trail

## 🚨 ROLLBACK PROCEDURE

### If ANY Test Fails:

1. **Immediate Rollback:**
   ```sql
   -- Run the complete rollback file
   -- File: rollback_20250928_cleanup_duplicate_functions.sql
   ```

2. **Post-Rollback Verification:**
   ```sql
   -- Verify functions are restored
   SELECT proname, COUNT(*) as function_count
   FROM pg_proc
   WHERE proname IN (
       'calculate_profile_strength',
       'update_onboarding_progress',
       'generate_personality_tags',
       'log_impersonation_event'
   )
   GROUP BY proname;
   ```

3. **Test Original App Functions:**
   - Re-run all application integration tests
   - Verify onboarding flow works
   - Check admin panel functionality

## 📋 SUCCESS CRITERIA

✅ **Migration is successful if:**
- All 5 functions exist with exactly 1 version each
- All functions have `SET search_path = public`
- Onboarding progress function works with app signature
- Personality tags trigger still functions
- Profile strength calculation returns valid results
- No application errors in frontend testing

❌ **Migration failed if:**
- Any function has duplicate versions
- Any function missing search_path configuration
- App functions throw errors or return unexpected results
- Frontend onboarding flow breaks
- Trigger functions stop working

## 🔍 MONITORING POST-MIGRATION

After successful migration, monitor for:
- Application errors in logs
- Supabase function execution errors
- Therapist onboarding completion rates
- Profile strength calculation accuracy

## 📞 SUPPORT INFORMATION

**Created by:** MindFolk Foundation Agent collaboration
**Reviewed by:** Therapist Onboarding Agent + Postgres Migration Reviewer
**App Dependencies:** QuickStart.tsx, ContextualOnboarding.tsx, Users.tsx (admin)
**Database Dependencies:** update_personality_tags trigger, audit_trail table

**Critical Preservation Notes:**
- `update_onboarding_progress(p_user_id, p_step_id, p_action)` - USED BY APP
- `generate_personality_tags()` trigger function - USED BY TRIGGER
- `log_impersonation_event(target_user_id, event_type)` - USED BY ADMIN PANEL