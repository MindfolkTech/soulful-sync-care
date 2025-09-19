/**
 * MindFolk Personality-First Therapy Matching Algorithm
 * Based on JSON specification with weighted scoring factors
 */

export interface MatchingWeights {
  personality_compatibility: number; // 0.40
  identity_affirming: number; // 0.20
  specialty_match: number; // 0.20
  modality_preferences: number; // 0.15
  availability_fit: number; // 0.05
}

export interface ClientAssessment {
  communication_preferences: string[];
  language_preferences: string[];
  identity_preferences: string[];
  therapy_goals: string[];
  therapy_modalities: string[];
  therapist_gender_preference?: string;
  budget_range: [number, number];
  experience_preference: string;
  preferred_times: string[];
  age_group: string;
  prefers_similar_age?: boolean;
  cultural_identity: string[];
  prefers_cultural_background_match?: boolean;
}

export interface TherapistProfile {
  id: string;
  // Matching algorithm fields
  personality_tags: string[];
  languages: string[];
  identity_tags: string[];
  specialties: string[];
  modalities: string[];
  gender_identity: string;
  session_rates: Record<string, number>;
  years_experience: string;
  availability: Record<string, string[]>;
  age_group: string;
  cultural_background: string[];
  is_verified: boolean;
  is_active: boolean;
  
  // UI component fields (for backward compatibility)
  firstName?: string;
  lastName?: string;
  title?: string;
  bio?: string;
  location?: string;
  experience?: string[];
  education?: string[];
  certifications?: string[];
  rate45min?: number;
  rate60min?: number;
  cancellationPolicy?: string;
  offersVideo?: boolean;
  offersPhone?: boolean;
  videoUrl?: string;
}

export interface MatchResult {
  therapist_id: string;
  compatibility_score: number;
  breakdown: {
    personality_compatibility: number;
    identity_affirming: number;
    specialty_match: number;
    modality_preferences: number;
    availability_fit: number;
  };
  hard_filter_passed: boolean;
  conditional_filters_passed: boolean;
}

export const MATCHING_WEIGHTS: MatchingWeights = {
  personality_compatibility: 0.40,
  identity_affirming: 0.20,
  specialty_match: 0.20,
  modality_preferences: 0.15,
  availability_fit: 0.05,
};

/**
 * Normalize string for exact matching
 */
function normalize(v: string): string {
  return v.trim().toLowerCase();
}

/**
 * Exact, normalized overlap: fraction of client prefs satisfied (0..1)
 */
function calculateOverlapExact(client: string[], therapist: string[]): number {
  if (!client?.length || !therapist?.length) return 0;
  const c = new Set(client.map(normalize));
  const t = new Set(therapist.map(normalize));
  let hits = 0;
  for (const x of c) if (t.has(x)) hits++;
  return hits / c.size;
}

/**
 * Calculate overlap between two arrays (any overlap)
 */
function calculateOverlapAny(clientPrefs: string[], therapistAttrs: string[]): number {
  if (!clientPrefs.length || !therapistAttrs.length) return 0;
  
  const intersection = clientPrefs.filter(pref => 
    therapistAttrs.some(attr => attr.toLowerCase().includes(pref.toLowerCase()))
  ).length;
  
  return intersection / clientPrefs.length;
}

/**
 * Check exact match requirement (for languages)
 */
function checkExactMatchRequired(clientPrefs: string[], therapistAttrs: string[]): boolean {
  if (!clientPrefs.length) return true; // No preference means no requirement
  
  return clientPrefs.some(pref => 
    therapistAttrs.some(attr => attr.toLowerCase() === pref.toLowerCase())
  );
}

/**
 * Check gender preference filter
 */
function checkGenderPreferenceFilter(
  clientPreference?: string,
  therapistGender?: string
): boolean {
  if (!clientPreference || clientPreference === 'no preference') return true;
  if (!therapistGender) return false;
  
  return therapistGender.toLowerCase() === clientPreference.toLowerCase();
}

/**
 * Check if budget filter is active (client set a budget)
 */
function checkBudgetIsActive(budget?: [number, number]): boolean {
  if (!budget) return false;
  const [, maxB] = budget;
  return (maxB ?? 0) > 0; // treat as "set" when max > 0
}

/**
 * Check budget hard filter
 */
function checkBudgetHardFilter(
  clientBudget: [number, number],
  therapistRates: Record<string, number>
): boolean {
  if (!checkBudgetIsActive(clientBudget)) return true;
  const [minB, maxB] = clientBudget;
  const rates = Object.values(therapistRates || {});
  if (!rates.length) return false;
  return rates.some(r => r >= minB && r <= maxB);
}

