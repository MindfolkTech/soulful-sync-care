# 🧪 TESTING & VALIDATION - Matching System Quality Assurance

## Unit Tests

### Algorithm Core Functions

#### Test: parseStyleSentence()
```typescript
// Test file: /src/lib/__tests__/matching.test.ts

describe('parseStyleSentence', () => {
  test('parses simple phrases', () => {
    expect(parseStyleSentence('Warm and empathetic'))
      .toEqual(['warm', 'empathetic']);
  });
  
  test('removes descriptions in parentheses', () => {
    expect(parseStyleSentence('Supportive & Relational (I focus on safety)'))
      .toEqual(['supportive', 'relational']); // Note: 'relational' removed in DB trigger
  });
  
  test('PRESERVES hyphenated terms', () => {
    expect(parseStyleSentence('Structured & Goal-oriented'))
      .toEqual(['structured', 'goal-oriented']); // Keeps hyphen!
    expect(parseStyleSentence('Solution-oriented and practical'))
      .toEqual(['solution-oriented', 'practical']); // Keeps hyphen!
  });
  
  test('handles empty input', () => {
    expect(parseStyleSentence('')).toEqual([]);
    expect(parseStyleSentence(null)).toEqual([]);
  });
});
```

#### Test: mapTherapyGoalToSpecialties()
```typescript
describe('mapTherapyGoalToSpecialties', () => {
  test('maps anxiety goal to specialty', () => {
    expect(mapTherapyGoalToSpecialties('Anxiety and everyday worries'))
      .toEqual(['Anxiety']);
  });
  
  test('maps work stress to multiple specialties', () => {
    expect(mapTherapyGoalToSpecialties('Work and life stress'))
      .toEqual(['Career difficulties', 'Motivation and self-esteem']);
  });
  
  test('returns empty array for unknown goal', () => {
    expect(mapTherapyGoalToSpecialties('Unknown goal'))
      .toEqual([]);
  });
});
```

#### Test: calculateOverlapExact()
```typescript
describe('calculateOverlapExact', () => {
  test('calculates perfect match', () => {
    const client = ['warm', 'empathetic'];
    const therapist = ['warm', 'empathetic', 'supportive'];
    expect(calculateOverlapExact(client, therapist)).toBe(1.0); // 2/2 = 100%
  });
  
  test('calculates partial match', () => {
    const client = ['warm', 'empathetic', 'structured'];
    const therapist = ['warm', 'supportive'];
    expect(calculateOverlapExact(client, therapist)).toBe(0.333); // 1/3 = 33%
  });
  
  test('handles no match', () => {
    const client = ['directive', 'structured'];
    const therapist = ['warm', 'empathetic'];
    expect(calculateOverlapExact(client, therapist)).toBe(0);
  });
});
```

## Integration Tests

### Test Scenario 1: Perfect Match
```typescript
describe('Perfect Match Scenario', () => {
  const client: ClientAssessment = {
    communication_preferences: ['Warm and empathetic', 'Calm and gentle'],
    therapy_goals: ['Anxiety and everyday worries'],
    identity_preferences: ['Trauma-informed and gentle'],
    therapy_modalities: ['CBT', 'Mindfulness-based'],
    budget_range: [50, 120],
    language_preferences: ['English'],
    preferred_times: ['Morning (9am-12pm)'],
    // ... other fields
  };
  
  const therapist: TherapistProfile = {
    personality_tags: ['warm', 'empathetic', 'calm', 'gentle'],
    specialties: ['Anxiety', 'Depression'],
    identity_tags: ['Trauma-informed and gentle'],
    modalities: ['CBT', 'Mindfulness-based Therapy (MBCT)'],
    languages: ['English', 'Spanish'],
    session_rates: { '60min': 100 },
    availability: { 'Monday': ['Morning'] },
    // ... other fields
  };
  
  test('should score 95%+', () => {
    const result = calculateMatch(client, therapist);
    expect(result.compatibility_score).toBeGreaterThanOrEqual(95);
    expect(result.hard_filter_passed).toBe(true);
    expect(result.conditional_filters_passed).toBe(true);
  });
});
```

