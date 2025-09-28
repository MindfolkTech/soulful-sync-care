export interface OnboardingStep {
  id: string;
  page: string;
  targetSelector: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'center';
  action?: {
    type: 'click' | 'input' | 'select' | 'custom' | 'upload';
    validation?: () => boolean | Promise<boolean>;
    label?: string;
    errorMessage?: string;
  };
  showSkip?: boolean;
  highlightTarget?: boolean;
  instruction?: string;
  helpText?: string;
  profileStrengthBoost?: number; // How much this step increases profile strength
}

// Production onboarding steps - targeting actual workspace pages
export const ONBOARDING_STEPS: OnboardingStep[] = [
  // Schedule/Availability Setup (15% total - 3% per step)
  {
    id: 'availability-hours',
    page: '/t/schedule',
    targetSelector: '[data-onboarding="availability-hours"]',
    title: '📅 Set Your Weekly Availability',
    content: 'Add at least 10 hours of availability per week. Peak booking times are Tuesday-Thursday, 6-8pm.',
    position: 'bottom',
    action: {
      type: 'custom',
      label: 'Hours set',
      validation: async () => {
        // Check if therapist has set availability hours
        const hoursInputs = document.querySelectorAll('[data-onboarding="availability-hours"] input[type="checkbox"]:checked');
        return hoursInputs.length >= 10; // At least 10 hour slots
      },
      errorMessage: 'Please select at least 10 hours of availability per week'
    },
    highlightTarget: true,
    instruction: 'Click on time slots to add your availability. You need at least 10 hours total.',
    profileStrengthBoost: 3
  },
  {
    id: 'calendar-integration',
    page: '/t/schedule',
    targetSelector: '[data-onboarding="calendar-integration-button"]',
    title: '🔗 Connect Your Calendar (Optional)',
    content: 'Sync with Google or Outlook to avoid double bookings. You can skip this for now and set it up later.',
    position: 'top',
    action: {
      type: 'click',
      label: 'Calendar connected'
    },
    highlightTarget: true,
    showSkip: true,
    helpText: 'Calendar integration prevents double bookings but is optional',
    profileStrengthBoost: 3
  },
  {
    id: 'buffer-settings',
    page: '/t/schedule',
    targetSelector: '[data-onboarding="buffer-settings"]',
    title: '⏰ Set Buffer Time',
    content: 'Add buffer time between appointments for notes and preparation. We recommend 15-30 minutes.',
    position: 'right',
    action: {
      type: 'select',
      label: 'Buffer set',
      validation: async () => {
        const bufferSelect = document.querySelector('[data-onboarding="buffer-settings"] select') as HTMLSelectElement;
        return bufferSelect && bufferSelect.value !== '';
      },
      errorMessage: 'Please select a buffer time between sessions'
    },
    highlightTarget: true,
    profileStrengthBoost: 3
  },
  {
    id: 'auto-accept-settings',
    page: '/t/schedule',
    targetSelector: '[data-onboarding="auto-accept-settings"]',
    title: '🤖 Auto-Accept Rules',
    content: 'Set how much notice you need for new bookings. We\'ll automatically accept bookings that meet your requirements.',
    position: 'left',
    action: {
      type: 'select',
      label: 'Rules set',
      validation: async () => {
        const noticeSelect = document.querySelector('[data-onboarding="auto-accept-settings"] select') as HTMLSelectElement;
        return noticeSelect && noticeSelect.value !== '';
      },
      errorMessage: 'Please set your minimum notice period for bookings'
    },
    highlightTarget: true,
    profileStrengthBoost: 3
  },
  {
    id: 'cancellation-agreement',
    page: '/t/schedule',
    targetSelector: '[data-onboarding="cancellation-agreement"]',
    title: '📋 Cancellation Agreement',
    content: 'Please review and agree to our cancellation policy to maintain service quality for all users.',
    position: 'bottom',
    action: {
      type: 'click',
      label: 'Agreement signed',
      validation: async () => {
        const checkbox = document.querySelector('[data-onboarding="cancellation-agreement"] input[type="checkbox"]') as HTMLInputElement;
        return checkbox && checkbox.checked;
      },
      errorMessage: 'Please check the box to agree to the cancellation policy'
    },
    highlightTarget: true,
    profileStrengthBoost: 3
  },

  // Profile Setup (15% total - 3% per step)
  {
    id: 'profile-intro',
    page: '/t/profile',
    targetSelector: '[data-onboarding="profile-intro"]',
    title: '👤 Your Client-Facing Profile',
    content: 'This is where you can edit all client-facing aspects of your practice. Let\'s complete the key sections.',
    position: 'top',
    action: {
      type: 'custom',
      label: 'Continue'
    },
    highlightTarget: true,
    profileStrengthBoost: 3
  },
  {
    id: 'session-rates',
    page: '/t/profile',
    targetSelector: '[data-onboarding="session-rates"]',
    title: '💰 Set Your Session Rates',
    content: 'Set your rates for different session types. Based on your experience, we suggest £80-120 per session.',
    position: 'bottom',
    action: {
      type: 'input',
      label: 'Rates set',
      validation: async () => {
        const rateInputs = document.querySelectorAll('[data-onboarding="session-rates"] input[type="number"]');
        return Array.from(rateInputs).some((input) => {
          const value = (input as HTMLInputElement).value;
          return value && parseFloat(value) > 0;
        });
      },
      errorMessage: 'Please set at least one session rate greater than £0'
    },
    highlightTarget: true,
    instruction: 'Enter your rate for individual sessions. You can add more session types later.',
    profileStrengthBoost: 3
  },
  {
    id: 'profile-photo',
    page: '/t/profile',
    targetSelector: '[data-onboarding="profile-photo"]',
    title: '📸 Upload Professional Photo',
    content: 'Upload a professional headshot. This helps clients feel more comfortable booking with you.',
    position: 'left',
    action: {
      type: 'upload',
      label: 'Photo uploaded',
      validation: async () => {
        const uploadedImages = document.querySelectorAll('[data-onboarding="profile-photo"] img:not([src*="placeholder"])');
        return uploadedImages.length > 0;
      },
      errorMessage: 'Please upload at least one professional photo'
    },
    highlightTarget: true,
    helpText: 'Professional photos increase booking rates by 60%',
    profileStrengthBoost: 3
  },
  {
    id: 'cancellation-policies',
    page: '/t/profile',
    targetSelector: '[data-onboarding="cancellation-policies"]',
    title: '📋 Review Your Policies',
    content: 'Review and customize your cancellation and no-show policies. You can use our defaults or customize them.',
    position: 'right',
    action: {
      type: 'custom',
      label: 'Policies reviewed'
    },
    highlightTarget: true,
    profileStrengthBoost: 3
  },
  {
    id: 'intro-video',
    page: '/t/profile',
    targetSelector: '[data-onboarding="intro-video"]',
    title: '🎥 Introduction Video (Optional)',
    content: 'We strongly recommend creating a brief intro video. It significantly increases client booking rates.',
    position: 'bottom',
    action: {
      type: 'upload',
      label: 'Video uploaded',
      validation: async () => {
        const videoElement = document.querySelector('[data-onboarding="intro-video"] video');
        return videoElement !== null;
      }
    },
    showSkip: true,
    highlightTarget: true,
    helpText: 'Videos increase booking rates by 3x, but you can add this later',
    profileStrengthBoost: 3
  },

  // Client Management Introduction (5% total)
  {
    id: 'clients-overview',
    page: '/t/clients',
    targetSelector: '[data-onboarding="clients-overview"]',
    title: '👥 Client Management Hub',
    content: 'This is your client management center. Here you\'ll view client profiles, session notes, and track progress.',
    position: 'center',
    action: {
      type: 'custom',
      label: 'Got it'
    },
    highlightTarget: true,
    profileStrengthBoost: 5
  },

  // Task Management (5% total - 1.25% per step)
  {
    id: 'tasks-overview',
    page: '/t/dashboard',
    targetSelector: '[data-onboarding="tasks-list"]',
    title: '✅ Your Task Dashboard',
    content: 'Important tasks and reminders appear here. Some tasks are added automatically based on your client activity.',
    position: 'top',
    action: {
      type: 'custom',
      label: 'Continue'
    },
    highlightTarget: true,
    profileStrengthBoost: 1.25
  },
  {
    id: 'add-task',
    page: '/t/dashboard',
    targetSelector: '[data-onboarding="add-task-button"]',
    title: '➕ Add a Personal Task',
    content: 'Try adding a task to your list. You can add reminders, follow-ups, or any practice-related tasks.',
    position: 'bottom',
    action: {
      type: 'click',
      label: 'Task added',
      validation: async () => {
        // Check if a new task was added (this would need to be implemented based on the actual task system)
        const taskItems = document.querySelectorAll('[data-onboarding="tasks-list"] .task-item');
        return taskItems.length > 0;
      },
      errorMessage: 'Please add a task to continue'
    },
    highlightTarget: true,
    profileStrengthBoost: 1.25
  },
  {
    id: 'complete-task',
    page: '/t/dashboard',
    targetSelector: '[data-onboarding="complete-task-button"]',
    title: '✅ Complete a Task',
    content: 'Now try marking a task as complete. Click the checkmark next to any task.',
    position: 'right',
    action: {
      type: 'click',
      label: 'Task completed',
      validation: async () => {
        const completedTasks = document.querySelectorAll('[data-onboarding="tasks-list"] .task-item.completed');
        return completedTasks.length > 0;
      },
      errorMessage: 'Please complete a task by clicking its checkmark'
    },
    highlightTarget: true,
    profileStrengthBoost: 1.25
  },
  {
    id: 'undo-task',
    page: '/t/dashboard',
    targetSelector: '[data-onboarding="undo-button"]',
    title: '↩️ Undo Actions',
    content: 'If you complete a task by mistake, you can always undo it. Try clicking undo on a completed task.',
    position: 'left',
    action: {
      type: 'click',
      label: 'Understood'
    },
    highlightTarget: true,
    helpText: 'Most actions in the workspace can be undone if needed',
    profileStrengthBoost: 1.25
  }
];

// Helper functions for step management
export function getStepById(stepId: string): OnboardingStep | undefined {
  return ONBOARDING_STEPS.find(step => step.id === stepId);
}

export function getStepsForPage(page: string): OnboardingStep[] {
  return ONBOARDING_STEPS.filter(step => step.page === page);
}

export function calculateProfileStrengthIncrease(completedSteps: string[]): number {
  return ONBOARDING_STEPS
    .filter(step => completedSteps.includes(step.id))
    .reduce((total, step) => total + (step.profileStrengthBoost || 0), 0);
}

export function getNextIncompleteStep(completedSteps: string[], skippedSteps: string[] = []): OnboardingStep | undefined {
  return ONBOARDING_STEPS.find(step =>
    !completedSteps.includes(step.id) && !skippedSteps.includes(step.id)
  );
}

export function isOnboardingComplete(completedSteps: string[]): boolean {
  const requiredSteps = ONBOARDING_STEPS.filter(step => !step.showSkip);
  const completedRequiredSteps = requiredSteps.filter(step => completedSteps.includes(step.id));
  return completedRequiredSteps.length >= requiredSteps.length * 0.8; // 80% of required steps
}