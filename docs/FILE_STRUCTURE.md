# File Structure & Organization Patterns

## Overview
This document describes the current file structure after the major refactoring completed on 2025-09-29. It serves as a reference for understanding where things are and how to maintain consistency.

## Project Structure

```
soulful-sync-care/
├── docs/                      # All project documentation
│   ├── COMPONENT_ORGANIZATION.md
│   ├── TRANSITION_PLAN.md
│   ├── navigation-diagram.md
│   └── FILE_STRUCTURE.md (this file)
│
├── scripts/                   # Build and utility scripts
│   └── ENHANCED_SEED_REPLACEMENT.js
│
├── src/
│   ├── components/           # React components (feature-first)
│   │   ├── admin/           # Admin dashboard features
│   │   ├── auth/            # Authentication flows
│   │   ├── booking/         # Appointment booking
│   │   ├── calendar/        # Calendar and scheduling
│   │   ├── client/          # Client-specific features
│   │   ├── dev/             # Development tools
│   │   ├── discovery/       # Therapist discovery
│   │   ├── gdpr/            # GDPR compliance
│   │   ├── layout/          # App-wide layouts
│   │   ├── legal/           # Legal documents display
│   │   ├── messaging/       # Chat and messaging
│   │   ├── molecules/       # (Legacy) Small composed components
│   │   ├── notifications/   # Notification system
│   │   ├── organisms/       # (Legacy) Large composed components
│   │   ├── payment/         # Payment processing
│   │   ├── session/         # Video session components
│   │   ├── shared/          # ✨ Shared utilities (NEW)
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── error-boundary.tsx
│   │   ├── support/         # Support tickets
│   │   ├── therapist/       # Therapist-specific features
│   │   ├── ui/              # Generic UI primitives
│   │   └── video/           # Video upload/playback
│   │
│   ├── contexts/            # React contexts (consolidated)
│   │   ├── AuthContext.tsx  # ✨ Moved from /context/
│   │   ├── impersonation-context.tsx
│   │   └── role-switching-context.tsx
│   │
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # ✨ Library functions (NEW location)
│   │   ├── data-rights.ts   # Moved from /utils/
│   │   ├── featureFlags.ts  # Moved from /utils/
│   │   ├── matching.ts
│   │   ├── port-detector.ts # Moved from /utils/
│   │   ├── screenshot-analyzer.ts # Moved from /utils/
│   │   ├── screenshot-capture.ts  # Moved from /utils/
│   │   ├── therapist-profile.ts
│   │   └── utils.ts
│   │
│   ├── pages/               # Route pages
│   ├── data/                # Static data and mock data
│   ├── integrations/        # Third-party integrations
│   ├── stories/             # Storybook stories
│   └── types/               # TypeScript type definitions
│
└── supabase/                # Supabase migrations and config
```

## Recent Changes (2025-09-29 Refactoring)

### ✨ New Locations

#### 1. `/src/lib/` (Previously `/src/utils/`)
**Purpose:** Library functions and utilities following Next.js conventions

**What moved here:**
- `data-rights.ts` - GDPR compliance utilities
- `featureFlags.ts` - Feature toggle management
- `port-detector.ts` - Development port detection
- `screenshot-analyzer.ts` - Screenshot analysis tools
- `screenshot-capture.ts` - Screenshot capture utilities

**Why:** Better aligns with modern React/Next.js project conventions

#### 2. `/src/contexts/` (Consolidated from `/src/context/`)
**Purpose:** All React context providers in one place

**What moved here:**
- `AuthContext.tsx` (from `/src/context/AuthContext.tsx`)

**Why:** Consistency - all contexts now in one folder with plural naming

#### 3. `/src/components/shared/` (Previously `/src/components/util/`)
**Purpose:** Components shared across multiple features

**What moved here:**
- `ErrorBoundary.tsx`
- `error-boundary.tsx` (duplicate - consider removing)

**Why:** More descriptive name - "shared" is clearer than "util"

#### 4. `/docs/` (New folder)
**Purpose:** All project documentation

**What moved here:**
- `TRANSITION_PLAN.md` (from root)
- `navigation-diagram.md` (from root)
- `COMPONENT_ORGANIZATION.md` (new location)

**Why:** Keeps documentation organized and separate from code

