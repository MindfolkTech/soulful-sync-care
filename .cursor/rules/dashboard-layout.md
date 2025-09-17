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

### Header Section (Mandatory)
- **Mindfolk logo** - `text-white` on `bg-jovial-jade` background
- **Search bar** - "Search Clients" placeholder with magnifying glass icon
- **User avatar** - Circular with initials, positioned top-right
- **Background**: Full-width `bg-jovial-jade` header bar

### Sidebar Navigation (Mandatory)
- **Background**: `bg-surface-accent`
- **Active state**: `bg-jovial-jade` vertical bar + `text-white`
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

### Grid System
- **4-widget layout**: 2x2 grid on desktop
- **Responsive**: Single column on mobile
- **Spacing**: Consistent gaps between widgets
- **Container**: Full-width with proper padding

### Widget Dimensions
- **Equal height**: All widgets same height
- **Proportional width**: 50% each row
- **Internal padding**: Consistent padding within each widget
- **Scrollable content**: Vertical scroll when content exceeds widget height

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

### Therapist Analytics Page
- **MUST use dashboard layout** (header + sidebar + main content)
- **MUST use same typography** (`font-[--font-primary]` for titles, `font-[--font-secondary]` for content)
- **MUST use same colors** (all design tokens from design-tokens.md)
- **MUST include analytics-specific widgets** (KPIs, charts, improvements)
- **MUST follow same header pattern** (`bg-jovial-jade` background with logo, search, avatar)
- **MUST follow same sidebar pattern** (`bg-surface-accent` background with navigation)

### Therapist Clients Page
- **MUST use dashboard layout** (header + sidebar + main content)
- **MUST use same typography** (`font-[--font-primary]` for titles, `font-[--font-secondary]` for content)
- **MUST use same colors** (all design tokens from design-tokens.md)
- **MUST include client management widgets** (search, filters, client list)
- **MUST follow same header pattern** (`bg-jovial-jade` background with logo, search, avatar)
- **MUST follow same sidebar pattern** (`bg-surface-accent` background with navigation)

### Therapist Bookings Page
- **MUST use dashboard layout** (header + sidebar + main content)
- **MUST use same typography** (`font-[--font-primary]` for titles, `font-[--font-secondary]` for content)
- **MUST use same colors** (all design tokens from design-tokens.md)
- **MUST include booking management widgets** (calendar, appointment list, status tracking)
- **MUST follow same header pattern** (`bg-jovial-jade` background with logo, search, avatar)
- **MUST follow same sidebar pattern** (`bg-surface-accent` background with navigation)

### Therapist Messages Page
- **MUST use dashboard layout** (header + sidebar + main content)
- **MUST use same typography** (`font-[--font-primary]` for titles, `font-[--font-secondary]` for content)
- **MUST use same colors** (all design tokens from design-tokens.md)
- **MUST include messaging widgets** (conversation list, message thread, input)
- **MUST follow same header pattern** (`bg-jovial-jade` background with logo, search, avatar)
- **MUST follow same sidebar pattern** (`bg-surface-accent` background with navigation)

### Therapist Profile Page
- **MUST use dashboard layout** (header + sidebar + main content)
- **MUST use same typography** (`font-[--font-primary]` for titles, `font-[--font-secondary]` for content)
- **MUST use same colors** (all design tokens from design-tokens.md)
- **MUST include profile management widgets** (profile info, video upload, availability)
- **MUST follow same header pattern** (`bg-jovial-jade` background with logo, search, avatar)
- **MUST follow same sidebar pattern** (`bg-surface-accent` background with navigation)

### Therapist Earnings Page
- **MUST use dashboard layout** (header + sidebar + main content)
- **MUST use same typography** (`font-[--font-primary]` for titles, `font-[--font-secondary]` for content)
- **MUST use same colors** (all design tokens from design-tokens.md)
- **MUST include earnings widgets** (income charts, payout history, tax documents)
- **MUST follow same header pattern** (`bg-jovial-jade` background with logo, search, avatar)
- **MUST follow same sidebar pattern** (`bg-surface-accent` background with navigation)

### Admin Pages (All)
- **MUST use dashboard layout** (header + sidebar + main content)
- **MUST use same typography** (`font-[--font-primary]` for titles, `font-[--font-secondary]` for content)
- **MUST use same colors** (all design tokens from design-tokens.md)
- **MUST include admin-specific widgets** (user management, system overview, moderation tools)
- **MUST follow same header pattern** (`bg-jovial-jade` background with logo, search, avatar)
- **MUST follow same sidebar pattern** (`bg-surface-accent` background with navigation)

## Key Rules
- **Dashboard layout pattern** is mandatory for all therapist and admin pages
- **Typography hierarchy** must follow font specifications
- **Touch targets** must meet accessibility requirements
- **Color specifications** must match Figma exactly
- **Header and sidebar** must be consistent across all pages
- **Main content area** must follow dashboard layout principles
- **All pages** must use design tokens consistently