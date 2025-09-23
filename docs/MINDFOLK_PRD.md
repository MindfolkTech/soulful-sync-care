# Complete MindFolk PRD - Master Document

# *Master compilation reflecting current implementation - Last updated: September 2024*

---

# **Section 1: Vision & Success Metrics**

## **Problem Statement**

Finding a compatible therapist requires expensive trial-and-error, with people trying 6-12 therapists on average before finding the right fit. 57% give up entirely after initial attempts. Current platforms focus on credentials and availability rather than personality compatibility - the primary research-validated predictor of therapy success.

## **Product Vision**

[CHANGED] Mindfolk enables personality-first therapy matching through comprehensive therapist profiles that include therapist introductory videos, and a weighted matching algorithm. Clients can browse and filter therapists based on their assessment preferences before booking sessions, while therapists maintain full control over rates, availability, and practice policies.

## **Core User Value**

**For Clients**: Reduce time-to-match from 3-6 weeks to 3-7 days through personality-first discovery
**For Therapists**: Attract compatible clients and control practice autonomy (rates, policies, scheduling)

## **Success Metrics**

### **Client Success**

- [CHANGED] Time to first session booking: <7 days average
- [CHANGED] Direct booking to session completion: >70%
- 6-month client retention: >65%
- Client satisfaction (NPS): >40

### **Therapist Success**

- [CHANGED] Profile completion: >85%
- Monthly active therapists: 500 (12 months)
- Average monthly earnings: £1,800+
- Monthly churn rate: <8%

### **Platform Health**

- Session completion rate: >85%
- Monthly active users: 20,000 (12 months)
- Revenue growth: 25% month-over-month
- Customer acquisition cost: <£25 (client), <£150 (therapist)

## **Competitive Differentiation**

**vs BetterHelp**: Pay-per-session vs mandatory subscription; therapist rate control vs fixed £18/hour
**vs Counselling Directory**: [CHANGED] Personality-based matching algorithm vs simple directory listing; integrated platform vs referral-only
**vs NHS**: [CHANGED] 7-day access vs 18-week waiting lists; client choice vs assigned matching

---

# **Section 2: User Personas & Problems**

## **Primary User Groups**

### **Therapists** (Platform Supply Side)

- **Demographics**: Ages 25-34 (0-5 years experience) and 55-65+ (11-20+ years experience), UK-based
- **Core Problem**: Inability to attract compatible clients leads to high churn and income instability

### **Therapy Seekers** (Platform Demand Side)

- **Demographics**: Ages 25-44, primarily female, UK-based
- **Core Problem**: Trial-and-error process to find compatible therapists is expensive, time-consuming, and mentally exhausting

## **Therapist Personas**

### **Persona T1: Early-Career Identity-Focused Therapist**

**Profile**: 25-year-old female, Indian descent, Clinical Doctorate graduate
**Current Situation**:

- Recently joined Counselling Directory and Psychology Today
- Experiencing high client dropout after 1-2 sessions
- Passionate about serving young people and minority communities

**Pain Points**:

- Cannot express cultural competency or personal identity in static profiles
- Struggles to differentiate from other therapists
- Clients "ghost" after initial sessions due to poor compatibility screening
- Feels unable to make meaningful impact due to constant client turnover

**Success Criteria**:

- Attract clients who value cultural understanding and age similarity
- Reduce client dropout rate from 70% to <30% after first session
- Build consistent client base within specialty areas
- Express authentic personality and approach to stand out

### **Persona T2: Career-Changer Seeking Income Stability**

**Profile**: 31-year-old male, career transition from corporate sector
**Current Situation**:

- Previously used BetterHelp with fixed $18/hour rate
- Has family and mortgage requiring consistent income
- Frustrated by lack of control over rates and policies

**Pain Points**:

- Cannot set own rates, availability, or cancellation policies
- Low, fixed income ceiling regardless of experience or demand
- No payment for cancelled sessions
- Dehumanizing platform experience with high client volume pressure

**Success Criteria**:

- Control own pricing structure and policies
- Achieve £2,000+ monthly income within 6 months
- Build sustainable practice with manageable client load
- Establish professional autonomy and work-life balance

### **Persona T3: NHS Transitioning to Private Practice**

**Profile**: 55-year-old female, 20+ years NHS experience
**Current Situation**:

- Works 3 days/week NHS, seeking private clients for remaining time
- Limited availability requires remote session delivery
- Needs efficient client acquisition without physical office overhead

**Pain Points**:

- Limited time for client acquisition and vetting
- Cannot justify physical office costs with part-time availability
- Needs efficient way to fill specific time slots
- Requires clients who value experience and fit her schedule constraints

**Success Criteria**:

- Fill available time slots with compatible, committed clients
- Conduct all sessions remotely without technology barriers
- Leverage NHS experience to command premium rates
- Maintain work-life balance approaching retirement

## **Client Personas**

### **Persona C1: Busy Professional Seeking Cultural Understanding**

**Profile**: 41-year-old Black Caribbean female, working mother
**Current Situation**:

- Previously tried therapy multiple times unsuccessfully
- Balancing demanding job with family responsibilities
- Mental health declining but lacks time for extensive therapist search

**Pain Points**:

- Previous therapists lacked understanding of cultural and racial barriers
- Trial-and-error process too time-consuming for busy schedule
- Repeated re-explaining of background to new therapists is exhausting
- Difficulty finding therapists who understand intersectional identity challenges

**Success Criteria**:

- Find culturally competent therapist within one week
- Assess therapist understanding before first paid session
- Flexible scheduling that accommodates work and family demands
- Avoid repeated unsuccessful therapy attempts

### **Persona C2: First-Time Therapy Seeker Needing LGBTQ+ Affirmation**

**Profile**: 26-year-old gay male, new to therapy
**Current Situation**:

- Recently came out to family with negative responses
- Anxious about first therapy experience
- Prefers remote sessions from home comfort

**Pain Points**:

- Uncertainty about therapist LGBTQ+ friendliness before booking
- Anxiety about initial therapy contact and explanation
- Fear of judgment or lack of understanding from therapist
- Preference for home-based sessions for comfort and privacy

**Success Criteria**:

- Verify LGBTQ+ affirmative approach before first contact
- Assess therapist warmth and personality in advance
- Access therapy from home environment
- Find therapist experienced with coming-out family dynamics

### **Persona C3: Neurodivergent Individual Seeking Understanding**

**Profile**: 21-year-old autistic female
**Current Situation**:

- Previous negative therapy experience with judgment about sensory needs
- Withdrew from therapy after feeling misunderstood
- Friends and family encouraging return to therapy

**Pain Points**:

- Fear of therapist judgment about neurodivergent needs
- High risk of misunderstanding due to communication differences
- Sensory considerations not accommodated in previous experience
- Anxiety about explaining autism-related requirements repeatedly

**Success Criteria**:

- Identify neurodiversity-affirming therapists before booking
- Assess therapist kindness and openness in advance
- Find therapist experienced with autism spectrum support
- Avoid re-traumatizing therapy experiences

## **Key User Needs Summary**

### **All Therapists Need**:

- Control over rates, availability, and policies
- Ability to express personality and approach authentically
- Efficient client acquisition with pre-qualified compatibility
- Reduced client churn through better initial matching

### **All Clients Need**:

- Assessment of therapist personality and values before commitment
- Confidence in therapist understanding of their specific identity/needs
- Efficient compatibility screening without multiple failed attempts
- Flexible access that fits their lifestyle and comfort preferences

### **Shared Platform Needs**:

- Trust and safety in video-based interactions
- Simple, accessible technology that doesn't create barriers
- Clear pricing and policies with no hidden costs
- Reliable scheduling and session management

---

# **Section 3: Core Use Cases & Flows**

## **Primary User Journeys**

Mindfolk has two core user journeys with distinct flow patterns and requirements.

## **Client Journey: Assessment-First Discovery**

### **Flow 1: Client Onboarding & Assessment**

[CHANGED] **Duration**: 5–7 minutes | **Conversion Goal**: 85% completion to discovery

### **Steps:**

[CHANGED] **1. Account Creation**

- Email and password signup via Supabase Auth
- Role selection defaulting to 'client'
- Email verification process

[CHANGED] **2. Assessment Flow**

- Communication preferences selection (empathetic, warm, structured, etc.)
- Language preferences (from taxonomy table)
- Identity preferences (LGBTQ+ affirming, culturally sensitive, etc.)
- Therapy goals (anxiety, depression, relationships, etc.)
- Therapy modalities preference (CBT, mindfulness, etc.)
- Budget range selection
- Optional demographics (age group, cultural background)
- Preferred session times

[CHANGED] **3. Discovery Introduction**

- Introduction to therapist browsing
- Explanation of matching algorithm
- Direct progression to discovery page

### **Acceptance Criteria:**

- **Typography**: Headings use `var(--font-primary)`. Body text and UI labels use `var(--font-secondary)`
- **Touch targets**: minimum `var(--touch-target-min)` (44px) height, `var(--touch-target-comfort)` (56px) for primary actions
- **Progress bar**: `var(--garden-green)` with smooth 300ms ease-in-out transitions
- **Container**: All content wrapped in `<Container>` component with responsive padding
- **Card padding**: `p-4 md:p-5 lg:p-6` for option cards
- Users can return to previous steps without data loss
- Skip option available at each step but completion encouraged
- Assessment data stored for matching algorithm

### **Flow 2: Therapist Discovery & Direct Booking**

[CHANGED] **Duration**: 5–15 minutes | **Conversion Goal**: 40% direct booking

### **Steps:**

[CHANGED] **1. Discovery Interface**

- **Mobile**: Card-based therapist profiles with scroll navigation
- **Desktop**: Grid view with filtering sidebar
- **No video profiles**: Text-based profiles with optional photos
- **Profile actions**:
    - Favorite = Heart icon to save for later
    - View Details = Navigate to full profile
    - Book Now = Direct booking action

[CHANGED] **2. Therapist Profile Detail View**

- **Profile photo**: Static image (no video)
- **Bio section**: Professional background and approach
- **Tag system** (implemented with 5 categories):
    - Personality tags
    - Modality tags
    - Specialty tags
    - Language tags
    - Identity/Misc tags
- **Availability**: Calendar view of available slots
- **Rates**: Session pricing clearly displayed

[CHANGED] **3. Direct Session Booking**

- **Calendar integration**: Available session slots displayed
- **Session types**: 30/60/90 minute options
- **Primary CTA**: "Book Session" (no chemistry calls)
- **Secondary CTA**: "Add to Favorites"

### **Acceptance Criteria:**

- **Typography**: Therapist names and quotes use `var(--font-primary)`. All other text uses `var(--font-secondary)`
- **Touch targets**: All interactive elements minimum `var(--touch-target-min)` (44px)
- **Swipe animation**: Smooth gesture response with visual feedback
- **Video controls**: Custom styled to match design system
- **Tag styling**: Consistent with 5-category system, 16px border-radius
- **Container**: All content sections use `<Container>` wrapper
- **Responsive behavior**: Mobile-first with progressive enhancement
- **Loading states**: Skeleton screens during content fetch
- Undo functionality for accidental swipes
- Offline capability for recently viewed profiles

## **Therapist Journey: Practice Building & Client Management**

### **Flow 3: Therapist Profile Creation**

[CHANGED] **Duration**: 20–30 minutes | **Conversion Goal**: 90% profile completion

### **Steps:**

[CHANGED] **1. Professional Information**

- Professional body membership selection (BACP, UKCP, HCPC, etc.)
- Years of experience
- Specializations and modalities selection from taxonomy tables
- Rate setting (per session)

[CHANGED] **2. Profile Creation**

- Text-based bio and approach description
- Personality tags selection
- Identity tags (LGBTQ+ friendly, culturally sensitive, etc.)
- Languages spoken

[CHANGED] **3. Availability & Policies**

- Weekly availability schedule setup
- Session duration preferences
- Cancellation policy text
- Accepting new clients toggle

### **Acceptance Criteria:**

- **Typography**: Form labels use `var(--font-secondary)`. Section headings use `var(--font-primary)`
- **Form styling**: Input fields with `var(--border)` borders, `var(--surface)` backgrounds
- **Upload interface**: Drag-and-drop with progress indicators
- **Tag selection**: Multi-select interface matching client-side tag system
- **Container**: All form sections wrapped in `<Container>`
- **Touch targets**: All form controls minimum `var(--touch-target-min)` (44px)
- [CHANGED] Profile data validation
- Profile preview before publishing
- [CHANGED] SetupGuard enforcement for onboarding completion

### **Flow 4: Session Management & Client Communication**

[CHANGED] **Duration**: Ongoing | **Success Goal**: <5 minutes per session setup

### **Steps:**

[CHANGED] **1. Session Booking Management**

- View upcoming appointments on dashboard
- Client information review
- Session preparation notes

[CHANGED] **2. Session Administration**

- Calendar view of all appointments
- Session status tracking (scheduled, completed, cancelled, no-show)
- Client session notes management

[CHANGED] **3. Client Management**

- Client directory with search and filtering
- Individual client profiles and history
- Session notes and progress tracking

### **Acceptance Criteria:**

- **Typography**: Client names and session titles use `var(--font-primary)`. Interface text uses `var(--font-secondary)`
- **Dashboard layout**: Card-based interface with `var(--surface)` backgrounds
- **Status indicators**: Clear visual hierarchy with appropriate colors
- **Container**: Dashboard sections use `<Container>` for consistent spacing
- **Touch targets**: All controls minimum `var(--touch-target-comfort)` (56px) for efficiency
- Session state persistence across page refreshes
- Emergency contact protocols integration
- Automated session recordings (with consent)

## **Platform Integration Flows**

### **Flow 5: Cross-Platform Communication**

*Recommended implementation for this aspect based on the existing codebase: Implement secure messaging using Supabase Realtime subscriptions with RLS policies for data isolation. Start with basic text messaging between matched client-therapist pairs, then expand to file sharing and rich media.*

**Duration**: Real-time | **Reliability Goal**: 99.9% message delivery

### **Features:**

**1. Secure Messaging System**

- End-to-end encrypted chat between matched pairs
- Message status indicators (sent, delivered, read)
- File sharing with healthcare compliance

**2. Notification Management**

*Recommended implementation for this aspect based on the existing codebase: Use Supabase Edge Functions to trigger email notifications via Resend API, with notification preferences stored in user profiles table.*

- Customizable notification preferences
- Multi-channel delivery (email, SMS, push)
- Quiet hours and emergency override settings

### **Acceptance Criteria:**

