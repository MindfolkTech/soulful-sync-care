import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle2, Heart, Target, Lightbulb, Users, Brain, Search, Zap, Leaf, Award, Sparkles, AlertCircle, Loader2, User, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getSpecialities, getModalities } from '@/data/taxonomy';
import { cn } from '@/lib/utils';
import { toDbFormat } from '@/lib/formatMapping';
import MindfolkLogo from '/images/Mindfolk logo primary text colour (300 x 80 px) (5).svg';
import { MarketingConsentModal } from '@/components/therapist/MarketingConsentModal';

// Communication styles - UI labels use "and", database values use "&"
const COMMUNICATION_STYLES = [
  {
    id: 'supportive',
    label: 'Supportive and Relational',
    description: 'I focus on creating safety, trust, and emotional validation',
    icon: Heart,
    color: 'text-[hsl(var(--jovial-jade))]',
    tags: ['supportive', 'empathetic', 'warm']
  },
  {
    id: 'motivational',
    label: 'Motivational and Encouraging',
    description: 'I focus on boosting morale, using encouragement and gentle challenge',
    icon: Target,
    color: 'text-[hsl(var(--garden-green))]',
    tags: ['motivational', 'encouraging', 'positive']
  },
  {
    id: 'pragmatic',
    label: 'Pragmatic and Problem-solving',
    description: 'I focus on offering clear, solution-oriented feedback with actionable takeaways',
    icon: Lightbulb,
    color: 'text-[hsl(var(--success-text))]',
    tags: ['pragmatic', 'solution-oriented', 'practical']
  },
  {
    id: 'flexible',
    label: 'Flexible and Adaptive',
    description: 'I am constantly shifting tone/style depending on the client\'s needs in the moment',
    icon: Users,
    color: 'text-[hsl(var(--warning-text))]',
    tags: ['flexible', 'adaptive', 'empathetic']
  }
];

// Session formats - UI labels use "and", database values use "&"
const SESSION_FORMATS = [
  {
    id: 'structured',
    label: 'Structured and Goal-oriented',
    description: 'Sessions follow a clear agenda with measurable progress markers',
    icon: Target,
    color: 'text-[hsl(var(--success-text))]',
    tags: ['structured', 'goal-oriented', 'focused']
  },
  {
    id: 'exploratory',
    label: 'Exploratory and Insight-based',
    description: 'Sessions unfold organically, focusing on deep reflection and meaning-making',
    icon: Search,
    color: 'text-[hsl(var(--jovial-jade))]',
    tags: ['exploratory', 'insight-based', 'reflective']
  },
  {
    id: 'interactive',
    label: 'Interactive and Dynamic',
    description: 'I switch it up with various techniques and exercises to keep energy high',
    icon: Zap,
    color: 'text-[hsl(var(--warning-text))]',
    tags: ['interactive', 'dynamic', 'engaging']
  },
  {
    id: 'calm',
    label: 'Calm and Process-Focused',
    description: 'My sessions emphasise pacing, safety, and careful exploration of feelings',
    icon: Leaf,
    color: 'text-[hsl(var(--garden-green))]',
    tags: ['calm', 'gentle']
  }
];

interface QuickStartData {
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  customTitle: string;
  registrationBody: string;
  customRegistrationBody: string;
  licenseNumber: string;
  yearsExperience: string;
  communicationStyle: string;
  sessionFormat: string;
  specialties: string[];
  modalities: string[];
}

