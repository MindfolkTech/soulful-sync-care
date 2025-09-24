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

### **Sprint 1.1: Compliance & Trust (P0)**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Client Features | 492 | Upcoming appointments | Partial | Join appointments with favorites | P2 | The favorites functionality is partially implemented. Enhance the existing favorites page to show upcoming appointments by joining with appointments table | Incomplete UX | ✅ Both tables exist | ✅ Favorites has RLS | Need join optimization | 60% | 2025-09-23 | e604ff7 | 1.1 | Frontend query join |
| Client Features | 492 | Notifications system | Table exists, no UI | Create notifications UI | P1 | For notifications, use existing `notifications` table and Supabase Realtime for push updates | Poor engagement | ✅ notifications table | ✅ Full RLS | ✅ Indexed by user | 40% | 2025-09-23 | e604ff7 | 1.1 | Frontend UI only |
| Client Features | 494 | Support ticketing | Table exists, no UI | Build ticket submission UI | P1 | The support ticketing system table structure exists (`support_tickets`) but needs UI implementation | No support system | ✅ support_tickets | ✅ Full RLS | Need status index | 50% | 2025-09-23 | e604ff7 | 1.1 | Frontend UI needed |
| Admin Features | 534 | Audit trail | Implemented | Add impersonation logging | P1 | ✅ Created audit_trail table with RLS. Implemented automatic logging triggers for profiles, therapist_profiles, and appointments tables. Still need to add impersonation logging and UI | Basic compliance covered | ✅ audit_trail table | ✅ Full RLS | ✅ Triggers active | 70% | 2025-09-23 | e604ff7 | 1.1 | Add impersonation logging |
| Admin Features | 535 | GDPR tools | Implemented | Improve request UI | P1 | ✅ Created and deployed gdpr-export and gdpr-delete Edge Functions. Platform is now GDPR compliant with data export and deletion capabilities. Still need to improve UI for making requests | Legal compliance achieved | ✅ All user tables | ✅ Admin access | ✅ Functions deployed | 80% | 2025-09-23 | e604ff7 | 1.1 | Improve request UI |
| Admin Features | 536 | Mandatory reasons | Implemented | ✅ Completed | P2 | ✅ Added decision_reason textarea to TherapistApplications component. Approval/rejection now requires providing a reason | Decision tracking active | ✅ decision_reason col | ✅ Admin update | ✅ UI implemented | 100% | 2025-09-23 | e604ff7 | 1.1 | ✅ Completed |
| Admin Features | 536 | Decision audit trail | Partial | Complete audit logging | P1 | Implement audit trail for all verification decisions | No accountability | ✅ reviewed_by cols | ✅ Admin update | Has timestamps | 60% | 2025-09-23 | e604ff7 | 1.1 | Extend trigger logging |
| Admin Features | 537 | Content scanning | Implemented | Improve false positive handling | P2 | ✅ Created moderation_queue table with RLS. Deployed content-moderation Edge Function with keyword detection for violence, self-harm, inappropriate content, and spam | Basic safety protection | ✅ moderation_queue | ✅ Full RLS | ✅ Keyword system live | 80% | 2025-09-23 | e604ff7 | 1.1 | Improve false positive handling |
| Admin Features | 537 | Moderation inbox | Partially implemented | Connect UI to real data | P2 | ✅ Created moderation_queue table structure with priority, status tracking, and assignment fields. UI exists but needs to be connected to real data | Basic moderation ready | ✅ moderation_queue | ✅ Full RLS | ✅ Status tracking | 40% | 2025-09-23 | e604ff7 | 1.1 | Connect UI to queue |
| Admin Features | 537 | Remove/escalate | Not implemented | Add action handlers | P2 | Add remove/escalate action handlers | Cannot moderate | ✅ moderation_queue | ✅ Full RLS | ✅ Status tracking | 20% | 2025-09-23 | e604ff7 | 1.1 | Create action handlers |

#### **AI Execution Guide: Sprint 1.1**
**Model:** Claude 3.5 Sonnet - Excellent for complex database design with security considerations and compliance requirements.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 1.1 (Compliance & Trust) for Mindfolk therapy platform.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical 
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **GDPR Compliance (80%)**: Legal requirement for UK/EU operation. Platform cannot launch without data export/deletion capabilities.
- **Audit Trail (70%)**: Essential for accountability and debugging. Tracks all critical actions for compliance.
- **Content Moderation (80%)**: Protects vulnerable users from harmful content. Core safety feature for mental health platform.
- **Notifications (40%)**: Foundation for all user communications. Enables appointment reminders and updates.
- **Support Tickets (50%)**: Critical for user trust and issue resolution.
- **Favorites/Appointments (60%)**: Core user experience feature for managing therapist relationships.

CURRENT STATE (from audit):
- ✅ **Completed**: 5 tables created with RLS (audit_trail, moderation_queue, notifications, favorites, support_tickets)
- ✅ **Deployed**: 3 Edge Functions (gdpr-export, gdpr-delete, content-moderation)
- ✅ **Active**: Audit logging on profiles, therapist_profiles, appointments tables
- ❌ **Missing**: UI connections for notifications, support tickets, and moderation inbox
- ❌ **Incomplete**: Impersonation logging, remove/escalate handlers

FILES YOU SHOULD READ & SQL TO RUN:
- Read the PRD at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Read existing migrations: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\supabase\migrations\*
- Read admin pages: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\admin\*
- Read moderation UI: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\admin\Moderation.tsx
- SQL: Use mcp0_list_tables to see all tables
- SQL: SELECT * FROM audit_trail LIMIT 5;
- SQL: SELECT * FROM moderation_queue LIMIT 5;
- SQL: SELECT * FROM notifications LIMIT 5;
- SQL: SELECT * FROM support_tickets LIMIT 5;
- SQL: SELECT * FROM favorites LIMIT 5;

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Upcoming appointments**: The favorites functionality is partially implemented. Enhance the existing favorites page to show upcoming appointments by joining with appointments table

- **Recommended Implementation for Notifications system**: For notifications, use existing `notifications` table and Supabase Realtime for push updates

- **Recommended Implementation for Support ticketing**: The support ticketing system table structure exists (`support_tickets`) but needs UI implementation

- **Recommended Implementation for Audit trail**: ✅ Created audit_trail table with RLS. Implemented automatic logging triggers for profiles, therapist_profiles, and appointments tables. Still need to add impersonation logging and UI

- **Recommended Implementation for GDPR tools**: ✅ Created and deployed gdpr-export and gdpr-delete Edge Functions. Platform is now GDPR compliant with data export and deletion capabilities. Still need to improve UI for making requests

- **Recommended Implementation for Mandatory reasons**: ✅ Added decision_reason textarea to TherapistApplications component. Approval/rejection now requires providing a reason

- **Recommended Implementation for Decision audit trail**: Implement audit trail for all verification decisions

- **Recommended Implementation for Content scanning**: ✅ Created moderation_queue table with RLS. Deployed content-moderation Edge Function with keyword detection for violence, self-harm, inappropriate content, and spam

- **Recommended Implementation for Moderation inbox**: ✅ Created moderation_queue table structure with priority, status tracking, and assignment fields. UI exists but needs to be connected to real data

- **Recommended Implementation for Remove/escalate**: Add remove/escalate action handlers

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

6. React UI Components:
   - File: src/components/notifications/NotificationBell.tsx (notification UI with real-time updates)
   - File: src/components/support/SupportTicketForm.tsx (support ticket submission)
   - File: src/components/admin/ModerationActions.tsx (remove/escalate buttons)
   - Update: src/pages/admin/Moderation.tsx (connect to real moderation_queue data)
   - Update: src/pages/client/Favorites.tsx (add upcoming appointments join)

CONSTRAINTS:
- Use existing shadcn/ui components
- All SQL must be reversible (include DROP statements)
- Maintain backward compatibility
- Follow existing design tokens
- All SQL must be reversible (include DROP statements in comments)
- Edge functions must use Deno/TypeScript
- Must follow existing RLS patterns from other tables

ACCEPTANCE CRITERIA - How You'll Know Sprint 1.1 is Complete:
✓ Run: SELECT * FROM audit_trail LIMIT 5; -- Audit trail table exists and logs actions
✓ Test: GDPR export returns complete user data as JSON
✓ Test: GDPR delete anonymizes data properly  
✓ Check: Content moderation flags inappropriate content
✓ Check: Notifications table exists and has RLS
✓ Check: Support tickets table exists with UI connected
✓ Check: Favorites shows upcoming appointments join
✓ Check: Moderation inbox connected to real data
✓ Test: Impersonation actions logged in audit trail
✓ Verify: All 10 features reach 100% completion

