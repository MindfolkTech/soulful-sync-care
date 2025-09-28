import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface OnboardingOverlayProps {
  targetSelector?: string;
  className?: string;
}

export function OnboardingOverlay({ targetSelector, className }: OnboardingOverlayProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!targetSelector) {
      // Show general overlay without spotlight
      setIsVisible(true);
      return;
    }

    // Find target element and create spotlight
    const findTarget = () => {
      const targetElement = document.querySelector(targetSelector) as HTMLElement;
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetRect(rect);
        setIsVisible(true);

        // Add highlight class to target
        targetElement.classList.add('onboarding-highlight');
        targetElement.style.position = 'relative';
        targetElement.style.zIndex = '9999';

        return () => {
          targetElement.classList.remove('onboarding-highlight');
          targetElement.style.zIndex = '';
        };
      } else {
        console.warn(`Target element not found: ${targetSelector}`);
        setIsVisible(true); // Show overlay anyway
      }
    };

    // Initial attempt
    const cleanup = findTarget();

    // Retry after a short delay for dynamic content
    const retryTimeout = setTimeout(findTarget, 100);

    // Update position on scroll/resize
    const updatePosition = () => {
      if (targetSelector) {
        const targetElement = document.querySelector(targetSelector) as HTMLElement;
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect();
          setTargetRect(rect);
        }
      }
    };

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      clearTimeout(retryTimeout);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
      if (cleanup) cleanup();
    };
  }, [targetSelector]);

  if (!isVisible) return null;

  const spotlightStyle = targetRect ? {
    clipPath: `polygon(
      0% 0%,
      0% 100%,
      ${targetRect.left - 8}px 100%,
      ${targetRect.left - 8}px ${targetRect.top - 8}px,
      ${targetRect.right + 8}px ${targetRect.top - 8}px,
      ${targetRect.right + 8}px ${targetRect.bottom + 8}px,
      ${targetRect.left - 8}px ${targetRect.bottom + 8}px,
      ${targetRect.left - 8}px 100%,
      100% 100%,
      100% 0%
    )`
  } : {};

  return (
    <>
      {/* Main overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-all duration-300 ease-out animate-in fade-in-0",
          "z-[9998] pointer-events-none",
          className
        )}
        style={spotlightStyle}
      />

      {/* Spotlight glow effect */}
      {targetRect && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: targetRect.left - 12,
            top: targetRect.top - 12,
            width: targetRect.width + 24,
            height: targetRect.height + 24,
            background: 'transparent',
            border: '2px solid hsl(var(--garden-green))',
            borderRadius: '8px',
            boxShadow: `
              0 0 0 4px hsl(var(--garden-green) / 0.3),
              0 0 20px hsl(var(--garden-green) / 0.4),
              0 0 40px hsl(var(--garden-green) / 0.2)
            `,
            animation: 'pulse 2s infinite'
          }}
        />
      )}

      {/* Global styles for highlight effect */}
      <style>{`
        @keyframes pulse {
          0% {
            box-shadow:
              0 0 0 4px hsl(var(--garden-green) / 0.3),
              0 0 20px hsl(var(--garden-green) / 0.4),
              0 0 40px hsl(var(--garden-green) / 0.2);
          }
          50% {
            box-shadow:
              0 0 0 8px hsl(var(--garden-green) / 0.2),
              0 0 30px hsl(var(--garden-green) / 0.6),
              0 0 60px hsl(var(--garden-green) / 0.3);
          }
          100% {
            box-shadow:
              0 0 0 4px hsl(var(--garden-green) / 0.3),
              0 0 20px hsl(var(--garden-green) / 0.4),
              0 0 40px hsl(var(--garden-green) / 0.2);
          }
        }

        .onboarding-highlight {
          transition: all 0.3s ease-out;
        }

        /* Accessibility: Respect user preferences */
        @media (prefers-reduced-motion: reduce) {
          .onboarding-highlight {
            animation: none !important;
          }

          .onboarding-overlay {
            transition: none !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .onboarding-highlight {
            border: 3px solid currentColor !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </>
  );
}