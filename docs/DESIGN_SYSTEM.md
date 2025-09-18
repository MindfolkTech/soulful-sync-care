# MindFolk Design System

## Overview

The MindFolk Design System provides a comprehensive set of design tokens, components, and patterns to ensure consistent, accessible, and responsive user experiences across all therapist and admin interfaces.

## 📁 Structure

```
docs/
├── DESIGN_SYSTEM.md              ← This file (overview)
├── LAYOUT_COMPONENTS.md          ← Layout component requirements
├── DESIGN_TOKENS.md              ← Design token documentation
└── RESPONSIVE_PATTERNS.md        ← Responsive design guide

design-system/
├── components/                   ← Component documentation
│   ├── TherapistLayout.md
│   ├── AdminLayout.md
│   └── PageShell.md
├── patterns/                     ← Design patterns
│   ├── dashboard-layout.md
│   └── content-structure.md
└── examples/                     ← Code examples
    ├── therapist-pages.md
    └── admin-pages.md

styles/
├── design-tokens.css             ← Design tokens (source of truth)
├── responsive.css                ← Responsive utilities
└── components.css                ← Component-specific styles
```

## 🎨 Design Tokens

**Source of Truth**: `styles/design-tokens.css`

### Colors
- **Primary**: Jovial Jade, Garden Green, Elated Emerald
- **Semantic**: Success, Warning, Error, Info
- **Neutral**: Text Primary, Text Secondary, Background, Surface

### Typography
- **Primary Font**: Crimson Pro (H1, H2, H3 - page titles and major section headings)
- **Secondary Font**: Helvetica Neue (H4, H5, H6, body text, UI labels)
- **Responsive Scaling**: Uses `clamp()` for fluid typography

### Spacing
- **Responsive Tokens**: `--space-xs` through `--space-2xl`
- **Touch Targets**: Minimum 44px, Comfortable 56px
- **Fluid Scaling**: Uses `clamp()` for responsive spacing

## 🏗️ Layout Components

### TherapistLayout
**Purpose**: Base layout for all therapist dashboard pages
**Features**: Sidebar navigation, bottom nav (mobile), responsive behavior
**Usage**: All authenticated therapist pages (except onboarding)

### AdminLayout  
**Purpose**: Base layout for all admin dashboard pages
**Features**: Admin sidebar, bottom nav (mobile), responsive behavior
**Usage**: All authenticated admin pages (except onboarding)

### PageShell
**Purpose**: Base layout for non-dashboard pages
**Features**: Simple header/footer structure, responsive content
**Usage**: Onboarding, public pages, pre-authentication flows

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: ≥ 1024px

### Behavior
- **Mobile/Tablet**: Sidebar hidden, bottom navigation visible
- **Desktop**: Sidebar visible and collapsible, no bottom navigation

## 🎯 Content Structure Requirements

**CRITICAL**: All dashboard pages must follow this exact structure:

```tsx
<TherapistLayout> {/* or AdminLayout */}
  <div className="p-4 md:p-6 lg:p-8">  {/* Responsive padding */}
    <Container>                        {/* Container wrapper */}
      <div className="space-y-6">      {/* Content spacing */}
        {/* Page content */}
      </div>
    </Container>
  </div>
</TherapistLayout>
```

## ♿ Accessibility

### Touch Targets
- **Minimum**: 44px (`min-h-touch-min`)
- **Comfortable**: 56px (`min-h-touch-comfort`)

### Focus Management
- Visible focus indicators on all interactive elements
- Logical tab order through all controls
- Proper ARIA landmarks and labels

### Screen Reader Support
- Semantic HTML structure
- Logical heading hierarchy
- Descriptive labels for all form controls

## 🚀 Getting Started

### For Developers
1. **Read**: `docs/LAYOUT_COMPONENTS.md` for implementation rules
2. **Reference**: `styles/design-tokens.css` for design tokens
3. **Follow**: Content structure requirements for all pages
4. **Test**: Responsive behavior across all breakpoints

### For Designers
1. **Review**: `design-system/components/` for component specs
2. **Reference**: `design-system/patterns/` for design patterns
3. **Check**: `design-system/examples/` for implementation examples

### For Non-Technical Team Members
1. **Start**: This overview document
2. **Browse**: `design-system/components/` for component documentation
3. **Reference**: `design-system/patterns/` for design guidelines

## 📚 Documentation

- **[Layout Components](LAYOUT_COMPONENTS.md)** - Implementation requirements
- **[Design Tokens](DESIGN_TOKENS.md)** - Token definitions and usage
- **[Responsive Patterns](RESPONSIVE_PATTERNS.md)** - Responsive design guide
- **[Component Library](design-system/components/)** - Individual component docs
- **[Design Patterns](design-system/patterns/)** - Reusable design patterns
- **[Code Examples](design-system/examples/)** - Implementation examples

## 🔧 Maintenance

### Updating Design Tokens
1. Edit `styles/design-tokens.css` (source of truth)
2. Update component documentation if needed
3. Test across all breakpoints

### Adding New Components
1. Create component in `src/components/`
2. Add documentation in `design-system/components/`
3. Update relevant pattern docs
4. Add examples if needed

### Updating Layout Rules
1. Edit `docs/LAYOUT_COMPONENTS.md`
2. Update `.cursor/rules/` files to reference new docs
3. Test enforcement across codebase

## 🎯 Key Principles

1. **Consistency**: All pages follow the same layout patterns
2. **Accessibility**: WCAG AA compliance across all interfaces
3. **Responsiveness**: Mobile-first design with fluid scaling
4. **Maintainability**: Clear documentation and single source of truth
5. **Team Collaboration**: Accessible to all team members regardless of technical background
