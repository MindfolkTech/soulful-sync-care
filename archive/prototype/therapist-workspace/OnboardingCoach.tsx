import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { X, ChevronRight, Sparkles, Target, CheckCircle2, HelpCircle, Plus, Heart, DollarSign, Calendar, Video, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Identity tags from documentation (docs/matching-system/03-THERAPIST-SELECTIONS.md)
const IDENTITY_TAGS = [
  { id: 'lgbtq', label: 'LGBTQ+ friendly and affirming', icon: '🏳️‍🌈' },
  { id: 'neurodiversity', label: 'Neurodiversity affirming', icon: '🧩' },
  { id: 'trauma-informed', label: 'Trauma-informed and gentle', icon: '💚' },
  { id: 'culturally-sensitive', label: 'Culturally sensitive and aware', icon: '🌍' }
];

// Specialties from documentation (docs/matching-system/03-THERAPIST-SELECTIONS.md)
const SPECIALTY_OPTIONS = [
  // Mental Health
  { id: 'anxiety', label: 'Anxiety', category: 'Mental Health' },
  { id: 'depression', label: 'Depression', category: 'Mental Health' },
  { id: 'bipolar-disorder', label: 'Bipolar disorder', category: 'Mental Health' },
  { id: 'ocd', label: 'OCD', category: 'Mental Health' },
  { id: 'ptsd', label: 'PTSD', category: 'Mental Health' },
  { id: 'trauma-abuse', label: 'Trauma and abuse', category: 'Mental Health' },
  
  // Behavioral & Focus
  { id: 'anger-management', label: 'Anger management', category: 'Behavioral' },
  { id: 'adhd', label: 'Concentration, memory and focus (ADHD)', category: 'Behavioral' },
  { id: 'addictions', label: 'Coping with addictions', category: 'Behavioral' },
  { id: 'eating-disorders', label: 'Eating disorders', category: 'Behavioral' },
  { id: 'phobias', label: 'Phobias', category: 'Behavioral' },
  
  // Relationships & Family
  { id: 'family-conflict', label: 'Family conflict', category: 'Relationships' },
  { id: 'relationship-issues', label: 'Relationship and intimacy issues', category: 'Relationships' },
  { id: 'parenting', label: 'Parenting issues', category: 'Relationships' },
  { id: 'bullying', label: 'Bullying', category: 'Relationships' },
  
  // Life & Career
  { id: 'career', label: 'Career difficulties', category: 'Life & Career' },
  { id: 'grief-loss', label: 'Grief and loss', category: 'Life & Career' },
  { id: 'motivation-esteem', label: 'Motivation and self-esteem', category: 'Life & Career' },
  { id: 'executive-coaching', label: 'Executive and Professional coaching', category: 'Life & Career' },
  
  // Identity & Health
  { id: 'lgbt', label: 'LGBT-related issues', category: 'Identity' },
  { id: 'race-identity', label: 'Race and racial identity', category: 'Identity' },
  { id: 'autism', label: 'Autism', category: 'Health' },
  { id: 'chronic-illness', label: 'Chronic illness', category: 'Health' },
  { id: 'tourettes', label: 'Tourettes syndrome', category: 'Health' }
];

// Onboarding steps mapped to existing pages
const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    path: '/prototype/workspace/dashboard',
    title: 'Welcome to Your Workspace! 🎉',
    description: 'Let\'s set up your practice in just 10 minutes. I\'ll guide you through everything you need to start accepting clients.',
    tasks: [
      'Complete your professional profile',
      'Set your rates and availability',
      'Get ready for your first client'
    ],
    reward: 'Go from 30% to 70% profile strength',
    nextPath: '/prototype/workspace/profile',
    buttonText: 'Start Setup',
    showProgress: false // Don't show step counter on welcome
  },
  {
    id: 'profile_specialties',
    path: '/prototype/workspace/profile',
    title: 'Add Your Specialties',
    description: 'Help clients find you by selecting the areas where you have the most experience and passion. This affects 20% of your client matching score.',
    targetElement: '[data-onboarding="specialties"]', // CSS selector
    position: 'bottom',
    tasks: [
      'Select at least 3 specialties',
      'Focus on your strongest areas',
      'Consider what clients search for'
    ],
    reward: '+20% match visibility',
    nextPath: '/prototype/workspace/profile',
    buttonText: 'I\'ve Added My Specialties',
    showSpecialtySelector: true // Special UI for this step
  },
  {
    id: 'profile_identity',
    path: '/prototype/workspace/profile',
    title: 'Identity & Culture',
    description: 'Help clients find therapists who understand their lived experience. This affects 20% of your client matching score.',
    targetElement: '[data-onboarding="identity-tags"]',
    position: 'right',
    tasks: [
      'Select tags that align with your values',
      'Show clients you understand their journey'
    ],
    reward: 'Connect with aligned clients',
    nextPath: '/prototype/workspace/settings',
    buttonText: 'Continue to Rates',
    showIdentitySelector: true
  },
  {
    id: 'rates',
    path: '/prototype/workspace/settings',
    title: 'Set Your Rates',
    description: 'Based on your experience, we suggest £80-120 per session. You can always adjust this later.',
    targetElement: '[data-onboarding="session-rates"]',
    position: 'top',
    tasks: [
      'Set your standard session rate',
      'Consider sliding scale options'
    ],
    reward: 'Earning potential: £3,000/month',
    nextPath: '/prototype/workspace/business',
    buttonText: 'Save Rates',
    showRatesSelector: true
  },
  {
    id: 'business',
    path: '/prototype/workspace/business',
    title: 'Set Your Availability',
    description: 'Add your available hours. Peak client demand is Tuesday-Thursday, 6-8pm.',
    targetElement: '[data-onboarding="calendar"]',
    position: 'center',
    tasks: [
      'Add at least 10 hours per week',
      'Block out unavailable times'
    ],
    reward: 'Ready for your first client!',
    nextPath: '/prototype/workspace/profile',
    buttonText: 'Save Availability',
    showAvailabilitySelector: true
  },
  {
    id: 'video',
    path: '/prototype/workspace/profile',
    title: 'Record Your Introduction',
    description: 'Profiles with video get 2.3x more inquiries',
    targetElement: '[data-onboarding="video-section"]',
    position: 'top',
    tasks: ['Record a 30-second intro'],
    reward: '🌟 All-Star Profile Status',
    isOptional: true,
    nextPath: '/prototype/workspace/dashboard'
  }
];

