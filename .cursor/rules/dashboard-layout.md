---
description: Dashboard layout requirements for therapist and admin sections using TherapistLayout and AdminLayout components
globs: ["src/pages/therapist/**/*.tsx", "src/pages/admin/**/*.tsx", "src/components/layout/therapist-layout.tsx", "src/components/layout/admin-layout.tsx"]
ignore: ["src/pages/therapist/Onboarding.tsx", "src/pages/client/onboarding/**/*.tsx"]
alwaysApply: true
---

# Rule: Dashboard Layout — Therapist & Admin Pattern (Current Architecture)

## Scope
Apply to all **post-authentication** therapist and admin pages (React/TSX/CSS/Tailwind). Ensure consistent dashboard layout across all management interfaces using the correct layout components.

**🚫 EXCLUDES**: Onboarding pages, pre-authentication flows, and public pages
**✅ INCLUDES**: All authenticated therapist/admin dashboard pages

🚫 No deviations from the TherapistLayout/AdminLayout pattern and component hierarchy.

**Reference**: See `layout-components.md` for complete layout component requirements, `page-shell-rules.md` for onboarding pages, and `design-tokens.md` for token definitions.

## What Pages Are Excluded

### ❌ Pages That Do NOT Use Dashboard Layouts
- **Onboarding flows**: `/t/onboarding`, `/client/onboarding`
- **Pre-authentication pages**: Landing pages, sign-up, login
- **Public pages**: About, pricing, terms of service
- **Assessment flows**: Client discovery and matching flows
- **Session pages**: Video call interfaces (use different layout)

### ✅ Pages That DO Use Dashboard Layouts
- **Therapist dashboard**: `/t/dashboard`, `/t/clients`, `/t/profile`, `/t/analytics`, etc.
- **Admin dashboard**: `/admin/overview`, `/admin/users`, `/admin/therapists`, etc.
- **All authenticated management interfaces**

## Dashboard Layout Requirements

### Mandatory Layout Components

**All therapist pages MUST use TherapistLayout:**
```tsx
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";

export default function TherapistPage() {
  return (
    <TherapistLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            {/* Your page content here */}
          </div>
        </Container>
      </div>
    </TherapistLayout>
  );
}
```

**All admin pages MUST use AdminLayout:**
```tsx
import { AdminLayout } from "@/components/layout/admin-layout";
import { Container } from "@/components/ui/container";

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        <Container>
          <div className="space-y-6">
            {/* Your page content here */}
          </div>
        </Container>
      </div>
    </AdminLayout>
  );
}
```

## Layout Component Features

### TherapistLayout Features
- ✅ **TherapistSidebar**: Navigation with therapist-specific menu items
- ✅ **TherapistBottomNav**: Mobile navigation (hidden on desktop)
- ✅ **Responsive behavior**: Sidebar hidden on mobile/tablet, visible on desktop
- ✅ **Collapsible sidebar**: Smooth 300ms transitions on desktop
- ✅ **Touch targets**: All interactive elements meet 44px minimum
- ✅ **Overflow handling**: Proper scroll behavior and content constraints

### AdminLayout Features
- ✅ **AdminSidebar**: Navigation with admin-specific menu items
- ✅ **AdminBottomNav**: Mobile navigation (hidden on desktop)
- ✅ **Responsive behavior**: Sidebar hidden on mobile/tablet, visible on desktop
- ✅ **Collapsible sidebar**: Smooth 300ms transitions on desktop
- ✅ **Touch targets**: All interactive elements meet 44px minimum
- ✅ **Overflow handling**: Proper scroll behavior and content constraints

## Content Structure Requirements (CRITICAL)

### Mandatory Content Wrapper Pattern
**ALL pages using TherapistLayout or AdminLayout MUST follow this exact structure:**

