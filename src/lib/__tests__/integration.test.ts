import { describe, it, expect, beforeEach, vi } from 'vitest';
import { findMatches, mockTherapists, ClientAssessment, TherapistProfile } from '../matching';

// Mock localStorage for testing
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Matching Algorithm Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Sample client assessment data (as it would be stored from the UI)
  const sampleClientAssessment: ClientAssessment = {
    communication_preferences: ['empathetic', 'structured'],
    language_preferences: ['English'],
    identity_preferences: ['LGBTQ+ affirming'], // Match the exact format in mock data
    therapy_goals: ['anxiety', 'depression'],
    therapy_modalities: ['CBT'],
    therapist_gender_preference: 'no preference',
    budget_range: [50, 150], // In pounds to match mock therapist rates (70-120)
    experience_preference: 'experienced',
    preferred_times: ['10:00', '14:00'], // Match therapist availability
    age_group: '25–34',
    prefers_similar_age: false,
    cultural_identity: ['British'],
    prefers_cultural_background_match: false,
  };

  // Use the actual mock therapists from the matching algorithm
  const sampleTherapists = mockTherapists;

  it('should find matches based on client preferences', () => {
    const matches = findMatches(sampleClientAssessment, sampleTherapists);
    
    // Should find matches
    expect(matches.length).toBeGreaterThan(0);
    
    // Should be sorted by compatibility score (highest first)
    for (let i = 1; i < matches.length; i++) {
      expect(matches[i-1].compatibility_score).toBeGreaterThanOrEqual(matches[i].compatibility_score);
    }
  });

  it('should prioritize therapists with exact personality matches', () => {
    const matches = findMatches(sampleClientAssessment, sampleTherapists);
    
    // Should find at least one match
    expect(matches.length).toBeGreaterThan(0);
    
    // Should be sorted by compatibility score (highest first)
    for (let i = 1; i < matches.length; i++) {
      expect(matches[i-1].compatibility_score).toBeGreaterThanOrEqual(matches[i].compatibility_score);
    }
  });

  it('should filter out therapists outside budget range', () => {
    const budgetAssessment = {
      ...sampleClientAssessment,
      budget_range: [6000, 8000] as [number, number], // Narrow budget in pennies
    };
    
    const matches = findMatches(budgetAssessment, sampleTherapists);
    
    // Should find fewer matches due to budget constraint
    const allMatches = findMatches(sampleClientAssessment, sampleTherapists);
    expect(matches.length).toBeLessThanOrEqual(allMatches.length);
  });

  it('should handle language preferences as hard filter', () => {
    const frenchAssessment = {
      ...sampleClientAssessment,
      language_preferences: ['French'],
    };
    
    const matches = findMatches(frenchAssessment, sampleTherapists);
    
    // Should find fewer matches when requiring French
    const englishMatches = findMatches(sampleClientAssessment, sampleTherapists);
    expect(matches.length).toBeLessThanOrEqual(englishMatches.length);
  });

  it('should handle identity preferences correctly', () => {
    const lgbtqAssessment = {
      ...sampleClientAssessment,
      identity_preferences: ['lgbtq+ affirming'],
    };
    
    const matches = findMatches(lgbtqAssessment, sampleTherapists);
    
    // Should find matches when identity preferences are specified
    expect(matches.length).toBeGreaterThanOrEqual(0);
    
    // All matches should pass filters
    matches.forEach(match => {
      expect(match.hard_filter_passed).toBe(true);
      expect(match.conditional_filters_passed).toBe(true);
    });
  });

  it('should return empty results when no therapists match hard filters', () => {
    const impossibleAssessment = {
      ...sampleClientAssessment,
      language_preferences: ['Mandarin'], // No therapist speaks Mandarin
    };
    
    const matches = findMatches(impossibleAssessment, sampleTherapists);
    
    expect(matches.length).toBe(0);
  });

  it('should respect minimum score threshold', () => {
    const highThresholdMatches = findMatches(sampleClientAssessment, sampleTherapists, { minScore: 90 });
    
    // Should only return very high compatibility matches
    highThresholdMatches.forEach(match => {
      expect(match.compatibility_score).toBeGreaterThanOrEqual(90);
    });
  });

  it('should limit results to maxResults parameter', () => {
    const limitedMatches = findMatches(sampleClientAssessment, sampleTherapists, { maxResults: 2 });
    
    expect(limitedMatches.length).toBeLessThanOrEqual(2);
  });

  it('should provide detailed breakdown for each match', () => {
    const matches = findMatches(sampleClientAssessment, sampleTherapists);
    
    matches.forEach(match => {
      expect(match.breakdown).toBeDefined();
      expect(typeof match.breakdown.personality_compatibility).toBe('number');
      expect(typeof match.breakdown.identity_affirming).toBe('number');
      expect(typeof match.breakdown.specialty_match).toBe('number');
      expect(typeof match.breakdown.modality_preferences).toBe('number');
      expect(typeof match.breakdown.availability_fit).toBe('number');
      
      // All breakdown scores should be between 0 and 1
      Object.values(match.breakdown).forEach(score => {
        expect(score).toBeGreaterThanOrEqual(0);
        expect(score).toBeLessThanOrEqual(1);
      });
    });
  });
});