#### 5. `/scripts/` (New folder)
**Purpose:** Build and utility scripts

**What moved here:**
- `ENHANCED_SEED_REPLACEMENT.js` (from root)

**Why:** Separates scripts from source code

### 🗑️ Deleted/Cleaned Up

- Old `/src/context/` folder (consolidated into `/src/contexts/`)
- Old `/src/utils/` folder (moved to `/src/lib/`)
- Duplicate error boundary file
- Temporary files:
  - `how --stat 0d633394049141dcac3dcc13011416726596c49e`
  - `how 0d633394049141dcac3dcc13011416726596c49e`
  - `migration_files.txt`
  - `"tat -ano" command artifact`

## Import Path Patterns

### ✅ Current Standard Patterns

```typescript
// Contexts (note: plural)
import { useAuth } from '@/contexts/AuthContext'
import { useImpersonation } from '@/contexts/impersonation-context'

// Library utilities (note: /lib/ not /utils/)
import { exportUserData } from '@/lib/data-rights'
import { checkFeatureFlag } from '@/lib/featureFlags'
import { detectPort } from '@/lib/port-detector'

// Shared components (note: /shared/ not /util/)
import ErrorBoundary from '@/components/shared/ErrorBoundary'

// UI components
import { Button } from '@/components/ui/button'

// Feature components
import { TherapistSidebar } from '@/components/therapist/therapist-sidebar'
```

### ❌ Deprecated Patterns (Do Not Use)

```typescript
// OLD - Don't use these!
import { useAuth } from '@/context/AuthContext'      // Wrong: singular
import { exportUserData } from '@/utils/data-rights' // Wrong: utils
import ErrorBoundary from '@/components/util/ErrorBoundary' // Wrong: util
```

## Guidelines for Adding New Files

### When to use `/lib/`
- Pure functions with no React dependencies
- Utility functions used across multiple features
- Business logic that doesn't belong in components
- Third-party library wrappers

### When to use `/contexts/`
- React context providers
- Global state management
- Cross-cutting concerns (auth, theme, etc.)

### When to use `/components/shared/`
- React components used in 3+ different feature areas
- Utility components with React hooks/state
- Error boundaries, loading states, etc.

### When to use feature folders (`/components/therapist/`, etc.)
- Components used only within that feature
- Role-specific components
- Feature-specific logic

## Maintenance Rules

### 1. No More `/utils/` Folder
All utility files go in `/lib/`. This follows modern React conventions and makes the purpose clearer.

### 2. Single `/contexts/` Folder
Don't create `/context/` (singular). Always use `/contexts/` (plural).

### 3. `/shared/` Over `/util/` or `/common/`
For shared components, use `/components/shared/`. It's more descriptive than vague names like "util" or "common".

### 4. Documentation Lives in `/docs/`
Don't scatter markdown files in the root. Keep them organized in `/docs/`.

### 5. Scripts Live in `/scripts/`
Build scripts, database seeders, and utilities go in `/scripts/`, not the root.

## Migration Checklist for New Components

When adding a new component, ask:

1. **Is it React-specific?**
   - Yes → Goes in `/components/`
   - No → Goes in `/lib/`

2. **Is it a context provider?**
   - Yes → Goes in `/contexts/`

3. **Is it used by one specific feature?**
   - Yes → Goes in that feature folder (`/components/therapist/`, etc.)

4. **Is it used across multiple features?**
   - Yes → Goes in `/components/shared/`

5. **Is it a generic UI element?**
   - Yes → Goes in `/components/ui/`

6. **Is it documentation?**
   - Yes → Goes in `/docs/`

7. **Is it a script/tool?**
   - Yes → Goes in `/scripts/`

## Legacy Folders (To Be Migrated)

These folders still exist but are being phased out per `COMPONENT_ORGANIZATION.md`:

- `/components/molecules/` - Move contents to feature folders or `/shared/`
- `/components/organisms/` - Move contents to feature folders or `/shared/`

See `COMPONENT_ORGANIZATION.md` for the full migration strategy.

---

**Last Updated:** 2025-09-29
**Related Docs:**
- `COMPONENT_ORGANIZATION.md` - Feature-first organization strategy
- `TRANSITION_PLAN.md` - Overall migration plan
- `navigation-diagram.md` - Application navigation structure