/**
 * Check budget compatibility
 */
function checkBudgetCompatibility(
  clientBudget: [number, number],
  therapistRates: Record<string, number>
): number {
  const [minBudget, maxBudget] = clientBudget;
  const rates = Object.values(therapistRates);
  
  if (rates.length === 0) return 0;
  
  const affordableRates = rates.filter(rate => rate >= minBudget && rate <= maxBudget);
  return affordableRates.length / rates.length;
}

/**
 * Calculate experience level compatibility
 */
function calculateExperienceMatch(
  clientPreference: string,
  therapistExperience: string
): number {
  const experienceMapping: Record<string, string[]> = {
    'new_therapist': ['0-2 years', '2-5 years'],
    'experienced': ['5-10 years', '10+ years'],
    'very_experienced': ['10+ years'],
    'no_preference': ['0-2 years', '2-5 years', '5-10 years', '10+ years'],
  };
  
  const acceptableExperience = experienceMapping[clientPreference] || [];
  return acceptableExperience.includes(therapistExperience) ? 1 : 0;
}

/**
 * Calculate availability overlap
 */
function calculateAvailabilityFit(
  clientTimes: string[],
  therapistAvailability: Record<string, string[]>
): number {
  if (!clientTimes.length) return 1; // No preference
  
  const allTherapistSlots = Object.values(therapistAvailability).flat();
  const overlap = clientTimes.filter(time => allTherapistSlots.includes(time)).length;
  
  return overlap / clientTimes.length;
}

/**
 * Calculate age similarity bonus
 */
function calculateAgeSimilarity(
  clientAge: string,
  therapistAge: string,
  prefersMatch: boolean = false
): number {
  if (!prefersMatch) return 0;
  if (clientAge === therapistAge) return 1;
  
  // Adjacent age groups get partial score
  const ageOrder = ['18–24', '25–34', '35–44', '45–54', '55+'];
  const clientIndex = ageOrder.indexOf(clientAge);
  const therapistIndex = ageOrder.indexOf(therapistAge);
  
  if (clientIndex === -1 || therapistIndex === -1) return 0;
  
  const distance = Math.abs(clientIndex - therapistIndex);
  return distance === 1 ? 0.5 : 0;
}

/**
 * Calculate cultural background compatibility
 */
function calculateCulturalMatch(
  clientCultural: string[],
  therapistCultural: string[],
  prefersMatch: boolean = false
): number {
  if (!prefersMatch || !clientCultural.length) return 0;
  
  return calculateOverlapAny(clientCultural, therapistCultural);
}

/**
 * Main matching function - calculates compatibility score between client and therapist
 */
export function calculateMatch(
  assessment: ClientAssessment,
  therapist: TherapistProfile
): MatchResult {
  // Hard filters - must pass
  const languageMatch = checkExactMatchRequired(
    assessment.language_preferences,
    therapist.languages
  );
  
  if (!languageMatch) {
    return {
      therapist_id: therapist.id,
      compatibility_score: 0,
      breakdown: {
        personality_compatibility: 0,
        identity_affirming: 0,
        specialty_match: 0,
        modality_preferences: 0,
        availability_fit: 0,
      },
      hard_filter_passed: false,
      conditional_filters_passed: false,
    };
  }

  // Budget hard filter
  const budgetOk = checkBudgetHardFilter(assessment.budget_range, therapist.session_rates);
  if (!budgetOk) {
    return {
      therapist_id: therapist.id,
      compatibility_score: 0,
      breakdown: {
        personality_compatibility: 0,
        identity_affirming: 0,
        specialty_match: 0,
        modality_preferences: 0,
        availability_fit: 0,
      },
      hard_filter_passed: false,
      conditional_filters_passed: false,
    };
  }

  // Conditional filters
  const genderMatch = checkGenderPreferenceFilter(
    assessment.therapist_gender_preference,
    therapist.gender_identity
  );

  const identityMatch = assessment.identity_preferences.length === 0 || 
    calculateOverlapExact(assessment.identity_preferences, therapist.identity_tags) > 0;

  if (!genderMatch || !identityMatch) {
    return {
      therapist_id: therapist.id,
      compatibility_score: 0,
      breakdown: {
        personality_compatibility: 0,
        identity_affirming: 0,
        specialty_match: 0,
        modality_preferences: 0,
        availability_fit: 0,
      },
      hard_filter_passed: true,
      conditional_filters_passed: false,
    };
  }

  // Calculate weighted scores
  const personalityScore = calculateOverlapExact(
    assessment.communication_preferences,
    therapist.personality_tags
  );

  const identityScore = calculateOverlapExact(
    assessment.identity_preferences,
    therapist.identity_tags
  );

  const specialtyScore = calculateOverlapExact(
    assessment.therapy_goals,
    therapist.specialties
  );

  const modalityScore = calculateOverlapExact(
    assessment.therapy_modalities,
    therapist.modalities
  );

  const availabilityScore = calculateAvailabilityFit(
    assessment.preferred_times,
    therapist.availability
  );

  // Calculate preference boosts
  const ageSimilarityBoost = calculateAgeSimilarity(
    assessment.age_group,
    therapist.age_group,
    assessment.prefers_similar_age
  );

  const culturalBoost = calculateCulturalMatch(
    assessment.cultural_identity,
    therapist.cultural_background,
    assessment.prefers_cultural_background_match
  );

  const experienceBoost = calculateExperienceMatch(
    assessment.experience_preference,
    therapist.years_experience
  );

  // Calculate final weighted score
  const breakdown = {
    personality_compatibility: personalityScore,
    identity_affirming: identityScore,
    specialty_match: specialtyScore,
    modality_preferences: modalityScore,
    availability_fit: availabilityScore,
  };

  let compatibilityScore = 
    breakdown.personality_compatibility * MATCHING_WEIGHTS.personality_compatibility +
    breakdown.identity_affirming * MATCHING_WEIGHTS.identity_affirming +
    breakdown.specialty_match * MATCHING_WEIGHTS.specialty_match +
    breakdown.modality_preferences * MATCHING_WEIGHTS.modality_preferences +
    breakdown.availability_fit * MATCHING_WEIGHTS.availability_fit;

  // Add preference boosts (up to 10% additional score)
  const boostScore = (ageSimilarityBoost + culturalBoost + experienceBoost) / 3 * 0.1;
  compatibilityScore = Math.min(1, compatibilityScore + boostScore);

  // Convert to 0-100 scale
  const finalScore = Math.round(compatibilityScore * 100);

  return {
    therapist_id: therapist.id,
    compatibility_score: finalScore,
    breakdown,
    hard_filter_passed: true,
    conditional_filters_passed: true,
  };
}

