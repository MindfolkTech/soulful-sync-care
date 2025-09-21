import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowRight, ArrowLeft, Upload } from "lucide-react";

export default function OnboardingProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bio: "",
    quote: "",
    headshot: null as File | null
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { profileData } = JSON.parse(saved);
      setFormData({
        bio: profileData.bio || "",
        quote: profileData.quote || "",
        headshot: profileData.headshot || null
      });
    }
  }, []);

  const handleSave = () => {
    const saved = localStorage.getItem('therapistOnboarding');
    const existing = saved ? JSON.parse(saved) : { currentStep: 4, profileData: {} };
    
    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 4,
      profileData: {
        ...existing.profileData,
        ...formData
      },
      timestamp: Date.now()
    }));
  };

  const handleNext = () => {
    handleSave();
    navigate("/t/onboarding/video");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({...prev, headshot: file}));
    }
  };

  return (
    <OnboardingLayout currentStep={4} totalSteps={6}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="min-h-[500px] shadow-lg border-0">
            <CardHeader className="text-center pb-8">
              <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                Profile Content
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                Create your professional profile
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea 
                  id="bio"
                  placeholder="Tell potential clients about your background, approach, and what they can expect from working with you..."
                  className="min-h-[120px]"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                />
                <p className="text-xs text-text-muted font-secondary">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Personal Quote</Label>
                <Textarea 
                  id="quote"
                  placeholder="A meaningful quote that represents your therapeutic philosophy..."
                  className="min-h-[80px]"
                  value={formData.quote}
                  onChange={(e) => setFormData(prev => ({...prev, quote: e.target.value}))}
                />
                <p className="text-xs text-text-muted font-secondary">
                  Optional but recommended
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headshot">Professional Headshot</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="headshot"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="headshot" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-text-muted" />
                    <p className="font-secondary text-sm text-text-muted">
                      Click to upload a professional photo
                    </p>
                    {formData.headshot && (
                      <p className="text-xs text-primary mt-1">
                        {formData.headshot.name} selected
                      </p>
                    )}
                  </label>
                </div>
              </div>

              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding/approach")}
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