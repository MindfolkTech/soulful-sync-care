import { useState, useEffect } from "react";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, X } from "lucide-react";

type ProfessionalBody = {
  abbreviation: string;
  name: string;
};

export default function PracticeCredentials() {
  const [professionalBodies, setProfessionalBodies] = useState<ProfessionalBody[]>([]);
  const [formData, setFormData] = useState({
    firstName: "Dr. Charlotte",
    lastName: "Thompson",
    title: "Licensed Clinical Psychologist",
    experience: "10+ years",
    registrations: [
      { body: "BPS", registrationNumber: "12345" },
      { body: "HCPC", registrationNumber: "PYL12345" }
    ] as { body: string; registrationNumber: string }[],
    otherBody: "",
    hasInsurance: true,
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
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Professional Credentials</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Manage your qualifications and professional registrations</p>
            </div>

            <Stack className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))] flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <HStack className="justify-between">
                    <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Professional Registrations</CardTitle>
                    <Badge variant="outline" className="bg-tag-specialty text-tag-specialty-foreground">
                      Required
                    </Badge>
                  </HStack>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.registrations.map((reg, index) => (
                    <div key={index} className="flex items-center gap-2 p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <Select
                          value={reg.body}
                          onValueChange={(value) => handleRegistrationChange(index, 'body', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select professional body" />
                          </SelectTrigger>
                          <SelectContent>
                            {professionalBodies.map(body => (
                              <SelectItem key={body.abbreviation} value={body.abbreviation}>
                                {body.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="OTHER">Other Recognised Professional Register</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {reg.body === 'OTHER' && (
                        <Input
                          placeholder="Please specify"
                          value={formData.otherBody}
                          onChange={(e) => setFormData(prev => ({...prev, otherBody: e.target.value}))}
                          className="flex-1"
                        />
                      )}

                      <Input
                        placeholder="Registration Number"
                        value={reg.registrationNumber}
                        onChange={(e) => handleRegistrationChange(index, 'registrationNumber', e.target.value)}
                        className="flex-1"
                      />
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveRegistration(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" onClick={handleAddRegistration} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Registration
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Professional Insurance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-secondary text-sm text-[hsl(var(--text-secondary))]">
                      Professional liability insurance is required to practice. This protects both you and your clients 
                      in case of any professional disputes or claims.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Save Changes */}
              <HStack className="justify-end pt-4">
                <Button variant="outline" className="min-h-[--touch-target-min]">
                  Cancel
                </Button>
                <Button variant="primary" className="min-h-[--touch-target-min]" disabled={!formData.hasInsurance}>
                  Save Changes
                </Button>
              </HStack>
            </Stack>
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}