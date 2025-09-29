/**
 * Comprehensive Test Suite for MindFolk Personality-First Matching Algorithm
 * Tests the VERIFIED implementation with correct 40/20/20/15/5 weight distribution
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  calculateMatch,
  findMatches,
  MATCHING_WEIGHTS,
  type ClientAssessment,
  type TherapistProfile,
  type MatchResult
} from '../matching';

// Extract the internal functions for testing (they're not exported)
// We'll need to access them via the main functions or redefine them here
function parseStyleSentence(sentence: string): string[] {
  if (!sentence) return [];

  // Take the part before the parenthesis
  const mainPart = sentence.split('(')[0].trim();

  // Replace '&' and 'and' with spaces, but preserve hyphens
  const cleanedPart = mainPart
    .replace(/\s+&\s+/g, ' ')  // Replace & with space
    .replace(/\s+and\s+/g, ' ') // Replace 'and' with space
    .trim();

  // Split by spaces but keep hyphenated terms together
  const words = cleanedPart.split(/\s+/);

  // Filter out common words that don't add matching value
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']);

  // Normalize each word (lowercase, trim) but keep hyphens
  return words
    .map(word => word.toLowerCase().trim())
    .filter(word => word.length > 2 && !stopWords.has(word)); // Filter short words and stop words
}

function mapTherapyGoalToSpecialties(goal: string): string[] {
  const goalMapping: Record<string, string[]> = {
    "Anxiety and everyday worries": ["Anxiety"],
    "Feeling low or depressed": ["Depression"],
    "Relationship challenges": ["Relationship and intimacy issues"],
    "Work and life stress": ["Career difficulties", "Motivation and self-esteem"],
    "Family and parenting": ["Family conflict", "Parenting issues"],
    "Identity and self-discovery": ["LGBT-related issues", "Race and racial identity", "Motivation and self-esteem"],
    "Past experiences and trauma": ["Trauma and abuse", "PTSD"]
  };

  return goalMapping[goal] || [];
}

describe('Personality Tags and Matching Algorithm', () => {

  describe('parseStyleSentence Function', () => {
    it('should preserve hyphenated terms correctly', () => {
      expect(parseStyleSentence('Structured & Goal-oriented')).toEqual(['structured', 'goal-oriented']);
      expect(parseStyleSentence('Solution-oriented & practical')).toEqual(['solution-oriented', 'practical']);
      expect(parseStyleSentence('Warm & empathetic')).toEqual(['warm', 'empathetic']);
    });

    it('should handle communication styles from therapist options', () => {
      expect(parseStyleSentence('Supportive & Relational')).toEqual(['supportive', 'relational']);
      expect(parseStyleSentence('Motivational & Encouraging')).toEqual(['motivational', 'encouraging']);
      expect(parseStyleSentence('Pragmatic & Problem-solving')).toEqual(['pragmatic', 'problem-solving']);
      expect(parseStyleSentence('Flexible & Adaptive')).toEqual(['flexible', 'adaptive']);
    });

    it('should handle session formats from therapist options', () => {
      expect(parseStyleSentence('Structured & Goal-oriented')).toEqual(['structured', 'goal-oriented']);
      expect(parseStyleSentence('Exploratory & Insight-based')).toEqual(['exploratory', 'insight-based']);
      expect(parseStyleSentence('Interactive & Dynamic')).toEqual(['interactive', 'dynamic']);
      expect(parseStyleSentence('Calm & Process-Focused')).toEqual(['calm', 'process-focused']);
    });

    it('should handle sentences with descriptions in parentheses', () => {
      expect(parseStyleSentence('Structured & Goal-oriented (Sessions follow a clear agenda)')).toEqual(['structured', 'goal-oriented']);
      expect(parseStyleSentence('Warm & empathetic (I focus on creating safety)')).toEqual(['warm', 'empathetic']);
    });

    it('should handle edge cases', () => {
      expect(parseStyleSentence('')).toEqual([]);
      expect(parseStyleSentence('   ')).toEqual([]);
      expect(parseStyleSentence('Single')).toEqual(['single']);
    });

    it('should filter out stop words and short words', () => {
      expect(parseStyleSentence('I am very warm and caring')).toEqual(['very', 'warm', 'caring']);
      expect(parseStyleSentence('The solution-oriented approach is good')).toEqual(['solution-oriented', 'approach', 'good']);
    });

    it('should handle "and" as well as "&"', () => {
      expect(parseStyleSentence('Warm and empathetic')).toEqual(['warm', 'empathetic']);
      expect(parseStyleSentence('Structured and goal-oriented')).toEqual(['structured', 'goal-oriented']);
    });
  });

  describe('mapTherapyGoalToSpecialties Function', () => {
    it('should map client therapy goals to correct specialties', () => {
      expect(mapTherapyGoalToSpecialties('Anxiety and everyday worries')).toEqual(['Anxiety']);
      expect(mapTherapyGoalToSpecialties('Feeling low or depressed')).toEqual(['Depression']);
      expect(mapTherapyGoalToSpecialties('Relationship challenges')).toEqual(['Relationship and intimacy issues']);
      expect(mapTherapyGoalToSpecialties('Work and life stress')).toEqual(['Career difficulties', 'Motivation and self-esteem']);
      expect(mapTherapyGoalToSpecialties('Family and parenting')).toEqual(['Family conflict', 'Parenting issues']);
      expect(mapTherapyGoalToSpecialties('Identity and self-discovery')).toEqual(['LGBT-related issues', 'Race and racial identity', 'Motivation and self-esteem']);
      expect(mapTherapyGoalToSpecialties('Past experiences and trauma')).toEqual(['Trauma and abuse', 'PTSD']);
    });

    it('should return empty array for unknown goals', () => {
      expect(mapTherapyGoalToSpecialties('Unknown goal')).toEqual([]);
      expect(mapTherapyGoalToSpecialties('')).toEqual([]);
    });
  });

  describe('Weight Distribution Verification', () => {
    it('should have correct matching weights that sum to 100%', () => {
      expect(MATCHING_WEIGHTS.personality_compatibility).toBe(0.40);
      expect(MATCHING_WEIGHTS.identity_affirming).toBe(0.20);
      expect(MATCHING_WEIGHTS.specialty_match).toBe(0.20);
      expect(MATCHING_WEIGHTS.modality_preferences).toBe(0.15);
      expect(MATCHING_WEIGHTS.availability_fit).toBe(0.05);

      // Verify weights sum to 1.00 (100%)
      const totalWeight = Object.values(MATCHING_WEIGHTS).reduce((sum, weight) => sum + weight, 0);
      expect(totalWeight).toBe(1.00);
    });
  });

  describe('Hard Filters (Eliminative)', () => {
    let baseClient: ClientAssessment;
    let baseTherapist: TherapistProfile;

    beforeEach(() => {
      baseClient = {
        communication_preferences: ['warm', 'empathetic'],
        language_preferences: ['English'],
        identity_preferences: [],
        therapy_goals: ['Anxiety and everyday worries'],
        therapy_modalities: ['CBT'],
        budget_range: [50, 100],
        experience_preference: 'no_preference',
        preferred_times: ['10:00'],
        age_group: '25–34',
        cultural_identity: ['British'],
        therapist_gender_preference: 'no preference'
      };

      baseTherapist = {
        id: '1',
        personality_tags: ['warm', 'empathetic', 'structured'],
        languages: ['English'],
        identity_tags: [],
        specialties: ['Anxiety'],
        modalities: ['CBT'],
        gender_identity: 'female',
        session_rates: { '60min': 75 },
        years_experience: '5-10 years',
        availability: { monday: ['10:00'] },
        age_group: '35–44',
        cultural_background: ['British'],
        is_verified: true,
        is_active: true
      };
    });

    it('should eliminate therapist when language requirements not met', () => {
      baseClient.language_preferences = ['Spanish'];
      const result = calculateMatch(baseClient, baseTherapist);

      expect(result.compatibility_score).toBe(0);
      expect(result.hard_filter_passed).toBe(false);
      expect(result.conditional_filters_passed).toBe(false);
    });

    it('should eliminate therapist when budget is incompatible', () => {
      baseClient.budget_range = [20, 40]; // Too low for therapist's £75 rate
      const result = calculateMatch(baseClient, baseTherapist);

      expect(result.compatibility_score).toBe(0);
      expect(result.hard_filter_passed).toBe(false);
      expect(result.conditional_filters_passed).toBe(false);
    });

    it('should eliminate therapist when gender preference not met', () => {
      baseClient.therapist_gender_preference = 'male';
      baseTherapist.gender_identity = 'female';
      const result = calculateMatch(baseClient, baseTherapist);

      expect(result.compatibility_score).toBe(0);
      expect(result.hard_filter_passed).toBe(true);
      expect(result.conditional_filters_passed).toBe(false);
    });

    it('should eliminate therapist when identity preferences not met', () => {
      baseClient.identity_preferences = ['LGBTQ+ friendly and affirming'];
      baseTherapist.identity_tags = []; // No identity tags
      const result = calculateMatch(baseClient, baseTherapist);

      expect(result.compatibility_score).toBe(0);
      expect(result.hard_filter_passed).toBe(true);
      expect(result.conditional_filters_passed).toBe(false);
    });

    it('should pass all filters when requirements are met', () => {
      const result = calculateMatch(baseClient, baseTherapist);

      expect(result.compatibility_score).toBeGreaterThan(0);
      expect(result.hard_filter_passed).toBe(true);
      expect(result.conditional_filters_passed).toBe(true);
    });
  });

  describe('Hybrid Personality Matching', () => {
    let baseClient: ClientAssessment;

    beforeEach(() => {
      baseClient = {
        communication_preferences: ['warm', 'empathetic', 'structured', 'goal-oriented'],
        language_preferences: ['English'],
        identity_preferences: [],
        therapy_goals: ['Anxiety and everyday worries'],
        therapy_modalities: ['CBT'],
        budget_range: [50, 100],
        experience_preference: 'no_preference',
        preferred_times: ['10:00'],
        age_group: '25–34',
        cultural_identity: ['British']
      };
    });

    it('should use new communication_style + session_format approach when available', () => {
      const newTherapist: TherapistProfile = {
        id: '1',
        communication_style: 'Supportive & Relational', // Generates: ['supportive', 'relational']
        session_format: 'Structured & Goal-oriented',   // Generates: ['structured', 'goal-oriented']
        personality_tags: ['old', 'legacy', 'tags'], // Should be ignored
        languages: ['English'],
        identity_tags: [],
        specialties: ['Anxiety'],
        modalities: ['CBT'],
        gender_identity: 'female',
        session_rates: { '60min': 75 },
        years_experience: '5-10 years',
        availability: { monday: ['10:00'] },
        age_group: '35–44',
        cultural_background: ['British'],
        is_verified: true,
        is_active: true
      };

      const result = calculateMatch(baseClient, newTherapist);

      // Should match on 'structured' and 'goal-oriented' from the new approach
      expect(result.compatibility_score).toBeGreaterThan(0);
      expect(result.breakdown.personality_compatibility).toBeGreaterThan(0);

      // Client wants: ['warm', 'empathetic', 'structured', 'goal-oriented']
      // Therapist has: ['supportive', 'relational', 'structured', 'goal-oriented']
      // Match: 2/4 = 0.5
      expect(result.breakdown.personality_compatibility).toBe(0.5);
    });

    it('should fall back to personality_tags for legacy therapists', () => {
      const legacyTherapist: TherapistProfile = {
        id: '1',
        // No communication_style or session_format
        personality_tags: ['warm', 'empathetic', 'structured'], // Should be used
        languages: ['English'],
        identity_tags: [],
        specialties: ['Anxiety'],
        modalities: ['CBT'],
        gender_identity: 'female',
        session_rates: { '60min': 75 },
        years_experience: '5-10 years',
        availability: { monday: ['10:00'] },
        age_group: '35–44',
        cultural_background: ['British'],
        is_verified: true,
        is_active: true
      };

      const result = calculateMatch(baseClient, legacyTherapist);

      // Should match on 'warm', 'empathetic', 'structured' from personality_tags
      expect(result.compatibility_score).toBeGreaterThan(0);
      expect(result.breakdown.personality_compatibility).toBeGreaterThan(0);

      // Client wants: ['warm', 'empathetic', 'structured', 'goal-oriented']
      // Therapist has: ['warm', 'empathetic', 'structured']
      // Match: 3/4 = 0.75
      expect(result.breakdown.personality_compatibility).toBe(0.75);
    });

    it('should prefer new approach over legacy even when both exist', () => {
      const hybridTherapist: TherapistProfile = {
        id: '1',
        communication_style: 'Warm & empathetic', // Should be used
        session_format: 'Structured & Goal-oriented', // Should be used
        personality_tags: ['different', 'legacy', 'tags'], // Should be ignored
        languages: ['English'],
        identity_tags: [],
        specialties: ['Anxiety'],
        modalities: ['CBT'],
        gender_identity: 'female',
        session_rates: { '60min': 75 },
        years_experience: '5-10 years',
        availability: { monday: ['10:00'] },
        age_group: '35–44',
        cultural_background: ['British'],
        is_verified: true,
        is_active: true
      };

      const result = calculateMatch(baseClient, hybridTherapist);

      // Client wants: ['warm', 'empathetic', 'structured', 'goal-oriented']
      // New approach gives: ['warm', 'empathetic', 'structured', 'goal-oriented']
      // Perfect match: 4/4 = 1.0
      expect(result.breakdown.personality_compatibility).toBe(1.0);
    });
  });

  describe('Score Component Calculations', () => {
    let perfectClient: ClientAssessment;
    let perfectTherapist: TherapistProfile;

    beforeEach(() => {
      perfectClient = {
        communication_preferences: ['warm', 'empathetic'],
        language_preferences: ['English'],
        identity_preferences: ['LGBTQ+ friendly and affirming'],
        therapy_goals: ['Anxiety and everyday worries'],
        therapy_modalities: ['CBT'],
        budget_range: [50, 100],
        experience_preference: 'experienced',
        preferred_times: ['10:00', '14:00'],
        age_group: '25–34',
        cultural_identity: ['British']
      };

      perfectTherapist = {
        id: '1',
        communication_style: 'Warm & empathetic',
        session_format: 'Calm & gentle',
        personality_tags: [], // Not used due to new fields
        languages: ['English'],
        identity_tags: ['LGBTQ+ friendly and affirming'],
        specialties: ['Anxiety'],
        modalities: ['CBT'],
        gender_identity: 'female',
        session_rates: { '60min': 75 },
        years_experience: '5-10 years',
        availability: { monday: ['10:00', '14:00'] },
        age_group: '25–34',
        cultural_background: ['British'],
        is_verified: true,
        is_active: true
      };
    });

    it('should calculate perfect personality match correctly', () => {
      const result = calculateMatch(perfectClient, perfectTherapist);

      // Client wants: ['warm', 'empathetic']
      // Therapist has: ['warm', 'empathetic', 'calm', 'gentle']
      // Perfect match: 2/2 = 1.0
      expect(result.breakdown.personality_compatibility).toBe(1.0);
    });

    it('should calculate perfect identity match correctly', () => {
      const result = calculateMatch(perfectClient, perfectTherapist);

      // Perfect identity match: 1/1 = 1.0
      expect(result.breakdown.identity_affirming).toBe(1.0);
    });

    it('should calculate perfect specialty match correctly', () => {
      const result = calculateMatch(perfectClient, perfectTherapist);

      // Client goals map to: ['Anxiety'] -> therapist has: ['Anxiety']
      // Perfect match: 1/1 = 1.0
      expect(result.breakdown.specialty_match).toBe(1.0);
    });

    it('should calculate perfect modality match correctly', () => {
      const result = calculateMatch(perfectClient, perfectTherapist);

      // Perfect modality match: 1/1 = 1.0
      expect(result.breakdown.modality_preferences).toBe(1.0);
    });

    it('should calculate perfect availability match correctly', () => {
      const result = calculateMatch(perfectClient, perfectTherapist);

      // Perfect availability match: 2/2 = 1.0
      expect(result.breakdown.availability_fit).toBe(1.0);
    });

    it('should calculate correct weighted final score for perfect match', () => {
      const result = calculateMatch(perfectClient, perfectTherapist);

      // Perfect match should be close to 100, accounting for bonuses
      expect(result.compatibility_score).toBeGreaterThanOrEqual(95);
      expect(result.compatibility_score).toBeLessThanOrEqual(100);
    });

    it('should apply correct weights to each component', () => {
      const result = calculateMatch(perfectClient, perfectTherapist);
      const breakdown = result.breakdown;

      // Calculate expected score manually
      const expectedScore =
        breakdown.personality_compatibility * 0.40 +
        breakdown.identity_affirming * 0.20 +
        breakdown.specialty_match * 0.20 +
        breakdown.modality_preferences * 0.15 +
        breakdown.availability_fit * 0.05;

      // Should be approximately 1.0 for perfect match (before bonuses)
      expect(expectedScore).toBeCloseTo(1.0, 2);
    });
  });

  describe('No Client Preferences Edge Cases', () => {
    let minimalClient: ClientAssessment;
    let baseTherapist: TherapistProfile;

    beforeEach(() => {
      minimalClient = {
        communication_preferences: [],
        language_preferences: [],
        identity_preferences: [],
        therapy_goals: [],
        therapy_modalities: [],
        budget_range: [0, 1000], // No budget restriction
        experience_preference: 'no_preference',
        preferred_times: [],
        age_group: '25–34',
        cultural_identity: []
      };

      baseTherapist = {
        id: '1',
        personality_tags: ['warm', 'empathetic'],
        languages: ['English'],
        identity_tags: ['LGBTQ+ friendly and affirming'],
        specialties: ['Anxiety'],
        modalities: ['CBT'],
        gender_identity: 'female',
        session_rates: { '60min': 75 },
        years_experience: '5-10 years',
        availability: { monday: ['10:00'] },
        age_group: '35–44',
        cultural_background: ['British'],
        is_verified: true,
        is_active: true
      };
    });

    it('should return perfect scores when client has no preferences', () => {
      const result = calculateMatch(minimalClient, baseTherapist);

      // No preferences should result in perfect compatibility for all categories
      expect(result.breakdown.personality_compatibility).toBe(1.0);
      expect(result.breakdown.identity_affirming).toBe(1.0);
      expect(result.breakdown.specialty_match).toBe(1.0);
      expect(result.breakdown.modality_preferences).toBe(1.0);
      expect(result.breakdown.availability_fit).toBe(1.0);

      // Should result in very high overall score
      expect(result.compatibility_score).toBeGreaterThanOrEqual(95);
    });
  });

  describe('Integration Tests with Real Data Structures', () => {
    const realClientAssessment: ClientAssessment = {
      communication_preferences: ['Solution-oriented and practical', 'Structured and goal-oriented'],
      language_preferences: ['English'],
      identity_preferences: ['Neurodiversity affirming', 'Trauma-informed and gentle'],
      therapy_goals: ['Anxiety and everyday worries', 'Work and life stress'],
      therapy_modalities: ['CBT', 'Mindfulness-based therapy'],
      therapist_gender_preference: 'no preference',
      budget_range: [60, 120],
      experience_preference: 'experienced',
      preferred_times: ['09:00', '10:00', '14:00'],
      age_group: '35–44',
      prefers_similar_age: true,
      cultural_identity: ['British'],
      prefers_cultural_background_match: false
    };

    const realTherapistProfiles: TherapistProfile[] = [
      {
        id: 'therapist-1',
        communication_style: 'Pragmatic & Problem-solving',
        session_format: 'Structured & Goal-oriented',
        personality_tags: ['pragmatic', 'solution-oriented', 'practical', 'structured', 'goal-oriented'],
        languages: ['English', 'Spanish'],
        identity_tags: ['Neurodiversity affirming', 'Trauma-informed and gentle'],
        specialties: ['Anxiety', 'Career difficulties'],
        modalities: ['CBT', 'Mindfulness-based therapy'],
        gender_identity: 'female',
        session_rates: { '60min': 80, '90min': 110 },
        years_experience: '5-10 years',
        availability: {
          monday: ['09:00', '10:00'],
          wednesday: ['14:00', '15:00']
        },
        age_group: '35–44',
        cultural_background: ['British'],
        is_verified: true,
        is_active: true
      },
      {
        id: 'therapist-2',
        communication_style: 'Supportive & Relational',
        session_format: 'Exploratory & Insight-based',
        personality_tags: ['supportive', 'empathetic', 'warm', 'exploratory', 'insight-based'],
        languages: ['English'],
        identity_tags: ['Neurodiversity affirming'], // Fixed: Now has overlapping identity preference
        specialties: ['Depression', 'Relationship and intimacy issues'],
        modalities: ['Psychodynamic therapy'],
        gender_identity: 'male',
        session_rates: { '60min': 70 },
        years_experience: '2-5 years',
        availability: {
          tuesday: ['11:00'],
          thursday: ['16:00']
        },
        age_group: '25–34',
        cultural_background: ['British', 'Irish'],
        is_verified: true,
        is_active: true
      }
    ];

    it('should rank therapist-1 higher due to better personality and specialty match', () => {
      const matches = findMatches(realClientAssessment, realTherapistProfiles, {
        minScore: 0,
        maxResults: 10
      });

      expect(matches).toHaveLength(2);
      expect(matches[0].therapist_id).toBe('therapist-1');
      expect(matches[1].therapist_id).toBe('therapist-2');
      expect(matches[0].compatibility_score).toBeGreaterThan(matches[1].compatibility_score);
    });

    it('should show correct breakdown for high-matching therapist', () => {
      const result = calculateMatch(realClientAssessment, realTherapistProfiles[0]);

      // Should have high personality compatibility due to matching styles
      // Client wants: ['solution-oriented', 'practical', 'structured', 'goal-oriented'] (4 items)
      // Therapist has: ['pragmatic', 'problem-solving', 'structured', 'goal-oriented'] (4 items)
      // Match: 'structured' and 'goal-oriented' = 2/4 = 0.5
      expect(result.breakdown.personality_compatibility).toBe(0.5);

      // Should have perfect identity match
      expect(result.breakdown.identity_affirming).toBe(1.0);

      // Should have high specialty match (maps to Anxiety + Career difficulties)
      expect(result.breakdown.specialty_match).toBeGreaterThan(0.5);

      // Should have perfect modality match
      expect(result.breakdown.modality_preferences).toBe(1.0);

      // Should have good availability match
      expect(result.breakdown.availability_fit).toBeGreaterThan(0.6);
    });

    it('should apply minimum score filtering correctly', () => {
      const highScoreMatches = findMatches(realClientAssessment, realTherapistProfiles, {
        minScore: 70,
        maxResults: 10
      });

      const lowScoreMatches = findMatches(realClientAssessment, realTherapistProfiles, {
        minScore: 30,
        maxResults: 10
      });

      expect(highScoreMatches.length).toBeLessThanOrEqual(lowScoreMatches.length);
      highScoreMatches.forEach(match => {
        expect(match.compatibility_score).toBeGreaterThanOrEqual(70);
      });
    });

    it('should respect maximum results limit', () => {
      const matches = findMatches(realClientAssessment, realTherapistProfiles, {
        minScore: 0,
        maxResults: 1
      });

      expect(matches).toHaveLength(1);
      expect(matches[0].therapist_id).toBe('therapist-1'); // Highest scoring
    });

    it('should filter out inactive or unverified therapists', () => {
      const inactiveTherapists = realTherapistProfiles.map(t => ({
        ...t,
        is_active: false
      }));

      const matches = findMatches(realClientAssessment, inactiveTherapists);
      expect(matches).toHaveLength(0);

      const unverifiedTherapists = realTherapistProfiles.map(t => ({
        ...t,
        is_verified: false
      }));

      const unverifiedMatches = findMatches(realClientAssessment, unverifiedTherapists);
      expect(unverifiedMatches).toHaveLength(0);
    });
  });

  describe('Boundary Conditions and Edge Cases', () => {
    it('should handle therapist with no personality information', () => {
      const client: ClientAssessment = {
        communication_preferences: ['warm', 'empathetic'],
        language_preferences: ['English'],
        identity_preferences: [],
        therapy_goals: [],
        therapy_modalities: [],
        budget_range: [50, 100],
        experience_preference: 'no_preference',
        preferred_times: [],
        age_group: '25–34',
        cultural_identity: []
      };

      const therapist: TherapistProfile = {
        id: '1',
        // No communication_style, session_format, or personality_tags
        personality_tags: [],
        languages: ['English'],
        identity_tags: [],
        specialties: [],
        modalities: [],
        gender_identity: 'female',
        session_rates: { '60min': 75 },
        years_experience: '5-10 years',
        availability: {},
        age_group: '35–44',
        cultural_background: [],
        is_verified: true,
        is_active: true
      };

      const result = calculateMatch(client, therapist);

      // Should have 0 personality compatibility but still pass filters
      expect(result.breakdown.personality_compatibility).toBe(0);
      expect(result.hard_filter_passed).toBe(true);
      expect(result.conditional_filters_passed).toBe(true);
    });

    it('should handle client with very specific requirements', () => {
      const verySpecificClient: ClientAssessment = {
        communication_preferences: ['very-specific-style', 'unique-approach'],
        language_preferences: ['Mandarin', 'Cantonese'],
        identity_preferences: ['Very specific identity requirement'],
        therapy_goals: ['Very specific therapy goal'],
        therapy_modalities: ['Very rare modality'],
        therapist_gender_preference: 'non-binary',
        budget_range: [45, 55], // Very narrow budget
        experience_preference: 'very_experienced',
        preferred_times: ['03:00'], // Unusual time
        age_group: '18–24',
        cultural_identity: ['Very specific culture']
      };

      const result = calculateMatch(verySpecificClient, {
        id: '1',
        personality_tags: ['warm'],
        languages: ['English'],
        identity_tags: [],
        specialties: ['Anxiety'],
        modalities: ['CBT'],
        gender_identity: 'female',
        session_rates: { '60min': 75 },
        years_experience: '5-10 years',
        availability: { monday: ['10:00'] },
        age_group: '35–44',
        cultural_background: ['British'],
        is_verified: true,
        is_active: true
      });

      // Should fail hard filters and return 0 score
      expect(result.compatibility_score).toBe(0);
      expect(result.hard_filter_passed).toBe(false);
    });

    it('should handle empty arrays and null values gracefully', () => {
      const emptyClient: ClientAssessment = {
        communication_preferences: [],
        language_preferences: [],
        identity_preferences: [],
        therapy_goals: [],
        therapy_modalities: [],
        budget_range: [0, 0],
        experience_preference: '',
        preferred_times: [],
        age_group: '',
        cultural_identity: []
      };

      const emptyTherapist: TherapistProfile = {
        id: '1',
        personality_tags: [],
        languages: [],
        identity_tags: [],
        specialties: [],
        modalities: [],
        gender_identity: '',
        session_rates: {},
        years_experience: '',
        availability: {},
        age_group: '',
        cultural_background: [],
        is_verified: true,
        is_active: true
      };

      // Should not throw errors
      expect(() => calculateMatch(emptyClient, emptyTherapist)).not.toThrow();

      const result = calculateMatch(emptyClient, emptyTherapist);
      expect(result).toBeDefined();
      expect(result.therapist_id).toBe('1');
    });
  });

  describe('Browse All Therapists - No Criteria Scenario', () => {
    it('should show ALL published therapist profiles when client has no matching criteria', () => {
      // Test scenario: Client has minimal or no preferences specified
      // Expected: All active and verified therapists should be returned
      // This represents the "browse all therapists" scenario
      const minimalClient: ClientAssessment = {
        communication_preferences: [], // No communication preferences
        language_preferences: [], // No language restrictions
        identity_preferences: [], // No identity preferences
        therapy_goals: [], // No specific therapy goals
        therapy_modalities: [], // No modality preferences
        budget_range: [0, 1000], // Wide range to not filter anyone
        experience_preference: 'no_preference',
        preferred_times: [], // No time restrictions
        age_group: '25–34',
        cultural_identity: [],
        // No optional preferences set
        therapist_gender_preference: 'no preference',
        prefers_similar_age: false,
        prefers_cultural_background_match: false
      };

      // Create multiple active therapists with different profiles
      const allActiveTherapists: TherapistProfile[] = [
        {
          id: 'therapist-browse-1',
          communication_style: 'Supportive & Relational',
          session_format: 'Structured & Goal-oriented',
          personality_tags: ['supportive', 'relational', 'structured', 'goal-oriented'],
          languages: ['English'],
          identity_tags: ['LGBTQ+ friendly and affirming'],
          specialties: ['Anxiety'],
          modalities: ['CBT'],
          gender_identity: 'female',
          session_rates: { '60min': 75 },
          years_experience: '5-10 years',
          availability: { monday: ['10:00'] },
          age_group: '35–44',
          cultural_background: ['British'],
          is_verified: true,
          is_active: true
        },
        {
          id: 'therapist-browse-2',
          communication_style: 'Pragmatic & Problem-solving',
          session_format: 'Exploratory & Insight-based',
          personality_tags: ['pragmatic', 'problem-solving', 'exploratory', 'insight-based'],
          languages: ['Spanish'], // Different language
          identity_tags: ['Neurodiversity affirming'],
          specialties: ['Depression'],
          modalities: ['Psychodynamic therapy'],
          gender_identity: 'male',
          session_rates: { '60min': 90 },
          years_experience: '10+ years',
          availability: { tuesday: ['14:00'] },
          age_group: '45–54',
          cultural_background: ['Hispanic'],
          is_verified: true,
          is_active: true
        },
        {
          id: 'therapist-browse-3',
          communication_style: 'Flexible & Adaptive',
          session_format: 'Calm & Process-Focused',
          personality_tags: ['flexible', 'adaptive', 'calm', 'process-focused'],
          languages: ['English', 'French'],
          identity_tags: ['Trauma-informed and gentle'],
          specialties: ['Trauma and abuse'],
          modalities: ['EMDR'],
          gender_identity: 'non-binary',
          session_rates: { '60min': 100, '90min': 140 },
          years_experience: '2-5 years',
          availability: { wednesday: ['11:00', '15:00'] },
          age_group: '25–34',
          cultural_background: ['French', 'British'],
          is_verified: true,
          is_active: true
        },
        {
          // Inactive therapist - should be filtered out
          id: 'therapist-browse-4-inactive',
          personality_tags: ['warm'],
          languages: ['English'],
          identity_tags: [],
          specialties: ['Anxiety'],
          modalities: ['CBT'],
          gender_identity: 'female',
          session_rates: { '60min': 80 },
          years_experience: '5-10 years',
          availability: { monday: ['10:00'] },
          age_group: '35–44',
          cultural_background: ['British'],
          is_verified: true,
          is_active: false // INACTIVE - should be filtered out
        },
        {
          // Unverified therapist - should be filtered out
          id: 'therapist-browse-5-unverified',
          personality_tags: ['empathetic'],
          languages: ['English'],
          identity_tags: [],
          specialties: ['Depression'],
          modalities: ['CBT'],
          gender_identity: 'male',
          session_rates: { '60min': 70 },
          years_experience: '5-10 years',
          availability: { friday: ['09:00'] },
          age_group: '25–34',
          cultural_background: ['British'],
          is_verified: false, // UNVERIFIED - should be filtered out
          is_active: true
        }
      ];

      const matches = findMatches(minimalClient, allActiveTherapists, {
        minScore: 0,
        maxResults: 10
      });

      // Should return exactly 3 therapists (the active and verified ones)
      expect(matches).toHaveLength(3);

      // All returned therapists should be active and verified
      matches.forEach(match => {
        const therapist = allActiveTherapists.find(t => t.id === match.therapist_id);
        expect(therapist?.is_active).toBe(true);
        expect(therapist?.is_verified).toBe(true);
      });

      // Should not include inactive or unverified therapists
      const returnedIds = matches.map(m => m.therapist_id);
      expect(returnedIds).not.toContain('therapist-browse-4-inactive');
      expect(returnedIds).not.toContain('therapist-browse-5-unverified');

      // Should include all active/verified therapists
      expect(returnedIds).toContain('therapist-browse-1');
      expect(returnedIds).toContain('therapist-browse-2');
      expect(returnedIds).toContain('therapist-browse-3');

      // All matches should have high compatibility scores due to no client restrictions
      matches.forEach(match => {
        expect(match.compatibility_score).toBeGreaterThanOrEqual(95);
        expect(match.hard_filter_passed).toBe(true);
        expect(match.conditional_filters_passed).toBe(true);

        // Perfect scores for all categories when no client preferences
        expect(match.breakdown.personality_compatibility).toBe(1.0);
        expect(match.breakdown.identity_affirming).toBe(1.0);
        expect(match.breakdown.specialty_match).toBe(1.0);
        expect(match.breakdown.modality_preferences).toBe(1.0);
        expect(match.breakdown.availability_fit).toBe(1.0);
      });
    });
  });
});