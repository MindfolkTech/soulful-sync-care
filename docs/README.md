# MindFolk Documentation

## 📁 Structure Overview

This directory contains comprehensive documentation for the MindFolk design system, organized for maximum accessibility and maintainability.

```
docs/
├── README.md                    ← This file (overview)
├── DESIGN_SYSTEM.md             ← Main design system guide
├── LAYOUT_COMPONENTS.md         ← Layout component requirements
├── DESIGN_TOKENS.md             ← Design token documentation
├── RESPONSIVE_PATTERNS.md       ← Responsive design guide
└── design-system/               ← Detailed component documentation
    ├── components/              ← Individual component docs
    │   ├── TherapistLayout.md
    │   ├── AdminLayout.md
    │   └── PageShell.md
    ├── patterns/                ← Design patterns
    │   ├── dashboard-layout.md
    │   └── content-structure.md
    └── examples/                ← Code examples
        ├── therapist-pages.md
        └── admin-pages.md
```

## 🎯 Quick Start

### For Developers
1. **Start with**: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Overview and getting started
2. **Read**: [LAYOUT_COMPONENTS.md](LAYOUT_COMPONENTS.md) - Implementation requirements
3. **Reference**: [DESIGN_TOKENS.md](DESIGN_TOKENS.md) - Token definitions
4. **Follow**: [RESPONSIVE_PATTERNS.md](RESPONSIVE_PATTERNS.md) - Responsive design guide

### For Designers
1. **Start with**: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Overview and principles
2. **Browse**: [design-system/components/](design-system/components/) - Component specifications
3. **Reference**: [design-system/patterns/](design-system/patterns/) - Design patterns
4. **Check**: [design-system/examples/](design-system/examples/) - Implementation examples

