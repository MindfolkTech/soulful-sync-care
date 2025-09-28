# Legacy Onboarding Archive

**Archived Date:** 2025-09-28
**Replaced By:** V2 QuickStart + Contextual Onboarding System
**Branch:** feature/matching-system-v2

## Why Archived

- V2 onboarding system is complete and production-ready
- Legacy files created confusion and maintenance burden
- Pre-launch cleanup for better codebase maintainability
- Multiple duplicate components with different patterns

## What Was Archived

### Legacy Onboarding Pages (7 files)
- `Welcome.tsx` - V1 welcome page (replaced by QuickStart)
- `Credentials.tsx` - Credentials collection (replaced by QuickStart step 1)
- `Policies.tsx` - Policy setup (moved to contextual onboarding)
- `Profile.tsx` - Profile setup (replaced by QuickStart steps 2-5)
- `Approach.tsx` - Communication styles (HAD WRONG FORMAT - no "&")
- `Video.tsx` - Video upload (VideoUpload component extracted)
- `Verification.tsx` - **KEPT ACTIVE** (still used in routes)

### Practice Pages (4 files)
- `Profile.tsx` - Duplicate of workspace profile page
- `Credentials.tsx` - Duplicate of workspace credentials
- `Services.tsx` - Duplicate of workspace services
- `Policies.tsx` - Duplicate of workspace policies

### Legacy Monoliths (2 files)
- `Onboarding.tsx` - 693-line monolithic component
- `Setup.tsx` - Legacy setup flow

### Storybook Files
- `TherapistOnboarding.stories.tsx` - Storybook file for legacy components

## What Replaced Them

### V2 QuickStart System
- **File:** `/src/pages/therapist/QuickStart.tsx`
- **Features:** 5-step streamlined onboarding
- **Data:** Correct communication styles with "&" format
- **Integration:** Works with contextual onboarding system

### Contextual Onboarding System
- **Location:** `/src/components/therapist/onboarding/`
- **Features:** Smart tooltips, profile strength tracking, quick action cards
- **Database:** Uses `onboarding_state` JSONB column

## Components Extracted Before Archival

- ✅ **VideoUpload** - Moved to `/src/components/therapist/VideoUpload.tsx`
- ✅ **OnboardingLayout** - Already in `/src/components/therapist/layout/`
- ✅ **SetupProgressPill** - Already in `/src/components/therapist/setup/`

## Database Changes

**Columns Preserved:**
- `setup_steps` (JSONB) - Legacy data preserved
- `setup_completed` (boolean) - Still used for routing
- `onboarding_state` (JSONB) - V2 contextual onboarding tracking
- `profile_strength` (integer) - Profile completion calculation

**No columns removed** - safe for rollback

## Rollback Instructions

If V2 onboarding fails and rollback is needed:

1. **Restore Files:**
   ```bash
   # Move files back to original locations
   git mv archive/legacy-onboarding/pages/onboarding/* src/pages/therapist/onboarding/
   git mv archive/legacy-onboarding/pages/practice/* src/pages/therapist/practice/
   git mv archive/legacy-onboarding/pages/Onboarding.tsx src/pages/therapist/
   git mv archive/legacy-onboarding/pages/Setup.tsx src/pages/therapist/
   ```

2. **Restore OnboardingRouter:**
   ```tsx
   // Restore feature flag logic
   import { shouldUseV2Onboarding } from '@/utils/featureFlags';
   import OnboardingWelcome from '../therapist/onboarding/Welcome';

   const useV2 = shouldUseV2Onboarding(therapistProfile);
   return useV2 ? <TherapistQuickStart /> : <OnboardingWelcome />;
   ```

3. **Restore App.tsx routes:**
   - Uncomment legacy imports
   - Restore legacy route definitions
   - Remove redirect routes

4. **Update Feature Flags:**
   ```sql
   UPDATE therapist_profiles
   SET feature_flags = jsonb_set(
     COALESCE(feature_flags, '{}'),
     '{v2_onboarding}',
     'false'
   );
   ```

## Testing After Archive

- [x] V2 QuickStart flow works end-to-end
- [x] Redirects work for legacy URLs
- [x] TypeScript compilation passes
- [x] Development server runs without errors
- [x] Contextual onboarding integrates properly

## Future Cleanup (Post-Launch)

After 1 month of successful V2 usage:
- Permanently delete archived files
- Remove feature flag system
- Clean up database columns (`setup_steps`, `setup_completed`)
- Final bundle optimization

---

**Contact:** If questions about this archive, reference git history or Phase 4 implementation documentation.