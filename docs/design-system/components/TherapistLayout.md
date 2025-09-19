# TherapistLayout Component

## Overview

TherapistLayout is the base layout component for all authenticated therapist pages. It provides consistent sidebar navigation, responsive behavior, and proper content structure across all therapist interfaces.

## Usage

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

## Features

### ✅ Sidebar Navigation
- **TherapistSidebar**: Navigation with therapist-specific menu items
- **Collapsible**: Smooth 300ms transitions on desktop
- **Responsive**: Hidden on mobile/tablet, visible on desktop

### ✅ Bottom Navigation
- **TherapistBottomNav**: Mobile navigation for touch devices
- **Responsive**: Visible on mobile/tablet, hidden on desktop
- **Touch-friendly**: All items meet 44px minimum touch target

### ✅ Responsive Behavior
- **Mobile/Tablet**: Sidebar hidden, bottom navigation visible
- **Desktop**: Sidebar visible and collapsible, no bottom navigation
- **Breakpoint**: Switches at `lg:` (1024px)

### ✅ Content Structure
- **Main content area**: Uses `overflow-auto`, `min-w-0`, and `w-full`
- **Responsive padding**: `pb-20 lg:pb-0` for bottom navigation space
- **Sidebar offset**: `ml-0 lg:ml-64` for sidebar space

## Props

```tsx
interface TherapistLayoutProps {
  children: ReactNode;    // Page content (should include Container wrapper)
  className?: string;     // Additional CSS classes for main content area
}
```

## Navigation Items

### Therapist Menu Items
- **Dashboard**: `/t/dashboard` - Main dashboard overview
- **My Clients**: `/t/clients` - Client management
- **My Profile**: `/t/profile` - Profile management  
- **Performance & Analytics**: `/t/analytics` - Analytics and insights

## Responsive Behavior

### Mobile/Tablet (< 1024px)
```tsx
<TherapistLayout>
  {/* Sidebar: Hidden with overlay when toggled */}
  <main className="ml-0 overflow-auto pb-20">
    {/* Content with bottom navigation space */}
  </main>
  {/* Bottom Navigation: Visible */}
</TherapistLayout>
```

### Desktop (≥ 1024px)
```tsx
<TherapistLayout>
  {/* Sidebar: Visible and collapsible */}
  <main className="ml-64 overflow-auto pb-0">
    {/* Content without bottom navigation space */}
  </main>
  {/* Bottom Navigation: Hidden */}
</TherapistLayout>
```

## Content Structure Requirements

### ✅ Required Pattern
```tsx
<TherapistLayout>
  <div className="p-4 md:p-6 lg:p-8">  {/* ← REQUIRED: Responsive padding */}
    <Container>                        {/* ← REQUIRED: Container wrapper */}
      <div className="space-y-6">      {/* ← REQUIRED: Content spacing */}
        {/* Page content */}
      </div>
    </Container>
  </div>
</TherapistLayout>
```

### Why This Structure is Required
- **Responsive Padding**: `p-4 md:p-6 lg:p-8` ensures proper scaling
- **Container Wrapper**: Provides max-width constraints and centering
- **Content Spacing**: `space-y-6` maintains consistent vertical rhythm
- **Prevents Issues**: Avoids padding/scaling problems

## Accessibility

### Focus Management
- **Tab order**: Logical flow through sidebar and main content
- **Focus rings**: Visible focus indicators on all controls
- **Skip links**: Proper navigation for screen readers

### Touch Targets
- **Minimum size**: 44px (`min-h-touch-min`) for all interactive elements
- **Comfortable size**: 56px (`min-h-touch-comfort`) for primary actions
- **Spacing**: Adequate space between touch targets

### Screen Readers
- **Landmarks**: Proper `<header>`, `<nav>`, `<main>` structure
- **Headings**: Logical heading hierarchy
- **Labels**: All form controls properly labeled

## Performance

### Component Loading
- **Lazy loading**: Layout components load efficiently
- **Bundle splitting**: Layout components in separate chunk
- **Memoization**: Prevents unnecessary re-renders

### Animation Performance
- **Hardware acceleration**: Uses `transform` and `opacity` for animations
- **Reduced motion**: Respects `prefers-reduced-motion` settings
- **Smooth transitions**: 300ms duration for UI state changes

## Common Patterns

### Dashboard Page
```tsx
<TherapistLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Smith</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>Stats Card 1</Card>
          <Card>Stats Card 2</Card>
          <Card>Stats Card 3</Card>
          <Card>Stats Card 4</Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Activity content */}
          </CardContent>
        </Card>
      </div>
    </Container>
  </div>
</TherapistLayout>
```

### Form Page
```tsx
<TherapistLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-600">Update your professional information</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Textarea placeholder="Bio" />
          </CardContent>
        </Card>
      </div>
    </Container>
  </div>
</TherapistLayout>
```

## Testing

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

## Troubleshooting

### Common Issues

#### Sidebar Not Showing on Desktop
- Check if `lg:ml-64` class is applied to main content
- Verify breakpoint is set to 1024px
- Ensure no CSS conflicts with sidebar positioning

#### Bottom Navigation Not Hiding on Desktop
- Check if `lg:pb-0` class is applied to main content
- Verify `pb-20` is applied for mobile spacing
- Ensure bottom navigation has `lg:hidden` class

#### Content Overflow Issues
- Ensure `overflow-auto` is applied to main content
- Check for `min-w-0` on flex/grid containers
- Verify `w-full` is applied to prevent width issues

#### Touch Target Issues
- Ensure all interactive elements have `min-h-touch-min`
- Check for adequate spacing between touch targets
- Verify touch targets are not overlapping

## Related Components

- **AdminLayout**: Similar layout for admin pages
- **PageShell**: Layout for non-dashboard pages
- **TherapistSidebar**: Sidebar navigation component
- **TherapistBottomNav**: Bottom navigation component
- **Container**: Content wrapper component

