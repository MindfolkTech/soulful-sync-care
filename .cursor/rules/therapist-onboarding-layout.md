---
globs: ["src/pages/therapist/Onboarding.tsx", "src/pages/**/onboarding/**/*.tsx"]
alwaysApply: true
description: "Enforces OnboardingLayout usage for therapist onboarding flow instead of TherapistLayout"
---

# Rule: Onboarding Layout

## Scope
This rule applies ONLY to the multi-step therapist onboarding flow (/t/onboarding). It ensures a consistent, focused user experience during the critical sign-up process.

🚫 **Do not use TherapistLayout for the onboarding flow.**

## Mandatory Layout Component
All onboarding step pages MUST use OnboardingLayout:

```tsx
import { OnboardingLayout } from "@/components/layout/onboarding-layout";
import { Stack } from "@/components/layout/layout-atoms";

// Example for Step 2 of 5
export default function OnboardingStep2Page() {
  return (
    <OnboardingLayout currentStep={2} totalSteps={5}>
      <div className="p-4 md:p-6 lg:p-8">
        <Stack className="space-y-6">
          {/* Your step-specific content (e.g., the form and live preview) goes here */}
        </Stack>
      </div>
    </OnboardingLayout>
  );
}
```

## Why This New Layout is Required

**Focus:** The OnboardingLayout is intentionally minimal. It removes the main application navigation (Dashboard, Clients, etc.) to prevent distraction and keep the user focused on completing the form.

**Clarity:** It provides a clear progress indicator, which is essential for managing user expectations in a multi-step flow.

**Separation of Concerns:** It correctly treats "onboarding" as a separate, temporary state from the main "authenticated application" state, which is handled by TherapistLayout.

## Forbidden Patterns

```tsx
// ❌ WRONG: Using the main dashboard layout for onboarding
import { TherapistLayout } from "@/components/therapist/therapist-layout";

export default function OnboardingPage() {
  return (
    <TherapistLayout> {/* This is incorrect and distracting */}
      {/* Onboarding content */}
    </TherapistLayout>
  );
}
```

## Required Structure
- Use OnboardingLayout as the root wrapper
- Include currentStep and totalSteps props
- Wrap content in responsive padding: `p-4 md:p-6 lg:p-8`
- Use Stack layout atom for consistent spacing
- Follow design token usage from styles/design-tokens.css