### For Non-Technical Team Members
1. **Start with**: [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - High-level overview
2. **Browse**: [design-system/components/](design-system/components/) - Component documentation
3. **Reference**: [design-system/patterns/](design-system/patterns/) - Design guidelines
4. **Check**: [design-system/examples/](design-system/examples/) - Visual examples

## 📚 Documentation Types

### Core Documentation
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - Main design system guide with overview, principles, and getting started
- **[LAYOUT_COMPONENTS.md](LAYOUT_COMPONENTS.md)** - Layout component requirements and implementation rules
- **[DESIGN_TOKENS.md](DESIGN_TOKENS.md)** - Design token definitions, usage, and responsive behavior
- **[RESPONSIVE_PATTERNS.md](RESPONSIVE_PATTERNS.md)** - Responsive design patterns, breakpoints, and best practices

### Component Documentation
- **[TherapistLayout.md](design-system/components/TherapistLayout.md)** - Therapist dashboard layout component
- **[AdminLayout.md](design-system/components/AdminLayout.md)** - Admin dashboard layout component
- **[PageShell.md](design-system/components/PageShell.md)** - Base layout for non-dashboard pages

### Design Patterns
- **[dashboard-layout.md](design-system/patterns/dashboard-layout.md)** - Dashboard layout requirements and patterns
- **[content-structure.md](design-system/patterns/content-structure.md)** - Content structure requirements and examples

### Code Examples
- **[therapist-pages.md](design-system/examples/therapist-pages.md)** - Therapist page implementation examples
- **[admin-pages.md](design-system/examples/admin-pages.md)** - Admin page implementation examples

## 🎨 Design System Principles

### 1. Consistency
- All pages follow the same layout patterns
- Consistent spacing, typography, and color usage
- Unified component behavior across interfaces

### 2. Accessibility
- WCAG AA compliance across all interfaces
- Proper touch targets and keyboard navigation
- Screen reader support and semantic HTML

### 3. Responsiveness
- Mobile-first design with fluid scaling
- Consistent behavior across all breakpoints
- Touch-friendly interfaces on all devices

### 4. Maintainability
- Clear documentation and single source of truth
- Modular component architecture
- Easy to update and extend

### 5. Team Collaboration
- Accessible to all team members regardless of technical background
- Clear separation of concerns
- Version controlled and trackable changes

## 🔧 Implementation Guidelines

### Layout Components
- **TherapistLayout**: Use for all authenticated therapist pages
- **AdminLayout**: Use for all authenticated admin pages
- **PageShell**: Use for onboarding, public, and pre-authentication pages

### Content Structure
All dashboard pages must follow this exact structure:
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

### Design Tokens
- **Source of Truth**: `styles/design-tokens.css`
- **Usage**: Use CSS custom properties for consistent theming
- **Responsive**: Most tokens use `clamp()` for fluid scaling

### Responsive Design
- **Breakpoints**: Mobile (< 768px), Tablet (768px - 1023px), Desktop (≥ 1024px)
- **Behavior**: Sidebar hidden on mobile/tablet, visible on desktop
- **Navigation**: Bottom navigation on mobile/tablet, sidebar on desktop

## 📱 Responsive Behavior

### Mobile/Tablet (< 1024px)
- Sidebar hidden, bottom navigation visible
- Full-width content with responsive padding
- Touch-friendly interface with 44px minimum touch targets

### Desktop (≥ 1024px)
- Sidebar visible and collapsible, no bottom navigation
- Constrained content width with proper centering
- Mouse and keyboard optimized interface

## ♿ Accessibility Features

### Touch Targets
- **Minimum**: 44px (`min-h-touch-min`) for all interactive elements
- **Comfortable**: 56px (`min-h-touch-comfort`) for primary actions
- **Spacing**: Adequate space between touch targets

### Focus Management
- Visible focus indicators on all interactive elements
- Logical tab order through all controls
- Proper ARIA landmarks and labels

### Screen Reader Support
- Semantic HTML structure with proper heading hierarchy
- Descriptive labels for all form controls
- Live regions for dynamic content updates

## 🚀 Getting Started

### For New Developers
1. Read [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for overview
2. Study [LAYOUT_COMPONENTS.md](LAYOUT_COMPONENTS.md) for implementation rules
3. Review [design-system/examples/](design-system/examples/) for code examples
4. Test responsive behavior across all breakpoints

### For New Designers
1. Review [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for principles
2. Study [design-system/components/](design-system/components/) for component specs
3. Reference [design-system/patterns/](design-system/patterns/) for design patterns
4. Check [design-system/examples/](design-system/examples/) for visual examples

### For New Team Members
1. Start with [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for high-level understanding
2. Browse [design-system/components/](design-system/components/) for component overview
3. Reference [design-system/patterns/](design-system/patterns/) for design guidelines
4. Check [design-system/examples/](design-system/examples/) for implementation examples

## 🔄 Maintenance

### Updating Documentation
1. Edit the relevant documentation file
2. Update any cross-references
3. Test examples and code snippets
4. Commit changes to version control

### Adding New Components
1. Create component in `src/components/`
2. Add documentation in `design-system/components/`
3. Update relevant pattern docs
4. Add examples if needed

### Updating Design Tokens
1. Edit `styles/design-tokens.css` (source of truth)
2. Update component documentation if needed
3. Test across all breakpoints
4. Communicate changes to team

## 📞 Support

### Questions About Implementation
- Check [LAYOUT_COMPONENTS.md](LAYOUT_COMPONENTS.md) for component requirements
- Review [design-system/examples/](design-system/examples/) for code examples
- Reference [RESPONSIVE_PATTERNS.md](RESPONSIVE_PATTERNS.md) for responsive behavior

### Questions About Design
- Check [design-system/components/](design-system/components/) for component specs
- Review [design-system/patterns/](design-system/patterns/) for design patterns
- Reference [DESIGN_TOKENS.md](DESIGN_TOKENS.md) for token definitions

### Questions About Accessibility
- Check [RESPONSIVE_PATTERNS.md](RESPONSIVE_PATTERNS.md) for accessibility guidelines
- Review [design-system/components/](design-system/components/) for component accessibility
- Reference [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for accessibility principles

## 🎯 Key Benefits

### For Developers
- **Clear Implementation Rules**: Know exactly how to implement each component
- **Consistent Patterns**: Follow established patterns for responsive behavior
- **Accessibility Compliance**: Built-in accessibility features and guidelines
- **Performance Optimization**: Optimized components and responsive behavior

### For Designers
- **Component Specifications**: Clear specs for each component
- **Design Patterns**: Reusable patterns for common use cases
- **Visual Examples**: See how components look and behave
- **Responsive Guidelines**: Understand responsive behavior across devices

### For Non-Technical Team Members
- **Easy to Find**: Clear organization and intuitive navigation
- **Visual Examples**: See components and patterns in action
- **Clear Guidelines**: Understand design principles and requirements
- **Team Collaboration**: Contribute to design decisions and feedback

### For the Project
- **Maintainability**: Clear documentation and single source of truth
- **Consistency**: Unified design system across all interfaces
- **Scalability**: Easy to extend and update as the project grows
- **Quality**: Built-in accessibility and responsive design standards