```tsx
<TherapistLayout> {/* or AdminLayout */}
  <div className="p-4 md:p-6 lg:p-8">  {/* ← REQUIRED: Responsive padding */}
    <Container>                        {/* ← REQUIRED: Container wrapper */}
      <div className="space-y-6">      {/* ← REQUIRED: Content spacing */}
        {/* Page content goes here */}
      </div>
    </Container>
  </div>
</TherapistLayout>
```

### Why This Structure is Required
- **Responsive Padding**: `p-4 md:p-6 lg:p-8` ensures proper scaling across devices
- **Container Wrapper**: Provides max-width constraints and proper centering
- **Content Spacing**: `space-y-6` maintains consistent vertical rhythm
- **Prevents Issues**: Avoids padding/scaling problems and ensures consistent layout

## Responsive Design Requirements

### Breakpoint Behavior
- **Mobile (< 768px)**: Sidebar hidden, bottom navigation visible
- **Tablet (768px - 1024px)**: Sidebar hidden, bottom navigation visible
- **Desktop (≥ 1024px)**: Sidebar visible and collapsible, no bottom navigation

### Sidebar Behavior
- **Desktop**: Always visible, fixed width (256px), collapsible
- **Mobile/Tablet**: Hidden with overlay when toggled
- **Animation**: Smooth 300ms ease-in-out transitions
- **State management**: Controlled by layout components

### Content Areas
- **Main content**: Uses `overflow-auto`, `min-w-0`, and `w-full` for proper flex behavior
- **All cards**: Must use `min-w-0 overflow-hidden` to prevent horizontal overflow
- **Card headers**: Must use responsive padding `p-4 md:p-5 lg:p-6 pb-0`
- **Card content**: Must use responsive padding `p-4 md:p-5 lg:p-6`
- **Scrollable regions**: Use `min-h-0` and `overflow-y-auto` when needed
- **Grid containers**: Must use `w-full min-w-0` to prevent overflow

## Layout Patterns

### Page Structure Example
```tsx
<TherapistLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="font-primary text-3xl text-[hsl(var(--text-primary))] mb-2">Page Title</h1>
          <p className="font-secondary text-[hsl(var(--text-secondary))]">Page description</p>
        </div>
        
        {/* Action bar */}
        <div className="flex justify-end">
          <Button>Action</Button>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>...</Card>
        </div>
        
        {/* Main content */}
        <Card className="min-w-0 overflow-hidden">
          <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-5 lg:p-6">
            <div className="space-y-4">
              {/* Content using layout atoms */}
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  </div>
</TherapistLayout>
```

### Grid Layout Patterns
- **Stats cards**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Two-column**: `grid-cols-1 lg:grid-cols-2`
- **Three-column**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Messaging**: `grid-cols-1 lg:grid-cols-3` (1/3 + 2/3 split)

### Spacing System
- **Page sections**: `space-y-6` or `space-y-8`
- **Card content**: `space-y-4`
- **Form fields**: `space-y-3`
- **Inline elements**: `gap-2`, `gap-3`, or `gap-4`

## Navigation Requirements

### Therapist Navigation Items
- **Dashboard**: `/t/dashboard` - Main dashboard overview
- **My Clients**: `/t/clients` - Client management
- **My Profile**: `/t/profile` - Profile management
- **Performance & Analytics**: `/t/analytics` - Analytics and insights

### Admin Navigation Items
- **Overview**: `/admin/overview` - System overview
- **Users**: `/admin/users` - User management
- **Therapists**: `/admin/therapists` - Therapist management
- **Moderation**: `/admin/moderation` - Content moderation
- **Bookings**: `/admin/bookings` - Booking management

## Accessibility Requirements

### Focus Management
- **Tab order**: Logical flow through all interactive elements
- **Focus rings**: Visible focus indicators on all controls
- **Skip links**: Proper navigation for screen readers

### Touch Targets
- **Minimum size**: 44px (`min-h-touch-min`)
- **Comfortable size**: 56px (`min-h-touch-comfort`) for primary actions
- **Spacing**: Adequate space between touch targets

