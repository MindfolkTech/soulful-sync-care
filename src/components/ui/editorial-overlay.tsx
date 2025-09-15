import * as React from "react";
import { cn } from "@/lib/utils";

type OverlayRule = {
  fill: "fill-blobby" | "fill-oval" | "fill-arch";
  fillColor: string;
  line: "line-spark" | "line-wave" | "line-brkt" | "line-underline";
};

const OVERLAY_RULES: Record<string, OverlayRule> = {
  "personality:warm": { fill: "fill-blobby", fillColor: "var(--soft-blush)", line: "line-spark" },
  "personality:calm": { fill: "fill-oval", fillColor: "var(--soft-sage)", line: "line-wave" },
  "personality:direct": { fill: "fill-arch", fillColor: "var(--soft-blue)", line: "line-brkt" },
  "affinity:multilingual": { fill: "fill-oval", fillColor: "var(--soft-lavender)", line: "line-underline" },
  "default": { fill: "fill-blobby", fillColor: "var(--soft-sage)", line: "line-spark" }
};

interface EditorialOverlayProps {
  src: string;
  alt: string;
  className?: string;
  overlayRule?: string;
  children?: React.ReactNode;
}

export function EditorialOverlay({ 
  src, 
  alt, 
  className, 
  overlayRule = "default",
  children 
}: EditorialOverlayProps) {
  const rule = OVERLAY_RULES[overlayRule] || OVERLAY_RULES.default;
  
  return (
    <div className={cn("relative overflow-hidden", className)} style={{ borderRadius: "var(--radius-lg)" }}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      
      {/* Fill Overlay */}
      <svg 
        className="absolute inset-0 pointer-events-none" 
        style={{ opacity: 0.95, zIndex: 1 }}
        aria-hidden="true"
      >
        <use href={`#${rule.fill}`} fill={rule.fillColor} />
      </svg>
      
      {/* Line Overlay */}
      <svg 
        className="absolute inset-0 pointer-events-none transition-opacity" 
        style={{ 
          opacity: 0.8, 
          zIndex: 2,
          transition: "var(--motion-swipe)"
        }}
        aria-hidden="true"
      >
        <use 
          href={`#${rule.line}`} 
          stroke="var(--elated-emerald)" 
          fill="none" 
          strokeWidth={2} 
        />
      </svg>
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 3 }}>
          {children}
        </div>
      )}
    </div>
  );
}