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

**Backend:** Supabase (configured via MCP in `.mcp.json`)

**UI Stack:**
- Tailwind CSS 4 with CSS custom properties (oklch color space)
- shadcn/ui components (new-york style, RSC-enabled)
- Radix UI primitives
- Lucide icons

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn/ui components (button, card, dialog, etc.)
- `lib/utils.ts` - `cn()` utility for className merging (clsx + tailwind-merge)

## Key Patterns

**Path Aliases:** Use `@/` prefix for imports (e.g., `@/components/ui/button`)

**Component Variants:** Use class-variance-authority (CVA) for component variants - see `components/ui/button.tsx` for pattern

**Styling:** CSS variables defined in `app/globals.css` with light/dark theme support via `.dark` class

## shadcn/ui

Add new components with: `npx shadcn@latest add <component-name>`

Configuration in `components.json` - uses new-york style, neutral base color.
