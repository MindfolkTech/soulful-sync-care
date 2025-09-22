# PublicPageLayout Component

## Overview

The `PublicPageLayout` component is a specialized layout for public-facing pages (landing, sign-in, sign-up, terms, privacy, etc.) that combines `PageShell` with standardized `Header` and `Footer` components.

## Usage

```tsx
import { PublicPageLayout } from "@/components/layout/public-page-layout";

export default function LandingPage() {
  return (
    <PublicPageLayout>
      <div className="py-16">
        {/* Page content */}
      </div>
    </PublicPageLayout>
  );
}
```

## Props

```tsx
interface PublicPageLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;    // Default: true
  showFooter?: boolean;    // Default: true  
  className?: string;      // Additional styling for PageShell
}
```

## Structure

```tsx
<PublicPageLayout>
  {/* Fixed Header - includes logo, navigation, mobile menu */}
  <Header />
  
  {/* Main Content - your page content goes here */}
  <main>{children}</main>
  
  {/* Footer - company links, legal, branding */}
  <Footer />
</PublicPageLayout>
```

## Features

### Header Integration
- **Logo and branding**: MindFolk logo with link to home
- **Desktop navigation**: "For Therapists", "Sign In", "Get Started" buttons
- **Mobile menu**: Collapsible hamburger menu for mobile devices
- **Sticky positioning**: Header stays visible during scroll
- **Backdrop blur**: Modern glass effect with background blur

### Footer Integration
- **Company information**: Logo, description, contact details
- **Navigation sections**: Links for clients, therapists, and legal pages
- **Compliance badges**: GDPR and WCAG compliance indicators
- **Copyright notice**: Current year and company rights

### Responsive Behavior
- **Desktop**: Full header navigation visible, footer always shown
- **Mobile**: Collapsible menu, footer adapts to mobile layout
- **Touch targets**: All interactive elements meet 44px minimum
- **Safe areas**: Proper handling of mobile device safe areas

## When to Use

### ✅ Use PublicPageLayout For:
- **Landing pages** and marketing content
- **Authentication pages** (sign-in, sign-up)
- **Legal pages** (privacy policy, terms of service)
- **About pages** and company information
- **Pre-authentication user journeys**
- **Public content pages**

### ❌ Do NOT Use PublicPageLayout For:
- **Dashboard pages** - Use `TherapistLayout` or `AdminLayout`
- **Authenticated flows** - Use specific layouts
- **Discovery/onboarding flows** - Use `DiscoveryShell`
- **Complex navigation pages** - Use dashboard layouts

## Integration with Design System

### Typography
- **Headings (H1-H3)**: Use `font-primary` (Crimson Pro)
- **Body text (H4-H6, p)**: Use `font-secondary` (Helvetica Neue)
- **Navigation**: Consistent font sizing and spacing

### Colors and Tokens
- **Header background**: `hsl(var(--warm-white))`
- **Footer background**: `hsl(var(--surface))`
- **Text colors**: Use semantic tokens (`--text-primary`, `--text-secondary`)
- **Brand colors**: `hsl(var(--garden-green))` for accents

### Spacing and Layout
- **Content padding**: Managed by `Container` component
- **Vertical rhythm**: Consistent spacing patterns
- **Touch targets**: Minimum 44px for interactive elements

## Accessibility

### Keyboard Navigation
- **Tab order**: Logical progression through header, content, footer
- **Focus indicators**: Visible focus rings on all interactive elements
- **Skip links**: Allow users to skip navigation

### Screen Reader Support
- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<footer>`
- **ARIA labels**: Descriptive labels for interactive elements
- **Landmark roles**: Clear page structure for assistive technology

### Mobile Accessibility
- **Touch targets**: Comfortable spacing for mobile interaction
- **Contrast ratios**: Meet WCAG AA standards
- **Responsive text**: Scales appropriately across devices

## Examples

### Basic Landing Page
```tsx
import { PublicPageLayout } from "@/components/layout/public-page-layout";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function LandingPage() {
  return (
    <PublicPageLayout>
      <div className="py-16">
        <Container>
          <div className="text-center space-y-8">
            <h1 className="font-primary text-4xl font-bold">
              Welcome to MindFolk
            </h1>
            <p className="font-secondary text-lg text-[hsl(var(--text-secondary))]">
              Find your perfect therapy match
            </p>
            <Button size="lg" asChild>
              <Link to="/sign-up">Get Started</Link>
            </Button>
          </div>
        </Container>
      </div>
    </PublicPageLayout>
  );
}
```

### Legal Page
```tsx
import { PublicPageLayout } from "@/components/layout/public-page-layout";
import { Container } from "@/components/ui/container";

export default function Privacy() {
  return (
    <PublicPageLayout>
      <div className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-slate">
            <h1 className="font-primary text-3xl font-bold">Privacy Policy</h1>
            <div className="space-y-6 font-secondary">
              {/* Legal content */}
            </div>
          </div>
        </Container>
      </div>
    </PublicPageLayout>
  );
}
```

### Header-Only Page
```tsx
import { PublicPageLayout } from "@/components/layout/public-page-layout";

export default function SpecialPage() {
  return (
    <PublicPageLayout showFooter={false}>
      {/* Content without footer */}
    </PublicPageLayout>
  );
}
```

## Migration from PageShell

If you have existing pages using `PageShell` without header/footer:

```tsx
// Before
<PageShell>
  <div className="py-16">
    {/* Content */}
  </div>
</PageShell>

// After
<PublicPageLayout>
  <div className="py-16">
    {/* Content */}
  </div>
</PublicPageLayout>
```

## Performance Considerations

- **Header state**: Mobile menu state is managed efficiently
- **Image optimization**: Logo and assets use appropriate formats
- **Lazy loading**: Non-critical footer content can be lazy loaded
- **Bundle splitting**: Components can be code-split for better performance

## Browser Support

- **Modern browsers**: Full support for all features
- **Backdrop blur**: Graceful fallback for unsupported browsers
- **Safe area**: iOS notch and Android gesture bar support
- **Touch interactions**: Optimized for mobile devices