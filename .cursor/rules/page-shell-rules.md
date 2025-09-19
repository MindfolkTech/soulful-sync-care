---
description: PageShell component requirements and usage patterns for non-dashboard pages
globs: ["src/components/ui/page-shell.tsx", "src/components/organisms/discovery-shell.tsx", "src/pages/public/**/*.tsx", "src/pages/client/onboarding/**/*.tsx"]
alwaysApply: true
---

# Rule: PageShell — Base Layout Component for Non-Dashboard Pages

## Scope
Apply to all non-dashboard pages (React/TSX/CSS/Tailwind). Ensure consistent page structure for discovery, onboarding, and public pages.
🚫 No manual page layout implementation - must use PageShell component.

**Reference**: See `docs/LAYOUT_COMPONENTS.md` for dashboard layout requirements.

## What is PageShell?

`PageShell` is a **base layout component** that provides the fundamental page structure for non-dashboard pages (like discovery/onboarding flows).

## PageShell Structure

```tsx
<PageShell showHeader={true} showFooter={true}>
  {/* Your content goes here */}
</PageShell>
```

### Core Layout Pattern:
- **Grid Layout**: `grid-rows-[auto_1fr_auto]` (header, content, footer)
- **Full Height**: `min-h-dvh` (dynamic viewport height)
- **Overflow Control**: `overflow-hidden` (prevents horizontal scroll)
- **Background**: `bg-warm-white`

### Three Main Sections:
1. **Header Row** (`row-start-1`) - Optional, controlled by `showHeader`
2. **Main Content Row** (`row-start-2`) - Always present, scrollable
3. **Footer Row** (`row-start-3`) - Optional, mobile-only, controlled by `showFooter`

## PageShell Props

```tsx
interface PageShellProps {
  children: React.ReactNode;
  showHeader?: boolean;    // Default: true
  showFooter?: boolean;    // Default: true  
  className?: string;      // Additional styling
}
```

## Responsive Behavior

- **Header**: Always visible when `showHeader={true}`
- **Footer**: Only shows on mobile (`md:hidden`) when `showFooter={true}`
- **Safe Area**: Footer includes `pb-[env(safe-area-inset-bottom)]` for iOS
- **Content**: Wrapped in `Container` with responsive padding

## Usage Patterns

### 1. Discovery Shell (Current Usage)
```tsx
<PageShell>
  {/* Fixed Header */}
  <div className="fixed top-0 left-0 right-0 z-50">
    <Header />
  </div>
  
  {/* Scrollable Content */}
  <div className="flex-1 pt-16 pb-20 overflow-auto">
    {children}
  </div>
  
  {/* Fixed Bottom Navigation */}
  <div className="fixed bottom-0 left-0 right-0 z-50">
    <BottomNav />
  </div>
</PageShell>
```

### 2. Simple Page Shell
```tsx
<PageShell showHeader={false} showFooter={false}>
  {/* Just content, no header/footer */}
  {children}
</PageShell>
```

### 3. Content-Only Page
```tsx
<PageShell showHeader={false} showFooter={false}>
  <Container>
    <div className="py-8">
      {/* Page content */}
    </div>
  </Container>
</PageShell>
```

## When to Use PageShell

### ✅ Use PageShell For:
- **Discovery/onboarding flows**
- **Public pages** (landing, about, etc.)
- **Pre-authentication** user journeys
- **Simple content pages** without complex navigation
- **Client onboarding** flows
- **Assessment flows**

### ❌ Do NOT Use PageShell For:
- **Dashboard pages** - Use `TherapistLayout` or `AdminLayout` instead
- **Authenticated flows** - Use specific layout components
- **Pages with sidebars** - Use dashboard layouts
- **Complex navigation** - Use dashboard layouts

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

## Accessibility Requirements

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

## Responsive Design Requirements

### Breakpoint Behavior
- **Mobile**: Full-width content, footer visible
- **Tablet**: Full-width content, footer hidden
- **Desktop**: Full-width content, footer hidden

### Spacing Patterns
- **Container padding**: `px-6 md:px-8 lg:px-10` for horizontal spacing
- **Card padding**: `p-4 md:p-5 lg:p-6` for content blocks
- **Vertical rhythm**: `gap-4` (headline/body), `gap-6` (section → primary CTA)

## Key Rules

1. **Always wrap content** in PageShell for non-dashboard pages
2. **Use Container** inside PageShell for responsive padding
3. **Control header/footer** with boolean props
4. **Mobile-first** footer behavior (hidden on desktop)
5. **Overflow handling** built-in to prevent horizontal scroll
6. **Safe area support** for mobile devices
7. **Semantic HTML** structure with proper heading hierarchy
8. **Accessibility compliance** with WCAG AA standards

## Examples

### Public Landing Page
```tsx
import { PageShell } from "@/components/ui/page-shell";
import { Container } from "@/components/ui/container";

export default function LandingPage() {
  return (
    <PageShell showHeader={true} showFooter={false}>
      <Container>
        <div className="py-8">
          <h1 className="text-4xl font-bold mb-6">Welcome to MindFolk</h1>
          <p className="text-lg mb-8">Find your perfect therapist match</p>
          <Button size="lg">Get Started</Button>
        </div>
      </Container>
    </PageShell>
  );
}
```

### Client Onboarding Flow
```tsx
import { PageShell } from "@/components/ui/page-shell";
import { DiscoveryShell } from "@/components/organisms/discovery-shell";

export default function ClientOnboarding() {
  return (
    <DiscoveryShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Let's Get Started</h1>
        <p className="text-lg">Tell us about yourself</p>
        {/* Onboarding content */}
      </div>
    </DiscoveryShell>
  );
}
```

## Troubleshooting

### Common Issues
1. **Horizontal scroll**: Ensure content uses Container and responsive padding
2. **Footer not showing**: Check `showFooter={true}` and mobile breakpoint
3. **Header overlap**: Add `pt-16` to content when using fixed header
4. **Touch targets too small**: Use `min-h-touch-min` or `min-h-touch-comfort`

### Performance Considerations
- **Minimize re-renders**: Use React.memo for static content
- **Lazy loading**: Implement for heavy content sections
- **Image optimization**: Use responsive images with proper sizing