### Test Scenario 2: Budget Filter Failure
```typescript
describe('Budget Filter', () => {
  test('should exclude therapist outside budget', () => {
    const client: ClientAssessment = {
      budget_range: [20, 50],
      // ... other fields
    };
    
    const therapist: TherapistProfile = {
      session_rates: { '60min': 100, '45min': 80 },
      // ... other fields
    };
    
    const result = calculateMatch(client, therapist);
    expect(result.compatibility_score).toBe(0);
    expect(result.hard_filter_passed).toBe(false);
  });
  
  test('should include therapist with at least one rate in range', () => {
    const therapist: TherapistProfile = {
      session_rates: { '60min': 100, '30min': 45 },
      // ... other fields
    };
    
    const result = calculateMatch(client, therapist);
    expect(result.hard_filter_passed).toBe(true);
  });
});
```

## End-to-End Tests

### E2E Test: Complete Client Journey
```typescript
// Using Playwright
import { test, expect } from '@playwright/test';

test('Client assessment to match discovery', async ({ page }) => {
  // 1. Complete assessment
  await page.goto('/assessment');
  
  // Select therapy goals
  await page.click('text=Anxiety and everyday worries');
  await page.click('text=Work and life stress');
  await page.click('button:has-text("Next")');
  
  // Select communication preferences
  await page.click('text=Warm and empathetic');
  await page.click('text=Structured and goal-oriented');
  await page.click('button:has-text("Next")');
  
  // ... complete assessment
  
  // 2. Navigate to discovery
  await page.goto('/discover');
  
  // 3. Verify matches shown
  const therapistCards = page.locator('[data-testid="therapist-card"]');
  await expect(therapistCards).toHaveCount(greaterThan(0));
  
  // 4. Verify match scores
  const firstScore = page.locator('[data-testid="match-score"]').first();
  await expect(firstScore).toContainText('%');
  
  // 5. Test filters
  await page.click('button[aria-label="Open filters"]');
  await page.click('text=CBT');
  await page.click('text=Apply Filters');
  
  // Verify results updated
  await expect(therapistCards).toHaveCount(greaterThan(0));
});
```

## Database Validation

### Validation Query 1: Personality Tags Integrity
```sql
-- Check all therapists have valid personality tags
SELECT 
  name,
  communication_style,
  session_format,
  personality_tags,
  CASE 
    WHEN array_length(personality_tags, 1) >= 6 THEN 'Valid'
    WHEN array_length(personality_tags, 1) > 0 THEN 'Incomplete'
    ELSE 'Missing'
  END as tag_status
FROM therapist_profiles
WHERE communication_style IS NOT NULL 
   OR session_format IS NOT NULL;
```

### Validation Query 2: Client Assessment Completeness
```sql
-- Find incomplete assessments
SELECT 
  user_id,
  CASE 
    WHEN array_length(communication_preferences, 1) = 0 THEN 'Missing preferences'
    WHEN array_length(therapy_goals, 1) = 0 THEN 'Missing goals'
    WHEN budget_range[1] = 0 AND budget_range[2] = 0 THEN 'Missing budget'
    ELSE 'Complete'
  END as status
FROM client_assessments;
```

## Performance Testing

### Load Test: Matching Algorithm
```typescript
describe('Performance', () => {
  test('should match 100 therapists in under 100ms', () => {
    const client = generateMockClient();
    const therapists = generateMockTherapists(100);
    
    const startTime = Date.now();
    const results = findMatches(client, therapists);
    const endTime = Date.now();
    
    expect(endTime - startTime).toBeLessThan(100);
    expect(results).toHaveLength(100);
  });
  
  test('should handle 1000 therapists', () => {
    const client = generateMockClient();
    const therapists = generateMockTherapists(1000);
    
    const startTime = Date.now();
    const results = findMatches(client, therapists);
    const endTime = Date.now();
    
    expect(endTime - startTime).toBeLessThan(1000); // Under 1 second
  });
});
```

