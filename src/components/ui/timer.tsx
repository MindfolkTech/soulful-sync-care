import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
  duration: number; // in seconds
  onComplete?: () => void;
  showWarningAt?: number; // seconds remaining to show warning
  className?: string;
}

const Timer = React.forwardRef<HTMLDivElement, TimerProps>(
  ({ duration, onComplete, showWarningAt = 60, className, ...props }, ref) => {
    const [timeRemaining, setTimeRemaining] = React.useState(duration);
    const [isRunning, setIsRunning] = React.useState(false);

    React.useEffect(() => {
      if (!isRunning || timeRemaining <= 0) return;

      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [isRunning, timeRemaining, onComplete]);

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const isWarning = timeRemaining <= showWarningAt;
    const isCritical = timeRemaining <= 30;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center min-h-touch-min px-4 py-2 rounded-md font-mono text-lg font-semibold transition-colors",
          isCritical 
            ? "bg-error text-error-foreground" 
            : isWarning 
            ? "bg-warning text-warning-foreground"
            : "bg-success text-success-foreground",
          className
        )}
        {...props}
      >
        <span className="tabular-nums">{formatTime(timeRemaining)}</span>
      </div>
    );
  }
);
Timer.displayName = "Timer";

export { Timer };
