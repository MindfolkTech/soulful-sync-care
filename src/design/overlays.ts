// src/design/overlays.ts
export type RuleKey =
  | "empathetic" | "calm" | "structured" | "exploratory"
  | "pragmatic" | "motivational" | "direct" | "flexible" | "_default";

export const OVERLAY_RULE_ORDER: RuleKey[] = [
  "empathetic","calm","structured","exploratory",
  "pragmatic","motivational","direct","flexible"
];

export const OVERLAY_RULES: Record<RuleKey, {
  fill: "fill-blobby" | "fill-oval" | "fill-arch";
  fillColor: "--tag-personality-bg" | "--tag-modality-bg" | "--tag-specialty-bg" | "--tag-language-bg" | "--tag-misc-bg";
  line: "line-spark" | "line-wave" | "line-brkt" | "line-underline";
}> = {
  empathetic:   { fill: "fill-blobby", fillColor: "--tag-personality-bg", line: "line-spark" },
  calm:         { fill: "fill-oval",   fillColor: "--tag-modality-bg",    line: "line-wave" },
  structured:   { fill: "fill-arch",   fillColor: "--tag-specialty-bg",   line: "line-brkt" },
  exploratory:  { fill: "fill-blobby", fillColor: "--tag-language-bg",    line: "line-underline" },
  pragmatic:    { fill: "fill-oval",   fillColor: "--tag-modality-bg",    line: "line-brkt" },
  motivational: { fill: "fill-arch",   fillColor: "--tag-personality-bg", line: "line-spark" },
  direct:       { fill: "fill-arch",   fillColor: "--tag-specialty-bg",   line: "line-underline" },
  flexible:     { fill: "fill-blobby", fillColor: "--tag-misc-bg",        line: "line-wave" },
  _default:     { fill: "fill-oval",   fillColor: "--tag-modality-bg",    line: "line-wave" },
};

const COMMUNICATION_STYLE_MAP: Record<string, RuleKey> = {
  "empathetic and understanding": "empathetic",
  "empathetic": "empathetic",
  "understanding": "empathetic",
  "calm and process-focused": "calm",
  "calm": "calm",
  "process-focused": "calm",
  "structured and goal-oriented": "structured", 
  "structured": "structured",
  "goal-oriented": "structured",
  "exploratory and insight-based": "exploratory",
  "exploratory": "exploratory",
  "insight-based": "exploratory",
  "pragmatic and problem solving": "pragmatic",
  "pragmatic": "pragmatic",
  "problem solving": "pragmatic",
  "motivational and encouraging": "motivational",
  "motivational": "motivational",
  "encouraging": "motivational",
  "gently challenging and direct": "direct",
  "direct": "direct",
  "challenging": "direct",
  "flexible and adaptable": "flexible",
  "flexible": "flexible",
  "adaptable": "flexible",
};

export function normalizeTag(label: string): RuleKey | null {
  const normalized = label.toLowerCase().trim();
  return COMMUNICATION_STYLE_MAP[normalized] || null;
}

export function pickOverlay(
  clientPrefs: string[] | null,
  therapistTags: string[] | null
) {
  const prefs = (clientPrefs || []).map(normalizeTag).filter(Boolean) as RuleKey[];
  const tags = (therapistTags || []).map(normalizeTag).filter(Boolean) as RuleKey[];

  const matched = OVERLAY_RULE_ORDER.filter(k => prefs.includes(k) && tags.includes(k));
  const primary: RuleKey = (matched[0] as RuleKey) || "_default";
  const secondary = matched[1];

  const base = OVERLAY_RULES[primary];
  const lineOpacity = secondary ? 0.95 : 0.80; // stronger line if ≥2 matches

  return { ...base, lineOpacity };
}