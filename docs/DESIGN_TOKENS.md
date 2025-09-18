# Design Tokens

## Overview

Design tokens are the foundational design decisions of the MindFolk application. They define colors, typography, spacing, and other design elements that ensure consistency across all interfaces.

**Source of Truth**: `src/index.css`

## 🎨 Colors

### Primary Brand Colors
```css
--jovial-jade: 151 23% 29%;     /* #3A5949 - Primary brand color */
--garden-green: 151 19% 46%;    /* #5E8C77 - Secondary brand color */
--elated-emerald: 151 19% 46%;  /* #5E8C77 - Accent color */
```

### Semantic Colors
```css
/* Success */
--success-bg: 150 22% 93%;      /* #EBF1ED - Sage Mist */
--success-text: 151 23% 29%;    /* #3A5949 - Sage Deep */

/* Warning */
--warning-bg: 28 100% 96%;      /* #FFF3EB - Peach Fuzz */
--warning-text: 19 54% 47%;     /* #B35F3A - Revised for AA */

/* Error */
--error-bg: 5 78% 92%;          /* #FADBD8 - dedicated error */
--error-text: 0 46% 42%;        /* #9E3B3B - dedicated error */

/* Info */
--info-bg: 211 48% 93%;         /* #E3ECF5 - dedicated info */
--info-text: 223 47% 42%;       /* #3B599E - dedicated info */
```

### Neutral Colors
```css
/* Text */
--text-primary: 151 23% 29%;     /* #3A5949 - Sage Deep */
--text-secondary: 210 8% 21%;   /* #2F353A - Ink Slate */
--text-muted: 210 4% 50%;       /* #7A8085 - dedicated muted */
--ink-slate: 210 8% 21%;        /* #2F353A - subtle update */
--on-dark: 0 0% 100%;           /* #FFFFFF - on-brand */
--text-black: 0 0% 0%;           /* #000000 - for alerts */

/* Background */
--warm-white: 33 71% 97%;       /* #FCF9F6 - subtle update */
--surface: 0 0% 100%;           /* #FFFFFF - no change */
--surface-accent: 150 22% 93%;  /* #EBF1ED - Sage Mist */

/* Borders */
--border: 31 27% 90%;           /* #EAE3DC - warmer border */

### Button Colors
```css
--btn-primary-bg: 151 19% 46%;     /* #5E8C77 - Sage Meadow */
--btn-primary-text: 0 0% 100%;     /* #FFFFFF - no change */
--btn-secondary-bg: 0 0% 0%;       /* transparent */
--btn-secondary-text: 151 19% 46%; /* #5E8C77 - Sage Meadow */
--btn-tertiary-text: 151 23% 29%;  /* #3A5949 - Sage Deep */
--btn-accent-bg: 27 100% 83%;      /* #FFCBAA - becomes Peach Sorbet */
--btn-accent-text: 151 23% 29%;    /* #3A5949 - becomes on-accent */
--btn-cta-bg: 151 19% 46%;         /* #5E8C77 - aligns with Primary */
--btn-cta-text: 0 0% 100%;        /* #FFFFFF - for contrast */
```

### Progress & Motion
```css
--progress-bar: 151 19% 46%;       /* var(--garden-green) */
```

### Overlay & Modal System
```css
--overlay-dark: 151 19% 15%;
--overlay-light: 150 22% 92%;
--modal-backdrop: var(--overlay-dark) / 0.8;
--video-overlay: var(--overlay-dark) / 0.6;
--hover-overlay: var(--overlay-dark) / 0.2;
```

### Tag Colors
```css
/* Personality Tags */
--tag-personality-bg: 28 100% 96%;   /* #FFF3EB - Peach Fuzz */
--tag-personality-text: 19 54% 47%;   /* #B35F3A - Revised for AA */

/* Modality Tags */
--tag-modality-bg: 150 22% 93%;       /* #EBF1ED - Sage Mist */
--tag-modality-text: 151 23% 29%;     /* #3A5949 - Sage Deep */

/* Specialty Tags */
--tag-specialty-bg: 150 22% 93%;      /* #EBF1ED - consolidated */
--tag-specialty-text: 151 23% 29%;    /* #3A5949 - consolidated */

/* Language Tags */
--tag-language-bg: 31 27% 90%;        /* #EAE3DC - uses Border color */
--tag-language-text: 210 8% 21%;       /* #2F353A - uses Ink Slate */

/* Misc Tags */
--tag-misc-bg: 31 27% 90%;            /* #EAE3DC - uses Border color */
--tag-misc-text: 210 8% 21%;          /* #2F353A - uses Ink Slate */
```

## 📝 Typography

### Font Families
```css
--font-primary: 'Crimson Pro', Georgia, serif;     /* H1, H2, H3 - page titles and major section headings */
--font-secondary: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;   /* H4, H5, H6, body text, UI labels */
```

### Responsive Typography Scale
```css
/* Uses clamp() for fluid scaling */
--text-xs: clamp(0.75rem, 0.70rem + 0.25vw, 0.875rem);    /* 12-14px */
--text-sm: clamp(0.875rem, 0.80rem + 0.375vw, 1rem);      /* 14-16px */
--text-base: clamp(1rem, 0.90rem + 0.50vw, 1.125rem);      /* 16-18px */
--text-lg: clamp(1.125rem, 1.00rem + 0.625vw, 1.25rem);    /* 18-20px */
--text-xl: clamp(1.25rem, 1.10rem + 0.75vw, 1.50rem);      /* 20-24px */
--text-2xl: clamp(1.5rem, 1.30rem + 1.00vw, 1.875rem);     /* 24-30px */
--text-3xl: clamp(1.875rem, 1.50rem + 1.875vw, 2.25rem);  /* 30-36px */
```

### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Typography Usage Hierarchy
```css
/* Primary Font (Crimson Pro) - Major headings */
h1, h2, h3 {
  font-family: var(--font-primary);
}

