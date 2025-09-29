import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle2, Heart, Target, Lightbulb, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getSpecialities, getModalities } from '@/data/taxonomy';
import { cn } from '@/lib/utils';

// Communication styles that match our database exactly
const COMMUNICATION_STYLES = [
  {
    id: 'supportive',
    value: 'Supportive & Relational',
    description: 'I focus on creating safety, trust, and emotional validation',
    icon: Heart,
    color: 'text-[hsl(var(--jovial-jade))]'
  },
  {
    id: 'motivational',
    value: 'Motivational & Encouraging',
    description: 'I inspire and empower clients to achieve their goals',
    icon: Target,
    color: 'text-[hsl(var(--garden-green))]'
  },
  {
    id: 'pragmatic',
    value: 'Pragmatic & Problem-solving',
    description: 'I offer practical strategies and solutions for challenges',
    icon: Lightbulb,
    color: 'text-[hsl(var(--success-text))]'
  },
  {
    id: 'flexible',
    value: 'Flexible & Adaptive',
    description: 'I adjust my approach to match what works best for each client',
    icon: Users,
    color: 'text-[hsl(var(--warning-text))]'
  }
];

const SESSION_FORMATS = [
  { value: 'Structured & Goal-oriented', description: 'Clear agendas with specific outcomes' },
  { value: 'Exploratory & Insight-based', description: 'Deep reflection and self-discovery' },
  { value: 'Interactive & Dynamic', description: 'Engaging exercises and activities' },
  { value: 'Calm & Process-Focused', description: 'Gentle pacing with mindful processing' }
];

interface QuickStartData {
  license_number: string;
  bio: string;
  specialties: string[];
  modalities: string[];
  communication_style: string;
  session_format: string;
}

export default function TherapistQuickStart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<QuickStartData>({
    license_number: '',
    bio: '',
    specialties: [],
    modalities: [],
    communication_style: '',
    session_format: ''
  });

  const specialties = getSpecialities();
  const modalities = getModalities();
  const progress = (currentStep / 5) * 100;

  const handleNext = async () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update therapist profile with QuickStart data
      const { error } = await supabase
        .from('therapist_profiles')
        .update({
          license_number: formData.license_number,
          bio: formData.bio,
          specialties: formData.specialties,
          modalities: formData.modalities,
          communication_style: formData.communication_style,
          session_format: formData.session_format,
          setup_completed: true,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Navigate to dashboard with contextual onboarding
      navigate('/t/dashboard');
    } catch (error) {
      console.error('Error saving QuickStart data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="license_number">License Number</Label>
              <Input
                id="license_number"
                value={formData.license_number}
                onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                placeholder="Enter your license number"
              />
            </div>
            <div>
              <Label htmlFor="bio">Tell clients about yourself (2-3 sentences)</Label>
              <textarea
                id="bio"
                className="w-full p-3 border rounded-md h-24 resize-none"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="I specialize in helping people navigate life transitions and build resilience..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Label>Select your specialties (choose 3-4)</Label>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {specialties.map((specialty) => (
                <button
                  key={specialty.id}
                  onClick={() => {
                    const isSelected = formData.specialties.includes(specialty.name);
                    if (isSelected) {
                      setFormData({
                        ...formData,
                        specialties: formData.specialties.filter(s => s !== specialty.name)
                      });
                    } else if (formData.specialties.length < 4) {
                      setFormData({
                        ...formData,
                        specialties: [...formData.specialties, specialty.name]
                      });
                    }
                  }}
                  className={cn(
                    "p-2 text-sm border rounded-md text-left transition-colors",
                    formData.specialties.includes(specialty.name)
                      ? "bg-[hsl(var(--primary))] text-white"
                      : "hover:bg-gray-50"
                  )}
                >
                  {specialty.name}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {formData.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Label>Choose your therapy modalities (select 1-2)</Label>
            <div className="space-y-2">
              {modalities.map((modality) => (
                <button
                  key={modality.id}
                  onClick={() => {
                    const isSelected = formData.modalities.includes(modality.name);
                    if (isSelected) {
                      setFormData({
                        ...formData,
                        modalities: formData.modalities.filter(m => m !== modality.name)
                      });
                    } else if (formData.modalities.length < 2) {
                      setFormData({
                        ...formData,
                        modalities: [...formData.modalities, modality.name]
                      });
                    }
                  }}
                  className={cn(
                    "w-full p-3 border rounded-md text-left transition-colors",
                    formData.modalities.includes(modality.name)
                      ? "bg-[hsl(var(--primary))] text-white"
                      : "hover:bg-gray-50"
                  )}
                >
                  {modality.name}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Label>How would you describe your communication style?</Label>
            <div className="space-y-3">
              {COMMUNICATION_STYLES.map((style) => {
                const Icon = style.icon;
                return (
                  <button
                    key={style.id}
                    onClick={() => setFormData({ ...formData, communication_style: style.value })}
                    className={cn(
                      "w-full p-4 border rounded-lg text-left transition-colors",
                      formData.communication_style === style.value
                        ? "bg-[hsl(var(--primary))] text-white"
                        : "hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={cn("h-5 w-5 mt-0.5", style.color)} />
                      <div>
                        <div className="font-medium">{style.value}</div>
                        <div className="text-sm opacity-80">{style.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <Label>What's your preferred session format?</Label>
            <div className="space-y-3">
              {SESSION_FORMATS.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setFormData({ ...formData, session_format: format.value })}
                  className={cn(
                    "w-full p-4 border rounded-lg text-left transition-colors",
                    formData.session_format === format.value
                      ? "bg-[hsl(var(--primary))] text-white"
                      : "hover:bg-gray-50"
                  )}
                >
                  <div className="font-medium">{format.value}</div>
                  <div className="text-sm opacity-80">{format.description}</div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.license_number && formData.bio;
      case 2:
        return formData.specialties.length >= 2;
      case 3:
        return formData.modalities.length >= 1;
      case 4:
        return formData.communication_style;
      case 5:
        return formData.session_format;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--success-text))]" />
                Quick Start Setup
              </CardTitle>
              <CardDescription>
                Step {currentStep} of 5 - Let's get your profile ready for clients
              </CardDescription>
            </div>
            <Badge variant="secondary">{Math.round(progress)}%</Badge>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {renderStep()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || loading}
              className="flex items-center gap-2"
            >
              {currentStep === 5 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}