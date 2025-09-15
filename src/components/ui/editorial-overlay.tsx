import * as React from "react";
import { cn } from "@/lib/utils";

interface EditorialOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "organic-1" | "organic-2" | "organic-3" | "circle" | "blob" | "none";
  decorative?: boolean;
}

const EditorialOverlay = React.forwardRef<HTMLDivElement, EditorialOverlayProps>(
  ({ className, shape = "organic-1", decorative = false, children, ...props }, ref) => {
    const getShapeStyle = (shapeType: string) => {
      switch (shapeType) {
        case "organic-1":
          return {
            clipPath: "polygon(20% 0%, 80% 0%, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0% 70%, 0% 30%)"
          };
        case "organic-2":
          return {
            clipPath: "polygon(30% 0%, 70% 0%, 100% 20%, 100% 80%, 70% 100%, 30% 100%, 0% 80%, 0% 20%)"
          };
        case "organic-3":
          return {
            clipPath: "polygon(25% 6.7%, 75% 6.7%, 89.1% 25%, 89.1% 75%, 75% 93.3%, 25% 93.3%, 10.9% 75%, 10.9% 25%)"
          };
        case "circle":
          return {
            clipPath: "circle(45% at 50% 50%)"
          };
        case "blob":
          return {
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          };
        default:
          return {};
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          decorative && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-transparent before:z-10",
          className
        )}
        style={getShapeStyle(shape)}
        {...props}
      >
        {children}
        {decorative && (
          <div className="absolute inset-0 z-20">
            <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20,80 Q50,60 80,80 T120,80"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
                className="text-primary"
              />
              <circle cx="75" cy="25" r="1" fill="currentColor" className="text-primary" />
              <circle cx="25" cy="75" r="1.5" fill="currentColor" className="text-primary" />
            </svg>
          </div>
        )}
      </div>
    );
  }
);
EditorialOverlay.displayName = "EditorialOverlay";

export { EditorialOverlay };