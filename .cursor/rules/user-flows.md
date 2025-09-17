---
description: Mandatory components and flows to maintain core user journeys across all screens
globs: ["src/**/*.tsx", "src/**/*.ts", "src/pages/**/*.tsx"]
alwaysApply: true
---

# Rule: User Flows — Maintain Core Journey Components (WCAG AA)

## Scope
Apply to all UI code (React/TSX/CSS/Tailwind). Ensure every screen maintains core user flow elements and accessibility standards.
🚫 No screens without essential navigation, progress, or flow continuity elements.

**Reference**: See `design-tokens.md` for complete token definitions and usage guidelines.

## Core Flow Requirements

### Universal Screen Elements (Every Screen Must Have)

#### 1. Navigation & Flow Continuity
- **Back button** or breadcrumb navigation (except welcome screen)
- **Progress indicator** for multi-step flows (assessment, onboarding)
- **Skip option** for optional steps (with soft emphasis to encourage completion)
- **Exit/Logout** option accessible but not prominent

#### 2. Accessibility & Touch Targets
- **Minimum touch targets**: `min-h-[--touch-target-min]` (44px) for all interactive elements
- **Comfortable touch targets**: `min-h-[--touch-target-comfort]` (56px) for primary actions
- **Focus indicators**: Visible focus rings on all interactive elements
- **Keyboard navigation**: All flows must be keyboard accessible

#### 3. Container & Layout
- **Container wrapper**: All content wrapped in `<Container>` component
- **Responsive padding**: `px-6 md:px-8 lg:px-10` for horizontal spacing
- **Card padding**: `p-4 md:p-5 lg:p-6` for option cards and content blocks
- **Vertical rhythm**: `gap-4` (headline/body), `gap-6` (section → primary CTA)

## Client Journey: Assessment-First Discovery

### Flow 1: Client Onboarding & Assessment

#### Mandatory Components Per Screen:

**Welcome & Value Proposition**
- ✅ Hero illustration with diverse figures
- ✅ Primary CTA: "Start Your Journey" (`bg-[--btn-primary-bg]` + `text-[--btn-primary-text]`)
- ✅ Secondary CTA: "Already have an account? Log In" (`bg-[--btn-accent-bg]` + `border-[--garden-green]`)
- ✅ Container wrapper with responsive padding

**Assessment Introduction**
- ✅ Progress indicator: Step X of 4 (`bg-[--garden-green]` progress bar)
- ✅ Value explanation: "85% better compatibility when matched by personality"
- ✅ Primary CTA: "Continue" (`bg-[--btn-primary-bg]` + `text-[--btn-primary-text]`)
- ✅ Tertiary CTA: "Skip for now" (`bg-[--btn-cta-bg]` + `text-[--text-primary]`, softer emphasis)
- ✅ Back button to previous step

**Goal Selection (Multi-select cards)**
- ✅ Progress indicator: X% complete
- ✅ Multi-select cards with visual states:
  - Unselected: `bg-[--surface]` background, `border-[--border]` border
  - Selected: `bg-[--surface-accent]` background, `border-[--garden-green]` border
- ✅ Continue button (disabled until selection made)
- ✅ Back button to previous step

**Preferences & Identity**
- ✅ Progress indicator: X% complete
- ✅ Therapist characteristic options with clear labels
- ✅ Identity-affirming options (LGBTQ+ friendly, neurodiversity affirming)
- ✅ Continue button
- ✅ Back button to previous step

### Flow 2: Therapist Discovery & Chemistry Call Booking

#### Mandatory Components Per Screen:

**Discovery Interface (Tinder-style)**
- ✅ Full-screen video profile cards (mobile) or split view (desktop)
- ✅ Video controls: Default paused with overlay play button, captions ON
- ✅ Profile actions:
  - Favorite: `bg-[--btn-accent-bg]` background with heart icon
  - Skip: X icon with undo toast notification
  - Info: `bg-[--btn-cta-bg]` background for detailed view
- ✅ Swipe gesture support with visual feedback
- ✅ Loading states: Skeleton screens during content fetch