/* Secondary Font (Helvetica Neue) - Minor headings, body text, UI */
h4, h5, h6, body, p, span, div, button, input, label {
  font-family: var(--font-secondary);
}

/* Special case: Client names use secondary font with bold weight */
.client-name {
  font-family: var(--font-secondary);
  font-weight: var(--font-weight-bold);
}
```

## 📏 Spacing

### Responsive Spacing Tokens
```css
/* Uses clamp() for fluid scaling */
--space-xs: clamp(4px, 2px + 1vw, 8px);      /* 4-8px */
--space-sm: clamp(8px, 4px + 1vw, 12px);     /* 8-12px */
--space-md: clamp(16px, 8px + 2vw, 24px);   /* 16-24px */
--space-lg: clamp(24px, 12px + 2vw, 32px);  /* 24-32px */
--space-xl: clamp(32px, 16px + 3vw, 48px);  /* 32-48px */
--space-2xl: clamp(48px, 24px + 4vw, 64px); /* 48-64px */
```

### Touch Targets
```css
--touch-target-min: 44px;        /* Minimum touch target */
--touch-target-comfort: 56px;    /* Comfortable touch target */
```

## 🎭 Border Radius

```css
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
```

## 🎬 Motion

### Motion Tokens
```css
--motion-progress: all 300ms ease-in-out;
--motion-swipe: transform 200ms ease-in-out, opacity 200ms ease-in-out;
```

## 🌙 Theme Support

### High Contrast Mode
```css
@media (prefers-contrast: high) {
  :root {
    --text-primary: 0 0% 0%;        /* Pure black */
    --text-secondary: 0 0% 20%;     /* Dark gray */
    --background: 0 0% 100%;        /* Pure white */
    --border: 0 0% 0%;              /* Black borders */
  }
}
```

### Dark Mode (Future)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: 0 0% 100%;      /* White text */
    --text-secondary: 0 0% 80%;    /* Light gray */
    --background: 0 0% 9%;          /* Dark background */
    --surface-accent: 0 0% 15%;    /* Dark surface */
  }
}
```

## 🎯 Usage Guidelines

### Color Usage
- **Primary Colors**: Use for brand elements, primary CTAs, and key UI elements
- **Semantic Colors**: Use for status indicators, alerts, and feedback
- **Neutral Colors**: Use for text, backgrounds, and subtle UI elements
- **Tag Colors**: Use for categorization and labeling

### Typography Usage
- **Primary Font (Crimson Pro)**: Use for H1, H2, H3 - page titles and major section headings
- **Secondary Font (Helvetica Neue)**: Use for H4, H5, H6, body text, UI labels, and all other text
- **Client Names**: Special case - use secondary font with bold weight
- **Responsive Scale**: Automatically scales with viewport size

### Spacing Usage
- **Responsive Tokens**: Use for consistent spacing across breakpoints
- **Touch Targets**: Ensure all interactive elements meet minimum sizes
- **Fluid Scaling**: Spacing automatically adapts to screen size

## 🔧 Implementation

### CSS Custom Properties
All tokens are defined as CSS custom properties for easy theming and maintenance:

```css
/* Define token */
--primary-color: 151 23% 29%;

/* Use token */
color: hsl(var(--primary-color));
background-color: hsl(var(--primary-color) / 0.1);
```

### Tailwind Integration
Tokens are mapped to Tailwind utilities for consistent usage:

```css
/* Tailwind classes use design tokens */
.text-primary { color: hsl(var(--text-primary)); }
.bg-primary { background-color: hsl(var(--jovial-jade)); }
.p-md { padding: var(--space-md); }
```

## 📱 Responsive Behavior

### Fluid Scaling
Most tokens use `clamp()` for fluid scaling:

```css
/* Scales from 16px to 18px based on viewport */
--text-base: clamp(1rem, 0.90rem + 0.5vw, 1.125rem);
```

### Breakpoint Behavior
- **Mobile**: Smaller values (first parameter in clamp)
- **Desktop**: Larger values (third parameter in clamp)
- **Tablet**: Smooth interpolation between values

## 🎨 Design System Integration

### Component Usage
Components automatically use design tokens:

```tsx
// Component automatically uses design tokens
<Button className="bg-[hsl(var(--jovial-jade))] text-[hsl(var(--on-dark))]">
  Primary Action
</Button>
```

### Layout Integration
Layout components use responsive spacing tokens:

```tsx
// Responsive padding using design tokens
<div className="p-[var(--space-md)] md:p-[var(--space-lg)] lg:p-[var(--space-xl)]">
  Content
</div>
```

## 🔄 Maintenance

### Adding New Tokens
1. Add token to `styles/design-tokens.css`
2. Document usage in this file
3. Update component documentation if needed
4. Test across all breakpoints

### Updating Existing Tokens
1. Update token in `styles/design-tokens.css`
2. Test visual impact across all interfaces
3. Update documentation if behavior changes
4. Communicate changes to team

### Token Naming Conventions
- **Colors**: `--[category]-[variant]` (e.g., `--primary-color`)
- **Typography**: `--text-[size]` (e.g., `--text-lg`)
- **Spacing**: `--space-[size]` (e.g., `--space-md`)
- **Touch Targets**: `--touch-target-[size]` (e.g., `--touch-target-min`)
