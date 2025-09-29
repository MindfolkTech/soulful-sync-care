import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { ONBOARDING_STEPS, getNextIncompleteStep, isOnboardingComplete, calculateProfileStrengthIncrease } from './steps';

interface OnboardingState {
  completed_steps: string[];
  skipped_steps: string[];
  current_step?: string;
  contextual_onboarding_started?: boolean;
  last_step_completed_at?: string;
}

interface UseContextualOnboardingOptions {
  autoStart?: boolean;
  minimumProfileStrength?: number;
  onComplete?: () => void;
  onStepComplete?: (stepId: string) => void;
  onError?: (error: string) => void;
}

interface UseContextualOnboardingReturn {
  // State
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
  onboardingState: OnboardingState;
  profileStrength: number;
  currentStep: typeof ONBOARDING_STEPS[0] | null;

  // Actions
  startOnboarding: () => Promise<void>;
  completeStep: (stepId: string) => Promise<void>;
  skipStep: (stepId: string) => Promise<void>;
  stopOnboarding: () => void;
  retryLoadState: () => Promise<void>;

  // Computed properties
  isOnboardingComplete: boolean;
  completionPercentage: number;
  nextStep: typeof ONBOARDING_STEPS[0] | null;
}

export function useContextualOnboarding(options: UseContextualOnboardingOptions = {}): UseContextualOnboardingReturn {
  const {
    autoStart = true,
    minimumProfileStrength = 70,
    onComplete,
    onStepComplete,
    onError
  } = options;

  const { user } = useAuth();

  // State
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    completed_steps: [],
    skipped_steps: []
  });
  const [profileStrength, setProfileStrength] = useState(40);

  // Load onboarding state from database
  const loadOnboardingState = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('therapist_profiles')
        .select('onboarding_state, profile_strength')
        .eq('user_id', user.id)
        .single();

      if (fetchError) {
        console.error('Error loading onboarding state:', fetchError);
        const errorMessage = 'Failed to load onboarding progress';
        setError(errorMessage);
        if (onError) onError(errorMessage);
        return;
      }

      if (data) {
        const state = data.onboarding_state || {
          completed_steps: [],
          skipped_steps: []
        };
        setOnboardingState(state);
        setProfileStrength(data.profile_strength || 40);

        // Check if onboarding should be active
        const isComplete = isOnboardingComplete(state.completed_steps || []);
        const profileNeedsWork = (data.profile_strength || 0) < minimumProfileStrength;

        if (autoStart && profileNeedsWork && !isComplete && !state.contextual_onboarding_started) {
          setIsActive(true);
        }
      }
    } catch (err) {
      console.error('Unexpected error loading onboarding state:', err);
      const errorMessage = 'An unexpected error occurred';
      setError(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, autoStart, minimumProfileStrength, onError]);

  // Update onboarding progress in database
  const updateOnboardingProgress = useCallback(async (stepId: string, action: 'complete' | 'skip' | 'start') => {
    if (!user?.id) return;

    try {
      setError(null);

      const { data, error } = await supabase.rpc('update_onboarding_progress', {
        p_user_id: user.id,
        p_step_id: stepId,
        p_action: action
      });

      if (error) {
        console.error('Error updating onboarding progress:', error);
        const errorMessage = 'Failed to save progress';
        setError(errorMessage);
        if (onError) onError(errorMessage);
        return false;
      }

      if (data) {
        setOnboardingState(data);

        // Update profile strength based on completion
        const strengthIncrease = calculateProfileStrengthIncrease(data.completed_steps || []);
        const newProfileStrength = Math.min(100, 40 + strengthIncrease); // Start from 40% (quick start)
        setProfileStrength(newProfileStrength);

        // Call step completion callback
        if (action === 'complete' && onStepComplete) {
          onStepComplete(stepId);
        }

        // Check if onboarding is complete
        if (isOnboardingComplete(data.completed_steps || [])) {
          setIsActive(false);
          if (onComplete) onComplete();
        }

        return true;
      }
    } catch (err) {
      console.error('Unexpected error updating progress:', err);
      const errorMessage = 'Failed to save progress';
      setError(errorMessage);
      if (onError) onError(errorMessage);
      return false;
    }

    return false;
  }, [user?.id, onStepComplete, onComplete, onError]);

  // Load state on mount and user change
  useEffect(() => {
    loadOnboardingState();
  }, [loadOnboardingState]);

  // Actions
  const startOnboarding = useCallback(async () => {
    const firstStep = ONBOARDING_STEPS[0];
    if (firstStep) {
      const success = await updateOnboardingProgress(firstStep.id, 'start');
      if (success) {
        setIsActive(true);
      }
    }
  }, [updateOnboardingProgress]);

  const completeStep = useCallback(async (stepId: string) => {
    await updateOnboardingProgress(stepId, 'complete');
  }, [updateOnboardingProgress]);

  const skipStep = useCallback(async (stepId: string) => {
    await updateOnboardingProgress(stepId, 'skip');
  }, [updateOnboardingProgress]);

  const stopOnboarding = useCallback(() => {
    setIsActive(false);
  }, []);

  const retryLoadState = useCallback(async () => {
    await loadOnboardingState();
  }, [loadOnboardingState]);

  // Computed properties
  const currentStep = getNextIncompleteStep(
    onboardingState.completed_steps || [],
    onboardingState.skipped_steps || []
  ) || null;

  const nextStep = currentStep;

  const completionPercentage = Math.round(
    ((onboardingState.completed_steps?.length || 0) / ONBOARDING_STEPS.length) * 100
  );

  const isOnboardingCompleteValue = isOnboardingComplete(onboardingState.completed_steps || []);

  return {
    // State
    isActive,
    isLoading,
    error,
    onboardingState,
    profileStrength,
    currentStep,

    // Actions
    startOnboarding,
    completeStep,
    skipStep,
    stopOnboarding,
    retryLoadState,

    // Computed properties
    isOnboardingComplete: isOnboardingCompleteValue,
    completionPercentage,
    nextStep
  };
}

// Context provider for sharing onboarding state across components
import React, { createContext, useContext } from 'react';

const OnboardingContext = createContext<UseContextualOnboardingReturn | null>(null);

interface OnboardingProviderProps {
  children: React.ReactNode;
  options?: UseContextualOnboardingOptions;
}

export function OnboardingProvider({ children, options }: OnboardingProviderProps) {
  const onboardingState = useContextualOnboarding(options);

  return (
    <OnboardingContext.Provider value={onboardingState}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext(): UseContextualOnboardingReturn {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
}

// Utility hooks for common use cases
export function useOnboardingStep(stepId: string) {
  const { onboardingState, completeStep, skipStep } = useOnboardingContext();

  const isCompleted = onboardingState.completed_steps?.includes(stepId) || false;
  const isSkipped = onboardingState.skipped_steps?.includes(stepId) || false;
  const isActive = !isCompleted && !isSkipped;

  return {
    isCompleted,
    isSkipped,
    isActive,
    complete: () => completeStep(stepId),
    skip: () => skipStep(stepId)
  };
}