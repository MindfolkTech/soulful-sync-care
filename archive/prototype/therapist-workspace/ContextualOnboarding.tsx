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
  // Availability setup - first step in workspace
  {
    id: 'availability-hours',
    page: '/prototype/workspace/schedule?tab=availability',
    targetSelector: '[data-onboarding="availability-hours"]',
    title: '📅 Add Your Weekly Hours',
    content: 'Add at least 10 hours of availability per week. Peak demand is Tuesday-Thursday, 6-8pm.',
    position: 'bottom' as const,
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
  {
    id: 'calendar-integration',
    page: '/prototype/workspace/schedule',
    targetSelector: '[data-onboarding="calendar-integration-button"]',
    title: '🔗 Connect Your Calendar',
    content: 'Sync with Google or Outlook to avoid double bookings, or skip this for now.',
    position: 'top' as const,
    action: {
      type: 'click' as const,
      label: 'Calendar connected',
      validation: () => {
        const connected = localStorage.getItem('therapist_calendar_connected');
        const skipped = localStorage.getItem('therapist_calendar_skipped');
        return connected === 'true' || skipped === 'true';
      }
    },
    highlightTarget: true,
    showSkip: true
  },
  {
    id: 'buffer-settings',
    page: '/prototype/workspace/schedule?tab=availability',
    targetSelector: '[data-onboarding="buffer-settings"]',
    title: '⏰ Set Buffer Time',
    content: 'Add automatic buffer time between appointments for notes and preparation.',
    position: 'right' as const,
    action: {
      type: 'select' as const,
      label: 'Buffer set',
      validation: () => {
        const buffer = localStorage.getItem('therapist_buffer_time');
        return buffer && parseInt(buffer) > 0;
      }
    },
    highlightTarget: true
  },
  {
    id: 'auto-accept',
    page: '/prototype/workspace/schedule?tab=availability',
    targetSelector: '[data-onboarding="auto-accept-settings"]',
    title: '🤖 Auto-Accept Rules',
    content: 'Set how much notice you need for new bookings. We\'ll auto-accept bookings that meet your requirements.',
    position: 'left' as const,
    action: {
      type: 'select' as const,
      label: 'Rules set',
      validation: () => {
        const rules = localStorage.getItem('therapist_auto_accept_rules');
        return rules !== null;
      }
    },
    highlightTarget: true
  },
  {
    id: 'cancellation-agreement',
    page: '/prototype/workspace/schedule?tab=availability',
    targetSelector: '[data-onboarding="cancellation-agreement"]',
    title: '📋 Cancellation Agreement',
    content: 'Please agree to our cancellation policy to maintain service quality.',
    position: 'bottom' as const,
    action: {
      type: 'click' as const,
      label: 'Agreement signed',
      validation: () => {
        const agreed = localStorage.getItem('therapist_cancellation_agreed');
        return agreed === 'true';
      }
    },
    highlightTarget: true
  },
  
  // Profile setup steps
  {
    id: 'profile-intro',
    page: '/prototype/workspace/profile',
    targetSelector: '[data-onboarding="profile-intro"]',
    title: '👤 Your Client-Facing Profile',
    content: 'This is where you can edit the client-facing aspects of your practice.',
    position: 'top' as const,
    action: {
      type: 'custom' as const,
      label: 'Continue'
    },
    highlightTarget: true
  },
  {
    id: 'session-rates',
    page: '/prototype/workspace/profile',
    targetSelector: '[data-onboarding="session-rates"]',
    title: '💰 Set Your Rates',
    content: 'Let\'s start by setting some rates. Based on your experience, we suggest £80-120 per session.',
    position: 'bottom' as const,
    action: {
      type: 'input' as const,
      label: 'Rate set',
      validation: () => {
        const input = document.querySelector('[data-onboarding="session-rates"] input') as HTMLInputElement;
        return input && input.value && parseInt(input.value) > 0;
      }
    },
    highlightTarget: true
  },
  {
    id: 'cancellation-policies',
    page: '/prototype/workspace/profile',
    targetSelector: '[data-onboarding="cancellation-policies"]',
    title: '📋 Review Your Policies',
    content: 'Now let\'s have a look at your policies. You can change these now, later, or leave the default.',
    position: 'right' as const,
    action: {
      type: 'custom' as const,
      label: 'Policies reviewed'
    },
    highlightTarget: true
  },
  {
    id: 'profile-photo',
    page: '/prototype/workspace/profile',
    targetSelector: '[data-onboarding="profile-photo"]',
    title: '📸 Upload Professional Photo',
    content: 'Please upload a professional picture. You can upload multiple if you\'d like.',
    position: 'left' as const,
    action: {
      type: 'upload' as const,
      label: 'Photo uploaded',
      validation: () => {
        const photos = localStorage.getItem('therapist_profile_photos');
        return photos && JSON.parse(photos).length > 0;
      }
    },
    highlightTarget: true
  },
  {
    id: 'intro-video',
    page: '/prototype/workspace/profile',
    targetSelector: '[data-onboarding="intro-video"]',
    title: '🎥 Introduction Video',
    content: 'We strongly recommend all therapists create an introductory video. Upload now, or later if preferred.',
    position: 'bottom' as const,
    action: {
      type: 'upload' as const,
      label: 'Continue'
    },
    showSkip: true,
    highlightTarget: true
  },
  
  // Client management introduction
  {
    id: 'clients-overview',
    page: '/prototype/workspace/clients',
    targetSelector: '[data-onboarding="clients-overview"]',
    title: '👥 Client Management',
    content: 'This is where you will manage your clients, view session notes, and track progress.',
    position: 'center' as const,
    action: {
      type: 'custom' as const,
      label: 'Got it'
    },
    highlightTarget: true
  },
  
  // Tasks system introduction
  {
    id: 'tasks-overview',
    page: '/prototype/workspace/tasks',
    targetSelector: '[data-onboarding="tasks-list"]',
    title: '✅ Your Tasks',
    content: 'This is where your tasks will live. Certain tasks will be added here automatically.',
    position: 'top' as const,
    action: {
      type: 'custom' as const,
      label: 'Continue'
    },
    highlightTarget: true
  },
  {
    id: 'add-task',
    page: '/prototype/workspace/tasks',
    targetSelector: '[data-onboarding="add-task-button"]',
    title: '➕ Add a Task',
    content: 'You can also add tasks yourself by clicking here. Try adding a task.',
    position: 'bottom' as const,
    action: {
      type: 'click' as const,
      label: 'Task added',
      validation: () => {
        const tasks = localStorage.getItem('therapist_custom_tasks');
        return tasks && JSON.parse(tasks).length > 0;
      }
    },
    highlightTarget: true
  },
  {
    id: 'complete-task',
    page: '/prototype/workspace/tasks',
    targetSelector: '[data-onboarding="complete-task-button"]',
    title: '✅ Complete Task',
    content: 'Now try clicking complete.',
    position: 'right' as const,
    action: {
      type: 'click' as const,
      label: 'Task completed',
      validation: () => {
        const completedTasks = localStorage.getItem('therapist_completed_tasks');
        return completedTasks && JSON.parse(completedTasks).length > 0;
      }
    },
    highlightTarget: true
  },
  {
    id: 'undo-task',
    page: '/prototype/workspace/tasks',
    targetSelector: '[data-onboarding="undo-button"]',
    title: '↩️ Undo Action',
    content: 'If you complete a task by mistake, you can always click undo to bring it back - easy!',
    position: 'left' as const,
    action: {
      type: 'click' as const,
      label: 'Understood'
    },
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
    // Update profile strength based on V2 plan
    const strengthIncrease = currentStepIndex < 5 ? 3 : // Availability steps (5 steps = 15%)
                            currentStepIndex < 10 ? 3 : // Profile steps (5 steps = 15%)  
                            currentStepIndex < 11 ? 5 : // Client intro (1 step = 5%)
                            currentStepIndex < 15 ? 1.25 : 20; // Tasks intro (4 steps = 5%) or Video (20%)
    
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
