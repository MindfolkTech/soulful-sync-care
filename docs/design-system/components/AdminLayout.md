# AdminLayout Component

## Overview

AdminLayout is the base layout component for all authenticated admin pages. It provides consistent sidebar navigation, responsive behavior, and proper content structure across all admin interfaces.

## Usage

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

## Features

### ✅ Sidebar Navigation
- **AdminSidebar**: Navigation with admin-specific menu items
- **Collapsible**: Smooth 300ms transitions on desktop
- **Responsive**: Hidden on mobile/tablet, visible on desktop

### ✅ Bottom Navigation
- **AdminBottomNav**: Mobile navigation for touch devices
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
interface AdminLayoutProps {
  children: ReactNode;    // Page content (should include Container wrapper)
  className?: string;     // Additional CSS classes for main content area
}
```

## Navigation Items

### Admin Menu Items
- **Overview**: `/admin/overview` - System overview and metrics
- **Users**: `/admin/users` - User management and oversight
- **Therapists**: `/admin/therapists` - Therapist verification and management
- **Moderation**: `/admin/moderation` - Content moderation tools
- **Bookings**: `/admin/bookings` - Booking management and oversight

## Responsive Behavior

### Mobile/Tablet (< 1024px)
```tsx
<AdminLayout>
  {/* Sidebar: Hidden with overlay when toggled */}
  <main className="ml-0 overflow-auto pb-20">
    {/* Content with bottom navigation space */}
  </main>
  {/* Bottom Navigation: Visible */}
</AdminLayout>
```

### Desktop (≥ 1024px)
```tsx
<AdminLayout>
  {/* Sidebar: Visible and collapsible */}
  <main className="ml-64 overflow-auto pb-0">
    {/* Content without bottom navigation space */}
  </main>
  {/* Bottom Navigation: Hidden */}
</AdminLayout>
```

## Content Structure Requirements

### ✅ Required Pattern
```tsx
<AdminLayout>
  <div className="p-4 md:p-6 lg:p-8">  {/* ← REQUIRED: Responsive padding */}
    <Container>                        {/* ← REQUIRED: Container wrapper */}
      <div className="space-y-6">      {/* ← REQUIRED: Content spacing */}
        {/* Page content */}
      </div>
    </Container>
  </div>
</AdminLayout>
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

### Overview Dashboard
```tsx
<AdminLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Overview</h1>
          <p className="text-gray-600">System metrics and insights</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
            </CardContent>
          </Card>
          {/* More stats cards */}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chart component */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Activity list */}
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</AdminLayout>
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

### Moderation Page
```tsx
<AdminLayout>
  <div className="p-4 md:p-6 lg:p-8">
    <Container>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Moderation</h1>
          <p className="text-gray-600">Review and manage flagged content</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            3 Pending Review
          </Badge>
          <Button variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve Selected
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Reported User</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Moderation table rows */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Container>
  </div>
</AdminLayout>
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

- **TherapistLayout**: Similar layout for therapist pages
- **PageShell**: Layout for non-dashboard pages
- **AdminSidebar**: Sidebar navigation component
- **AdminBottomNav**: Bottom navigation component
- **Container**: Content wrapper component