export default function TherapistQuickStart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState('communication');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(false);
  const [formData, setFormData] = useState<QuickStartData>({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    customTitle: '',
    registrationBody: '',
    customRegistrationBody: '',
    licenseNumber: '',
    yearsExperience: '',
    communicationStyle: '',
    sessionFormat: '',
    specialties: [],
    modalities: []
  });

  const specialties = getSpecialities();
  const modalities = getModalities();
  const progress = (currentStep / 5) * 100;

  // Load from localStorage on mount (for anonymous Quick Start flow)
  useEffect(() => {
    const savedProgress = localStorage.getItem('quickStartProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setFormData(parsed.formData || parsed);
        setCurrentStep(parsed.currentStep || 1);
        setCurrentSubStep(parsed.currentSubStep || 'communication');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error loading Quick Start progress:', errorMessage);
        setSubmitError('Unable to restore your previous session. Please start again.');
      }
    }
  }, []);

  // Save to localStorage whenever formData or step changes
  useEffect(() => {
    if (formData.firstName || formData.email) {
      try {
        localStorage.setItem('quickStartProgress', JSON.stringify({
          formData,
          currentStep,
          currentSubStep,
          savedAt: new Date().toISOString()
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error saving Quick Start progress:', errorMessage);
        setSubmitError('Unable to save your progress. Please try again.');
      }
    }
  }, [formData, currentStep, currentSubStep]);

  // Create specialty categories for grouping
  const SPECIALTY_CATEGORIES = {
    'Mental Health': ['Anxiety', 'Bipolar disorder', 'Depression', 'OCD', 'PTSD', 'Trauma and abuse'],
    'Behavioral': ['Anger management', 'Concentration, memory and focus (ADHD)', 'Coping with addictions', 'Eating disorders', 'Phobias'],
    'Relationships': ['Bullying', 'Family conflict', 'Parenting issues', 'Relationship and intimacy issues'],
    'Life & Career': ['Career difficulties', 'Executive and Professional coaching', 'Grief and loss', 'Motivation and self-esteem'],
    'Identity': ['LGBT-related issues', 'Race and racial identity'],
    'Health': ['Autism', 'Chronic illness', 'Tourettes syndrome']
  };

  const handleNext = async (): Promise<void> => {
    try {
      console.log('HandleNext called - Current step:', currentStep, 'SubStep:', currentSubStep);

      // Show consent modal when leaving Screen 1 (only first time)
      if (currentStep === 1 && !marketingConsent && !localStorage.getItem('consentAsked')) {
        setShowConsentModal(true);
        setPendingNavigation(true);
        return;
      }

      if (currentStep === 2 && currentSubStep === 'communication') {
        // Move to session format within step 2
        console.log('Moving to session sub-step');
        setCurrentSubStep('session');
      } else if (currentStep < 5) {
        console.log('Moving to next step:', currentStep + 1);
        setCurrentStep(currentStep + 1);
        setCurrentSubStep('communication'); // Reset for next time
      } else {
        // Complete onboarding - save to database
        await handleSubmit();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      console.error('Error in handleNext:', errorMessage);
      setSubmitError('Unable to proceed. Please try again.');
    }
  };

  const handleBack = (): void => {
    if (currentStep === 2 && currentSubStep === 'session') {
      // Go back to communication sub-step
      setCurrentSubStep('communication');
    } else {
      // Go back to previous step
      setCurrentStep(Math.max(1, currentStep - 1));
      setCurrentSubStep('communication'); // Reset for consistency
    }
  };

  const handleSubmit = async (): Promise<void> => {
    // New flow: Quick Start is anonymous, save to localStorage and navigate to sign-up
    setLoading(true);
    setSubmitError(null);

    try {
      // Mark Quick Start as complete in localStorage
      localStorage.setItem('quickStartComplete', 'true');

      // Navigate to sign-up page (form data already in localStorage)
      navigate('/t/signup');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      console.error('Error completing Quick Start:', errorMessage);
      setSubmitError('Unable to proceed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleConsentResponse = async (consented: boolean): Promise<void> => {
    setMarketingConsent(consented);
    localStorage.setItem('consentAsked', 'true');

    if (consented) {
      // Save to therapist_leads table for email follow-ups
      try {
        const { data, error } = await supabase
          .from('therapist_leads')
          .upsert({
            email: formData.email,
            first_name: formData.firstName,
            marketing_consent: true,
            consent_timestamp: new Date().toISOString(),
            quick_start_data: formData,
            source: 'quick_start',
            status: 'in_progress'
          }, {
            onConflict: 'email'
          });

        if (error) {
          console.error('Error saving lead data:', error.message);
          // Don't block user flow if this fails
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        console.error('Error saving lead data:', errorMessage);
        // Don't block user flow if this fails
      }
    }

    // Continue with pending navigation
    if (pendingNavigation) {
      setPendingNavigation(false);
      setCurrentStep(2);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return Boolean(formData.firstName && formData.email && formData.licenseNumber);
      case 2:
        if (currentSubStep === 'communication') {
          return Boolean(formData.communicationStyle);
        } else {
          return Boolean(formData.sessionFormat);
        }
      case 3:
        return formData.specialties.length >= 3;
      case 4:
        return formData.modalities.length >= 1;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderStep = (): JSX.Element | null => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-primary">
                <User className="h-5 w-5" />
                Let's get started
              </CardTitle>
              <CardDescription className="font-secondary">
                Basic information to create your account (30 seconds)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Jane"
                    className="placeholder:text-[hsl(var(--text-muted))]"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Smith"
                    className="placeholder:text-[hsl(var(--text-muted))]"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane.smith@example.com"
                  className="placeholder:text-[hsl(var(--text-muted))]"
                />
              </div>

              <div>
                <Label htmlFor="title">Professional Title</Label>
                {formData.title === 'Other' ? (
                  <div className="flex gap-2">
                    <Input
                      id="title"
                      placeholder="e.g., Clinical Psychologist"
                      value={formData.customTitle}
                      onChange={(e) => setFormData({ ...formData, customTitle: e.target.value })}
                      className="flex-1 placeholder:text-[hsl(var(--text-muted))]"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({ ...formData, title: '', customTitle: '' })}
                    >
                      Back to list
                    </Button>
                  </div>
                ) : (
                  <select
                    id="title"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value, customTitle: '' })}
                  >
                    <option value="">Select your title...</option>
                    <option value="Clinical Psychologist">Clinical Psychologist</option>
                    <option value="Counselling Psychologist">Counselling Psychologist</option>
                    <option value="Psychotherapist">Psychotherapist</option>
                    <option value="Counsellor">Counsellor</option>
                    <option value="CBT Therapist">CBT Therapist</option>
                    <option value="Other">Other (type your own)</option>
                  </select>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registrationBody">Registration Body</Label>
                  {formData.registrationBody === 'Other' ? (
                    <div className="flex gap-1">
                      <Input
                        id="registrationBody"
                        placeholder="e.g., British Psychological Society"
                        value={formData.customRegistrationBody || ''}
                        onChange={(e) => setFormData({ ...formData, customRegistrationBody: e.target.value })}
                        className="flex-1 placeholder:text-[hsl(var(--text-muted))]"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setFormData({ ...formData, registrationBody: '', customRegistrationBody: '' })}
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  ) : (
                    <select
                      id="registrationBody"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.registrationBody || ''}
                      onChange={(e) => setFormData({ ...formData, registrationBody: e.target.value })}
                    >
                      <option value="">Select body...</option>
                      <option value="HCPC">HCPC</option>
                      <option value="BACP">BACP</option>
                      <option value="UKCP">UKCP</option>
                      <option value="BPS">BPS</option>
                      <option value="NCP">NCP</option>
                      <option value="BABCP">BABCP</option>
                      <option value="Other">Other (type your own)</option>
                    </select>
                  )}
                </div>
                <div>
                  <Label htmlFor="license">Registration Number</Label>
                  <Input
                    id="license"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="e.g., 12345"
                    className="placeholder:text-[hsl(var(--text-muted))]"
                  />
                </div>
              </div>
              <p className="text-xs text-[hsl(var(--text-muted))] -mt-2">
                We'll verify this with your registration body. Required: String format, any length.
              </p>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <select
                  id="experience"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                >
                  <option value="">Select experience...</option>
                  <option value="Less than 2 years">Less than 2 years</option>
                  <option value="More than 2 years">More than 2 years</option>
                  <option value="More than 5 years">More than 5 years</option>
                  <option value="More than 10 years">More than 10 years</option>
                </select>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        if (currentSubStep === 'communication') {
          return (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-primary">
                  <Brain className="h-5 w-5" />
                  Your Communication Style
                </CardTitle>
                <CardDescription className="font-secondary">
                  How you connect and communicate with clients
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                  "When working with a client, my communication style tends to be more..."
                  </Label>
                  <div className="grid gap-3">
                    {COMMUNICATION_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={(e) => {
                          e.preventDefault();
                          try {
                            setFormData({ ...formData, communicationStyle: style.label });
                          } catch (error) {
                            console.error('Error setting communication style:', error);
                          }
                        }}
                        className={cn(
                          "text-left p-4 rounded-lg border-2 transition-all",
                          formData.communicationStyle === style.label
                            ? "border-[hsl(var(--btn-primary-bg))] bg-[hsl(var(--surface-accent))]"
                            : "border-[hsl(var(--border))] hover:border-[hsl(var(--border-hover))]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 flex items-center justify-center">
                            {React.createElement(style.icon, { className: `h-6 w-6 ${style.color}` })}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{style.label}</div>
                            <div className="text-sm text-[hsl(var(--text-muted))] mt-1">
                              {style.description}
                            </div>
                            <div className="flex gap-1 mt-2">
                              {style.tags.map(tag => (
                                <Badge key={tag} className="bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))] text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {formData.communicationStyle === style.label && (
                            <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        } else {
          return (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-primary">
                  <Target className="h-5 w-5" />
                  Your Session Structure
                </CardTitle>
                <CardDescription className="font-secondary">
                  How you organise and structure your therapy sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    "When working with a client, I prefer my sessions to be..."
                  </Label>
                  <div className="grid gap-3">
                    {SESSION_FORMATS.map((format) => (
                      <button
                        key={format.id}
                        onClick={(e) => {
                          e.preventDefault();
                          try {
                            setFormData({ ...formData, sessionFormat: format.label });
                          } catch (error) {
                            console.error('Error setting session format:', error);
                          }
                        }}
                        className={cn(
                          "text-left p-4 rounded-lg border-2 transition-all",
                          formData.sessionFormat === format.label
                            ? "border-[hsl(var(--btn-primary-bg))] bg-[hsl(var(--surface-accent))]"
                            : "border-[hsl(var(--border))] hover:border-[hsl(var(--border-hover))]"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 flex items-center justify-center">
                            {React.createElement(format.icon, { className: `h-6 w-6 ${format.color}` })}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{format.label}</div>
                            <div className="text-sm text-[hsl(var(--text-muted))] mt-1">
                              {format.description}
                            </div>
                            <div className="flex gap-1 mt-2">
                              {format.tags.map(tag => (
                                <Badge key={tag} className="bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))] text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {formData.sessionFormat === format.label && (
                            <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        }

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-primary">
                <Target className="h-5 w-5" />
                Select Your Specialities
              </CardTitle>
              <CardDescription className="font-secondary">
                Choose the areas where you have the most experience and expertise.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-semibold">
                    Select at least 3 specialities (maximum 5)
                  </Label>
                  <span className={cn(
                    "text-sm font-medium",
                    formData.specialties.length >= 3
                      ? "text-[hsl(var(--success))]"
                      : "text-[hsl(var(--text-muted))]"
                  )}>
                    {formData.specialties.length}/5 selected
                  </span>
                </div>

                {formData.specialties.length > 0 && (
                  <div className="mb-4 p-3 bg-[hsl(var(--surface-accent))] rounded-lg">
                    <p className="text-sm font-medium mb-2">Selected:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.specialties.map(name => (
                        <Badge
                          key={name}
                          className="bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))] cursor-pointer hover:bg-[hsl(var(--tag-specialty-bg))]/80"
                          onClick={(e) => {
                            e.preventDefault();
                            try {
                              setFormData({
                                ...formData,
                                specialties: formData.specialties.filter(s => s !== name)
                              });
                            } catch (error) {
                              console.error('Error removing specialty:', error);
                            }
                          }}
                        >
                          {name}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.entries(SPECIALTY_CATEGORIES).map(([category, categorySpecialtyNames]) => {
                    const categorySpecialties = specialties.filter(s =>
                      categorySpecialtyNames.includes(s.name)
                    );
                    if (categorySpecialties.length === 0) return null;

                    return (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-[hsl(var(--text-muted))] mb-2">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {categorySpecialties.map(specialty => (
                            <button
                              key={specialty.id}
                              onClick={(e) => {
                                e.preventDefault();
                                try {
                                  if (formData.specialties.includes(specialty.name)) {
                                    setFormData({
                                      ...formData,
                                      specialties: formData.specialties.filter(s => s !== specialty.name)
                                    });
                                  } else if (formData.specialties.length < 5) {
                                    setFormData({
                                      ...formData,
                                      specialties: [...formData.specialties, specialty.name]
                                    });
                                  }
                                } catch (error) {
                                  console.error('Error updating specialties:', error);
                                }
                              }}
                              className={cn(
                                "text-sm px-3 py-2 rounded-md text-left transition-all border",
                                formData.specialties.includes(specialty.name)
                                  ? "bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))] border-[hsl(var(--tag-specialty-bg))]"
                                  : "bg-white hover:bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))] border-[hsl(var(--border))] hover:border-[hsl(var(--border-hover))]"
                              )}
                            >
                              {specialty.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {formData.specialties.length < 3 && (
                  <div className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] rounded-lg p-3 mt-4">
                    <p className="text-sm">
                      Please select at least 3 specialities to help clients find you
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-primary">
                <Brain className="h-5 w-5" />
                Select Your Modalities
              </CardTitle>
              <CardDescription className="font-secondary">
                Choose the therapeutic approaches you use.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-semibold">
                    Select your therapeutic approaches (maximum 3)
                  </Label>
                  <span className="text-sm text-[hsl(var(--text-muted))]">
                    {formData.modalities.length}/3 selected
                  </span>
                </div>

                {formData.modalities.length > 0 && (
                  <div className="mb-4 p-3 bg-[hsl(var(--surface-accent))] rounded-lg">
                    <p className="text-sm font-medium mb-2">Selected:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.modalities.map(name => (
                        <Badge
                          key={name}
                          className="bg-[hsl(var(--tag-modality-bg))] text-[hsl(var(--tag-modality-text))] cursor-pointer hover:bg-[hsl(var(--tag-modality-bg))]/80"
                          onClick={(e) => {
                            e.preventDefault();
                            try {
                              setFormData({
                                ...formData,
                                modalities: formData.modalities.filter(m => m !== name)
                              });
                            } catch (error) {
                              console.error('Error removing modality:', error);
                            }
                          }}
                        >
                          {name}
                          <X className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {modalities.map(modality => (
                    <button
                      key={modality.id}
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          if (formData.modalities.includes(modality.name)) {
                            setFormData({
                              ...formData,
                              modalities: formData.modalities.filter(m => m !== modality.name)
                            });
                          } else if (formData.modalities.length < 3) {
                            setFormData({
                              ...formData,
                              modalities: [...formData.modalities, modality.name]
                            });
                          }
                        } catch (error) {
                          console.error('Error updating modalities:', error);
                        }
                      }}
                      className={cn(
                        "text-sm px-4 py-3 rounded-lg text-left transition-all border-2",
                        formData.modalities.includes(modality.name)
                          ? "bg-[hsl(var(--tag-modality-bg))] text-[hsl(var(--tag-modality-text))] border-[hsl(var(--tag-modality-bg))]"
                          : "bg-white hover:bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))] border-[hsl(var(--border))] hover:border-[hsl(var(--border-hover))]"
                      )}
                    >
                      {modality.name}
                    </button>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Select the approaches you're most comfortable using. You can always update these later.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <div className="relative">
                  <Award className="h-16 w-16 text-[hsl(var(--success))]" />
                  <Sparkles className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2" />
                </div>
              </div>
              <CardTitle className="text-2xl font-primary flex items-baseline justify-center gap-2 flex-wrap">
                Welcome to <img src={MindfolkLogo} alt="Mindfolk" className="h-[0.9em] w-auto inline-block align-baseline translate-y-[0.04em]" style={{objectFit: 'contain'}} />, {formData.firstName}!
              </CardTitle>
              <CardDescription className="text-base mt-2 font-secondary">
                Your account is created and we're verifying your credentials in the background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[hsl(var(--surface-accent))] rounded-lg p-4">
                <h3 className="font-primary font-semibold mb-2">We are loving getting to know you already. You are:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    ...(COMMUNICATION_STYLES.find(s => s.label === formData.communicationStyle)?.tags || []),
                    ...(SESSION_FORMATS.find(f => f.label === formData.sessionFormat)?.tags || [])
                  ].map(tag => (
                    <Badge key={tag} variant="outline" className="border-[hsl(var(--tag-personality-text))] text-[hsl(var(--tag-personality-text))]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-[hsl(var(--text-muted))] mt-2">
                  This information will help us match you with compatible clients
                </p>
              </div>

              <div className="text-left space-y-3">
                <h3 className="font-semibold">What you can do now:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                    <span>Complete your profile at your own pace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                    <span>Set your availability and rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                    <span>Record your introduction video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                    <span>Explore resources and best practices</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm">
                  <strong>No payment required during your 30-day trial!</strong> We'll only ask for payment details when you're ready to accept clients or when your trial ends.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-primary font-bold text-[hsl(var(--text-primary))] flex items-baseline gap-2">
              Welcome to <img src={MindfolkLogo} alt="Mindfolk" className="h-[0.95em] w-auto inline-block align-baseline translate-y-[0.04em]" style={{objectFit: 'contain'}} />
            </h1>
            <span className="text-sm text-[hsl(var(--text-muted))]">
              Step {currentStep} of 5
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Error Message */}
        {submitError && (
          <div
            className="flex items-start gap-3 p-4 bg-[hsl(var(--error-bg))] text-[hsl(var(--error-text))] rounded-lg border border-[hsl(var(--error-text))]/20 mt-6"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-secondary">{submitError}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid() || loading}
            className="gap-2"
          >
            {loading && currentStep === 5 ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving your profile...
              </>
            ) : (
              <>
                {currentStep === 5 ? 'Create Your Account' : 'Continue'}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Marketing Consent Modal */}
      <MarketingConsentModal
        open={showConsentModal}
        onOpenChange={setShowConsentModal}
        onConsent={handleConsentResponse}
        email={formData.email}
        firstName={formData.firstName}
      />
    </div>
  );
}
