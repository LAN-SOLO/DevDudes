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

**Backend:** Supabase for authentication (configured via MCP in `.mcp.json`)

**UI Stack:**
- Tailwind CSS 4 with CSS custom properties (oklch color space)
- shadcn/ui components (new-york style, RSC-enabled)
- Radix UI primitives
- Lucide icons

## Project Structure

```
app/
├── (auth)/           # Auth pages (login, signup, reset-password, update-password, callback)
├── (protected)/      # Auth-guarded routes
│   └── dashboard/    # Main dashboard, generator, projects, profile, settings
├── actions/auth.ts   # Server actions for auth (login, signup, logout, etc.)
├── page.tsx          # Landing page
└── layout.tsx        # Root layout

components/
├── auth/             # Auth forms and logout button
├── dashboard/        # Dashboard components (sidebar, header, stats, quick-actions)
├── landing/          # Landing page sections (header, hero, features, pricing, footer)
└── ui/               # shadcn/ui components

lib/
├── supabase/
│   ├── client.ts     # Browser client (createBrowserClient)
│   └── server.ts     # Server client (createServerClient with cookies)
└── utils.ts          # cn() utility

middleware.ts         # Auth session refresh and route protection
```

## Authentication

**Critical:** Use `getUser()` not `getSession()` in middleware - `getUser()` validates JWT on every request.

**Logout:** Must be a Server Component using Server Actions (see `components/auth/logout-button.tsx`).

**Auth Callback:** Only uses `code` parameter with `exchangeCodeForSession(code)` - no `token_hash` or `type` handling needed.

## Key Patterns

**Path Aliases:** Use `@/` prefix for imports (e.g., `@/components/ui/button`)

**Server Actions:** Auth operations in `app/actions/auth.ts` use `'use server'` directive

**Route Groups:** `(auth)` and `(protected)` organize routes without affecting URLs

**Protected Routes:** Middleware redirects unauthenticated users from `/dashboard` to `/login`

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## shadcn/ui

Add new components with: `npx shadcn@latest add <component-name>`

Configuration in `components.json` - uses new-york style, neutral base color.
