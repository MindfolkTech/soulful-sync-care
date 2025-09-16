---
description: Text color rules for proper contrast and readability on different backgrounds
globs: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css"]
alwaysApply: true
---

# Rule: Text on Background (WCAG AA) — Mindfolk Style Guide 2.3

## Scope
Apply to all UI code (React/TSX/CSS/Tailwind). Use **design tokens** only.
🚫 No raw hex/RGB/HSL in components (except inside the tokens file).

## Canonical Text Tokens
- `--text-primary`        // #466749 (main content on light surfaces)
- `--text-secondary`      // #6B7280 (body/labels on light surfaces)
- `--text-muted`          // #6B7280 (placeholders/hints on light surfaces)
- `--jovial-jade`         // #305C45 (brand dark, headings)
- `--garden-green`        // #497557 (brand primary — used for bg, not body text)
- `--ink-slate`           // #20323A (soft ink - preferred over black)
- `--on-dark`             // #FFFFFF (text on dark/brand surfaces)
- `--text-black`          // #000000 (⚠️ reserved ONLY for critical alerts)

## Approved Text ↔ Background Pairings

### 1) Light surfaces (default pages, cards)
- **Backgrounds**: `--warm-white` | `--surface` | `--surface-accent` | `--soft-blue`
- **Text**: `--text-primary` | `--text-secondary` | `--text-muted` | `--jovial-jade` | `--ink-slate`

### 2) Buttons (shadcn/ui variants)
- **Primary**: bg `--garden-green` + text `--on-dark`
- **Secondary**: bg transparent + text `--garden-green` + border `--garden-green`
- **Tertiary**: bg transparent + text `--jovial-jade`
- **Accent**: bg `--peach-100` + text `--jovial-jade`
- **Trust**: bg `--soft-blue` + text `--ink-slate` (NEW)

### 3) Tags (6-category system)
- **Personality**: bg `--peach-100` + text `--jovial-jade`
- **Modality**: bg `--sage-100` + text `--jovial-jade`
- **Specialty**: bg `--soft-blue` + text `--ink-slate`
- **Language**: bg `--lavender-100` + text `--jovial-jade`
- **Misc/Identity**: bg `--rose-100` + text `--jovial-jade`
- **Trust/Verified**: bg `--soft-blue` + text `--ink-slate` (NEW)

### 4) Dark/Brand surfaces
- **Any dark brand bg** (`--garden-green`, `--elated-emerald`, overlays): text must be `--on-dark`

### 5) System alerts (Hierarchy of severity)
- **Critical Warning**: bg `--peach-200` + text `--text-black` (only for urgent safety issues)
- **Warning**: bg `--peach-200` + text `--ink-slate` (preferred over black)
- **Error**: bg `--peach-200` + text `--ink-slate` (preferred over black)
- **Success**: bg `--garden-green` + text `--on-dark`
- **Info**: bg `--soft-blue` + text `--ink-slate` (NEW)

## Accessibility Requirements (must pass)
- **Minimum contrast**: 4.5:1 for body text, 3:1 for large text/icons
- **Touch targets**: ≥ 44px minimum
- **Focus**: Visible focus rings required
- **Motion**: Respects `prefers-reduced-motion`
- **Color blindness**: Test with simulators for red-green colorblind users

## Enforcement — Auto-fix Guidance

### Replace These Patterns
- If code contains `text-black`, `#000`, `rgb(0,0,0)`, or `hsl(0 0% 0%)` outside critical alerts, replace with `text-[--ink-slate]`
- If dark bg is used and text isn't `--on-dark`, change to `--on-dark`
- If a tag bg is one of the 6 category tokens, force its paired text token from the table above
- If `--garden-green` is used for body text on light bg, replace with `--text-primary`

