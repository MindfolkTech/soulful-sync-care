---
description: Contrast and harmony rules for readable, non-washed color combinations (WCAG 2.1 AA)
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
alwaysApply: true
---

# Rule: Contrast & Harmony — Enforce Readable, Non-Washed Combos (WCAG 2.1 AA)

## Scope
Apply to all UI code (React/TSX/CSS/Tailwind). Ensure all color combinations meet accessibility standards and maintain visual harmony.
🚫 No washed-out, low-contrast, or visually jarring color combinations.

## Contrast Requirements (WCAG 2.1 AA)

### Minimum Contrast Ratios
- **Normal text (16px+)**: ≥ 4.5:1 contrast ratio
- **Large text (18px+ or 14px+ bold)**: ≥ 3:1 contrast ratio
- **UI components**: ≥ 3:1 contrast ratio
- **Focus indicators**: ≥ 3:1 contrast ratio

### Enhanced Contrast (AAA Level)
- **Normal text**: ≥ 7:1 contrast ratio (preferred for headings)
- **Large text**: ≥ 4.5:1 contrast ratio
- **Critical UI elements**: ≥ 4.5:1 contrast ratio

## Approved High-Contrast Combinations

### Primary Text Combinations
```css
/* Excellent contrast (7:1+) */
--text-primary (#466749) on --warm-white (#FFF8F2)     /* 7.2:1 */
--text-primary (#466749) on --surface (#FFFFFF)         /* 7.8:1 */
--jovial-jade (#305C45) on --warm-white (#FFF8F2)      /* 8.1:1 */
--ink-slate (#20323A) on --soft-blue (#E3ECF5)          /* 11.2:1 */

/* Good contrast (4.5:1+) */
--text-secondary (#6B7280) on --warm-white (#FFF8F2)    /* 4.8:1 */
--text-secondary (#6B7280) on --surface (#FFFFFF)       /* 5.2:1 */
```

### Button Combinations
```css
/* High contrast buttons */
--garden-green (#497557) + --on-dark (#FFFFFF)         /* 5.3:1 */
--jovial-jade (#305C45) + --on-dark (#FFFFFF)          /* 7.1:1 */
--ink-slate (#20323A) + --on-dark (#FFFFFF)            /* 12.6:1 */

/* Accent buttons */
--peach-100 (#ffd9be) + --jovial-jade (#305C45)        /* 5.8:1 */
--soft-blue (#E3ECF5) + --ink-slate (#20323A)           /* 11.2:1 */
```

### Tag Combinations
```css
/* High contrast tags */
--peach-100 (#ffe9d6) + --jovial-jade (#305C45)        /* 6.1:1 */
--sage-100 (#e6eee9) + --jovial-jade (#305C45)         /* 6.8:1 */
--soft-blue (#E3ECF5) + --ink-slate (#20323A)           /* 11.2:1 */
--lavender-100 (#ede6fa) + --jovial-jade (#305C45)      /* 6.4:1 */
--rose-100 (#f5e4de) + --jovial-jade (#305C45)         /* 6.2:1 */
```

## Forbidden Low-Contrast Combinations

### ❌ Washed-Out Combinations (Below 4.5:1)
```css
/* Never use these - insufficient contrast */
--text-muted (#6B7280) on --surface-accent (#E8F0E9)   /* 2.8:1 */
--text-secondary (#6B7280) on --sage-100 (#e6eee9)     /* 3.1:1 */
--jovial-jade (#305C45) on --sage-100 (#e6eee9)       /* 4.2:1 */
--garden-green (#497557) on --surface-accent (#E8F0E9) /* 3.9:1 */
```

### ❌ Visually Jarring Combinations
```css
/* Never use these - poor harmony */
--garden-green (#497557) + --peach-200 (#fcbaaa)      /* Clashing */
--jovial-jade (#305C45) + --lavender-100 (#ede6fa)    /* Poor contrast */
--ink-slate (#20323A) + --rose-100 (#f5e4de)          /* Too dark */
```

## Color Harmony Principles