**Therapist Profile Detail View**
- ✅ Video section: 30-second introduction with custom controls
- ✅ Bio section: Personality-focused description
- ✅ Tag system (5 categories with proper colors):
  - Personality: `bg-[--tag-personality-bg]` + `text-[--tag-personality-text]`
  - Modality: `bg-[--tag-modality-bg]` + `text-[--tag-modality-text]`
  - Specialty: `bg-[--tag-specialty-bg]` + `text-[--tag-specialty-text]`
  - Language: `bg-[--tag-language-bg]` + `text-[--tag-language-text]`
  - Misc/Identity: `bg-[--tag-misc-bg]` + `text-[--tag-misc-text]`
- ✅ Availability preview: Next 3 available chemistry call slots
- ✅ Rates: Clearly displayed session pricing
- ✅ Back button to discovery interface

**Chemistry Call Booking**
- ✅ Calendar integration: Available 15-minute slots displayed
- ✅ Primary CTA: "Book Chemistry Call" (`bg-[--btn-primary-bg]` background)
- ✅ Secondary CTA: "Add to Favorites" (`bg-[--btn-accent-bg]` background)
- ✅ Automated reminders: Email + SMS confirmations
- ✅ Back button to profile detail

## Therapist Journey: Practice Building & Client Management

### Flow 3: Therapist Profile Creation & Video Upload

#### Mandatory Components Per Screen:

**Professional Information**
- ✅ Credentials and certifications upload with drag-and-drop
- ✅ Specializations and modalities selection using tag system
- ✅ Rate setting with guidance ranges
- ✅ Progress indicator for profile completion
- ✅ Continue button
- ✅ Back button (if applicable)

**Personality Profile Creation**
- ✅ 30-second video recording guidelines and tips
- ✅ Bio writing assistance with personality-focused prompts
- ✅ Preview and editing tools
- ✅ Progress indicator for profile completion
- ✅ Continue button
- ✅ Back button to previous step

**Availability & Policies**
- ✅ Calendar integration setup
- ✅ Cancellation policy configuration
- ✅ Session preferences (remote/in-person if applicable)
- ✅ Profile preview before publishing
- ✅ Publish button
- ✅ Back button to previous step

### Flow 4: Session Management & Client Communication

#### Mandatory Components Per Screen:

**Morning Dashboard Overview**
- ✅ Personalized welcome message + avatar
- ✅ Upcoming appointments widget: session cards with JOIN NOW (appears 10 min before), edit options, and calendar link
- ✅ Client dashboard widget: Active/Inactive status overview
- ✅ Income details widget: breakdown of sessions (happened / cancelled / rescheduled)
- ✅ Business profile widget: performance overview + action prompts

**All Therapist Pages (Dashboard Pattern)**
- ✅ **DashboardLayout Component**: Mandatory shared component for all therapist pages
- ✅ **Layout Atoms**: Use Stack, HStack, Cluster for consistent spacing
- ✅ **Responsive Design**: Collapsible sidebar, mobile-first, no horizontal scroll
- ✅ **Typography**: `font-[--font-primary]` for titles, `font-[--font-secondary]` for content
- ✅ **Color System**: All pages must use design tokens consistently

**Calendar Management**
- ✅ Google/Outlook integration buttons
- ✅ Toggle: List / Calendar view
- ✅ Filters: TODAY | WEEK | MONTH
- ✅ Appointment cards with full details + direct edit
- ✅ Banner reminders for upcoming sessions

**Client Relationship Management**
- ✅ Client directory: search, filters, statuses (Contract signed, Awaiting, Trial, etc.)
- ✅ Client profile files: tabs for Summary, Notifications, Files
- ✅ Status tracking: Active/Inactive badges, history log
- ✅ Quick actions: message client, schedule appointment, view profile

**Session Delivery & Documentation**
- ✅ Live video (Daily.co WebRTC with shadcn/ui controls)
- ✅ In-session tools: mute/video toggle, timer, PiP self-view, encrypted chat panel
- ✅ Note-taking interface (autosave templates)
- ✅ Post-session: summaries, next booking, payment confirmation