### Disallow — These Patterns
- ❌ Raw color values in components: `/#([0-9a-f]{3,8})\b/i`, `/rgb\\s*\\(`/i`, `/hsl\\s*\\(`/i`
- ❌ `text-black` class except inside critical safety alerts
- ❌ Using `--garden-green` for body text on light bg
- ❌ Mixing text colors that don't match approved pairings
- ❌ Pure black (#000000) for non-critical content

### Allow — Exceptions
- ✅ `--text-black` ONLY in critical safety alerts (e.g., "Session will end in 30 seconds")
- ✅ Inline colors inside a central tokens map (e.g., `tokens.css`)
- ✅ CSS custom properties in design token files

## Quick Examples

### ✅ Good Examples
```tsx
// Light surface content
<p className="text-[--text-primary]">Main content</p>
<span className="text-[--text-secondary]">Description</span>

// Primary button
<Button className="bg-[--garden-green] text-[--on-dark]">Start Journey</Button>

// Personality tag
<Tag className="bg-[--peach-100] text-[--jovial-jade]">Empathetic</Tag>

// Trust button (NEW)
<Button className="bg-[--soft-blue] text-[--ink-slate]">Learn More</Button>

// Warning alert (preferred soft ink)
<Alert variant="warning" className="bg-[--peach-200] text-[--ink-slate]">
  Please complete your assessment
</Alert>

// Critical alert (only place for pure black)
<Alert variant="critical" className="bg-[--peach-200] text-[--text-black]">
  ⚠️ Session ending in 30 seconds
</Alert>
```

### ❌ Bad Examples
```tsx
// Wrong - using black text on light surface
<p className="text-black">Hello</p>

// Wrong - raw hex values
<Button className="bg-[#497557] text-black">Go</Button>

// Wrong - mismatched tag colors
<Tag className="bg-[--peach-100] text-black">Empathetic</Tag>

// Wrong - garden-green for body text
<p className="text-[--garden-green]">Body text</p>

// Wrong - black for non-critical alerts
<Alert className="bg-[--peach-200] text-black">Minor warning</Alert>
```

## Implementation Notes
- **Always use CSS custom properties** with `text-[--token-name]` syntax
- **Test contrast ratios** using browser dev tools or accessibility tools
- **Use semantic color names** that match the design system
- **Prefer Tailwind's arbitrary value syntax** for custom properties: `text-[--text-primary]`
- **Soft ink (#20323A) is preferred over pure black** for better UX and brand alignment
- **Reserve pure black only for critical safety alerts** that require maximum attention

## Alert Hierarchy

### Critical (Use Pure Black)
- Safety warnings
- Session timeouts
- Emergency notifications
- Irreversible actions

### Standard (Use Soft Ink)
- Form validation errors
- General warnings
- Info messages
- Help text

## Dashboard-Specific Colors

### Header Colors
- **Logo text**: White (#FFFFFF) on `--jovial-jade` background
- **Search placeholder**: `--text-muted` (#6B7280) on `--jovial-jade` background
- **User avatar text**: White (#FFFFFF) on `--jovial-jade` background

### Sidebar Colors
- **Navigation text**: `--jovial-jade` (#305C45) on `--surface-accent` background
- **Active navigation**: White (#FFFFFF) on `--jovial-jade` background
- **Quick actions**: `--jovial-jade` (#305C45) on `--surface-accent` background

### Widget Colors
- **Widget titles**: `--jovial-jade` (#305C45) on `--surface` background
- **Action links**: `--garden-green` (#497557) on `--surface` background
- **Client names**: `--text-primary` (#466749) on `--surface` background
- **Email addresses**: `--text-secondary` (#6B7280) on `--surface` background
- **Times/dates**: `--text-secondary` (#6B7280) on `--surface` background

### Status Badge Colors
- **Active status**: White (#FFFFFF) on `--success-bg` (#497557)
- **Inactive status**: `--text-black` (#000000) on `--warning-bg` (#fcbaaa)

### Chart Colors
- **Chart labels**: `--text-secondary` (#6B7280) on white background
- **Central numbers**: `--jovial-jade` (#305C45) on white background
- **Data points**: Orange (#ffd9be) with white centers
