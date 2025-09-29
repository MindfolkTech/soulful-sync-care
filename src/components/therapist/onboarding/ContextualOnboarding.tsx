import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OnboardingTooltip } from './OnboardingTooltip';
import { OnboardingOverlay } from './OnboardingOverlay';
import { ONBOARDING_STEPS, OnboardingStep } from './steps';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Target, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface OnboardingState {
  completed_steps: string[];
  skipped_steps: string[];
  current_step?: string;
  contextual_onboarding_started?: boolean;
  contextual_onboarding_deferred?: boolean;
  last_step_completed_at?: string;
  deferred_at?: string;
}

interface ContextualOnboardingProps {
  onComplete?: () => void;
  autoStart?: boolean;
  minimumProfileStrength?: number;
  forceStart?: boolean; // Allow manual restart of deferred onboarding
}

export function ContextualOnboarding({
  onComplete,
  autoStart = true,
  minimumProfileStrength = 70,
  forceStart = false
}: ContextualOnboardingProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [profileStrength, setProfileStrength] = useState(40);
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    completed_steps: [],
    skipped_steps: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load onboarding state from database
  const loadOnboardingState = useCallback(async () => {
    if (!user?.id) return;

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
        setError('Failed to load onboarding progress');
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
        const isComplete = state.completed_steps?.length >= ONBOARDING_STEPS.length * 0.8; // 80% completion threshold
        const profileNeedsWork = (data.profile_strength || 0) < minimumProfileStrength;
        const wasDeferred = state.contextual_onboarding_deferred === true;

        // Start onboarding if:
        // 1. Profile needs work and not complete and wasn't deferred (normal autoStart)
        // 2. OR forceStart is true (manual restart)
        const shouldStart = (autoStart && profileNeedsWork && !isComplete && !wasDeferred) ||
                           (forceStart && profileNeedsWork && !isComplete);

        if (shouldStart) {
          setIsActive(true);
          // Find current step based on completed steps
          const nextStepIndex = ONBOARDING_STEPS.findIndex(step =>
            !state.completed_steps?.includes(step.id) &&
            !state.skipped_steps?.includes(step.id)
          );
          setCurrentStepIndex(Math.max(0, nextStepIndex));
        }
      }
    } catch (err) {
      console.error('Unexpected error loading onboarding state:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, autoStart, minimumProfileStrength]);

  // Update onboarding progress in database
  const updateOnboardingProgress = useCallback(async (stepId: string, action: 'complete' | 'skip' | 'start') => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase.rpc('update_onboarding_progress', {
        p_user_id: user.id,
        p_step_id: stepId,
        p_action: action
      });

      if (error) {
        console.error('Error updating onboarding progress:', error);
        setError('Failed to save progress');
        return;
      }

      if (data) {
        setOnboardingState(data);
        // Update profile strength based on completion
        const completionRatio = (data.completed_steps?.length || 0) / ONBOARDING_STEPS.length;
        const strengthIncrease = Math.floor(completionRatio * 30); // Up to 30% from contextual onboarding
        setProfileStrength(prev => Math.min(100, 40 + strengthIncrease)); // Start from 40% (quick start)
      }
    } catch (err) {
      console.error('Unexpected error updating progress:', err);
      setError('Failed to save progress');
    }
  }, [user?.id]);

  // Load state on mount and user change
  useEffect(() => {
    loadOnboardingState();
  }, [loadOnboardingState]);

  // Navigate to the correct page for current step
  useEffect(() => {
    if (!isActive || showWelcomeModal || isLoading) return;

    const currentStep = ONBOARDING_STEPS[currentStepIndex];
    if (currentStep && location.pathname !== currentStep.page) {
      navigate(currentStep.page);
    }
  }, [currentStepIndex, isActive, showWelcomeModal, isLoading, location.pathname, navigate]);

  // Function to restart onboarding (clears deferred state)
  const restartOnboarding = useCallback(async () => {
    if (!user?.id) return;

    try {
      // Clear deferred state by starting onboarding
      await updateOnboardingProgress('welcome', 'start');
      setIsActive(true);
      setShowWelcomeModal(true);
      setCurrentStepIndex(0);
    } catch (err) {
      console.error('Error restarting onboarding:', err);
      setError('Failed to restart onboarding');
    }
  }, [user?.id, updateOnboardingProgress]);

  const handleStartOnboarding = async () => {
    const firstStep = ONBOARDING_STEPS[0];
    if (firstStep) {
      await updateOnboardingProgress(firstStep.id, 'start');
    }
    setShowWelcomeModal(false);
    navigate(firstStep.page);
  };

  const handleNext = async () => {
    const currentStep = ONBOARDING_STEPS[currentStepIndex];
    if (currentStep) {
      await updateOnboardingProgress(currentStep.id, 'complete');
    }

    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const nextStep = ONBOARDING_STEPS[nextIndex];

      // Navigate to next page if different
      if (nextStep.page !== currentStep.page) {
        navigate(nextStep.page);
      }

      setCurrentStepIndex(nextIndex);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      const prevStep = ONBOARDING_STEPS[prevIndex];
      const currentStep = ONBOARDING_STEPS[currentStepIndex];

      // Navigate to previous page if different
      if (prevStep.page !== currentStep.page) {
        navigate(prevStep.page);
      }

      setCurrentStepIndex(prevIndex);
    }
  };

  const handleSkip = async () => {
    const currentStep = ONBOARDING_STEPS[currentStepIndex];
    if (currentStep) {
      await updateOnboardingProgress(currentStep.id, 'skip');
    }

    if (currentStepIndex === ONBOARDING_STEPS.length - 1) {
      handleComplete();
    } else {
      handleNext();
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    if (onComplete) onComplete();
    showCompletionModal();
  };

  const showCompletionModal = () => {
    // Create completion celebration modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 md:p-8 max-w-md w-full text-center">
        <div class="text-6xl mb-4">🎊</div>
        <h2 class="text-2xl font-bold mb-2">Workspace Setup Complete!</h2>
        <p class="text-gray-600 mb-2">Your profile is ${profileStrength}% complete</p>
        <div class="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div class="bg-green-600 h-3 rounded-full transition-all" style="width: ${profileStrength}%"></div>
        </div>
        <p class="text-sm text-gray-500 mb-6">
          ${profileStrength >= minimumProfileStrength
            ? 'You can now start accepting new clients!'
            : 'Complete more profile sections to start accepting clients'
          }
        </p>
        <button class="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
          Continue to Dashboard
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('button')?.addEventListener('click', () => {
      document.body.removeChild(modal);
      navigate('/therapist/dashboard');
    });
  };

  // Error state
  if (error) {
    return (
      <div className="fixed top-4 right-4 z-[10000]">
        <Card className="p-4 border-red-200 bg-red-50">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto hover:bg-red-100 rounded p-1"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return null;
  }

  if (!isActive) return null;

  // Show welcome modal first
  if (showWelcomeModal) {
    return (
      <>
        <OnboardingOverlay />
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
          <Card className="max-w-lg w-full p-6 md:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--jovial-jade))]/10 mb-4">
                <Sparkles className="h-8 w-8 text-[hsl(var(--jovial-jade))]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Complete Your Workspace Setup</h2>
              <p className="text-[hsl(var(--text-muted))]">
                Let's finish setting up your profile with a quick guided tour
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--garden-green))] flex-shrink-0" />
                <span>Set your availability and rates</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--garden-green))] flex-shrink-0" />
                <span>Upload professional photos and videos</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--garden-green))] flex-shrink-0" />
                <span>Learn about client and task management</span>
              </div>
            </div>

            <div className="bg-[hsl(var(--surface-accent))] rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Current Profile Strength</span>
                <span className="text-sm font-bold text-[hsl(var(--garden-green))]">{profileStrength}%</span>
              </div>
              <Progress value={profileStrength} className="h-2" />
              <p className="text-xs text-[hsl(var(--text-muted))] mt-2">
                Reach {minimumProfileStrength}% to start accepting clients
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={async () => {
                  // Save deferred state to database
                  await updateOnboardingProgress('welcome', 'defer');
                  setIsActive(false);
                  setShowWelcomeModal(false);
                }}
              >
                I'll do this later
              </Button>
              <Button
                className="flex-1 bg-[hsl(var(--jovial-jade))] hover:bg-[hsl(var(--jovial-jade))]/90"
                onClick={handleStartOnboarding}
              >
                Start Guided Tour
                <Target className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </>
    );
  }

  // Show contextual tooltips for current step
  const currentStep = ONBOARDING_STEPS[currentStepIndex];

  if (currentStep && location.pathname === currentStep.page) {
    return (
      <>
        <OnboardingOverlay targetSelector={currentStep.targetSelector} />
        <OnboardingTooltip
          steps={ONBOARDING_STEPS}
          currentStepIndex={currentStepIndex}
          onNext={handleNext}
          onPrev={currentStepIndex > 0 ? handlePrev : undefined}
          onSkip={currentStep.showSkip ? handleSkip : undefined}
          onComplete={handleComplete}
          onboardingState={onboardingState}
        />
      </>
    );
  }

  return null;
}

// Export the component as default and named export
export default ContextualOnboarding;

// Hook to access onboarding restart functionality
export function useOnboardingRestart() {
  const { user } = useAuth();

  const restart = useCallback(async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase.rpc('update_onboarding_progress', {
        p_user_id: user.id,
        p_step_id: 'welcome',
        p_action: 'start'
      });

      if (error) {
        console.error('Error restarting onboarding:', error);
        throw new Error('Failed to restart onboarding');
      }

      // Reload the page to trigger onboarding
      window.location.reload();
    } catch (err) {
      console.error('Unexpected error restarting onboarding:', err);
      throw err;
    }
  }, [user?.id]);

  return { restartOnboarding: restart };
}