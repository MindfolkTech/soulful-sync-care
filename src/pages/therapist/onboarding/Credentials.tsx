import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function OnboardingCredentials() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    experience: "",
    registrations: [] as string[]
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { profileData } = JSON.parse(saved);
      setFormData({
        firstName: profileData.firstName || "",
        lastName: profileData.lastName || "",
        title: profileData.title || "",
        experience: profileData.experience || "",
        registrations: profileData.registrations || []
      });
    }
  }, []);

  const handleSave = () => {
    const saved = localStorage.getItem('therapistOnboarding');
    const existing = saved ? JSON.parse(saved) : { currentStep: 2, profileData: {} };
    
    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 2,
      profileData: {
        ...existing.profileData,
        ...formData
      },
      timestamp: Date.now()
    }));
  };

  const handleNext = () => {
    handleSave();
    navigate("/t/onboarding/approach");
  };

  const handleRegistrationChange = (body: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        registrations: [...prev.registrations, body]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        registrations: prev.registrations.filter(r => r !== body)
      }));
    }
  };

  return (
    <OnboardingLayout currentStep={2} totalSteps={6}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="min-h-[500px] shadow-lg border-0">
            <CardHeader className="text-center pb-8">
              <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                Professional Credentials
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                Tell us about your qualifications
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Clinical Psychologist, Counsellor"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <select 
                  id="experience"
                  className="w-full p-2 border rounded-md bg-background"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
                >
                  <option value="">Select experience level</option>
                  <option value="0-2 years">0-2 years</option>
                  <option value="2-5 years">2-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Professional Body Registration</Label>
                <div className="space-y-2">
                  {["BACP", "UKCP", "HCPC", "BABCP", "BPS"].map((body) => (
                    <div key={body} className="flex items-center space-x-2">
                      <Checkbox 
                        id={body}
                        checked={formData.registrations.includes(body)}
                        onCheckedChange={(checked) => handleRegistrationChange(body, checked as boolean)}
                      />
                      <label htmlFor={body} className="font-secondary text-[hsl(var(--text-primary))]">
                        {body}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding")}
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