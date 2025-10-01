/**
 * Centralized format mapping for & ↔ and conversion
 * CRITICAL for maintaining matching algorithm compatibility
 *
 * The database stores "&" format as source of truth
 * The UI displays "and" format for better readability
 * This utility ensures consistent conversion between formats
 */

// Display format (user-facing) to Database format mapping
export const DISPLAY_TO_DB_MAP: Record<string, string> = {
  // Communication Styles - Therapist (4 options)
  "Supportive and Relational": "Supportive & Relational",
  "Motivational and Encouraging": "Motivational & Encouraging",
  "Pragmatic and Problem-solving": "Pragmatic & Problem-solving",
  "Flexible and Adaptive": "Flexible & Adaptive",

  // Session Formats - Therapist (4 options)
  "Structured and Goal-oriented": "Structured & Goal-oriented",
  "Exploratory and Insight-based": "Exploratory & Insight-based",
  "Interactive and Dynamic": "Interactive & Dynamic",
  "Calm and Process-Focused": "Calm & Process-Focused",

  // Client Communication Preferences (Assessment Screen 4)
  "Warm and empathetic": "Warm & empathetic",
  "Motivational and encouraging": "Motivational & encouraging",
  "Solution-oriented and practical": "Solution-oriented & practical",
  "Pragmatic and action-focused": "Pragmatic & action-focused",
  "Flexible and empathetic": "Flexible & empathetic",
  "Structured and goal-oriented": "Structured & goal-oriented",
  "Exploratory and insight-based": "Exploratory & insight-based",
  "Calm and gentle": "Calm & gentle",
  "Gently challenging": "Gently challenging",
  "I'm still figuring this out": "I'm still figuring this out" // No conversion needed
};

// Reverse mapping for database to display
export const DB_TO_DISPLAY_MAP: Record<string, string> = Object.entries(DISPLAY_TO_DB_MAP)
  .reduce((acc, [display, db]) => ({ ...acc, [db]: display }), {});

/**
 * Convert display format to database format
 * Used when saving to database or before matching
 *
 * @param displayValue - The user-facing "and" format string
 * @returns The database "&" format string
 */
export function toDbFormat(displayValue: string): string {
  if (!displayValue) return '';

  // First try exact match from our mapping
  if (DISPLAY_TO_DB_MAP[displayValue]) {
    return DISPLAY_TO_DB_MAP[displayValue];
  }

  // Handle values with descriptions (e.g., "Supportive and Relational (description...)")
  const baseValue = displayValue.split('(')[0].trim();
  if (DISPLAY_TO_DB_MAP[baseValue]) {
    // Preserve the description part if it exists
    const descriptionPart = displayValue.includes('(')
      ? displayValue.substring(displayValue.indexOf('('))
      : '';
    return DISPLAY_TO_DB_MAP[baseValue] + (descriptionPart ? ' ' + descriptionPart : '');
  }

  // Fallback: convert all "and" to "&"
  return displayValue.replace(/\s+and\s+/gi, ' & ');
}

/**
 * Convert database format to display format
 * Used when showing to users in UI
 *
 * @param dbValue - The database "&" format string
 * @returns The user-facing "and" format string
 */
export function toDisplayFormat(dbValue: string): string {
  if (!dbValue) return '';

  // Extract base value without description for lookup
  const baseValue = dbValue.split('(')[0].trim();

  // Try exact match first
  if (DB_TO_DISPLAY_MAP[baseValue]) {
    // Preserve the description part if it exists
    const descriptionPart = dbValue.includes('(')
      ? dbValue.substring(dbValue.indexOf('('))
      : '';
    return DB_TO_DISPLAY_MAP[baseValue] + (descriptionPart ? ' ' + descriptionPart : '');
  }

  // Fallback: convert all "&" to "and"
  return dbValue.replace(/\s*&\s*/g, ' and ');
}

/**
 * Normalize value for matching algorithm
 * Ensures consistent "&" format for parseStyleSentence()
 *
 * @param value - Any format string
 * @returns Normalized "&" format string
 */
export function normalizeForMatching(value: string): string {
  // Always convert to & format for algorithm consistency
  return toDbFormat(value);
}

/**
 * Batch conversion for arrays (display to database)
 *
 * @param displayValues - Array of display format strings
 * @returns Array of database format strings
 */
export function toDbFormatArray(displayValues: string[]): string[] {
  if (!displayValues || !Array.isArray(displayValues)) return [];
  return displayValues.map(toDbFormat);
}

/**
 * Batch conversion for arrays (database to display)
 *
 * @param dbValues - Array of database format strings
 * @returns Array of display format strings
 */
export function toDisplayFormatArray(dbValues: string[]): string[] {
  if (!dbValues || !Array.isArray(dbValues)) return [];
  return dbValues.map(toDisplayFormat);
}

/**
 * Check if a value needs conversion to database format
 *
 * @param value - The value to check
 * @returns True if the value contains "and" that should be "&"
 */
export function needsDbConversion(value: string): boolean {
  if (!value) return false;
  return value.includes(' and ') && !value.includes(' & ');
}

/**
 * Check if a value needs conversion to display format
 *
 * @param value - The value to check
 * @returns True if the value contains "&" that should be "and"
 */
export function needsDisplayConversion(value: string): boolean {
  if (!value) return false;
  return value.includes(' & ') && !value.includes(' and ');
}

/**
 * Validate that a value is in the correct database format
 *
 * @param value - The value to validate
 * @returns True if the value is in correct "&" format
 */
export function isDbFormat(value: string): boolean {
  if (!value) return true; // Empty is valid

  // Check if it's a known database format value
  const baseValue = value.split('(')[0].trim();
  return Object.values(DISPLAY_TO_DB_MAP).includes(baseValue) ||
         (value.includes(' & ') && !value.includes(' and '));
}

/**
 * Validate that a value is in the correct display format
 *
 * @param value - The value to validate
 * @returns True if the value is in correct "and" format
 */
export function isDisplayFormat(value: string): boolean {
  if (!value) return true; // Empty is valid

  // Check if it's a known display format value
  const baseValue = value.split('(')[0].trim();
  return Object.keys(DISPLAY_TO_DB_MAP).includes(baseValue) ||
         (value.includes(' and ') && !value.includes(' & '));
}