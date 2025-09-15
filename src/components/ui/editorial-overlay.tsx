import * as React from "react";
import { cn } from "@/lib/utils";

type OverlayRule = "personality:warm" | "personality:calm" | "personality:direct" | "affinity:multilingual" | "default";

const OVERLAY_CONFIGS: Record<OverlayRule, { clipPath: string; fillColor: string; line: string; lineColor: string }> = {
  "personality:warm": { 
    clipPath: "clip-blobby", 
    fillColor: "hsl(var(--soft-blush))", 
    line: "line-spark", 
    lineColor: "hsl(var(--elated-emerald))" 
  },
  "personality:calm": { 
    clipPath: "clip-oval", 
    fillColor: "hsl(var(--soft-sage))", 
    line: "line-wave", 
    lineColor: "hsl(var(--elated-emerald))" 
  },
  "personality:direct": { 
    clipPath: "clip-arch", 
    fillColor: "hsl(var(--soft-blue))", 
    line: "line-brkt", 
    lineColor: "hsl(var(--elated-emerald))" 
  },
  "affinity:multilingual": { 
    clipPath: "clip-oval", 
    fillColor: "hsl(var(--soft-lavender))", 
    line: "line-ul", 
    lineColor: "hsl(var(--elated-emerald))" 
  },
  "default": { 
    clipPath: "clip-blobby", 
    fillColor: "hsl(var(--soft-sage))", 
    line: "line-spark", 
    lineColor: "hsl(var(--elated-emerald))" 
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
        "relative aspect-square overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Background fill */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: config.fillColor }}
      />
      
      {/* Organically masked image */}
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          clipPath: `url(#${config.clipPath})`,
          WebkitClipPath: `url(#${config.clipPath})`
        }}
      />
      
      {/* Decorative line overlay */}
      <svg 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          opacity: 0.7, 
          zIndex: 2
        }}
        aria-hidden="true"
      >
        <use 
          href={`#${config.line}`} 
          stroke={config.lineColor}
          fill="none" 
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}