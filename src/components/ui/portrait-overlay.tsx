import * as React from "react";
import { pickOverlay } from "@/design/overlays";

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
  const sel = overlayRuleKey
    ? { fill: overlayRuleKey, fillColor: "--tag-modality-bg", line: "line-wave", lineOpacity: 0.8 } // only for manual tests
    : pickOverlay(clientPrefs, personalityTags);

  return (
    <div className={`relative rounded-lg overflow-hidden ${className || ""}`}>
      <img src={src} alt={alt} className="block w-full h-full object-cover" />
      {/* Fill */}
      <svg className="absolute inset-0 pointer-events-none" style={{ opacity: 0.95 }}>
        <use href={`#${sel.fill}`} fill={`hsl(var(${sel.fillColor}))`} />
      </svg>
      {/* Line */}
      <svg className="absolute inset-0 pointer-events-none transition-[transform,opacity] duration-200 ease-in-out" style={{ opacity: sel.lineOpacity }}>
        <use href={`#${sel.line}`} stroke={`hsl(var(--elated-emerald))`} fill="none" strokeWidth={2} />
      </svg>
    </div>
  );
}