## Validation Rules

### Client Input Validation
| Field | Rule | Error Message |
|-------|------|---------------|
| communication_preferences | Max 3 selections | "Please select up to 3 preferences" |
| therapy_goals | Max 7 selections | "Please select up to 7 goals" |
| budget_range | Min ≤ Max | "Maximum budget must be greater than minimum" |
| budget_range | Max ≤ 500 | "Maximum budget cannot exceed £500" |

### Therapist Input Validation
| Field | Rule | Error Message |
|-------|------|---------------|
| communication_style | Required, exactly 1 | "Please select your communication style" |
| session_format | Required, exactly 1 | "Please select your session format" |
| specialties | Min 1 selection | "Please select at least one specialty" |
| languages | Min 1 selection | "Please select at least one language" |
| session_rates | Valid JSON, numeric values | "Please enter valid session rates" |

## Test Data Generators

### Generate Mock Client
```typescript
function generateMockClient(): ClientAssessment {
  return {
    communication_preferences: faker.random.arrayElements([
      'Warm and empathetic',
      'Structured and goal-oriented',
      'Pragmatic and problem solving'
    ], 2),
    therapy_goals: faker.random.arrayElements([
      'Anxiety and everyday worries',
      'Work and life stress',
      'Relationship challenges'
    ], 3),
    identity_preferences: [],
    therapy_modalities: ['CBT'],
    budget_range: [50, 150],
    language_preferences: ['English'],
    preferred_times: ['Morning (9am-12pm)'],
    age_group: '25-34',
    experience_preference: 'No preference',
    therapist_gender_preference: 'No preference',
    cultural_identity: [],
    prefers_similar_age: false,
    prefers_cultural_background_match: false
  };
}
```

### Generate Mock Therapist
```typescript
function generateMockTherapist(): TherapistProfile {
  const commStyle = faker.random.arrayElement([
    'Supportive & Relational',
    'Pragmatic & Problem-solving'
  ]);
  const sessionFormat = faker.random.arrayElement([
    'Structured & Goal-oriented',
    'Calm & Process-Focused'
  ]);
  
  return {
    id: faker.datatype.uuid(),
    communication_style: commStyle,
    session_format: sessionFormat,
    personality_tags: generateTagsFromStyles(commStyle, sessionFormat),
    specialties: faker.random.arrayElements(specialtiesList, 3),
    modalities: faker.random.arrayElements(modalitiesList, 2),
    identity_tags: [],
    languages: ['English'],
    gender_identity: faker.random.arrayElement(['Male', 'Female', 'Non-binary']),
    session_rates: { '60min': faker.datatype.number({ min: 50, max: 200 }) },
    availability: { 'Monday': ['Morning', 'Evening'] },
    is_active: true,
    verified: true
  };
}
```

## Regression Tests

### Critical Path Tests (Run Before Every Deploy)
1. ✅ Client can complete assessment
2. ✅ Filters update match results
3. ✅ Personality tags generate correctly
4. ✅ Budget filter excludes correctly
5. ✅ Language filter works
6. ✅ Match scores calculate accurately
7. ✅ Therapist cards display tags
8. ✅ Undo toast works
9. ✅ Video overlay plays
10. ✅ Database trigger fires

## Monitoring & Alerts

### Key Metrics to Track
```typescript
// Analytics to implement
track('matching_completed', {
  client_id: user.id,
  therapist_count: results.length,
  avg_score: avgScore,
  max_score: maxScore,
  filters_used: Object.keys(activeFilters).filter(k => activeFilters[k])
});

track('matching_error', {
  error_type: error.name,
  error_message: error.message,
  client_id: user.id
});
```

### Alert Conditions
- Average match score < 30% for > 10% of users
- Matching algorithm execution time > 500ms
- Personality tags generation failure rate > 1%
- More than 5% of therapists have empty personality_tags

---

**⚠️ CRITICAL**: All tests must pass before deploying changes to the matching system. The personality tag generation is the most critical component to test.