interface OnboardingCoachProps {
  onComplete?: () => void;
  initialStep?: number;
}

export function OnboardingCoach({ onComplete, initialStep = 0 }: OnboardingCoachProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [profileStrength, setProfileStrength] = useState(30); // Start at 30% from Quick Start
  
  // State for selections
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedIdentityTags, setSelectedIdentityTags] = useState<string[]>([]);
  const [sessionRate, setSessionRate] = useState<number>(90);
  const [slidingScale, setSlidingScale] = useState<boolean>(false);
  const [weeklyHours, setWeeklyHours] = useState<number>(0);

  const step = ONBOARDING_STEPS[currentStep];
  const progress = ((completedSteps.length + 1) / ONBOARDING_STEPS.length) * 100;

  // Update visibility based on current path
  useEffect(() => {
    const currentPath = location.pathname;
    const stepPath = step?.path;
    
    // Show coach if we're on the right page for current step
    if (stepPath && currentPath === stepPath) {
      setIsVisible(true);
      
      // Highlight target element if specified
      if (step.targetElement) {
        highlightElement(step.targetElement);
      }
    }
  }, [location, step]);

  const highlightElement = (selector: string) => {
    // Wait for element to be in DOM
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('onboarding-highlight');
        
        // Add pulsing animation
        element.classList.add('animate-pulse');
        setTimeout(() => {
          element.classList.remove('animate-pulse');
        }, 3000);
      }
    }, 500);
  };

  const handleNext = () => {
    console.log('HandleNext called', { currentStep, step });
    
    // Validate based on step
    if (step.id === 'profile_specialties' && selectedSpecialties.length < 3) {
      return; // Don't proceed if minimum specialties not selected
    }
    
    if (step.id === 'business' && weeklyHours < 10) {
      // Show warning but allow to proceed
      if (!window.confirm('We recommend at least 10 hours/week. Continue anyway?')) {
        return;
      }
    }
    
    // Mark current step as complete
    setCompletedSteps([...completedSteps, step.id]);
    
    // Save selections to localStorage
    if (step.id === 'profile_specialties') {
      localStorage.setItem('therapist_specialties', JSON.stringify(selectedSpecialties));
    }
    if (step.id === 'profile_identity') {
      localStorage.setItem('therapist_identity_tags', JSON.stringify(selectedIdentityTags));
    }
    if (step.id === 'rates') {
      localStorage.setItem('therapist_rates', JSON.stringify({ sessionRate, slidingScale }));
    }
    if (step.id === 'business') {
      localStorage.setItem('therapist_availability', JSON.stringify({ weeklyHours }));
    }
    
    // Update profile strength
    const strengthIncrease = step.id === 'profile_specialties' ? 10 : 
                            step.id === 'profile_identity' ? 10 :
                            step.id === 'rates' ? 10 :
                            step.id === 'business' ? 10 :
                            step.id === 'video' ? 20 : 5;
    setProfileStrength(Math.min(100, profileStrength + strengthIncrease));
    
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      const nextStep = ONBOARDING_STEPS[currentStep + 1];
      console.log('Navigating to next step', { nextStep, currentPath: step.path });
      setCurrentStep(currentStep + 1);
      
      // Navigate to next page if different
      if (nextStep.path !== step.path) {
        console.log('Navigating to:', nextStep.path);
        navigate(nextStep.path);
      }
    } else {
      // Onboarding complete!
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (step.isOptional) {
      handleNext();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('therapistOnboardingComplete', 'true');
    localStorage.setItem('profileStrength', profileStrength.toString());
    if (onComplete) onComplete();
    
    // Show celebration with tooltip guide
    showCelebrationWithGuide();
  };

  const showCelebrationWithGuide = () => {
    // Create celebration overlay with tooltip guide
    const celebration = document.createElement('div');
    celebration.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4';
    celebration.innerHTML = `
      <div class="bg-white rounded-lg p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="text-center mb-6">
          <div class="text-6xl mb-4">🎊</div>
          <h2 class="text-2xl font-bold mb-2">Congratulations!</h2>
          <p class="text-gray-600">Your profile is ${profileStrength}% complete and ready for clients!</p>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Where to edit your selections in your workspace:
          </h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-2">
              <span class="text-green-600">📝</span>
              <div>
                <strong>Communication & Session Style:</strong>
                <span class="text-gray-600"> Profile → About Me section</span>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-green-600">🎯</span>
              <div>
                <strong>Specialties:</strong>
                <span class="text-gray-600"> Profile → Professional Details → Specialties</span>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-green-600">🏳️‍🌈</span>
              <div>
                <strong>Identity Tags:</strong>
                <span class="text-gray-600"> Profile → Identity & Culture section</span>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-green-600">💰</span>
              <div>
                <strong>Session Rates:</strong>
                <span class="text-gray-600"> Settings → Pricing & Payments</span>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-green-600">📅</span>
              <div>
                <strong>Availability:</strong>
                <span class="text-gray-600"> Business → Schedule & Availability</span>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-green-600">🎥</span>
              <div>
                <strong>Introduction Video:</strong>
                <span class="text-gray-600"> Profile → Media section</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex gap-3 justify-center">
          <button class="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Review Profile
          </button>
          <button class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Go to Dashboard
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(celebration);
    
    // Add event listeners
    const buttons = celebration.querySelectorAll('button');
    buttons[0]?.addEventListener('click', () => {
      document.body.removeChild(celebration);
      navigate('/prototype/workspace/profile');
    });
    buttons[1]?.addEventListener('click', () => {
      document.body.removeChild(celebration);
      navigate('/prototype/workspace/dashboard');
    });
  };

  if (!isVisible || !step) return null;

  // Minimized view - floating pill
  if (isMinimized) {
    return (
      <div className={cn(
        "fixed z-40",
        // Mobile: centered at bottom
        "bottom-4 left-1/2 -translate-x-1/2",
        // Tablet and above: bottom right
        "md:left-auto md:translate-x-0 md:right-4"
      )}>
        <Button
          onClick={() => setIsMinimized(false)}
          className={cn(
            "rounded-full shadow-lg bg-[hsl(var(--garden-green))] text-white",
            "responsive-text-sm"
          )}
          size="lg"
        >
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 mr-2" />
          Profile {profileStrength}% Complete
        </Button>
      </div>
    );
  }

  // Full coach view - special styling for welcome step
  const isWelcomeStep = step.id === 'welcome';
  const isSpecialtyStep = step.id === 'profile_specialties';
  
  return (
    <div className={cn(
      "fixed z-40",
      // Mobile: Full width at bottom
      "bottom-0 left-0 right-0 w-full",
      // Tablet and above: Fixed position
      "md:bottom-4 md:right-4 md:left-auto",
      "md:max-w-md lg:max-w-lg",
      isWelcomeStep ? "md:w-[450px]" : 
      isSpecialtyStep ? "md:w-[500px]" : 
      "md:w-96"
    )}>
      <Card className={cn(
        "shadow-xl border-2",
        // Mobile: No rounded corners at bottom
        "rounded-t-xl rounded-b-none md:rounded-xl",
        // Mobile: Full height available
        "max-h-[80vh] md:max-h-[90vh] overflow-hidden",
        isWelcomeStep 
          ? "border-[hsl(var(--jovial-jade))] bg-gradient-to-br from-white to-[hsl(var(--surface-accent))]" 
          : "border-[hsl(var(--garden-green))]"
      )}>
        {/* Header */}
        <div className={cn(
          "p-4 border-b",
          isWelcomeStep
            ? "bg-gradient-to-r from-[hsl(var(--jovial-jade))]/20 to-[hsl(var(--garden-green))]/20"
            : "bg-gradient-to-r from-[hsl(var(--garden-green))]/10 to-[hsl(var(--jovial-jade))]/10"
        )}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className={cn(
                "h-5 w-5",
                isWelcomeStep ? "text-[hsl(var(--jovial-jade))]" : "text-[hsl(var(--garden-green))]"
              )} />
              <span className="font-semibold">
                {isWelcomeStep ? "Welcome to Mindfolk!" : "Setup Coach"}
              </span>
              {!isWelcomeStep && (
                <Badge variant="outline" className="text-xs">
                  Step {currentStep} of {ONBOARDING_STEPS.length - 1}
                </Badge>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4 rotate-90" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Progress bar - hidden on welcome */}
          {!isWelcomeStep && (
            <>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Profile Strength: {profileStrength}%
              </p>
            </>
          )}
        </div>
        
        {/* Content - Scrollable on mobile */}
        <div className={cn(
          "p-4 overflow-y-auto",
          "max-h-[60vh] md:max-h-[70vh]"
        )}>
          <h3 className={cn(
            "font-semibold mb-2 flex items-center gap-2",
            isWelcomeStep ? "responsive-text-xl" : "responsive-text-lg"
          )}>
            {!isWelcomeStep && step.reward && <Target className="h-5 w-5 text-[hsl(var(--success))]" />}
            {step.title}
          </h3>
          <p className={cn(
            "text-muted-foreground mb-3",
            isWelcomeStep ? "responsive-text-base" : "responsive-text-sm"
          )}>
            {step.description}
          </p>
          
          {/* Tasks */}
          {step.tasks.length > 0 && (
            <div className={cn(
              "mb-4",
              isWelcomeStep ? "bg-white/50 rounded-lg p-4" : "space-y-2"
            )}>
              {isWelcomeStep && (
                <h4 className="font-medium text-sm text-muted-foreground mb-3">What we'll do together:</h4>
              )}
              {step.tasks.map((task, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className={cn(
                    "mt-0.5",
                    isWelcomeStep 
                      ? "h-5 w-5 text-[hsl(var(--garden-green))]" 
                      : "h-4 w-4 text-muted-foreground"
                  )} />
                  <span className={isWelcomeStep ? "responsive-text-base" : "responsive-text-sm"}>{task}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Welcome Step Status Overview */}
          {isWelcomeStep && (
            <div className="bg-white/50 rounded-lg p-4 mb-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Profile Strength</span>
                <div className="flex items-center gap-2">
                  <Progress value={profileStrength} className="w-24 h-2" />
                  <span className="text-sm font-bold text-[hsl(var(--success))]">{profileStrength}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Estimated Time</span>
                <span className="text-sm text-muted-foreground">10-15 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Steps to Complete</span>
                <span className="text-sm text-muted-foreground">6 quick tasks</span>
              </div>
            </div>
          )}

          {/* Specialty Selector for Step 5 */}
          {step.showSpecialtySelector && (
            <div className="mb-4">
              <div className="bg-[hsl(var(--surface-accent))] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-secondary text-sm font-medium text-[hsl(var(--text-primary))]">
                    Select Your Specialties
                  </h4>
                  <span className={cn(
                    "text-xs font-medium",
                    selectedSpecialties.length >= 3 
                      ? "text-[hsl(var(--garden-green))]" 
                      : "text-[hsl(var(--text-muted))]"
                  )}>
                    {selectedSpecialties.length}/3 minimum
                  </span>
                </div>
                
                {/* Selected specialties */}
                {selectedSpecialties.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3 pb-3 border-b border-[hsl(var(--border))]">
                    {selectedSpecialties.map(id => {
                      const specialty = SPECIALTY_OPTIONS.find(s => s.id === id);
                      return (
                        <Badge 
                          key={id}
                          className="bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))] hover:bg-[hsl(var(--tag-specialty-bg))]/90 cursor-pointer"
                          onClick={() => setSelectedSpecialties(selectedSpecialties.filter(s => s !== id))}
                        >
                          {specialty?.label}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      );
                    })}
                  </div>
                )}
                
                {/* Available specialties */}
                <div className="max-h-32 md:max-h-48 overflow-y-auto space-y-2">
                  {['Mental Health', 'Behavioral', 'Relationships', 'Life & Career', 'Identity', 'Health'].map(category => {
                    const categoryOptions = SPECIALTY_OPTIONS.filter(s => s.category === category);
                    if (categoryOptions.length === 0) return null;
                    return (
                      <div key={category}>
                        <p className="text-xs font-medium text-[hsl(var(--text-muted))] mb-1">{category}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {categoryOptions.map(specialty => (
                            <button
                              key={specialty.id}
                              onClick={() => {
                                if (!selectedSpecialties.includes(specialty.id)) {
                                  setSelectedSpecialties([...selectedSpecialties, specialty.id]);
                                }
                              }}
                              disabled={selectedSpecialties.includes(specialty.id)}
                              className={cn(
                                "text-xs px-2 py-1 rounded-md transition-all",
                                selectedSpecialties.includes(specialty.id)
                                  ? "bg-[hsl(var(--tag-specialty-bg))]/50 text-[hsl(var(--tag-specialty-text))]/50 cursor-not-allowed"
                                  : "bg-white hover:bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--text-primary))] hover:text-[hsl(var(--tag-specialty-text))] border border-[hsl(var(--border))]"
                              )}
                            >
                              {specialty.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {selectedSpecialties.length < 3 && (
                  <p className="text-xs text-[hsl(var(--warning-text))] bg-[hsl(var(--warning-bg))] rounded-md p-2 mt-3">
                    Select at least 3 specialties to help clients find you
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Identity Tags Selector for Step 6 */}
          {step.showIdentitySelector && (
            <div className="mb-4">
              <div className="bg-[hsl(var(--surface-accent))] rounded-lg p-4">
                <h4 className="font-secondary text-sm font-medium text-[hsl(var(--text-primary))] mb-3">
                  Select Identity Tags
                </h4>
                <div className="space-y-3">
                  {IDENTITY_TAGS.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => {
                        if (selectedIdentityTags.includes(tag.id)) {
                          setSelectedIdentityTags(selectedIdentityTags.filter(t => t !== tag.id));
                        } else {
                          setSelectedIdentityTags([...selectedIdentityTags, tag.id]);
                        }
                      }}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border-2 transition-all",
                        selectedIdentityTags.includes(tag.id)
                          ? "border-[hsl(var(--jovial-jade))] bg-[hsl(var(--jovial-jade))]/10"
                          : "border-[hsl(var(--border))] hover:border-[hsl(var(--border-hover))]"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tag.icon}</span>
                        <span className={cn(
                          "flex-1",
                          selectedIdentityTags.includes(tag.id) ? "font-medium" : ""
                        )}>{tag.label}</span>
                        {selectedIdentityTags.includes(tag.id) && (
                          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--jovial-jade))]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Rates Selector for Step 7 */}
          {step.showRatesSelector && (
            <div className="mb-4">
              <div className="bg-[hsl(var(--surface-accent))] rounded-lg p-4">
                <h4 className="font-secondary text-sm font-medium text-[hsl(var(--text-primary))] mb-3">
                  Session Rates
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[hsl(var(--text-muted))] mb-2 block">
                      Standard session rate (50 minutes)
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">£</span>
                      <input
                        type="number"
                        value={sessionRate}
                        onChange={(e) => setSessionRate(Number(e.target.value))}
                        min="30"
                        max="300"
                        step="5"
                        className="flex-1 px-3 py-2 rounded-md border border-[hsl(var(--border))] bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--garden-green))]"
                      />
                      <span className="text-sm text-[hsl(var(--text-muted))]">per session</span>
                    </div>
                    <p className="text-xs text-[hsl(var(--text-muted))] mt-2">
                      Based on your experience, we suggest £80-120
                    </p>
                  </div>
                  
                  <div>
                    <button
                      onClick={() => setSlidingScale(!slidingScale)}
                      className="flex items-center gap-2"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded border-2",
                        slidingScale 
                          ? "bg-[hsl(var(--garden-green))] border-[hsl(var(--garden-green))]"
                          : "border-[hsl(var(--border))]"
                      )}>
                        {slidingScale && <CheckCircle2 className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-sm">Offer sliding scale rates</span>
                    </button>
                  </div>
                  
                  <div className="bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))] rounded-lg p-3">
                    <p className="text-sm font-medium">
                      💰 Potential monthly earnings: £{sessionRate * 40}
                    </p>
                    <p className="text-xs mt-1">Based on 40 sessions/month</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Availability Selector for Step 8 */}
          {step.showAvailabilitySelector && (
            <div className="mb-4">
              <div className="bg-[hsl(var(--surface-accent))] rounded-lg p-4">
                <h4 className="font-secondary text-sm font-medium text-[hsl(var(--text-primary))] mb-3">
                  Weekly Availability
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[hsl(var(--text-muted))] mb-2 block">
                      Hours available per week
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        value={weeklyHours}
                        onChange={(e) => setWeeklyHours(Number(e.target.value))}
                        min="0"
                        max="40"
                        step="1"
                        className="flex-1"
                      />
                      <span className="font-medium w-12 text-right">{weeklyHours}h</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-3 space-y-2">
                    <p className="text-xs font-medium text-[hsl(var(--text-muted))]">Peak demand times:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]">
                        Tue-Thu 6-8pm
                      </Badge>
                      <Badge className="bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]">
                        Weekday mornings
                      </Badge>
                      <Badge className="bg-[hsl(var(--tag-misc-bg))] text-[hsl(var(--tag-misc-text))]">
                        Saturday AM
                      </Badge>
                    </div>
                  </div>
                  
                  {weeklyHours < 10 && (
                    <p className="text-xs text-[hsl(var(--warning-text))] bg-[hsl(var(--warning-bg))] rounded-md p-2">
                      We recommend at least 10 hours/week for consistent client flow
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Reward */}
          {step.reward && (
            <div className={cn(
              "rounded-lg p-3 mb-4",
              isWelcomeStep 
                ? "bg-gradient-to-r from-[hsl(var(--success-bg))] to-[hsl(var(--jovial-jade))]/10 border border-[hsl(var(--success))]"
                : "bg-[hsl(var(--success-bg))] text-[hsl(var(--success-text))]"
            )}>
              <p className={cn(
                "font-medium",
                isWelcomeStep ? "text-base" : "text-sm"
              )}>
                {isWelcomeStep ? '🚀 Goal: ' : '🎁 Reward: '}{step.reward}
              </p>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <Button 
              onClick={handleNext}
              disabled={step.id === 'profile_specialties' && selectedSpecialties.length < 3}
              className={cn(
                "flex-1",
                "min-h-[44px]", // Touch target minimum
                isWelcomeStep 
                  ? "bg-[hsl(var(--jovial-jade))] hover:bg-[hsl(var(--jovial-jade))]/90 h-12 responsive-text-base"
                  : "bg-[hsl(var(--garden-green))] hover:bg-[hsl(var(--garden-green))]/90 responsive-text-sm",
                step.id === 'profile_specialties' && selectedSpecialties.length < 3 
                  ? "opacity-50 cursor-not-allowed" 
                  : ""
              )}
            >
              {step.id === 'profile_specialties' && selectedSpecialties.length < 3
                ? `Select ${3 - selectedSpecialties.length} more`
                : step.buttonText || 'Mark Complete'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
            {step.isOptional && (
              <Button variant="outline" onClick={handleSkip}>
                Skip for now
              </Button>
            )}
          </div>
        </div>
        
        {/* Help */}
        <div className="px-4 pb-3">
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <HelpCircle className="h-3 w-3" />
            Need help with this step?
          </button>
        </div>
      </Card>
    </div>
  );
}

// Add this CSS to your global styles
const coachStyles = `
  .onboarding-highlight {
    position: relative;
    z-index: 30;
    box-shadow: 0 0 0 3px hsl(var(--garden-green)), 0 0 20px hsl(var(--garden-green))/20;
    border-radius: 8px;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = coachStyles;
  document.head.appendChild(styleSheet);
}
