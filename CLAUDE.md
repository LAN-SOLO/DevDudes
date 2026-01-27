# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

**Framework:** Next.js 16 with App Router, React 19, TypeScript (strict mode)

**Backend:** Supabase (auth + database, configured via MCP in `.mcp.json`)

**UI Stack:**
- Tailwind CSS 4 with CSS custom properties (oklch color space)
- shadcn/ui components (new-york style, RSC-enabled)
- Radix UI primitives
- Lucide icons
- Zod for validation

## Project Structure

```
app/
├── (auth)/              # Auth pages (login, signup, reset-password, update-password, callback)
├── (protected)/         # Auth-guarded routes
│   └── dashboard/       # Dashboard, generator, projects, profile, settings, etc.
├── actions/
│   ├── auth.ts          # Auth server actions (login, signup, logout, password reset)
│   ├── projects.ts      # Project CRUD operations
│   └── profile.ts       # Profile management
├── page.tsx             # Landing page
└── layout.tsx           # Root layout

components/
├── auth/                # Auth forms, OAuth buttons, password strength
├── dashboard/           # Sidebar, header, stats, quick-actions
├── landing/             # Header, hero, features, pricing, footer
└── ui/                  # shadcn/ui components

lib/
├── supabase/
│   ├── client.ts        # Browser client
│   ├── server.ts        # Server client
│   └── schema.sql       # Database schema (run in Supabase SQL Editor)
├── types/
│   └── database.ts      # TypeScript types for database tables
├── validations/
│   └── auth.ts          # Zod schemas for auth
└── utils.ts             # cn() utility

middleware.ts            # Auth session refresh and route protection
```

## Database Schema

Run `lib/supabase/schema.sql` in Supabase SQL Editor to create:
- `profiles` - User profiles (auto-created on signup via trigger)
- `projects` - App projects with status tracking
- `project_versions` - Version history
- `deployments` - Multi-environment deployments
- `audit_logs` - Compliance logging

All tables have RLS policies enabled.

## Authentication

**Supported methods:** Email/Password, Google OAuth, GitHub OAuth

**Critical rules:**
- Use `getUser()` not `getSession()` in middleware
- Logout must be Server Component using Server Actions
- Auth callback only uses `code` parameter with `exchangeCodeForSession(code)`

**OAuth setup:** Enable Google/GitHub in Supabase Dashboard → Authentication → Providers

## Key Patterns

**Path Aliases:** Use `@/` prefix for imports

**Server Actions:** All mutations use `'use server'` directive with Zod validation

**Route Groups:** `(auth)` and `(protected)` organize routes without affecting URLs

**Protected Routes:** Middleware + layout guards redirect unauthenticated users

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3005
```

## Security

- Security headers configured in `next.config.ts`
- Input validation with Zod on all server actions
- Password strength requirements (8+ chars, upper/lower/number)
- RLS policies on all database tables

## shadcn/ui

Add new components: `npx shadcn@latest add <component-name>`

Configuration in `components.json` - uses new-york style, neutral base color.
