import { useCallback, useRef } from "react";

export function useAriaLive() {
  const ariaLiveRef = useRef<HTMLDivElement | null>(null);

  const announce = useCallback((message: string) => {
    if (ariaLiveRef.current) {
      ariaLiveRef.current.textContent = message;
      // Clear after a delay to allow for repeated identical messages
      setTimeout(() => {
        if (ariaLiveRef.current) {
          ariaLiveRef.current.textContent = "";
        }
      }, 1000);
    }
  }, []);

  return { 
    announce, 
    ariaLiveRef,
    ariaLiveProps: {
      ref: ariaLiveRef,
      "aria-live": "polite" as const,
      "aria-atomic": "true" as const,
      className: "sr-only"
    }
  };
}