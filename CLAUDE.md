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
├── dudes/               # Pipeline wizard components
│   ├── preset/          # Preset Dude wizard (8-step business config)
│   └── workflow/        # Workflow Dude wizard (6-step workflow builder)
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
│   ├── auth.ts          # Zod schemas for auth
│   └── workflow.ts      # Zod schemas for workflow pipeline
├── i18n/
│   └── locales/         # en.json, de.json translations
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

## Pipeline (The 7 Dudes)

The pipeline is a multi-step wizard system for building applications. Located at `/dashboard/pipeline`.

### Pipeline Variants

| Dude | Route | Description |
|------|-------|-------------|
| Preset | `/pipeline/preset` | 8-step business app configuration |
| Workflow | `/pipeline/workflow` | 6-step workflow builder with rich content |
| Combo | `/pipeline/combo` | AI concept generation |
| Prepair | `/pipeline/prepair` | Environment setup |
| Dev | `/pipeline/dev` | Interactive development |
| Test | `/pipeline/test` | Automated testing |
| Deploy | `/pipeline/deploy` | Deployment configuration |
| Docu | `/pipeline/docu` | Documentation generation |

### Workflow Pipeline

The Workflow Dude (`/dashboard/pipeline/workflow`) allows users to define step-by-step workflows with rich content.

**6-Step Wizard:**
1. **Step Builder** - Define workflow steps with drag-and-drop reordering
2. **Features** - Select app features (dashboard, notifications, webhooks, etc.)
3. **Auth Config** - Toggle authentication, select methods, define roles
4. **UI Preferences** - Theme, primary color, layout style
5. **AI Integrations** - Configure n8n, OpenAI, Claude, Mistral, DeepSeek
6. **Deployment** - Target platform and region

**Data Model:**
```typescript
interface WorkflowStep {
  id: string
  order: number
  title: string
  description: string
  templates: { id, name, type, size?, url? }[]  // File attachments
  links: { id, label, url, type }[]              // Reference links
  services: { id, name, type, endpoint?, authType }[]  // API services
  isExpanded: boolean
}

interface WorkflowConfig {
  steps: WorkflowStep[]
  features: string[]
  authEnabled: boolean
  authMethods: string[]
  roles: string[]
  theme: 'light' | 'dark' | 'system'
  primaryColor: string
  layout: 'sidebar' | 'topnav' | 'minimal'
  aiIntegrations: AIIntegration[]
  deployTarget: string
  region: string
}
```

**Key Files:**
- `lib/validations/workflow.ts` - Zod schemas and types
- `components/dudes/workflow/workflow-context.tsx` - State management
- `components/dudes/workflow/step-card.tsx` - Draggable step editor
- `components/dudes/workflow/workflow-wizard.tsx` - Main wizard component
- `app/actions/pipeline.ts` - Server actions (`saveWorkflowConfig`)

**Dependencies:**
- `@dnd-kit/core` and `@dnd-kit/sortable` for drag-and-drop

### Adding a New Pipeline Variant

1. Create validation schema in `lib/validations/`
2. Create context provider in `components/dudes/<name>/<name>-context.tsx`
3. Create step components in `components/dudes/<name>/steps/`
4. Create wizard shell (`<name>-wizard.tsx`, `<name>-nav.tsx`, `<name>-complete.tsx`)
5. Create page at `app/(protected)/dashboard/pipeline/<name>/page.tsx`
6. Add to pipeline hub in `app/(protected)/dashboard/pipeline/page.tsx`
7. Add server action in `app/actions/pipeline.ts`
8. Add i18n translations in `lib/i18n/locales/`
