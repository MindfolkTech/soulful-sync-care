import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowRight, ArrowLeft, Upload, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OnboardingProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    headline: "",
    bio: "",
    quote: "",
    headshot: null as File | null,
    // These will be pulled from previous step's data
    sessionFormat: "", 
    prides: [] as string[],
  });
  const [bioCharCount, setBioCharCount] = useState(0);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { profileData } = JSON.parse(saved);
      setFormData({
        headline: profileData.headline || "",
        bio: profileData.bio || "",
        quote: profileData.quote || "",
        headshot: profileData.headshot || null,
        sessionFormat: profileData.sessionFormat || "",
        prides: profileData.prides || [],
      });
      setBioCharCount(profileData.bio?.length || 0);
    }
  }, []);

  const handleSave = () => {
    const saved = localStorage.getItem('therapistOnboarding');
    const existing = saved ? JSON.parse(saved) : { currentStep: 4, profileData: {} };
    
    const { headshot, ...rest } = formData;
    const headshotMeta = headshot instanceof File ? { name: headshot.name, size: headshot.size, type: headshot.type } : headshot;

    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 4,
      profileData: {
        ...existing.profileData,
        ...rest,
        headshot: headshotMeta,
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

  const isBioValid = bioCharCount >= 150 && bioCharCount <= 1500;
  const isFormValid = formData.headshot && formData.headline && isBioValid;

  return (
    <OnboardingLayout currentStep={4} totalSteps={6}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="min-h-[500px] shadow-lg border-0">
            <CardHeader className="text-center pb-8">
              <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                Profile Basics
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                This is the core of your public profile. Make a great first impression.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headshot">Professional Headshot <Badge variant="destructive" className="ml-2">Required</Badge></Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="headshot"
                    accept="image/jpeg,image/png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="headshot" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-text-muted" />
                    <p className="font-secondary text-sm text-text-muted">
                      {formData.headshot ? "Change photo" : "Click to upload a professional photo"}
                    </p>
                     {formData.headshot && (
                      <p className="text-xs text-green-600 mt-1 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {formData.headshot instanceof File ? formData.headshot.name : "Photo uploaded"}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">PNG or JPG, up to 5MB. Must be a real photo of you.</p>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="headline">Profile Headline <Badge variant="destructive" className="ml-2">Required</Badge></Label>
                <Input
                  id="headline"
                  placeholder="e.g., Compassionate CBT Therapist for Anxiety & Stress"
                  value={formData.headline}
                  onChange={(e) => setFormData(prev => ({...prev, headline: e.target.value}))}
                  maxLength={70}
                />
                 <p className="text-xs text-muted-foreground text-right">{formData.headline.length}/70</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio <Badge variant="destructive" className="ml-2">Required</Badge></Label>
                <div className="relative">
                  <Textarea 
                    id="bio"
                    placeholder="Example: 'I help adults navigate anxiety and life transitions using a person-centered approach. In our sessions, you can expect a warm, non-judgmental space where we'll explore your challenges and build practical coping skills...'"
                    className="min-h-[150px] pr-10"
                    value={formData.bio}
                    onChange={(e) => {
                      setFormData(prev => ({...prev, bio: e.target.value}));
                      setBioCharCount(e.target.value.length);
                    }}
                    maxLength={1500}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute bottom-2 right-2"
                    onClick={() => {
                      const suggestion = "As a compassionate and dedicated therapist, I specialize in helping adults navigate life's challenges, including anxiety, depression, and relationship issues. My approach is rooted in creating a warm, non-judgmental space where we can explore your concerns collaboratively. Using evidence-based techniques such as Cognitive Behavioral Therapy (CBT) and mindfulness, I tailor each session to your unique needs and goals. My aim is to empower you with practical tools and insights to foster self-awareness, build resilience, and create lasting, positive change in your life. I believe that therapy is a partnership, and I am committed to supporting you on your journey toward a more fulfilling and balanced life.";
                      setFormData(prev => ({...prev, bio: suggestion}));
                      setBioCharCount(suggestion.length);
                    }}
                  >
                    AI
                  </Button>
                </div>
                <p className={`text-xs text-right ${isBioValid || bioCharCount === 0 ? 'text-muted-foreground' : 'text-red-500'}`}>
                  {bioCharCount}/1500 (150 minimum)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Session Structure</Label>
                    <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{formData.sessionFormat || "Not specified yet."}</p>
                </div>
                <div className="space-y-2">
                    <Label>What I pride myself on</Label>
                    <div className="flex flex-wrap gap-2">
                        {formData.prides.length > 0 ? formData.prides.map(p => <Badge key={p} variant="secondary">{p}</Badge>) : <p className="text-sm text-muted-foreground">Not specified yet.</p>}
                    </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote">Personal Quote <Badge variant="secondary" className="ml-2">Optional</Badge></Label>
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

              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding/approach")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!isFormValid}>
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