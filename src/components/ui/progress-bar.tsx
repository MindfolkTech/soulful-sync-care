import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number;
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    value, 
    max = 100, 
    showLabel = false, 
    label, 
    size = "md",
    className,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeClasses = {
      sm: "h-2",
      md: "h-3", 
      lg: "h-4",
    };

    return (
      <div
        ref={ref}
        className={cn("w-full", className)}
        {...props}
      >
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[hsl(var(--text-primary))]">
              {label || "Progress"}
            </span>
            <span className="text-sm text-[hsl(var(--text-secondary))]">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        
        <div 
          className={cn(
            "w-full bg-[hsl(var(--surface-accent))] rounded-full overflow-hidden",
            sizeClasses[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || "Progress"}
        >
          <div
            className="h-full bg-[hsl(var(--garden-green))] transition-progress rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
