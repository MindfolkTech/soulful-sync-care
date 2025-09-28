import { useState, useEffect } from "react";
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";
import { Stack, HStack, Cluster } from "@/components/layout/layout-atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tag } from "@/components/ui/tag";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCoachHint } from "@/hooks/use-coach-hint";
import { Edit, Upload, Eye, Play } from "lucide-react";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { supabase } from "@/integrations/supabase/client";

// Define communication styles options that align with the matching algorithm
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

export default function PracticeProfile() {
  const headshotHint = useCoachHint({ stepId: "profile" });
  useScrollToHash();
  
  const [modalities, setModalities] = useState<{name: string}[]>([]);
  const [specialities, setSpecialities] = useState<{name: string}[]>([]);
  const [languages, setLanguages] = useState<{name: string}[]>([]);
  const [formData, setFormData] = useState({
    // Basic info
    firstName: "Dr. Charlotte",
    lastName: "Thompson",
    title: "Licensed Clinical Psychologist",
    headline: "",
    bio: "I specialize in anxiety, depression, and relationship counseling with over 10 years of experience helping clients achieve their mental health goals.",
    quote: "",
    
    // Therapeutic approach
    modalities: [] as string[],
    specialities: ["Anxiety Disorders", "Depression", "Relationship Counseling", "Trauma Therapy", "CBT"] as string[],
    communicationStyle: "",
    sessionFormat: "",
    prides: [] as string[],
    languages: ["English", "Spanish", "French"] as string[],
    
    // Video
    videoUrl: undefined as string | undefined,
  });
  const [bioCharCount, setBioCharCount] = useState(formData.bio.length);
  const [uploading, setUploading] = useState(false);

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

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const bucket = "therapist-videos";
        const filePath = `${crypto.randomUUID()}_${file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, { upsert: false, contentType: file.type });
          
        if (uploadError) {
          console.error('Video upload error:', uploadError);
        } else {
          const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath);
          setFormData(prev => ({ ...prev, videoUrl: publicData?.publicUrl }));
        }
      } finally {
        setUploading(false);
      }
    }
  };
  
  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            <div>
              <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Profile</h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))]">Manage your basic profile information and public presentation</p>
            </div>
            
            <Stack className="space-y-8">
              {/* Profile Overview Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Profile Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-5 lg:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="focus-profile">
                    {/* Profile Photo Section */}
                    <div className="space-y-4">
                      <Avatar className="w-32 h-32 mx-auto lg:mx-0">
                        <AvatarImage 
                          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face" 
                          alt="Profile photo" 
                        />
                        <AvatarFallback className="bg-surface-accent text-[hsl(var(--jovial-jade))] font-primary text-2xl">
                          CT
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center lg:text-left space-y-2">
                        <TooltipProvider>
                          <Tooltip open={headshotHint.open} onOpenChange={headshotHint.setOpen}>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm" className="min-h-[--touch-target-min]" aria-label="Upload or change profile photo" onClick={headshotHint.dismiss}>
                                <Upload className="w-4 h-4 mr-2" />
                                Change Photo
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-secondary text-sm">Add a clear, friendly headshot to boost profile views.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <p className="font-secondary text-[hsl(var(--text-secondary))] text-xs">
                          JPG or PNG, max 5MB
                        </p>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="font-secondary text-[hsl(var(--text-primary))]">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                            className="min-h-[--touch-target-min]"
                            aria-describedby="firstName-help"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="font-secondary text-[hsl(var(--text-primary))]">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                            className="min-h-[--touch-target-min]"
                            aria-describedby="lastName-help"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="title" className="font-secondary text-[hsl(var(--text-primary))]">Professional Title</Label>
                        <Input 
                          id="title" 
                          value={formData.title}
                          onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                          className="min-h-[--touch-target-min]"
                          aria-describedby="title-help"
                        />
                      </div>

                      <div>
                        <Label htmlFor="headline" className="font-secondary text-[hsl(var(--text-primary))]">Profile Headline</Label>
                        <Input
                          id="headline"
                          placeholder="e.g., Compassionate CBT Therapist for Anxiety & Stress"
                          value={formData.headline}
                          onChange={(e) => setFormData(prev => ({...prev, headline: e.target.value}))}
                          maxLength={70}
                        />
                        <p className="text-xs text-muted-foreground text-right">{formData.headline.length}/70</p>
                      </div>

                      <div>
                        <Label htmlFor="bio" className="font-secondary text-[hsl(var(--text-primary))]">Professional Bio</Label>
                        <div className="relative">
                          <Textarea 
                            id="bio" 
                            value={formData.bio}
                            onChange={(e) => {
                              setFormData(prev => ({...prev, bio: e.target.value}));
                              setBioCharCount(e.target.value.length);
                            }}
                            rows={4}
                            className="resize-none min-h-[--touch-target-min] pr-10"
                            aria-describedby="bio-help"
                            maxLength={1500}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute bottom-2 right-2"
                            onClick={() => {
                              const suggestion = "As a compassionate and dedicated therapist, I specialize in helping adults navigate life's challenges, including anxiety, depression, and relationship issues. My approach is rooted in creating a warm, non-judgmental space where we can explore your concerns collaboratively. Using evidence-based techniques such as Cognitive Behavioral Therapy (CBT) and mindfulness, I tailor each session to your unique needs and goals. My aim is to empower you with practical tools and insights to foster self-awareness, build resilience, and create lasting, positive change in your life.";
                              setFormData(prev => ({...prev, bio: suggestion}));
                              setBioCharCount(suggestion.length);
                            }}
                          >
                            AI
                          </Button>
                        </div>
                        <p className={`text-xs text-right ${bioCharCount >= 150 && bioCharCount <= 1500 || bioCharCount === 0 ? 'text-muted-foreground' : 'text-red-500'}`}>
                          {bioCharCount}/1500 (150 minimum)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="quote" className="font-secondary text-[hsl(var(--text-primary))]">Personal Quote <Badge variant="secondary" className="ml-2">Optional</Badge></Label>
                        <Textarea 
                          id="quote"
                          placeholder="A meaningful quote that represents your therapeutic philosophy..."
                          className="min-h-[80px]"
                          value={formData.quote}
                          onChange={(e) => setFormData(prev => ({...prev, quote: e.target.value}))}
                          maxLength={200}
                        />
                        <p className="text-xs text-muted-foreground text-right">{formData.quote.length}/200</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Therapeutic Approach */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Therapeutic Approach</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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

                  {/* Communication Style */}
                  <div className="space-y-3">
                    <Label className="font-bold">Communication Style</Label>
                    <RadioGroup value={formData.communicationStyle} onValueChange={(val) => {
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
                    <Label className="font-bold">Session Format</Label>
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
                    <Label className="font-bold">Professional Qualities (select up to 2)</Label>
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
                </CardContent>
              </Card>

              {/* Professional Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Specializations (up to 5)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Languages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>
              </div>

              {/* Video Introduction */}
              <Card>
                <CardHeader>
                  <HStack className="justify-between">
                    <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Video Introduction</CardTitle>
                    <Badge variant="outline" className="bg-tag-personality text-tag-personality-foreground">
                      Recommended
                    </Badge>
                  </HStack>
                </CardHeader>
                <CardContent className="p-4 md:p-5 lg:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      {formData.videoUrl ? (
                        <video 
                          src={formData.videoUrl} 
                          className="w-full h-full object-cover rounded-lg"
                          controls
                        />
                      ) : (
                        <div className="text-center">
                          <Play className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                          <p className="font-secondary text-muted-foreground">No video uploaded</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-2">
                          Why add a video?
                        </h3>
                        <ul className="space-y-2 text-sm text-[hsl(var(--text-secondary))]">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                            Profiles with videos get 3x more bookings
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                            Help clients feel more comfortable
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[hsl(var(--garden-green))] rounded-full mt-2 flex-shrink-0"></span>
                            Show your personality and approach
                          </li>
                        </ul>
                      </div>
                      <Button variant="primary" className="min-h-[--touch-target-min]" aria-label="Upload introduction video to attract more clients">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Video
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Visibility */}
              <Card>
                <CardHeader>
                  <HStack className="justify-between">
                    <CardTitle className="font-primary text-[hsl(var(--jovial-jade))]">Profile Visibility</CardTitle>
                    <Button variant="outline" size="sm" className="min-h-[--touch-target-min]" aria-label="Preview how your profile appears to clients">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Profile
                    </Button>
                  </HStack>
                </CardHeader>
                <CardContent className="p-4 md:p-5 lg:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">127</div>
                      <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Profile Views</div>
                      <div className="text-xs text-[hsl(var(--success-text))]">+12% this month</div>
                    </div>
                    <div className="text-center">
                      <div className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">28</div>
                      <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Favorites</div>
                      <div className="text-xs text-[hsl(var(--success-text))]">+15% this month</div>
                    </div>
                    <div className="text-center">
                      <div className="font-primary text-2xl font-bold text-[hsl(var(--text-primary))]">4.9</div>
                      <div className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Average Rating</div>
                      <div className="text-xs text-[hsl(var(--text-secondary))]">27 reviews</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Save Changes */}
              <HStack className="justify-end pt-4">
                <Button variant="outline" className="min-h-[--touch-target-min]" aria-label="Cancel profile changes without saving">
                  Cancel
                </Button>
                <Button variant="primary" className="min-h-[--touch-target-min]" aria-label="Save all profile changes">
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