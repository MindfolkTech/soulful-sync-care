import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { useNavigate } from "react-router-dom";
import { Stack } from "@/components/layout/layout-atoms";

export default function OnboardingWelcome() {
  const navigate = useNavigate();

  return (
    <OnboardingLayout currentStep={1} totalSteps={6}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          <Card className="min-h-[500px] shadow-lg border-0">
            <CardHeader className="text-center pb-8">
              <h1 className="font-primary text-[hsl(var(--text-2xl))] tracking-tight">
                Welcome to MindFolk
              </h1>
              <p className="font-secondary text-[hsl(var(--text-secondary))] text-lg">
                Join our community of verified therapists
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center space-y-6">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-primary font-bold text-xl">M</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-primary text-lg font-semibold text-[hsl(var(--text-primary))]">
                      Why join MindFolk?
                    </h3>
                    <ul className="font-secondary text-[hsl(var(--text-secondary))] space-y-2 text-left max-w-md mx-auto">
                      <li>• Compatibility-focused matching reduces early drop-off</li>
                      <li>• Control over your rates and schedule</li>
                      <li>• All-in-one practice management</li>
                      <li>• Video profiles help clients connect with your style</li>
                    </ul>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="w-full max-w-md" 
                  onClick={() => navigate("/t/onboarding/credentials")}
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </OnboardingLayout>
  );
}