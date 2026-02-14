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
│   ├── shared/          # Shared components (ci-upload, recommendation-chips)
│   ├── preset/          # Preset Dude wizard (17-step business config)
│   ├── workflow/        # Workflow Dude wizard (18-step workflow builder)
│   ├── website/         # Website Dude wizard (19-step website config)
│   └── game/            # Game Dude wizard (16-step game config)
├── landing/             # Header, hero, features, pricing, footer
└── ui/                  # shadcn/ui components

lib/
├── supabase/
│   ├── client.ts        # Browser client
│   ├── server.ts        # Server client
│   └── schema.sql       # Database schema (run in Supabase SQL Editor)
├── shared-pipeline/     # Shared pipeline modules (CI upload)
├── types/
│   └── database.ts      # TypeScript types for database tables
├── validations/
│   ├── auth.ts          # Zod schemas for auth
│   ├── workflow.ts      # Zod schemas for workflow pipeline
│   ├── preset.ts        # Zod schemas for preset pipeline
│   ├── website.ts       # Zod schemas for website pipeline
│   └── game.ts          # Zod schemas for game pipeline
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
| Preset | `/pipeline/preset` | 17-step business app configuration |
| Workflow | `/pipeline/workflow` | 18-step workflow builder with rich content |
| **Website** | `/pipeline/website` | **19-step website configuration wizard** |
| **Game** | `/pipeline/game-preset` | **16-step game configuration wizard** |
| Combo | `/pipeline/combo` | AI concept generation |
| Prepair | `/pipeline/prepair` | Environment setup |
| Dev | `/pipeline/dev` | Interactive development |
| Test | `/pipeline/test` | Automated testing |
| Deploy | `/pipeline/deploy` | Deployment configuration |
| Docu | `/pipeline/docu` | Documentation generation |

### Shared: Corporate Identity (CI) Upload

A shared CI upload step is integrated into all three main pipelines (Preset, Workflow, Website). It allows users to upload branding assets that inform the generated output.

**Step Placement:**

| Pipeline | Step # | Position |
|----------|--------|----------|
| Preset | 2 | After Meta (1), before App Shell (3) |
| Workflow | 17 | After UI & Docs (16), before Publishing (18) |
| Website | 4 | After Branding (3), before Layout (5) |

**Data Model:**
```typescript
interface CIAsset {
  id: string
  category: 'logo' | 'letterhead' | 'font' | 'pptx-master' | 'style-example' | 'other'
  fileName: string
  fileType: string    // MIME type
  fileSize: number    // bytes (max 5MB)
  preview?: string    // base64 data URL (raster images only, no SVG)
}

interface CIConfig {
  assets: CIAsset[]
  brandColors: string[]   // hex (#RRGGBB), max 20
  fontPrimary: string
  fontSecondary: string
  brandUrl: string
  brandNotes: string
}
```

**Asset Categories:**

| Category | Accept | Max Files |
|----------|--------|-----------|
| Logo | PNG, SVG, JPG, JPEG, WebP | 1 |
| Letterhead | PNG, JPG, JPEG, PDF | 1 |
| Font Files | TTF, OTF, WOFF, WOFF2 | 5 |
| PPTX Master | PPTX | 1 |
| Style Examples | PNG, JPG, JPEG, PDF, WebP | 10 |
| Other | Any | 5 |

**Key Files:**
- `lib/shared-pipeline/ci.ts` - Types, Zod schemas (`ciAssetSchema`, `ciConfigSchema`), defaults, constants
- `components/dudes/shared/ci-upload.tsx` - Shared upload component (used by all 3 pipelines)
- `components/dudes/*/steps/step-ci.tsx` - Pipeline-specific CI step wrappers

**Security:**
- SVG data URIs blocked in both Zod schema and render (XSS prevention)
- Client-side file extension validation beyond browser `accept` attribute
- FileReader error/abort handlers prevent Promise leaks
- Zod constraints: max file size, max array lengths, hex regex on colors, max string lengths
- Rejected files shown in warning banner with reason

**i18n:** Uses shared `ci.*` namespace (root-level, not pipeline-specific)

**Field naming:** Website pipeline uses `corporateIdentity: CIConfig` (not `ci`) to avoid collision with the existing `ci: string` field (CI/CD provider)

### Workflow Pipeline

The Workflow Dude (`/dashboard/pipeline/workflow`) allows users to define step-by-step workflows with rich content.

**18-Step Wizard:**

