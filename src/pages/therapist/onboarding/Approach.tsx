import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function OnboardingApproach() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    modalities: [] as string[],
    specialties: [] as string[],
    communicationStyle: ""
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { profileData } = JSON.parse(saved);
      setFormData({
        modalities: profileData.modalities || [],
        specialties: profileData.specialties || [],
        communicationStyle: profileData.communicationStyle || ""
      });
    }
  }, []);

  const handleSave = () => {
    const saved = localStorage.getItem('therapistOnboarding');
    const existing = saved ? JSON.parse(saved) : { currentStep: 3, profileData: {} };
    
    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 3,
      profileData: {
        ...existing.profileData,
        ...formData
      },
      timestamp: Date.now()
    }));
  };

  const handleNext = () => {
    handleSave();
    navigate("/t/onboarding/profile");
  };

  const handleModalityChange = (modality: string, checked: boolean) => {
    if (checked && formData.modalities.length < 3) {
      setFormData(prev => ({
        ...prev,
        modalities: [...prev.modalities, modality]
      }));
    } else if (!checked) {
      setFormData(prev => ({
        ...prev,
        modalities: prev.modalities.filter(m => m !== modality)
      }));
    }
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked && formData.specialties.length < 5) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    } else if (!checked) {
      setFormData(prev => ({
        ...prev,
        specialties: prev.specialties.filter(s => s !== specialty)
      }));
    }
  };

  const handleStyleChange = (style: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        communicationStyle: prev.communicationStyle + (prev.communicationStyle ? ", " : "") + style
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        communicationStyle: prev.communicationStyle
          .split(", ")
          .filter(s => s !== style)
          .join(", ")
      }));
    }
  };

  return (
    <OnboardingLayout currentStep={3} totalSteps={6}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="min-h-[500px] shadow-lg border-0">
            <CardHeader className="text-center pb-8">
              <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                Therapeutic Approach
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                Describe your specialties and style
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Therapeutic Modalities (Select up to 3)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["CBT", "EMDR", "Psychodynamic", "Humanistic", "Mindfulness", "Gestalt", "Family Therapy", "Solution-Focused"].map((modality) => (
                    <div key={modality} className="flex items-center space-x-2">
                      <Checkbox 
                        id={modality}
                        checked={formData.modalities.includes(modality)}
                        disabled={formData.modalities.length >= 3 && !formData.modalities.includes(modality)}
                        onCheckedChange={(checked) => handleModalityChange(modality, checked as boolean)}
                      />
                      <label htmlFor={modality} className="font-secondary text-[hsl(var(--text-primary))] text-sm">
                        {modality}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-muted font-secondary">
                  {formData.modalities.length}/3 selected
                </p>
              </div>

              <div className="space-y-2">
                <Label>Specialties (Select up to 5)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Anxiety", "Depression", "Trauma", "Relationships", "Work Stress", "Grief", "Identity", "Addiction"].map((specialty) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox 
                        id={specialty}
                        checked={formData.specialties.includes(specialty)}
                        disabled={formData.specialties.length >= 5 && !formData.specialties.includes(specialty)}
                        onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                      />
                      <label htmlFor={specialty} className="font-secondary text-[hsl(var(--text-primary))] text-sm">
                        {specialty}
                      </label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-muted font-secondary">
                  {formData.specialties.length}/5 selected
                </p>
              </div>

              <div className="space-y-2">
                <Label>Communication Style</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Empathetic", "Structured", "Flexible", "Calm", "Goal-oriented", "Process-focused", "Adaptable", "Understanding"].map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <Checkbox 
                        id={style}
                        checked={formData.communicationStyle.includes(style)}
                        onCheckedChange={(checked) => handleStyleChange(style, checked as boolean)}
                      />
                      <label htmlFor={style} className="font-secondary text-[hsl(var(--text-primary))] text-sm">
                        {style}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding/credentials")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </HStack>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </OnboardingLayout>
  );
}