### Screen Readers
- **Landmarks**: Proper `<header>`, `<nav>`, `<main>` structure
- **Headings**: Logical heading hierarchy
- **Labels**: All form controls properly labeled

## Performance Considerations

### Component Loading
- **Lazy loading**: Layout components load efficiently
- **Bundle splitting**: Layout components in separate chunk
- **Memoization**: Prevent unnecessary re-renders

### Animation Performance
- **Hardware acceleration**: Use `transform` and `opacity` for animations
- **Reduced motion**: Respect `prefers-reduced-motion` settings
- **Smooth transitions**: 300ms duration for UI state changes

## Implementation Rules

### Forbidden Patterns
- ❌ Manual header/sidebar implementation
- ❌ Hardcoded layout dimensions
- ❌ Non-responsive grid systems
- ❌ Missing touch target sizes (`min-h-touch-min`)
- ❌ Horizontal scroll on any breakpoint
- ❌ Layout without proper overflow handling
- ❌ Cards without `min-w-0 overflow-hidden`
- ❌ Missing responsive padding on cards
- ❌ Grid containers without `w-full min-w-0`
- ❌ **Content without responsive padding wrapper** (`p-4 md:p-6 lg:p-8`)
- ❌ **Content without Container wrapper**
- ❌ **Content without proper spacing** (`space-y-6`)
- ❌ **Direct component usage** without proper content structure

### Required Patterns
- ✅ TherapistLayout component for all therapist pages
- ✅ AdminLayout component for all admin pages
- ✅ **Responsive padding wrapper** (`p-4 md:p-6 lg:p-8`) for all content
- ✅ **Container wrapper** for all page content
- ✅ **Content spacing** (`space-y-6`) for consistent vertical rhythm
- ✅ Layout atoms for consistent spacing
- ✅ Responsive grid systems
- ✅ Proper touch target sizes
- ✅ Mobile-first responsive design
- ✅ Collapsible sidebar with animations

## Testing Requirements

### Responsive Testing
- **Breakpoints**: Test at 320px, 768px, 1024px, 1440px
- **Orientation**: Both portrait and landscape on mobile
- **Zoom levels**: Up to 200% zoom without horizontal scroll

### Interaction Testing
- **Touch**: All elements accessible via touch on mobile
- **Keyboard**: Full keyboard navigation support
- **Screen reader**: Proper announcement of layout changes

### Performance Testing
- **Animation smoothness**: 60fps for all transitions
- **Load times**: Layout components load within 100ms
- **Memory usage**: No layout-related memory leaks

## Common Violations and Fixes

### ❌ Wrong: Missing Content Structure
```tsx
<AdminLayout>
  <ModerationTable />  {/* No padding wrapper */}
</AdminLayout>
```

### ✅ Correct: Proper Content Structure
```tsx
<AdminLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      <ModerationTable />
    </Container>
  </div>
</AdminLayout>
```

### ❌ Wrong: Missing Container
```tsx
<TherapistLayout>
  <div className="p-8">
    <div className="space-y-6">  {/* No Container */}
      {/* Content */}
    </div>
  </div>
</TherapistLayout>
```

### ✅ Correct: With Container
```tsx
<TherapistLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      <div className="space-y-6">
        {/* Content */}
      </div>
    </Container>
  </div>
</TherapistLayout>
```

## Key Rules Summary

1. **Always use TherapistLayout for therapist pages** (except onboarding)
2. **Always use AdminLayout for admin pages** (except onboarding)
3. **Always wrap content in responsive padding wrapper**
4. **Always use Container component for content**
5. **Always maintain consistent spacing patterns**
6. **Never skip the content structure requirements**
7. **Follow responsive design principles**
8. **Ensure accessibility compliance**
9. **Test across all breakpoints**
10. **Maintain performance standards**
11. **🚫 NEVER apply to onboarding or pre-authentication pages**
