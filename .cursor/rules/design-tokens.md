---
description: Master design tokens for consistent color, typography, and spacing across all components
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
alwaysApply: true

@tailwind base;
@tailwind components;
@tailwind utilities;
@import "./src/index.css";

// Rule: Design Tokens — Master Token System (CSS Custom Properties)

//Scope
Apply to all UI code (React/TSX/CSS/Tailwind). 
```css
/* ── Core Brand Colors ───────────────────────────────────────── */
    --jovial-jade: 151 23% 29%;   /* #3A5949 - becomes Sage Deep */
    --garden-green: 151 19% 46%;  /* #5E8C77 - becomes Sage Meadow */
    --elated-emerald: 151 19% 46%;/* #5E8C77 - consolidated */
```

```css
    /* ── Surfaces & Backgrounds ─────────────────────────────────── */
    --warm-white: 33 71% 97%;    /* #FCF9F6 - subtle update */
    --surface: 0 0% 100%;         /* #FFFFFF - no change */
    --surface-accent: 150 22% 93%;/* #EBF1ED - becomes Sage Mist */
```
```css
    /* ── Text & Border ──────────────────────────────────────────── */
    --text-primary: 151 23% 29%;  /* #3A5949 - becomes Sage Deep */
    --text-secondary: 210 8% 21%;/* #2F353A - becomes Ink Slate */
    --text-muted: 210 4% 50%;    /* #7A8085 - new dedicated muted */
    --ink-slate: 210 8% 21%;     /* #2F353A - subtle update */
    --on-dark: 0 0% 100%;         /* #FFFFFF - becomes on-brand */
    --text-black: 0 0% 0%;        /* #000000 - no change, for alerts */
    --border: 31 27% 90%;        /* #EAE3DC - warmer border */
```
```css
    /* ── Buttons ────────────────────────────────────────────────── */
    --btn-primary-bg: 151 19% 46%;/* #5E8C77 - Sage Meadow */
    --btn-primary-text: 0 0% 100%;/* #FFFFFF - no change */
    --btn-secondary-bg: 0 0% 0%;  /* transparent (no hex) */
    --btn-secondary-text: 151 19% 46%; /* #5E8C77 - Sage Meadow */
    --btn-tertiary-text: 151 23% 29%;  /* #3A5949 - Sage Deep */
    --btn-accent-bg: 27 100% 83%; /* #FFCBAA - becomes Peach Sorbet */
    --btn-accent-text: 151 23% 29%;/* #3A5949 - becomes on-accent */
    --btn-cta-bg: 151 19% 46%;   /* #5E8C77 - aligns with Primary */
    --btn-cta-text: 0 0% 100%; /* #FFFFFF - for contrast */
```
```css
    /* ── Tags (5 categories) ────────────────────────────────────── */
    --tag-personality-bg: 28 100% 96%;   /* #FFF3EB - becomes Peach Fuzz */
    --tag-personality-text: 19 54% 47%; /* #B35F3A - Revised for AA */
    --tag-modality-bg: 150 22% 93%;      /* #EBF1ED - becomes Sage Mist */
    --tag-modality-text: 151 23% 29%;    /* #3A5949 - becomes Sage Deep */
    --tag-specialty-bg: 150 22% 93%;     /* #EBF1ED - consolidated */
    --tag-specialty-text: 151 23% 29%;   /* #3A5949 - consolidated */
    --tag-language-bg: 31 27% 90%;      /* #EAE3DC - uses Border color */
    --tag-language-text: 210 8% 21%;    /* #2F353A - uses Ink Slate */
    --tag-misc-bg: 31 27% 90%;           /* #EAE3DC - uses Border color */
    --tag-misc-text: 210 8% 21%;        /* #2F353A - uses Ink Slate */
```
```css
    /* ── System Messages ────────────────────────────────────────── */
    --success-bg: 150 22% 93%;    /* #EBF1ED - becomes Sage Mist */
    --success-text: 151 23% 29%;    /* #3A5949 - for contrast */
    --warning-bg: 28 100% 96%;     /* #FFF3EB - becomes Peach Fuzz */
    --warning-text: 19 54% 47%;  /* #B35F3A - Revised for AA */
    --error-bg: 5 78% 92%;       /* #FADBD8 - new dedicated error */
    --error-text: 0 46% 42%;    /* #9E3B3B - new dedicated error */
    --info-bg: 211 48% 93%;       /* #E3ECF5 - new dedicated info */
    --info-text: 223 47% 42%;       /* #3B599E - new dedicated info */
```
```css
    /* ── Progress & Motion ──────────────────────────────────────── */
    --progress-bar: 151 19% 46%;  /* uses #5E8C77 */
```
```css
    /* ── Overlays (derived) ─────────────────────────────────────── */
    --overlay-dark: 151 19% 15%;  /* derived from --garden-green (darker) */
    --overlay-light: 150 22% 92%; /* derived from surface-accent */
    /* Backdrops below intentionally reference variables + alpha */
    --modal-backdrop: var(--overlay-dark) / 0.8;
    --video-overlay: var(--overlay-dark) / 0.6;
    --hover-overlay: var(--overlay-dark) / 0.2;   
   ``` 
