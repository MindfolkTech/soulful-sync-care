import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OnboardingPolicies() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cancellationPolicy: "",
    reschedulingPolicy: "",
    latenessPolicy: "",
    communicationPolicy: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { profileData } = JSON.parse(saved);
      setFormData({
        cancellationPolicy: profileData.cancellationPolicy || "",
        reschedulingPolicy: profileData.reschedulingPolicy || "",
        latenessPolicy: profileData.latenessPolicy || "",
        communicationPolicy: profileData.communicationPolicy || "",
      });
    }
  }, []);

  const handleSave = () => {
    const saved = localStorage.getItem('therapistOnboarding');
    const existing = saved ? JSON.parse(saved) : { currentStep: 7, profileData: {} };
    
    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 7,
      profileData: {
        ...existing.profileData,
        ...formData,
      },
      timestamp: Date.now()
    }));
  };

  const handleNext = () => {
    handleSave();
    navigate("/t/dashboard"); // Assuming this is the last step now
  };
  
  const handleAIGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setFormData({
        cancellationPolicy: "Clients can cancel or reschedule up to 24 hours before the scheduled session time without a fee. Cancellations within 24 hours will be charged the full session fee.",
        reschedulingPolicy: "Rescheduling is flexible up to 24 hours before the session. Please contact me directly to find a new time that works for both of us.",
        latenessPolicy: "If you are late for a session, we will still end at the scheduled time. The session will be charged at the full rate. If I am late, the time will be made up at a later date.",
        communicationPolicy: "Between sessions, you can contact me via the secure messaging platform for brief check-ins. I will respond within one business day. Please note this is not for emergency contact."
      });
      setIsGenerating(false);
    }, 1000);
  };

  const policyFields = [
      { id: "cancellationPolicy", label: "Cancellation Policy", placeholder: "e.g., Please provide at least 24 hours notice for cancellations..." },
      { id: "reschedulingPolicy", label: "Rescheduling Policy", placeholder: "e.g., Rescheduling is permitted with 24 hours notice..." },
      { id: "latenessPolicy", label: "Lateness Policy", placeholder: "e.g., Sessions will end at the scheduled time regardless of start time..." },
      { id: "communicationPolicy", label: "Communication Policy", placeholder: "e.g., How you handle communication between sessions..." },
  ] as const;

  return (
    <OnboardingLayout currentStep={7} totalSteps={7}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="min-h-[500px] shadow-lg border-0">
            <CardHeader className="text-center pb-8">
               <div className="flex items-center justify-center gap-2">
                <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                  Your Practice Policies
                </h1>
                <Badge variant="destructive">Required</Badge>
              </div>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                Set clear expectations for your clients.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="text-center">
                    <Button onClick={handleAIGenerate} disabled={isGenerating}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        {isGenerating ? "Generating..." : "Generate suggestions with AI"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">You can edit the suggestions after they're generated.</p>
                </div>
                
                {policyFields.map(field => (
                    <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        className="min-h-[100px]"
                        value={formData[field.id]}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        />
                    </div>
                ))}
              
              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding/verification")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Finish & Go to Dashboard
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
