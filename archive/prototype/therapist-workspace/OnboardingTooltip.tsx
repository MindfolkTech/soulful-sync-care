import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TooltipStep {
  id: string;
  targetSelector: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto' | 'center';
  action?: {
    type: 'click' | 'input' | 'select' | 'custom' | 'upload';
    validation?: () => boolean;
    label?: string;
  };
  showSkip?: boolean;
  highlightTarget?: boolean;
}

interface OnboardingTooltipProps {
  steps: TooltipStep[];
  currentStepIndex: number;
  onNext: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  onComplete?: () => void;
}

export function OnboardingTooltip({
  steps,
  currentStepIndex,
  onNext,
  onPrev,
  onSkip,
  onComplete
}: OnboardingTooltipProps) {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    if (!currentStep) return;

    // Find target element
    const targetElement = document.querySelector(currentStep.targetSelector) as HTMLElement;
    if (!targetElement) {
      console.warn(`Target element not found: ${currentStep.targetSelector}`);
      return;
    }

    // Add highlight class to target
    if (currentStep.highlightTarget) {
      targetElement.classList.add('onboarding-highlight');
      
      // Add spotlight overlay
      const overlay = document.createElement('div');
      overlay.className = 'onboarding-overlay';
      overlay.innerHTML = `
        <style>
          .onboarding-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9998;
            pointer-events: none;
          }
          .onboarding-highlight {
            position: relative;
            z-index: 9999;
            box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(76, 175, 80, 0.7); }
            70% { box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 0 10px rgba(76, 175, 80, 0); }
            100% { box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(76, 175, 80, 0); }
          }
        </style>
      `;
      document.body.appendChild(overlay);
    }

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
      
      if (position === 'auto' || position === 'bottom') {
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

    // Initial position
    setTimeout(calculatePosition, 0);

    // Recalculate on scroll/resize
    window.addEventListener('scroll', calculatePosition);
    window.addEventListener('resize', calculatePosition);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
      
      // Remove highlight and overlay
      if (targetElement) {
        targetElement.classList.remove('onboarding-highlight');
      }
      const overlay = document.querySelector('.onboarding-overlay');
      if (overlay) {
        overlay.remove();
      }
    };
  }, [currentStep]);

  if (!currentStep) return null;

  const handleActionComplete = () => {
    // Check if action validation passes
    if (currentStep.action?.validation) {
      if (currentStep.action.validation()) {
        onNext();
      } else {
        // Show error or hint
        alert('Please complete the required action first');
      }
    } else {
      onNext();
    }
  };

  return (
    <div
      ref={tooltipRef}
      className={cn(
        "fixed z-[10000] transition-all duration-200",
        "w-80 md:w-96"
      )}
      style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}
    >
      {/* Arrow */}
      <div
        className={cn(
          "absolute w-0 h-0",
          arrowPosition === 'top' && "left-1/2 -translate-x-1/2 -top-2 border-l-8 border-r-8 border-b-8 border-transparent border-b-white",
          arrowPosition === 'bottom' && "left-1/2 -translate-x-1/2 -bottom-2 border-l-8 border-r-8 border-t-8 border-transparent border-t-white",
          arrowPosition === 'left' && "top-1/2 -translate-y-1/2 -left-2 border-t-8 border-b-8 border-r-8 border-transparent border-r-white",
          arrowPosition === 'right' && "top-1/2 -translate-y-1/2 -right-2 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"
        )}
      />
      
      {/* Tooltip Card */}
      <Card className="shadow-2xl border-2 border-[hsl(var(--garden-green))] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(steps.length)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    i === currentStepIndex
                      ? "w-6 bg-[hsl(var(--garden-green))]"
                      : i < currentStepIndex
                      ? "bg-[hsl(var(--garden-green))]"
                      : "bg-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-[hsl(var(--text-muted))]">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          {currentStep.showSkip && onSkip && (
            <button
              onClick={onSkip}
              className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <h3 className="font-semibold text-lg mb-2">{currentStep.title}</h3>
        <p className="text-sm text-[hsl(var(--text-muted))] mb-4">{currentStep.content}</p>

        {/* Actions */}
        <div className="flex gap-2">
          {onPrev && currentStepIndex > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onPrev}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <Button
            className="flex-1 bg-[hsl(var(--garden-green))] hover:bg-[hsl(var(--garden-green))]/90"
            size="sm"
            onClick={handleActionComplete}
          >
            {currentStep.action?.label || 
             (currentStepIndex === steps.length - 1 ? 'Complete' : 'Next')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
