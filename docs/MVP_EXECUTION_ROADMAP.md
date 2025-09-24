# **MINDFOLK MVP EXECUTION ROADMAP**
*From Current State to Production-Ready*

## **Executive Summary**
Current Overall Completion: **~15%**  
Target: **Production-Ready MVP**  
Timeline: **8-10 weeks with 2-3 developers**  
Critical Blockers: **GDPR compliance, Video profiles, Payment + Chemistry calls, Video sessions**  
**NEW P0 PRIORITIES:** Compliance first, Content safety, Professional verification, Chemistry call conversion

---

## **PHASE 1: FOUNDATION & COMPLIANCE (Week 1-2)**
*Compliance-first approach with quick wins*

### **Sprint 1.1: Compliance & Trust (P0 - CRITICAL)**
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| **Create audit trail table & logging** | 0% | 100% | 8h | **P0 - Legal compliance** |
| **GDPR export/deletion Edge Functions** | 0% | 100% | 12h | **P0 - UK compliance** |
| **Create moderation_queue table** | 0% | 100% | 4h | **P1 - Safety critical** |
| **Basic keyword detection system** | 0% | 100% | 6h | **P1 - Content safety** |
| **Therapist doc preview (Storage)** | 10% | 100% | 6h | **Professional verification** |
| **Decision reasons UI** | 50% | 100% | 4h | **Trust/transparency** |
| **Impersonation logging in audit_trail** | 0% | 100% | 6h | **Security & support** |
| Add RLS policies to `favorites` table | 40% | 100% | 2h | Enables favorites |
| Add RLS policies to `support_tickets` table | 30% | 100% | 2h | Support system |
| Create `notifications` table with RLS | 0% | 100% | 4h | Foundation for comms |

#### **AI Execution Guide: Sprint 1.1**
**Model:** Claude Opus 4.1 (Thinking) - Superior at complex database design with security considerations and compliance requirements.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 1.1 (Compliance & Trust) for Mindfolk therapy platform.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person, not a team
- I am completely non-technical 
- I have ADHD - please give me VERY clear, step-by-step instructions
- Explain things like I'm 5 years old
- The Supabase MCP lets you QUERY/READ data but CANNOT make changes
- You can run SELECT queries to look at data
- I must manually copy and paste any SQL changes into my Supabase Dashboard

FILES YOU SHOULD READ:
- Read the PRD at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Use mcp0_list_tables to see all tables
- Use mcp0_execute_sql to query data (SELECT statements only)
- Current migration files are in: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\supabase\migrations\

DELIVERABLES (create these files for me to use):
1. File: supabase/migrations/[timestamp]_audit_trail_and_gdpr.sql
   - CREATE TABLE audit_trail (id, user_id, action, table_name, record_id, old_data JSONB, new_data JSONB, ip_address, user_agent, created_at)
   - CREATE TABLE moderation_queue (id, content_type, content_id, reported_by, reason, status, reviewed_by, reviewed_at)
   - CREATE TABLE notifications (id, user_id, type, title, message, data JSONB, read, created_at)
   - Add RLS policies for each table
   - Create trigger for automatic audit logging on profiles, therapist_profiles, appointments tables

2. File: supabase/functions/gdpr-export/index.ts
   - Export all user data as JSON
   - Include data from: profiles, therapist_profiles, client_assessments, appointments, session_earnings
   - Must be callable by authenticated user for their own data

3. File: supabase/functions/gdpr-delete/index.ts  
   - Soft delete user account (set deleted_at timestamp)
   - Anonymize personal data but keep aggregated stats
   - Log deletion in audit_trail

4. File: supabase/functions/content-moderation/index.ts
   - Basic keyword detection for prohibited terms
   - Auto-flag content containing: violence, self-harm, inappropriate content
   - Add flagged items to moderation_queue

5. Update existing files:
   - ADD impersonation logging trigger to audit_trail (supabase/migrations/[new_timestamp]_impersonation_logging.sql)
   - ADD RLS to favorites table (supabase/migrations/[new_timestamp]_favorites_rls.sql)
   - ADD RLS to support_tickets table (supabase/migrations/[new_timestamp]_support_tickets_rls.sql)

CONSTRAINTS:
- Only create files in supabase/migrations/ and supabase/functions/
- Do NOT modify any existing React components
- All SQL must be reversible (include DROP statements in comments)
- Edge functions must use Deno/TypeScript
- Must follow existing RLS patterns from other tables

ACCEPTANCE CRITERIA (tell me how to check each one):
✓ All 5 new tables created with proper columns
✓ RLS policies allow users to see own data, admins see all
✓ Audit trail automatically logs changes
✓ GDPR export returns complete user data as JSON
✓ GDPR delete anonymizes data properly
✓ Content moderation flags inappropriate content
✓ Favorites and support_tickets have RLS

HOW TO HELP ME:
1. Create the SQL file - I will copy it to Supabase Dashboard
2. Create the Edge Function files - I will deploy them
3. Tell me EXACTLY what to click and where in simple steps
4. Check your work using MCP queries and tests after I apply changes
```

### **Sprint 1.2: Video Profiles & Quick Wins**


---

| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
```

| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| **Setup Cloudflare Stream API** | 0% | 100% | 4h | **P0 - Personality-first** |
| **Add video upload to therapist profiles** | 0% | 100% | 8h | **P0 - Core differentiator** |
| **Create video player component** | 0% | 100% | 6h | **P0 - Discovery experience** |
| Connect therapist income tracking to `session_earnings` | 40% | 100% | 4h | Financial visibility |
| Connect analytics dashboard to real `therapist_analytics` | 30% | 100% | 8h | Business intelligence |
| Add `decision_reason` field usage in UI | 50% | 100% | 4h | Verification workflow |

#### **AI Execution Guide: Sprint 1.2**
**Model:** Claude 3.7 Sonnet (Thinking) - Excellent for React components with third-party integrations like Cloudflare.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 1.2 (Video Profiles & Quick Wins) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click

FILES YOU SHOULD READ:
- Read the PRD at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Design system at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\styles\design-tokens.css
- Therapist profile component: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\components\therapist\TherapistProfileForm.tsx
- Admin verification: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\admin\TherapistApplications.tsx

DELIVERABLES:
1. File: supabase/functions/cloudflare-stream/index.ts
   - Setup Cloudflare Stream API integration
   - Handle video upload with 2-minute max duration
   - Return video URL to store in therapist_profiles.video_url
   - Add file size validation (max 500MB)

2. File: src/components/therapist/VideoUpload.tsx
   - React component for video recording/upload
   - Use browser MediaRecorder API for recording
   - Show preview before upload
   - Progress bar during upload
   - Must use design tokens from design-tokens.css

3. File: src/components/discovery/VideoPlayer.tsx
   - React component for playing therapist intro videos
   - Cloudflare Stream player embed
   - Fallback to static image if no video
   - Accessibility: captions support, keyboard controls

4. Update: src/components/therapist/TherapistProfileForm.tsx
   - Add VideoUpload component to the form
   - Save video_url to database

5. Update: src/pages/admin/TherapistApplications.tsx
   - Add decision_reason textarea when approving/rejecting
   - Display uploaded documents with preview
   - Save decision_reason to therapist_applications table

6. Update: src/hooks/useTherapistAnalytics.ts
   - Connect to real therapist_analytics table
   - Replace mock data with actual queries
   - Show real income from session_earnings

CONSTRAINTS:
- Use existing component patterns and hooks
- All components must use design tokens (var(--color-primary), var(--spacing-md), etc.)
- Must be mobile-responsive
- Keep Cloudflare API keys in environment variables
- Do NOT create new pages, only components