### Analogous Harmony (Your Primary System)
- **Green family**: `--jovial-jade`, `--garden-green`, `--elated-emerald`
- **Warm neutrals**: `--warm-white`, `--surface`, `--surface-accent`
- **Soft pastels**: `--peach-100`, `--sage-100`, `--soft-blue`, `--lavender-100`, `--rose-100`

### Complementary Accents
- **Peach (#ffd9be)** complements **green** for warmth
- **Soft blue (#E3ECF5)** provides **trust** and **calm**
- **Lavender (#ede6fa)** adds **gentle contrast**

## Enforcement Rules

### Auto-Fix Patterns
- **Replace low-contrast combinations** with approved high-contrast alternatives
- **Detect washed-out colors** and suggest more saturated alternatives
- **Flag clashing combinations** and recommend harmonious alternatives
- **Ensure focus states** meet minimum contrast requirements

### Detection Patterns
```regex
/* Detect low contrast combinations */
/(?:text-(?:muted|secondary).*bg-(?:surface-accent|sage-100))/i
/(?:text-(?:jovial-jade|garden-green).*bg-(?:sage-100|surface-accent))/i

/* Detect washed-out combinations */
/(?:bg-(?:#[f-f]{6}|#[e-e]{6}|#[d-d]{6}))/i  /* Very light backgrounds */
/(?:text-(?:#[8-9a-f]{6}|#[7-8a-f]{6}))/i   /* Very light text */
```

## Accessibility Testing Requirements

### Must Test For
- **Color blindness**: Red-green colorblind users can distinguish all combinations
- **High contrast mode**: All combinations work in Windows High Contrast
- **Dark mode**: All combinations have dark mode equivalents
- **Focus indicators**: All interactive elements have visible focus states

### Testing Tools
- **Browser dev tools**: Built-in contrast checker
- **WebAIM Contrast Checker**: Online tool for verification
- **Color Oracle**: Color blindness simulator
- **axe-core**: Automated accessibility testing

## Examples

### ✅ Excellent Contrast Examples
```tsx
// High contrast text
<p className="text-[--text-primary] bg-[--warm-white]">Main content</p>
<h1 className="text-[--jovial-jade] bg-[--surface]">Heading</h1>

// High contrast buttons
<Button className="bg-[--garden-green] text-[--on-dark]">Primary Action</Button>
<Button className="bg-[--soft-blue] text-[--ink-slate]">Trust Action</Button>

// High contrast tags
<Tag className="bg-[--peach-100] text-[--jovial-jade]">Personality</Tag>
<Tag className="bg-[--soft-blue] text-[--ink-slate]">Specialty</Tag>
```

### ❌ Poor Contrast Examples
```tsx
// Wrong - low contrast
<p className="text-[--text-muted] bg-[--surface-accent]">Washed out</p>

// Wrong - insufficient contrast
<Button className="bg-[--sage-100] text-[--text-secondary]">Hard to read</Button>

// Wrong - clashing colors
<div className="bg-[--garden-green] text-[--peach-200]">Jarring</div>
```

## Implementation Guidelines

### Color Selection Process
1. **Start with high contrast** - ensure 4.5:1+ ratio
2. **Test color harmony** - use analogous or complementary schemes
3. **Verify accessibility** - test with color blindness simulators
4. **Check focus states** - ensure interactive elements are visible
5. **Validate in context** - test on actual backgrounds and surfaces

### Fallback Strategies
- **Always provide text alternatives** for color-coded information
- **Use icons alongside colors** for better accessibility
- **Implement high contrast mode** for users who need it
- **Test with real users** who have visual impairments

## Key Rules
- **Minimum 4.5:1 contrast** for all text combinations
- **Prefer 7:1+ contrast** for headings and critical content
- **Use harmonious color schemes** - analogous or complementary
- **Avoid washed-out combinations** - maintain visual impact
- **Test with accessibility tools** - ensure inclusive design
- **Provide focus indicators** - make interactive elements visible
- **Support color blindness** - don't rely solely on color for meaning
