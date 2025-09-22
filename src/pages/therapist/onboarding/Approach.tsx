import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

// Define communication styles options that align with the matching algorithm
// Using safe IDs for DOM elements but storing the full strings for processing compatibility
const communicationStyles = [
  { id: 'empathetic', value: 'Empathetic and understanding', label: 'Empathetic and understanding', description: 'I focus on creating a warm, supportive environment where clients feel heard and validated.' },
  { id: 'structured', value: 'Structured and goal-oriented', label: 'Structured and goal-oriented', description: 'I help clients set clear goals and work systematically toward measurable outcomes.' },
  { id: 'flexible', value: 'Flexible and adaptable', label: 'Flexible and adaptable', description: 'I adjust my approach based on each client\'s unique needs and preferences.' },
  { id: 'calm', value: 'Calm and process-focused', label: 'Calm and process-focused', description: 'I help clients explore their thoughts and feelings at a comfortable pace.' },
];

// Define session format options
const sessionFormats = [
  { id: 'structured', label: 'Structured', description: 'I follow a clear agenda with specific goals for each session.' },
  { id: 'flexible', label: 'Flexible', description: 'I adapt the session flow based on what emerges in our time together.' },
  { id: 'balanced', label: 'Balanced', description: 'I balance structure with flexibility, having a general framework while remaining responsive to client needs.' },
];

// Define prides options
const prides = [
  { id: 'empathy', label: 'Empathy' },
  { id: 'authenticity', label: 'Authenticity' },
  { id: 'cultural_sensitivity', label: 'Cultural Sensitivity' },
  { id: 'inclusivity', label: 'Inclusivity' },
  { id: 'continuing_education', label: 'Continuing Education' },
  { id: 'work_life_balance', label: 'Work-Life Balance' },
];

