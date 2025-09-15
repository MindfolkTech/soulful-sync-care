import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Stack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";

export interface AssessmentStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export interface AssessmentStep {
  id: string;
  title: string;
  component: React.ComponentType<AssessmentStepProps>;
  props?: Record<string, unknown>;
}

export interface AssessmentFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: AssessmentStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  className?: string;
}

const AssessmentFlow = React.forwardRef<HTMLDivElement, AssessmentFlowProps>(
  ({ steps, currentStep, onStepChange, onComplete, className, ...props }, ref) => {
    const currentStepData = steps[currentStep];
    const progress = ((currentStep + 1) / steps.length) * 100;

    const handleNext = () => {
      if (currentStep < steps.length - 1) {
        onStepChange(currentStep + 1);
      } else {
        onComplete();
      }
    };

    const handlePrevious = () => {
      if (currentStep > 0) {
        onStepChange(currentStep - 1);
      }
    };

    const StepComponent = currentStepData.component;

    return (
      <div
        ref={ref}
        className={cn(
          "min-h-screen bg-warm-white flex flex-col",
          className
        )}
        {...props}
      >
        {/* Progress Header */}
        <div className="sticky top-0 z-10 bg-warm-white border-b border-border p-4">
          <Stack spacing="sm">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-primary font-semibold text-jovial-jade">
                {currentStepData.title}
              </h1>
              <span className="text-sm text-text-secondary">
                {currentStep + 1} of {steps.length}
              </span>
            </div>
            <ProgressBar 
              value={progress} 
              showLabel={false}
              size="sm"
            />
          </Stack>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <StepComponent 
              {...currentStepData.props}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="sticky bottom-0 bg-warm-white border-t border-border p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="tertiary"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
              {currentStep < steps.length - 1 && (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
AssessmentFlow.displayName = "AssessmentFlow";

export { AssessmentFlow };
