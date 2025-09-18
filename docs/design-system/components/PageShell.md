# PageShell Component

## Overview

PageShell is the base layout component for non-dashboard pages such as onboarding flows, public pages, and pre-authentication user journeys. It provides a simple header/footer structure with responsive content areas.

## Usage

```tsx
import { PageShell } from "@/components/ui/page-shell";
import { Container } from "@/components/ui/container";

export default function OnboardingPage() {
  return (
    <PageShell showHeader={true} showFooter={true}>
      <Container>
        <div className="py-8">
          {/* Your page content here */}
        </div>
      </Container>
    </PageShell>
  );
}
```

## Features

### ✅ Simple Layout Structure
- **Grid Layout**: `grid-rows-[auto_1fr_auto]` (header, content, footer)
- **Full Height**: `min-h-dvh` (dynamic viewport height)
- **Overflow Control**: `overflow-hidden` (prevents horizontal scroll)
- **Background**: `bg-warm-white`

### ✅ Optional Header/Footer
- **Header**: Optional, controlled by `showHeader` prop
- **Footer**: Optional, mobile-only, controlled by `showFooter` prop
- **Safe Area**: Footer includes `pb-[env(safe-area-inset-bottom)]` for iOS

### ✅ Responsive Behavior
- **Header**: Always visible when `showHeader={true}`
- **Footer**: Only shows on mobile (`md:hidden`) when `showFooter={true}`
- **Content**: Wrapped in `Container` with responsive padding

## Props

```tsx
interface PageShellProps {
  children: ReactNode;    // Page content
  showHeader?: boolean;   // Show header (default: true)
  showFooter?: boolean;   // Show footer (default: true)
  className?: string;     // Additional CSS classes
}
```

## When to Use PageShell

### ✅ Use PageShell For:
- **Onboarding flows**: `/t/onboarding`, `/client/onboarding`
- **Pre-authentication pages**: Landing pages, sign-up, login
- **Public pages**: About, pricing, terms of service
- **Assessment flows**: Client discovery and matching flows
- **Simple content pages**: Without complex navigation

### ❌ Do NOT Use PageShell For:
- **Dashboard pages**: Use `TherapistLayout` or `AdminLayout` instead
- **Authenticated flows**: Use specific layout components
- **Pages with sidebars**: Use dashboard layouts
- **Complex navigation**: Use dashboard layouts

## Layout Structure

### Basic Structure
```tsx
<PageShell>
  {/* Header Row (optional) */}
  <header className="row-start-1">
    {/* Header content */}
  </header>
  
  {/* Main Content Row */}
  <main className="row-start-2 overflow-hidden">
    <Container>
      <div className="min-h-full flex flex-col">
        {/* Your content */}
      </div>
    </Container>
  </main>
  
  {/* Footer Row (optional, mobile-only) */}
  <footer className="row-start-3 md:hidden">
    {/* Footer content */}
  </footer>
</PageShell>
```

### Grid Layout
```css
.grid-rows-[auto_1fr_auto] {
  grid-template-rows: auto 1fr auto;
}
```

- **Row 1**: Header (auto height)
- **Row 2**: Main content (takes remaining space)
- **Row 3**: Footer (auto height, hidden on desktop)

## Common Patterns

### Onboarding Flow
```tsx
<PageShell showHeader={false} showFooter={true}>
  <Container>
    <div className="py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to MindFolk</h1>
        <p className="text-gray-600 mt-2">Let's get you started</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Email" type="email" />
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline">Skip</Button>
        <Button>Continue</Button>
      </div>
    </div>
  </Container>
</PageShell>
```

### Public Landing Page
```tsx
<PageShell showHeader={true} showFooter={false}>
  <Container>
    <div className="py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Find Your Perfect Therapist</h1>
        <p className="text-xl text-gray-600 mt-4">
          Connect with licensed therapists who understand your unique needs
        </p>
        <Button size="lg" className="mt-6">
          Get Started
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personalized Matching</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Find therapists who match your personality and needs</p>
          </CardContent>
        </Card>
        {/* More feature cards */}
      </div>
    </div>
  </Container>
</PageShell>
```

