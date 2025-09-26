import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tag } from '@/components/ui/tag';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle2, Sparkles, User, Award, Brain, Heart, Target, Users, Lightbulb, Search, Zap, Leaf } from 'lucide-react';
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

export function TherapistQuickStart() {
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

  const progress = (step / 3) * 100;

  const handleNext = () => {
    if (step === 2 && currentSubStep === 'communication') {
      // Move to session format within step 2
      setCurrentSubStep('session');
    } else if (step < 3) {
      setStep(step + 1);
      setCurrentSubStep('communication'); // Reset for next time
    } else {
      // Complete onboarding - navigate to workspace
      console.log('Quick Start Complete!', formData);
      // This would save to database and generate personality_tags
      navigate('/t/dashboard'); // Navigate to existing therapist dashboard
    }
  };

  const canProceed = () => {
    // For prototype: always allow proceeding
    return true;
    
    // Production version would be:
    // switch(step) {
    //   case 1:
    //     return formData.firstName && formData.email && formData.licenseNumber;
    //   case 2:
    //     return formData.communicationStyle && formData.sessionFormat;
    //   case 3:
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
              Step {step} of 3
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
                      onClick={() => setFormData({...formData, communicationStyle: style.value})}
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
                      onClick={() => setFormData({...formData, sessionFormat: format.value})}
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

        {/* Step 3: Welcome to Workspace */}
        {step === 3 && (
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
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {step === 3 ? 'Enter Your Workspace' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
