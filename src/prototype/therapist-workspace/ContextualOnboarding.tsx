import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OnboardingTooltip } from './OnboardingTooltip';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Target, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the onboarding steps with contextual tooltips
const ONBOARDING_STEPS = [
  // Profile page steps
  {
    id: 'specialties',
    page: '/prototype/workspace/profile',
    targetSelector: '[data-onboarding="specialties"]',
    title: '🎯 Add Your Specialties',
    content: 'Select at least 3 areas where you have the most experience. This helps match you with the right clients.',
    position: 'bottom' as const,
    action: {
      type: 'select' as const,
      label: 'I\'ve added specialties',
      validation: () => {
        // Check if specialties have been selected
        const specialties = document.querySelectorAll('[data-onboarding="specialties"] .selected');
        return specialties.length >= 3;
      }
    },
    highlightTarget: true
  },
  {
    id: 'identity',
    page: '/prototype/workspace/profile', 
    targetSelector: '[data-onboarding="identity-tags"]',
    title: '🏳️‍🌈 Select Identity Tags',
    content: 'Choose tags that reflect your values and help clients find therapists who understand their experience.',
    position: 'right' as const,
    action: {
      type: 'select' as const,
      label: 'Tags selected',
      validation: () => {
        const tags = document.querySelectorAll('[data-onboarding="identity-tags"] .selected');
        return tags.length > 0;
      }
    },
    highlightTarget: true
  },
  
  // Settings page steps
  {
    id: 'rates',
    page: '/prototype/workspace/settings',
    targetSelector: '[data-onboarding="session-rate"]',
    title: '💰 Set Your Session Rate',
    content: 'Based on your experience, we suggest £80-120 per session. You can always adjust this later.',
    position: 'bottom' as const,
    action: {
      type: 'input' as const,
      label: 'Rate set',
      validation: () => {
        const input = document.querySelector('[data-onboarding="session-rate"] input') as HTMLInputElement;
        return input && input.value && parseInt(input.value) > 0;
      }
    },
    highlightTarget: true
  },
  
  // Business page steps
  {
    id: 'availability',
    page: '/prototype/workspace/business',
    targetSelector: '[data-onboarding="availability-calendar"]',
    title: '📅 Add Your Availability',
    content: 'Click on the calendar to add your available hours. Peak demand is Tuesday-Thursday, 6-8pm.',
    position: 'top' as const,
    action: {
      type: 'click' as const,
      label: 'Hours added',
      validation: () => {
        const hours = localStorage.getItem('therapist_availability_hours');
        return hours && parseInt(hours) >= 10;
      }
    },
    highlightTarget: true
  },
  
  // Back to profile for optional video
  {
    id: 'video',
    page: '/prototype/workspace/profile',
    targetSelector: '[data-onboarding="video-upload"]',
    title: '🎥 Record Your Introduction (Optional)',
    content: 'Profiles with video get 2.3x more client inquiries. You can skip this for now and add it later.',
    position: 'bottom' as const,
    action: {
      type: 'custom' as const,
      label: 'Continue'
    },
    showSkip: true,
    highlightTarget: true
  }
];

interface ContextualOnboardingProps {
  onComplete?: () => void;
}

