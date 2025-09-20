import * as React from 'react';
import { X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TherapistData } from '@/components/molecules/therapist-card';

interface DecisionButtonsProps {
  therapist: TherapistData;
  onPass: (therapist: TherapistData) => void;
  onSave: (therapist: TherapistData) => void;
}

export function DecisionButtons({ therapist, onPass, onSave }: DecisionButtonsProps) {
  return (
    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-6">
      <Button
        size="icon"
        onClick={() => onPass(therapist)}
        className="h-20 w-20 rounded-full bg-[hsl(var(--btn-accent-bg))] text-[hsl(var(--btn-accent-text))] shadow-lg hover:brightness-95"
        aria-label="Pass on this therapist"
      >
        <X className="h-10 w-10" />
      </Button>
      <Button
        size="icon"
        onClick={() => onSave(therapist)}
        className="h-20 w-20 rounded-full bg-[hsl(var(--btn-primary-bg))] text-[hsl(var(--btn-primary-text))] shadow-lg hover:brightness-95"
        aria-label="Save to favorites"
      >
        <Heart className="h-9 w-9" />
      </Button>
    </div>
  );
}
