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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/integrations/supabase/client";

type ProfessionalBody = {
  abbreviation: string;
  name: string;
};

export default function OnboardingCredentials() {
  const navigate = useNavigate();
  const [professionalBodies, setProfessionalBodies] = useState<ProfessionalBody[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    experience: "",
    registrations: [] as { body: string; registrationNumber: string }[],
    otherBody: "",
    hasInsurance: false,
  });

  // Fetch professional bodies
  useEffect(() => {
    const fetchBodies = async () => {
      const { data, error } = await supabase
        .from('professional_bodies')
        .select('abbreviation, name')
        .order('name');
      
      if (error) {
        console.error("Error fetching professional bodies:", error);
      } else {
        setProfessionalBodies(data || []);
      }
    };
    fetchBodies();
  }, []);

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
        registrations: profileData.registrations || [],
        otherBody: profileData.otherBody || "",
        hasInsurance: profileData.hasInsurance || false,
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

  const handleAddRegistration = () => {
    setFormData(prev => ({
      ...prev,
      registrations: [...prev.registrations, { body: "", registrationNumber: "" }]
    }));
  };
  
  const handleRegistrationChange = (index: number, field: 'body' | 'registrationNumber', value: string) => {
    const newRegistrations = [...formData.registrations];
    newRegistrations[index][field] = value;
    setFormData(prev => ({ ...prev, registrations: newRegistrations }));
  };

  const handleRemoveRegistration = (index: number) => {
    const newRegistrations = formData.registrations.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, registrations: newRegistrations }));
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
                <Select
                  value={formData.experience}
                  onValueChange={(value) => setFormData(prev => ({...prev, experience: value}))}
                >
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2 years">0-2 years</SelectItem>
                    <SelectItem value="2-5 years">2-5 years</SelectItem>
                    <SelectItem value="5-10 years">5-10 years</SelectItem>
                    <SelectItem value="10+ years">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Professional Body Registration(s)</Label>
                {formData.registrations.map((reg, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Select
                      value={reg.body}
                      onValueChange={(value) => handleRegistrationChange(index, 'body', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select professional body" />
                      </SelectTrigger>
                      <SelectContent>
                        {professionalBodies.map(body => (
                          <SelectItem key={body.abbreviation} value={body.abbreviation}>{body.name}</SelectItem>
                        ))}
                        <SelectItem value="OTHER">Other Recognised Professional Register</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {reg.body === 'OTHER' && (
                      <Input
                        placeholder="Please specify"
                        value={formData.otherBody}
                        onChange={(e) => setFormData(prev => ({...prev, otherBody: e.target.value}))}
                      />
                    )}

                    <Input
                      placeholder="Registration Number"
                      value={reg.registrationNumber}
                      onChange={(e) => handleRegistrationChange(index, 'registrationNumber', e.target.value)}
                    />
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveRegistration(index)}>Remove</Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={handleAddRegistration}>Add another registration</Button>
              </div>

              <div className="space-y-2 pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="insurance"
                    checked={formData.hasInsurance}
                    onCheckedChange={(checked) => setFormData(prev => ({...prev, hasInsurance: checked as boolean}))}
                  />
                  <label htmlFor="insurance" className="font-secondary text-[hsl(var(--text-primary))]">
                    I confirm I hold valid professional liability insurance
                  </label>
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
                <Button onClick={handleNext} disabled={!formData.hasInsurance}>
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