export function ContextualOnboarding({ onComplete }: ContextualOnboardingProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [profileStrength, setProfileStrength] = useState(30);

  // Check if onboarding should be active
  useEffect(() => {
    const isComplete = localStorage.getItem('therapistOnboardingComplete');
    const quickStartComplete = localStorage.getItem('therapistQuickStartComplete');
    
    if (quickStartComplete && !isComplete) {
      setIsActive(true);
    }
  }, []);

  // Navigate to the correct page for current step
  useEffect(() => {
    if (!isActive || showWelcomeModal) return;
    
    const currentStep = ONBOARDING_STEPS[currentStepIndex];
    if (currentStep && location.pathname !== currentStep.page) {
      navigate(currentStep.page);
    }
  }, [currentStepIndex, isActive, showWelcomeModal, location.pathname, navigate]);

  const handleStartOnboarding = () => {
    setShowWelcomeModal(false);
    // Navigate to first step's page
    navigate(ONBOARDING_STEPS[0].page);
  };

  const handleNext = () => {
    // Update profile strength
    const strengthIncrease = currentStepIndex === 0 ? 10 : // Specialties
                            currentStepIndex === 1 ? 10 : // Identity
                            currentStepIndex === 2 ? 10 : // Rates
                            currentStepIndex === 3 ? 10 : // Availability
                            currentStepIndex === 4 ? 20 : 5; // Video
    
    setProfileStrength(prev => Math.min(100, prev + strengthIncrease));
    
    if (currentStepIndex < ONBOARDING_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const nextStep = ONBOARDING_STEPS[nextIndex];
      const currentStep = ONBOARDING_STEPS[currentStepIndex];
      
      // Navigate to next page if different
      if (nextStep.page !== currentStep.page) {
        navigate(nextStep.page);
      }
      
      // Update step index after navigation
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

  const handleSkip = () => {
    // Skip to next step or complete if on last step
    if (currentStepIndex === ONBOARDING_STEPS.length - 1) {
      handleComplete();
    } else {
      handleNext();
    }
  };

  const handleComplete = () => {
    setIsActive(false);
    localStorage.setItem('therapistOnboardingComplete', 'true');
    localStorage.setItem('profileStrength', profileStrength.toString());
    if (onComplete) onComplete();
    showCompletionModal();
  };

  const showCompletionModal = () => {
    // Show completion celebration
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[10001] flex items-center justify-center bg-black/50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 md:p-8 max-w-md w-full text-center">
        <div class="text-6xl mb-4">🎊</div>
        <h2 class="text-2xl font-bold mb-2">Setup Complete!</h2>
        <p class="text-gray-600 mb-2">Your profile is ${profileStrength}% complete</p>
        <div class="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div class="bg-green-600 h-3 rounded-full transition-all" style="width: ${profileStrength}%"></div>
        </div>
        <p class="text-sm text-gray-500 mb-6">
          You can always update your profile from the settings menu
        </p>
        <button class="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
          Go to Dashboard
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('button')?.addEventListener('click', () => {
      document.body.removeChild(modal);
      navigate('/prototype/workspace/dashboard');
    });
  };

  if (!isActive) return null;

  // Show welcome modal first
  if (showWelcomeModal) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
        <Card className="max-w-lg w-full p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[hsl(var(--jovial-jade))]/10 mb-4">
              <Sparkles className="h-8 w-8 text-[hsl(var(--jovial-jade))]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Your Workspace! 🎉</h2>
            <p className="text-[hsl(var(--text-muted))]">
              Let's complete your profile setup with a quick guided tour
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[hsl(var(--garden-green))] flex-shrink-0" />
              <span>Add your specialties and expertise</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[hsl(var(--garden-green))] flex-shrink-0" />
              <span>Set your rates and availability</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[hsl(var(--garden-green))] flex-shrink-0" />
              <span>Complete your profile for better matching</span>
            </div>
          </div>

          <div className="bg-[hsl(var(--surface-accent))] rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Current Profile Strength</span>
              <span className="text-sm font-bold text-[hsl(var(--garden-green))]">{profileStrength}%</span>
            </div>
            <Progress value={profileStrength} className="h-2" />
            <p className="text-xs text-[hsl(var(--text-muted))] mt-2">
              Complete the tour to reach 70% and start accepting clients
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
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
    );
  }

  // Show contextual tooltips for current step
  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const stepsForCurrentPage = ONBOARDING_STEPS.filter(s => s.page === location.pathname);
  const currentPageStepIndex = stepsForCurrentPage.findIndex(s => s.id === currentStep?.id);

  if (currentStep && location.pathname === currentStep.page) {
    return (
      <OnboardingTooltip
        steps={ONBOARDING_STEPS}
        currentStepIndex={currentStepIndex}
        onNext={handleNext}
        onPrev={currentStepIndex > 0 ? handlePrev : undefined}
        onSkip={currentStep.showSkip ? handleSkip : undefined}
        onComplete={handleComplete}
      />
    );
  }

  return null;
}
