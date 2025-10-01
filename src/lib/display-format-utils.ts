/**
 * UI Display Utility Functions
 *
 * These utilities are for UI DISPLAY purposes ONLY.
 * They do NOT affect the matching algorithm or personality tag generation.
 *
 * For matching algorithm utilities, see: src/lib/matching.ts (parseStyleSentence)
 *
 * UK English: Converts "&" to "and" for display
 */

export interface ParsedStyleDisplay {
  label: string;
  description: string;
}

/**
 * Parses communication_style or session_format for UI DISPLAY ONLY
 *
 * Database format: "Label & Text (Description with & symbols)"
 * UI Display format: { label: "Label and Text", description: "Description with and symbols" }
 *
 * This function is for displaying the full label and description in the UI.
 * It does NOT affect matching algorithm or tag generation.
 *
 * @param value - The raw value from database (can be null/empty)
 * @returns Parsed label and description for display, or null if invalid
 *
 * @example
 * parseStyleForDisplay("Supportive & Relational (I focus on creating safety, trust, & emotional validation)")
 * // Returns: {
 * //   label: "Supportive and Relational",
 * //   description: "I focus on creating safety, trust, and emotional validation"
 * // }
 */
export function parseStyleForDisplay(value: string | null | undefined): ParsedStyleDisplay | null {
  if (!value || typeof value !== 'string' || value.trim() === '') {
    return null;
  }

  // Split by parentheses to separate label and description
  const match = value.match(/^([^(]+)\(([^)]+)\)$/);

  if (!match) {
    // If no parentheses found, treat entire string as label with no description
    return {
      label: value.replace(/&/g, 'and').trim(),
      description: ''
    };
  }

  const [, rawLabel, rawDescription] = match;

  return {
    label: rawLabel.replace(/&/g, 'and').trim(),
    description: rawDescription.replace(/&/g, 'and').trim()
  };
}
