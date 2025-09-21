import React from "react";
import { Header } from "@/components/layout/header";
import { Progress } from "@/components/ui/progress";
import { Container } from "@/components/ui/container";
import { Stack } from "@/components/layout/layout-atoms";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

/**
 * OnboardingLayout - A focused layout for the multi-step therapist onboarding process.
 * Provides a minimal chrome with a header and progress indicator to keep the user
 * focused on completing the sign-up flow without the distractions of the main
 * application navigation.
 */
export function OnboardingLayout({ children, currentStep, totalSteps }: OnboardingLayoutProps) {
  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[hsl(var(--warm-white))] flex flex-col">
      <Header />
      <main className="flex-grow py-4 md:py-6 lg:py-8">
        <Container>
          <Stack className="space-y-4">
            {/* Progress Indicator */}
            <div className="px-4">
              <p className="text-sm font-semibold text-center text-[hsl(var(--text-muted))] mb-2">
                Step {currentStep} of {totalSteps}
              </p>
              <Progress value={progressValue} aria-label={`${Math.round(progressValue)}% complete`} />
            </div>
            {/* Step Content */}
            <div>
              {children}
            </div>
          </Stack>
        </Container>
      </main>
    </div>
  );
}