/**
 * Find matching therapists for a client
 */
export function findMatches(
  assessment: ClientAssessment,
  therapists: TherapistProfile[],
  options: {
    minScore?: number;
    maxResults?: number;
    diversityRanking?: boolean;
  } = {}
): MatchResult[] {
  const { minScore = 60, maxResults = 20, diversityRanking = true } = options;

  // Filter active and verified therapists
  const activeTherapists = therapists.filter(t => t.is_active && t.is_verified);

  // Calculate matches
  let matches = activeTherapists
    .map(therapist => calculateMatch(assessment, therapist))
    .filter(match => 
      match.hard_filter_passed && 
      match.conditional_filters_passed &&
      match.compatibility_score >= minScore
    )
    .sort((a, b) => b.compatibility_score - a.compatibility_score);

  // Apply diversity ranking to prevent same therapist dominance
  if (diversityRanking && matches.length > 5) {
    // Implementation could shuffle top matches to promote diversity
    const topMatches = matches.slice(0, 5);
    const remainingMatches = matches.slice(5);
    
    matches = [...topMatches, ...remainingMatches];
  }

  return matches.slice(0, maxResults);
}

/**
 * Mock data for development
 */
export const mockTherapists: TherapistProfile[] = [
  {
    id: '1',
    personality_tags: ['empathetic', 'structured', 'goal-oriented'],
    languages: ['English', 'Spanish'],
    identity_tags: ['LGBTQ+ affirming', 'culturally sensitive'],
    specialties: ['anxiety', 'depression', 'trauma'],
    modalities: ['CBT', 'EMDR'],
    gender_identity: 'female',
    session_rates: { '60min': 80, '90min': 120 },
    years_experience: '5-10 years',
    availability: { monday: ['10:00', '14:00'], tuesday: ['09:00', '15:00'] },
    age_group: '35–44',
    cultural_background: ['British', 'Hispanic'],
    is_verified: true,
    is_active: true,
  },
  {
    id: '2',
    personality_tags: ['flexible', 'exploratory', 'calm'],
    languages: ['English', 'French'],
    identity_tags: ['neurodiversity affirming', 'trauma-informed'],
    specialties: ['relationships', 'self-discovery', 'work stress'],
    modalities: ['psychodynamic', 'mindfulness'],
    gender_identity: 'male',
    session_rates: { '60min': 70, '90min': 100 },
    years_experience: '2-5 years',
    availability: { wednesday: ['11:00', '16:00'], thursday: ['10:00', '17:00'] },
    age_group: '25–34',
    cultural_background: ['British', 'French'],
    is_verified: true,
    is_active: true,
  },
];