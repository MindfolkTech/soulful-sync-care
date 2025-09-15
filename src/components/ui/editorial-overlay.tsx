import * as React from "react";
import { cn } from "@/lib/utils";

interface EditorialOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: "circle" | "oval-soft" | "oval-wide" | "rounded-square";
  background?: "peach" | "sage" | "lavender" | "cream" | "none";
}

const EditorialOverlay = React.forwardRef<HTMLDivElement, EditorialOverlayProps>(
  ({ className, shape = "circle", background = "none", children, ...props }, ref) => {
    const getShapeClasses = (shapeType: string) => {
      switch (shapeType) {
        case "circle":
          return "rounded-full aspect-square";
        case "oval-soft":
          return "rounded-[60%] aspect-[4/5]";
        case "oval-wide":
          return "rounded-[50%] aspect-[6/5]";
        case "rounded-square":
          return "rounded-3xl aspect-square";
        default:
          return "rounded-full aspect-square";
      }
    };

    const getBackgroundClasses = (bgType: string) => {
      switch (bgType) {
        case "peach":
          return "bg-gradient-to-br from-orange-100 to-pink-100";
        case "sage":
          return "bg-gradient-to-br from-green-100 to-emerald-100";
        case "lavender":
          return "bg-gradient-to-br from-purple-100 to-violet-100";
        case "cream":
          return "bg-gradient-to-br from-amber-50 to-orange-50";
        default:
          return "";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          getShapeClasses(shape),
          getBackgroundClasses(background),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
EditorialOverlay.displayName = "EditorialOverlay";

export { EditorialOverlay };