ACCEPTANCE CRITERIA (I'll test each one):
✓ Therapists can record/upload 2-minute intro videos
✓ Videos display in discovery flow
✓ Admin can see document previews
✓ Decision reasons are saved and displayed
✓ Analytics show real data from database
✓ All components are accessible and responsive

REMEMBER:
- All supabase changes will be made by me wtihin the supabase browser interface. You just need to tell me step-by-step what I should copy and where I should paste it within the superbase interface
- Create files for me to use
- Tell me step-by-step how to test
- Use simple words
- One instruction at a time

First, reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

**Phase 1 Deliverables:** GDPR compliant, moderation ready, therapist verification professional, video profiles working

---

### **Sprint 1.3: Admin Management & Ops (P1)**
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| **Role change actions (suspension / delete)** | 10% | 100% | 6h | User management |
| **Bulk operations UI (checkbox batch)** | 0% | 100% | 6h | Admin efficiency |
| **Profile timeline (auth event tracking)** | 0% | 100% | 8h | Auditability |
| **Decision audit trail trigger** | 30% | 100% | 4h | Accountability |
| **Moderation inbox wiring** | 40% | 100% | 8h | Content safety |
| **Media preview panels** | 0% | 100% | 6h | Verification UX |
| **Policy reference docs page** | 0% | 100% | 4h | Clarity |
| **Remove/Escalate moderation actions** | 0% | 100% | 6h | Safety compliance |
| **All platform analytics (real data)** | 20% | 100% | 6h | Insights |

#### **AI Execution Guide: Sprint 1.3**
**Model:** Claude 3 Sonnet – Balanced reasoning & code generation for admin dashboards.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 1.3 (Admin Management & Ops) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I work alone and need baby-step instructions
- Supabase MCP is READ-ONLY; you provide files/migrations I can copy
- Follow design tokens & existing UI patterns

FILES TO READ:
- PRD: docs/MINDFOLK_PRD.md
- Admin pages: src/pages/admin/*
- Hooks: src/hooks/useAdmin*

DELIVERABLES:
1. Migration: add auth_event table + triggers; add role_status field; create audit trigger for decisions
2. React components: BulkOperationsPanel.tsx, TimelineView.tsx, MediaPreview.tsx
3. Update existing admin pages to import new components
4. Docs page: /docs/policies.mdx for policy reference

CONSTRAINTS:
- Use existing shadcn/ui components
- All SQL reversible
- No breaking changes to current tables

ACCEPTANCE CRITERIA:
✓ Admin can change roles, suspend, delete users
✓ Bulk checkbox actions work
✓ Profile timeline shows auth events
✓ Moderation inbox displays live data & media previews
✓ Analytics page shows real metrics
```

## **PHASE 2: CORE COMMUNICATIONS (Week 3-4)**
*Establish notification infrastructure before features that depend on it*

### **Sprint 2.1: Email Infrastructure (P0)**
```typescript
// Priority: CRITICAL - Blocks appointments, verifications, reminders
```
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| Setup Resend account & API keys | 0% | 100% | 1h | Unblocks all email |
| Create Edge Function for email sending | 0% | 100% | 8h | Email capability |
| Design 5 core email templates | 0% | 100% | 8h | Professional comms |
| - Booking confirmation | | | | |
| - Appointment reminder | | | | |
| - Therapist approval/rejection | | | | |
| - Welcome emails | | | | |
| - Password reset (exists) | | | | |
| Create `email_logs` table | 0% | 100% | 2h | Compliance tracking |

#### **AI Execution Guide: Sprint 2.1**
**Model:** Claude 3.5 Sonnet - Optimal for API integrations and email template design.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 2.1 (Email Infrastructure) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click
- I need exact instructions: "Click this button" "Copy this text" "Paste it here"

WHAT YOU SHOULD CHECK:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Look at existing tables with: mcp0_list_tables (you can only READ)
- Email templates should match brand colors from: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\styles\design-tokens.css

DELIVERABLES:
1. File: supabase/migrations/[timestamp]_email_logs.sql
   - CREATE TABLE email_logs (id, recipient, subject, template, sent_at, status, error, metadata JSONB)
   - Add RLS policies (users see own emails, admins see all)

2. File: supabase/functions/send-email/index.ts
   - Integrate Resend API (use RESEND_API_KEY env var)
   - Accept: to, subject, template_name, data
   - Log all emails to email_logs table
   - Handle errors gracefully

3. Create these email templates in: supabase/functions/send-email/templates/
   - booking-confirmation.html (appointment details, therapist name, date/time, video link)
   - appointment-reminder.html (24hr and 1hr before session)
   - therapist-approved.html (welcome to platform, next steps)
   - therapist-rejected.html (decision reason, appeal process)
   - welcome-client.html (assessment complete, browse therapists)

4. File: .env.local (add these keys)
   - RESEND_API_KEY=your_key_here
   - EMAIL_FROM=noreply@mindfolk.com

5. File: src/lib/email.ts
   - Client-side helper to call send-email function
   - Types for each template
   - Error handling

CONSTRAINTS:
- HTML emails must be responsive
- Use inline CSS for email compatibility
- Include unsubscribe link in all emails
- Test with Resend test mode first
- Do NOT send real emails until approved

ACCEPTANCE CRITERIA (how I know it works):
✓ Email logs table created with RLS
✓ Send-email function connects to Resend
✓ All 5 templates created and styled
✓ Emails log to database
✓ Test email sends successfully
✓ Error handling works properly

WHAT YOU MUST DO:
1. Create SQL file - I copy to Supabase
2. Create Edge Function - I deploy it
3. Create email templates - I use them
4. Show me how to test step-by-step and remember that YOU can test Supabase via the MCP server

REMEMBER:
- All supabase changes will be made by me wtihin the supabase browser interface. You just need to tell me step-by-step what I should copy and where I should paste it within the superbase interface
- Create files for me to use
- Tell me step-by-step how to test
- Use simple words
- One instruction at a time
- Remember that YOU can test Supabase via the MCP server


FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

### **Sprint 2.2: SMS Infrastructure (P0)**
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| Setup Twilio account with UK numbers | 0% | 100% | 2h | SMS capability |
| Create Edge Function for SMS | 0% | 100% | 6h | Appointment reminders |
| Add phone validation | 0% | 100% | 4h | Data quality |
| Implement opt-in/opt-out | 0% | 100% | 4h | GDPR compliance |

#### **AI Execution Guide: Sprint 2.2**
**Model:** GPT-4o - Strong at API integrations with clear documentation like Twilio.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 2.2 (SMS Infrastructure) for Mindfolk UK therapy platform.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click
- Give me exact instructions: "Click here" "Type this" "Paste there"

CONTEXT TO CHECK:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- UK phone numbers format: +44 7XXX XXXXXX
- Look at profiles table with MCP (REMEMBER: you can only READ)
- SMS consent must be GDPR compliant

DELIVERABLES:
1. File: supabase/migrations/[timestamp]_sms_preferences.sql
   - ALTER TABLE profiles ADD COLUMN sms_consent BOOLEAN DEFAULT false
   - ALTER TABLE profiles ADD COLUMN phone_verified BOOLEAN DEFAULT false
   - CREATE TABLE sms_logs (id, recipient, message, sent_at, status, error, cost)
   - Add RLS policies

2. File: supabase/functions/send-sms/index.ts
   - Integrate Twilio API (use TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
   - Validate UK phone numbers
   - Check sms_consent before sending
   - Log to sms_logs table
   - Calculate and track costs

3. File: supabase/functions/verify-phone/index.ts
   - Send verification code via SMS
   - Store code temporarily (5 min expiry)
   - Verify code and update phone_verified

4. File: src/components/settings/SMSPreferences.tsx
   - Toggle for SMS consent
   - Phone number input with UK format
   - Verify phone button
   - Clear opt-out message

5. Update: .env.local
   - TWILIO_ACCOUNT_SID=your_sid
   - TWILIO_AUTH_TOKEN=your_token
   - TWILIO_PHONE_NUMBER=+44XXXXXXXXXX

CONSTRAINTS:
- Only send to UK numbers (+44)
- Max 160 characters per SMS
- Include opt-out in every message: "Reply STOP to opt out"
- Handle STOP replies automatically
- Test with Twilio test credentials first

ACCEPTANCE CRITERIA (I'll check each one):
✓ Phone verification works
✓ SMS only sends with consent
✓ UK number validation works
✓ Opt-out process works
✓ SMS logs track all messages
✓ Costs are calculated correctly

WHAT YOU NEED TO DO:
1. Create SQL file - I'll copy to Supabase Dashboard
2. Create SMS Edge Functions - I'll deploy them
3. Create React component - I'll use it
4. Tell me EXACTLY how to set up Twilio (every click)
5. Give me simple test steps - and - Remember that YOU can test Supabase via the MCP server

REMEMBER:
- All supabase changes will be made by me wtihin the supabase browser interface. You just need to tell me step-by-step what I should copy and where I should paste it within the superbase interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

### **Sprint 2.3: Automated Scheduling**
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| Enable pg_cron extension | 0% | 100% | 1h | Scheduled jobs |
| Create reminder cron jobs | 0% | 100% | 6h | Automated reminders |
| Test notification delivery | 0% | 100% | 4h | Reliability |
| **Client status management (relationship statuses dashboard)** | 0% | 100% | 6h | Client organisation |

#### **AI Execution Guide: Sprint 2.3**
**Model:** DeepSeek R1 - Excellent at complex scheduling logic and cron patterns.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 2.3 (Automated Scheduling) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click
- Tell me exactly what to click, where to go, what to type

CHECK THIS FIRST:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Look at appointments table with MCP (you can only READ)
- Platform operates in UK timezone (GMT/BST)
- Cron jobs run on Supabase infrastructure

DELIVERABLES:
1. File: supabase/migrations/[timestamp]_enable_pg_cron.sql
   - Enable pg_cron extension
   - Grant permissions
   - Create job tracking table

2. File: supabase/migrations/[timestamp]_reminder_cron_jobs.sql
   - 24-hour reminder cron (daily at 10am)
   - 1-hour reminder cron (every hour)
   - Weekly therapist summary (Mondays 9am)
   - Missed appointment follow-up (15 min after start)

3. File: supabase/functions/process-reminders/index.ts
   - Called by cron jobs
   - Query upcoming appointments
   - Send appropriate emails/SMS
   - Mark reminders as sent
   - Handle timezone conversions

4. File: src/utils/scheduling.ts
   - Helper functions for timezone handling
   - Format appointment times for UK users
   - Calculate reminder times

5. Testing file: supabase/tests/reminders.test.sql
   - Test data for appointments
   - Verify cron job execution
   - Check reminder logic

CONSTRAINTS:
- All times in UK timezone
- Don't send reminders for cancelled appointments
- Respect notification preferences
- Maximum 2 reminders per appointment
- Include error recovery

ACCEPTANCE CRITERIA (how I test):
✓ pg_cron enabled successfully
✓ Cron jobs created and scheduled
✓ 24-hour reminders send correctly
✓ 1-hour reminders send correctly
✓ Missed appointment alerts work
✓ Timezone handling is correct
✓ No duplicate reminders sent

YOUR TASKS:
1. Create SQL files for cron setup - I paste in Supabase
2. Create reminder Edge Function - I deploy it
3. Show me how to check if cron is working
4. Give me test steps a child could follow

REMEMBER:
- All supabase changes will be made by me wtihin the supabase browser interface. You just need to tell me step-by-step what I should copy and where I should paste it within the superbase interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

**Phase 2 Deliverables:** Full email/SMS capability, automated reminders

---

## **PHASE 3: PAYMENT INFRASTRUCTURE (Week 5-6)**
*Enable revenue generation*

### **Sprint 3.1: Stripe Foundation (P0)**
```typescript
// Priority: CRITICAL - No revenue without this
```
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| Create Stripe account & configure | 0% | 100% | 2h | Payment capability |
| Setup Stripe Connect for therapists | 20% | 100% | 16h | Therapist payouts |
| Create payment processing Edge Functions | 20% | 100% | 16h | Secure payments |
| Implement webhook handlers | 0% | 100% | 8h | Payment tracking |
| Connect to `session_earnings` table | 20% | 100% | 4h | Financial records |

#### **AI Execution Guide: Sprint 3.1**
**Model:** Claude Opus 4 (BYOK) - Best for complex payment infrastructure with security requirements.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 3.1 (Stripe Foundation) for Mindfolk UK therapy platform.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click
- Tell me EXACTLY where to click, what to type

CONTEXT TO CHECK:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Look at session_earnings table with: mcp0_execute_sql (REMEMBER: READ-ONLY)
- UK pricing in GBP, platform takes 20% commission
- Therapists need Stripe Connect accounts for payouts
- Check existing payment UI at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\components\payment\

DELIVERABLES:
1. File: supabase/migrations/[timestamp]_stripe_integration.sql
   - ALTER TABLE therapist_profiles ADD stripe_account_id TEXT
   - ALTER TABLE appointments ADD payment_intent_id TEXT
   - ALTER TABLE appointments ADD payment_status TEXT
   - CREATE TABLE payment_methods (id, user_id, stripe_payment_method_id, last4, brand, is_default)
   - Add RLS policies

2. File: supabase/functions/create-payment-intent/index.ts
   - Create Stripe PaymentIntent for appointment
   - Calculate platform fee (20%)
   - Set therapist as destination for remaining 80%
   - Return client_secret to frontend
   - Store payment_intent_id in appointments

3. File: supabase/functions/stripe-webhook/index.ts
   - Handle payment_intent.succeeded
   - Update appointment payment_status
   - Create session_earnings record
   - Handle payment_intent.failed
   - Log all events

4. File: supabase/functions/therapist-onboarding/index.ts
   - Create Stripe Connect account
   - Generate onboarding link
   - Store stripe_account_id
   - Check account status

5. File: src/lib/stripe.ts
   - Initialize Stripe.js
   - Helper functions for payments
   - Types for Stripe objects

6. Update: .env.local
   - STRIPE_SECRET_KEY=sk_test_...
   - STRIPE_PUBLISHABLE_KEY=pk_test_...
   - STRIPE_WEBHOOK_SECRET=whsec_...
   - STRIPE_CONNECT_CLIENT_ID=ca_...

CONSTRAINTS:
- Use Stripe test mode initially
- All amounts in pence (£60 = 6000)
- PCI compliance - never store card details
- Use Stripe Elements in frontend
- Implement idempotency keys

ACCEPTANCE CRITERIA (I'll test each):
✓ Payment intent creation works
✓ Webhook receives events
✓ Session earnings auto-calculate
✓ Therapist onboarding flow works
✓ Test payment succeeds
✓ Failed payments handled correctly

YOUR JOB:
1. Create SQL migration file - I'll paste in Supabase
2. Create Edge Functions - I'll deploy them
3. Tell me EXACTLY how to set up Stripe (which buttons to click)
4. Give me test steps that a 5-year-old could follow

REMEMBER:
- All supabase changes will be made by me wtihin the supabase browser interface. You just need to tell me step-by-step what I should copy and where I should paste it within the superbase interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

### **Sprint 3.2: Payment Flows & Chemistry Calls**
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| **Implement chemistry call (free) system** | 10% | 100% | 12h | **P0 - USP conversion** |
| **Chemistry call booking UI** | 10% | 100% | 8h | **Trial before commit** |
| **Free → paid conversion tracking** | 0% | 100% | 6h | **Business metrics** |
| Wire up existing payment UI components | 20% | 100% | 8h | Checkout flow |
| Add Stripe Elements to forms | 0% | 100% | 6h | Card input |
| Create invoice generation | 0% | 100% | 8h | Tax compliance |
| Test chemistry call → payment flow | 0% | 100% | 8h | End-to-end testing |

#### **AI Execution Guide: Sprint 3.2**
**Model:** Claude 3.7 Sonnet (Thinking) - Excellent for complex UI flows with payment integration.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 3.2 (Payment Flows & Chemistry Calls) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click
- Tell me EXACTLY where to click/type/paste

CONTEXT TO READ:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Chemistry calls are FREE 15-minute video sessions
- After chemistry call, clients can book paid sessions
- Payment form exists at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\components\payment\PaymentForm.tsx
- Booking page at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\client\BookingPage.tsx

DELIVERABLES:
1. File: supabase/migrations/[timestamp]_chemistry_calls.sql
   - ALTER TABLE appointments ADD is_chemistry_call BOOLEAN DEFAULT false
   - Add constraint: chemistry calls max 15 minutes
   - Create conversion_tracking table (chemistry_appointment_id, paid_appointment_id, converted_at)

2. File: src/components/booking/ChemistryCallBooking.tsx
   - Special booking flow for chemistry calls
   - No payment required
   - 15-minute slots only
   - One chemistry call per therapist limit
   - Clear "FREE" badge

3. Update: src/pages/client/BookingPage.tsx
   - Add chemistry call option
   - Show "Book Chemistry Call" if never had one
   - Show "Book Session" if had chemistry call
   - Pass is_chemistry_call flag

4. Update: src/components/payment/PaymentForm.tsx
   - Skip payment for chemistry calls
   - Wire up Stripe Elements
   - Add card input with validation
   - Show amount clearly (GBP)
   - Handle 3D Secure

5. File: src/components/booking/ConversionTracker.tsx
   - Track chemistry → paid conversion
   - Show conversion rate in analytics
   - Identify drop-off points

6. File: src/utils/invoicing.ts
   - Generate invoice after payment
   - Include VAT if applicable
   - Email to client
   - Store in database

7. Testing file: cypress/e2e/chemistry-conversion.cy.ts
   - Test chemistry call booking
   - Test paid booking after chemistry
   - Test payment flow
   - Verify conversion tracking

CONSTRAINTS:
- Chemistry calls MUST be free
- Maximum one chemistry call per therapist-client pair
- Use existing design tokens
- Mobile-responsive checkout
- Clear pricing display

ACCEPTANCE CRITERIA (I'll verify):
✓ Chemistry calls book without payment
✓ Paid sessions require payment
✓ Conversion tracking works
✓ Stripe Elements integrated
✓ 3D Secure handled
✓ Invoice generated
✓ End-to-end test passes

WHAT YOU DO:
1. Create SQL migration - I paste in Supabase
2. Create React components - I add to app
3. Update existing pages - show me exactly what to change
4. Create test file - I run tests
5. Give me click-by-click test instructions

REMEMBER:
- All supabase changes will be made by me wtihin the supabase browser interface. You just need to tell me step-by-step what I should copy and where I should paste it within the superbase interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

**Phase 3 Deliverables:** Full payment processing, chemistry calls working, conversion tracking ready

---

## **PHASE 4: VIDEO INFRASTRUCTURE (Week 7)**
*Enable core therapy delivery*

### **Sprint 4.1: Daily.co Integration (P0)**
```typescript
// Priority: CRITICAL - Cannot deliver therapy without video
```
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| Create Daily.co account | 0% | 100% | 1h | Video capability |
| Install @daily-co/daily-js SDK | 5% | 100% | 1h | Client library |
| Create room token Edge Function | 5% | 100% | 8h | Secure rooms |
| Wire up existing SessionRoom UI | 5% | 100% | 12h | Video interface |
| Add device selection/testing | 0% | 100% | 8h | User experience |
| Add `meeting_url` to appointments | 0% | 100% | 2h | Room tracking |
| Test video calls end-to-end | 0% | 100% | 6h | Quality assurance |

#### **AI Execution Guide: Sprint 4.1**
**Model:** GPT-4 (high reasoning) - Excellent for WebRTC integration with clear SDK documentation.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 4.1 (Daily.co Video Integration) for Mindfolk therapy platform.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click

CONTEXT FILES:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Session room UI exists at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\session\SessionRoom.tsx
- Look at appointments table with MCP (REMEMBER: READ-ONLY)
- Video calls are 50-minute therapy sessions
- Chemistry calls are 15-minute sessions

DELIVERABLES:
1. File: supabase/migrations/[timestamp]_daily_integration.sql
   - ALTER TABLE appointments ADD meeting_url TEXT
   - ALTER TABLE appointments ADD room_name TEXT UNIQUE
   - ALTER TABLE appointments ADD actual_start_time TIMESTAMPTZ
   - ALTER TABLE appointments ADD actual_end_time TIMESTAMPTZ

2. File: supabase/functions/create-video-room/index.ts
   - Create Daily.co room for appointment
   - Set expiry time (session time + 10 minutes buffer)
   - Generate unique room name
   - Return meeting URL
   - Store in appointments table

3. File: supabase/functions/get-room-token/index.ts
   - Generate JWT token for room access
   - Include user name and role
   - Set appropriate permissions
   - Expire after session ends

4. Update: src/pages/session/SessionRoom.tsx
   - Import Daily.co SDK (@daily-co/daily-js)
   - Initialize Daily client
   - Join room with token
   - Show loading state
   - Handle connection errors

5. File: src/components/session/VideoControls.tsx
   - Mute/unmute audio
   - Enable/disable video
   - Screen sharing toggle
   - Leave call button
   - Network quality indicator

6. File: src/components/session/DeviceSelector.tsx
   - List available cameras
   - List available microphones
   - Test audio/video before joining
   - Save preferences

7. File: src/components/session/WaitingRoom.tsx
   - Show before session starts
   - Device check
   - "Join Now" appears 5 min before
   - Countdown timer

8. Update: .env.local
   - DAILY_API_KEY=your_key
   - DAILY_DOMAIN=your_domain.daily.co

CONSTRAINTS:
- Use Daily.co prebuilt UI initially
- Ensure HIPAA compliance mode
- Auto-end rooms after session time
- Record sessions only with consent
- Mobile-responsive video UI

ACCEPTANCE CRITERIA (I'll test):
✓ Video room creates for appointment
✓ Both participants can join
✓ Audio/video controls work
✓ Device selection works
✓ Waiting room shows correctly
✓ Session ends automatically
✓ Mobile video works

YOUR JOB:
1. Create SQL migration - I paste to Supabase
2. Create Edge Functions - I deploy them
3. Update SessionRoom page - show me exact changes
4. Create video components - I add them
5. Tell me how to set up Daily.co (every single click)
6. Give me simple test steps

REMEMBER:
- All supabase changes will be made by me wtihin the supabase browser interface. You just need to tell me step-by-step what I should copy and where I should paste it within the superbase interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

**Phase 4 Deliverables:** Working video therapy sessions

---

## **PHASE 5: MVP POLISH (Week 8)**
*Complete remaining critical P1 features*

### **Sprint 5.1: Essential P1 Features**
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| Support ticket UI | 30% | 100% | 8h | **Customer service (P1)** |
| GAD-7/PHQ-9 forms | 5% | 100% | 8h | Clinical tools (P1) |
| Session note templates | 20% | 100% | 6h | Therapist efficiency (P1) |
| Moderation queue UI | 5% | 100% | 8h | **Content safety (P1)** |
| Basic report/flag system | 0% | 100% | 6h | **User safety (P1)** |
| Calendar sync preparation | 10% | 100% | 8h | Therapist adoption (P1) |

#### **AI Execution Guide: Sprint 5.1**
**Model:** Claude 3.5 Sonnet - Good balance for UI components and database queries.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 5.1 (Essential P1 Features) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click

CONTEXT TO CHECK:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Support tickets table exists, needs UI
- Clinical tools needed for professional therapy
- Moderation for safety
- Look at existing tables with MCP (REMEMBER: READ-ONLY)

DELIVERABLES:
1. Update: src/pages/client/Support.tsx
   - Create ticket form (subject, category, description)
   - List user's tickets
   - Show ticket status
   - Add reply functionality
   - Upload screenshots

2. File: src/components/clinical/GAD7Form.tsx
   - GAD-7 anxiety assessment form
   - 7 questions with 0-3 scale
   - Calculate total score
   - Show severity interpretation
   - Save to client_session_notes

3. File: src/components/clinical/PHQ9Form.tsx
   - PHQ-9 depression assessment form
   - 9 questions with 0-3 scale
   - Calculate total score
   - Risk assessment for Q9
   - Save to client_session_notes

4. Update: src/pages/therapist/SessionNotes.tsx
   - Add template dropdown
   - Templates: Initial Assessment, Progress Note, Discharge Summary
   - Auto-populate structure
   - Save templates for reuse
   - Include GAD-7/PHQ-9 scores

5. File: src/pages/admin/ModerationQueue.tsx
   - Display flagged content from moderation_queue
   - Show content preview
   - Approve/reject buttons
   - Add moderator notes
   - Ban user option

6. File: src/components/safety/ReportContent.tsx
   - Report button on profiles/content
   - Reason selection
   - Additional details textarea
   - Submit to moderation_queue

7. File: src/utils/calendar-sync.ts
   - Preparation for Google Calendar API
   - OAuth2 flow setup
   - Token storage structure
   - API wrapper functions
   - (Full implementation post-MVP)

CONSTRAINTS:
- Clinical forms must follow standard formats
- All data must be encrypted
- Moderation actions need audit trail
- Support tickets need email notifications
- Use existing design tokens

ACCEPTANCE CRITERIA (I verify each):
✓ Support tickets can be created/viewed
✓ GAD-7 form calculates correctly
✓ PHQ-9 form with risk assessment
✓ Session note templates work
✓ Moderation queue displays flagged items
✓ Report content flow works
✓ Calendar sync structure ready

WHAT YOU MUST DO:
1. Create/update React pages - I add to app
2. Create clinical form components - I use them
3. Create moderation UI - I deploy it
4. Show me exactly what to change in existing files
5. Give me test steps I can follow easily

REMEMBER:
- All supabase changes will be made by me wtihin the supabase browser interface. You just need to tell me step-by-step what I should copy and where I should paste it within the superbase interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

### **Sprint 5.2: Testing & Launch Prep**
| Task | Current % | Target % | Effort | Impact |
|------|-----------|----------|--------|--------|
| End-to-end testing all flows | 0% | 100% | 16h | Quality |
| Security audit | 0% | 100% | 8h | Compliance |
| Performance testing | 0% | 100% | 8h | Reliability |
| Launch checklist | 0% | 100% | 4h | Go-live ready |

#### **AI Execution Guide: Sprint 5.2**
**Model:** o3 (high reasoning) - Best for comprehensive testing and launch preparation.

**Prompt:**
```
You are helping me (a non-technical solo developer with ADHD) implement Sprint 5.2 (Testing & Launch Prep) for Mindfolk production launch.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase
- Tell me EXACTLY what to copy, where to paste it, what button to click

WHAT TO CHECK:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- All previous sprints completed
- Need comprehensive testing before launch
- UK market, GDPR compliance required
- Using Playwright for E2E tests

DELIVERABLES:
1. File: playwright/e2e/critical-paths.spec.ts
   - Client signup → assessment → browse → book
   - Therapist signup → verification → profile
   - Chemistry call → paid session conversion
   - Payment flow with 3D Secure
   - Video session join/leave

2. File: playwright/e2e/security-audit.spec.ts
   - Test RLS policies (try accessing others' data)
   - Test GDPR export/delete
   - Test audit trail logging
   - Check XSS vulnerabilities
   - Verify HTTPS everywhere

3. File: scripts/performance-test.ts
   - Load test matching algorithm
   - Test with 1000 therapists
   - Measure page load times
   - Check database query performance
   - Test video call quality

4. File: docs/LAUNCH_CHECKLIST.md
   - Environment variables set✓
   - Stripe in production mode ✓
   - Daily.co production account ✓
   - SSL certificates valid ✓
   - Backup strategy confirmed ✓
   - Support email configured ✓
   - Legal documents uploaded ✓
   - Admin accounts created ✓
   - Monitoring setup ✓
   - Error tracking (Sentry) ✓

5. File: docs/RUNBOOK.md
   - How to handle common issues
   - Database backup/restore
   - Rolling back deployments
   - Monitoring dashboards
   - Emergency contacts
   - Incident response plan

6. File: .env.production (template only)
   - All production environment variables
   - Comments explaining each
   - Validation requirements
   - Security notes

7. File: supabase/seed.sql
   - Seed data for testing
   - 10 verified therapists
   - 5 test clients
   - Sample appointments
   - Demo content

CONSTRAINTS:
- Tests must cover all P0 features
- Performance targets: <3s page load
- Security must pass OWASP top 10
- Documentation must be comprehensive
- All tests must pass before launch

ACCEPTANCE CRITERIA (final checks):
✓ All critical path tests pass
✓ Security audit finds no P0 issues
✓ Performance meets targets
✓ Launch checklist 100% complete
✓ Runbook covers common scenarios
✓ Production env configured
✓ Seed data works correctly

YOUR TASKS:
1. Create all test files - I run them
2. Create launch checklist - I follow it
3. Create runbook - I use for problems
4. Create seed data - I load it
5. Remember that YOU can test Supabase via the MCP server
6. IF I need to conduct a test myself, tell me step-by-step how to test
7. Tell me EXACTLY how to run each test
8. Give me a launch day checklist with baby steps

```

**Phase 5 Deliverables:** Production-ready MVP

---

## **POST-MVP PRIORITIES (Future Sprints)**

### **High Value P1 Completions**
1. **Google/Outlook calendar sync** - Full implementation (prep done in MVP)
2. **PostHog analytics** - Product insights  
3. **Advanced moderation** - Appeals, escalation (basic moderation in MVP)
4. **Bulk admin operations** - Operational efficiency
5. **Enhanced verification** - Automated document verification

### **Deferred P2 Features**
- **Post-call feedback** - Useful for iteration, not launch
- **Help center/FAQ pages** - Support tickets cover immediate needs  
- **Session countdown timers** - Nice polish, not critical
- File attachments
- Progress visualization charts
- Appeal processes
- Media previews
- Profile timeline
- Advanced notification preferences

---

## **RESOURCE REQUIREMENTS**

### **Team Composition**
- **1 Full-stack Developer** (Primary)
- **1 Backend Developer** (Edge Functions, integrations)
- **0.5 QA Engineer** (Testing from Week 6)
- **0.5 DevOps** (Deployment, monitoring)

### **Third-Party Accounts Needed**
1. **Stripe** - Payment processing ($0 setup)
2. **Daily.co** - Video calls ($0 for development)
3. **Resend** - Email ($0 for 100/day)
4. **Twilio** - SMS (~$50/month)
5. **PostHog** - Analytics (Free tier available)

### **Budget Estimate**
- **Development**: 8-10 weeks × 2.5 developers
- **Third-party services**: ~$200/month initially
- **Infrastructure** (Supabase): Current plan sufficient

---

## **SUCCESS METRICS FOR MVP**

### **Must Have (P0 Complete)**
- [ ] **GDPR compliance tools operational** (export/deletion)
- [ ] **Audit trail for all admin actions** (compliance)
- [ ] **Basic moderation & content safety** (keyword detection)
- [ ] **Therapist intro videos working** (personality-first)
- [ ] **Chemistry calls with conversion tracking** (USP)
- [ ] Users can sign up and complete assessments
- [ ] Therapists verified professionally (doc preview, decisions)
- [ ] Clients can discover therapists via matching
- [ ] Clients can book and pay for appointments
- [ ] Video sessions work reliably
- [ ] Email/SMS notifications functioning

### **Should Have (P1 Started)**
- [ ] Support ticket system (prioritized over FAQs)
- [ ] Clinical assessment tools (GAD-7/PHQ-9)
- [ ] Session note templates
- [ ] Calendar sync preparation
- [ ] Analytics dashboards with real data

### **Nice to Have (P2 Deferred)**
- [ ] Post-call feedback
- [ ] Help center/FAQ pages
- [ ] Session countdown timers
- [ ] Advanced moderation
- [ ] File attachments

---

## **RISK MITIGATION**

### **High Risk Items**
1. **Stripe verification delays** → Start application Week 1
2. **Daily.co scaling costs** → Negotiate enterprise pricing early
3. **GDPR compliance** → Implement data controls in Phase 1
4. **Video call quality** → Extensive testing in Phase 4

### **Mitigation Strategies**
- Parallel work streams where possible
- Start third-party integrations early
- Keep Supabase schema as source of truth
- Maintain comprehensive testing throughout

---

## **LAUNCH CRITERIA CHECKLIST**

### **Technical Readiness**
- [ ] All P0 features implemented and tested
- [ ] Security audit completed
- [ ] Performance benchmarks met
- [ ] Backup and recovery tested
- [ ] Monitoring and alerting configured

### **Business Readiness**  
- [ ] Legal documents reviewed
- [ ] Support processes defined
- [ ] Therapist onboarding materials ready
- [ ] Marketing website connected
- [ ] Analytics tracking verified

### **Go-Live Date Target**
**Week 10: Production Launch Ready**

---

## **IMMEDIATE NEXT STEPS (This Week)**

1. **Today**: Apply for Stripe account
2. **Today**: Create Daily.co developer account  
3. **Tomorrow**: Implement missing RLS policies (2-3 hours)
4. **This Week**: Connect existing UIs to real data
5. **This Week**: Setup Resend and create first email template

---

*This roadmap prioritizes critical path items for a functional MVP. Post-MVP enhancements can be added based on user feedback and business priorities.*
