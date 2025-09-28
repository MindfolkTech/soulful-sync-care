# ProfileStrengthIndicator Component

A floating pill component that shows therapist profile completion percentage with real-time updates and interactive improvement guidance.

## Features

- **Floating Design**: Fixed position in top-right corner, doesn't interfere with page layout
- **Progress Ring**: Visual percentage indicator with color-coded states
- **Color Coding**:
  - Red (<40%): Incomplete
  - Orange (40-60%): Getting Started
  - Orange (60-80%): Nearly Complete
  - Green (80%+): Complete
- **Hover Breakdown**: Detailed view of completion by category
- **Click Action**: Opens improvement checklist modal
- **Real-time Updates**: Automatically updates when profile changes
- **Mobile Responsive**: Adapts layout for different screen sizes
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage

### Basic Integration

```tsx
import { ProfileStrengthIndicator } from "@/components/therapist/onboarding";

function TherapistDashboard() {
  const { user } = useAuth();

  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          {/* Your dashboard content */}
        </Container>
      </div>

      {/* Add the indicator */}
      <ProfileStrengthIndicator userId={user?.id || ""} />
    </TherapistLayout>
  );
}
```

### Custom Improvement Handler

```tsx
<ProfileStrengthIndicator
  userId={user?.id || ""}
  onImprove={() => {
    // Custom logic when user clicks to improve
    navigate('/t/onboarding/profile');
    trackEvent('profile_improvement_clicked');
  }}
/>
```

### Hide Label (Mobile-friendly)

```tsx
<ProfileStrengthIndicator
  userId={user?.id || ""}
  showLabel={false}
  className="lg:hidden" // Only show compact version on smaller screens
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `userId` | `string` | required | The ID of the therapist user |
| `className` | `string` | `undefined` | Additional CSS classes |
| `showLabel` | `boolean` | `true` | Whether to show text label next to indicator |
| `onImprove` | `() => void` | `undefined` | Custom handler for improvement action |

## Profile Strength Calculation

The component calculates profile strength based on 5 categories (20 points each):

### Basic Info (20 points)
- Name (7 points)
- License number (7 points)
- Bio (6 points)

### Specialties (20 points)
- At least 2 specialties (10 points)
- At least 2 therapy modalities (10 points)

### Communication (20 points)
- Communication style (10 points)
- Session format preference (10 points)

### Policies (20 points)
- Cancellation policy (10 points)
- Rescheduling policy (10 points)

### Media (20 points)
- Profile photo (10 points)
- Introduction video OR quote (10 points)

## Design System Compliance

✅ Uses design tokens from `styles/design-tokens.css`
✅ Follows typography patterns (font-primary for headings, font-secondary for body)
✅ Implements touch target minimums (44px minimum)
✅ Responsive spacing with fluid design tokens
✅ Accessible color contrast ratios
✅ Proper ARIA labels and keyboard navigation

## Technical Details

- **Real-time Updates**: Uses Supabase subscriptions to automatically update when profile changes
- **Performance**: Optimized with React.memo and minimal re-renders
- **Error Handling**: Graceful fallbacks for loading and error states
- **Animation**: Subtle CSS animations using Tailwind's built-in classes for enhanced UX
- **Accessibility**: Full WCAG AA compliance

## File Structure

```
src/components/therapist/onboarding/
├── ProfileStrengthIndicator.tsx     # Main component
├── ProfileStrengthIndicator.example.tsx  # Usage examples (remove after integration)
├── index.ts                         # Export file
└── README.md                        # This file
```

## Integration Checklist

- [ ] Import component into target pages
- [ ] Pass correct `userId` prop
- [ ] Test on different screen sizes
- [ ] Verify real-time updates work
- [ ] Test accessibility with keyboard navigation
- [ ] Remove example files once integrated
- [ ] Update navigation/routing for improvement flow

## Support

For questions or issues with this component, check:
1. Design system documentation: `docs/DESIGN_SYSTEM.md`
2. Component examples: `ProfileStrengthIndicator.example.tsx`
3. Database schema: `supabase/migrations/20250928_add_profile_strength_fields.sql`