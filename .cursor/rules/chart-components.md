---
description: Chart component requirements for dashboard widgets
globs: ["src/components/charts/**/*.tsx", "src/pages/therapist/Dashboard.tsx"]
alwaysApply: true
---

# Rule: Chart Components — Dashboard Data Visualization

## Scope
Apply to all chart components (React/TSX/CSS/Tailwind). Ensure charts match Figma design specifications and accessibility standards.
🚫 No deviations from specified colors, layouts, or accessibility requirements.

**Reference**: See `design-tokens.md` for complete token definitions and usage guidelines.

## Chart Requirements

### Donut Chart (Income Details Widget)
- **Central number**: Large, prominent display (e.g., "122")
- **Color segments**: Orange, purple, green
- **Legend**: Completed, Cancelled, Rescheduled
- **Accessibility**: ARIA labels and alt text
- **Size**: Proportional to widget container
- **Animation**: Smooth transitions on data changes

### Line Graph (Business Profile Widget)
- **Trend line**: Orange color (`bg-[--btn-accent-bg]`)
- **Y-axis labels**: 9k, 11k, 14k, 17k, 20k
- **Title**: "Profile Views in the last year"
- **Accessibility**: Screen reader friendly data points
- **Grid lines**: Subtle, non-distracting
- **Animation**: Smooth line drawing on load

## Color Specifications

### Donut Chart Colors
- **Completed sessions**: `bg-[--btn-accent-bg]` (orange)
- **Cancelled sessions**: `bg-[--tag-language-bg]` (purple)
- **Rescheduled sessions**: `bg-[--tag-modality-bg]` (green)
- **Background**: Transparent or `bg-[--surface]`
- **Text**: `text-[--text-primary]`

### Line Graph Colors
- **Trend line**: `bg-[--btn-accent-bg]` (orange)
- **Grid lines**: `border-[--border]` (light grey)
- **Axis labels**: `text-[--text-secondary]`
- **Background**: Transparent or `bg-[--surface]`
- **Data points**: `bg-[--btn-accent-bg]` with `text-[--on-dark]` centers

## Accessibility Requirements

### ARIA Labels
- **Chart titles**: Descriptive headings
- **Data values**: Screen reader accessible
- **Color coding**: Alternative text descriptions
- **Interactive elements**: Keyboard accessible

### Screen Reader Support
- **Data tables**: Alternative to visual charts
- **Descriptions**: Clear explanation of data
- **Trends**: Verbal description of patterns
- **Comparisons**: Relative value descriptions

## Key Rules
- **Charts must be accessible** with proper ARIA labels
- **Colors must match specifications** exactly
- **Data must be real-time** and accurate
- **Responsive design** for all screen sizes
- **Animation must be smooth** and non-distracting
- **Alternative text** required for all visual elements
- **Keyboard navigation** for interactive charts
- **Screen reader support** for all data