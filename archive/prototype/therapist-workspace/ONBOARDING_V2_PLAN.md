# 🎯 Therapist Onboarding V2 - Comprehensive Improvement Plan

## Current State Evaluation

### What We Have Now:
1. **Quick Start Phase (3 steps):**
   - Step 1: Basic info & compliance
   - Step 2: Communication & Session styles
   - Step 3: Welcome

2. **Workspace Phase (5 steps):**
   - Specialties selection
   - Identity tags
   - Rates setting
   - Availability (basic)
   - Video upload

### Issues Identified:
- Too much critical matching data left for workspace phase
- Availability setup is too simplified
- Missing client management introduction
- Missing tasks system introduction
- Target elements not verified against real pages

---

## Proposed V2 Structure

### ✅ PHASE 1: QUICK START (5-7 minutes)
More comprehensive initial data collection

#### Step 1: Welcome & Compliance
- Basic info (name, email, password)
- Professional credentials (title, license, registration body)
- ID upload (drag & drop)
- Insurance checkbox (£6M minimum)

#### Step 2: Communication & Session Styles
- Communication style (4 options, 40% match)
- Session format (4 options, 40% match)
- Shows personality tags preview

#### Step 3: Specialties Selection *(NEW IN QUICK START)*
```typescript
// Use exact wording from 03-THERAPIST-SELECTIONS.md
const SPECIALTIES_QUICKSTART = [
  "Anger management",
  "Anxiety", 
  "Autism",
  "Bipolar disorder",
  "Bullying",
  "Career difficulties",
  "Chronic illness",
  "Concentration, memory and focus (ADHD)",
  "Coping with addictions",
  "Depression",
  "Eating disorders",
  "Executive and Professional coaching",
  "Family conflict",
  "Grief and loss",
  "LGBT-related issues",
  "Motivation and self-esteem",
  "OCD",
  "Parenting issues",
  "Phobias",
  "PTSD",
  "Race and racial identity",
  "Relationship and intimacy issues",
  "Tourettes syndrome",
  "Trauma and abuse"
];
```

#### Step 4: Modalities Selection *(NEW IN QUICK START)*
```typescript
// From 03-THERAPIST-SELECTIONS.md
const MODALITIES_QUICKSTART = [
  "Cognitive Behavioural Therapy (CBT)",
  "Compassion Focused Therapy (CFT)",
  "EMDR Therapy",
  "Family systems therapy",
  "Integrative/eclectic approach",
  "Interpersonal Therapy",
  "Mindfulness-based Therapy (MBCT)",
  "Person-centered Therapy",
  "Psychodynamic therapy",
  "Trauma-focused therapy"
];
```

#### Step 5: Welcome to Workspace
- Profile strength: 40% (increased from 30%)
- Preview of workspace features
- Navigate to workspace button

---

### ✅ PHASE 2: WORKSPACE SETUP (15-20 minutes)

#### Step 1: Availability Setup *(EXPANDED WITH SUB-STEPS)*

**Navigation:** `/therapist/schedule` → "Manage availability" tab

**Sub-step 1.1: Add Weekly Hours**
- Target: `[data-onboarding="availability-hours"]`
- Validation: Minimum 10 hours/week added
- Tooltip: "Add at least 10 hours of availability per week"

**Sub-step 1.2: Calendar Integration**
- Target: `[data-onboarding="calendar-integration-button"]`
- Component: `CalendarIntegrationModal`
- Validation: Either calendar connected OR "I'll do this later" clicked
- If calendar connected → Sub-step 1.2.1: "Add another calendar?"

**Sub-step 1.3: Buffer Settings**
- Target: `[data-onboarding="buffer-settings"]`
- Tooltip: "Add automatic buffer time between appointments"
- Options: 5, 10, 15, 30 minutes

**Sub-step 1.4: Auto-Accept Rules**
- Target: `[data-onboarding="auto-accept-settings"]`
- Aria-label: "Mindfolk will automatically accept new bookings on your behalf. We will send you an email notifying you of your new booking. Please tell us how much notice you require for new bookings. (Note: To ensure your required notice is always respected, clients will not be able to book any available slots that fall within your notice period)."
- Options: [30 minutes, 1 hour, 2 hours, 4 hours, 24 hours, 48 hours, 72 hours]

**Sub-step 1.5: Cancellation Agreement**
- Target: `[data-onboarding="cancellation-agreement"]`
- Mandatory checkbox: "I understand that if I don't show up to an appointment without giving the client reasonable notice, or if I cancel an appointment more than 3 times, my account may be suspended."
- Validation: Checkbox must be checked

