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
- **Warm color palette**: Jovial Jade (155 28% 28%), Garden Green (145 27% 35%), Warm White (32 100% 97%)
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

## 🔧 Development

- **Linting**: ESLint + TypeScript strict mode
- **Formatting**: Prettier (configured)
- **Components**: Custom shadcn/ui variants with design system tokens
- **Forms**: React Hook Form + Zod validation
- **Testing**: Unit tests for matching algorithm

## 📝 License

Built for MindFolk therapy matching platform.