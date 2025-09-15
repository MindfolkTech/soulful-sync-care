import * as React from "react";
import { cn } from "@/lib/utils";

type OverlayRule = "personality:warm" | "personality:calm" | "personality:direct" | "affinity:multilingual" | "default";

const OVERLAY_CONFIGS: Record<OverlayRule, { fill: string; fillColor: string; line: string; lineColor: string }> = {
  "personality:warm": { 
    fill: "fill-blobby", 
    fillColor: "var(--soft-blush)", 
    line: "line-spark", 
    lineColor: "var(--elated-emerald)" 
  },
  "personality:calm": { 
    fill: "fill-oval", 
    fillColor: "var(--soft-sage)", 
    line: "line-wave", 
    lineColor: "var(--elated-emerald)" 
  },
  "personality:direct": { 
    fill: "fill-arch", 
    fillColor: "var(--soft-blue)", 
    line: "line-brkt", 
    lineColor: "var(--elated-emerald)" 
  },
  "affinity:multilingual": { 
    fill: "fill-oval", 
    fillColor: "var(--soft-lavender)", 
    line: "line-ul", 
    lineColor: "var(--elated-emerald)" 
  },
  "default": { 
    fill: "fill-blobby", 
    fillColor: "var(--soft-sage)", 
    line: "line-spark", 
    lineColor: "var(--elated-emerald)" 
  },
};

interface EditorialOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  overlayRule?: OverlayRule;
  className?: string;
}

export function EditorialOverlay({
  src,
  alt,
  overlayRule = "default",
  className,
  ...props
}: EditorialOverlayProps) {
  const config = OVERLAY_CONFIGS[overlayRule];

  return (
    <div 
      className={cn(
        "relative overflow-hidden", 
        "rounded-[var(--radius-lg)]",
        className
      )}
      style={{ borderRadius: "var(--radius-lg)" }}
      {...props}
    >
      <img 
        src={src} 
        alt={alt} 
        className="block w-full h-full object-cover" 
      />
      
      {/* Fill overlay */}
      <svg 
        className="absolute inset-0 pointer-events-none" 
        style={{ opacity: 0.9, zIndex: 1 }}
        aria-hidden="true"
      >
        <use 
          href={`#${config.fill}`} 
          fill={`hsl(${config.fillColor})`}
        />
      </svg>
      
      {/* Line overlay */}
      <svg 
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-in-out" 
        style={{ 
          opacity: 0.8, 
          zIndex: 2,
          transition: "var(--motion-swipe)"
        }}
        aria-hidden="true"
      >
        <use 
          href={`#${config.line}`} 
          stroke={`hsl(${config.lineColor})`}
          fill="none" 
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}