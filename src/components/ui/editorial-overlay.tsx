import * as React from "react";
import { cn } from "@/lib/utils";
import { SvgShape } from "./svg-shapes";

// MindFolk Personality Rules for Editorial Overlays
type PersonalityRule = "personality:warm" | "personality:calm" | "personality:direct" | "affinity:multilingual" | "default";

interface EditorialOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  rule?: PersonalityRule;
  shape?: "blobby" | "oval" | "arch";
  fillColor?: string;
}

const personalityRules = {
  "personality:warm": { shape: "blobby" as const, fillColor: "hsl(var(--soft-blush))" },
  "personality:calm": { shape: "oval" as const, fillColor: "hsl(var(--soft-sage))" },
  "personality:direct": { shape: "arch" as const, fillColor: "hsl(var(--soft-blue))" },
  "affinity:multilingual": { shape: "oval" as const, fillColor: "hsl(var(--soft-lavender))" },
  "default": { shape: "blobby" as const, fillColor: "hsl(var(--soft-sage))" }
};

const EditorialOverlay = React.forwardRef<HTMLDivElement, EditorialOverlayProps>(
  ({ className, rule = "default", shape, fillColor, children, ...props }, ref) => {
    const config = personalityRules[rule];
    const finalShape = shape || config.shape;
    const finalFillColor = fillColor || config.fillColor;

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        <SvgShape
          shape={finalShape}
          fillColor={finalFillColor}
          className="w-full h-full"
        >
          {children}
        </SvgShape>
      </div>
    );
  }
);
EditorialOverlay.displayName = "EditorialOverlay";

export { EditorialOverlay };