- **Typography**: Message content uses `var(--font-secondary)`. Sender names use `var(--font-primary)`
- **Message styling**: Sent messages `var(--garden-green)` background, received `var(--surface)` background
- **Container**: Chat interface uses full-width with internal `<Container>` for max-width
- **Touch targets**: Send button and attachment controls `var(--touch-target-comfort)` (56px)
- **System messages**: `var(--text-muted)` color for timestamps and status
- GDPR-compliant message retention
- Professional boundary enforcement
- Crisis intervention keyword detection

## **Responsive Design Implementation**

### **Mobile-First Approach (320px-767px)**

- **Single column layouts** for optimal scrolling
- **Bottom navigation** for thumb-friendly access
- **Full-screen video** profiles for immersive experience
- **Container padding**: `px-6` for comfortable content margins

### **Tablet Optimization (768px-1023px)**

- **Two-column grids** for assessment questions
- **Sidebar navigation** introduction
- **Enhanced video controls** with more detail
- **Container padding**: `px-8` for balanced spacing

### **Desktop Enhancement (1024px+)**

- **Multi-panel layouts** for discovery interface
- **Detailed therapist profiles** with expanded information
- **Keyboard navigation** support throughout
- **Container padding**: `px-10` for optimal reading width

### **Universal Design Elements**

- **Color hierarchy**: Primary (`var(--jovial-jade)`), interactive (`var(--garden-green)`), accents (`var(--playful-peach)`)
- **Background system**: App (`var(--warm-white)`), cards (`var(--surface)`), selected states (`var(--surface-accent)`)
- **Typography scale**: Responsive clamp() functions for all text sizes
- **Spacing consistency**: `var(--space-*)` tokens for all layout spacing
- **Border radius**: 8px standard, 16px for tags, 50% for avatars
- **Shadow system**: `shadow-md` for elevated elements

---

# **Section 4: Feature Breakdown**

## **MVP Features (Launch Critical)**

### **Client Core Features**

| Feature | Description | Priority | Acceptance Criteria |
| --- | --- | --- | --- |
| [CHANGED] **Assessment Flow** | Basic personality questionnaire with preferences | P0 | 85% completion rate, 5–7 min duration; Communication preferences, therapy goals, modalities, budget, demographics; Data stored in `client_assessments` table; Supabase Auth integration |
| [CHANGED] **Therapist Discovery** | Browse therapists with filtering and matching | P0 | Grid/list view with filters; 5-category tag system; Matching algorithm implementation; Favorites functionality; No video profiles |
| **Chemistry Call Booking** | Multi-session booking with calendar integration | P0 | 15-min free calls + 30/60-min paid options; Native calendar picker with month navigation; Session type selection, recurring options; Additional comments field; Payment method selection; Appointment confirmation with security assurances |
| [CHANGED] **Direct Booking** | Book sessions without chemistry calls | P0 | Calendar integration UI; Session type selection (30/60/90 min); Appointment creation in database; No payment processing |
| **Session Management** | Complete appointment lifecycle | P0 | Dashboard with Today/Upcoming/Past sections; "In X days (/hours/minutes)" countdown that switches to a "JOIN NOW" button 5 minutes before appointment time; Session reminders with tiering notifications; Live video interface with chat panel; Post-call feedback collection after chemistry call (confidential); Post-session testimonial option (after verification) |
| [CHANGED] **Favorites** | Save therapists for later | P0 | Favorites page implemented; Add/remove functionality; Direct booking from favorites |

*Recommended implementation for Session Management based on the existing codebase: The appointments page and database structure exist. Add a countdown timer component using React hooks. Implement reminder notifications via Supabase Edge Functions with Resend/Twilio. For post-call feedback, create a feedback form component that appears after session end time. Store feedback in a new `session_feedback` table. The session room UI is ready for Daily.co integration.*
| **Favorites & Communication** | Enhanced therapist management | P0 | Dedicated favorites screen with search; Upcoming appointments indicator; "BOOK NOW" button within search ("Book Free Chemistry Call" AND "Book Therapy Session" if the user has not previously had a chemistry call that has taken place with that therapist previous, otherwise just "Book Therapy Session"); Notifications system (forms, summaries, homework); File attachments and sharing |
| **Payment Processing** | Pay-per-session with transparent pricing | P0 | Stripe integration for client to pay the rate set by the therapist, with 15% of that going to Mindfolk as a commission and 85% to therapist; Multiple payment methods; Automated receipts; Refund/dispute handling; Session-based billing |
| **Account Management** | Profile and preferences | P0 | Email verification, secure authentication; Notification settings; Document preferences; Data privacy management; Photo upload; Help centre and FAQs, customer support ticketing |

*Recommended implementation for Favorites & Communication based on the existing codebase: The favorites functionality is partially implemented. Enhance the existing favorites page to show upcoming appointments by joining with appointments table. Add conditional booking buttons based on past chemistry call history. For notifications, create a `notifications` table and use Supabase Realtime for push updates. File attachments can use Supabase Storage with proper RLS policies.*

*Recommended implementation for Account Management based on the existing codebase: Email verification is handled by Supabase Auth. Extend the settings page to include notification preferences (stored in profiles table). Add document upload using Supabase Storage. Create a help center page with FAQ content. The support ticketing system table structure exists (`support_tickets`) but needs UI implementation.*

*Recommended implementation for Chemistry Call Booking based on the existing codebase: Extend the existing appointment booking system to add a chemistry call type with 15-minute duration limit. Use the current calendar UI and appointment creation flow, but add logic to make these calls free and track conversion to paid sessions. The database structure already supports different appointment types.*

*Recommended implementation for Payment Processing based on the existing codebase: The payment form UI components already exist at `/src/components/payment/`. Integrate Stripe using Supabase Edge Functions for secure server-side processing. Use the existing session_earnings table to track therapist payouts and platform fees. Add webhook handlers for payment events.*

### **Therapist Core Features**

| Feature | Description | Priority | Acceptance Criteria |
| --- | --- | --- | --- |
| **Enhanced Dashboard** | Comprehensive practice overview | P0 | Welcome message with personalized greeting; Upcoming appointments widget with countdown as client countdown (each "JOIN NOW" button 10 minutes before start time); Client dashboard with Active/Inactive status; Income detail with appointment breakdown; Business profile updates |
| **Calendar Management** | Advanced scheduling system | P0 | Google/Outlook integration buttons; List/Calendar view toggle; TODAY/WEEK/MONTH filters; Appointment details with full details; Color-coding from calendar; Session reminders with tiering - Must research best practice for event calendars across desktop, tablet and mobile, using shadcn/ui where possible and flexbox/grid |
| **Client Relationship Management** | Complete client portfolio system | P0 | Client directory with search/filtering; Status management (Active, Awaiting, Prospective, etc.); Match percentage to click on client to open individual client file; Individual client file holds Session notes with templates; Scoring metrics for that client and progress tracking |
| **Session Notes & Documentation** | Clinical documentation system | P1 | Add New Summary with search; Date/time stamps; Past appointment notes with filtering; Assessment tracking (GAD-7, PHQ-9 scales); Progress visualization; Communication workflow |
| **Analytics & Business Intelligence** | Performance metrics dashboard | P0 | Key metrics: profile views, sessions booked, favorites, rating; Profile views growth chart; Cancellation analytics (happened/cancelled/rescheduled); Income tracking with trends; Ways to improve section |

*Recommended implementation for Enhanced Dashboard based on the existing codebase: The dashboard page with widgets exists. Add personalized greeting using profile data. Create countdown timer component similar to client side. Use existing appointments table to show upcoming sessions. Add income calculations using session_earnings table.*

*Recommended implementation for Calendar Management based on the existing codebase: The calendar page exists. Add OAuth2 integration for Google Calendar API and Microsoft Graph API. Store tokens in encrypted format in profiles table. Use existing availability system as base. Add color-coding by mapping appointment types to colors. Research and implement shadcn/ui calendar components.*

*Recommended implementation for Client Relationship Management based on the existing codebase: The clients page exists. Extend with status field in a new client_relationships table. Calculate match percentage using existing matching algorithm in reverse. Create client file pages with tabs for different sections. Store session notes in existing client_session_notes table with template support.*

*Recommended implementation for Session Notes & Documentation based on the existing codebase: Notes UI exists. Add standardized assessment forms (GAD-7, PHQ-9) as React components. Store scores in JSONB field in client_session_notes. Use existing charting library for progress visualization. Add template system for common note types.*

*Recommended implementation for Analytics & Business Intelligence based on the existing codebase: Business page with charts exists but uses mock data. Connect to real data: profile views from analytics events, sessions from appointments table, favorites from favorites table, ratings from reviews/feedback. Calculate income from session_earnings. Add trend analysis using date ranges.*

*Recommended implementation for Calendar Integration based on the existing codebase: Use OAuth2 flows for Google Calendar and Microsoft Graph API for Outlook. Store tokens securely in Supabase. Create Edge Functions to handle sync operations. The existing availability system can be extended to check external calendars.*

*Recommended implementation for Clinical Documentation based on the existing codebase: Add standardized assessment forms as React components. Store scores in the existing client_session_notes table with a structured JSONB field. Use the existing charting library to visualize progress over time.*

*Recommended implementation for Video Profile Creation based on the existing codebase: Use browser MediaRecorder API for recording. Upload to Supabase Storage with size limits. Add video preview component similar to existing session room UI. Store video URL in therapist_profiles table which already has the field defined.*

### **Admin Core Features**

| Feature | Description | Priority | Acceptance Criteria |
| --- | --- | --- | --- |
| **User Impersonation System** | Safe UX testing and support | P0 | Search users by name/email/role; Masquerade mode with preview tokens; Read-only mode (not-only by default); Clear elevation controls; Full audit trail |
| **User & Therapist Management** | Account lifecycle management | P0 | Directory with search/filter; Role change actions (suspend, restore, delete); Profile timeline with auth events; GDPR compliance tools; Bulk operations |
| **Verification Queue** | Therapist approval workflow | P0 | Document previews with auto-signals; Approve/reject with mandatory reasons; Request more info option; Template notifications; Decision audit trail |
| **Content Moderation** | Safety and compliance | P0 | Content booking details scan; Appeal process and compliance tracking; Moderation inbox by type/severity; Media preview panels; Policy reference system; Remove/escalate actions; Appeal process |
| **Platform Analytics** | System-wide insights | P0 | Uptime monitoring; Active sessions tracking; Moderation backlogs; User growth metrics; Revenue analytics |

*Recommended implementation for User Impersonation System based on the existing codebase: The impersonation context provider exists. Add audit logging to track all impersonation sessions. Implement read-only mode by modifying the context to prevent write operations. Add search functionality using existing user search patterns. Create audit trail table for compliance.*

*Recommended implementation for User & Therapist Management based on the existing codebase: Users and therapists pages exist. Add role change actions using Supabase Auth admin API. Implement soft delete with status field. Add GDPR export using database queries. Create bulk operations UI with checkbox selection pattern.*

*Recommended implementation for Verification Queue based on the existing codebase: Basic approval workflow exists. Add document preview using Supabase Storage URLs. Create notification templates in Edge Functions. Add decision reasons field to therapist_applications table. Implement audit trail for all verification decisions.*

*Recommended implementation for Content Moderation based on the existing codebase: Moderation page UI exists. Create moderation_queue table for flagged content. Add content scanning using keyword detection. Implement appeal process with status tracking. Add policy reference documentation page.*

*Recommended implementation for Platform Analytics based on the existing codebase: Overview page with KPI cards exists. Connect to real data sources: uptime from health checks, active sessions from auth, user growth from profiles table, revenue from session_earnings. Add time-series charts using existing charting library.*

### **Platform Core Features**

