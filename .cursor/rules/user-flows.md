---
description: Layout component requirements for dashboard and responsive design patterns
globs: ["src/components/layout/**/*.tsx", "src/pages/therapist/**/*.tsx", "src/pages/admin/**/*.tsx"]
alwaysApply: true
---

# Rule: Layout Components — Dashboard & Responsive Architecture

## Scope
Apply to all layout components and pages using dashboard patterns. Ensure consistent responsive design and component architecture.
🚫 No manual layout implementation - must use provided layout components.

**Reference**: See `docs/design-system/patterns/dashboard-layout.md` for complete dashboard specifications.

## Mandatory Layout Components

### Layout Components (Required)
**All therapist pages MUST use TherapistLayout:**
```tsx
import { TherapistLayout } from "@/components/layout/therapist-layout";
import { Container } from "@/components/ui/container";

export default function YourPage() {
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

export default function YourPage() {
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

**Features:**
- ✅ **Container-wrapped header** with responsive padding (`px-6 md:px-8 lg:px-10`)
- ✅ **Container-wrapped sidebar** with responsive padding
- ✅ **Collapsible sidebar** with smooth 300ms transitions
- ✅ **Mobile-first design** with hamburger menu
- ✅ **No horizontal scroll** at any breakpoint with `overflow-hidden`
- ✅ **One-screen rule compliance** with proper overflow handling
- ✅ **Touch target compliance** - all interactive elements 44px minimum

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
- **Prevents Issues**: Avoids the padding/scaling problems we fixed in ModerationTable

### Common Violations (DO NOT DO)
```tsx
// ❌ WRONG: Missing responsive padding
<AdminLayout>
  <ModerationTable />  {/* No padding wrapper */}
</AdminLayout>

// ❌ WRONG: Missing Container wrapper  
<TherapistLayout>
  <div className="p-8">
    <div className="space-y-6">  {/* No Container */}
      {/* Content */}
    </div>
  </div>
</TherapistLayout>

// ❌ WRONG: Missing content spacing
<AdminLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      {/* Content without space-y-6 */}
    </Container>
  </div>
</AdminLayout>
```

### Layout Atoms (Required)
**Use these components for consistent spacing and alignment:**

```tsx
import { Stack, HStack, Cluster } from "@/components/layout/layout-atoms";

// Vertical stacking with gap-4
<Stack className="space-y-6">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// Horizontal layout with items-center gap-4
<HStack className="justify-between">
  <div>Left content</div>
  <div>Right content</div>
</HStack>

// Wrapping layout for tags/chips with gap-2
<Cluster>
  <Tag>Tag 1</Tag>
  <Tag>Tag 2</Tag>
</Cluster>
```

## Responsive Design Requirements

### Mobile-First Approach
- **Grid systems**: Use CSS Grid and Flexbox for responsive layouts
- **Breakpoints**: Follow Tailwind's responsive prefixes (`md:`, `lg:`)
- **Touch targets**: All interactive elements `min-h-touch-min` (44px)
- **Container padding**: Use responsive Container component with `px-6 md:px-8 lg:px-10`

### Sidebar Behavior
- **Desktop**: Always visible, fixed width (256px)
- **Mobile**: Collapsible with overlay, slides from left
- **Animation**: Smooth 300ms ease-in-out transitions
- **State management**: Controlled by TherapistLayout/AdminLayout components

### Content Areas
- **Main content**: Uses `overflow-auto`, `min-w-0`, and `w-full` for proper flex behavior
- **All cards**: Must use `min-w-0 overflow-hidden` to prevent horizontal overflow
- **Card headers**: Must use responsive padding `p-4 md:p-5 lg:p-6 pb-0`
- **Card content**: Must use responsive padding `p-4 md:p-5 lg:p-6`
- **Scrollable regions**: Use `min-h-0` and `overflow-y-auto` when needed
- **Grid containers**: Must use `w-full min-w-0` to prevent overflow

## Layout Patterns

### Page Structure
```tsx
<TherapistLayout>
  <Stack className="space-y-6">
    {/* Action bar */}
    <HStack className="justify-end">
      <Button>Action</Button>
    </HStack>
    
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
        <Stack className="space-y-4">
          {/* Content using layout atoms */}
        </Stack>
      </CardContent>
    </Card>
  </Stack>
</TherapistLayout>
```

### Grid Layouts
- **Stats cards**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
- **Two-column**: `grid-cols-1 lg:grid-cols-2`
- **Three-column**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Messaging**: `grid-cols-1 lg:grid-cols-3` (1/3 + 2/3 split)

### Spacing System
- **Page sections**: `space-y-6` or `space-y-8`
- **Card content**: `space-y-4`
- **Form fields**: `space-y-3`
- **Inline elements**: `gap-2`, `gap-3`, or `gap-4`

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
