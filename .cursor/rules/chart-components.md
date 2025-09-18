---
description: Chart component requirements for dashboard widgets with detailed specifications from user-flows.md
globs: ["src/components/charts/**/*.tsx", "src/pages/therapist/Dashboard.tsx", "src/pages/therapist/**/*.tsx"]
alwaysApply: true
---

# Rule: Chart Components � Dashboard Data Visualization (User-Flows Aligned)

## Scope
Apply to all chart components (React/TSX/CSS/Tailwind). Ensure charts match user-flows.md specifications and accessibility standards.
?? No deviations from specified colors, layouts, or accessibility requirements.

**Reference**: See `design-tokens.md` for complete token definitions and usage guidelines.
**Alignment**: This file implements chart requirements specified in `user-flows.md` sections.

## Dashboard Widget Chart Requirements

### Widget 3: Income Details - Donut Chart (Mandatory)
- **Central number**: Large, prominent display (e.g., "122") - `text-[hsl(var(--jovial-jade))]` color
- **Chart type**: Donut chart with three segments
- **Data representation**: Appointments breakdown (completed/cancelled/rescheduled sessions)
- **Size**: Proportional to widget container, centered in widget
- **Animation**: Smooth transitions on data changes with `--motion-progress`
- **Accessibility**: ARIA labels, alt text, and data tables for screen readers