| Feature | Description | Priority | Acceptance Criteria |
| --- | --- | --- | --- |
| **Video Session Infrastructure** | [Daily.co](http://Daily.co) WebRTC implementation | P0 | Mobile: 8% header, 80% video, 12% controls; Tablet: 60/40 split; Desktop: 65/35 split; PiP self-view; Encrypted chat panel; Recording consent workflow |
| **Payment Infrastructure** | Stripe Connect financial system | P0 | Multi-payment methods; Weekly therapist payouts; 15% platform fee calculation; Subscription billing (£19.50/month); Tax document generation |

*Recommended implementation for Video Session Infrastructure based on the existing codebase: Integrate Daily.co using the existing session room UI at `/src/pages/session/SessionRoom.tsx`. Create Supabase Edge Functions to generate secure room tokens. Use the existing appointments table to trigger session creation and track attendance. The UI components are already in place with mock functionality.*

*Recommended implementation for Payment Infrastructure based on the existing codebase: Integrate Stripe using the existing payment form UI components at `/src/components/payment/`. Create Supabase Edge Functions for server-side payment processing. Use the existing session_earnings table structure to track therapist earnings and platform fees. The database schema already supports financial tracking.*

## **Responsive Implementation Standards**

**Discovery Interface:**

- Mobile: Single-column cards with bottom navigation
- Tablet Portrait: Container max-width 720px with larger typography
- Tablet Landscape: 60/40 split (list/detail)
- Desktop: 40–45% list, 55–60% detail pane

**Session Interface:**

- Mobile: PageShell with bg-text-dark, no bottom nav during session
- Tablet: Split view with Flexbox inside grid
- Desktop: Video-first with expandable side panels

**Admin Interface:**

- Mobile: Stacked cards with sticky action bars
- Tablet: 40/60 split panes
- Desktop: 20/55/25 sidebar/main/detail layout

## **Tag System Implementation (5-Category Semantic)**

1. **Personality**: `var(--tag-personality-bg)` / `var(--tag-personality-text)`
2. **Modality**: `var(--tag-modality-bg)` / `var(--tag-modality-text)`
3. **Specialty**: `var(--tag-specialty-bg)` / `var(--tag-specialty-text)`
4. **Language**: `var(--tag-language-bg)` / `var(--tag-language-text)`
5. **Misc/Identity**: `var(--tag-misc-bg)` / `var(--tag-misc-text)`

**Implementation Requirements:**

- Border-radius: 16px for all tags
- Touch targets: `var(--touch-target-min)`
- Typography: `var(--font-secondary)`

## **[CHANGED] Current Integration Status**

| System | Purpose | Implementation Status |
| --- | --- | --- |
| [**Daily.co**](http://Daily.co) | Live video sessions | *Not integrated - UI ready* |
| **Cloudflare Stream** | Profile video hosting | *Not integrated* |
| **Stripe Connect** | Payment processing | *Not integrated - Payment form UI exists* |
| **[CHANGED] Supabase Auth** | Authentication | **Implemented** - JWT tokens, role-based access |
| **Supabase** | Backend infrastructure | **Implemented** - RLS policies, database, storage |
| **PostHog** | Analytics | *Not integrated* |
| **Resend** | Email delivery | *Not integrated* |
| **Twilio** | SMS notifications | *Not integrated* |

*Recommended implementation for Daily.co integration based on the existing codebase: The session room UI components are ready. Install @daily-co/daily-js SDK. Create Edge Function to generate room tokens with proper expiry. Update SessionRoom component to initialize Daily client. Add device selection UI using existing form components.*

*Recommended implementation for Cloudflare Stream based on the existing codebase: Use for hosting therapist intro videos. Configure Cloudflare Stream API. Upload videos from the existing upload UI to Cloudflare. Store video URLs in therapist_profiles table. Add video player component with streaming optimization.*

*Recommended implementation for Stripe Connect based on the existing codebase: Payment form UI exists. Setup Stripe Connect onboarding for therapists. Create Edge Functions for payment processing. Use webhooks to update session_earnings table. Implement weekly payout scheduling. Add invoice generation for tax compliance.*

*Recommended implementation for PostHog analytics based on the existing codebase: Install PostHog JS SDK. Configure privacy-compliant tracking. Create custom events for key actions (booking, matching, conversion). Build dashboards for product metrics. Export data to existing analytics pages.*

*Recommended implementation for Resend email integration based on the existing codebase: Create Edge Functions for email sending. Design email templates matching brand. Setup triggers for key events (booking confirmation, reminders). Add unsubscribe management. Track email metrics.*

*Recommended implementation for Twilio SMS based on the existing codebase: Setup Twilio account with UK phone numbers. Create Edge Functions for SMS sending. Implement appointment reminders. Add opt-in/opt-out management. Handle international number formatting.*

## **Post-MVP Roadmap (3–6 Months)**

**Enhanced Features:**

- Group therapy sessions
- Advanced progress tracking with standardized assessments
- AI-powered matching algorithm improvements
- Mobile app development
- International expansion (EU/US markets)
- Insurance integration pilot
- Therapist continuing education platform

---

# **Section 5: Technical Specifications**

*Optimized for Lovable/Cursor + Tailwind + shadcn/ui Implementation*

## **Architecture Overview**

### **[CHANGED] Current Technology Stack**

```
Frontend: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui
Backend: Supabase (Auth, Database, Storage, Edge Functions)
Video: Not integrated (UI components ready)
Payments: Not integrated (UI components ready)
Deployment: Development environment
Storage: Supabase Storage
Analytics: Not integrated
Testing: Vitest + Playwright + Storybook + Chromatic
```

### **Project Structure (Lovable/Cursor Friendly)**

```
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── layout/       # Container, Stack, HStack atoms
│   ├── therapy/      # TherapistCard, VideoPlayer, Assessment
│   ├── admin/        # Admin dashboard components
│   └── forms/        # Booking, onboarding components
├── pages/           # Next.js pages or React Router
├── lib/             # Utilities, API calls, types
├── hooks/           # Custom React hooks
├── stores/          # Zustand state management
└── styles/          # Global CSS, Tailwind config
```

## **Core Data Models**

### **[CHANGED] Implemented Data Models**

#### **User Management**

```sql
-- Core user table
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  user_type text check (user_type in ('client', 'therapist', 'admin')),
  first_name text,
  last_name text,
  role text check (role in ('client', 'therapist', 'admin')),
  phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  is_active boolean default true
);

-- Profiles table (implemented)
create table profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  user_type text check (user_type in ('client', 'therapist', 'admin')),
  first_name text,
  last_name text,
  role text check (role in ('client', 'therapist', 'admin')),
  phone text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Client assessments (implemented)
create table client_assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  communication_preferences text[],
  language_preferences text[],
  identity_preferences text[],
  therapy_goals text[],
  therapy_modalities text[],
  budget_range integer[],
  age_group text,
  preferred_times text[],
  created_at timestamp with time zone default now()
);

-- Therapist profiles (implemented)
create table therapist_profiles (
  user_id uuid primary key,
  bio text,
  specialties text[],
  modalities text[],
  personality_tags text[],
  identity_tags text[],
  languages text[],
  hourly_rate decimal,
  session_rates jsonb,
  availability jsonb,
  is_verified boolean default false,
  is_active boolean default false,
  accepting_new_clients boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

*Current implementation status for User Management: The profiles and client_assessments tables are fully implemented and working correctly with the frontend. The user_id field properly references Supabase Auth users. RLS policies ensure data security. The user type is determined from auth metadata.*

### **Assessment & Matching**

```sql
-- Assessment questions (seeded data)
create table assessment_questions (
  id text primary key, -- 'therapy_goals', 'communication_style', etc.
  category text not null, -- 'goals', 'preferences', 'identity'
  question_text text not null,
  question_type text not null, -- 'multiple_choice', 'multi_select', 'scale'
  options jsonb, -- [{value: 'anxiety', label: 'Anxiety and worry'}]
  order_index integer not null,
  is_active boolean default true
);

-- User assessment responses
create table assessment_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  question_id text references assessment_questions(id),
  response jsonb not null, -- Flexible response format
  completed_at timestamp with time zone default now()
);

-- Matching algorithm results
create table therapist_matches (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references users(id),
  therapist_id uuid references users(id),
  compatibility_score integer, -- 0-100
  matching_factors jsonb, -- Breakdown of why they match
  created_at timestamp with time zone default now()
);

*Current implementation status for Assessment & Matching: The assessment questions are seeded in the database. Assessment responses are stored when users complete the questionnaire. The matching algorithm is fully implemented in TypeScript, calculating compatibility scores based on weighted factors (personality 40%, identity 20%, specialties 20%, modalities 15%, availability 5%). The therapist_matches table is not currently used - matches are calculated on-demand.*

*Recommended implementation: Store match results in therapist_matches table for performance. Add caching layer for frequently accessed matches. Create background job to update scores when profiles change.*

### **Booking & Sessions**

```sql
-- Chemistry calls (free 15-min sessions)
create table chemistry_calls (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references users(id),
  therapist_id uuid references users(id),
  scheduled_at timestamp with time zone not null,
  duration_minutes integer default 15,
  status text default 'scheduled', -- scheduled, completed, cancelled, no_show
  room_url text, -- [Daily.co](http://Daily.co) room URL
  client_joined_at timestamp with time zone,
  therapist_joined_at timestamp with time zone,
  ended_at timestamp with time zone,
  client_feedback jsonb,
  therapist_feedback jsonb,
  created_at timestamp with time zone default now()
);

-- Full therapy sessions
create table therapy_sessions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references users(id),
  therapist_id uuid references users(id),
  chemistry_call_id uuid references chemistry_calls(id),
  scheduled_at timestamp with time zone not null,
  duration_minutes integer not null, -- 30, 60, 90
  rate_per_session integer not null, -- in pence, snapshot of therapist rate
  status text default 'scheduled', -- scheduled, completed, cancelled, no_show
  room_url text,
  session_notes text, -- Therapist's private notes
  client_homework text,
  payment_intent_id text, -- Stripe PaymentIntent ID
  payment_status text default 'pending', -- pending, paid, refunded, disputed
  created_at timestamp with time zone default now()
);

-- User favorites
create table user_favorites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references users(id),
  therapist_id uuid references users(id),
  created_at timestamp with time zone default now(),
  unique(client_id, therapist_id)
);

*Current implementation status for Booking & Sessions: The appointments table is implemented instead of separate chemistry_calls and therapy_sessions tables. Bookings are created and managed through the UI. Payment integration is not implemented. Daily.co integration for video sessions is not implemented. The favorites table is fully functional.*

*Recommended implementation: Migrate to separate chemistry_calls and therapy_sessions tables for better data modeling. Add payment processing with Stripe. Integrate Daily.co for video sessions. Add session notes functionality for therapists.*

### **Communication & Support**

```sql
-- Support tickets
create table support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  category text not null, -- technical, billing, safety, general
  priority text default 'medium', -- low, medium, high, urgent
  status text default 'open', -- open, in_progress, waiting_user, resolved
  subject text not null,
  description text not null,
  assigned_to uuid references admin_users(id),
  resolution_notes text,
  created_at timestamp with time zone default now(),
  resolved_at timestamp with time zone
);

*Current implementation status for Communication & Support: The support_tickets table exists in the database schema. The messages table is not implemented as messaging is being backlogged. Support ticket UI is not yet implemented.*

*Recommended implementation for Support Tickets: Create support ticket submission form in help center. Add ticket management UI in admin dashboard. Implement email notifications for ticket updates. Add priority escalation rules. Create knowledge base for self-service.*

*Note: In-app messaging between therapists and clients has been backlogged for future implementation. When ready to implement, use Supabase Realtime for live messaging, add encryption for HIPAA compliance, and implement message threading.*

## **API Architecture (Supabase Edge Functions)**

### **Authentication Endpoints**

```tsx
// Built-in Supabase Auth
POST /auth/signup
POST /auth/signin
POST /auth/signout
POST /auth/reset-password
GET  /auth/user

// Custom auth logic
POST /api/auth/complete-profile
POST /api/auth/switch-user-type // Client -> Therapist
```

### **Assessment & Discovery**

```tsx
// Assessment flow
GET  /api/assessment/questions
POST /api/assessment/submit
GET  /api/assessment/results/:userId

// Therapist discovery
GET  /api/therapists/discover
  // Query params: location, specialties, rate_min, rate_max, personality_tags
POST /api/therapists/favorite
DELETE /api/therapists/favorite/:therapistId
GET  /api/therapists/:id/profile
GET  /api/therapists/:id/availability
```

### **Booking & Sessions**

```tsx
// Chemistry calls
POST /api/chemistry-calls/book
  // Body: {therapistId, scheduledAt}
GET  /api/chemistry-calls/:id
POST /api/chemistry-calls/:id/join
  // Returns [Daily.co](http://Daily.co) room token
POST /api/chemistry-calls/:id/feedback

// Therapy sessions
POST /api/sessions/book
  // Body: {therapistId, scheduledAt, durationMinutes}
GET  /api/sessions/:id
POST /api/sessions/:id/join
POST /api/sessions/:id/complete
  // Body: {sessionNotes, clientHomework}
```

### **Payments**

```tsx
// Payment processing
POST /api/payments/setup-intent
  // For saving payment methods
POST /api/payments/create-session-payment
  // Body: {sessionId, paymentMethodId}
POST /api/payments/confirm-payment
GET  /api/payments/history

// Therapist payouts
GET  /api/therapists/earnings
POST /api/therapists/payout-setup
GET  /api/therapists/payout-history
```

### **Communication**

```tsx
// Messaging
GET  /api/messages/conversations
GET  /api/messages/:conversationId
POST /api/messages/send
  // Body: {recipientId, messageText, messageType}
PUT  /api/messages/:messageId/read

// Support
POST /api/support/tickets
GET  /api/support/tickets
PUT  /api/support/tickets/:id
```

## **Matching Algorithm (Edge Function)**

```tsx
interface MatchingCriteria {
  assessmentResponses: AssessmentResponse[];
  filters: {
    location?: { city: string; maxDistance: number };
    specialties?: string[];
    rateRange?: { min: number; max: number };
    identityRequirements?: string[];
    availabilityNeeds?: string[];
  };
}

export async function calculateTherapistMatches(
  clientId: string,
  criteria: MatchingCriteria
): Promise<TherapistMatch[]> {

  // 1. Filter by hard requirements
  const eligibleTherapists = await filterByRequirements(criteria.filters);

  // 2. Calculate compatibility scores
  const scoredMatches = await Promise.all(
    [eligibleTherapists.map](http://eligibleTherapists.map)(async (therapist) => {
      const score = await calculateCompatibilityScore(
        criteria.assessmentResponses,
        therapist
      );

      return {
        therapistId: [therapist.id](http://therapist.id),
        compatibilityScore: score,
        matchingFactors: getMatchingFactors(criteria.assessmentResponses, therapist)
      };
    })
  );

  // 3. Sort by compatibility score and apply diversity
  return applyDiversityRanking(scoredMatches);
}

function calculateCompatibilityScore(
  responses: AssessmentResponse[],
  therapist: TherapistProfile
): number {
  let totalScore = 0;
  let weightSum = 0;

  // Therapy goals alignment (weight: 30%)
  const goalsScore = calculateGoalsAlignment(responses, therapist.specialties);
  totalScore += goalsScore * 30;
  weightSum += 30;

  // Communication style match (weight: 25%)
  const styleScore = calculateStyleMatch(responses, therapist.personalityTags);
  totalScore += styleScore * 25;
  weightSum += 25;

  // Identity-affirming factors (weight: 20%)
  const identityScore = calculateIdentityMatch(responses, therapist.identityTags);
  totalScore += identityScore * 20;
  weightSum += 20;

  // Therapeutic approach preference (weight: 15%)
  const approachScore = calculateApproachMatch(responses, therapist.modalities);
  totalScore += approachScore * 15;
  weightSum += 15;

  // Practical factors: rate, location, availability (weight: 10%)
  const practicalScore = calculatePracticalMatch(responses, therapist);
  totalScore += practicalScore * 10;
  weightSum += 10;

  return Math.round(totalScore / weightSum);
}
```

## **Video Integration**

### **Video Infrastructure ([Daily.co](http://Daily.co))**

