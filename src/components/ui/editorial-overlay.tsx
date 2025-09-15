import * as React from "react";
import { cn } from "@/lib/utils";

interface EditorialOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "organic-1" | "organic-2" | "organic-3" | "circle" | "none";
  decorative?: boolean;
}

const EditorialOverlay = React.forwardRef<HTMLDivElement, EditorialOverlayProps>(
  ({ className, shape = "organic-1", decorative = false, children, ...props }, ref) => {
    const shapeClasses = {
      "organic-1": "clip-path-[polygon(20%_0%,80%_0%,100%_30%,100%_70%,80%_100%,20%_100%,0%_70%,0%_30%)]",
      "organic-2": "clip-path-[polygon(30%_0%,70%_0%,100%_20%,100%_80%,70%_100%,30%_100%,0%_80%,0%_20%)]",
      "organic-3": "clip-path-[polygon(25%_0%,75%_0%,100%_25%,100%_75%,75%_100%,25%_100%,0%_75%,0%_25%)]",
      "circle": "clip-path-[circle(50%_at_50%_50%)]",
      "none": ""
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          shapeClasses[shape],
          decorative && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-transparent before:z-10",
          className
        )}
        {...props}
      >
        {children}
        {decorative && (
          <div className="absolute inset-0 z-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20,80 Q50,60 80,80 T120,80"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
                className="text-primary"
              />
              <circle cx="75" cy="25" r="1" fill="currentColor" opacity="0.4" className="text-primary" />
              <circle cx="25" cy="75" r="1.5" fill="currentColor" opacity="0.3" className="text-primary" />
            </svg>
          </div>
        )}
      </div>
    );
  }
);
EditorialOverlay.displayName = "EditorialOverlay";

export { EditorialOverlay };