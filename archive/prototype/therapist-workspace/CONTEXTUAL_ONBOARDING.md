# 🎯 Contextual Onboarding System

## Overview
New approach based on industry best practices from UserPilot, Pendo, Appcues, and GitHub:

### Key Features

1. **Welcome Modal** (Step 0)
   - Clean, centered modal explaining the tour
   - Shows current profile strength (30%)
   - Preview of what will be covered
   - Options: "Start Guided Tour" or "I'll do this later"

2. **Contextual Tooltips** (Steps 1-5)
   - Anchored directly to UI elements
   - Spotlight effect: darkens background, highlights target
   - Progress indicators: dots showing step 1 of 5
   - Action validation: only advance when task completed
   - Smart positioning: auto-adjusts to stay on screen

3. **User Experience Flow**
   ```
   Welcome Modal
       ↓
   Profile Page → Tooltip points to Specialties section
       ↓ (user selects 3+ specialties)
   Profile Page → Tooltip points to Identity Tags
       ↓ (user selects tags)
   Settings Page → Tooltip points to Rate input
       ↓ (user sets rate)
   Business Page → Tooltip points to Calendar
       ↓ (user adds availability)
   Profile Page → Tooltip points to Video section (optional)
       ↓
   Completion Modal with guide
   ```

## Implementation Details

### Components Created

1. **OnboardingTooltip.tsx**
   - Reusable tooltip component
   - Auto-positioning logic
   - Arrow pointing to target
   - Progress dots
   - Action validation

2. **ContextualOnboarding.tsx**
   - Manages onboarding flow
   - Controls navigation between pages
   - Shows welcome/completion modals
   - Tracks progress and saves to localStorage

3. **WorkspaceWrapper.tsx**
   - HOC wrapper for therapist pages
   - Adds data-onboarding attributes
   - Injects contextual onboarding

### Spotlight Effect
```css
.onboarding-highlight {
  position: relative;
  z-index: 9999;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  animation: pulse 2s infinite;
}
```

### Data Attributes Required
Pages need these data attributes for tooltip anchoring:
- `data-onboarding="specialties"` - Specialties section
- `data-onboarding="identity-tags"` - Identity tags section  
- `data-onboarding="session-rate"` - Rate input field
- `data-onboarding="availability-calendar"` - Calendar component
- `data-onboarding="video-upload"` - Video upload section

### Validation Logic
Each step can have validation before proceeding:
```typescript
{
  action: {
    type: 'select',
    validation: () => {
      const specialties = document.querySelectorAll('[data-onboarding="specialties"] .selected');
      return specialties.length >= 3;
    }
  }
}
```

## Benefits Over Previous Approach

| Old Coach (Sidebar) | New Contextual Tooltips |
|-------------------|------------------------|
| Separate window | In-context guidance |
| Can be ignored | Forces interaction |
| Generic instructions | Points to exact element |
| No validation | Validates actions |
| Passive learning | Active learning |

## Industry Best Practices Applied

1. **Progressive Disclosure** - Information revealed step by step
2. **Spotlight Effect** - Focus on one element at a time
3. **Action-Based Learning** - Learn by doing, not reading
4. **Skip Options** - Respect experienced users
5. **Progress Indicators** - Clear sense of advancement
6. **Smart Positioning** - Tooltips never go off-screen
7. **Validation Gates** - Ensure understanding before proceeding

## Testing Instructions

1. Complete Quick Start at `/prototype/therapist-quickstart`
2. Navigate to `/prototype/workspace/dashboard`
3. Welcome modal appears
4. Click "Start Guided Tour"
5. Follow tooltips through each step:
   - Select specialties (min 3)
   - Choose identity tags
   - Set session rate
   - Add availability hours
   - Optional: Video intro
6. Completion modal shows where to edit each setting

## Future Enhancements

- [ ] Add keyboard navigation (Tab, Enter, Esc)
- [ ] Support for mobile gestures
- [ ] A/B test different tooltip copy
- [ ] Analytics tracking for drop-off points
- [ ] Personalized tips based on therapist type
- [ ] Re-engagement tooltips for incomplete profiles
