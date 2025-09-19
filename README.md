# MindFolk - Personality-First Therapy Matching

A beautiful, accessible web application for connecting clients with therapists through video profiles and personality-based matching.

## ✨ Features

- **Personality-First Matching**: Advanced algorithm weighing compatibility factors
- **Video Profiles**: 30-60s therapist introductions for authentic connections
- **Free Chemistry Calls**: 15-minute sessions before committing
- **WCAG 2.1 AA Compliant**: Fully accessible design
- **Beautiful Design System**: Consistent UI using MindFolk Style Guide 2.3

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mindfolk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The server will start on port 5173 (or next available port if taken)

## 🏗️ Architecture

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State**: TanStack Query + Zustand
- **Auth**: Clerk with RBAC (client/therapist/admin/support)
- **Backend**: Supabase (Database, Storage, Edge Functions, Realtime)
- **Video**: Daily.co (sessions) + Cloudflare Stream (profiles)
- **Payments**: Stripe Connect + Billing
- **Email/SMS**: Resend + Twilio

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components + custom
│   └── layout/         # Header, Footer, Container
├── pages/              # Route components
│   ├── public/         # Landing, auth, legal
│   ├── client/         # Client dashboard & features
│   ├── therapist/      # Therapist tools & analytics
│   └── admin/          # Admin oversight & management
├── lib/                # Utilities and core logic
│   └── matching.ts     # Personality matching algorithm
└── assets/             # Images and static files
```

## 🎨 Design System

Built with MindFolk Style Guide 2.3 featuring:
- **Core Brand Colors**: Jovial Jade (155 28% 28%), Garden Green (145 27% 35%), Elated Emerald (149 28% 32%)
- **Surface & Background**: Warm White (32 100% 97%), Surface (0 0% 100%), Surface Accent (134 23% 92%)
- **Text & Border**: Text Primary (145 23% 35%), Text Secondary (220 13% 46%), Ink Slate (198 33% 17%), Border (220 13% 91%)
- **Button Colors**: Primary (145 27% 35%), Accent (25 100% 87%), CTA (134 23% 92%)
- **Tag System**: Personality (25 100% 87%), Modality (134 23% 92%), Specialty (211 38% 93%), Language (267 55% 94%), Misc (22 41% 92%)
- **System Colors**: Success (145 27% 35%), Warning (14 88% 83%), Error (14 88% 83%), Info (149 28% 32%)
- **Typography**: Crimson Pro (headings) + Helvetica Neue (body)
- **Semantic tokens**: All colors, spacing, and typography defined systematically
- **Accessibility**: 44px+ touch targets, proper contrast ratios

## 🧠 Matching Algorithm

The personality-first matching system weighs:
- **Personality Compatibility** (40%): Communication style alignment
- **Identity Affirming** (20%): Cultural and identity preferences
- **Specialty Match** (20%): Therapeutic focus areas
- **Modality Preferences** (15%): Treatment approach alignment
- **Availability Fit** (5%): Schedule compatibility

### ✅ Current Status: Fully Integrated
- **Algorithm**: Implemented with exact tag matching and budget hard filters
- **UI Integration**: Connected to client assessment and therapist discovery
- **Testing**: 15/15 tests passing (unit + integration tests)
- **Data Flow**: Assessment → localStorage → matching algorithm → ranked results

### 🔄 Database Integration (When Supabase Connected)
The algorithm is ready for database integration. Current mock data will be replaced with:
- **Therapist Data**: Query from `therapists` table
- **Client Assessments**: Store in `client_assessments` table  
- **Match Results**: Store in `match_results` table for analytics

See `src/lib/matching.ts` for detailed integration notes and schema requirements.

## 🔧 Development

- **Linting**: ESLint + TypeScript strict mode
- **Formatting**: Prettier (configured)
- **Components**: Custom shadcn/ui variants with design system tokens
- **Forms**: React Hook Form + Zod validation
- **Testing**: Unit tests for matching algorithm
- **Visual Testing**: Storybook + Chromatic + Playwright with smart port detection
- **Screenshots**: Automated screenshot capture with smart port detection
- **Analysis**: Comprehensive screenshot analysis with smart port detection
- **Development Tools**: All tools automatically detect dev server port

## 📝 License

Built for MindFolk therapy matching platform.