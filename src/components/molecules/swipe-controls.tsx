import * as React from "react";
import { Button } from "@/components/ui/button";
import { X, Heart, Info, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeControlsProps {
  onPass: () => void;
  onSave: () => void;
  onInfo: () => void;
  onUndo?: () => void;
  disabled?: boolean;
  className?: string;
  showUndo?: boolean;
}

export function SwipeControls({ 
  onPass, 
  onSave, 
  onInfo, 
  onUndo, 
  disabled = false, 
  className,
  showUndo = false 
}: SwipeControlsProps) {
  return (
    <div className={cn(
      "flex items-center justify-center gap-4 p-6",
      className
    )}>
      {showUndo && onUndo && (
        <Button
          variant="tertiary"
          size="icon"
          onClick={onUndo}
          disabled={disabled}
          className="h-12 w-12 rounded-full border-2 border-text-secondary/20 hover:border-text-secondary/40 hover:bg-surface-accent"
          aria-label="Undo last action"
        >
          <RotateCcw className="h-5 w-5 text-text-secondary" />
        </Button>
      )}

      <Button
        variant="tertiary"
        size="icon"
        onClick={onPass}
        disabled={disabled}
        className="h-14 w-14 rounded-full border-2 border-destructive/20 hover:border-destructive hover:bg-destructive/10"
        aria-label="Pass on this therapist"
      >
        <X className="h-6 w-6 text-destructive" />
      </Button>

      <Button
        variant="tertiary"
        size="icon"
        onClick={onInfo}
        disabled={disabled}
        className="h-12 w-12 rounded-full border-2 border-btn-accent/20 hover:border-btn-accent hover:bg-btn-accent/10"
        aria-label="View therapist details"
      >
        <Info className="h-5 w-5 text-btn-accent" />
      </Button>

      <Button
        variant="tertiary"
        size="icon"
        onClick={onSave}
        disabled={disabled}
        className="h-14 w-14 rounded-full border-2 border-jovial-jade/20 hover:border-jovial-jade hover:bg-jovial-jade/10"
        aria-label="Save this therapist to favorites"
      >
        <Heart className="h-6 w-6 text-jovial-jade" />
      </Button>
    </div>
  );
}