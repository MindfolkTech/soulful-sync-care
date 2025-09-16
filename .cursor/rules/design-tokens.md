---
description: Master design tokens for consistent color, typography, and spacing across all components
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
alwaysApply: true
---

# Rule: Design Tokens — Master Token System (CSS Custom Properties)

## Scope
Apply to all UI code (React/TSX/CSS/Tailwind). Use **CSS custom properties** with **Tailwind arbitrary values** for maximum Cursor and Lovable compatibility.
🚫 No hardcoded colors, fonts, or spacing values in components.

## Master Token System

### Core Brand Colors
```css
--jovial-jade: #305C45;        /* Primary headings, navigation, main text */
--garden-green: #497557;       /* Buttons, progress bars, active states */
--elated-emerald: #3B674D;     /* Accent elements, borders */
--warm-white: #FFF8F2;         /* App background (warm cream) */
--surface: #FFFFFF;            /* Cards, modals, forms */
--surface-accent: #E8F0E9;      /* Light green selected states */
--border: #E5E7EB;             /* Card borders, dividers */
```

### Text Colors
```css
--text-primary: #466749;       /* Primary text, dark content */
--text-secondary: #6B7280;     /* Body text, descriptions */
--text-muted: #6B7280;         /* Placeholder text (solid for contrast) */
--ink-slate: #20323A;          /* Soft ink - preferred over black */
--on-dark: #FFFFFF;            /* Text on dark/brand surfaces */
--text-black: #000000;         /* ⚠️ reserved ONLY for critical alerts */
```

### Tag Category Colors
```css
/* Tag Backgrounds */
--tag-personality-bg: #ffd9be; /* Personality traits */
--tag-modality-bg: #e6eee9;    /* Therapy modalities */
--tag-specialty-bg: #E3ECF5;   /* Mental health specialties */
--tag-language-bg: #ede6fa;     /* Languages spoken */
--tag-misc-bg: #f5e4de;        /* Miscellaneous tags */

/* Tag Text Colors */
--tag-personality-text: #305C45;
--tag-modality-text: #305C45;
--tag-specialty-text: #20323A;
--tag-language-text: #305C45;
--tag-misc-text: #305C45;
```

### Button Colors
```css
/* Button Backgrounds */
--btn-primary-bg: #497557;     /* Primary buttons */
--btn-accent-bg: #ffd9be;      /* Accent buttons */
--btn-cta-bg: #e6eee9;         /* CTA buttons */
--btn-secondary-bg: transparent; /* Secondary buttons */

/* Button Text Colors */
--btn-primary-text: #FFFFFF;   /* Primary button text */
--btn-secondary-text: #497557; /* Secondary button text */
--btn-tertiary-text: #305C45;   /* Tertiary button text */
--btn-accent-text: #305C45;     /* Accent button text */
--btn-cta-text: #305C45;        /* CTA button text */
```

### System Message Colors
```css
/* System Backgrounds */
--success-bg: #497557;         /* Success messages */
--warning-bg: #fcbaaa;          /* Warning messages */
--error-bg: #fcbaaa;            /* Error messages */
--info-bg: #3B674D;             /* Info messages */

/* System Text Colors */
--success-text: #FFFFFF;        /* Success message text */
--warning-text: #20323A;        /* Warning message text (soft ink) */
--error-text: #20323A;          /* Error message text (soft ink) */
--info-text: #FFFFFF;           /* Info message text */
```

### Typography
```css
--font-primary: 'Crimson Pro', Georgia, serif;           /* Headings, quotes, names */
--font-secondary: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif; /* Body/UI */
```

### Spacing & Touch Targets
```css
--touch-target-min: 44px;      /* Mobile minimum touch target */
--touch-target-comfort: 56px;   /* Comfortable primary actions */
--space-xs: clamp(4px, 2px + 1vw, 8px);     /* Tight spacing */
--space-sm: clamp(8px, 4px + 1vw, 12px);    /* Small gaps */
--space-md: clamp(16px, 8px + 2vw, 24px);   /* Standard padding */
--space-lg: clamp(24px, 12px + 2vw, 32px);  /* Sections */
--space-xl: clamp(32px, 16px + 3vw, 48px);  /* Large spacing */
--space-2xl: clamp(48px, 24px + 4vw, 64px); /* Major blocks */
```

### Border Radius
```css
--radius-sm: 4px;              /* Tight UI: checkboxes, small inputs */
--radius-md: 8px;               /* Default: buttons, inputs, cards */
--radius-lg: 12px;              /* Media blocks, large cards, sheets */
--radius-xl: 16px;              /* Tags/chips, large surfaces */
--radius-pill: 9999px;          /* Pills, segmented controls */
--radius-avatar: 50%;           /* Circular avatars */
```

### Motion & Animation
```css
--motion-progress: transition-all 300ms ease-in-out;     /* Progress bar transitions */
--motion-swipe: transform 200ms ease-in-out, opacity 200ms ease-in-out; /* Swipe interactions */
```

## Usage Guidelines

### ✅ Correct Usage (CSS Custom Properties + Tailwind Arbitrary Values)
```tsx
// Colors
<Button className="bg-[--garden-green] text-[--btn-primary-text]">Primary</Button>
<Tag className="bg-[--tag-personality-bg] text-[--tag-personality-text]">Empathetic</Tag>

// Typography
<h1 className="font-[--font-primary] text-[--jovial-jade]">Welcome</h1>
<p className="font-[--font-secondary] text-[--text-primary]">Body text</p>

// Spacing
<div className="p-[--space-md] gap-[--space-sm]">Content</div>

// Touch targets
<Button className="min-h-[--touch-target-min]">Accessible Button</Button>
```

### ❌ Forbidden Usage
```tsx
// Wrong - hardcoded colors
<Button className="bg-green-600 text-white">Primary</Button>

// Wrong - raw hex values
<div className="bg-[--garden-green] text-[--on-dark]">Content</div>

// Wrong - Tailwind color classes
<Tag className="bg-orange-200 text-green-800">Tag</Tag>
```

## Implementation Requirements

### 1. CSS File Setup
Create `src/styles/tokens.css`:
```css
:root {
  /* Copy all tokens from above */
}
```

Import in your main CSS file:
```css
@import './styles/tokens.css';
```

### 2. Component Usage
- **Always use** `text-[--token-name]` syntax
- **Never use** hardcoded colors or Tailwind color classes
- **Reference tokens** by their semantic names
- **Test contrast ratios** using browser dev tools

### 3. Cursor Integration
- Cursor will autocomplete `--token-name` values
- Rules will enforce token usage
- AI will suggest correct token combinations

### 4. Lovable Compatibility
- Lovable understands `bg-[--token]` syntax perfectly
- AI can generate components using tokens
- Consistent design system across all generated code

## Key Rules
- **Use CSS custom properties** with Tailwind arbitrary values
- **Reference semantic token names** (e.g., `--jovial-jade`, not `--green-600`)
- **Test all combinations** for WCAG AA compliance (4.5:1 contrast)
- **Maintain single source of truth** in CSS custom properties
- **Never hardcode colors** in components
- **Use touch target tokens** for accessibility compliance