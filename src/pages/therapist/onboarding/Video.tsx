import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack, HStack } from "@/components/layout/layout-atoms";
import { ArrowRight, ArrowLeft, Upload, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function OnboardingVideo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    video: null as File | null,
    uploading: false as boolean,
    videoUrl: undefined as string | undefined,
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('therapistOnboarding');
    if (saved) {
      const { profileData } = JSON.parse(saved);
      setFormData({
        video: profileData.video || null,
        uploading: false,
        videoUrl: profileData.videoUrl || undefined,
      });
    }
  }, []);

  const handleSave = async () => {
    const saved = localStorage.getItem('therapistOnboarding');
    const existing = saved ? JSON.parse(saved) : { currentStep: 5, profileData: {} };
    
    let videoUrl = formData.videoUrl;
    // If a new video file is selected and we don't have a URL yet, upload it
    if (formData.video && !videoUrl) {
      setFormData(prev => ({ ...prev, uploading: true }));
      const file = formData.video;
      const bucket = "therapist-videos";
      const filePath = `${crypto.randomUUID()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { upsert: false, contentType: file.type });
      if (uploadError) {
        console.error('Video upload error:', uploadError);
        setFormData(prev => ({ ...prev, uploading: false }));
        // fallback: keep videoUrl undefined
      } else {
        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(filePath);
        videoUrl = publicData?.publicUrl;
        setFormData(prev => ({ ...prev, uploading: false, videoUrl }));
      }
    }

    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 5,
      profileData: {
        ...existing.profileData,
        ...formData,
        videoUrl,
        // Remove raw File reference before persisting
        video: undefined,
      },
      timestamp: Date.now()
    }));
  };

  const handleNext = async () => {
    await handleSave();
    navigate("/t/onboarding/verification");
  };

  const handleSkip = async () => {
    // Clear any selected video before skipping
    setFormData(prev => ({ ...prev, video: null }));
    await handleSave();
    navigate("/t/onboarding/verification");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, video: file, videoUrl: undefined }));
    }
  };

  return (
    <OnboardingLayout currentStep={5} totalSteps={6}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="min-h-[500px] shadow-lg border-0">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center gap-2">
                <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                  Video Introduction
                </h1>
                <Badge variant="secondary">Optional</Badge>
              </div>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                Optional but strongly encouraged to increase client trust
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-[hsl(var(--surface-accent))] p-6 rounded-lg">
                <h3 className="font-primary font-semibold text-[hsl(var(--text-primary))] mb-3">
                  Why add a video?
                </h3>
                <ul className="font-secondary text-[hsl(var(--text-secondary))] space-y-2 text-sm">
                  <li>• Videos increase client compatibility by 74%</li>
                  <li>• Helps clients feel more comfortable before first session</li>
                  <li>• Shows your communication style and personality</li>
                  <li>• Significantly increases booking rates</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-primary font-semibold text-[hsl(var(--text-primary))]">
                  Video Guidelines
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-secondary text-[hsl(var(--text-secondary))]">
                  <div>
                    <h5 className="font-semibold mb-2">Duration:</h5>
                    <p>30-60 seconds (ideal length)</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Content:</h5>
                    <p>Introduce yourself and your approach</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Setting:</h5>
                    <p>Professional background, good lighting</p>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Style:</h5>
                    <p>Natural, authentic, welcoming</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="video">Upload Video Introduction</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="video"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="video" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-3">
                      {formData.video ? (
                        <Play className="w-12 h-12 text-primary" />
                      ) : (
                        <Upload className="w-12 h-12 text-text-muted" />
                      )}
                      <div>
                        <p className="font-secondary text-sm text-text-primary font-medium">
                          {formData.video ? 'Change video' : 'Click to upload video'}
                        </p>
                        <p className="font-secondary text-xs text-text-muted mt-1">
                          MP4, MOV, or WebM (max 100MB)
                        </p>
                        {formData.video && (
                          <p className="text-xs text-primary mt-1">
                            {formData.video instanceof File ? formData.video.name : "Video uploaded"}
                          </p>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
              {formData.uploading && (
                <p className="text-xs text-muted-foreground mt-2">Uploading video… please wait.</p>
              )}

              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding/profile")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <HStack className="space-x-3">
                  <Button variant="outline" onClick={handleSkip} disabled={formData.uploading}>
                    Skip for now
                  </Button>
                  <Button onClick={handleNext} disabled={formData.uploading}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </HStack>
              </HStack>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </OnboardingLayout>
  );
}