| # | Step | Category |
|---|------|----------|
| 1 | Meta & Info | Define |
| 2 | Steps Builder | Define |
| 3 | Triggers & Orchestration | Define |
| 4 | Data Connectors | Data |
| 5 | Variables & Secrets | Data |
| 6 | Storage & Caching | Data |
| 7 | AI Integrations | Intelligence |
| 8 | Features & Modules | Intelligence |
| 9 | Middleware & Plugins | Intelligence |
| 10 | Authentication | Secure |
| 11 | Security & Compliance | Secure |
| 12 | Notifications & Hooks | Secure |
| 13 | Logging & Monitoring | Ship |
| 14 | Testing | Ship |
| 15 | Deployment & CI/CD | Ship |
| 16 | UI & Documentation | Ship |
| 17 | **Corporate Identity** | Ship |
| 18 | Publishing & Distribution | Ship |

**Nav Categories:** Define (1-3), Data (4-6), Intelligence (7-9), Secure (10-12), Ship (13-18)

**Navigation:** Uses `prevStep()`/`nextStep()` functions — step components do NOT use hardcoded step numbers.

**Key Files:**
- `lib/validations/workflow.ts` - Zod schemas (V1 + V2 with migration)
- `lib/workflow-pipeline/types.ts` - TypeScript interfaces (`WorkflowConfigV2`)
- `lib/workflow-pipeline/constants.ts` - Step categories, labels, option arrays
- `lib/workflow-pipeline/analysis.ts` - Complexity scoring, scope estimation
- `lib/workflow-pipeline/prompts.ts` - Document generation
- `lib/workflow-pipeline/recommendations.ts` - AI recommendation engine
- `components/dudes/workflow/workflow-context.tsx` - State management (useWorkflowWizard hook)
- `components/dudes/workflow/step-card.tsx` - Draggable step editor
- `components/dudes/workflow/workflow-wizard.tsx` - Main wizard component
- `app/actions/pipeline.ts` - Server actions (`saveWorkflowConfig`)

**Dependencies:**
- `@dnd-kit/core` and `@dnd-kit/sortable` for drag-and-drop

### Preset Pipeline

The Preset Dude (`/dashboard/pipeline/preset`) configures full-stack business applications.

**17-Step Wizard:**

| # | Step | Category |
|---|------|----------|
| 1 | Meta & Business | Configure |
| 2 | **Corporate Identity** | Configure |
| 3 | App Shell | Configure |
| 4 | Auth & Security | Configure |
| 5 | Database | Data |
| 6 | API Layer | Data |
| 7 | Features & Modules | Data |
| 8 | UI & Theme | Design |
| 9 | Pages & Navigation | Design |
| 10 | Storage & Media | Design |
| 11 | Notifications | Services |
| 12 | AI & Search | Services |
| 13 | Payments | Services |
| 14 | Real-time & Background | Services |
| 15 | Testing & CI/CD | Ship |
| 16 | Integrations | Ship |
| 17 | Deploy | Ship |

**Nav Categories:** Configure (1-4), Data (5-7), Design (8-10), Services (11-14), Ship (15-17)

**Navigation:** Uses hardcoded `setCurrentStep(N)` in step components.

**Key Files:**
- `lib/validations/preset.ts` - Zod schemas (V1 + V2 with migration)
- `lib/preset-pipeline/types.ts` - TypeScript interfaces (`PresetConfigV2`)
- `lib/preset-pipeline/constants.ts` - Step categories, labels, option arrays
- `components/dudes/preset/wizard-context.tsx` - State management (usePresetWizard hook)
- `components/dudes/preset/preset-wizard.tsx` - Main wizard component

### Game Pipeline

The Game Dude (`/dashboard/pipeline/game-preset`) is a 16-step wizard for configuring game projects. It generates two professional documents: an Init Prompt and a Development Concept.

**Flow:** Game Preset (16 steps) → Game Analyze → Game Combo (documents) → Game Summary

**16-Step Wizard:**

| # | Step | Fields | Options |
|---|------|--------|---------|
| 1 | Import | `importedProjectId`, `importMode` | full, config-only, assets-only |
| 2 | Theme | `themes` (max 3), `customTheme`, `elevatorPitch` | 15 themes |
| 3 | Narrative | `narrativeFocus`, `storyStructure`, `victoryCondition` | 5 + 5 + 7 |
| 4 | Genre | `genres` (multi) | 20 genres |
| 5 | Platform | `platforms` (multi), `primaryPlatform` | 10 platforms |
| 6 | Visual | `dimension`, `artStyle` | 3 + 10 |
| 7 | Camera | `cameraStyle` | 4 (2D) / 3 (2.5D) / 6 (3D) |
| 8 | World | `worldStructure`, `levelGeneration`, `worldScope` | 6 + 4 + 4 |
| 9 | Player | `playerMode`, `multiplayer` (maxPlayers, networkModel, syncType) | 5 + 3 + 3 |
| 10 | Core Mechanics | `coreMechanics` (max 3) | 16 mechanics |
| 11 | Secondary | `secondaryMechanics` (multi) | 15 mechanics |
| 12 | Progression | `progressionSystems`, `difficulty`, `rewardTypes` | 8 + 6 + 6 |
| 13 | Audio | `musicStyle`, `soundEffects`, `voiceActing` | 10 + 5 + 5 |
| 14 | Engine | `engine`, `targetFps`, `additionalTech` | 11 + 4 + 8 |
| 15 | Monetization | `businessModel`, `distribution` | 7 + 8 |
| 16 | AI & Notes | `aiFreetext` (7 sub-fields: inGameAi, devAi, detailedDescription, gameplayLoop, referenceGames, constraints, additionalNotes) | 6 + 6 |

