---
description: Dashboard layout and widget requirements based on Figma design specifications
globs: ["src/**/*.tsx", "src/pages/therapist/Dashboard.tsx"]
alwaysApply: true
---

# Rule: Dashboard Layout  Figma Design Implementation

## Scope
Apply to all dashboard components (React/TSX/CSS/Tailwind). Ensure dashboard layout matches Figma design specifications exactly.
 No deviations from the 4-widget grid layout and component hierarchy.

## Dashboard Layout Requirements

### Header Section (Mandatory)
- **Mindfolk logo** - White text on dark green background (--jovial-jade)
- **Search bar** - "Search Clients" placeholder with magnifying glass icon
- **User avatar** - Circular with initials, positioned top-right
- **Background**: Full-width dark green header bar

### Sidebar Navigation (Mandatory)
- **Background**: Light grey (--surface-accent)
- **Active state**: Dark green vertical bar + dark green text (--jovial-jade)
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
  - Green "Join Now >" buttons for each appointment
- **Scrollable**: Vertical scrollbar if more than 3 appointments

#### Widget 2: My Client Dashboard (Top Right)
- **Title**: "My Client Dashboard" with "EDIT" link
- **Action**: "OPEN CLIENTS" with external link icon
- **Content**:
  - Client avatars (circular with initials)
  - Full client names
  - Email addresses displayed
  - Status badges: "Active" (green) / "Inactive" (orange)
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
- **Background**: --jovial-jade (#305C45)
- **Text**: White (#FFFFFF)
- **Logo**: White text

### Sidebar Colors
- **Background**: --surface-accent (#E8F0E9)
- **Text**: --jovial-jade (#305C45)
- **Active state**: --jovial-jade background + white text
- **Icons**: --jovial-jade (#305C45)

### Widget Colors
- **Background**: --surface (#FFFFFF)
- **Borders**: --border (#E5E7EB)
- **Titles**: --jovial-jade (#305C45)
- **Action links**: --garden-green (#497557)
- **Join buttons**: --garden-green background + white text
- **Status badges**: 
  - Active: --success-bg (#497557) + white text
  - Inactive: --warning-bg (#fcbaaa) + black text

### Chart Colors
- **Donut chart**: Orange, purple, green segments
- **Line graph**: Orange line (--btn-accent-bg #ffd9be)

## Typography Requirements

### Headers
- **Main title**: "Welcome Back, Sarah!" - ont-crimson, large size, --jovial-jade
- **Widget titles**: ont-crimson, medium size, --jovial-jade
- **Section labels**: ont-helvetica, small size, --text-secondary

### Content
- **Client names**: ont-helvetica, medium size, --text-primary
- **Email addresses**: ont-helvetica, small size, --text-secondary
- **Times/dates**: ont-helvetica, small size, --text-secondary
- **Action links**: ont-helvetica, small size, --garden-green

## Interactive Elements

### Buttons
- **Join Now**: --garden-green background, white text, rounded corners
- **EDIT links**: --garden-green text, no background
- **OPEN links**: --garden-green text with external link icon
- **Status badges**: Rounded, colored backgrounds

### Touch Targets
- **All buttons**: Minimum 44px height
- **Action links**: Minimum 44px touch area
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

## Key Rules
- **4-widget grid layout** is mandatory - no other arrangements
- **Full client names** must be displayed, not just initials
- **Color specifications** must match Figma exactly
- **Action links** must have external link icons
- **Charts** must use specified colors (orange, purple, green)
- **Status badges** must use exact color combinations
- **Typography hierarchy** must follow font specifications
- **Touch targets** must meet accessibility requirements
