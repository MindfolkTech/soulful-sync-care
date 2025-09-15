import * as React from "react";
import { pickOverlay } from "@/design/overlays";

// Feature flag - set to true to enable editorial overlays
const EDITORIAL_OVERLAYS_ENABLED = true;

type Props = {
  src: string;
  alt: string;
  className?: string;
  clientPrefs?: string[] | null;       // assessment.communication_preferences
  personalityTags?: string[] | null;   // therapist_profiles.personality_tags
  // optional override:
  overlayRuleKey?: string;
};

export function PortraitOverlay({
  src, alt, className, clientPrefs = null, personalityTags = null, overlayRuleKey
}: Props) {
  // If feature flag is disabled, render plain image
  if (!EDITORIAL_OVERLAYS_ENABLED) {
    return (
      <div className={`relative overflow-hidden ${className || ""}`} style={{ borderRadius: "var(--radius-lg)" }}>
        <img src={src} alt={alt} className="block w-full h-full object-cover" />
      </div>
    );
  }

  const sel = overlayRuleKey
    ? { fill: overlayRuleKey, fillColor: "--tag-modality-bg", line: "line-wave", lineOpacity: 0.8 }
    : pickOverlay(clientPrefs, personalityTags);

  return (
    <div 
      className={`relative overflow-hidden ${className || ""}`} 
      style={{ borderRadius: "var(--radius-lg)", transition: "var(--motion-swipe)" }}
    >
      <img src={src} alt={alt} className="block w-full h-full object-cover" />
      {/* Fill */}
      <svg 
        className="absolute inset-0 pointer-events-none" 
        style={{ opacity: 0.95, zIndex: 1 }}
        aria-hidden="true"
      >
        <use href={`#${sel.fill}`} fill={`var(${sel.fillColor})`} />
      </svg>
      {/* Line */}
      <svg 
        className="absolute inset-0 pointer-events-none transition-[transform,opacity] duration-200 ease-in-out" 
        style={{ opacity: sel.lineOpacity, zIndex: 2 }}
        aria-hidden="true"
      >
        <use href={`#${sel.line}`} stroke={`var(--elated-emerald)`} fill="none" strokeWidth={2} />
      </svg>
    </div>
  );
}