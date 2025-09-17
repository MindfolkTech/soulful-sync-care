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
    --jovial-jade: 155 28% 28%;   /* #305C45 */
    --garden-green: 145 27% 35%;  /* #497557 */
    --elated-emerald: 149 28% 32%;/* #3B674D */
```

```css
    /* ── Surfaces & Backgrounds ─────────────────────────────────── */
    --warm-white: 32 100% 97%;    /* #FFF8F2 */
    --surface: 0 0% 100%;         /* #FFFFFF */
    --surface-accent: 134 23% 92%;/* #E8F0E9 */
```
```css
    /* ── Text & Border ──────────────────────────────────────────── */
    --text-primary: 145 23% 35%;  /* #466749 */
    --text-secondary: 220 13% 46%;/* #6B7280 */
    --text-muted: 220 13% 46%;    /* #6B7280 */
    --ink-slate: 198 33% 17%;     /* #20323A */
    --on-dark: 0 0% 100%;         /* #FFFFFF */
    --text-black: 0 0% 0%;        /* #000000 */
    --border: 220 13% 91%;        /* #E5E7EB */
```
```css
    /* ── Buttons ────────────────────────────────────────────────── */
    --btn-primary-bg: 145 27% 35%;/* #497557 */
    --btn-primary-text: 0 0% 100%;/* #FFFFFF */
    --btn-secondary-bg: 0 0% 0%;  /* transparent (no hex) */
    --btn-secondary-text: 145 27% 35%; /* #497557 */
    --btn-tertiary-text: 155 28% 28%;  /* #305C45 */
    --btn-accent-bg: 25 100% 87%; /* #FFD9BE */
    --btn-accent-text: 155 28% 28%;/* #305C45 */
    --btn-cta-bg: 134 23% 92%;   /* #E6EEE9 */
    --btn-cta-text: 155 28% 28%; /* #305C45 */
```
```css
    /* ── Tags (5 categories) ────────────────────────────────────── */
    --tag-personality-bg: 25 100% 87%;   /* #FFD9BE */
    --tag-personality-text: 155 28% 28%; /* #305C45 */
    --tag-modality-bg: 134 23% 92%;      /* #E6EEE9 */
    --tag-modality-text: 155 28% 28%;    /* #305C45 */
    --tag-specialty-bg: 211 38% 93%;     /* #E3ECF5 */
    --tag-specialty-text: 198 33% 17%;   /* #20323A */
    --tag-language-bg: 267 55% 94%;      /* #EDE6FA */
    --tag-language-text: 155 28% 28%;    /* #305C45 */
    --tag-misc-bg: 22 41% 92%;           /* #F5E4DE */
    --tag-misc-text: 155 28% 28%;        /* #305C45 */
```
```css
    /* ── System Messages ────────────────────────────────────────── */
    --success-bg: 145 27% 35%;    /* #497557 */
    --success-text: 0 0% 100%;    /* #FFFFFF */
    --warning-bg: 14 88% 83%;     /* #FCBAAA */
    --warning-text: 198 33% 17%;  /* #20323A */
    --error-bg: 14 88% 83%;       /* #FCBAAA */
    --error-text: 198 33% 17%;    /* #20323A */
    --info-bg: 149 28% 32%;       /* #3B674D */
    --info-text: 0 0% 100%;       /* #FFFFFF */
```
```css
    /* ── Progress & Motion ──────────────────────────────────────── */
    --progress-bar: 145 27% 35%;  /* uses #497557 */
```
```css
    /* ── Overlays (derived) ─────────────────────────────────────── */
    --overlay-dark: 145 27% 15%;  /* derived from --garden-green (darker) */
    --overlay-light: 145 23% 92%; /* derived from surface-accent */
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
<Button className="bg-green-600 text-white">Primary</Button>

// Wrong — hardcoded hex values
<div className="bg-[#497557] text-[#ffffff]">Content</div>

// Wrong — token without hsl() wrapper
<div className="bg-[--garden-green] text-[--on-dark]">Content</div>

// Wrong — Tailwind named colors for tags
<Tag className="bg-orange-200 text-green-800">Tag</Tag>



