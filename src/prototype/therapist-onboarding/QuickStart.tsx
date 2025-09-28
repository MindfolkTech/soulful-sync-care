import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle2, Sparkles, User, Award, Brain, Heart, Target, Users, Lightbulb, Search, Zap, Leaf, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// The 4 communication styles (matching our database exactly)
const COMMUNICATION_STYLES = [
  {
    id: 'supportive',
    value: 'Supportive & Relational',
    label: 'Supportive & Relational',
    description: 'I focus on creating safety, trust, and emotional validation',
    icon: Heart,
    color: 'text-[hsl(var(--jovial-jade))]',
    tags: ['supportive', 'empathetic', 'warm']
  },
  {
    id: 'motivational',
    value: 'Motivational & Encouraging',
    label: 'Motivational & Encouraging',
    description: 'I inspire and empower clients to achieve their goals',
    icon: Target,
    color: 'text-[hsl(var(--garden-green))]',
    tags: ['motivational', 'encouraging', 'positive']
  },
  {
    id: 'pragmatic',
    value: 'Pragmatic & Problem-solving',
    label: 'Pragmatic & Problem-solving',
    description: 'I offer practical strategies and solutions for challenges',
    icon: Lightbulb,
    color: 'text-[hsl(var(--success-text))]',
    tags: ['pragmatic', 'solution-oriented', 'practical']
  },
  {
    id: 'flexible',
    value: 'Flexible & Adaptive',
    label: 'Flexible & Adaptive',
    description: 'I adjust my approach to match what works best for each client',
    icon: Users,
    color: 'text-[hsl(var(--warning-text))]',
    tags: ['flexible', 'adaptive', 'empathetic']
  }
];

// The 4 session formats (matching our database exactly)
const SESSION_FORMATS = [
  {
    id: 'structured',
    value: 'Structured & Goal-oriented',
    label: 'Structured & Goal-oriented',
    description: 'Sessions with clear goals, exercises, and measurable progress',
    icon: Target,
    color: 'text-[hsl(var(--success-text))]',
    tags: ['structured', 'goal-oriented', 'focused']
  },
  {
    id: 'exploratory',
    value: 'Exploratory & Insight-based',
    label: 'Exploratory & Insight-based',
    description: 'Deep exploration of thoughts and feelings to gain understanding',
    icon: Search,
    color: 'text-[hsl(var(--jovial-jade))]',
    tags: ['exploratory', 'insight-based', 'reflective']
  },
  {
    id: 'interactive',
    value: 'Interactive & Dynamic',
    label: 'Interactive & Dynamic',
    description: 'Active dialogue and engagement with exercises and role-play',
    icon: Zap,
    color: 'text-[hsl(var(--warning-text))]',
    tags: ['interactive', 'dynamic', 'engaging']
  },
  {
    id: 'calm',
    value: 'Calm & Process-Focused',
    label: 'Calm & Process-Focused',
    description: 'Gentle pacing with space for reflection and emotional processing',
    icon: Leaf,
    color: 'text-[hsl(var(--garden-green))]',
    tags: ['calm', 'gentle', 'process-focused']
  }
];

// Specialties from 03-THERAPIST-SELECTIONS.md (exact wording)
const SPECIALTIES = [
  { id: 'anger-management', label: 'Anger management', category: 'Behavioral' },
  { id: 'anxiety', label: 'Anxiety', category: 'Mental Health' },
  { id: 'autism', label: 'Autism', category: 'Health' },
  { id: 'bipolar-disorder', label: 'Bipolar disorder', category: 'Mental Health' },
  { id: 'bullying', label: 'Bullying', category: 'Relationships' },
  { id: 'career-difficulties', label: 'Career difficulties', category: 'Life & Career' },
  { id: 'chronic-illness', label: 'Chronic illness', category: 'Health' },
  { id: 'adhd', label: 'Concentration, memory and focus (ADHD)', category: 'Behavioral' },
  { id: 'addictions', label: 'Coping with addictions', category: 'Behavioral' },
  { id: 'depression', label: 'Depression', category: 'Mental Health' },
  { id: 'eating-disorders', label: 'Eating disorders', category: 'Behavioral' },
  { id: 'executive-coaching', label: 'Executive and Professional coaching', category: 'Life & Career' },
  { id: 'family-conflict', label: 'Family conflict', category: 'Relationships' },
  { id: 'grief-loss', label: 'Grief and loss', category: 'Life & Career' },
  { id: 'lgbt', label: 'LGBT-related issues', category: 'Identity' },
  { id: 'motivation-esteem', label: 'Motivation and self-esteem', category: 'Life & Career' },
  { id: 'ocd', label: 'OCD', category: 'Mental Health' },
  { id: 'parenting', label: 'Parenting issues', category: 'Relationships' },
  { id: 'phobias', label: 'Phobias', category: 'Behavioral' },
  { id: 'ptsd', label: 'PTSD', category: 'Mental Health' },
  { id: 'race-identity', label: 'Race and racial identity', category: 'Identity' },
  { id: 'relationship-issues', label: 'Relationship and intimacy issues', category: 'Relationships' },
  { id: 'tourettes', label: 'Tourettes syndrome', category: 'Health' },
  { id: 'trauma-abuse', label: 'Trauma and abuse', category: 'Mental Health' }
];