**Performance & Analytics**
- ✅ KPIs: profile views, sessions booked, favorites, ratings
- ✅ Appointment analytics: happened/cancelled/rescheduled
- ✅ Income analysis: trends + platform fee breakdown
- ✅ "Ways to Improve" section (pricing, video, reviews, promotion)

**Professional Verification**
- ✅ Registration + credential management
- ✅ Document upload & status badges (Pending / Verified)
- ✅ Compliance and profile activation workflow

**Specific Therapist Page Requirements**
- ✅ **Analytics Page**: Dashboard layout + analytics-specific widgets (KPIs, charts, improvements)
- ✅ **Clients Page**: Dashboard layout + client management widgets (search, filters, client list)
- ✅ **Bookings Page**: Dashboard layout + booking management widgets (calendar, appointment list, status tracking)
- ✅ **Messages Page**: Dashboard layout + messaging widgets (conversation list, message thread, input)
- ✅ **Profile Page**: Dashboard layout + profile management widgets (profile info, video upload, availability)
- ✅ **Earnings Page**: Dashboard layout + earnings widgets (income charts, payout history, tax documents)

## Platform Integration Flows

### Flow 5: Cross-Platform Communication

#### Mandatory Components Per Screen:

**Secure Messaging System**
- ✅ End-to-end encrypted chat between matched pairs
- ✅ Message status indicators (sent, delivered, read)
- ✅ File sharing with healthcare compliance
- ✅ Send button with `min-h-[--touch-target-comfort]` (56px)
- ✅ Message styling:
  - Sent: `bg-[--garden-green]` background
  - Received: `bg-[--surface]` background
- ✅ System messages: `text-[--text-muted]` color for timestamps

**Notification Management**
- ✅ Customizable notification preferences
- ✅ Multi-channel delivery (email, SMS, push)
- ✅ Quiet hours and emergency override settings
- ✅ Save preferences button
- ✅ Back button to main interface

## Responsive Design Requirements

### Mobile-First (320px-767px)
- ✅ Single column layouts for optimal scrolling
- ✅ Bottom navigation for thumb-friendly access
- ✅ Full-screen video profiles for immersive experience
- ✅ Container padding: `px-6` for comfortable content margins

### Tablet Optimization (768px-1023px)
- ✅ Two-column grids for assessment questions
- ✅ Sidebar navigation introduction
- ✅ Enhanced video controls with more detail
- ✅ Container padding: `px-8` for balanced spacing

### Desktop Enhancement (1024px+)
- ✅ Multi-panel layouts for discovery interface
- ✅ Detailed therapist profiles with expanded information
- ✅ Keyboard navigation support throughout
- ✅ Container padding: `px-10` for optimal reading width

## Typography Requirements

### Font Usage
- ✅ Headings: `font-[--font-primary]` (Crimson Pro, Georgia, serif)
- ✅ Body text and UI labels: `font-[--font-secondary]` (Helvetica Neue, Helvetica, Arial, sans-serif)
- ✅ Therapist names and quotes: `font-[--font-primary]`
- ✅ Sender names in messages: `font-[--font-primary]`
- ✅ Form labels: `font-[--font-secondary]`
- ✅ Section headings: `font-[--font-primary]`

## Color System Requirements

### Background System
- ✅ App background: `bg-[--warm-white]`
- ✅ Cards: `bg-[--surface]`
- ✅ Selected states: `bg-[--surface-accent]`
- ✅ Form inputs: `bg-[--surface]` background, `border-[--border]` borders

### Interactive Elements
- ✅ Primary buttons: `bg-[--btn-primary-bg]` + `text-[--btn-primary-text]`
- ✅ Secondary buttons: transparent + `border-[--garden-green]`
- ✅ Tertiary buttons: transparent + `text-[--jovial-jade]`
- ✅ Accent buttons: `bg-[--btn-accent-bg]` + `text-[--jovial-jade]`
- ✅ CTA buttons: `bg-[--btn-cta-bg]` + `text-[--text-primary]`

## Enforcement Rules

### Required Elements Check
- ✅ Every screen must have navigation (back button or breadcrumb)
- ✅ Every multi-step flow must have progress indicator
- ✅ Every interactive element must meet touch target requirements
- ✅ Every screen must use Container wrapper
- ✅ Every screen must have proper typography hierarchy
- ✅ Every screen must have accessible focus indicators
- ✅ Every therapist page must use dashboard layout pattern
- ✅ Every admin page must use dashboard layout pattern