TECHNICAL IMPLEMENTATION STEPS:
1. Create SQL migration file with all tables and RLS
2. Deploy GDPR Edge Functions
3. Deploy content moderation Edge Function
4. Connect UI components to real data
5. Add impersonation logging
6. Test all compliance features

REMEMBER:
- All supabase changes will be made by me within the supabase browser interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

**Phase 1 Deliverables:** GDPR compliant, moderation ready, audit trail active, notifications/support UI connected

### **Sprint 1.2: Video Profiles & Quick Wins**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Product Vision | 15 | Therapist intro videos | Partial - UI exists | Complete Cloudflare integration | P1 | Use browser MediaRecorder API for recording. Upload to Supabase Storage with size limits. Add video preview component similar to existing session room UI. Store video URL in therapist_profiles table which already has the field defined | Reduced differentiation | ✅ video_url col exists | N/A | No index on video_url | 60% | 2025-09-24 | – | 1.2 | Connect to Edge Function |
| Client Features | 485 | Video profiles | UI exists, partial backend | Complete video playback | P1 | Use for hosting therapist intro videos. Configure Cloudflare Stream API. Upload videos from the existing upload UI to Cloudflare. Store video URLs in therapist_profiles table. Add video player component with streaming optimization | Less engaging discovery | ✅ video_url col exists | N/A | No index on video_url | 70% | 2025-09-24 | – | 1.2 | Complete integration |
| Therapist Features | 512 | Analytics - all metrics | Real data connected | ✅ Completed | P1 | ✅ Connected useTherapistAnalytics hook to real database tables. Added functions for calculating earnings and appointments metrics from actual data. Time filtering for analytics data now working properly | Business metrics available | ✅ therapist_analytics | ✅ Full RLS | ✅ Auto-update trigger | 100% | 2025-09-23 | e604ff7 | 1.2 | ✅ Completed |
| Admin Features | 536 | Document previews | Not implemented | Add Storage preview | P1 | Basic approval workflow exists. Add document preview using Supabase Storage URLs | Cannot verify therapists | ✅ documents JSONB | ✅ Admin view | Need storage viewer | 10% | – | – | 1.2 | Storage integration |
| Integrations | 601 | Cloudflare Stream | Integrated | ✅ Completed | P1 | ✅ Integration complete. Edge Function created for video uploads. VideoUpload and VideoPlayer components implemented. Connected to therapist_profiles.video_url column for storage | Video profiles available | ✅ video_url column | N/A | No index on URL | 100% | 2025-09-24 | – | 1.2 | ✅ Completed |

#### **AI Execution Guide: Sprint 1.2**
**Model:** Claude 3.5 Sonnet - Excellent for React components with third-party integrations like Cloudflare.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 1.2 (Video Profiles) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical 
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Video Profiles (70%)**: KEY DIFFERENTIATOR - Personality-first matching through video intros. Allows clients to see/hear therapists before booking.
- **Therapist Analytics (100%)**: ✅ COMPLETED - Provides therapists with business intelligence about their practice.
- **Cloudflare Stream (100%)**: ✅ COMPLETED - Professional video hosting infrastructure for therapist intros.
- **Document Previews (10%)**: Critical for admin verification of therapist credentials.

CURRENT STATE (from audit):
- ✅ **Completed**: Cloudflare Stream Edge Function deployed, Analytics connected to real data
- ✅ **Exists**: VideoUpload.tsx and VideoPlayer.tsx components created
- ❌ **Missing**: Final integration between video components and Edge Function
- ❌ **Not Started**: Document preview for admin verification

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Read video components: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\components\therapist\VideoUpload.tsx
- Read video player: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\components\discovery\VideoPlayer.tsx
- Read Edge Function: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\supabase\functions\cloudflare-stream\index.ts
- SQL: SELECT video_url FROM therapist_profiles WHERE video_url IS NOT NULL LIMIT 5;
- SQL: SELECT * FROM therapist_analytics LIMIT 5;
- Admin verification: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\admin\TherapistApplications.tsx

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Therapist intro videos**: Use browser MediaRecorder API for recording. Upload to Supabase Storage with size limits. Add video preview component similar to existing session room UI. Store video URL in therapist_profiles table which already has the field defined

- **Recommended Implementation for Video profiles**: Use for hosting therapist intro videos. Configure Cloudflare Stream API. Upload videos from the existing upload UI to Cloudflare. Store video URLs in therapist_profiles table. Add video player component with streaming optimization

- **Recommended Implementation for Analytics - all metrics**: ✅ Connected useTherapistAnalytics hook to real database tables. Added functions for calculating earnings and appointments metrics from actual data. Time filtering for analytics data now working properly

- **Recommended Implementation for Document previews**: Basic approval workflow exists. Add document preview using Supabase Storage URLs

- **Recommended Implementation for Cloudflare Stream**: ✅ Integration complete. Edge Function created for video uploads. VideoUpload and VideoPlayer components implemented. Connected to therapist_profiles.video_url column for storage

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

ACCEPTANCE CRITERIA - How You'll Know Sprint 1.2 is Complete:
✓ Therapists can record/upload 2-minute intro videos
✓ Videos display in discovery flow
✓ Admin can see document previews
✓ Decision reasons are saved and displayed
✓ Analytics show real data from database
✓ All components are accessible and responsive

TECHNICAL IMPLEMENTATION STEPS:
1. Configure Cloudflare Stream API
2. Complete VideoUpload component integration
3. Complete VideoPlayer component integration
4. Add document preview for admin
5. Test video upload/playback flow

REMEMBER:
- All supabase changes will be made by me within the supabase browser interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

**Phase 1 Deliverables:** GDPR compliant, moderation ready, therapist verification professional, video profiles working

---

### **Sprint 1.3: Admin Management & Operations**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Therapist Features | 508 | Income tracking | Mock data only | Connect to real earnings data | P1 | Add income calculations using session_earnings table | No financial visibility | ✅ session_earnings | ✅ Therapist view | ✅ Auto-calc trigger | 40% | – | – | 1.3 | Connect UI to data |
| Admin Features | 535 | Role change actions | Not implemented | Add status column to `profiles`, Edge Function to update role/status via Supabase Admin API, RLS policies, wire AdminUsers UI | P1 | Users and therapists pages exist. Add role change actions using Supabase Auth admin API. Implement soft delete with status field | Cannot manage users | ✅ profiles table | ✅ Admin full access | Has role enum | 10% | – | – | 1.3 | Auth API integration |
| Admin Features | 535 | Profile timeline | Not implemented | Add `auth_events` table & RLS, create trigger to log sign-in / role & status changes, build TimelineView component & wire into Admin UI | P2 | Add auth event tracking using Supabase hooks | No user history | ❌ No event table | N/A | N/A | 0% | – | – | 1.3 | Create events table & trigger |
| Admin Features | 535 | Bulk operations | Not implemented | Build `BulkOperationsPanel` component with checkbox batch select, create `admin_batch_update` RPC & Edge Function, add RLS, wire to Admin table UI | P2 | Create bulk operations UI with checkbox selection pattern | Inefficient management | ✅ All tables | ✅ Admin full access | UI only | 0% | – | – | 1.3 | Frontend + RPC |
| Admin Features | 538 | All platform analytics | Mock data only | Connect real data | P1 | Overview page with KPI cards exists. Connect to real data sources: uptime from health checks, active sessions from auth, user growth from profiles table, revenue from session_earnings. Add time-series charts using existing charting library | No platform insights | ✅ All source tables | ✅ Admin view | Need aggregation | 20% | – | – | 1.3 | Connect real queries |
| Admin Features | OLD | Decision audit trail trigger | Partial | Complete trigger setup | P1 | Extend audit trail to cover all admin decisions | No accountability | ✅ audit_trail | ✅ Full RLS | Has triggers | 30% | – | – | 1.3 | Trigger extension |
| Admin Features | OLD | Moderation inbox wiring | Partial | Connect UI to data | P2 | Wire moderation inbox UI to real moderation_queue data | Cannot moderate | ✅ moderation_queue | ✅ Full RLS | ✅ Status tracking | 40% | – | – | 1.3 | UI connection |
| Admin Features | OLD | Media preview panels | Not implemented | Build preview UI | P2 | Create media preview panels for document verification | Cannot verify docs | ✅ documents JSONB | ✅ Admin view | Need viewer | 0% | – | – | 1.3 | Frontend component |
| Admin Features | OLD | Policy reference docs page | Not implemented | Create docs page | P2 | Build policy reference documentation page | No guidance | N/A | N/A | N/A | 0% | – | – | 1.3 | Static page |

