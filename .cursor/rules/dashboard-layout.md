---
description: Dashboard layout and widget requirements for therapist and admin sections based on Figma design specifications
globs: ["src/pages/therapist/**/*.tsx", "src/pages/admin/**/*.tsx"]
alwaysApply: true
---

# Rule: Dashboard Layout — Therapist & Admin Pattern (Figma Design Implementation)

## Scope
Apply to all therapist and admin pages (React/TSX/CSS/Tailwind). Ensure consistent dashboard layout across all management interfaces.
🚫 No deviations from the dashboard layout pattern and component hierarchy.

**Reference**: See `design-tokens.md` for complete token definitions and usage guidelines.

## Dashboard Layout Requirements

### Shared Dashboard Layout Component (Mandatory)
**All therapist and admin pages MUST use the `DashboardLayout` component:**

```tsx
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function YourPage() {
  return (
    <DashboardLayout 
      title="Page Title"
      subtitle="Optional page description"
    >
      {/* Your page content here */}
    </DashboardLayout>
  );
}
```

### Layout Atoms (Required)
**Use these components for consistent flexbox layouts:**

```tsx
import { Stack, HStack, Cluster } from "@/components/layout/layout-atoms";

// Vertical stacking with gap-4
<Stack className="space-y-6">...</Stack>

// Horizontal layout with items-center gap-4  
<HStack className="justify-between">...</HStack>

// Wrapping layout for tags/chips with gap-2
<Cluster>...</Cluster>
```

### Header Section (Automated by DashboardLayout)
- **Mindfolk logo** - `text-white` on `bg-jovial-jade` background
- **Search bar** - "Search Clients" placeholder with magnifying glass icon
- **User avatar** - Circular with initials, positioned top-right
- **Background**: Full-width `bg-jovial-jade` header bar
- **Mobile menu toggle** - Hamburger menu for sidebar on mobile

### Sidebar Navigation (Automated by DashboardLayout)
- **Background**: `bg-surface-accent`
- **Active state**: `bg-jovial-jade` vertical bar + `text-white`
- **Collapsible**: Slides out on mobile, always visible on desktop
- **Navigation items**:
  - Dashboard (house icon) - currently active
  - My Clients (two-person icon)
  - My Profile (single-person icon)
  - Performance & Analytics (bar chart icon)
- **Quick Actions section**:
  - Update pricing
  - Add a new video
  - Learn engagement boost
  - FAQ
- **Sign out** link at bottom

### Main Content Area (4-Widget Grid)

#### Widget 1: Upcoming Appointments (Top Left)
- **Title**: "Upcoming Appointments" with "EDIT" link
- **Action**: "OPEN CALENDAR" with external link icon
- **Content**:
  - Client avatars (circular with initials)
  - Full client names (not initials)
  - Date and time (Apr 21 10:00am - 10:30am format)
  - `bg-garden-green` "Join Now >" buttons for each appointment
- **Scrollable**: Vertical scrollbar if more than 3 appointments

#### Widget 2: My Client Dashboard (Top Right)
- **Title**: "My Client Dashboard" with "EDIT" link
- **Action**: "OPEN CLIENTS" with external link icon
- **Content**:
  - Client avatars (circular with initials)
  - Full client names
  - Email addresses displayed
  - Status badges: "Active" (`bg-success`) / "Inactive" (`bg-warning`)
  - "EDIT" link next to each status

#### Widget 3: Income Details (Bottom Left)
- **Title**: "Income Details" with "EDIT" link
- **Action**: "OPEN ANALYTICS" with external link icon
- **Content**:
  - "Appointments" section label
  - Large donut chart with central number (122)
  - Color segments: orange, purple, green
  - Represents: completed/cancelled/rescheduled sessions

#### Widget 4: My Business Profile (Bottom Right)
- **Title**: "My Business Profile" with "EDIT" link
- **Action**: "OPEN PROFILE" with external link icon
- **Content**:
  - "Profile Views in the last year" section label
  - Line graph with upward trend (9k to 20k)
  - Orange line color
  - Y-axis labels: 9k, 11k, 14k, 17k, 20k

## Color Specifications

### Header Colors
- **Background**: `bg-jovial-jade`
- **Text**: `text-white`
- **Logo**: `text-white`

### Sidebar Colors
- **Background**: `bg-surface-accent`
- **Text**: `text-jovial-jade`
- **Active state**: `bg-jovial-jade` + `text-white`
- **Icons**: `text-jovial-jade`

### Widget Colors
- **Background**: `bg-card`
- **Borders**: `border-border`
- **Titles**: `text-jovial-jade`
- **Action links**: `text-garden-green`
- **Join buttons**: `bg-garden-green` + `text-white`
- **Status badges**: 
  - Active: `bg-success` + `text-white`
  - Inactive: `bg-warning` + `text-foreground`

### Chart Colors (Aligned with chart-components.md)
- **Donut chart segments**: 
  - Completed: `bg-btn-accent` (orange)
  - Cancelled: `bg-tag-language` (purple)  
  - Rescheduled: `bg-tag-modality` (green)
- **Line graph**: `bg-btn-accent` (orange trend line)
- **Chart text**: `text-jovial-jade` (central numbers), `text-muted-foreground` (labels)

## Typography Requirements

### Headers
- **Main title**: "Welcome Back, Sarah!" - `font-primary`, large size, `text-jovial-jade`
- **Widget titles**: `font-primary`, medium size, `text-jovial-jade`
- **Section labels**: `font-secondary`, small size, `text-muted-foreground`

