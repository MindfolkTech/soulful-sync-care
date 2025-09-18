# Responsive Design Patterns

## Overview

This document outlines the responsive design patterns used throughout the MindFolk application to ensure consistent, accessible experiences across all devices and screen sizes.

## 📱 Breakpoints

### Standard Breakpoints
```css
/* Mobile First Approach */
/* Base styles: 0px - 767px */
@media (min-width: 768px) { /* md: */ }
@media (min-width: 1024px) { /* lg: */ }
@media (min-width: 1280px) { /* xl: */ }
@media (min-width: 1536px) { /* 2xl: */ }
```

### Custom Breakpoints
```css
/* Mobile breakpoint for JavaScript */
const MOBILE_BREAKPOINT = 768;
```

### Breakpoint Usage
- **Mobile**: < 768px (base styles)
- **Tablet**: 768px - 1023px (`md:` prefix)
- **Desktop**: ≥ 1024px (`lg:` prefix)
- **Large Desktop**: ≥ 1280px (`xl:` prefix)

## 🏗️ Layout Patterns

### Dashboard Layout Behavior

#### Mobile/Tablet (< 1024px)
```tsx
<TherapistLayout>
  {/* Sidebar: Hidden */}
  <main className="ml-0 overflow-auto pb-20">
    {/* Content with bottom navigation */}
  </main>
  {/* Bottom Navigation: Visible */}
</TherapistLayout>
```

#### Desktop (≥ 1024px)
```tsx
<TherapistLayout>
  {/* Sidebar: Visible and collapsible */}
  <main className="ml-64 overflow-auto pb-0">
    {/* Content without bottom navigation */}
  </main>
  {/* Bottom Navigation: Hidden */}
</TherapistLayout>
```

### Content Structure Pattern

#### Responsive Padding
```tsx
<div className="p-4 md:p-6 lg:p-8">
  {/* 
    Mobile: 16px padding
    Tablet: 24px padding  
    Desktop: 32px padding
  */}
</div>
```

#### Container Wrapper
```tsx
<Container>
  {/* 
    Mobile: Full width with side margins
    Tablet: Constrained width with side margins
    Desktop: Max-width container centered
  */}
</Container>
```

## 📐 Grid Patterns

### Stats Cards Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 
    Mobile: 1 column
    Tablet: 2 columns
    Desktop: 4 columns
  */}
</div>
```

### Two Column Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* 
    Mobile: 1 column
    Desktop: 2 columns (50/50 split)
  */}
</div>
```

### Three Column Layout
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 
    Mobile: 1 column
    Tablet: 2 columns
    Desktop: 3 columns
  */}
</div>
```

### Messaging Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-1">
    {/* Sidebar: 1/3 width on desktop */}
  </div>
  <div className="lg:col-span-2">
    {/* Main content: 2/3 width on desktop */}
  </div>
</div>
```

## 🎨 Typography Scaling

### Fluid Typography
```css
/* Automatically scales with viewport */
--text-base: clamp(1rem, 0.90rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.10rem + 0.75vw, 1.5rem);
```

### Responsive Headings
```tsx
<h1 className="text-2xl md:text-3xl lg:text-4xl">
  {/* Scales: 24px → 30px → 36px */}
</h1>
```

## 📏 Spacing Patterns

### Responsive Spacing
```css
/* Fluid spacing tokens */
--space-md: clamp(12px, 6px + 3vw, 16px);
--space-lg: clamp(16px, 8px + 4vw, 24px);
--space-xl: clamp(24px, 12px + 6vw, 32px);
```

### Vertical Rhythm
```tsx
<div className="space-y-4 md:space-y-6 lg:space-y-8">
  {/* 
    Mobile: 16px spacing
    Tablet: 24px spacing
    Desktop: 32px spacing
  */}
</div>
```

## 🎯 Touch Targets

### Minimum Touch Targets
```tsx
<Button className="min-h-touch-min">
  {/* Minimum 44px height */}
</Button>
```

### Comfortable Touch Targets
```tsx
<Button className="min-h-touch-comfort">
  {/* Comfortable 56px height */}
</Button>
```

### Responsive Touch Targets
```tsx
<Button className="min-h-[44px] md:min-h-[48px] lg:min-h-[52px]">
  {/* Scales with breakpoints */}
</Button>
```

## 📱 Mobile-First Patterns

### Progressive Enhancement
```tsx
{/* Base: Mobile styles */}
<div className="flex flex-col space-y-4">
  {/* Mobile: Vertical stack */}
</div>

{/* Enhanced: Tablet styles */}
<div className="md:flex md:flex-row md:space-y-0 md:space-x-6">
  {/* Tablet: Horizontal layout */}
</div>

{/* Enhanced: Desktop styles */}
<div className="lg:grid lg:grid-cols-3 lg:gap-8">
  {/* Desktop: Grid layout */}
</div>
```