### Assessment Flow
```tsx
<PageShell showHeader={true} showFooter={true}>
  <Container>
    <div className="py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Assessment</h1>
        <p className="text-gray-600">Step 2 of 5</p>
        <Progress value={40} className="mt-4" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>How are you feeling today?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-20">
              <div className="text-center">
                <div className="text-2xl mb-2">😊</div>
                <div>Great</div>
              </div>
            </Button>
            <Button variant="outline" className="h-20">
              <div className="text-center">
                <div className="text-2xl mb-2">😐</div>
                <div>Okay</div>
              </div>
            </Button>
            <Button variant="outline" className="h-20">
              <div className="text-center">
                <div className="text-2xl mb-2">😔</div>
                <div>Not Great</div>
              </div>
            </Button>
            <Button variant="outline" className="h-20">
              <div className="text-center">
                <div className="text-2xl mb-2">😢</div>
                <div>Struggling</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline">Back</Button>
        <Button>Next</Button>
      </div>
    </div>
  </Container>
</PageShell>
```

## Integration with Other Components

### Container Integration
```tsx
<PageShell>
  <Container>
    <div className="py-8">
      {/* Content with responsive padding */}
    </div>
  </Container>
</PageShell>
```

### Header Integration
```tsx
<PageShell showHeader={true}>
  <div className="fixed top-0 left-0 right-0 z-50">
    <Header />
  </div>
  <div className="pt-16">
    {/* Content with header offset */}
  </div>
</PageShell>
```

### Bottom Navigation Integration
```tsx
<PageShell showFooter={true}>
  <div className="pb-20">
    {/* Content with footer offset */}
  </div>
  <div className="fixed bottom-0 left-0 right-0 z-50">
    <BottomNav />
  </div>
</PageShell>
```

## Accessibility

### Touch Targets
- **Minimum touch targets**: `min-h-touch-min` (44px) for all interactive elements
- **Comfortable touch targets**: `min-h-touch-comfort` (56px) for primary actions

### Focus Management
- **Focus indicators**: Visible focus rings on all interactive elements
- **Keyboard navigation**: All flows must be keyboard accessible

### Screen Reader Support
- **Semantic HTML**: Use proper heading hierarchy (h1, h2, h3)
- **ARIA labels**: Provide descriptive labels for interactive elements
- **Live regions**: Use `aria-live` for dynamic content updates

## Responsive Design

### Breakpoint Behavior
- **Mobile**: Full-width content, footer visible
- **Tablet**: Full-width content, footer hidden
- **Desktop**: Full-width content, footer hidden

### Spacing Patterns
- **Container padding**: `px-6 md:px-8 lg:px-10` for horizontal spacing
- **Card padding**: `p-4 md:p-5 lg:p-6` for content blocks
- **Vertical rhythm**: `gap-4` (headline/body), `gap-6` (section → primary CTA)

## Performance Considerations

### Component Loading
- **Minimize re-renders**: Use React.memo for static content
- **Lazy loading**: Implement for heavy content sections
- **Image optimization**: Use responsive images with proper sizing

### Animation Performance
- **Hardware acceleration**: Use `transform` and `opacity` for animations
- **Reduced motion**: Respect `prefers-reduced-motion` settings
- **Smooth transitions**: 300ms duration for UI state changes

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

#### Content Not Centering
- Ensure `Container` component is used
- Check for proper CSS classes on content wrapper
- Verify no conflicting styles

#### Footer Not Showing on Mobile
- Check `showFooter={true}` prop
- Verify `md:hidden` class is applied
- Ensure safe area insets are working

#### Header Overlap
- Add `pt-16` to content when using fixed header
- Check z-index values for header positioning
- Verify header height calculations

#### Touch Targets Too Small
- Use `min-h-touch-min` or `min-h-touch-comfort`
- Check for adequate spacing between elements
- Verify touch target sizes on actual devices

## Related Components

- **TherapistLayout**: Layout for therapist dashboard pages
- **AdminLayout**: Layout for admin dashboard pages
- **Container**: Content wrapper component
- **Header**: Header component for public pages
- **BottomNav**: Bottom navigation component