```tsx
// Secure video call room creation
export async function createSecureRoom(
  sessionId: string,
  participants: { clientId: string; therapistId: string }
): Promise<{ roomUrl: string; tokens: { client: string; therapist: string } }> {

  // 1. Generate time-limited room
  const roomName = `session-${sessionId}-${[Date.now](http://Date.now)()}`;
  const expiryTime = new Date([Date.now](http://Date.now)() + 2 * 60 * 60 * 1000); // 2 hours

  // 2. Create [Daily.co](http://Daily.co) room with security settings
  const room = await daily.rooms.createRoom({
    name: roomName,
    privacy: 'private',
    properties: {
      exp: Math.floor(expiryTime.getTime() / 1000),
      enable_chat: true,
      enable_screenshare: false,
      enable_recording: 'cloud', // Only with consent
      max_participants: 2,
      start_video_off: false,
      start_audio_off: false,
      owner_only_broadcast: false,
      eject_at_room_exp: true,
      lang: 'en'
    }
  });

  // 3. Generate participant tokens
  const clientToken = daily.rooms.createToken(roomName, {
    user_name: 'Client',
    is_owner: false,
    exp: Math.floor(expiryTime.getTime() / 1000)
  });

  const therapistToken = daily.rooms.createToken(roomName, {
    user_name: 'Therapist',
    is_owner: true,
    exp: Math.floor(expiryTime.getTime() / 1000)
  });

  return {
    roomUrl: room.url,
    tokens: {
      client: clientToken,
      therapist: therapistToken
    }
  };
}
```

## **Component Library Implementation**

### **Core Layout Components**

```tsx
// Layout atoms matching Style Guide 2.1
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`px-6 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Stack({ children, className = "", gap = "gap-4" }: StackProps) {
  return (
    <div className={`flex flex-col ${gap} ${className}`}>
      {children}
    </div>
  );
}

export function HStack({ children, className = "", gap = "gap-4" }: HStackProps) {
  return (
    <div className={`flex flex-row items-center ${gap} ${className}`}>
      {children}
    </div>
  );
}

export function Cluster({ children, className = "" }: ClusterProps) {
  return (
    <div className={`flex flex-row flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
}
```

### **Tag System Implementation**

```tsx
interface TagProps {
  children: React.ReactNode;
  category: 'personality' | 'modality' | 'specialty' | 'language' | 'misc';
  size?: 'sm' | 'md';
  className?: string;
}

const tagStyles = {
  personality: 'bg-tag-personality text-tag-personality-text',
  modality: 'bg-tag-modality text-tag-modality-text',
  specialty: 'bg-tag-specialty text-tag-specialty-text',
  language: 'bg-tag-language text-tag-language-text',
  misc: 'bg-tag-misc text-tag-misc-text'
};

const tagSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm'
};

export function Tag({ children, category = 'misc', size = 'md', className = "" }: TagProps) {
  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${tagStyles[category]}
      ${tagSizes[size]}
      ${className}
    `}>
      {children}
    </span>
  );
}
```

## **Security & Compliance**

### **Data Protection (GDPR/Privacy)**

```sql
-- Row Level Security policies
alter table users enable row level security;
alter table client_profiles enable row level security;
alter table therapist_profiles enable row level security;
alter table messages enable row level security;

-- Users can only access their own data
create policy "Users can only see their own data" on users
  for all using (auth.uid() = id);

-- Therapist profiles - public read, owner write
create policy "Therapist profiles are publicly readable" on therapist_profiles
  for select using (is_active = true);

create policy "Therapists can only edit their own profiles" on therapist_profiles
  for update using (auth.uid() = user_id);

-- Messages - only participants can access
create policy "Users can only see their own messages" on messages
  for all using (
    auth.uid() = sender_id OR
    auth.uid() = recipient_id
  );

-- Chemistry calls - only participants
create policy "Chemistry call participants only" on chemistry_calls
  for all using (
    auth.uid() = client_id OR
    auth.uid() = therapist_id
  );

-- Admin access (requires admin role)
create policy "Admin access for admin users" on therapist_profiles
  for all using (
    exists (
      select 1 from admin_users
      where id = auth.uid()
      and is_active = true
    )
  );
```

## **Performance Requirements**

### **Core Performance Targets**

```tsx
interface PerformanceTargets {
  // Page load times
  firstContentfulPaint: 2000; // ms
  largestContentfulPaint: 4000; // ms
  timeToInteractive: 3000; // ms

  // Video performance
  videoFirstFrame: 2000; // ms
  chemistryCallConnection: 3000; // ms
  videoUploadMaxSize: 52428800; // 50MB

  // User interactions
  swipeResponseTime: 100; // ms
  searchResponseTime: 500; // ms
  bookingConfirmation: 1000; // ms

  // Bundle size
  initialBundleSize: 512000; // 500KB
  totalAssetSize: 2097152; // 2MB
}
```

## **Deployment & Infrastructure**

### **Environment Configuration**

```bash
# Production Environment Variables
NEXT_PUBLIC_SUPABASE_URL=[your-project.supabase.co](http://your-project.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Video calling
DAILY_API_KEY=your-daily-api-key
DAILY_DOMAIN=[your-domain.daily.co](http://your-domain.daily.co)

# Payments
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...

# Security
ENCRYPTION_KEY=your-32-char-encryption-key
JWT_SECRET=your-jwt-secret

# Analytics
POSTHOG_API_KEY=your-posthog-key
POSTHOG_HOST=[app.posthog.com](http://app.posthog.com)

# Admin
ADMIN_MFA_ISSUER=MindFolk
ADMIN_SESSION_TIMEOUT=14400 # 4 hours in seconds
```

---

# **Section 6: User Experience Flows**

## **Flow Overview & Design Principles**

### **Core User Journeys**

1. **Client Flows** - Therapy seekers finding compatible therapists
2. **Therapist Flows** - Healthcare providers building their practice
3. **Platform Integration Flows** - Shared systems enabling both experiences

### **Design Principles**

- **Personality-First Matching**: Assessment drives all therapist recommendations
- **Progressive Trust Building**: Chemistry calls before full commitment
- **Minimal Friction**: Mobile-optimized, single-screen completion where possible
- **Transparent Communication**: Clear expectations and timelines throughout
- **Empowering Language**: "Find the right therapist for you" positioning
- **Inclusive Design**: WCAG 2.1 AA compliance with identity-affirming options

## **CLIENT FLOWS**

### **Flow 1: Client Discovery & Assessment Journey**

**Goal**: Convert visitors into assessed users ready for therapist matching

**Entry Points**: Landing page, search ads, referrals, social media

**Duration**: 4-6 minutes

**Success Metric**: 85%+ assessment completion rate

### **Complete 9-Screen Flow**

```
Screen 1: Welcome & Value Proposition
├─ Illustration of diverse person celebrating
├─ "Find the right therapist for you"
├─ "Because everyone's mental health journey is different"
├─ [Start Your Journey] (primary CTA)
└─ "Already have an account? Log in"

Screen 2: Account Creation
├─ "Getting started - Let's save your profile by signing up"
├─ [Continue with Email] (primary)
├─ [Continue with Google] (secondary)
├─ [Continue with Facebook] (secondary)
└─ "Already have an account? Log in"

Screen 3: What brings you here today?
├─ Header: "What brings you here today?"
├─ Subtext: "Choose what feels right - you can select multiple"
├─ Options (7 max):
│  ├─ Anxiety and everyday worries
│  ├─ Feeling low or depressed
│  ├─ Relationship challenges
│  ├─ Work and life stress
│  ├─ Family and parenting
│  ├─ Identity and self-discovery
│  └─ Past experiences and trauma
├─ [Skip for now] [Continue]

Screen 4: Your ideal therapist Communication Style
├─ Header: "I want my therapist to be..."
├─ Subtext: "Choose up to 3 that resonate with you"
├─ Options (9 max):
│  ├─ Empathetic and understanding
│  ├─ Motivational and encouraging
│  ├─ Pragmatic and problem solving
│  ├─ Flexible and adaptable
│  ├─ Structured and goal-oriented
│  ├─ Exploratory and insight-based
│  ├─ Calm and process-focused
│  ├─ Gently challenging and direct
│  └─ I'm still figuring this out
├─ [Skip for now] [Continue]

Screen 5: About You (Optional Demographics)
├─ Header: "A bit about you"
├─ Subtext: "Optional - helps us find therapists who understand your experience"
├─ Options (5 dropdowns, all optional):
│  ├─ Primary language: [Extensive list including English, Spanish, French, etc.]
│  ├─ Cultural identity: [British, South Asian, Black African, etc.]
│  ├─ Gender identity: [Woman, Man, Non-binary, Prefer not to say]
│  ├─ Age group: [18–24, 25–34, 35–44, 45–54, 55+]
│  └─ Sexual orientation: [Straight, Gay, Lesbian, Bisexual, Prefer not to say]
├─ Note: "This information is only used to help match you with compatible therapists"
├─ Actions:
│  ├─ [Skip this step] (--btn-tertiary)
│  └─ [Continue] (--btn-primary)

Screen 6: Values and identity matching
├─ Header: "It's important to me that my therapist is..."
├─ Subtext: "Optional - helps us find therapists who truly understand you"
├─ Smart Options (only relevant ones shown based on Screen 5):
│  ├─ LGBTQ+ friendly and affirming [if LGBTQ+ orientation selected]
│  ├─ Neurodiversity affirming [always shown]
│  ├─ Culturally sensitive and aware [if non-British background]
│  ├─ Speaks my native language [if non-English language]
│  ├─ Understanding of my faith/spirituality [if faith selected]
│  └─ Trauma-informed and gentle [always shown]
├─ [Skip this step] [Continue]

Screen 7: Swipe to Connect (Explainer)
├─ Header: "Swipe to Connect"
├─ Subtext: "We'll show you therapists who match your preferences"
├─ Key points:
│  ├─ Swipe right to save to favourites, left to pass
│  ├─ Book free 15-minute chemistry calls
│  └─ Only pay for the sessions you book
├─ [Continue]

Screen 8: Browse with freedom (Explainer)
├─ Header: "Browse with freedom"
├─ Subtext: "Explore therapists at your own pace"
├─ Key points:
│  ├─ Click on a profile to learn more
│  ├─ Watch video introductions from therapists
│  └─ Book free chemistry calls with your favourites
├─ [Continue]

Screen 9: We all change (Final Explainer)
├─ Header: "We all change"
├─ Subtext: "Update filtering anytime and find new therapists that match your preferences"
├─ "Find the right therapist for you"
├─ [Start browsing therapists] (primary CTA)
```

### **Flow 2: Therapist Discovery & Video Browsing**

**Goal**: Help users find compatible therapists through video-first discovery

**Entry Point**: Post-assessment or returning user login

**Duration**: 5-15 minutes browsing session

**Success Metric**: 60%+ add therapists to favorites, 20%+ book chemistry calls

### **Discovery Interface Flow**

```
Responsive Layout Architecture
Mobile (sm, <768px):
┌─────────────────────────────────┐
│ Header (8%)                     │ ← Fixed, logo + filter icon
├─────────────────────────────────┤
│                                 │
│ Card Content (84%)              │ ← Video-first therapist cards
│   • Video: 70% of card         │   (includes padding)
│   • Credentials: 8%             │
│   • Name/location: 6%           │
│   • Bio preview: 6%             │
│   • Tags: 4%                    │
│   • Internal padding: 6%        │
│                                 │
├─────────────────────────────────┤
│ Bottom Nav (8%)                 │ ← Home|Favorites|Appointments|Profile
└─────────────────────────────────┘
Note: Action row integrated into card content area

Tablet Portrait (md, 768-1023px):
Container capped at ~720px width
Typography ramps up one step
Optional top tab bar replaces bottom nav

Tablet Landscape (md, 768-1023px):
┌─────────────────┬─────────────────┐
│ Discovery List  │ Profile Detail  │
│ (60%)           │ (40%)           │
│                 │                 │
│ Swipeable cards │ • Video + bio   │
│ or stacked list │ • Credentials   │
│                 │ • Action buttons│
└─────────────────┴─────────────────┘

Desktop (lg+, ≥1024px):
┌─────────────────┬───────────────────────┐
│ Discovery List  │ Detail Pane          │
│ (40-45%)        │ (55-60%)             │
│                 │                      │
│ Scrollable      │ • Video (~55% height)│
│ therapist cards │ • Full bio/details   │
│                 │ • Sticky action row  │
└─────────────────┴───────────────────────┘
```

### **Flow 3: Chemistry Call Booking & Experience**

**Goal**: Enable low-friction 15-minute compatibility sessions

**Entry Point**: From discovery, favorites, or therapist profile

**Duration**: 2 minutes booking + 15 minutes call

**Success Metric**: 90%+ call completion, 55%+ conversion to full session

### **Complete Chemistry Call Journey**

```jsx
Chemistry Call Booking Flow
    ↓
Therapist Confirmation Page (Style Guide 2.3):
├─ Container: <Container> with responsive padding
├─ Header: "Book your free 15-minute chemistry call with Dr. Joseph Singh"
│  └─ Typography: var(--font-primary), var(--text-xl)
├─ Therapist card: 
│  ├─ Photo: rounded-lg with var(--surface) background
│  ├─ Tags: 5-category system with proper color tokens
│  └─ Quote: var(--font-primary) with var(--text-primary)
├─ Expectation: "Get to know each other - no commitment required"
│  └─ Typography: var(--font-secondary), var(--text-secondary)
└─ Background: var(--warm-white) app background

Session Configuration (shadcn/ui Form):
├─ Layout: Stack with gap-4 spacing
├─ Availability Calendar:
│  ├─ Date picker: Native modal with var(--garden-green) selection
│  ├─ Time slots: var(--surface) cards with var(--touch-target-min)
│  ├─ Selected state: var(--surface-accent) background
│  └─ Timezone: var(--text-secondary) display
├─ Schedule Options (shadcn/ui Select):
│  ├─ One-time chemistry call
│  ├─ Repeats weekly (for ongoing check-ins)
│  └─ Custom frequency
Custom frequency
├─ Session Type (shadcn/ui RadioGroup):
│  ├─ 15-minute chemistry call (Free)
│  ├─ 30-minute session (£25-45)
│  └─ 60-minute session (£45-75)
├─ Additional Comments:
│  ├─ shadcn/ui Textarea: "Add notes ahead of time, topics, etc"
│  ├─ Character limit: 500 characters
│  └─ Background: var(--surface)
└─ Payment Option (if paid session):
   └─ shadcn/ui Select: Payment method selection

Booking Overview Screen (Container + Stack):
├─ Card: var(--surface) background, rounded-md, p-4
├─ Session details confirmation:
│  ├─ Time: 12:00pm - 1:00pm (var(--font-primary))
│  ├─ Date: Monday 04/23/2024 (var(--text-primary))
│  ├─ Type: 30 minute session (var(--text-secondary))
│  ├─ Total: £25.00 (var(--font-primary), emphasized)
│  └─ Comments: User preparation notes (var(--text-secondary))
├─ Technical requirements: "Stable internet, camera optional"
├─ Cancellation policy: "Free cancellation up to 2 hours before"
└─ Actions: 
   ├─ [NEXT] (var(--btn-primary-bg), var(--touch-target-comfort))
   └─ [CANCEL] (var(--btn-secondary-text))

Appointment Confirmation (Style Guide 2.3):
├─ Success state: var(--garden-green) checkmark icon
├─ Therapist: Photo + name + session details
│  └─ Typography: var(--font-primary) for name, var(--text-secondary) for details
├─ Security assurances (Stack with gap-3):
│  ├─ Card backgrounds: var(--surface-accent)
│  ├─ "Securing your data, keeping information safe"
│  ├─ "Transparent Pricing, only pay for sessions you book"
│  └─ "GDPR Compliant, we protect your privacy"
├─ Actions (HStack with gap-4):
│  ├─ [VIEW BOOKING] (var(--btn-primary-bg))
│  └─ [BACK TO FAVORITES] (var(--btn-secondary-bg))
└─ Confirmation email: Immediate send via Supabase

Pre-Call Preparation Sequence:
├─ 24 hours: Email reminder with [Daily.co](http://Daily.co) join link
├─ 2 hours: SMS reminder with tech check option
├─ 30 minutes: Push notification "Your call starts soon"
├─ 10 minutes: [JOIN CALL] button activation (var(--btn-primary-bg))
└─ 5 minutes: Final reminder with one-click join

Chemistry Call Experience ([Daily.co](http://Daily.co) + Style Guide):
    ↓
Session Management Dashboard:
├─ Container: <Container> with proper responsive padding
├─ Today's session card (var(--surface), rounded-lg):
│  ├─ Therapist photo + session time
│  ├─ Countdown: "4 Feb 2022 • 60 mins / 12:00pm - 1:00pm"
│  │  └─ Typography: var(--font-secondary), var(--text-primary)
│  └─ [JOIN NOW] (var(--btn-primary-bg), var(--touch-target-comfort))
├─ Upcoming appointments list (Stack with gap-3)
├─ Past appointments history (muted styling)
└─ Red notification badge: var(--error-bg) for alerts

Live Call Interface (Style Guide 2.3 + Responsive):
├─ [Daily.co](http://Daily.co) embedded with custom styling matching design tokens
├─ Layout: Full-screen therapist video with responsive breakpoints
├─ Controls: shadcn/ui components with proper touch targets
├─ Timer: Session duration remaining (var(--text-secondary))
├─ 2-minute warning: var(--warning-bg) notification
├─ Emergency: Discreet support button (var(--btn-tertiary-bg))
└─ Extension option: 5-minute overflow available

Mobile (xs/sm, portrait-first):
PageShell: grid grid-rows-[auto_1fr_auto] min-h-dvh bg-text-dark
├─ Header (8%): Room title + timer, Container padding (px-6)
├─ Content (80%): Video canvas + overlays, no horizontal padding
│  ├─ Remote video ([Daily.co](http://Daily.co)): 88% of content area
│  ├─ PiP self-view: 8%, floating rounded-lg with internal padding
│  ├─ System overlays: 2% (encryption, network status)
│  └─ Gesture/safe areas: 2% reserved
├─ Footer controls (12%): Container padding (px-6), pb-[env(safe-area-inset-bottom)]
├─ Notes/Chat: Hidden, slide-up shadcn/ui Sheet with p-4 padding
└─ Recording consent: Banner with Container padding

Tablet (md, landscape preferred):
Split view with Flexbox inside grid content row:
├─ Header (6%): Container padding (px-8)
├─ Content row (84%): No horizontal padding (video edge-to-edge)
│  ├─ Left pane (60%): Video canvas, no padding
│  └─ Right pane (40%): p-4 internal padding
│     ├─ Session notes (45%): Autosave, gap-4 spacing
│     ├─ Chat/thread (40%): Optional, gap-3 spacing
│     └─ Timer/status (15%): Tech, consent, quality
├─ Footer controls (10%): Container padding (px-8)
└─ Portrait fallback: Stacked video + toggle sheet with p-4

Desktop (lg/xl/2xl):
├─ Header (6%): Container padding (px-10)
├─ Content row (86%): No horizontal padding
│  ├─ Left/video (65%): [Daily.co](http://Daily.co) canvas edge-to-edge
│  └─ Right/side panel (35%): p-6 internal padding
│     ├─ Notes (50%): Session documentation, gap-6 spacing
│     ├─ Chat (35%): Real-time messaging, gap-4 spacing
│     └─ Metadata (15%): Timer, connectivity, consent, recording
└─ Footer controls (8%): Container padding (px-10)

Implementation: Container atom for horizontal padding, video maintains edge-to-edge for immersion, all spacing uses Style Guide 2.3 tokens

Post-Call Immediate Actions (Modal):
┌─────────────────────────────────────────────┐
│ Container + Stack layout                    │
│ Typography: var(--font-primary) for header │
│                                             │
│ 🙂 Great fit - I'd like to book a session  │
│ 😐 Good, but I want to think about it      │
│ 😕 Not quite the right match for me        │
│                                             │
│ [BOOK FULL SESSION] (var(--btn-primary-bg))│
│ [BROWSE MORE THERAPISTS] (var(--btn-secondary-bg))│
│ [SCHEDULE ANOTHER CALL] (var(--btn-cta-bg))│
└─────────────────────────────────────────────┘

Notifications & Communication (Style Guide compliant):
├─ System notifications screen (Container + Stack):
│  ├─ Background: var(--warm-white)
│  ├─ Cards: var(--surface) with rounded-md
│  ├─ Consultation forms added
│  ├─ Aftercare summaries
│  ├─ Homework notes from therapist
│  ├─ File updates and resources
│  └─ Prescription updates (if applicable)
├─ Therapist-to-client messaging (shadcn/ui components)
├─ Session preparation materials
└─ Progress tracking updates

Follow-up Engagement (Automated):
├─ Immediate: Session booking link if positive feedback
├─ 2 hours: Personalized email based on rating
├─ 24 hours: "How was your chemistry call?" survey
├─ 3 days: Re-engagement sequence if no action
├─ 1 week: Alternative therapist suggestions
└─ 2 weeks: Platform experience feedback request
```

*Recommended implementation for Chemistry Call flow based on the existing codebase: Extend the current appointment booking system to support a 15-minute chemistry call type. Mark these as free in the database. Use the existing session room UI for the video call portion, integrating Daily.co when ready. Track conversion metrics by linking chemistry calls to subsequent paid bookings in the appointments table. The current database schema can support this with minor additions to track appointment relationships.*

### **State Management & Integration**

**Cross-Platform Synchronization:**

├─ Supabase real-time subscriptions for booking updates

├─ Calendar integration: Google/Outlook sync

├─ Notification preferences: SMS/email/push customization

├─ Payment processing: Stripe Connect with therapist payouts

└─ Session data: HIPAA-compliant storage and retrieval

**Responsive Behavior (Style Guide 2.3):**

├─ Mobile: PageShell with fixed header/bottom nav, Container padding

├─ Tablet: Modal overlays with persistent context

├─ Desktop: Split-view with persistent therapist list

├─ All devices: Native calendar picker with var(--touch-target-min)

└─ Accessibility: WCAG 2.1 AA compliance across all interactions

---

### **Flow 4: Full Session Booking & Management**

**Goal**: Seamless transition from chemistry call to ongoing therapy

**Entry Point**: Post chemistry call or direct booking from profile

**Duration**: 3 minutes booking + 30-90 minutes session

**Success Metric**: 80%+ session attendance, 70%+ rebook rate

### **Session Booking & Delivery Flow**

```
Full Session Booking Process
    ↓
Session Configuration:
├─ Session length selection:
│  ├─ 30-minute session (£30) - Good for check-ins
│  ├─ 60-minute session (£60) - Most popular option
│  └─ 90-minute session (£90) - Deep work sessions
├─ Scheduling options:
│  ├─ One-time session
│  ├─ Weekly recurring (most common)
│  ├─ Bi-weekly recurring
│  └─ Monthly check-ins
└─ Calendar integration for personal scheduling

Session Preparation Interface:
├─ "What would you like to focus on?" (optional 200-word field)
├─ Current mental state check-in (1-10 scale + brief text)
├─ Updates since chemistry call or last session
├─ Session goals (select 2-3 objectives from preset list)
└─ Emergency contact verification for safety

Payment & Confirmation:
├─ Payment method (stored or new card entry)
├─ Session fee breakdown with platform processing fee
├─ Cancellation policy acknowledgment (24-hour notice)
├─ Privacy and recording consent (if applicable)
├─ [CONFIRM BOOKING] → Immediate confirmation
└─ Receipt and calendar invite sent via email

Pre-Session Engagement (24 hours before):
├─ Reminder email with session prep suggestions
├─ Optional pre-session questionnaire (mood, goals, concerns)
├─ Technical setup verification link
├─ Therapist preparation notification (shared goals/focus areas)
└─ Clear cancellation/reschedule options

Session Day Experience:
    ↓
Pre-Session Access (30 minutes early):
├─ Email reminder with direct session join link
├─ Optional tech check: audio, video, connection quality
├─ "Preparing for your session" guidance and tips
├─ Privacy reminder about confidential space
└─ Therapist preparation status indicator

Session Interface (30-90 minutes):
├─ Full-screen therapist video with optimized quality
├─ Minimal, unobtrusive user interface
├─ Discreet session timer (visible to therapist, optional for client)
├─ Emergency support button (discreetly placed)
├─ Private note-taking option for client
├─ Screen sharing capability (therapist-initiated)
├─ Session recording (if both parties consented)
└─ Stable connection with automatic quality adjustment

Mobile (xs/sm, portrait-first):
PageShell: grid grid-rows-[auto_1fr_auto] min-h-dvh bg-text-dark
├─ Header (8%): Room title + timer, Container padding (px-6)
├─ Content (80%): Video canvas + overlays, no horizontal padding
│  ├─ Remote video ([Daily.co](http://Daily.co)): 88% of content area
│  ├─ PiP self-view: 8%, floating rounded-lg with internal padding
│  ├─ System overlays: 2% (encryption, network status)
│  └─ Gesture/safe areas: 2% reserved
├─ Footer controls (12%): Container padding (px-6), pb-[env(safe-area-inset-bottom)]
├─ Notes/Chat: Hidden, slide-up shadcn/ui Sheet with p-4 padding
└─ Recording consent: Banner with Container padding

Tablet (md, landscape preferred):
Split view with Flexbox inside grid content row:
├─ Header (6%): Container padding (px-8)
├─ Content row (84%): No horizontal padding (video edge-to-edge)
│  ├─ Left pane (60%): Video canvas, no padding
│  └─ Right pane (40%): p-4 internal padding
│     ├─ Session notes (45%): Autosave, gap-4 spacing
│     ├─ Chat/thread (40%): Optional, gap-3 spacing
│     └─ Timer/status (15%): Tech, consent, quality
├─ Footer controls (10%): Container padding (px-8)
└─ Portrait fallback: Stacked video + toggle sheet with p-4

Desktop (lg/xl/2xl):
├─ Header (6%): Container padding (px-10)
├─ Content row (86%): No horizontal padding
│  ├─ Left/video (65%): [Daily.co](http://Daily.co) canvas edge-to-edge
│  └─ Right/side panel (35%): p-6 internal padding
│     ├─ Notes (50%): Session documentation, gap-6 spacing
│     ├─ Chat (35%): Real-time messaging, gap-4 spacing
│     └─ Metadata (15%): Timer, connectivity, consent, recording
└─ Footer controls (8%): Container padding (px-10)

Implementation: Container atom for horizontal padding, video maintains edge-to-edge for immersion, all spacing uses Style Guide 2.3 tokens

Session Conclusion Process:
├─ 5-minute gentle warning notification
├─ Natural conversation ending or extension option
├─ Immediate post-session mood check-in (optional)
├─ Next session scheduling prompt with calendar options
├─ Session summary sharing from therapist (notes, resources)
└─ Payment confirmation and receipt generation

Post-Session Engagement (2-24 hours):
├─ Session feedback survey (satisfaction, effectiveness, comfort)
├─ Mood comparison (before/after session rating)
├─ Next session booking with preferred time slots
├─ Resource library access (articles, exercises shared by therapist)
├─ Progress tracking update with visual improvements
├─ Payment receipt and insurance documentation (if applicable)
└─ Crisis support resources reminder and contact information
```

---

### **Flow 5: Ongoing Relationship & Progress Management**

**Goal**: Support long-term therapeutic relationships and track meaningful progress

**Entry Point**: After first full session completion

**Duration**: Ongoing engagement over months

**Success Metric**: 80%+ client retention after 3 months, 70%+ goal achievement

### **Client Dashboard & Relationship Flow**

```
Client Dashboard (Returning User Home)
    ↓
Overview Section:
├─ Session countdown: "Session with Dr. Singh in 2 days, 1:30pm"
├─ Progress visualization: Goal achievement charts and mood trends
├─ Therapeutic relationship health indicators
├─ Unread messages from therapist notification
├─ Quick actions: reschedule, message, emergency support
└─ Upcoming session preparation checklist

Session History & Documentation:
├─ Calendar view of completed and upcoming sessions
├─ Session notes and post-session summaries from therapist
├─ Personal reflection journal with private entries
├─ Resource library: articles, exercises, homework assigned
├─ Progress photos, voice notes, or other personal tracking
└─ Achievement milestones and celebration markers

Progress Tracking System:
├─ Weekly automated mood check-ins with trend analysis
├─ Goal-specific progress indicators (0-100% completion scales)
├─ Standardized assessments (GAD-7, PHQ-9) administered quarterly
├─ Personal reflection prompts and guided journaling
├─ Visual progress reports with meaningful insights
└─ Comparative analysis showing improvement over time

Secure Communication Hub:
├─ End-to-end encrypted messaging with therapist
├─ Session preparation notes and agenda setting
├─ Homework assignment tracking and submission
├─ Resource sharing from therapist with organized library
├─ Between-session check-ins and support requests
└─ Crisis communication protocols with immediate response

Therapeutic Relationship Management:
├─ Ongoing therapist compatibility feedback and adjustments
├─ Session satisfaction ratings with specific feedback categories
├─ Therapy frequency and approach modification requests
├─ Pause therapy option with supportive transition planning
├─ Therapist change facilitation with relationship bridge support
└─ Graduation/completion celebration and transition planning

Long-term Engagement & Growth:
├─ Monthly comprehensive progress reviews with therapist
├─ Dynamic goal setting and revision based on life changes
├─ Treatment plan updates reflecting growth and new challenges
├─ Success story documentation and optional sharing
├─ Alumni community access for ongoing peer support
├─ Maintenance session scheduling for ongoing wellness
└─ Crisis prevention planning with personalized protocols
```

---

## **THERAPIST FLOWS**

### **Flow 1: Therapist Onboarding & Profile Creation**

**Goal**: Transform qualified therapists from signup to accepting clients efficiently

**Entry Points**: Marketing campaigns, referrals, professional networks

**Duration**: 45-60 minutes initial setup + 24-48 hours verification

**Success Metric**: 90%+ complete profiles, 85%+ pass verification within 48 hours

### **Complete Onboarding Journey**

```
Professional Landing & Signup
"Build your practice with personality-first matching"
    ↓
Value Proposition Presentation:
├─ "85% higher client retention through better compatibility matching"
├─ "Full control over your rates, schedule, and policies"
├─ "All-in-one practice management - no juggling multiple tools"
├─ "Video profiles and short chemistry calls help clients find the right fit faster, reducing your early drop-off rates"
└─ [GET STARTED] → Professional email verification

Account Setup & Platform Introduction:
├─ Professional email verification with secure token
├─ Platform tour highlighting key benefits and differentiators
├─ Setup wizard progress overview (6 main steps)
├─ Clear timeline expectations: "Most therapists go live within 48 hours"
└─ Components: shadcn/ui with consistent styling

Step 1: Professional Credentials (shadcn/ui Form)
├─ Layout: Stack with --space-md (gap-4)
├─ Legal Name: Required field with validation (shadcn/ui `input`)
├─ Age group: [18–24, 25–34, 35–44, 45–54, 55+]
├─ Professional Title: shadcn/ui `select` (e.g., Counsellor, Psychotherapist, Clinical Psychologist)
├─ Professional Body Membership: Multi-select checklist (styled as `Cluster` chips)
│  ├─ BACP – British Association for Counselling and Psychotherapy
│  ├─ UKCP – UK Council for Psychotherapy
│  ├─ HCPC – Health and Care Professions Council
│  ├─ BABCP – British Association for Behavioural & Cognitive Psychotherapies
│  ├─ BPS – British Psychological Society
│  ├─ NCS – National Counselling and Psychotherapy Society
│  ├─ COSCA – Counselling & Psychotherapy in Scotland
│  ├─ ACC – Association of Christian Counsellors
│  ├─ AHPP – Association of Humanistic Psychology Practitioners
│  ├─ BAAT – British Association of Art Therapists
│  ├─ BAMT – British Association for Music Therapy
│  ├─ BADth – British Association of Dramatherapists
│  ├─ HCPC Arts Therapies Register (Art, Music, Drama, Dance/Movement)
│  ├─ BAPT – British Association of Play Therapists
│  ├─ IPTUK – Association for Psychoanalytic Psychotherapy in the NHS (UK)
│  ├─ FPC – Foundation for Psychotherapy and Counselling
│  ├─ UKAHPP – UK Association of Humanistic Psychology Practitioners
│  └─ Other Recognised Professional Register (please specify)
├─ Years of Clinical Experience: shadcn/ui `radio-group` (0-2, 3-5, 6-10, 11-20, 20+ years)
├─ Location: City/region with autocomplete (shadcn/ui `input` + suggestions, bg-surface, rounded-md)
├─ Insurance: Confirmation checkbox for professional liability cover

Step 2: Therapeutic Approach (Tag selection):
├─ Modalities (select up to 3): (shadcn/ui multi-select with tag-style display)
```

---

### **Flow 2: Daily Practice Management & Workflow**

**Goal**: Streamline therapist daily operations and minimize administrative overhead

**Entry Point**: Daily platform login or session notifications

**Duration**: 15-30 minutes daily administrative time

**Success Metric**: 90%+ daily active usage, 25% reduction in admin time vs traditional practice

### **Daily Workflow Implementation**

```
Morning Dashboard Login & Daily Planning
    ↓
Personalized Welcome & Dashboard Overview:
├─ Header: Search clients functionality with filter options
├─ Sidebar Navigation: Dashboard, My Clients, My Profile, Performance & Analytics
├─ Welcome message: "Welcome Back, Sarah!" with user avatar
├─ Upcoming Appointments widget:
│  ├─ Individual appointment cards with avatars
│  ├─ Time slots: "Apr 21 10:00am - 10:30am"
│  ├─ [JOIN NOW] buttons for active sessions
│  ├─ [OPEN CALENDAR] link to full schedule view
│  └─ [EDIT] options for each appointment
├─ My Client Dashboard widget:
│  ├─ Client status indicators (Active/Inactive badges)
│  ├─ [OPEN CLIENTS] link to full client management
│  └─ Quick client overview with status colors
├─ Income Details widget:
│  ├─ Appointment tracking: "122 total" with breakdown
│  ├─ Status indicators: "100 happened, 40 cancelled, 38 rescheduled"
│  ├─ Action items: "Update pricing", "Add a new video", "Gather reviews"
│  └─ [OPEN ANALYTICS] link to detailed metrics
└─ My Business Profile widget with performance overview

Calendar Management System:
├─ Calendar Integration:
│  ├─ [INTEGRATE WITH GOOGLE] button
│  ├─ [INTEGRATE WITH OUTLOOK] button
│  └─ "Integrate syncing your calendar schedule seamlessly"
├─ View Controls:
│  ├─ [List View] toggle (default)
│  ├─ Calendar view toggle showing week grid
│  ├─ Time period filters: TODAY | WEEK | MONTH tabs
│  └─ Month navigation: "< Apr 2024 >"
├─ Appointment Display:
│  ├─ List format: "8:00am - 8:30am, 30 min call with Jessica"
│  ├─ Calendar format: Time-blocked grid with client names
│  ├─ Session duration indicators (30/60 min calls)
│  └─ Expandable appointment details with arrows
├─ Appointment Management:
│  ├─ Filter dropdown: "Appointment type" with options
│  ├─ Individual appointment modals with full details
│  ├─ [JOIN] buttons for immediate session start
│  └─ Direct editing capabilities from calendar view
└─ Session Reminders:
   ├─ Banner notifications: "appointment on April 29th at 3pm (starting in 20 minutes)"
   └─ [JOIN NOW] prominent action button

Session Delivery Interface:
├─ Live Session Screen:
│  ├─ Header: "In Session with Jessica" with back arrow
│  ├─ Main video: Full-screen client view
│  ├─ PiP self-view: "You" corner overlay
│  ├─ Session controls: Mute, video, end call buttons
│  ├─ Chat panel: "Start a chat" with encryption notice
│  └─ "ENCRYPTED CHAT" security indicator
├─ Session Management:
│  ├─ Timer display for session duration
│  ├─ Note-taking integration during session
│  ├─ Quick access to client history
│  └─ Emergency protocols easily accessible
└─ Post-Session Workflow:
   ├─ Automatic note templates
   ├─ Session summary generation
   ├─ Next appointment scheduling
   └─ Payment confirmation
```

**Responsiveness Guidelines:**

- **Mobile:** Widgets stack vertically; calendar defaults to list view.
- **Tablet:** Two-column split: left = navigation + daily overview (40%), right = calendar/session details (60%).
- **Desktop:** Multi-pane dashboard: sidebar nav (20%), dashboard widgets (40%), calendar/appointments (40%).

---

### **Flow 3: Client Relationship & Communication Management**

**Goal**: Foster effective therapeutic relationships through comprehensive client management

**Entry Point**: Client communications, session planning, progress reviews

**Duration**: Variable based on client needs and relationship stage

**Success Metric**: 85%+ client retention rate, 90%+ session attendance, improved outcomes

### **Client Management System**

```
Client Portfolio Dashboard & Management
    ↓
Client Directory Interface:
├─ Header: "My Clients" with [LEARN HOW TO MANAGE CLIENTS] link
├─ Search & Filter System:
│  ├─ Search bar: "Name, email, etc..." with search icon
│  ├─ Attribute filter dropdown: "Property" selection
│  ├─ Advanced filtering by client status
│  └─ Results pagination: "1-5 of 13" with navigation
├─ Client List Display:
│  ├─ Columns: User | Email | Client Status | Account Status | User ID
│  ├─ Profile photos with names
│  ├─ Email addresses for contact
│  ├─ Status badges:
│     ├─ Contract signed (blue)
│     ├─ Awaiting contract (orange)
│     ├─ Contract sent (purple)
│     ├─ Session trial (teal)
│     └─ Last session dates (green)
│  ├─ Account status: ACTIVE/INACTIVE badges
│  ├─ User ID tracking numbers
│  └─ Action menu (three dots) for each client
├─ Client Status Management:
│  ├─ Color-coded status system
│  ├─ Hover tooltips explaining status meanings
│  ├─ Bulk status update capabilities
│  └─ Status change history tracking
└─ Quick Actions Menu:
   ├─ Message client
   ├─ Schedule appointment
   ├─ View full profile
   └─ Update status

Individual Client File Management:
├─ Client Profile Header:
│  ├─ Client name: "Francesca James" with [EDIT] option
│  ├─ Status indicator: Green "ACTIVE" badge
│  ├─ Contact information: Phone and email
│  ├─ Communication preferences: "Prefers email notifications"
│  └─ Session reminder: "appointment on April 29th at 3pm"
├─ Navigation Tabs:
│  ├─ SUMMARY (default view)
│  ├─ NOTIFICATIONS
│  └─ FILES
├─ Client Management Actions:
│  ├─ [SHARE] button for profile sharing
│  ├─ [UPLOAD] for document management
│  ├─ [NEW] dropdown for creating new items
│  └─ Quick action buttons throughout interface
├─ Upcoming Appointments Section:
│  ├─ "Apr 22 1:30pm - 30 min call"
│  ├─ "May 18 10:00am - 60 min call"
│  ├─ "Jun 01 3:30pm - 30 min call"
│  └─ Expandable details for each appointment
├─ Assessment & Progress Tracking:
│  ├─ GAD Score display: "18" with "Moderate" indicator
│  ├─ Circular progress chart visualization
│  ├─ [VIEW DETAILS] link for full assessment
│  ├─ Score trend tracking over time
│  └─ Assessment form management
└─ Client Communication Center:
   ├─ Notification Settings management
   ├─ Appointment reminders configuration
   ├─ Document reminders setup
   └─ Custom notification preferences

Session Notes & Documentation:
├─ Add New Summary Section:
│  ├─ Search functionality: "Search Client Notes, Keywords, past notes"
│  ├─ Text area: "Add chart notes: Include notes from a video call"
│  ├─ Date/time stamp: "Set date and time"
│  ├─ [SAVE NOTES] action button
│  └─ Auto-save functionality
├─ Past Appointment Notes:
│  ├─ Date filtering: "Last week" dropdown
│  ├─ Chronological note display
│  ├─ Note categories: "New note", "Score Measured"
│  ├─ Assessment tracking: "GAD #123" with scores
│  ├─ [ADD ADDITIONAL NOTE] option
│  └─ Search within notes functionality
├─ Progress Documentation:
│  ├─ Visual progress indicators
│  ├─ Goal tracking with measurable outcomes
│  ├─ Treatment plan updates
│  ├─ Intervention effectiveness tracking
│  └─ Outcome measurement reporting
└─ Communication Workflow:
   ├─ Secure messaging integration
   ├─ Resource sharing capabilities
   ├─ Homework assignment tracking
   └─ Crisis communication protocols
```

**Responsiveness Guidelines:**

- **Mobile:** Directory in stacked cards; profile tabs as vertical accordion.
- **Tablet:** Two-column: left = directory (40%), right = client detail (60%).
- **Desktop:** Three-pane: sidebar nav (20%), client list (30%), client detail (50%).

---

### **Flow 4: Business Operations & Growth Analytics**

**Goal**: Optimize therapist practice success through data-driven insights and growth strategies

**Entry Point**: Weekly/monthly performance review cycles

**Duration**: 30-45 minutes weekly analysis and planning

**Success Metric**: 25%+ revenue growth annually, 80%+ capacity utilization, 90%+ client satisfaction

### **Analytics Dashboard System**

```
Performance & Analytics Dashboard
    ↓
Key Metrics Overview:
├─ Header: "Performance & Analytics" with date range selector
├─ Primary Metrics Cards:
│  ├─ Profile views: "18,022" with "88.2% since last year" (green arrow)
│  ├─ Sessions booked: "103" with "29.2% since last year" (yellow arrow)
│  ├─ Added to favorites: "416" with "29.2% since last year" (green arrow)
│  └─ Rating: "4.5/5" with ".5 stars since last year" (green arrow)
├─ Metrics Visual Indicators:
│  ├─ Growth percentages with colored arrows
│  ├─ Year-over-year comparison data
│  ├─ Trend direction indicators
│  └─ Performance benchmarking
└─ Date Range Control: "In the last year" with calendar picker

Detailed Analytics Sections:
├─ Profile Views Analysis:
│  ├─ Line chart: "Profile Views in the last year"
│  ├─ X-axis: Jan through Jul monthly progression
│  ├─ Y-axis: 0 to 20k scale with gridlines
│  ├─ Trend line showing steady growth
│  └─ Hover tooltips for specific data points
├─ Appointment Analytics:
│  ├─ Donut chart: "122" total appointments
│  ├─ Color segments:
│     ├─ Orange: "100 happened"
│     ├─ Purple: "40 cancelled"
│     └─ Green: "38 rescheduled"
│  ├─ Legend with percentages
│  └─ Completion rate calculations
├─ Income Analysis:
│  ├─ Revenue tracking: "Income in the last year: $28,012"
│  ├─ Line chart with monthly breakdown
│  ├─ Revenue trends and seasonal patterns
│  ├─ Average session value tracking
│  └─ Platform fee impact analysis
└─ Ways to Improve Section:
   ├─ "Update pricing" - rate optimization suggestions
   ├─ "Add a new video" - profile enhancement
   ├─ "Gather reviews" - reputation building
   ├─ "Promote your page" - visibility improvement
   ├─ "Learn engagement boost" - client acquisition
   └─ "FAQ" - support resources

Business Intelligence Features:
├─ Performance Benchmarking:
│  ├─ Platform average comparisons
│  ├─ Specialty-specific metrics
│  ├─ Peer performance indicators
│  └─ Industry standard comparisons
├─ Growth Opportunity Identification:
│  ├─ Underperforming metric alerts
│  ├─ Improvement recommendation engine
│  ├─ Market opportunity analysis
│  └─ Competitive positioning insights
├─ Financial Planning Tools:
│  ├─ Revenue projection modeling
│  ├─ Capacity optimization analysis
│  ├─ Pricing strategy recommendations
│  └─ Profit margin optimization
└─ Strategic Planning Dashboard:
   ├─ Goal setting and tracking
   ├─ Performance milestone monitoring
   ├─ Professional development planning
   └─ Practice growth roadmap
```

**Responsiveness Guidelines:**

- **Mobile:** Metrics cards stack vertically, charts collapse to swipeable carousel.
- **Tablet:** Two-column layout: left = KPIs & charts (60%), right = improvement/actions (40%).
- **Desktop:** Grid layout: top = KPIs (25%), middle = charts (50%), bottom = improvement/action panels (25%).

---

# **ADMIN FLOWS**

> Canonical flows for platform administrators. Mirrors the structure and fidelity used in Client/Therapist flows. Style Guide 2.3 is assumed (container atom padding, flexbox-first layouts, radii tokens, WCAG 2.1 AA).
> 

---

## **Flow A: Administrative Oversight & Impersonation (Preview Mode)**

**Goal**: Safely traverse and troubleshoot any user experience; resolve issues without guesswork.

**Entry Point**: `/admin/overview` after admin auth.

**Duration**: 1–10 minutes per task (search → impersonate → verify → exit).

**Success Metrics**: < 2 min to first-screen-as-user; 100% sensitive views audited; 0 unauthorized writes during read-only preview.

### **Workflow**

```
Admin Overview
   ↓
Global Snapshot
├─ Uptime, active sessions, failed webhooks (24h)
├─ Moderation backlog, verification queue counts
└─ Quick Actions: [Impersonate], [Audit Explorer], [Retry Webhooks]
   ↓
Impersonation
├─ Search user (name/email/role/id)
├─ Select role context (Client/Therapist)
├─ [MASQUERADE] → short-lived preview token issued
└─ Banner persists: "Viewing as {Name} ({Role}). Exit preview."
   ↓
Preview Navigation
├─ Full UX as user (feature flags respected or overridden per policy)
├─ Read-only by default for PHI; elevate needs reason + approver
└─ All views/writes attributed (acting_user_id + on_behalf_of_user_id)
   ↓
Exit Preview
└─ One click → return to last Admin page + toast "Preview ended"
```

### **Screens & Responsiveness**

- **Admin Overview**
    - *Mobile*: Stacked cards; sticky impersonation search at top.
    - *Tablet*: Sidebar 24%, main 76%; two-column KPI cards.
    - *Desktop*: Sidebar 20%, main 55%, detail 25% (when an item is selected).
- **Impersonation Modal**
    - 480–720px modal, `rounded-lg`, focus-trap, keyboard accessible.
- **Preview Banner**
    - Fixed top; 48px height; `rounded-none`; high-contrast text; ESC + button to exit.

### **Acceptance Criteria**

- Banner visible across all routes during impersonation; cannot be hidden.
- Starting impersonation adds an audit entry within 100ms with IP + route.
- Exiting impersonation restores original admin session and context.

---

## **Flow B: User & Therapist Management**

**Goal**: Manage accounts, roles, and lifecycle states quickly and safely.

**Entry Point**: `/admin/users` or `/admin/therapists`.

**Success Metrics**: < 30s to locate a user; bulk actions error rate < 1%.

### **Workflow**

```
Directory (Users/Therapists)
   ↓
Search & Filter
├─ Query: name/email/id
├─ Filters: role, status, verification state, flags
└─ Sort: newest, most active, most flags
   ↓
Row Actions
├─ [Impersonate]
├─ [Suspend / Restore]
├─ [Reset Role] (admin confirmation)
└─ [Delete] (double confirm; data retention rules shown)
   ↓
Profile Drawer / Page
├─ Timeline (auth events, sessions)
├─ Flags & notes
├─ Billing / payouts snapshot (therapists)
└─ Compliance: export data / delete (GDPR)
```

### **Screens & Responsiveness**

- **Directory Table**
    - *Mobile*: Card list; essential columns only; actions in kebab menu.
    - *Tablet*: 2–3 columns; horizontal scroll within container.
    - *Desktop*: Full table with sticky header and column resize.
- **Profile Drawer**
    - 420–560px side drawer on md+; full-screen modal on mobile.

### **Acceptance Criteria**

- Every mutation logs to `audit_logs` with reason code when applicable.
- GDPR exports stream as downloadable file; progress indicator shown.

---

## **Flow C: Therapist Verification Queue**

**Goal**: Approve legitimate therapists quickly; reduce risk.

**Entry Point**: `/admin/therapists?tab=verification`.

**Success Metrics**: Median decision < 24h; false-accepts < 0.5%.

### **Workflow**

```
Verification Queue
   ↓
Candidate Card
├─ Identity doc previews (redacted)
├─ Credentials & registry checks (auto signals)
└─ Notes + history
   ↓
Decision
├─ [Approve] (activates account)
├─ [Reject] (reason mandatory; templated notice)
└─ [Request More Info]
```

### **Screens & Responsiveness**

- Grid/list toggle; document viewer supports zoom/pan; keyboard nav.

### **Acceptance Criteria**

- Decision requires 2 fields: decision + justification; both audited.
- Rejections notify applicant with template + merge tags.

---

## **Flow D: Content Moderation (Videos, Bios, Testimonials, Messages)**

**Goal**: Keep the platform safe and on-brand.

**Entry Point**: `/admin/moderation`.

**Success Metrics**: 95% SLA < 48h; appeal success < 10% (quality proxy).

### **Workflow**

```
Moderation Inbox
   ↓
Filter by Type & Severity
   ↓
Review Panel
├─ Media/message preview
├─ Reporter context
├─ Policy reference
└─ History of actions
   ↓
Action
├─ [Approve]
├─ [Remove]
└─ [Escalate to Compliance]
```

### **Screens & Responsiveness**

- Split view on md+: list left (40%), detail right (60%);
- Mobile stacked with sticky action bar; confirm dialogs accessible.

### **Acceptance Criteria**

- Removals require policy citation; user notified with appeal link.
- All actions retriable with idempotency; audit entries created.

---

## **Flow E: Bookings & Financial Oversight**

**Goal**: Resolve booking/payment issues without engineer involvement.

**Entry Point**: `/admin/bookings`.

**Success Metrics**: Refund execution < 60s; forced cancellations < 2 clicks.

### **Workflow**

```
Bookings Table
   ↓
Filter: date range, status, type (chemistry/session)
   ↓
Row Detail
├─ Client/Therapist, session timeline, attendance
├─ Stripe events & payout status
└─ Actions: [Refund], [Force Cancel], [Reschedule]
```

### **Screens & Responsiveness**

- Desktop: table + right detail pane; Tablet: stacked; Mobile: cards.

### **Acceptance Criteria**

- Refund writes Stripe id + reason; confirmations sent to both parties.
- Force-cancel enforces notification + calendar updates.

---

## **Flow F: Feature Flags & Experiments**

**Goal**: Safely roll features to cohorts; reproduce user states.

**Entry Point**: `/admin/feature-flags`.

**Success Metrics**: Rollout/rollback < 30s; zero accidental exposure.

### **Workflow**

```
Flags List
   ↓
Flag Detail
├─ Description, default, environments
├─ Targeting: role, user ids, percentage rollouts
└─ Controls: [Enable], [Disable], [Rollback]
   ↓
Audit & Preview
└─ [Preview as user] opens impersonation in that flag context
```

### **Acceptance Criteria**

- Changes are versioned; diff visible; require confirmation + reason.

---

## **Flow G: Webhook & Integrations Monitor**

**Goal**: Detect and resolve integration issues fast.

**Entry Point**: `/admin/webhooks`.

**Success Metrics**: Failed events cleared < 15m; retry success > 95%.

### **Workflow**

```
Events Stream (last 24h)
   ↓
Filter by Source (Clerk/Stripe/Daily/Resend)
   ↓
Event Detail
├─ Request/response payloads (redacted where sensitive)
└─ [Retry], [Copy cURL], [Open Docs]
```

### **Acceptance Criteria**

- PII redaction on payload views; access logged.
- Retries are idempotent; exponential backoff details shown.

---

## **Flow H: Audit & Compliance Explorer**

**Goal**: Provide an immutable, searchable trail of sensitive operations.

**Entry Point**: `/admin/audit`.

**Success Metrics**: Query < 2s p95; export completes < 60s.

### **Workflow**

```
Audit Search
   ↓
Filters
├─ Actor, Target, Entity, Action, Date range
└─ Advanced: route, ip, impersonation only
   ↓
Results Table
└─ Row → Detail drawer (full metadata)
   ↓
Export
└─ CSV with signed URL, auto-expiry
```

### **Acceptance Criteria**

- Impersonation filter shows acting/on_behalf_of pairs.
- Tamper-evident hash present for each record.

---

## **Responsiveness & Style (All Admin Screens)**

- **Breakpoints & Layout**
    - *Mobile (xs/sm)*: Stacked, single scroll, sticky action bars.
    - *Tablet (md)*: Split panes where helpful (40/60); nested scroll.
    - *Desktop (lg+)*: Sidebar + main + detail (20/55/25) where applicable.
- **Container Atom**: `px-6 md:px-8 lg:px-10`; max-widths per page type.
- **Flexbox-First**: Components use Flexbox; Grid reserved for shell.
- **Radii**: `rounded-md` controls, `rounded-lg` panes, `rounded-xl` media.
- **A11y**: 44px min touch, visible focus ring, semantic headings, aria-live for toasts.

---

## **Operational Guardrails**

- **Preview Mode Banner**: Always visible; high-contrast; keyboard-exitable.
- **Read vs Write in Preview**: Default read-only; elevation requires reason + approver and is time-limited.
- **Audit Everywhere**: Every sensitive view/write emits an audit record with latency target ≤ 100ms.
- **State Inspector**: Query param `?state=loading|error|empty|end` toggles component states to reproduce user reports.

---

## **Telemetry & Alerts (Admin-only)**

- Event names: `admin_impersonation_start/stop`, `admin_user_suspend`, `admin_flag_action`, `admin_refund_issued`, `admin_webhook_retry`, `admin_flag_toggle`, `admin_audit_export`.
- Alerting: Pager on webhook failure spikes; weekly report on moderation SLA; anomaly alerts on impersonation out-of-hours.

---

# **[CHANGED] SHARED PLATFORM FLOWS (Current Status)**

[CHANGED] Current stack: **React + Vite (TS)**, **Tailwind CSS**, **shadcn/ui**, **Supabase (DB/Storage/Edge/Realtime/RLS)**, **Supabase Auth**. 

Not yet integrated: Daily.co (live sessions), Cloudflare Stream (profile videos), Stripe (Connect + Billing), Resend (email), Twilio (SMS), PostHog (analytics). Regions: **EU‑West** by default. WCAG 2.1 AA. Style Guide v2.3 tokens & radii.

---

## Flow 1 — Video Session Infrastructure & Technical Delivery

*Recommended implementation for this flow based on the existing codebase: Integrate Daily.co using the existing session room UI components. Create Supabase Edge Functions to generate secure room tokens. Use the existing appointment system to trigger session creation.*

**Goal:** Reliable, high‑quality, privacy‑first therapy calls.

**Targets:** 99.9% uptime; ≤2s connect; audio prioritized under constraint.

**Roles:** Client, Therapist (Admin can join read‑only for QA with consent + bannered).

### A. Pre‑Session Readiness (T‑15 → T‑0)

1. **Gate & tickets**
    - [CHANGED] Supabase Auth session → short‑lived **Daily room token** (role=host|guest, exp≤20m).
    - Supabase **RLS** confirms booking ownership & state=upcoming.
2. **Checks & consent**
    - Preflight (mic/cam/net), device picker, captions toggle default **ON**.
    - Consent gates for **recording** (off by default). Store in `appointments` table.
3. **Buffers & reminders**
    - Join buttons surface at **T‑10m**; Email reminders via Supabase Edge Functions.

### B. In‑Session UX (responsive)

- **Mobile portrait:** video 78% (client focus), controls 12%, info/notes 10% slide‑over.
- **Tablet landscape (md+):** split 66/34 video:left, notes/chat:right, sticky header timer.
- **Desktop (lg+):** 60/40 two‑pane; popout PiP self‑view; shortcuts (M, V, ⇧S share).

**Controls:** mute, cam, share, device, captions, end; **timer** + 2‑min warning; **panic** link to emergency protocols.

### C. Session Quality & Fallbacks

- Daily **SIMULCAST/VP9→H264** adapt; audio priority; auto **audio‑only** fallback under low bw.
- Auto reconnect with banner; connection stats panel (hidden) for support.

### D. Post‑Session Wrap (T+0 → T+10m)

- Auto create **note template** (date/duration/attendance prefilled) in `client_session_notes` table.
- [CHANGED] Recording functionality not implemented.
- [CHANGED] Payment processing not implemented.
- Session status update in `appointments` table.

### [CHANGED] Tech Mapping

- **AuthZ:** Supabase Auth → Supabase RLS.
- **Live:** To be implemented with Daily.co.
- **Media:** To be implemented.
- **Analytics:** To be implemented.

### Acceptance (MVP)

- Join at **T‑10m**, connect ≤2s (p95).
- Captions **ON by default** for profile videos; consent gating for recording.
- Audio‑only fallback triggers automatically and is reversible by user.

---

## Flow 2 — Secure Communication & Messaging Hub (P1)

**Goal:** Boundaried, compliant messaging between sessions.

**Targets:** 99.9% delivery; clear boundaries; crisis escalation path.

**Phase:** P1 (post‑MVP) with future E2EE pilot behind flag.

### A. Threads & Boundaries

- Per **client‑therapist dyad** → 1..n threads (Topics).
- **Boundary guardrails:** link stripping/warnings; quiet hours; SLA hints (therapist‑set).
- **Crisis keywords** → escalation card with local resources.

### B. Compose → Deliver

- Rich text + attachments (virus‑scanned in Supabase Storage).
- Delivery: Realtime insert; push/email/SMS summaries configurable.
- Read receipts opt‑in; typing indicators optional.

### C. Security & Privacy

- Transport: TLS; at rest: AES‑256.
- **RLS:** sender or participants only.
- Optional **record‑level encryption** toggle (future); E2EE **not** in MVP.

### D. Admin/Moderation (as needed)

- **Flagged content queue** (videos/bios/messages).
- Read access for Admin only with audit reasons; immutable `audit_logs` entries.

### Tech Mapping

- **DB:** `messages` table with `content_enc`, `type`, `read_at`.
- **Realtime:** Supabase Realtime channels per thread.
- **Notif:** Resend/Twilio via Edge Functions.
- **Analytics:** PostHog `message_sent`, `message_read` (with PII scrub).

### Acceptance (P1)

- Message send/receive under **100ms p95** intra‑region.
- Boundary warning shown for off‑platform contact attempts.
- Crisis term triggers escalation card within 1s.

---

## Flow 3 — Payments & Financial Management

*Recommended implementation for this flow based on the existing codebase: Integrate Stripe Connect using the existing payment form components. Create Supabase Edge Functions for payment processing. Use the session_earnings table to track finances.*

**Goal:** Seamless charges; transparent payouts; low admin toil.

**Targets:** 99.5% success; weekly payouts; <0.5% disputes.

### A. Charging Models

- **[CHANGED] No chemistry calls implemented**
- **Sessions:** To implement Stripe **Destination Charges** → platform fee **15%**
- **Therapist subscription:** To implement £19.50/mo

### B. Booking → Charge

1. Use existing payment form UI
2. Implement Stripe integration via Edge Functions
3. Store payment data in existing tables

### C. Payouts & Reconciliation

- Implement **Stripe Connect** for therapist payouts
- Use existing session_earnings table structure
- Email receipts via Supabase Functions

### Tech Mapping

- Webhooks (Stripe): `checkout.session.completed`, `payment_intent.succeeded`, `invoice.paid|payment_failed`.
- Tables: `bookings`, `discounts`, `audit_logs`.
- Analytics: funnel (`booking_started`→`booking_confirmed`).

### Acceptance (MVP)

- Successful charge within 5s; receipts emailed in ≤2m.
- Therapist payout statement downloadable; discrepancy detection daily.
- Admin can refund with reason; audit record in ≤100ms.

---

## Responsiveness & Style Guide Notes (applies across flows)

- **Breakpoints:** xs<640, sm≥640, md≥768, lg≥1024, xl≥1280.
- **Containers:** md 720px, lg 960px, xl 1200px; gutters per token.
- **Radii:** buttons md (8px), cards lg (12px), tags xl (16px).
- **Touch targets:** min 44px; primary 56px.
- **Desktop (md+):** adopt split‑pane for information‑rich views; stacked on xs/sm.

## Security, Privacy, Compliance

- **RLS everywhere**; least‑privilege.
- **GDPR** ready; EU residency; DPIA completed.
- **Audit:** all admin mutations; impersonation events attributed (`acting_user_id`, `on_behalf_of_user_id`).

## Observability

- PostHog product events; QoS (connect time, bitrate) to metrics store.
- Alerting on call failure rate, webhook retries, payout failures.

---

## **Implementation Timeline & Next Steps**

This master PRD document serves as the comprehensive guide for building MindFolk's personality-first therapy matching platform. The document combines detailed user research, technical specifications, and implementation guidelines to ensure a cohesive and successful product launch.

### **Key Success Factors:**

1. **Video Quality**: Smooth, reliable video experiences are critical
2. **Matching Accuracy**: Personality-based algorithm must demonstrably improve outcomes
3. **Mobile-First Design**: Majority of users will access via mobile devices
4. **Therapist Onboarding**: Streamlined verification process to maintain satisfaction
5. **Payment Reliability**: Seamless financial transactions to build trust

### **Immediate Next Steps:**

1. **Phase 1: Foundation** (Weeks 1-3) - Core infrastructure and authentication
2. **Phase 2: Core Features** (Weeks 4-6) - Assessment, discovery, and booking flows
3. **Phase 3: Polish & Admin** (Weeks 7-9) - Admin tools, optimization, and launch preparation

This comprehensive PRD ensures all stakeholders have a clear understanding of the product vision, user needs, technical requirements, and implementation approach for MindFolk's successful market entry.

---

# **APPENDIX: Implementation Analysis Tables**

## **A. Implemented Features**

### **Client Features**

| Feature | Original PRD Spec | Current Implementation | Status | Remaining Work | Risks | Files to Amend |
|---------|------------------|----------------------|--------|----------------|-------|----------------|
| Assessment Flow | 9-screen personality questionnaire with video | Basic questionnaire without video | Partially implemented | Add progress indicators, improve UX | Low - structure exists | `/src/pages/client/Assessment.tsx` - enhance flow |
| Therapist Discovery | Tinder-style with video profiles | Grid/list view without video | Partially implemented | Add swipe gestures, video integration | Medium - requires video infrastructure | `/src/pages/client/Discover.tsx` - add swipe UI |
| Direct Booking | Chemistry calls + sessions | Direct session booking only | Partially implemented | Add payment processing | High - no payment integration | `/src/pages/client/BookAppointment.tsx` - Stripe integration |
| Favorites | Save therapists | Fully functional | Fully implemented | None | Low | None |
| Session Management | Complete lifecycle | View appointments only | Partially implemented | Add video sessions, payment | High - core features missing | `/src/pages/session/SessionRoom.tsx` - integrate video |

### **Therapist Features**

| Feature | Original PRD Spec | Current Implementation | Status | Remaining Work | Risks | Files to Amend |
|---------|------------------|----------------------|--------|----------------|-------|----------------|
| Dashboard | Comprehensive overview | Basic widgets with mock data | Partially implemented | Connect to live data | Low - UI complete | `/src/pages/therapist/Dashboard.tsx` - live data |
| Client Management | Full CRM system | Basic directory and notes | Partially implemented | Add clinical tools | Low - foundation exists | `/src/pages/therapist/Clients.tsx` - enhance features |
| Schedule Management | Calendar integration | Basic availability | Partially implemented | External calendar sync | Medium - requires OAuth | `/src/pages/therapist/Schedule.tsx` - add integrations |
| Analytics | Business intelligence | Charts with mock data | Partially implemented | Connect real metrics | Low - UI ready | `/src/pages/therapist/Business.tsx` - real data |
| Verification | Document upload & review | Basic status tracking | Partially implemented | Document handling | Medium - security concerns | `/src/pages/therapist/onboarding/*` - add uploads |

### **Admin Features**

| Feature | Original PRD Spec | Current Implementation | Status | Remaining Work | Risks | Files to Amend |
|---------|------------------|----------------------|--------|----------------|-------|----------------|
| User Management | Full CRUD operations | Basic viewing | Partially implemented | Add bulk operations | Low | `/src/pages/admin/Users.tsx` - add operations |
| Impersonation | Full preview mode | Context provider only | Partially implemented | Add audit trail | Medium - security | `/src/contexts/impersonation-context.tsx` - logging |
| Moderation | Content review system | UI framework only | Partially implemented | Implement workflows | Low - UI exists | `/src/pages/admin/Moderation.tsx` - add logic |
| Financial Oversight | Payment management | View bookings only | Partially implemented | Stripe integration | High - no payments | `/src/pages/admin/Bookings.tsx` - payment ops |

## **B. Additional Unimplemented Features**

### **Communication & Notification Features**

| Feature | Original PRD Spec | Recommended Implementation | Reasoning | To-Do List | Files to Create/Amend | Risks |
|---------|------------------|---------------------------|-----------|------------|----------------------|-------|
| Email Notifications | Resend integration | Supabase + Resend | Edge Functions ready | 1. Setup Resend account<br/>2. Create email templates<br/>3. Add triggers<br/>4. Test delivery | `/supabase/functions/email/` | Low - well-documented |
| SMS Notifications | Twilio integration | Twilio via Edge Functions | Critical for reminders | 1. Setup Twilio account<br/>2. Create SMS templates<br/>3. Add appointment reminders<br/>4. Test delivery | `/supabase/functions/sms/` | Low - standard integration |
| Push Notifications | Web Push API | Service Worker implementation | Engagement boost | 1. Setup service worker<br/>2. Request permissions<br/>3. Create notification service<br/>4. Test across browsers | `/src/sw.js`<br/>`/src/services/notifications/` | Medium - browser support |

### **Analytics & Monitoring Features**

| Feature | Original PRD Spec | Recommended Implementation | Reasoning | To-Do List | Files to Create/Amend | Risks |
|---------|------------------|---------------------------|-----------|------------|----------------------|-------|
| Platform Analytics | PostHog integration | PostHog with privacy focus | Product insights needed | 1. Setup PostHog account<br/>2. Add tracking SDK<br/>3. Define events<br/>4. Create dashboards | `/src/lib/analytics/` | Low - privacy compliant |
| Session Recording | User behavior tracking | PostHog session replay | UX improvements | 1. Enable session replay<br/>2. Add consent flow<br/>3. Configure privacy masks<br/>4. Test recording | `/src/components/consent/` | Medium - GDPR compliance |
| Error Monitoring | Sentry integration | Sentry for error tracking | Reliability improvement | 1. Setup Sentry<br/>2. Configure source maps<br/>3. Add error boundaries<br/>4. Create alerts | `/src/lib/sentry/` | Low - standard tool |

### **Advanced Features**

| Feature | Original PRD Spec | Recommended Implementation | Reasoning | To-Do List | Files to Create/Amend | Risks |
|---------|------------------|---------------------------|-----------|------------|----------------------|-------|
| Group Therapy | Multi-participant sessions | Extend Daily.co setup | Revenue expansion | 1. Update session types<br/>2. Modify booking flow<br/>3. Update video layout<br/>4. Test with multiple users | `/src/pages/session/GroupRoom.tsx` | High - complex UX |
| AI Matching | ML-enhanced matching | TensorFlow.js integration | Better matches | 1. Train model<br/>2. Deploy to Edge Functions<br/>3. A/B test results<br/>4. Monitor performance | `/supabase/functions/ml-match/` | High - accuracy concerns |
| Mobile Apps | React Native apps | Share web codebase | Market reach | 1. Setup React Native<br/>2. Port components<br/>3. Add native features<br/>4. App store submission | `/mobile/` | High - maintenance burden |

## **C. UI/Design System Aspects**

| Aspect | Original PRD Spec | Current Implementation | Changes | Files to Amend | Risks |
|--------|------------------|----------------------|---------|----------------|-------|
| Typography | Crimson Pro + Helvetica | Correctly implemented | None | None | None |
| Color System | Design tokens | All tokens implemented | None | None | None |
| Layout Components | Container, Stack, HStack | Fully implemented | None | None | None |
| Touch Targets | 44px minimum | Compliant | None | None | None |
| Responsive Design | Mobile-first | Correctly implemented | None | None | None |
| Tag System | 5 categories | Fully implemented | None | None | None |
| Accessibility | WCAG AA | Mostly compliant | Add aria-labels to some components | Various component files | Low |

## **D. User Flows/UX Aspects**

### **Implemented Flows**

| Flow | Original PRD Spec | Current Implementation | Changes | Files to Amend | Risks |
|------|------------------|----------------------|---------|----------------|-------|
| Client Onboarding | Video-heavy flow | Text-based assessment | Simplified, no video | None needed | None |
| Therapist Discovery | Swipe interface | Grid/list view | Traditional browsing | None needed | None |
| Therapist Onboarding | Video profile creation | Text profile only | No video requirement | None needed | None |
| Admin Workflows | Full moderation | Basic management | Simplified admin tools | None needed | None |

### **Unimplemented Flows**

| Flow | Original PRD Spec | Recommended Implementation | Reasoning | To-Do List | Files to Create/Amend | Risks |
|------|------------------|---------------------------|-----------|------------|----------------------|-------|
| Progress Tracking | Client progress dashboard | Extend client profile | Data structure exists | 1. Create progress UI<br/>2. Add metrics<br/>3. Build visualizations<br/>4. Test accuracy | `/src/pages/client/Progress.tsx` | Low |
| Crisis Support Flow | Emergency intervention | Add crisis detection | Safety critical | 1. Define crisis keywords<br/>2. Create escalation UI<br/>3. Add emergency contacts<br/>4. Test thoroughly | `/src/components/crisis/` | High - liability |
| Referral System | Therapist referrals | Add referral tracking | Growth mechanism | 1. Create referral codes<br/>2. Add tracking system<br/>3. Build rewards UI<br/>4. Test attribution | `/src/pages/referrals/` | Low |
| Insurance Claims | Superbill generation | Automated documentation | Revenue enabler | 1. Create claim templates<br/>2. Add CPT codes<br/>3. Build export system<br/>4. Validate compliance | `/src/pages/insurance/` | High - regulatory |

---

## **Summary of Key Recommendations**

### **Immediate Priorities (Week 1-2)**
1. **Payment Integration**: Critical for revenue - use Stripe with existing UI
2. **Video Sessions**: Core feature - integrate Daily.co with current session room
3. **Live Data**: Replace mock data in dashboards and analytics

### **Secondary Priorities (Week 3-4)**
1. **Email Notifications**: User engagement - implement with Resend
2. **Chemistry Calls**: Conversion improvement - extend appointment system
3. **Admin Tools**: Platform management - enhance existing pages

### **Future Enhancements (Post-MVP)**
1. **Video Profiles**: Differentiation - add after core features stable
2. **Messaging System**: Engagement - implement with Supabase Realtime
3. **Advanced Analytics**: Growth optimization - add PostHog or similar
4. **Mobile Apps**: Accessibility - React Native using existing components

### **Risk Mitigation Strategies**
1. **Payment Security**: Use Stripe's PCI-compliant infrastructure
2. **Video Reliability**: Implement fallback to audio-only mode
3. **Data Privacy**: Maintain strict RLS policies, add encryption
4. **Performance**: Implement caching, optimize database queries
5. **Testing**: Comprehensive test coverage before production

This comprehensive PRD ensures all stakeholders have a clear understanding of the product vision, user needs, technical requirements, and implementation approach for MindFolk's successful market entry.

---

## **APPENDIX E: Backlogged Features - Messaging System**

*Note: The in-app messaging feature between therapists and clients has been backlogged for future implementation. This section preserves the original specification for when development resumes.*

### **Secure Messaging Hub**

| Feature | Description | Priority | Acceptance Criteria |
| --- | --- | --- | --- |
| **Secure Messaging Hub** | HIPAA-compliant communication | P1 | End-to-end encryption; Message threading; Rich text with attachments; Crisis escalation keywords; Professional boundary monitoring |

*Recommended implementation when ready: Use Supabase Realtime with RLS policies for secure messaging between matched client-therapist pairs. Create a messages table with proper foreign keys to profiles. Leverage existing authentication and role system for access control. Add end-to-end encryption for HIPAA compliance.*

### **Database Schema for Messaging**

```sql
-- In-app messaging (backlogged)
create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid,
  sender_id uuid references users(id),
  recipient_id uuid references users(id),
  message_text text not null,
  message_type text default 'text', -- text, file, assessment_link
  attachment_url text,
  is_read boolean default false,
  created_at timestamp with time zone default now()
);

-- Conversation threads
create table conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references users(id),
  therapist_id uuid references users(id),
  last_message_at timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);
```

### **Implementation Considerations**

1. **Security & Compliance**
   - End-to-end encryption for all messages
   - HIPAA compliance for health information
   - Message retention policies
   - Audit logging for compliance

2. **Professional Boundaries**
   - Automated boundary detection
   - Time-based messaging restrictions
   - Crisis keyword detection and escalation
   - Therapist availability indicators

3. **Technical Architecture**
   - Supabase Realtime for live updates
   - Message queuing for offline support
   - File attachment handling via Storage
   - Push notifications integration

4. **User Experience**
   - Thread-based conversations
   - Read receipts and typing indicators
   - Message search and filtering
   - Attachment preview and download

5. **Moderation & Safety**
   - Content scanning for inappropriate material
   - Report functionality for users
   - Admin review queue for flagged content
   - Emergency escalation protocols