#### **AI Execution Guide: Sprint 1.3**
**Model:** Claude 3.5 Sonnet – Excellent for admin dashboards and complex state management.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 1.3 (Admin Management) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical 
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Role Management (10%)**: Essential for admin control over user access and permissions.
- **Income Tracking (40%)**: Critical for therapist financial transparency and trust.
- **Platform Analytics (20%)**: Provides business intelligence for growth decisions.
- **Bulk Operations (0%)**: Improves admin efficiency for managing large user bases.
- **Profile Timeline (0%)**: Creates audit trail for compliance and debugging.
- **Decision Audit Trail (30%)**: Ensures accountability for all admin actions.
- **Moderation Inbox (40%)**: Central hub for content safety management.
- **Media Preview Panels (0%)**: Critical for therapist verification workflow.
- **Policy Reference Docs (0%)**: Provides guidance for consistent moderation.

CURRENT STATE (from audit):
- ✅ **Exists**: Admin UI pages for users, therapists, overview
- ✅ **Partial**: Income tracking UI exists with mock data
- ✅ **Partial**: Moderation inbox UI exists but not connected
- ❌ **Missing**: Connection to real session_earnings data
- ❌ **Not Started**: Role change actions, bulk operations, auth event tracking
- ❌ **Not Started**: Media preview panels, policy reference docs

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: docs/MINDFOLK_PRD.md
- Read admin pages: src/pages/admin/*
- Read income hook: src/hooks/useTherapistAnalytics.ts
- Read moderation page: src/pages/admin/Moderation.tsx
- SQL: SELECT * FROM session_earnings LIMIT 5;
- SQL: SELECT COUNT(*) FROM profiles WHERE role = 'admin';
- SQL: SELECT * FROM therapist_analytics LIMIT 5;
- SQL: SELECT * FROM moderation_queue LIMIT 5;
- SQL: SELECT * FROM audit_trail WHERE action LIKE 'admin%' LIMIT 5;

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Income tracking**: Add income calculations using session_earnings table

- **Recommended Implementation for Role change actions**: Users and therapists pages exist. Add role change actions using Supabase Auth admin API. Implement soft delete with status field

- **Recommended Implementation for Profile timeline**: Add auth event tracking using Supabase hooks

- **Recommended Implementation for Bulk operations**: Create bulk operations UI with checkbox selection pattern

- **Recommended Implementation for All platform analytics**: Overview page with KPI cards exists. Connect to real data sources: uptime from health checks, active sessions from auth, user growth from profiles table, revenue from session_earnings. Add time-series charts using existing charting library

- **Recommended Implementation for Decision audit trail trigger**: Extend audit trail to cover all admin decisions

- **Recommended Implementation for Moderation inbox wiring**: Wire moderation inbox UI to real moderation_queue data

- **Recommended Implementation for Media preview panels**: Create media preview panels for document verification

- **Recommended Implementation for Policy reference docs page**: Build policy reference documentation page

DELIVERABLES:
1. Migration: supabase/migrations/[timestamp]_admin_management.sql
   - CREATE TABLE auth_events (id, user_id, event_type, metadata JSONB, created_at)
   - ALTER TABLE profiles ADD COLUMN status TEXT DEFAULT 'active'
   - Add RLS policies for admin-only access
   - Create triggers for auth event logging

2. Edge Function: supabase/functions/admin-role-change/index.ts
   - Update user role via Supabase Admin API
   - Log changes to auth_events table
   - Handle suspension and deletion

3. React Components:
   - src/components/admin/BulkOperationsPanel.tsx
   - src/components/admin/ProfileTimeline.tsx
   - src/components/admin/RoleChangeDialog.tsx
   - src/components/admin/MediaPreviewPanel.tsx
   - src/pages/admin/PolicyReference.tsx

4. Updates:
   - src/hooks/useTherapistAnalytics.ts - connect to real data
   - src/pages/admin/Overview.tsx - real platform metrics
   - src/pages/admin/Users.tsx - add role change actions
   - src/pages/admin/Moderation.tsx - connect to real moderation_queue
   - Extend audit trail triggers for admin decisions

ACCEPTANCE CRITERIA - How You'll Know Sprint 1.3 is Complete:
✓ Run: SELECT * FROM auth_events WHERE user_id = '[test_user_id]';
✓ Check: Admin can change user roles from UI
✓ Check: Bulk selection works on users table
✓ Check: Income tracking shows real earnings
✓ Check: Platform analytics show real metrics
✓ Check: Moderation inbox displays real queue items
✓ Check: Media preview panels show document thumbnails
✓ Check: Policy reference page is accessible
✓ Check: Audit trail captures all admin decisions
✓ Verify: All 9 features reach 100% completion

TECHNICAL IMPLEMENTATION STEPS:
1. Create auth_events table and triggers
2. Deploy admin-role-change Edge Function
3. Connect income tracking to real data
4. Build BulkOperationsPanel component
5. Connect platform analytics to real metrics
6. Test all admin functionality

REMEMBER:
- All supabase changes will be made by me within the supabase browser interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

**Phase 1 Deliverables:** Admin can manage users, view real analytics, track income, perform bulk operations

## **PHASE 2: CORE COMMUNICATIONS (Week 3-4)**
*Establish notification infrastructure before features that depend on it*

### **Sprint 2.1: Email Infrastructure (Resend)**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Client Features | 488 | Session reminders | Not implemented | Setup Resend/Twilio notifications | P0 | Implement reminder notifications via Supabase Edge Functions with Resend/Twilio | Missed appointments | ✅ appointments table | ✅ Full RLS | Need cron job | 0% | – | – | 2.1 | pg_cron + Edge Function |
| Admin Features | 536 | Template notifications | Not implemented | Create email templates | P2 | Create notification templates in Edge Functions | Manual communication | ❌ No template table | N/A | N/A | 0% | – | – | 2.1 | Email templates |
| Integrations | 606 | Resend | Not integrated | Email notifications | P0 | Create Edge Functions for email sending. Design email templates matching brand. Setup triggers for key events (booking confirmation, reminders). Add unsubscribe management. Track email metrics | No communications | ✅ appointments data | ✅ Full RLS | Need email log table | 0% | – | – | 2.1 | Edge Functions + API |
| Setup | OLD | Resend account & API keys | Not started | Create account and get API keys | P0 | Setup Resend account, get API keys, add to environment variables | Blocks all email | N/A | N/A | N/A | 0% | – | – | 2.1 | Account creation |
| Implementation | OLD | Email logs table | Not created | Create table with RLS | P0 | Create email_logs table to track all sent emails for compliance | No tracking | ❌ No table | Needs RLS | Need indexes | 0% | – | – | 2.1 | Migration needed |

#### **AI Execution Guide: Sprint 2.1**
**Model:** Claude 3.5 Sonnet - Optimal for API integrations and email template design.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 2.1 (Email Infrastructure) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Session Reminders (0%)**: CRITICAL - Reduces no-shows, improves attendance rates.
- **Email Notifications (0%)**: Foundation for all platform communications.
- **Template System (0%)**: Ensures consistent, professional communication.
- **Resend Account Setup (0%)**: Prerequisites for all email features.
- **Email Logs Table (0%)**: Compliance tracking for all sent communications.

CURRENT STATE (from audit):
- ❌ **Not Started**: No Resend integration exists
- ❌ **Missing**: No Edge Functions for email
- ❌ **No Templates**: No email templates created
- ❌ **No Account**: Resend account not created
- ❌ **No Table**: email_logs table doesn't exist
- ✅ **Ready**: appointments table exists for triggers

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Check appointments: SQL: SELECT * FROM appointments WHERE appointment_date > NOW() LIMIT 5;
- Check for email tables: SQL: SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%email%' OR table_name LIKE '%notification%';
- Read notification components if any: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\components\notifications\*
- SQL: mcp0_list_tables to see all tables
- SQL: SELECT * FROM notifications LIMIT 5;
- Email templates should match brand colors from: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\styles\design-tokens.css

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Session reminders**: Implement reminder notifications via Supabase Edge Functions with Resend/Twilio

- **Recommended Implementation for Template notifications**: Create notification templates in Edge Functions

- **Recommended Implementation for Resend**: Create Edge Functions for email sending. Design email templates matching brand. Setup triggers for key events (booking confirmation, reminders). Add unsubscribe management. Track email metrics

- **Recommended Implementation for Resend account & API keys**: Setup Resend account, get API keys, add to environment variables

- **Recommended Implementation for Email logs table**: Create email_logs table to track all sent emails for compliance

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

5. File: supabase/functions/appointment-reminder/index.ts
   - Query appointments 24h and 1h before
   - Send reminders via send-email function
   - Track reminder status in appointments table

ACCEPTANCE CRITERIA - How You'll Know Sprint 2.1 is Complete:
✓ Run: SELECT COUNT(*) FROM email_logs; -- Should show sent emails
✓ Test: Send test email via Edge Function - appears in email_logs
✓ Check: Appointment reminders sent 24h and 1h before appointments
✓ Verify: All 5 email templates created and tested
✓ Check: Emails use Mindfolk brand colors and styling
✓ Test: Error handling works (invalid email addresses logged)
✓ Verify: All 5 features show 100% completion

TECHNICAL IMPLEMENTATION STEPS:
1. First, create Resend account at resend.com
2. Create email_logs table with migration
3. Deploy send-email Edge Function
4. Create all 5 HTML email templates
5. Deploy appointment-reminder Edge Function  
6. Test end-to-end email flow
7. Set up monitoring for email delivery rates

6. File: src/lib/email.ts
   - Client-side helper to call send-email function
   - Types for each template
   - Error handling

CONSTRAINTS:
- HTML emails must be responsive
- Use inline CSS for email compatibility
- Include unsubscribe link in all emails
- Test with Resend test mode first
- Do NOT send real emails until approved

REMEMBER:
- All supabase changes will be made by me within the supabase browser interface
- Create files for me to use
- Remember that YOU can test Supabase via the MCP server
- IF I need to conduct a test myself, tell me step-by-step how to test
- Use simple words
- One instruction at a time

FIRST! You must reiterate these instructions back to me so I can check your comprehensive understanding of your tasks
```

**Phase 2 Deliverables:** Full email capability with Resend, appointment reminders automated, all templates created

### **Sprint 2.2: SMS Infrastructure (Twilio)**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Integrations | 607 | Twilio | Not integrated | SMS notifications | P0 | Setup Twilio account with UK phone numbers. Create Edge Functions for SMS sending. Implement appointment reminders. Add opt-in/opt-out management. Handle international number formatting | No reminders | ✅ appointments table | ✅ Full RLS | Need pg_cron | 0% | – | – | 2.2 | Edge Function + cron |
| Setup | OLD | Twilio account with UK numbers | Not started | Setup account | P0 | Create Twilio account, get UK phone number, configure webhooks | Blocks all SMS | N/A | N/A | N/A | 0% | – | – | 2.2 | Account setup |
| Implementation | OLD | Edge Function for SMS | Not created | Build SMS sender | P0 | Create send-sms Edge Function with Twilio SDK integration | No SMS capability | ✅ profiles.phone | ✅ Full RLS | N/A | 0% | – | – | 2.2 | Edge Function |
| Implementation | OLD | Phone validation | Not implemented | Add validation | P0 | Add phone number validation and verification flow | Invalid numbers | ✅ profiles table | ✅ Full RLS | N/A | 0% | – | – | 2.2 | Frontend + backend |
| Compliance | OLD | Opt-in/opt-out | Not implemented | GDPR compliance | P0 | Implement SMS consent management with STOP handling | GDPR violation | Need consent col | Needs RLS | N/A | 0% | – | – | 2.2 | Database + UI |

#### **AI Execution Guide: Sprint 2.2**
**Model:** Claude 3.5 Sonnet - Excellent for API integrations with clear documentation like Twilio.

**DELIVERABLES:**
1. File: supabase/migrations/[timestamp]_sms_infrastructure.sql
   - ALTER TABLE profiles ADD COLUMN sms_consent BOOLEAN DEFAULT false;
   - ALTER TABLE profiles ADD COLUMN phone_verified BOOLEAN DEFAULT false;
   - CREATE TABLE sms_logs (id, recipient, message, sent_at, status, error, cost DECIMAL);
   - Add RLS policies

2. File: supabase/functions/send-sms/index.ts
   - Integrate Twilio API (use TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
   - Validate UK phone numbers (+44)
   - Check sms_consent before sending
   - Log all SMS to sms_logs table
   - Track costs

3. File: supabase/functions/verify-phone/index.ts
   - Send verification code via SMS
   - Store code temporarily (5 min expiry)
   - Verify code and update phone_verified

4. File: src/components/settings/SMSPreferences.tsx
   - Toggle for SMS consent
   - Phone number input with UK format
   - Verify phone button
   - Clear opt-out message

5. Environment Variables:
   - TWILIO_ACCOUNT_SID
   - TWILIO_AUTH_TOKEN
   - TWILIO_PHONE_NUMBER

**ACCEPTANCE CRITERIA - How You'll Know Sprint 2.2 is Complete:**
✓ Run: SELECT COUNT(*) FROM sms_logs WHERE sent_at > NOW() - INTERVAL '1 day';
✓ Test: Send test SMS via Edge Function - appears in sms_logs
✓ Check: Phone verification works with UK numbers
✓ Test: SMS consent toggle prevents/allows sending
✓ Verify: Opt-out (STOP) replies handled correctly
✓ Check: SMS costs tracked in sms_logs table
✓ Verify: All 5 features show 100% completion

**TECHNICAL IMPLEMENTATION STEPS:**
1. Create Twilio account with UK phone number
2. Create sms_logs table and add phone fields to profiles
3. Deploy send-sms Edge Function with Twilio integration
4. Deploy verify-phone Edge Function
5. Build SMSPreferences component
6. Test UK phone number validation
7. Implement STOP reply handling
8. Monitor SMS delivery rates and costs

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 2.2 (SMS Infrastructure) for Mindfolk UK therapy platform.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Twilio SMS (0%)**: CRITICAL - Higher open rates than email (98% vs 20%), reduces no-shows by 30%+. Essential for appointment reminders.
- **Twilio Account Setup (0%)**: Prerequisite for all SMS features.
- **SMS Edge Function (0%)**: Core infrastructure for sending messages.
- **Phone Validation (0%)**: Ensures deliverability and reduces costs.
- **Opt-in/Opt-out (0%)**: GDPR compliance requirement for UK market.

CURRENT STATE (from audit):
- ❌ **Not Started**: No Twilio integration exists
- ❌ **Missing**: No SMS Edge Functions created
- ❌ **No Phone Fields**: Need to add phone validation to profiles
- ❌ **No Account**: Twilio account not created
- ❌ **No Consent**: SMS consent fields don't exist
- ❌ **No Table**: sms_logs table doesn't exist
- ✅ **Ready**: appointments table exists for reminder triggers
- ✅ **Ready**: profiles table can store phone numbers

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Check profiles for phone: SQL: SELECT phone FROM profiles WHERE phone IS NOT NULL LIMIT 5;
- Check appointments: SQL: SELECT * FROM appointments WHERE appointment_date > NOW() AND appointment_date < NOW() + INTERVAL '24 hours';
- SQL: mcp0_list_tables to see all tables
- SQL: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'profiles';

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Twilio**: Setup Twilio account with UK phone numbers. Create Edge Functions for SMS sending. Implement appointment reminders. Add opt-in/opt-out management. Handle international number formatting

- **Recommended Implementation for Twilio account with UK numbers**: Create Twilio account, get UK phone number, configure webhooks

- **Recommended Implementation for Edge Function for SMS**: Create send-sms Edge Function with Twilio SDK integration

- **Recommended Implementation for Phone validation**: Add phone number validation and verification flow

- **Recommended Implementation for Opt-in/opt-out**: Implement SMS consent management with STOP handling
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

### **Sprint 2.3: Automated Scheduling (pg_cron)**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Therapist Features | 508 | Client status dashboard | Not implemented | Create client status tracking | P2 | Use existing appointments table to show upcoming sessions | Poor client management | ✅ appointments table | ✅ Full RLS | Need client_id index | 20% | – | – | 2.3 | Add aggregation query |
| Therapist Features | 509 | Session reminders | Not implemented | Notification system | P0 | Research and implement shadcn/ui calendar components | Missed sessions | ✅ appointments table | ✅ Full RLS | Need cron trigger | 0% | – | – | 2.3 | pg_cron + Edge Function |
| Therapist Features | 510 | Client status management | Not implemented | Create `client_relationships` table & RLS, add Status column, ClientStatus component, analytics aggregation | P2 | The clients page exists. Extend with status field in a new client_relationships table | Poor organization | ❌ No relationships table | N/A | N/A | 0% | – | – | 2.3 | Migration + UI |
| Infrastructure | OLD | Enable pg_cron extension | Not enabled | Enable in Supabase | P0 | Enable pg_cron extension in Supabase dashboard for scheduled jobs | No automation | N/A | N/A | N/A | 0% | – | – | 2.3 | Extension setup |
| Implementation | OLD | Create reminder cron jobs | Not created | Build cron jobs | P0 | Create cron jobs for 24h and 1h reminders | Missed appointments | ✅ appointments | ✅ Full RLS | N/A | 0% | – | – | 2.3 | Cron configuration |
| Testing | OLD | Test notification delivery | Not tested | Test end-to-end | P0 | Test full reminder flow from cron to delivery | Unreliable reminders | ✅ All tables | ✅ Full RLS | N/A | 0% | – | – | 2.3 | Manual testing |

#### **AI Execution Guide: Sprint 2.3**
**Model:** Claude 3.5 Sonnet - Excellent at complex scheduling logic and cron patterns.

**DELIVERABLES:**
1. File: supabase/migrations/[timestamp]_client_relationships.sql
   - CREATE TABLE client_relationships (id, therapist_id, client_id, status, notes, created_at, updated_at)
   - Status enum: active, paused, completed, referred
   - Add RLS policies
   - Create indexes on therapist_id and client_id

2. File: supabase/migrations/[timestamp]_enable_pg_cron.sql
   - CREATE EXTENSION IF NOT EXISTS pg_cron;
   - Grant usage to postgres role

3. File: supabase/functions/session-reminder-job/index.ts
   - Query appointments 24h and 1h before
   - Call send-email and send-sms functions
   - Track reminder sent status

4. File: src/components/therapist/ClientStatusDashboard.tsx
   - Display client list with status indicators
   - Show upcoming appointments per client
   - Quick status update buttons
   - Session history summary

5. File: src/components/therapist/ClientStatusManager.tsx
   - Update client relationship status
   - Add session notes
   - Track treatment progress

**ACCEPTANCE CRITERIA - How You'll Know Sprint 2.3 is Complete:**
✓ Run: SELECT * FROM cron.job; -- Should show reminder job scheduled
✓ Test: Reminders sent automatically 24h and 1h before sessions
✓ Check: Client status dashboard shows all active clients
✓ Verify: Client relationship statuses can be updated
✓ Run: SELECT * FROM client_relationships WHERE therapist_id IS NOT NULL;
✓ Check: Aggregation queries work for client analytics
✓ Verify: All 3 features show 100% completion

**TECHNICAL IMPLEMENTATION STEPS:**
1. Enable pg_cron extension in Supabase
2. Create client_relationships table with migration
3. Deploy session-reminder-job Edge Function
4. Schedule cron job to run every hour
5. Build ClientStatusDashboard component
6. Build ClientStatusManager component
7. Test automated reminder system
8. Verify client relationship tracking

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 2.3 (Automated Scheduling) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Session Reminders (0%)**: P0 CRITICAL - Automated reminders prevent no-shows and improve attendance. Essential for therapist workflow.
- **Client Status Dashboard (20%)**: Helps therapists track client progress, engagement, and relationship health.
- **Client Status Management (0%)**: Enables proper tracking of therapeutic relationships and outcomes.
- **pg_cron Extension (0%)**: Enables all automated scheduling features
- **Reminder Cron Jobs (0%)**: Automates appointment reminders
- **Test Delivery (0%)**: Ensures reliability of automated system

CURRENT STATE (from audit):
- ❌ **Not Started**: No pg_cron extension enabled
- ❌ **Missing**: No scheduled jobs configured
- ❌ **No Tables**: client_relationships table doesn't exist
- ✅ **Ready**: appointments table exists for reminder triggers

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Check appointments: SQL: SELECT * FROM appointments WHERE therapist_id IS NOT NULL LIMIT 5;
- Check for cron jobs: SQL: SELECT * FROM cron.job;
- SQL: mcp0_list_tables to see all tables
- Read therapist pages: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\therapist\*
- SQL: SELECT COUNT(*) FROM appointments GROUP BY therapist_id;
- Platform operates in UK timezone (GMT/BST)

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Client status dashboard**: Use existing appointments table to show upcoming sessions

- **Recommended Implementation for Session reminders**: Research and implement shadcn/ui calendar components

- **Recommended Implementation for Client status management**: The clients page exists. Extend with status field in a new client_relationships table

- **Recommended Implementation for Enable pg_cron extension**: Enable pg_cron extension in Supabase dashboard for scheduled jobs

- **Recommended Implementation for Create reminder cron jobs**: Create cron jobs for 24h and 1h reminders

- **Recommended Implementation for Test notification delivery**: Test full reminder flow from cron to delivery

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

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Client Features | 487 | Direct Booking Payment | UI only | Integrate Stripe payment processing | P0 | The payment form UI components already exist at `/src/components/payment/`. Integrate Stripe using Supabase Edge Functions for secure server-side processing. Use the existing session_earnings table to track therapist payouts and platform fees. Add webhook handlers for payment events | Cannot transact | ✅ session_earnings | ✅ Therapist view only | ✅ Auto-calc trigger | 20% | – | – | 3.1 | Stripe webhook handlers |
| Client Features | 493 | Payment Processing | UI only | Full Stripe integration | P0 | The payment form UI components already exist at `/src/components/payment/`. Integrate Stripe using Supabase Edge Functions for secure server-side processing. Use the existing session_earnings table to track therapist payouts and platform fees. Add webhook handlers for payment events | No revenue | ✅ session_earnings | ✅ Full RLS | ✅ Auto-calc trigger | 20% | – | – | 3.1 | Stripe Edge Functions |
| Platform Core | 555 | Payment Infrastructure | UI only | Stripe Connect setup | P0 | Integrate Stripe using the existing payment form UI components at `/src/components/payment/`. Create Supabase Edge Functions for server-side payment processing. Use the existing session_earnings table structure to track therapist earnings and platform fees. The database schema already supports financial tracking | No revenue | ✅ session_earnings | ✅ Full RLS | ✅ Auto-calc ready | 20% | – | – | 3.1 | Stripe API integration |
| Integrations | 602 | Stripe Connect | UI only | Payment processing | P0 | Payment form UI exists. Setup Stripe Connect onboarding for therapists. Create Edge Functions for payment processing. Use webhooks to update session_earnings table. Implement weekly payout scheduling. Add invoice generation for tax compliance | No transactions | ✅ session_earnings | ✅ Full RLS | ✅ Payout tracking | 20% | – | – | 3.1 | Stripe Connect OAuth |
| Setup | OLD | Stripe account & configure | Not started | Create account | P0 | Create Stripe account, configure UK settings, get API keys | Blocks all payments | N/A | N/A | N/A | 0% | – | – | 3.1 | Account setup |

#### **AI Execution Guide: Sprint 3.1**
**Model:** Claude 3.5 Sonnet - Best for complex payment infrastructure with security requirements.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 3.1 (Stripe Foundation) for Mindfolk UK therapy platform.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Payment Processing (20%)**: P0 CRITICAL - No revenue without payments. Platform cannot operate.
- **Stripe Connect (20%)**: Essential for therapist payouts and tax compliance.
- **Direct Booking (20%)**: Core user flow - clients must be able to pay for sessions.
- **Payment Infrastructure (20%)**: Foundation for all financial transactions.
- **Stripe Account Setup (0%)**: Prerequisite for all payment features.

CURRENT STATE (from audit):
- ✅ **Exists**: Payment form UI components at `/src/components/payment/`
- ✅ **Ready**: session_earnings table with auto-calc triggers
- ❌ **Missing**: All Stripe backend integration
- ❌ **Not Started**: Edge Functions for payment processing
- ❌ **No Webhooks**: No payment event handling

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Read payment components: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\components\payment\*
- SQL: SELECT * FROM session_earnings LIMIT 5;
- SQL: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'session_earnings';
- SQL: SELECT * FROM appointments WHERE payment_status IS NOT NULL LIMIT 5;
- SQL: mcp0_list_tables to see all tables
- Check therapist profiles for Stripe: SQL: SELECT stripe_account_id FROM therapist_profiles WHERE stripe_account_id IS NOT NULL LIMIT 5;
- UK pricing in GBP, platform takes 20% commission

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Direct Booking Payment**: The payment form UI components already exist at `/src/components/payment/`. Integrate Stripe using Supabase Edge Functions for secure server-side processing. Use the existing session_earnings table to track therapist payouts and platform fees. Add webhook handlers for payment events

- **Recommended Implementation for Payment Processing**: The payment form UI components already exist at `/src/components/payment/`. Integrate Stripe using Supabase Edge Functions for secure server-side processing. Use the existing session_earnings table to track therapist payouts and platform fees. Add webhook handlers for payment events

- **Recommended Implementation for Payment Infrastructure**: Integrate Stripe using the existing payment form UI components at `/src/components/payment/`. Create Supabase Edge Functions for server-side payment processing. Use the existing session_earnings table structure to track therapist earnings and platform fees. The database schema already supports financial tracking

- **Recommended Implementation for Stripe Connect**: Payment form UI exists. Setup Stripe Connect onboarding for therapists. Create Edge Functions for payment processing. Use webhooks to update session_earnings table. Implement weekly payout scheduling. Add invoice generation for tax compliance

- **Recommended Implementation for Stripe account & configure**: Create Stripe account, configure UK settings, get API keys

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

**TECHNICAL IMPLEMENTATION STEPS:**
1. Create Stripe account and get API keys
2. Add payment columns to database tables
3. Deploy create-payment-intent Edge Function
4. Deploy stripe-webhook Edge Function
5. Deploy therapist-onboarding Edge Function
6. Set up webhook endpoint in Stripe dashboard
7. Integrate Stripe Elements in frontend
8. Test end-to-end payment flow
9. Implement weekly payout scheduling
10. Add invoice generation for tax compliance

**ACCEPTANCE CRITERIA - How You'll Know Sprint 3.1 is Complete:**
✓ Run: SELECT COUNT(*) FROM session_earnings WHERE created_at > NOW() - INTERVAL '1 day';
✓ Test: Payment intent creation works with test card
✓ Check: Webhook receives and processes events
✓ Verify: Session earnings auto-calculate (80% therapist, 20% platform)
✓ Test: Therapist onboarding flow generates Connect account
✓ Check: Test payment succeeds and updates appointment status
✓ Verify: Failed payments handled with proper error messages
✓ Check: All 4 features show 100% completion

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

### **Sprint 3.2: Chemistry Calls & Conversion**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Client Features | 486 | Chemistry Call Booking | Not implemented | Extend appointment system for 15-min free calls | P0 | Extend the existing appointment booking system to add a chemistry call type with 15-minute duration limit. Use the current calendar UI and appointment creation flow, but add logic to make these calls free and track conversion to paid sessions. The database structure already supports different appointment types | Missing key conversion feature | ✅ appointments table | ✅ Full RLS | ✅ Unique constraint | 0% | – | – | 3.2 | Add session_type enum value |
| Client Features | 492 | Chemistry call logic | Not implemented | Add conditional booking buttons | P1 | Add conditional booking buttons based on past chemistry call history | Confusing flow | ✅ appointments table | ✅ Full RLS | Need session_type enum | 0% | – | – | 3.2 | Frontend logic only |
| Implementation | OLD | Chemistry call free system | Partial | Complete free booking | P0 | Implement chemistry call (free) system with one-per-therapist limit | No USP conversion | ✅ appointments | ✅ Full RLS | N/A | 10% | – | – | 3.2 | Backend logic |
| UI | OLD | Chemistry call booking UI | Partial | Build UI component | P0 | Create dedicated chemistry call booking UI with clear FREE badge | Poor UX | ✅ appointments | ✅ Full RLS | N/A | 10% | – | – | 3.2 | Frontend component |
| Analytics | OLD | Free to paid conversion tracking | Not started | Track conversions | P0 | Track chemistry to paid session conversions | No metrics | Need tracking table | Needs RLS | N/A | 0% | – | – | 3.2 | New table needed |
| Payment | OLD | Wire up payment UI components | Partial | Connect Stripe | P0 | Wire up existing payment UI components to Stripe | No revenue | ✅ session_earnings | ✅ Full RLS | N/A | 20% | – | – | 3.2 | Stripe integration |
| Payment | OLD | Add Stripe Elements to forms | Not started | Add card input | P0 | Add Stripe Elements for secure card input | PCI compliance | N/A | N/A | N/A | 0% | – | – | 3.2 | Frontend library |
| Pricing | OLD | Create price generation logic | Not started | Calculate prices | P0 | Generate prices based on therapist rates and platform fee | Wrong pricing | ✅ therapist_profiles | ✅ Full RLS | N/A | 0% | – | – | 3.2 | Backend logic |
| Testing | OLD | Test chemistry to payment flow | Not started | End-to-end test | P0 | Test full flow from chemistry call to paid booking | Broken flow | All tables | ✅ Full RLS | N/A | 0% | – | – | 3.2 | E2E testing |

#### **AI Execution Guide: Sprint 3.2**
**Model:** Claude 3.5 Sonnet - Excellent for complex UI flows with payment integration.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 3.2 (Chemistry Calls) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Chemistry Calls (0%)**: P0 CRITICAL - Key USP, allows clients to "try before they buy". Essential for conversion.
- **Chemistry Call Logic (0%)**: Ensures proper flow from free to paid sessions.
- **Free System Implementation (10%)**: Core functionality for chemistry calls.
- **Booking UI (10%)**: User interface for chemistry call scheduling.
- **Conversion Tracking (0%)**: Critical business metric for measuring platform effectiveness.
- **Payment UI Wiring (20%)**: Connects existing UI to Stripe for revenue generation.
- **Stripe Elements (0%)**: Secure card input for paid sessions.
- **Price Generation (0%)**: Dynamic pricing based on therapist rates.
- **End-to-End Testing (0%)**: Ensures smooth conversion flow.

CURRENT STATE (from audit):
- ❌ **Not Started**: No chemistry call components
- ❌ **Missing**: No session_type enum in appointments table
- ❌ **No Logic**: No conditional booking buttons
- ❌ **No Stripe Elements**: Card input not implemented
- ❌ **No Price Logic**: Price generation not built
- ❌ **No Testing**: Chemistry to payment flow untested
- ✅ **Ready**: appointments table exists for extension
- ✅ **Partial**: Payment UI exists but not connected
- ✅ **Partial**: Chemistry call system 10% implemented

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Read booking page: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\client\BookingPage.tsx
- SQL: SELECT * FROM appointments WHERE is_chemistry_call = true LIMIT 5;
- SQL: SELECT DISTINCT session_type FROM appointments;
- SQL: mcp0_list_tables to see all tables
- Check for existing chemistry calls: SQL: SELECT therapist_id, client_id, COUNT(*) FROM appointments WHERE is_chemistry_call = true GROUP BY therapist_id, client_id;
- Chemistry calls are FREE 15-minute video sessions
- Payment form exists at: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\components\payment\PaymentForm.tsx

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Chemistry Call Booking**: Extend the existing appointment booking system to add a chemistry call type with 15-minute duration limit. Use the current calendar UI and appointment creation flow, but add logic to make these calls free and track conversion to paid sessions. The database structure already supports different appointment types

- **Recommended Implementation for Chemistry call logic**: Add conditional booking buttons based on past chemistry call history

- **Recommended Implementation for Chemistry call free system**: Implement chemistry call (free) system with one-per-therapist limit

- **Recommended Implementation for Chemistry call booking UI**: Create dedicated chemistry call booking UI with clear FREE badge

- **Recommended Implementation for Free to paid conversion tracking**: Track chemistry to paid session conversions

- **Recommended Implementation for Wire up payment UI components**: Wire up existing payment UI components to Stripe

- **Recommended Implementation for Add Stripe Elements to forms**: Add Stripe Elements for secure card input

- **Recommended Implementation for Create price generation logic**: Generate prices based on therapist rates and platform fee

- **Recommended Implementation for Test chemistry to payment flow**: Test full flow from chemistry call to paid booking

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

**ACCEPTANCE CRITERIA - How You'll Know Sprint 3.2 is Complete:**
✓ Run: SELECT COUNT(*) FROM appointments WHERE is_chemistry_call = true;
✓ Test: Chemistry calls book without payment (free system works)
✓ Check: Chemistry call booking UI shows FREE badge clearly
✓ Test: Conditional booking buttons show based on history
✓ Verify: Conversion tracking shows chemistry → paid conversions
✓ Check: Payment UI components wired to Stripe
✓ Test: Stripe Elements secure card input works
✓ Verify: Price generation calculates correctly (therapist rate - 20% fee)
✓ Test: Full chemistry → payment flow end-to-end
✓ Test: One chemistry call per therapist-client pair enforced
✓ Check: 15-minute duration limit enforced
✓ Verify: All 9 features show 100% completion

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

### **Sprint 4.1: Daily.co Video Sessions**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Client Features | 488 | Live video interface | UI only | Integrate Daily.co WebRTC | P0 | The session room UI is ready for Daily.co integration. Integrate Daily.co using the existing session room UI at `/src/pages/session/SessionRoom.tsx`. Create Supabase Edge Functions to generate secure room tokens. Use the existing appointments table to trigger session creation and track attendance | Cannot deliver therapy | ✅ appointments table | ✅ Full RLS | ✅ Status tracking | 5% | – | – | 4.1 | Daily.co API integration |
| Platform Core | 554 | Video Sessions | UI only | Daily.co integration | P0 | Integrate Daily.co using the existing session room UI at `/src/pages/session/SessionRoom.tsx`. Create Supabase Edge Functions to generate secure room tokens. Use the existing appointments table to trigger session creation and track attendance. The UI components are already in place with mock functionality | Cannot deliver therapy | ✅ appointments table | ✅ Full RLS | Need meeting_url col | 5% | – | – | 4.1 | Daily.co SDK + Edge |
| Integrations | 600 | Daily.co | Not integrated | WebRTC implementation | P0 | The session room UI components are ready. Install @daily-co/daily-js SDK. Create Edge Function to generate room tokens with proper expiry. Update SessionRoom component to initialize Daily client. Add device selection UI using existing form components | No video calls | ✅ appointments table | ✅ Full RLS | UI components ready | 5% | – | – | 4.1 | NPM install + config |
| Setup | OLD | Create Daily.co account | Not started | Account setup | P0 | Create Daily.co account, get API keys, configure domain | Blocks video | N/A | N/A | N/A | 0% | – | – | 4.1 | Account creation |
| Frontend | OLD | Install @daily-co/daily-js SDK | Not installed | Install package | P0 | Install Daily.co JavaScript SDK in frontend | No video capability | N/A | N/A | N/A | 5% | – | – | 4.1 | NPM install |
| Backend | OLD | Room token Edge Function | Not created | Create function | P0 | Create Edge Function to generate secure room tokens | No authentication | ✅ appointments | ✅ Full RLS | N/A | 5% | – | – | 4.1 | Edge Function |
| Frontend | OLD | Wire up SessionRoom component | Partial | Complete integration | P0 | Connect SessionRoom.tsx to Daily.co SDK | UI not functional | ✅ appointments | ✅ Full RLS | N/A | 5% | – | – | 4.1 | Component update |
| Frontend | OLD | Device selection/testing | Not implemented | Build UI | P0 | Add device selection and testing UI | Poor UX | N/A | N/A | N/A | 0% | – | – | 4.1 | New component |
| Database | OLD | Add meeting_url to appointments | Not added | Add column | P0 | Add meeting_url column to store Daily.co room URL | Cannot join | ✅ appointments | ✅ Full RLS | N/A | 0% | – | – | 4.1 | Migration |
| Testing | OLD | Test video calls end-to-end | Not tested | Full testing | P0 | Test complete video call flow | Broken experience | All tables | ✅ Full RLS | N/A | 0% | – | – | 4.1 | Manual testing |

#### **AI Execution Guide: Sprint 4.1**
**Model:** Claude 3.5 Sonnet - Excellent for WebRTC integration with clear SDK documentation.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 4.1 (Daily.co Video Integration) for Mindfolk therapy platform.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Video Sessions (5%)**: P0 CRITICAL - Cannot deliver therapy without video. Core service delivery.
- **Live Interface (5%)**: Essential for therapist-client connection and therapy effectiveness.
- **Daily.co Integration (5%)**: Professional, secure, HIPAA-compliant video infrastructure.
- **Account Setup (0%)**: Prerequisite for all video features.
- **SDK Installation (5%)**: Enables video capability in frontend.
- **Room Token Function (5%)**: Secure authentication for video rooms.
- **SessionRoom Wiring (5%)**: Connects UI to video functionality.
- **Device Testing (0%)**: Critical for user experience.
- **Meeting URL Storage (0%)**: Links appointments to video rooms.
- **End-to-End Testing (0%)**: Ensures reliable therapy delivery.

CURRENT STATE (from audit):
- ✅ **Exists**: SessionRoom.tsx UI component at `/src/pages/session/SessionRoom.tsx`
- ❌ **Missing**: Daily.co SDK integration
- ❌ **Not Started**: Room generation Edge Functions
- ❌ **No Config**: Daily.co account/API not setup
- ❌ **No Column**: meeting_url column doesn't exist
- ❌ **No Device UI**: Device selection not implemented
- ❌ **Not Tested**: Video flow untested
- ✅ **Ready**: appointments table exists for triggers

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Read session room: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\session\SessionRoom.tsx
- SQL: SELECT * FROM appointments WHERE appointment_date > NOW() LIMIT 5;
- SQL: SELECT meeting_url FROM appointments WHERE meeting_url IS NOT NULL LIMIT 5;
- SQL: mcp0_list_tables to see all tables
- SQL: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'appointments';
- Video calls are 50-minute therapy sessions
- Chemistry calls are 15-minute sessions

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Live video interface**: The session room UI is ready for Daily.co integration. Integrate Daily.co using the existing session room UI at `/src/pages/session/SessionRoom.tsx`. Create Supabase Edge Functions to generate secure room tokens. Use the existing appointments table to trigger session creation and track attendance

- **Recommended Implementation for Video Sessions**: Integrate Daily.co using the existing session room UI at `/src/pages/session/SessionRoom.tsx`. Create Supabase Edge Functions to generate secure room tokens. Use the existing appointments table to trigger session creation and track attendance. The UI components are already in place with mock functionality

- **Recommended Implementation for Daily.co**: The session room UI components are ready. Install @daily-co/daily-js SDK. Create Edge Function to generate room tokens with proper expiry. Update SessionRoom component to initialize Daily client. Add device selection UI using existing form components

- **Recommended Implementation for Create Daily.co account**: Create Daily.co account, get API keys, configure domain

- **Recommended Implementation for Install @daily-co/daily-js SDK**: Install Daily.co JavaScript SDK in frontend

- **Recommended Implementation for Room token Edge Function**: Create Edge Function to generate secure room tokens

- **Recommended Implementation for Wire up SessionRoom component**: Connect SessionRoom.tsx to Daily.co SDK

- **Recommended Implementation for Device selection/testing**: Add device selection and testing UI

- **Recommended Implementation for Add meeting_url to appointments**: Add meeting_url column to store Daily.co room URL

- **Recommended Implementation for Test video calls end-to-end**: Test complete video call flow

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

**ACCEPTANCE CRITERIA - How You'll Know Sprint 4.1 is Complete:**
✓ Check: Daily.co account created and configured
✓ Run: SELECT COUNT(*) FROM appointments WHERE meeting_url IS NOT NULL;
✓ Test: @daily-co/daily-js SDK installed and working
✓ Test: Room token Edge Function generates secure tokens
✓ Check: SessionRoom component connected to Daily.co SDK
✓ Test: Device selection/testing UI works before joining
✓ Verify: meeting_url column added to appointments table
✓ Test: Video room creates automatically for appointment
✓ Check: Both therapist and client can join with tokens
✓ Verify: Audio/video controls work (mute, camera off)
✓ Check: Waiting room shows 5 minutes before session
✓ Verify: Session ends automatically after scheduled time
✓ Test: Full end-to-end video call flow works
✓ Test: Mobile video works on iOS/Android
✓ Verify: All 10 features show 100% completion

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

### **Sprint 5.1: Professional Tools & Polish**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Therapist Features | 509 | Google/Outlook sync | Not implemented | OAuth2 calendar integration | P1 | The calendar page exists. Add OAuth2 integration for Google Calendar API and Microsoft Graph API for Outlook. Store tokens in encrypted format in profiles table. Use existing availability system as base | Manual scheduling | ✅ availability table | ✅ Full RLS | Need token storage | 10% | – | – | 5.1 | OAuth2 Edge Functions |
| Therapist Features | 510 | Session note templates | Not implemented | Create template system | P1 | Create client file pages with tabs for different sections. Store session notes in existing client_session_notes table with template support | Inefficient documentation | ✅ client_session_notes | ✅ Full RLS | JSONB for templates | 20% | – | – | 5.1 | Add template field |
| Therapist Features | 511 | GAD-7/PHQ-9 scales | Not implemented | Add assessment forms | P1 | Notes UI exists. Add standardized assessment forms (GAD-7, PHQ-9) as React components. Store scores in JSONB field in client_session_notes | No clinical tools | ✅ client_session_notes | ✅ Full RLS | JSONB field ready | 5% | – | – | 5.1 | Add form components |
| Client Features | 494 | Help centre/FAQs | Not implemented | Create help pages | P1 | Create a help center page with FAQ content | Poor support | ❌ No FAQ table | N/A | N/A | 0% | – | – | 5.1 | Static content or CMS |
| Support | OLD | Support ticket UI | Partial | Build interface | P1 | Create support ticket submission and viewing UI | No user support | ✅ support_tickets | ✅ Full RLS | N/A | 30% | – | – | 5.1 | Frontend UI |
| Safety | OLD | Basic report/flag system | Not started | Add reporting | P1 | Add content reporting functionality for safety | No user protection | ✅ moderation_queue | ✅ Full RLS | N/A | 0% | – | – | 5.1 | Report component |
| Calendar | OLD | Calendar sync preparation | Partial | Setup OAuth2 | P1 | Prepare OAuth2 infrastructure for calendar integration | Manual scheduling | ✅ availability | ✅ Full RLS | N/A | 10% | – | – | 5.1 | OAuth2 setup |

#### **AI Execution Guide: Sprint 5.1**
**Model:** Claude 3.5 Sonnet - Good balance for UI components and database queries.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 5.1 (Essential P1 Features) for Mindfolk.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Google/Outlook Sync (10%)**: Critical for therapist adoption - eliminates double-booking and manual scheduling.
- **Session Note Templates (20%)**: Essential for professional documentation and regulatory compliance.
- **GAD-7/PHQ-9 Scales (5%)**: Industry-standard clinical tools for measuring therapy outcomes.
- **Help Centre/FAQs (0%)**: Reduces support burden and improves user self-service.
- **Support Ticket UI (30%)**: Essential for user assistance and issue resolution.
- **Report/Flag System (0%)**: Critical for platform safety and content moderation.
- **Calendar Sync Prep (10%)**: Foundation for automated calendar integration.

CURRENT STATE (from audit):
- ✅ **Exists**: Calendar page, session notes UI, support_tickets table
- ✅ **Partial**: Support tickets table exists, needs UI
- ✅ **Partial**: Calendar sync infrastructure 10% ready
- ❌ **Missing**: OAuth2 integration for calendars
- ❌ **Not Started**: Clinical assessment forms
- ❌ **No Help Centre**: Need to create FAQ content
- ❌ **No Reporting**: Report/flag system not implemented
- ✅ **Ready**: moderation_queue table exists for reports

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Read calendar page: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\therapist\Calendar.tsx
- Read session notes: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\therapist\SessionNotes.tsx
- SQL: SELECT * FROM client_session_notes LIMIT 5;
- SQL: SELECT * FROM support_tickets LIMIT 5;
- SQL: mcp0_list_tables to see all tables

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Google/Outlook sync**: The calendar page exists. Add OAuth2 integration for Google Calendar API and Microsoft Graph API for Outlook. Store tokens in encrypted format in profiles table. Use existing availability system as base

- **Recommended Implementation for Session note templates**: Create client file pages with tabs for different sections. Store session notes in existing client_session_notes table with template support

- **Recommended Implementation for GAD-7/PHQ-9 scales**: Notes UI exists. Add standardized assessment forms (GAD-7, PHQ-9) as React components. Store scores in JSONB field in client_session_notes

- **Recommended Implementation for Help centre/FAQs**: Create a help center page with FAQ content

- **Recommended Implementation for Support ticket UI**: Create support ticket submission and viewing UI

- **Recommended Implementation for Basic report/flag system**: Add content reporting functionality for safety

- **Recommended Implementation for Calendar sync preparation**: Prepare OAuth2 infrastructure for calendar integration

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

### **Sprint 5.2: Launch Preparation**

#### **Full Task Table - ALL 16 Columns from TODO SUMMARY TABLE**

| Section | Line # | Feature/Item | Current Status | What's Left to Do | Priority | Recommended Implementation | Potential Risks | Schema Coverage | RLS Status | DB Optimization | Implementation % | Date Implemented | Commit ID | Sprint # | Migration Path |
|---------|--------|--------------|----------------|-------------------|----------|----------------------------|------------------|-----------------|------------|-----------------|------------------|-----------------|------------|----------|----------------|
| Client Features | 488 | Session countdown timer | Not implemented | Add React countdown component | P1 | The appointments page and database structure exist. Add a countdown timer component using React hooks. Switch to JOIN NOW button 5 minutes before appointment time | Poor user experience | ✅ appointments table | ✅ Full RLS | ✅ Indexed dates | 0% | – | – | 5.2 | Frontend only |
| Testing | OLD | End-to-end testing all flows | Not started | Complete E2E tests | P0 | Test all critical user paths with Playwright | Platform bugs | All tables | ✅ Full RLS | N/A | 0% | – | – | 5.2 | Test suite |
| Security | OLD | Security audit | Not started | Audit security | P0 | Comprehensive security audit for GDPR compliance | Data breach risk | All tables | ✅ Full RLS | N/A | 0% | – | – | 5.2 | Audit checklist |
| Performance | OLD | Performance testing | Not started | Load testing | P0 | Test platform performance under load | Poor performance | All tables | ✅ Full RLS | N/A | 0% | – | – | 5.2 | Performance tests |
| Launch | OLD | Launch checklist | Not started | Final checks | P0 | Complete pre-launch checklist | Launch failures | N/A | N/A | N/A | 0% | – | – | 5.2 | Documentation |

#### **AI Execution Guide: Sprint 5.2**
**Model:** Claude 3.5 Sonnet - Best for comprehensive testing and launch preparation.

**Prompt:**
```markdown
You are helping me (a non-technical solo developer with ADHD) implement Sprint 5.2 (Testing & Launch Prep) for Mindfolk production launch.

IMPORTANT CONTEXT FOR YOU (THE AI):
- I am ONE person working alone, not a team
- I am completely non-technical
- I have ADHD - give me baby steps, one thing at a time
- Tell me EXACTLY what to copy, where to paste it, what button to click
- The Supabase MCP DOES allow you to query/read data
- The Supabase MCP DOES allow you to list tables and see structure
- The Supabase MCP DOES allow you to run SELECT queries to look at data
- The Supabase MCP DOES NOT allow you (The AI) to write/change data
- You can only make files, I will copy them to Supabase

CONTEXT - Why These Features Matter to Mindfolk:
- **Session Countdown Timer (0%)**: Critical UX feature - reduces no-shows by creating urgency and preparation mindset.
- **End-to-End Testing (0%)**: Ensures platform reliability before launch.
- **Security Audit (0%)**: Validates GDPR compliance and data protection.
- **Performance Testing (0%)**: Ensures platform can handle expected load.
- **Launch Checklist (0%)**: Systematic verification of production readiness.

CURRENT STATE (from audit):
- ✅ **Ready**: appointments table with all session data
- ✅ **Exists**: Appointments page to add countdown to
- ❌ **Missing**: Countdown component
- ❌ **Not Started**: Comprehensive testing suite
- ❌ **Not Started**: Security and performance audits

FILES YOU SHOULD READ & SQL TO RUN:
- Read PRD: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\docs\MINDFOLK_PRD.md
- Read appointments page: c:\Users\carol\Desktop\Mindfolk Cursor\soulful-sync-care\src\pages\client\Appointments.tsx
- SQL: SELECT * FROM appointments WHERE appointment_date > NOW() AND appointment_date < NOW() + INTERVAL '1 hour';
- SQL: mcp0_list_tables to see all tables
- Check for upcoming sessions: SQL: SELECT COUNT(*) FROM appointments WHERE appointment_date > NOW();
- UK market, GDPR compliance required
- Using Playwright for E2E tests

RECOMMENDED IMPLEMENTATIONS (Verbatim from TODO table - Recommended Implementation column for each row):

- **Recommended Implementation for Session countdown timer**: The appointments page and database structure exist. Add a countdown timer component using React hooks. Switch to JOIN NOW button 5 minutes before appointment time

- **Recommended Implementation for End-to-end testing**: Test all critical user paths with Playwright

- **Recommended Implementation for Security audit**: Comprehensive security audit for GDPR compliance

- **Recommended Implementation for Performance testing**: Test platform performance under load

- **Recommended Implementation for Launch checklist**: Complete pre-launch checklist

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

ACCEPTANCE CRITERIA - How You'll Know Sprint 5.2 is Complete:
✓ Test: Session countdown timer shows correct time remaining
✓ Check: JOIN NOW button appears 5 minutes before session
✓ Test: All critical path E2E tests pass
✓ Verify: Security audit finds no P0 issues (GDPR compliant)
✓ Test: Performance meets targets (<3s page load)
✓ Check: Launch checklist 100% complete
✓ Verify: Runbook covers common scenarios
✓ Check: Production env configured correctly
✓ Test: Seed data works correctly
✓ Verify: All 5 features show 100% completion

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