### Forbidden Patterns
- ❌ Screens without navigation elements
- ❌ Multi-step flows without progress indicators
- ❌ Interactive elements below 44px touch targets
- ❌ Content not wrapped in Container component
- ❌ Inconsistent typography usage
- ❌ Missing focus indicators on interactive elements
- ❌ Therapist pages without dashboard layout pattern
- ❌ Admin pages without dashboard layout pattern
- ❌ Pages with inconsistent header/sidebar design
- ❌ Pages using different color schemes than design tokens

## Examples

### ✅ Good Flow Implementation
```tsx
// Therapist page using DashboardLayout component
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Stack, HStack } from "@/components/layout/layout-atoms";

export default function TherapistPage() {
  return (
    <DashboardLayout 
      title="Good morning, Dr. Chen"
      subtitle="Here's your practice overview"
    >
      <Stack className="space-y-6">
        {/* Page content with proper layout atoms */}
        <HStack className="justify-between">
          <div className="stats-cards">...</div>
        </HStack>
      
      {/* Upcoming Appointments Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="font-[--font-primary] text-[--jovial-jade]">Today's Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingSessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[--surface-accent] rounded-full flex items-center justify-center">
                  <span className="font-[--font-secondary] text-[--text-primary] text-sm">{session.clientInitials}</span>
                </div>
                <div>
                  <p className="font-[--font-secondary] text-[--text-primary]">{session.type}</p>
                  <p className="font-[--font-secondary] text-[--text-secondary] text-sm">{session.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {session.canJoin && (
                  <Button className="bg-[--garden-green] text-[--on-dark]">
                    <Video className="w-4 h-4 mr-2" />
                    JOIN NOW
                  </Button>
                )}
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Calendar Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-[--font-primary] text-[--jovial-jade]">Calendar</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Google</Button>
            <Button variant="outline" size="sm">Outlook</Button>
            <div className="flex border rounded-md">
              <Button variant="outline" size="sm" className="rounded-r-none">List</Button>
              <Button variant="outline" size="sm" className="rounded-l-none">Calendar</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button variant="outline" size="sm">TODAY</Button>
            <Button variant="outline" size="sm">WEEK</Button>
            <Button variant="outline" size="sm">MONTH</Button>
          </div>
          {/* Calendar content */}
        </CardContent>
      </Card>
      
      {/* Client Relationship Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-[--font-primary] text-[--jovial-jade]">Client Directory</CardTitle>
          <div className="flex items-center gap-2">
            <input 
              type="search" 
              placeholder="Search clients..." 
              className="px-3 py-2 border rounded-md min-h-[--touch-target-min]"
            />
            <Button variant="outline" size="sm">Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          {clients.map(client => (
            <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[--surface-accent] rounded-full flex items-center justify-center">
                  <span className="font-[--font-secondary] text-[--text-primary] text-sm">{client.initials}</span>
                </div>
                <div>
                  <p className="font-[--font-secondary] text-[--text-primary]">{client.name}</p>
                  <Badge variant={client.status === 'Active' ? 'secondary' : 'outline'}>
                    {client.status}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Message</Button>
                <Button variant="outline" size="sm">Schedule</Button>
                <Button variant="outline" size="sm">Profile</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </Container>
</div>
```

### ❌ Bad Flow Implementation
```tsx
// Missing required elements
<div>
  <h1>Select Your Goals</h1>
  <button className="p-2">Goal 1</button> {/* Too small touch target */}
  <button>Continue</button> {/* No styling, no container */}
</div>
```

## Key Rules
- **Every screen must maintain flow continuity** with navigation and progress indicators
- **All interactive elements must meet accessibility standards** (44px minimum touch targets)
- **Container wrapper is mandatory** for consistent spacing and responsive design
- **Typography hierarchy must be consistent** across all flows
- **Color system must be applied consistently** for brand recognition
- **Responsive design must work** across all breakpoints
- **Focus indicators are required** for keyboard navigation
- **Progress indicators are mandatory** for multi-step flows