#### Color Specifications (Exact Mapping)
- **Completed sessions**: `bg-[hsl(var(--btn-accent-bg))]` (#FFCBAA - orange segment)
- **Cancelled sessions**: `bg-[hsl(var(--tag-language-bg))]` (#EAE3DC - purple segment)  
- **Rescheduled sessions**: `bg-[hsl(var(--tag-modality-bg))]` (#EBF1ED - green segment)
- **Central number**: `text-[hsl(var(--jovial-jade))]` (#3A5949)
- **Legend text**: `text-[hsl(var(--text-secondary))]` (#6B7280)
- **Background**: `bg-[hsl(var(--surface))]` (#FFFFFF)

#### Required Elements
- **Section label**: "Appointments" - `font-secondary`, `text-[hsl(var(--text-secondary))]`
- **Central number**: Large font size, `font-primary`, `text-[hsl(var(--jovial-jade))]`
- **Legend**: Three items (Completed, Cancelled, Rescheduled) with color indicators
- **Tooltip support**: Show exact numbers on hover/focus

### Widget 4: Business Profile - Line Graph (Mandatory)
- **Chart type**: Line graph with upward trend
- **Data range**: 9k to 20k profile views
- **Time period**: "Profile Views in the last year"
- **Animation**: Smooth line drawing on load with `--motion-swipe`
- **Accessibility**: Screen reader friendly data points and trend description

#### Color Specifications (Exact Mapping)
- **Trend line**: `bg-[hsl(var(--btn-accent-bg))]` (#FFCBAA - orange line)
- **Data points**: `bg-[hsl(var(--btn-accent-bg))]` with `text-[hsl(var(--on-dark))]` centers
- **Grid lines**: `border-[hsl(var(--border))]` (#E5E7EB - subtle, non-distracting)
- **Y-axis labels**: `text-[hsl(var(--text-secondary))]` (#6B7280)
- **Background**: `bg-[hsl(var(--surface))]` (#FFFFFF)
- **Title**: `text-[hsl(var(--text-secondary))]` (#6B7280)

#### Required Elements
- **Section label**: "Profile Views in the last year" - `font-secondary`, `text-[hsl(var(--text-secondary))]`
- **Y-axis labels**: 9k, 11k, 14k, 17k, 20k - `font-secondary`, `text-[hsl(var(--text-secondary))]`
- **Trend line**: Orange color with smooth curves
- **Data points**: Circular indicators at key points
- **Grid lines**: Horizontal guidelines for readability

## Chart Implementation Requirements

### Touch Target Compliance
- **Interactive elements**: `min-h-[hsl(var(--touch-target-min))]` (44px)
- **Data points**: `min-h-[hsl(var(--touch-target-min))]` when clickable
- **Legend items**: `min-h-[hsl(var(--touch-target-min))]` for accessibility
- **Tooltip triggers**: Meet touch target requirements

### Responsive Design
- **Mobile (320px-767px)**: 
  - Single column chart layout
  - Larger touch targets for data points
  - Simplified legends below charts
- **Tablet (768px-1023px)**: 
  - Maintain aspect ratios
  - Enhanced tooltips with more detail
- **Desktop (1024px+)**: 
  - Full chart detail display
  - Hover interactions for additional data

### Typography Requirements
- **Chart titles**: `font-primary` (Crimson Pro) - `text-[hsl(var(--jovial-jade))]`
- **Section labels**: `font-secondary` (Helvetica Neue) - `text-[hsl(var(--text-secondary))]`
- **Data labels**: `font-secondary` (Helvetica Neue) - `text-[hsl(var(--text-secondary))]`
- **Central numbers**: `font-primary` (Crimson Pro) - `text-[hsl(var(--jovial-jade))]`
- **Legend text**: `font-secondary` (Helvetica Neue) - `text-[hsl(var(--text-secondary))]`

## Accessibility Requirements (WCAG AA)

### ARIA Labels and Descriptions
- **Chart containers**: `role="img"` with descriptive `aria-label`
- **Data values**: Screen reader accessible with `aria-describedby`
- **Color coding**: Alternative text descriptions for each segment/point
- **Interactive elements**: Keyboard accessible with proper focus indicators
- **Trend descriptions**: Verbal explanation of data patterns

### Screen Reader Support
- **Data tables**: Hidden alternative tables for screen readers
- **Descriptions**: Clear explanation of chart purpose and data
- **Trends**: Verbal description of patterns (e.g., "Profile views increased from 9k to 20k")
- **Comparisons**: Relative value descriptions (e.g., "Completed sessions: 85 out of 122 total")
- **Navigation**: Logical tab order through interactive elements

### Focus Management
- **Keyboard navigation**: Tab through data points and interactive elements
- **Focus indicators**: Visible focus rings meeting `--border` contrast requirements
- **Skip links**: Allow users to skip complex chart interactions
- **Focus trapping**: Proper focus management in chart tooltips/modals

## Animation and Motion

### Chart Animations
- **Donut chart**: Segments animate in with `--motion-progress` (300ms ease-in-out)
- **Line graph**: Line draws from left to right with `--motion-swipe` (200ms ease-in-out)
- **Data points**: Fade in after line completion
- **Hover states**: Smooth transitions on interactive elements

### Reduced Motion Support
- **Respect user preferences**: Check `prefers-reduced-motion` media query
- **Alternative animations**: Instant display when motion is reduced
- **Focus indicators**: Still provide visual feedback without animation

## Error Handling and Loading States

### Loading States
- **Skeleton screens**: Show chart outline while data loads
- **Loading indicators**: Spinner or progress bar for data fetching
- **Graceful degradation**: Show basic data if chart library fails

### Error States
- **No data**: Clear message with `text-[hsl(var(--text-secondary))]`
- **Data errors**: User-friendly error messages
- **Fallback content**: Text-based data when charts can't render

## Integration with Dashboard Layout

### Widget Container Requirements
- **Background**: `bg-[hsl(var(--surface))]` with `border-[hsl(var(--border))]`
- **Padding**: Consistent with other dashboard widgets
- **Height**: Equal height with other widgets in the grid
- **Scrolling**: Vertical scroll if chart content exceeds widget height

### Header Integration
- **Widget titles**: Match dashboard typography (`font-primary`, `text-[hsl(var(--jovial-jade))]`)
- **Action links**: "EDIT" and "OPEN" links with `text-[hsl(var(--garden-green))]`
- **External link icons**: Consistent with other dashboard widgets

## Testing Requirements

### Accessibility Testing
- **Screen reader testing**: Test with NVDA, JAWS, VoiceOver
- **Keyboard navigation**: Verify all interactive elements are accessible
- **Color contrast**: Verify all text meets WCAG AA standards (4.5:1)
- **Focus indicators**: Ensure visible focus states on all interactive elements

### Cross-Browser Testing
- **Chart rendering**: Test in Chrome, Firefox, Safari, Edge
- **Animation performance**: Verify smooth animations across browsers
- **Touch interactions**: Test on mobile devices and tablets
- **Responsive behavior**: Verify charts adapt to different screen sizes

## Examples

### ? Good Chart Implementation
```tsx
// Donut Chart for Income Details Widget
<div className="bg-[hsl(var(--surface))] p-4 rounded-lg border border-[hsl(var(--border))]">
  <div className="flex items-center justify-between mb-4">
    <h3 className="font-primary text-[hsl(var(--jovial-jade))]">Income Details</h3>
    <a href="#" className="text-[hsl(var(--garden-green))] text-sm">EDIT</a>
  </div>
  <div className="flex items-center justify-between mb-2">
    <span className="font-secondary text-[hsl(var(--text-secondary))] text-sm">Appointments</span>
    <a href="#" className="text-[hsl(var(--garden-green))] text-sm flex items-center">
      OPEN ANALYTICS <ExternalLink className="ml-1 w-4 h-4" />
    </a>
  </div>
  <div 
    className="relative w-32 h-32 mx-auto mb-4"
    role="img"
    aria-label="Appointment breakdown: 85 completed, 22 cancelled, 15 rescheduled out of 122 total"
  >
    <DonutChart
      data={[
        { label: "Completed", value: 85, color: "bg-[hsl(var(--btn-accent-bg))]" },
        { label: "Cancelled", value: 22, color: "bg-[hsl(var(--tag-language-bg))]" },
        { label: "Rescheduled", value: 15, color: "bg-[hsl(var(--tag-modality-bg))]" }
      ]}
      centerText="122"
      centerTextClass="font-primary text-2xl text-[hsl(var(--jovial-jade))]"
    />
  </div>
  <div className="space-y-2">
    {data.map((item, index) => (
      <div key={index} className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${item.color} mr-2`} />
          <span className="font-secondary text-[hsl(var(--text-secondary))]">{item.label}</span>
        </div>
        <span className="font-secondary text-[hsl(var(--text-primary))]">{item.value}</span>
      </div>
    ))}
  </div>
</div>
```

### ? Bad Chart Implementation
```tsx
// Wrong - missing accessibility, wrong colors, no design tokens
<div className="bg-white p-4">
  <h3 className="text-[hsl(var(--ink-slate))]">Income Details</h3>
  <div className="w-32 h-32">
    <DonutChart 
      data={[
        { label: "Done", value: 85, color: "#ff6b35" }, // Wrong: raw hex
        { label: "Skip", value: 22, color: "purple" },  // Wrong: CSS color names
        { label: "Move", value: 15, color: "green" }    // Wrong: generic names
      ]}
    />
  </div>
</div>
```

## Key Rules
- **Use design tokens exclusively** - no raw colors or CSS color names
- **Follow user-flows.md specifications** exactly for widget charts
- **Implement full accessibility** with ARIA labels and screen reader support
- **Maintain consistent typography** using font tokens from design-tokens.md
- **Provide responsive behavior** across all breakpoints
- **Include smooth animations** with respect for reduced motion preferences
- **Test thoroughly** for accessibility and cross-browser compatibility
- **Integrate seamlessly** with dashboard layout patterns