---

#### Step 2: Profile Setup *(REORGANIZED WITH SUB-STEPS)*

**Navigation:** `/therapist/profile`

**Sub-step 2.1: Introduction**
- Target: `[data-onboarding="profile-intro"]`
- Tooltip: "This is where you can edit the client-facing aspects of your practice"

**Sub-step 2.2: Set Rates**
- Target: `[data-onboarding="session-rates"]`
- Tooltip: "Let's start by setting some rates"
- Validation: Rate > 0

**Sub-step 2.3: Review Policies**
- Target: `[data-onboarding="cancellation-policies"]`
- Tooltip: "Now let's have a look at your policies. You can change these now, later, or leave the default"

**Sub-step 2.4: Upload Photo**
- Target: `[data-onboarding="profile-photo"]`
- Tooltip: "Please upload a professional picture. You can upload multiple if you'd like"
- Validation: At least 1 photo uploaded

**Sub-step 2.5: Introduction Video**
- Target: `[data-onboarding="intro-video"]`
- Tooltip: "We strongly recommend all therapists create an introductory video. Upload now, or later if preferred"
- Optional with skip button

---

#### Step 3: Client Management Introduction *(NEW)*

**Navigation:** `/therapist/clients`

- Target: `[data-onboarding="clients-overview"]`
- Tooltip: "This is where you will manage your clients"
- Show key features: client list, session notes, progress tracking

---

#### Step 4: Tasks System Introduction *(NEW)*

**Navigation:** `/therapist/tasks` or relevant section

**Sub-step 4.1: Tasks Overview**
- Target: `[data-onboarding="tasks-list"]`
- Tooltip: "This is where your tasks will live. Certain tasks will be added here automatically"

**Sub-step 4.2: Add Task**
- Target: `[data-onboarding="add-task-button"]`
- Tooltip: "You can also add tasks yourself by clicking here. Try adding a task"
- Validation: One task added

**Sub-step 4.3: Complete Task**
- Target: `[data-onboarding="complete-task-button"]`
- Tooltip: "Now try clicking complete"
- Validation: Task marked complete

**Sub-step 4.4: Undo Action**
- Target: `[data-onboarding="undo-button"]`
- Tooltip: "If you complete a task by mistake, you can always click undo to bring it back - easy!"

---

## Target Elements Verification

### Real Pages to Update:

1. **Schedule.tsx**
```typescript
// Add data attributes to:
- EnhancedAvailabilityManager: data-onboarding="availability-hours"
- Calendar Integration Button: data-onboarding="calendar-integration-button"
- Buffer settings section: data-onboarding="buffer-settings"
- Auto-accept section: data-onboarding="auto-accept-settings"
```

2. **Profile.tsx**
```typescript
// Add data attributes to:
- Rates section: data-onboarding="session-rates"
- Policies section: data-onboarding="cancellation-policies"  
- Photo upload: data-onboarding="profile-photo"
- Video section: data-onboarding="intro-video"
```

3. **Clients.tsx**
```typescript
// Add data attribute to:
- Main container: data-onboarding="clients-overview"
```

4. **Tasks Component** (needs identification)
```typescript
// Add data attributes to:
- Tasks list: data-onboarding="tasks-list"
- Add button: data-onboarding="add-task-button"
- Complete button: data-onboarding="complete-task-button"
- Undo button: data-onboarding="undo-button"
```

---

## Profile Strength Calculation V2

- Quick Start completion: 40% (up from 30%)
  - Basic info: 10%
  - Communication/Session: 10%
  - Specialties: 10%
  - Modalities: 10%
  
- Workspace completion: +60%
  - Availability setup: +15%
  - Profile setup: +15%
  - Client intro: +5%
  - Tasks intro: +5%
  - Video upload: +20%

Total possible: 100%

---

## Implementation Priority

1. **High Priority:**
   - Move specialties & modalities to Quick Start ✅
   - Implement comprehensive availability setup with sub-steps ✅
   - Verify and update target elements on real pages ✅

2. **Medium Priority:**
   - Add client management introduction
   - Add tasks system introduction
   - Implement sub-steps for profile setup

3. **Nice to Have:**
   - Analytics tracking for each sub-step
   - A/B testing different flows
   - Personalization based on therapist type

---

## Success Metrics

- Quick Start completion: >90% (5-7 minutes)
- Availability setup completion: >85%
- Full onboarding completion: >75% within first session
- Profile strength >70%: 80% of therapists
- Video upload rate: >40% (stretch goal)
