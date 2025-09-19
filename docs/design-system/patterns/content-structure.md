# Content Structure Pattern

## Overview

The content structure pattern defines the mandatory wrapper structure that all dashboard pages must follow to ensure consistent responsive behavior, proper scaling, and accessibility compliance.

## 🚨 Critical Requirements

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

## Why This Structure is Required

### 1. Responsive Padding
```tsx
<div className="p-4 md:p-6 lg:p-8">
```
- **Mobile**: 16px padding (`p-4`)
- **Tablet**: 24px padding (`md:p-6`)
- **Desktop**: 32px padding (`lg:p-8`)
- **Ensures**: Proper scaling across all devices

### 2. Container Wrapper
```tsx
<Container>
```
- **Provides**: Max-width constraints for readability
- **Ensures**: Proper content centering on large screens
- **Prevents**: Content from stretching too wide

### 3. Content Spacing
```tsx
<div className="space-y-6">
```
- **Maintains**: Consistent vertical rhythm
- **Ensures**: Proper spacing between sections
- **Creates**: Visual hierarchy and readability

## Common Violations (DO NOT DO)

### ❌ Missing Responsive Padding
```tsx
<AdminLayout>
  <ModerationTable />  {/* No padding wrapper */}
</AdminLayout>
```
**Problem**: Content touches edges, poor mobile experience

### ❌ Missing Container Wrapper
```tsx
<TherapistLayout>
  <div className="p-8">
    <div className="space-y-6">  {/* No Container */}
      {/* Content */}
    </div>
  </div>
</TherapistLayout>
```
**Problem**: Content stretches too wide on large screens

### ❌ Missing Content Spacing
```tsx
<AdminLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      {/* Content without space-y-6 */}
    </Container>
  </div>
</AdminLayout>
```
**Problem**: Inconsistent spacing, poor visual hierarchy

### ❌ Direct Component Usage
```tsx
<TherapistLayout>
  <SomeComponent />  {/* No wrapper structure */}
</TherapistLayout>
```
**Problem**: Component doesn't follow responsive patterns

## ✅ Correct Implementations

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

### Data Management Page
```tsx
<AdminLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-gray-600">Monitor and manage platform users</p>
          </div>
          <Button>Add User</Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input placeholder="Search users..." className="flex-1" />
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="client">Clients</SelectItem>
                    <SelectItem value="therapist">Therapists</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Table rows */}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  </div>
</AdminLayout>
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
        
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </Container>
  </div>
</TherapistLayout>
```

## Responsive Behavior

### Mobile (< 768px)
```tsx
<div className="p-4">  {/* 16px padding */}
  <Container>          {/* Full width with side margins */}
    <div className="space-y-6">  {/* 24px vertical spacing */}
      {/* Content */}
    </div>
  </Container>
</div>
```

### Tablet (768px - 1023px)
```tsx
<div className="p-6">  {/* 24px padding */}
  <Container>          {/* Constrained width with side margins */}
    <div className="space-y-6">  {/* 24px vertical spacing */}
      {/* Content */}
    </div>
  </Container>
</div>
```

### Desktop (≥ 1024px)
```tsx
<div className="p-8">  {/* 32px padding */}
  <Container>          {/* Max-width container centered */}
    <div className="space-y-6">  {/* 24px vertical spacing */}
      {/* Content */}
    </div>
  </Container>
</div>
```

## Accessibility Considerations

### Touch Targets
- **Minimum**: 44px (`min-h-touch-min`) for all interactive elements
- **Comfortable**: 56px (`min-h-touch-comfort`) for primary actions
- **Spacing**: Adequate space between touch targets

### Focus Management
- **Tab order**: Logical flow through all interactive elements
- **Focus rings**: Visible focus indicators on all controls
- **Skip links**: Proper navigation for screen readers

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

## Implementation Checklist

### Before Development
- [ ] Plan content structure following the pattern
- [ ] Identify responsive requirements
- [ ] Plan touch target requirements
- [ ] Plan accessibility features

### During Development
- [ ] Implement responsive padding wrapper
- [ ] Add Container wrapper
- [ ] Implement content spacing
- [ ] Test responsive behavior
- [ ] Verify touch target sizes
- [ ] Test keyboard navigation

### After Development
- [ ] Test on multiple devices
- [ ] Verify accessibility compliance
- [ ] Check performance on mobile
- [ ] Validate responsive behavior
- [ ] Document any custom patterns

## Common Mistakes to Avoid

### 1. Skipping the Padding Wrapper
```tsx
❌ <TherapistLayout><Container>Content</Container></TherapistLayout>
✅ <TherapistLayout><div className="p-4 md:p-6 lg:p-8"><Container>Content</Container></div></TherapistLayout>
```

### 2. Skipping the Container
```tsx
❌ <TherapistLayout><div className="p-4 md:p-6 lg:p-8">Content</div></TherapistLayout>
✅ <TherapistLayout><div className="p-4 md:p-6 lg:p-8"><Container>Content</Container></div></TherapistLayout>
```

### 3. Skipping the Content Spacing
```tsx
❌ <TherapistLayout><div className="p-4 md:p-6 lg:p-8"><Container><div>Content</div></Container></div></TherapistLayout>
✅ <TherapistLayout><div className="p-4 md:p-6 lg:p-8"><Container><div className="space-y-6">Content</div></Container></div></TherapistLayout>
```

### 4. Using Hardcoded Spacing
```tsx
❌ <div className="p-8">  {/* Fixed padding */}
✅ <div className="p-4 md:p-6 lg:p-8">  {/* Responsive padding */}
```

## Related Patterns

- **[Dashboard Layout](dashboard-layout.md)**: Overall dashboard layout requirements
- **[Responsive Patterns](../RESPONSIVE_PATTERNS.md)**: Responsive design guidelines
- **[Layout Components](../LAYOUT_COMPONENTS.md)**: Layout component requirements