**Nav Categories:** Setup (1-3), Design (4-7), World (8-10), Systems (11-13), Tech (14-16)

**Total: ~234 configurable options across 32 constant arrays**

**Data Model:**
```typescript
interface GamePresetConfig {
  importedProjectId: string | null
  importMode: 'full' | 'config-only' | 'assets-only' | ''
  themes: string[]
  customTheme: string
  elevatorPitch: string
  narrativeFocus: string
  storyStructure: string
  victoryCondition: string
  genres: string[]
  platforms: string[]
  primaryPlatform: string
  dimension: string
  artStyle: string
  cameraStyle: string
  worldStructure: string
  levelGeneration: string
  worldScope: string
  playerMode: string
  multiplayer: { maxPlayers: number; networkModel: string; syncType: string }
  coreMechanics: string[]
  secondaryMechanics: string[]
  progressionSystems: string[]
  difficulty: string
  rewardTypes: string[]
  musicStyle: string
  soundEffects: string[]
  voiceActing: string
  engine: string
  targetFps: string
  additionalTech: string[]
  businessModel: string
  distribution: string[]
  aiFreetext: AiFreetext
}

interface GeneratedGameDocs {
  initPrompt: string          // 7-section filled-in init prompt document
  developmentConcept: string  // 11-section filled-in dev concept document
}
```

**Key Files:**
- `lib/validations/game.ts` - Zod schema (`gamePresetConfigSchema`) + `defaultGamePresetConfig`
- `lib/game-pipeline/types.ts` - TypeScript interfaces
- `lib/game-pipeline/constants.ts` - All 32 option arrays (234 options)
- `lib/game-pipeline/recommendations.ts` - AI recommendation engine (5 functions)
- `lib/game-pipeline/analysis.ts` - Complexity scoring, compatibility checks, scope estimation
- `lib/game-pipeline/prompts.ts` - `buildInitPromptDoc()` + `buildDevelopmentConceptDoc()` + engine data for 11 engines
- `components/dudes/game/game-context.tsx` - State management (useGameWizard hook)
- `components/dudes/game/game-wizard.tsx` - Main wizard with keyboard nav + slide transitions
- `components/dudes/game/game-nav.tsx` - Grouped navigation (5 categories)
- `components/dudes/game/game-complete.tsx` - Completion screen with save/export
- `components/dudes/game/shared/` - OptionCard, OptionGrid, GamePreview
- `components/dudes/game/steps/step-*.tsx` - 16 step components
- `app/actions/game-pipeline.ts` - `saveGamePresetConfig()` server action
- `app/api/game-pipeline/` - 3 API routes (projects, analyze, generate)

**Engines supported (with full project structures, error patterns, anti-patterns):**
Unity, Unreal Engine, Godot, Phaser 3, Three.js, PixiJS, GameMaker, RPG Maker, Construct, Bevy, Custom

**Generated Documents:**
1. **Init Prompt** (`buildInitPromptDoc`) - 7 sections: Context, Tech Spec, Instructions (MVP/MAX build order), Constraints (DO NOT), Error Handling, References, Agent Prompts
2. **Development Concept** (`buildDevelopmentConceptDoc`) - 11 sections: Project Overview, Architecture, Data Model, API Design, Tech Stack, Implementation Guidelines, Security, Testing, Deployment, Component Library, DO NOT List

**Database:** Uses `app_type: 'game'` + `preset_config: { type: 'game', ...config }` in projects table

### Adding a New Pipeline Variant

1. Create validation schema in `lib/validations/`
2. Create context provider in `components/dudes/<name>/<name>-context.tsx`
3. Create step components in `components/dudes/<name>/steps/`
4. Create wizard shell (`<name>-wizard.tsx`, `<name>-nav.tsx`, `<name>-complete.tsx`)
5. Create page at `app/(protected)/dashboard/pipeline/<name>/page.tsx`
6. Add to pipeline hub in `app/(protected)/dashboard/pipeline/page.tsx`
7. Add server action in `app/actions/pipeline.ts`
8. Add i18n translations in `lib/i18n/locales/`
9. Integrate CI step: add `CIConfig` to types, `ciConfigSchema` to validation, create `step-ci.tsx` wrapper using shared `<CIUpload />` component
