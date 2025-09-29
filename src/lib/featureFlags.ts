// Feature flag utilities for V2 onboarding and other features
// Integrates with Supabase feature_flags JSONB column

export interface FeatureFlags {
  v2_onboarding: boolean;
  contextual_onboarding: boolean;
  new_matching_algorithm: boolean;
  enhanced_profile_strength: boolean;
  [key: string]: boolean;
}

// Default feature flags - conservative rollout
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  v2_onboarding: false, // Start with 0% rollout for safety
  contextual_onboarding: false,
  new_matching_algorithm: true, // Already deployed and working
  enhanced_profile_strength: true, // Already deployed and working
};

// Global feature flags (affects all users)
export const GLOBAL_FEATURE_FLAGS: Partial<FeatureFlags> = {
  v2_onboarding: true, // Enable V2 onboarding for testing Phase 3
  contextual_onboarding: true,
};

/**
 * Check if a feature flag is enabled for a user
 * @param userFlags - User's feature_flags from therapist_profiles table
 * @param flagName - Name of the feature flag to check
 * @returns boolean indicating if feature is enabled
 */
export function isFeatureEnabled(
  userFlags: Record<string, boolean> | null | undefined,
  flagName: keyof FeatureFlags
): boolean {
  // Check global flags first (highest priority)
  if (GLOBAL_FEATURE_FLAGS[flagName] !== undefined) {
    return GLOBAL_FEATURE_FLAGS[flagName]!;
  }

  // Check user-specific flags
  if (userFlags && userFlags[flagName] !== undefined) {
    return userFlags[flagName];
  }

  // Fall back to default
  return DEFAULT_FEATURE_FLAGS[flagName];
}

/**
 * Get all effective feature flags for a user
 * @param userFlags - User's feature_flags from database
 * @returns Complete feature flags object with all values resolved
 */
export function getUserFeatureFlags(
  userFlags: Record<string, boolean> | null | undefined
): FeatureFlags {
  const result = { ...DEFAULT_FEATURE_FLAGS };

  // Apply user-specific flags
  if (userFlags) {
    Object.assign(result, userFlags);
  }

  // Apply global overrides
  Object.assign(result, GLOBAL_FEATURE_FLAGS);

  return result;
}

/**
 * Check if V2 onboarding should be used for a therapist
 * @param therapistProfile - Therapist profile with feature_flags
 * @returns boolean indicating if V2 onboarding should be used
 */
export function shouldUseV2Onboarding(
  therapistProfile?: { feature_flags?: Record<string, boolean> } | null
): boolean {
  return isFeatureEnabled(therapistProfile?.feature_flags, 'v2_onboarding');
}

/**
 * Update feature flags for a therapist in the database
 * @param userId - Therapist user ID
 * @param flags - Partial feature flags to update
 */
export async function updateTherapistFeatureFlags(
  userId: string,
  flags: Partial<FeatureFlags>
): Promise<void> {
  const { supabase } = await import('@/integrations/supabase/client');

  // Get current flags
  const { data: currentProfile } = await supabase
    .from('therapist_profiles')
    .select('feature_flags')
    .eq('user_id', userId)
    .single();

  const currentFlags = currentProfile?.feature_flags || {};
  const updatedFlags = { ...currentFlags, ...flags };

  await supabase
    .from('therapist_profiles')
    .update({ feature_flags: updatedFlags })
    .eq('user_id', userId);
}