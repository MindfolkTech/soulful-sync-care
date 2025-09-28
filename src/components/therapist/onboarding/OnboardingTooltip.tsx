import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OnboardingStep } from './steps';

interface OnboardingState {
  completed_steps: string[];
  skipped_steps: string[];
  current_step?: string;
  contextual_onboarding_started?: boolean;
  last_step_completed_at?: string;
}

interface OnboardingTooltipProps {
  steps: OnboardingStep[];
  currentStepIndex: number;
  onNext: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  onComplete?: () => void;
  onboardingState: OnboardingState;
}

export function OnboardingTooltip({
  steps,
  currentStepIndex,
  onNext,
  onPrev,
  onSkip,
  onComplete,
  onboardingState
}: OnboardingTooltipProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (!currentStep) return;

    // Find target element
    const targetElement = document.querySelector(currentStep.targetSelector) as HTMLElement;
    if (!targetElement) {
      console.warn(`Target element not found: ${currentStep.targetSelector}`);
      setValidationError(`Element not found: ${currentStep.targetSelector}`);
      return;
    }

    setValidationError(null);

    // Calculate tooltip position
    const calculatePosition = () => {
      const targetRect = targetElement.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      if (!tooltipEl) return;

      const tooltipRect = tooltipEl.getBoundingClientRect();
      const spacing = 16; // Gap between tooltip and target

      let top = 0;
      let left = 0;
      let arrow: 'top' | 'bottom' | 'left' | 'right' = 'top';

      // Auto-position or use specified position
      const position = currentStep.position || 'auto';

      if (position === 'center') {
        // Center the tooltip in the viewport
        top = (window.innerHeight - tooltipRect.height) / 2;
        left = (window.innerWidth - tooltipRect.width) / 2;
        arrow = 'top'; // Default arrow for centered tooltips
      } else if (position === 'auto' || position === 'bottom') {
        // Try bottom first
        top = targetRect.bottom + spacing;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        arrow = 'top';

        // Check if it goes off screen
        if (top + tooltipRect.height > window.innerHeight - 20) {
          // Try top
          top = targetRect.top - tooltipRect.height - spacing;
          arrow = 'bottom';
        }
      } else if (position === 'top') {
        top = targetRect.top - tooltipRect.height - spacing;
        left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        arrow = 'bottom';
      } else if (position === 'right') {
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.right + spacing;
        arrow = 'left';
      } else if (position === 'left') {
        top = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.left - tooltipRect.width - spacing;
        arrow = 'right';
      }

      // Ensure tooltip stays on screen
      left = Math.max(20, Math.min(left, window.innerWidth - tooltipRect.width - 20));
      top = Math.max(20, Math.min(top, window.innerHeight - tooltipRect.height - 20));

      setTooltipPosition({ top, left });
      setArrowPosition(arrow);
    };

    // Initial position calculation
    const positionTimeout = setTimeout(calculatePosition, 0);

    // Recalculate on scroll/resize
    const handleReposition = () => {
      requestAnimationFrame(calculatePosition);
    };

    window.addEventListener('scroll', handleReposition, { passive: true });
    window.addEventListener('resize', handleReposition, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(positionTimeout);
      window.removeEventListener('scroll', handleReposition);
      window.removeEventListener('resize', handleReposition);
    };
  }, [currentStep]);

  if (!currentStep) return null;

  const handleActionComplete = async () => {
    setIsValidating(true);
    setValidationError(null);

    try {
      // Check if action validation passes
      if (currentStep.action?.validation) {
        const isValid = await currentStep.action.validation();
        if (!isValid) {
          setValidationError(currentStep.action.errorMessage || 'Please complete the required action first');
          return;
        }
      }

      // Action is valid or no validation needed
      onNext();
    } catch (error) {
      console.error('Validation error:', error);
      setValidationError('An error occurred while validating your action');
    } finally {
      setIsValidating(false);
    }
  };

  const completedSteps = onboardingState.completed_steps || [];
  const totalSteps = steps.length;
  const progressPercentage = (completedSteps.length / totalSteps) * 100;

  return (
    <div
      ref={tooltipRef}
      className={cn(
        "fixed z-[10000] transition-all duration-300 ease-out",
        "w-80 md:w-96",
        "animate-in fade-in-0 zoom-in-95 duration-200"
      )}
      style={{
        top: `${tooltipPosition.top}px`,
        left: `${tooltipPosition.left}px`,
        transform: tooltipPosition.top === 0 && tooltipPosition.left === 0 ? 'scale(0.8)' : 'scale(1)'
      }}
    >
      {/* Arrow */}
      {currentStep.position !== 'center' && (
        <div
          className={cn(
            "absolute w-0 h-0 transition-all duration-200",
            arrowPosition === 'top' && "left-1/2 -translate-x-1/2 -top-2 border-l-8 border-r-8 border-b-8 border-transparent border-b-white",
            arrowPosition === 'bottom' && "left-1/2 -translate-x-1/2 -bottom-2 border-l-8 border-r-8 border-t-8 border-transparent border-t-white",
            arrowPosition === 'left' && "top-1/2 -translate-y-1/2 -left-2 border-t-8 border-b-8 border-r-8 border-transparent border-r-white",
            arrowPosition === 'right' && "top-1/2 -translate-y-1/2 -right-2 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"
          )}
        />
      )}

      {/* Tooltip Card */}
      <Card className="shadow-2xl border-2 border-[hsl(var(--garden-green))] p-4 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === currentStepIndex
                      ? "w-6 bg-[hsl(var(--garden-green))]"
                      : completedSteps.includes(steps[i]?.id)
                      ? "bg-[hsl(var(--garden-green))]"
                      : "bg-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-[hsl(var(--text-muted))]">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          </div>
          {currentStep.showSkip && onSkip && (
            <button
              onClick={onSkip}
              className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))] transition-colors p-1 rounded hover:bg-gray-100"
              title="Skip this step"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-[hsl(var(--garden-green))] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <h3 className="font-semibold text-lg mb-2 text-[hsl(var(--text-primary))]">
          {currentStep.title}
        </h3>
        <p className="text-sm text-[hsl(var(--text-muted))] mb-4 leading-relaxed">
          {currentStep.content}
        </p>

        {/* Validation Error */}
        {validationError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-700 font-medium">Action Required</p>
                <p className="text-xs text-red-600 mt-1">{validationError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step-specific instructions */}
        {currentStep.instruction && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">{currentStep.instruction}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {onPrev && currentStepIndex > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPrev}
              className="border-gray-300 hover:border-gray-400"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <Button
            className="flex-1 bg-[hsl(var(--garden-green))] hover:bg-[hsl(var(--garden-green))]/90 text-white"
            size="sm"
            onClick={handleActionComplete}
            disabled={isValidating}
          >
            {isValidating ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking...
              </div>
            ) : (
              <>
                {currentStep.action?.label ||
                 (currentStepIndex === totalSteps - 1 ? 'Complete' : 'Next')}
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>

        {/* Additional help text */}
        {currentStep.helpText && (
          <p className="text-xs text-[hsl(var(--text-muted))] mt-3 italic">
            💡 {currentStep.helpText}
          </p>
        )}
      </Card>
    </div>
  );
}