export default function OnboardingApproach() {
  const navigate = useNavigate();
  const [modalities, setModalities] = useState<{name: string}[]>([]);
  const [specialities, setSpecialities] = useState<{name: string}[]>([]);
  const [languages, setLanguages] = useState<{name: string}[]>([]);
  const [formData, setFormData] = useState({
    modalities: [] as string[],
    specialities: [] as string[],
    communicationStyle: "",
    sessionFormat: "",
    prides: [] as string[],
    languages: [] as string[],
  });

  // Load taxonomies
  useEffect(() => {
    const fetchTaxonomies = async () => {
      const { data: modalitiesData } = await supabase.from('modalities').select('name');
      const { data: specialitiesData } = await supabase.from('specialities').select('name');
      const { data: languagesData } = await supabase.from('languages').select('name');
      setModalities(modalitiesData || []);
      setSpecialities(specialitiesData || []);
      setLanguages(languagesData || []);
    };
    fetchTaxonomies();
  }, []);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { profileData } = JSON.parse(saved);
      setFormData({
        modalities: profileData.modalities || [],
        specialities: profileData.specialities || [],
        communicationStyle: profileData.communicationStyle || "",
        sessionFormat: profileData.sessionFormat || "",
        prides: profileData.prides || [],
        languages: profileData.languages || [],
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

  const handleMultiSelectChange = (field: 'modalities' | 'specialities' | 'prides' | 'languages', value: string, max: number) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      const isSelected = current.includes(value);
      if (isSelected) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else if (current.length < max) {
        return { ...prev, [field]: [...current, value] };
      }
      return prev;
    });
  };

  return (
    <OnboardingLayout currentStep={3} totalSteps={6}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-8">
              <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                Therapeutic Approach & Style
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                Help clients understand how you work.
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Modalities */}
              <div className="space-y-3">
                <Label className="font-bold">Modalities (select up to 3)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {modalities.map(m => (
                    <div key={m.name} className="flex items-center space-x-2">
                      <Checkbox
                        id={m.name}
                        checked={formData.modalities.includes(m.name)}
                        onCheckedChange={() => handleMultiSelectChange('modalities', m.name, 3)}
                        disabled={formData.modalities.length >= 3 && !formData.modalities.includes(m.name)}
                      />
                      <label htmlFor={m.name} className="text-sm">{m.name}</label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{formData.modalities.length}/3 selected</p>
              </div>

              {/* Specialities */}
              <div className="space-y-3">
                <Label className="font-bold">My Specialities (select up to 5)</Label>
                <div className="flex flex-wrap gap-2">
                  {specialities.map(s => (
                    <Badge
                      key={s.name}
                      variant={formData.specialities.includes(s.name) ? 'default' : 'secondary'}
                      onClick={() => handleMultiSelectChange('specialities', s.name, 5)}
                      className="cursor-pointer"
                      style={{
                        backgroundColor: formData.specialities.includes(s.name) ? 'var(--tag-specialty-bg)' : undefined,
                        color: formData.specialities.includes(s.name) ? 'var(--tag-specialty-text)' : undefined,
                      }}
                    >
                      {s.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{formData.specialities.length}/5 selected</p>
              </div>

              {/* Communication Style */}
              <div className="space-y-3">
                <Label className="font-bold">When working with a therapy client, my communication style tends to lean towards... (select one)</Label>
                <RadioGroup value={formData.communicationStyle} onValueChange={(val) => {
                  // Find the full string value for the selected ID
                  const selectedStyle = communicationStyles.find(s => s.id === val);
                  setFormData(p => ({...p, communicationStyle: selectedStyle ? selectedStyle.value : val}));
                }}>
                  {communicationStyles.map(s => (
                    <div key={s.id} className="flex items-start space-x-2 p-3 rounded-md border">
                      <RadioGroupItem value={s.id} id={`comm-${s.id}`} />
                      <div className="grid gap-1.5 leading-none">
                        <label htmlFor={`comm-${s.id}`} className="font-medium">{s.label}</label>
                        <p className="text-sm text-muted-foreground">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Session Format */}
              <div className="space-y-3">
                <Label className="font-bold">In terms of how I format my sessions with clients, I tend to be more... (select one)</Label>
                <RadioGroup value={formData.sessionFormat} onValueChange={(val) => setFormData(p => ({...p, sessionFormat: val}))}>
                  {sessionFormats.map(f => (
                    <div key={f.id} className="flex items-start space-x-2 p-3 rounded-md border">
                      <RadioGroupItem value={f.id} id={`format-${f.id}`} />
                      <div className="grid gap-1.5 leading-none">
                        <label htmlFor={`format-${f.id}`} className="font-medium">{f.label}</label>
                        <p className="text-sm text-muted-foreground">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Prides */}
              <div className="space-y-3">
                <Label className="font-bold">I pride myself on being... (select up to 2)</Label>
                <div className="grid grid-cols-2 gap-4">
                  {prides.map(p => (
                    <div key={p.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={p.id}
                        checked={formData.prides.includes(p.id)}
                        onCheckedChange={() => handleMultiSelectChange('prides', p.id, 2)}
                        disabled={formData.prides.length >= 2 && !formData.prides.includes(p.id)}
                      />
                      <label htmlFor={p.id} className="text-sm">{p.label}</label>
                    </div>
                  ))}
                </div>
                 <p className="text-xs text-muted-foreground">{formData.prides.length}/2 selected</p>
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <Label className="font-bold">I can fluently speak... (select all that apply)</Label>
                <ScrollArea className="h-40 rounded-md border">
                    <div className="p-4 grid grid-cols-2 md:grid-cols-3">
                    {languages.map(lang => (
                        <div key={lang.name} className="flex items-center space-x-2">
                        <Checkbox
                            id={lang.name}
                            checked={formData.languages.includes(lang.name)}
                            onCheckedChange={() => handleMultiSelectChange('languages', lang.name, languages.length)}
                        />
                        <label htmlFor={lang.name} className="text-sm">{lang.name}</label>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
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