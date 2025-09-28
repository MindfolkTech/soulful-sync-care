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
import { VideoUpload } from "@/components/therapist/VideoUpload";
import { useAuth } from "@/context/AuthContext";

export default function OnboardingVideo() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

  // Load saved data and current video URL from therapist profile
  useEffect(() => {
    const loadVideoUrl = async () => {
      if (user) {
        const { data: profile } = await supabase
          .from('therapist_profiles')
          .select('video_url')
          .eq('user_id', user.id)
          .single();
        
        if (profile?.video_url) {
          setCurrentVideoUrl(profile.video_url);
        }
      }
      
      // Also check localStorage for any saved data
      const saved = localStorage.getItem('therapistOnboarding');
      if (saved) {
        const { profileData } = JSON.parse(saved);
        if (profileData.videoUrl) {
          setCurrentVideoUrl(profileData.videoUrl);
        }
      }
    };
    
    loadVideoUrl();
  }, [user]);

  const handleVideoUploaded = async (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    
    // Save to localStorage for onboarding flow
    const saved = localStorage.getItem('therapistOnboarding');
    const existing = saved ? JSON.parse(saved) : { currentStep: 5, profileData: {} };
    
    localStorage.setItem('therapistOnboarding', JSON.stringify({
      ...existing,
      currentStep: 5,
      profileData: {
        ...existing.profileData,
        videoUrl,
      },
      timestamp: Date.now()
    }));

    // Also update the therapist profile directly
    if (user) {
      await supabase
        .from('therapist_profiles')
        .update({ video_url: videoUrl })
        .eq('user_id', user.id);
    }
  };

  const handleNext = async () => {
    navigate("/t/onboarding/verification");
  };

  const handleSkip = async () => {
    navigate("/t/onboarding/verification");
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

              {/* Professional VideoUpload Component */}
              <VideoUpload 
                currentVideoUrl={currentVideoUrl}
                onVideoUploaded={handleVideoUploaded}
              />

              <HStack className="justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/t/onboarding/profile")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <HStack className="space-x-3">
                  <Button variant="outline" onClick={handleSkip}>
                    Skip for now
                  </Button>
                  <Button onClick={handleNext}>
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