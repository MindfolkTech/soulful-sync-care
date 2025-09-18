import { describe, it, expect } from 'vitest';
import { calculateMatch, MATCHING_WEIGHTS } from '../matching';

const baseClient = {
  communication_preferences: ['empathetic', 'structured'],
  language_preferences: ['English'],
  identity_preferences: [],
  therapy_goals: ['anxiety'],
  therapy_modalities: ['CBT'],
  therapist_gender_preference: 'no preference',
  budget_range: [6000, 9000], // pennies if using minor units; else 60–90
  experience_preference: 'experienced',
  preferred_times: ['monday 18:00-20:00'],
  age_group: '25–34',
  prefers_similar_age: false,
  cultural_identity: [],
  prefers_cultural_background_match: false,
};

const baseTherapist = {
  id: 't1',
  personality_tags: ['empathetic','goal-oriented','structured'],
  languages: ['English'],
  identity_tags: ['trauma-informed'],
  specialties: ['anxiety','trauma'],
  modalities: ['CBT','EMDR'],
  gender_identity: 'female',
  session_rates: { '60min': 8000 }, // 80
  years_experience: '5-10 years',
  availability: { monday: ['18:30-19:30'] },
  age_group: '35–44',
  cultural_background: ['British'],
  is_verified: true,
  is_active: true,
};

describe('Matching Algorithm', () => {
  it('language hard filter passes on exact match', () => {
    const res = calculateMatch(baseClient as any, baseTherapist as any);
    expect(res.hard_filter_passed).toBe(true);
  });

  it('budget hard filter excludes out-of-range therapists', () => {
    const outOfBudget = { ...baseTherapist, session_rates: { '60min': 12000 } }; // 120
    const res = calculateMatch(baseClient as any, outOfBudget as any);
    expect(res.hard_filter_passed).toBe(false);
  });

  it('identity passes automatically when client picked none', () => {
    const res = calculateMatch(
      { ...baseClient, identity_preferences: [] } as any,
      { ...baseTherapist, identity_tags: [] } as any
    );
    expect(res.conditional_filters_passed).toBe(true);
  });

  it('exact overlap counts normalized tags correctly', () => {
    const ther = { ...baseTherapist, personality_tags: ['Empathetic', 'structured '] };
    const res = calculateMatch(baseClient as any, ther as any);
    // personality should be 2/2 => high weighted contribution
    expect(res.compatibility_score).toBeGreaterThan(0);
  });

  it('experience scoring gives 1 on match, 0 on miss', () => {
    const match = calculateMatch(baseClient as any, baseTherapist as any);
    const miss = calculateMatch(
      { ...baseClient, experience_preference: 'very_experienced' } as any,
      { ...baseTherapist, years_experience: '2-5 years' } as any
    );
    expect(match.compatibility_score).toBeGreaterThan(miss.compatibility_score);
  });

  it('weights still sum to 1', () => {
    const sum =
      MATCHING_WEIGHTS.personality_compatibility +
      MATCHING_WEIGHTS.identity_affirming +
      MATCHING_WEIGHTS.specialty_match +
      MATCHING_WEIGHTS.modality_preferences +
      MATCHING_WEIGHTS.availability_fit;
    expect(sum).toBeCloseTo(1, 6);
  });
});