### Content
- **Client names**: `font-secondary`, medium size, `text-foreground`
- **Email addresses**: `font-secondary`, small size, `text-muted-foreground`
- **Times/dates**: `font-secondary`, small size, `text-muted-foreground`
- **Action links**: `font-secondary`, small size, `text-garden-green`

## Interactive Elements

### Buttons
- **Join Now**: `bg-garden-green`, `text-white`, rounded corners
- **EDIT links**: `text-garden-green`, no background
- **OPEN links**: `text-garden-green` with external link icon
- **Status badges**: Rounded, colored backgrounds

### Touch Targets
- **All buttons**: `min-h-touch-min` (44px)
- **Action links**: `min-h-touch-min` (44px)
- **Client rows**: Full row clickable for selection

## Layout Specifications

### Responsive Design (Built into DashboardLayout)
- **Mobile-first**: Flexbox-based responsive design
- **Collapsible sidebar**: Slides out on mobile with overlay
- **One-screen rule**: Content fits within viewport with proper overflow handling
- **No horizontal scroll**: Perfect scaling on all screen sizes
- **Touch targets**: All interactive elements meet 44px minimum
- **Container padding**: Uses responsive Container component with `px-6 md:px-8 lg:px-10`

### Grid System
- **Dashboard page**: 4-widget layout (2x2 grid on desktop, single column on mobile)
- **Other pages**: Flexible grid layouts using CSS Grid and Flexbox
- **Spacing**: Consistent gaps using `gap-4` and `gap-6`
- **Content areas**: Use Stack and HStack atoms for consistent spacing

### Widget Dimensions
- **Card padding**: `p-4 md:p-5 lg:p-6` for responsive internal padding
- **Equal height**: Cards use `h-full` for consistent heights
- **Scrollable content**: `overflow-y-auto` with `min-h-0` when needed

## Token Usage Requirements
- **Always use Tailwind class names** instead of CSS variable syntax (e.g., `bg-jovial-jade` not `bg-[--jovial-jade]`)
- **Follow design-tokens.md** for all token usage
- **Use semantic class names** (e.g., `text-white`, `text-foreground`)
- **Reference design-tokens.md** for complete token definitions
- **Follow text-colors.md** for proper text color hierarchy
- **Align with user-flows.md** specifications for all dashboard components

## Accessibility Requirements

### ARIA Labels
- **Widget titles**: Proper heading hierarchy
- **Charts**: Alt text and data labels
- **Buttons**: Descriptive button text
- **Status badges**: Screen reader friendly

### Focus Management
- **Tab order**: Logical flow through widgets
- **Focus indicators**: Visible focus rings
- **Keyboard navigation**: All interactive elements accessible

## Page-Specific Requirements

### Therapist Dashboard Page (Reference Implementation)
- **4-widget grid layout** is mandatory - no other arrangements
- **Full client names** must be displayed, not just initials
- **Color specifications** must match Figma exactly
- **Action links** must have external link icons
- **Charts** must use specified colors (orange, purple, green)
- **Status badges** must use exact color combinations

### All Therapist Pages (Mandatory Pattern)
**Every therapist page MUST follow this exact pattern:**

```tsx
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Stack, HStack } from "@/components/layout/layout-atoms";

export default function TherapistPageName() {
  return (
    <DashboardLayout 
      title="Page Title"
      subtitle="Page description"
    >
      <Stack className="space-y-6">
        {/* Page content using proper layout atoms */}
      </Stack>
    </DashboardLayout>
  );
}
```

### Page-Specific Content Requirements

#### Therapist Analytics Page
- **Content**: KPIs grid, performance charts, improvement suggestions
- **Layout**: Use `Stack` for main content, `HStack` for action buttons
- **Widgets**: Analytics-specific cards with proper spacing

#### Therapist Clients Page  
- **Content**: Client search, stats cards, client list with actions
- **Layout**: Search bar in `HStack`, client list in scrollable container
- **Widgets**: Client management interface with proper touch targets

#### Therapist Bookings Page
- **Content**: Booking stats, appointment tabs (upcoming/calendar/availability)
- **Layout**: Tab interface with responsive booking cards
- **Widgets**: Calendar integration and appointment management

#### Therapist Messages Page
- **Content**: Conversation list + message thread (2-column layout)
- **Layout**: Grid layout `grid-cols-1 lg:grid-cols-3` for responsive messaging
- **Widgets**: Secure messaging interface with proper overflow handling

#### Therapist Profile Page
- **Content**: Profile photo, professional details, video upload, settings
- **Layout**: Mixed grid layouts for different sections using `Stack` and `HStack`
- **Widgets**: Profile management forms with proper validation

#### Therapist Earnings Page
- **Content**: Earnings overview, transaction history, payout management
- **Layout**: Stats cards + tabbed interface for different views
- **Widgets**: Financial data visualization and payout controls

### Admin Pages (All)
- **MUST use DashboardLayout component** with appropriate title/subtitle
- **MUST use layout atoms** (Stack, HStack, Cluster) for consistent spacing
- **MUST include admin-specific widgets** (user management, system overview, moderation tools)
- **Content adapts** to admin needs while maintaining consistent layout pattern

## Key Rules
- **Dashboard layout pattern** is mandatory for all therapist and admin pages
- **Typography hierarchy** must follow font specifications
- **Touch targets** must meet accessibility requirements
- **Color specifications** must match Figma exactly
- **Header and sidebar** must be consistent across all pages
- **Main content area** must follow dashboard layout principles
- **All pages** must use design tokens consistently