```css
    /* ── Spacing & Radius & Motion ──────────────────────────────── */
    --touch-target-min: 44px;
    --touch-target-comfort: 56px;
    --space-xs: clamp(4px, 2px + 1vw, 8px);
    --space-sm: clamp(8px, 4px + 1vw, 12px);
    --space-md: clamp(16px, 8px + 2vw, 24px);
    --space-lg: clamp(24px, 12px + 2vw, 32px);
    --space-xl: clamp(32px, 16px + 3vw, 48px);
    --space-2xl: clamp(48px, 24px + 4vw, 64px);
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    --radius-pill: 9999px;
    --radius-avatar: 50%;
    --motion-progress: all 300ms ease-in-out;
    --motion-swipe: transform 200ms ease-in-out, opacity 200ms ease-in-out;
```

```css
    /* ── shadcn semantic mapping (triplets in → used as hsl(var(--…))) ── */
    --background: var(--warm-white);
    --foreground: var(--text-primary);
    --card: var(--surface);
    --card-foreground: var(--text-primary);
    --popover: var(--surface);
    --popover-foreground: var(--text-primary);
    --primary: var(--garden-green);
    --primary-foreground: var(--btn-primary-text);
    --secondary: var(--surface-accent);
    --secondary-foreground: var(--text-primary);
    --muted: var(--surface-accent);
    --muted-foreground: var(--text-secondary);
    --accent: var(--surface-accent);
    --accent-foreground: var(--text-primary);
    --destructive: var(--error-bg);
    --destructive-foreground: var(--error-text);
    --input: var(--border);
    --ring: var(--garden-green);
    --radius: var(--radius-md);
    --sidebar-background: 0 0% 98%;      /* #FAFAFA approx */
    --sidebar-foreground: 240 5.3% 26.1%; /* #3F3F46 */
    --sidebar-primary: 240 5.9% 10%;     /* #18181B */
    --sidebar-primary-foreground: 0 0% 98%; /* #FAFAFA */
    --sidebar-accent: 240 4.8% 95.9%;    /* #F4F4F5 */
    --sidebar-accent-foreground: 240 5.9% 10%; /* #18181B */
    --sidebar-border: 220 13% 91%;       /* #E5E7EB */
    --sidebar-ring: 217.2 91.2% 59.8%;   /* #3B82F6 */
```

### Typography
```css
--font-primary: 'Crimson Pro', Georgia, serif;           /* Major headings (h1-h3), quotes, names */
--font-secondary: 'Helvetica Neue','Helvetica','Arial',sans-serif; /* Minor headings (h4-h6), body/UI */
```

### Client Names
```css
/* Special rule for client names - H4 with bold weight */
<h4 className="font-secondary font-bold text-foreground text-sm">Client Name</h4>

/* Data Requirements */
- All client objects MUST have a 'name' field
- Use fallback: {client.name || 'Unknown Client'} for missing names
- Client names are required for consistent layout and accessibility
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

// Colors — prefer semantic classes
<Button className="bg-primary text-primary-foreground">Primary</Button>

// Direct token (when you need the exact token pair)
<Tag className="bg-[hsl(var(--tag-personality-bg))] text-[hsl(var(--tag-personality-text))]">
  Empathetic
</Tag>

// Typography (fonts via tokens; color via token or semantic)
<h1 className="font-primary text-[hsl(var(--jovial-jade))]">Welcome</h1>
<h2 className="font-primary text-[hsl(var(--jovial-jade))]">Section Title</h2>
<h3 className="font-primary text-[hsl(var(--text-primary))]">Subsection</h3>
<h4 className="font-secondary text-[hsl(var(--text-primary))]">Minor Heading</h4>
<p className="font-secondary text-foreground">Body text</p>

// Borders / rings with tokens
<div className="border border-[hsl(var(--border))] ring-[hsl(var(--ring))]">
  Content
</div>

// Client Names (special rule)
<h4 className="font-secondary font-bold text-foreground text-sm">Client Name</h4>

// Spacing (non-colors use var(), no hsl)
<div className="p-[var(--space-md)] gap-[var(--space-sm)]">Content</div>

// Touch targets (non-colors use var(), no hsl)
<Button className="min-h-[var(--touch-target-min)]">Accessible Button</Button>



```

// Forbidden Usage
```tsx
// Wrong — hardcoded Tailwind colors
<Button className="bg-[hsl(var(--garden-green))] text-[hsl(var(--on-dark))]">Primary</Button>

// Wrong — hardcoded hex values
<div className="bg-[#497557] text-[#ffffff]">Content</div>

// Wrong — token without hsl() wrapper
<div className="bg-[hsl(var(--garden-green))] text-[hsl(var(--on-dark))]">Content</div>

// Wrong — Tailwind named colors for tags
<Tag className="bg-orange-200 text-green-800">Tag</Tag>