### Conditional Rendering
```tsx
const isMobile = useIsMobile();

return (
  <div>
    {isMobile ? (
      <MobileNavigation />
    ) : (
      <DesktopSidebar />
    )}
  </div>
);
```

## 🎨 Card Patterns

### Responsive Card Padding
```tsx
<Card>
  <CardHeader className="p-4 md:p-5 lg:p-6 pb-0">
    {/* Responsive header padding */}
  </CardHeader>
  <CardContent className="p-4 md:p-5 lg:p-6">
    {/* Responsive content padding */}
  </CardContent>
</Card>
```

### Card Grid Patterns
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <Card className="min-w-0 overflow-hidden">
    {/* Prevents horizontal overflow */}
  </Card>
</div>
```

## 🔄 Overflow Handling

### Scrollable Containers
```tsx
<div className="overflow-auto min-h-0">
  {/* Allows scrolling when content overflows */}
</div>
```

### Horizontal Overflow Prevention
```tsx
<div className="w-full min-w-0 overflow-hidden">
  {/* Prevents horizontal scroll */}
</div>
```

### Grid Overflow Prevention
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-0">
  {/* Prevents grid from causing horizontal scroll */}
</div>
```

## 🎭 Animation Patterns

### Responsive Transitions
```css
/* Sidebar transitions */
.sidebar {
  transition: transform 300ms ease-in-out;
}

/* Mobile: Slide in from left */
@media (max-width: 1023px) {
  .sidebar {
    transform: translateX(-100%);
  }
}

/* Desktop: Collapse/expand */
@media (min-width: 1024px) {
  .sidebar {
    transform: translateX(0);
  }
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .sidebar {
    transition: none;
  }
}
```

## 📊 Data Visualization Patterns

### Responsive Charts
```tsx
<div className="w-full h-64 md:h-80 lg:h-96">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      {/* Chart automatically scales */}
    </BarChart>
  </ResponsiveContainer>
</div>
```

### Responsive Tables
```tsx
<div className="overflow-x-auto">
  <table className="min-w-full">
    {/* Horizontal scroll on mobile */}
  </table>
</div>
```

## 🎯 Form Patterns

### Responsive Form Layout
```tsx
<div className="space-y-4 md:space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Input placeholder="First Name" />
    <Input placeholder="Last Name" />
  </div>
  <Textarea className="min-h-[120px] md:min-h-[140px]" />
</div>
```

### Responsive Button Groups
```tsx
<div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
  <Button className="w-full sm:w-auto">Primary</Button>
  <Button variant="outline" className="w-full sm:w-auto">Secondary</Button>
</div>
```

## 🔍 Testing Patterns

### Breakpoint Testing
```tsx
// Test at specific breakpoints
const breakpoints = [320, 768, 1024, 1440];

breakpoints.forEach(width => {
  // Test component at each breakpoint
});
```

### Touch Target Testing
```tsx
// Verify touch targets meet minimum requirements
const touchTargets = document.querySelectorAll('[data-touch-target]');
touchTargets.forEach(target => {
  const rect = target.getBoundingClientRect();
  assert(rect.height >= 44, 'Touch target too small');
});
```

## 🎨 Best Practices

### 1. Mobile-First Approach
- Start with mobile styles
- Enhance for larger screens
- Use progressive enhancement

### 2. Fluid Scaling
- Use `clamp()` for typography and spacing
- Avoid fixed pixel values
- Test at multiple viewport sizes

### 3. Touch-Friendly Design
- Ensure minimum 44px touch targets
- Provide adequate spacing between interactive elements
- Test on actual devices

### 4. Performance Considerations
- Use `transform` and `opacity` for animations
- Respect `prefers-reduced-motion`
- Optimize for mobile performance

### 5. Accessibility
- Test with keyboard navigation
- Ensure proper focus management
- Verify screen reader compatibility

## 🔧 Implementation Checklist

### Before Development
- [ ] Define breakpoint strategy
- [ ] Plan responsive layout structure
- [ ] Identify touch target requirements
- [ ] Plan overflow handling strategy

### During Development
- [ ] Implement mobile-first styles
- [ ] Add responsive breakpoints
- [ ] Test touch target sizes
- [ ] Verify overflow behavior
- [ ] Test keyboard navigation

### After Development
- [ ] Test on multiple devices
- [ ] Verify accessibility compliance
- [ ] Check performance on mobile
- [ ] Validate responsive behavior
- [ ] Document any custom patterns

