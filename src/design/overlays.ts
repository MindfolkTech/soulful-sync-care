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

export function normalizeTag(label: string) {
  return label.toLowerCase().split(/[^\w]+/).find(Boolean) || "";
}

export function pickOverlay(
  clientPrefs: string[] | null,
  therapistTags: string[] | null
) {
  const prefs = (clientPrefs || []).map(normalizeTag);
  const tags  = (therapistTags || []).map(normalizeTag);

  const matched = OVERLAY_RULE_ORDER.filter(k => prefs.includes(k) && tags.includes(k));
  const primary: RuleKey = (matched[0] as RuleKey) || "_default";
  const secondary = matched[1];

  const base = OVERLAY_RULES[primary];
  const lineOpacity = secondary ? 0.95 : 0.80; // stronger line if ≥2 matches

  return { ...base, lineOpacity };
}