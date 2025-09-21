import { useEffect, useCallback } from "react";
import { TherapistData } from "@/components/molecules/therapist-card";

interface UseKeyboardNavigationProps {
  therapists: TherapistData[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onPass: (therapist: TherapistData) => void;
  onSave: (therapist: TherapistData) => void;
  onShowDetails: (therapist: TherapistData) => void;
  onOpenFilters: () => void;
}

export function useKeyboardNavigation({
  therapists,
  currentIndex,
  onNext,
  onPrevious,
  onPass,
  onSave,
  onShowDetails,
  onOpenFilters
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const currentTherapist = therapists[currentIndex];
    if (!currentTherapist) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        onPass(currentTherapist);
        break;
      case 'ArrowRight':
        event.preventDefault();
        onSave(currentTherapist);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onShowDetails(currentTherapist);
        break;
      case 'f':
      case 'F':
        event.preventDefault();
        onOpenFilters();
        break;
    }
  }, [therapists, currentIndex, onPass, onSave, onShowDetails, onOpenFilters]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
