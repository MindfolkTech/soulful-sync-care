# Component Organization Guide

## Overview

This codebase uses a **Feature-First** organization system. Components are grouped by which feature or user role they serve, making it easy to find and understand what each component does.

## Why Feature-First?

**ADHD-Friendly Benefits:**
- No decision paralysis - clear places for everything
- Fast searching - if it's therapist-related, look in `therapist/`
- Easy onboarding - new developers understand the structure instantly
- Natural grouping - related components live together

## Folder Structure

```
src/components/
├── admin/          # Admin dashboard and management
├── auth/           # Login, signup, password reset
├── booking/        # Appointment booking components
├── calendar/       # Calendar and scheduling
├── client/         # Client-specific components
├── discovery/      # Therapist discovery and search
├── gdpr/           # Privacy and data rights
├── layout/         # App-wide layouts (header, footer, nav)
├── legal/          # Terms, privacy policy displays
├── messaging/      # Chat and messaging
├── notifications/  # Notification components
├── payment/        # Billing and payments
├── session/        # Video session components
├── shared/         # Used by multiple features (RENAME from util/)
├── support/        # Help and support
├── therapist/      # Therapist-specific components
├── ui/             # Generic UI primitives (buttons, inputs)
└── video/          # Video upload and playback
```

## Decision Tree: Where Does My Component Go?

### 1. Is it used ONLY by one user role?
- **Therapist only** → `therapist/`
- **Client only** → `client/`
- **Admin only** → `admin/`

### 2. Is it for a specific feature?
- **Booking** → `booking/`
- **Messaging** → `messaging/`
- **Calendar** → `calendar/`

### 3. Is it a generic UI element?
- **Button, Input, Card** → `ui/`
- **Form components** → `ui/`

### 4. Is it shared across multiple features?
- **Used in 2+ different areas** → `shared/`
- **Utility components** → `shared/`

### 5. Is it structural?
- **Header, Footer, Sidebar** → `layout/`

## Migration Plan from molecules/organisms/

Currently, we have:
- `molecules/` - Small composed components
- `organisms/` - Larger composed components
- `ui/` - Basic UI primitives

**Action:** Move these to feature folders based on usage:

### Example Migration:

**molecules/client-card.tsx**
- Used in discovery? → Move to `discovery/`
- Used in admin? → Move to `admin/`
- Used in multiple places? → Move to `shared/`

**organisms/therapist-profile-section.tsx**
- Clearly therapist-related → Move to `therapist/`

## Naming Conventions

### Files
- Use kebab-case: `therapist-sidebar.tsx`
- Be specific: `add-task-dialog.tsx` not `dialog.tsx`

### Components
- Use PascalCase: `TherapistSidebar`
- Export as default when appropriate

### Folders
- Use lowercase: `therapist/`, not `Therapist/`
- Use singular for roles: `client/` not `clients/`
- Use plural for features: `notifications/` not `notification/`

## Special Folders

### `/shared/`
For components used across multiple features:
```
shared/
├── cards/           # Reusable card layouts
├── forms/           # Form components used everywhere
└── data-display/    # Tables, lists, etc.
```

### `/ui/`
Only for basic, generic UI primitives:
```
ui/
├── button.tsx       # Basic button
├── input.tsx        # Basic input
├── card.tsx         # Basic card layout
└── dialog.tsx       # Basic modal
```

### `/layout/`
App-wide structural components:
```
layout/
├── header.tsx       # Main header
├── footer.tsx       # Main footer
├── sidebar.tsx      # App sidebar
└── container.tsx    # Page container
```

## Anti-Patterns (Don't Do This!)

❌ **Mixing organization styles**
```
components/
├── molecules/        # Atomic design
├── therapist/        # Feature-based
```
Pick ONE system!

❌ **Vague folder names**
```
components/
├── util/
├── misc/
├── common/
```
Use `shared/` instead.

❌ **Dumping everything in one folder**
```
components/
└── 247 random files
```
Group by feature!

❌ **Deep nesting**
```
components/therapist/profile/sections/video/upload/modal.tsx
```
Keep it 2-3 levels max.

## Testing

Keep tests close to the components:
```
therapist/
├── profile-sections.tsx
└── __tests__/
    └── profile-sections.test.tsx
```

## When to Create a New Folder

Create a new feature folder when:
1. You have 3+ related components
2. The feature is clearly distinct
3. It helps with clarity (not just organization for organization's sake)

Don't create a folder for:
1. A single component
2. Temporary/experimental code (use `dev/` instead)

## Questions?

**"Where do I put a component used by both clients and therapists?"**
→ `shared/` - It's shared across roles

**"Is this a molecule or organism?"**
→ Don't think in those terms! Think: What feature does it serve?

**"Should I split this into smaller components?"**
→ If it helps readability, yes. But don't over-split just to fit a pattern.

---

**Last Updated:** 2025-09-29
**Approved:** Feature-First organization system