// Modalities from 03-THERAPIST-SELECTIONS.md (exact wording)
const MODALITIES = [
  { id: 'cbt', label: 'Cognitive Behavioural Therapy (CBT)' },
  { id: 'cft', label: 'Compassion Focused Therapy (CFT)' },
  { id: 'emdr', label: 'EMDR Therapy' },
  { id: 'family-systems', label: 'Family systems therapy' },
  { id: 'integrative', label: 'Integrative/eclectic approach' },
  { id: 'interpersonal', label: 'Interpersonal Therapy' },
  { id: 'mbct', label: 'Mindfulness-based Therapy (MBCT)' },
  { id: 'person-centered', label: 'Person-centered Therapy' },
  { id: 'psychodynamic', label: 'Psychodynamic therapy' },
  { id: 'trauma-focused', label: 'Trauma-focused therapy' }
];

export function QuickStart() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState('communication'); // For step 2
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    customTitle: '', // For "Other" option
    registrationBody: '',
    customRegistrationBody: '', // For "Other" option
    licenseNumber: '',
    yearsExperience: '',
    communicationStyle: '',
    sessionFormat: ''
  });

  // New state for specialties and modalities
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedModalities, setSelectedModalities] = useState<string[]>([]);

  const progress = (step / 5) * 100; // Updated for 5 steps

  const handleNext = () => {
    try {
      console.log('HandleNext called - Current step:', step, 'SubStep:', currentSubStep);
      
      if (step === 2 && currentSubStep === 'communication') {
        // Move to session format within step 2
        console.log('Moving to session sub-step');
        setCurrentSubStep('session');
      } else if (step < 5) {
        console.log('Moving to next step:', step + 1);
        setStep(step + 1);
        setCurrentSubStep('communication'); // Reset for next time
      } else {
        // Complete onboarding - navigate to workspace
        console.log('Quick Start Complete!', { 
          ...formData, 
          selectedSpecialties, 
          selectedModalities 
        });
        localStorage.setItem('therapistQuickStartComplete', 'true');
        localStorage.setItem('profileStrength', '40');
        localStorage.setItem('therapist_specialties', JSON.stringify(selectedSpecialties));
        localStorage.setItem('therapist_modalities', JSON.stringify(selectedModalities));
        // Add console logging to debug navigation
        console.log('Attempting to navigate to workspace...');
        navigate('/prototype/workspace/dashboard');
        console.log('Navigation command sent');
      }
    } catch (error) {
      console.error('Error in handleNext:', error);
    }
  };

  const canProceed = () => {
    // PROTOTYPE: Always allow proceeding to preview all steps
    return true;
    
    // Production validation would be:
    // switch(step) {
    //   case 1:
    //     return formData.firstName && formData.email && formData.licenseNumber;
    //   case 2:
    //     if (currentSubStep === 'communication') {
    //       return formData.communicationStyle;
    //     } else {
    //       return formData.sessionFormat;
    //     }
    //   case 3:
    //     return selectedSpecialties.length >= 3;
    //   case 4:
    //     return selectedModalities.length >= 1;
    //   case 5:
    //     return true;
    //   default:
    //     return false;
    // }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Prototype Notice */}
      <div className="bg-yellow-100 border-b border-yellow-300 p-2 text-center">
        <span className="text-sm text-yellow-900">
          🚧 PROTOTYPE - You can click Continue without filling fields to preview all steps
        </span>
      </div>
      
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-primary font-bold text-[hsl(var(--text-primary))]">
              Welcome to Mindfolk
            </h1>
            <span className="text-sm text-[hsl(var(--text-muted))]">
              Step {step} of 5
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
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
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    placeholder="Smith"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="jane.smith@example.com"
                />
              </div>

              <div>
                <Label htmlFor="title">Professional Title</Label>
                {formData.title === 'Other' ? (
                  <div className="flex gap-2">
                    <Input
                      id="title"
                      placeholder="Enter your professional title"
                      value={formData.customTitle}
                      onChange={(e) => setFormData({...formData, customTitle: e.target.value})}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData({...formData, title: '', customTitle: ''})}
                    >
                      Back to list
                    </Button>
                  </div>
                ) : (
                  <select
                    id="title"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value, customTitle: ''})}
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
                        placeholder="Enter body name"
                        value={formData.customRegistrationBody || ''}
                        onChange={(e) => setFormData({...formData, customRegistrationBody: e.target.value})}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setFormData({...formData, registrationBody: '', customRegistrationBody: ''})}
                      >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  ) : (
                    <select
                      id="registrationBody"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.registrationBody || ''}
                      onChange={(e) => setFormData({...formData, registrationBody: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                    placeholder="e.g., 12345"
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
                  onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
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
        )}

        {/* Step 2: Communication Style */}
        {step === 2 && currentSubStep === 'communication' && (
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
                  How would you describe your communication style?
                </Label>
                <div className="grid gap-3">
                  {COMMUNICATION_STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          setFormData({...formData, communicationStyle: style.value});
                        } catch (error) {
                          console.error('Error setting communication style:', error);
                        }
                      }}
                      className={cn(
                        "text-left p-4 rounded-lg border-2 transition-all",
                        formData.communicationStyle === style.value
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
                        {formData.communicationStyle === style.value && (
                          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2.5: Session Format */}
        {step === 2 && currentSubStep === 'session' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-primary">
                <Target className="h-5 w-5" />
                Your Session Structure
              </CardTitle>
              <CardDescription className="font-secondary">
                How you organize and structure your therapy sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  How do you structure your sessions?
                </Label>
                <div className="grid gap-3">
                  {SESSION_FORMATS.map((format) => (
                    <button
                      key={format.id}
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          setFormData({...formData, sessionFormat: format.value});
                        } catch (error) {
                          console.error('Error setting session format:', error);
                        }
                      }}
                      className={cn(
                        "text-left p-4 rounded-lg border-2 transition-all",
                        formData.sessionFormat === format.value
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
                        {formData.sessionFormat === format.value && (
                          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success))]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Select Your Specialties */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-primary">
                <Target className="h-5 w-5" />
                Select Your Specialties
              </CardTitle>
              <CardDescription className="font-secondary">
                Choose the areas where you have the most experience and expertise. This affects 20% of your client matching score.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="responsive-text-base font-semibold">
                    Select at least 3 specialties
                  </Label>
                  <span className={cn(
                    "responsive-text-sm font-medium",
                    selectedSpecialties.length >= 3 
                      ? "text-[hsl(var(--success))]" 
                      : "text-[hsl(var(--text-muted))]"
                  )}>
                    {selectedSpecialties.length}/3 minimum
                  </span>
                </div>
                
                {/* Selected specialties */}
                {selectedSpecialties.length > 0 && (
                  <div className="mb-4 p-3 bg-[hsl(var(--surface-accent))] rounded-lg">
                    <p className="responsive-text-sm font-medium mb-2">Selected:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecialties.map(id => {
                        const specialty = SPECIALTIES.find(s => s.id === id);
                        return (
                          <Badge 
                            key={id}
                            className="bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))] cursor-pointer hover:bg-[hsl(var(--tag-specialty-bg))]/80"
                            onClick={(e) => {
                              e.preventDefault();
                              try {
                                setSelectedSpecialties(selectedSpecialties.filter(s => s !== id));
                              } catch (error) {
                                console.error('Error removing specialty:', error);
                              }
                            }}
                          >
                            {specialty?.label}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Available specialties by category */}
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {['Mental Health', 'Behavioral', 'Relationships', 'Life & Career', 'Identity', 'Health'].map(category => {
                    const categorySpecialties = SPECIALTIES.filter(s => s.category === category);
                    if (categorySpecialties.length === 0) return null;
                    
                    return (
                      <div key={category}>
                        <h4 className="responsive-text-sm font-medium text-[hsl(var(--text-muted))] mb-2">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {categorySpecialties.map(specialty => (
                            <button
                              key={specialty.id}
                              onClick={(e) => {
                                e.preventDefault();
                                try {
                                  if (selectedSpecialties.includes(specialty.id)) {
                                    setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty.id));
                                  } else {
                                    setSelectedSpecialties([...selectedSpecialties, specialty.id]);
                                  }
                                } catch (error) {
                                  console.error('Error updating specialties:', error);
                                }
                              }}
                              className={cn(
                                "responsive-text-sm px-3 py-2 rounded-md text-left transition-all border",
                                selectedSpecialties.includes(specialty.id)
                                  ? "bg-[hsl(var(--tag-specialty-bg))] text-[hsl(var(--tag-specialty-text))] border-[hsl(var(--tag-specialty-bg))]"
                                  : "bg-white hover:bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))] border-[hsl(var(--border))] hover:border-[hsl(var(--border-hover))]"
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
                  <div className="bg-[hsl(var(--warning-bg))] text-[hsl(var(--warning-text))] rounded-lg p-3 mt-4">
                    <p className="responsive-text-sm">
                      Please select at least 3 specialties to help clients find you
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Select Your Modalities */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-primary">
                <Brain className="h-5 w-5" />
                Select Your Modalities
              </CardTitle>
              <CardDescription className="font-secondary">
                Choose the therapeutic approaches you use. This affects 15% of your client matching score.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="responsive-text-base font-semibold">
                    Select your therapeutic approaches
                  </Label>
                  <span className="responsive-text-sm text-[hsl(var(--text-muted))]">
                    {selectedModalities.length} selected
                  </span>
                </div>
                
                {/* Selected modalities */}
                {selectedModalities.length > 0 && (
                  <div className="mb-4 p-3 bg-[hsl(var(--surface-accent))] rounded-lg">
                    <p className="responsive-text-sm font-medium mb-2">Selected:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedModalities.map(id => {
                        const modality = MODALITIES.find(m => m.id === id);
                        return (
                          <Badge 
                            key={id}
                            className="bg-[hsl(var(--tag-modality-bg))] text-[hsl(var(--tag-modality-text))] cursor-pointer hover:bg-[hsl(var(--tag-modality-bg))]/80"
                            onClick={(e) => {
                              e.preventDefault();
                              try {
                                setSelectedModalities(selectedModalities.filter(m => m !== id));
                              } catch (error) {
                                console.error('Error removing modality:', error);
                              }
                            }}
                          >
                            {modality?.label}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Available modalities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MODALITIES.map(modality => (
                    <button
                      key={modality.id}
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          if (selectedModalities.includes(modality.id)) {
                            setSelectedModalities(selectedModalities.filter(m => m !== modality.id));
                          } else {
                            setSelectedModalities([...selectedModalities, modality.id]);
                          }
                        } catch (error) {
                          console.error('Error updating modalities:', error);
                        }
                      }}
                      className={cn(
                        "responsive-text-sm px-4 py-3 rounded-lg text-left transition-all border-2",
                        selectedModalities.includes(modality.id)
                          ? "bg-[hsl(var(--tag-modality-bg))] text-[hsl(var(--tag-modality-text))] border-[hsl(var(--tag-modality-bg))]"
                          : "bg-white hover:bg-[hsl(var(--surface-accent))] text-[hsl(var(--text-primary))] border-[hsl(var(--border))] hover:border-[hsl(var(--border-hover))]"
                      )}
                    >
                      {modality.label}
                    </button>
                  ))}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="responsive-text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Select the approaches you're most comfortable using. You can always update these later.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Welcome to Workspace */}
        {step === 5 && (
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4">
                <div className="relative">
                  <Award className="h-16 w-16 text-[hsl(var(--success))]" />
                  <Sparkles className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2" />
                </div>
              </div>
              <CardTitle className="responsive-text-2xl font-primary">
                Welcome to Mindfolk, {formData.firstName}!
              </CardTitle>
              <CardDescription className="responsive-text-base mt-2 font-secondary">
                Your account is created and we're verifying your credentials in the background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-[hsl(var(--surface-accent))] rounded-lg p-4">
                <h3 className="font-primary font-semibold mb-2">Your personality tags have been generated:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    ...(COMMUNICATION_STYLES.find(s => s.value === formData.communicationStyle)?.tags || []),
                    ...(SESSION_FORMATS.find(f => f.value === formData.sessionFormat)?.tags || [])
                  ].map(tag => (
                    <Badge key={tag} className="bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-[hsl(var(--text-muted))] mt-2">
                  These help us match you with compatible clients
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
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => {
              if (step === 2 && currentSubStep === 'session') {
                // Go back to communication sub-step
                setCurrentSubStep('communication');
              } else {
                // Go back to previous step
                setStep(Math.max(1, step - 1));
                setCurrentSubStep('communication'); // Reset for consistency
              }
            }}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {step === 5 ? 'Enter Your Workspace' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Export with the expected name for App.tsx
export { QuickStart as TherapistQuickStart };
