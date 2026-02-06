# DevDudes

A powerful AI-powered application generator built with Next.js 16, React 19, and Supabase. DevDudes helps you create production-ready business applications through guided wizards and AI assistance.

## Features

- **The 7 Dudes Pipeline** - Multi-step workflow for building applications
- **Workflow Builder** - Define step-by-step workflows with templates, links, and API services
- **AI Integrations** - Connect to OpenAI, Claude, Mistral, DeepSeek, and n8n
- **Authentication** - Email/password, magic link, OAuth (Google, GitHub, Microsoft), SAML
- **Multi-language** - English and German localization
- **Dark Mode** - System, light, and dark theme support

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **UI:** Tailwind CSS 4, shadcn/ui, Radix UI
- **Backend:** Supabase (auth + database)
- **Validation:** Zod
- **Icons:** Lucide React
- **Drag & Drop:** @dnd-kit

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd devdudes

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations
# Copy lib/supabase/schema.sql to Supabase SQL Editor and run

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Pipeline Overview

The DevDudes pipeline guides you through building applications:

| Step | Name | Description |
|------|------|-------------|
| 1 | **Preset Dude** | Configure business requirements (8 steps) |
| 2 | **Workflow Dude** | Build step-by-step workflows (6 steps) |
| 3 | **Combo Dude** | AI generates app architecture |
| 4 | **Prepair Dude** | Set up development environment |
| 5 | **Dev Dude** | Interactive code development |
| 6 | **Test Dude** | Automated testing |
| 7 | **Deploy Dude** | One-click deployment |
| 8 | **Docu Dude** | Auto-generated documentation |

### Workflow Dude

The Workflow Dude allows you to define detailed workflows:

1. **Build Steps** - Add workflow steps with drag-and-drop reordering
2. **Add Content** - Attach templates, links, and API services to each step
3. **Configure Features** - Select dashboard, notifications, webhooks, etc.
4. **Set Up Auth** - Enable authentication with multiple providers
5. **Customize UI** - Choose theme, colors, and layout
6. **Add AI** - Integrate AI providers (n8n, OpenAI, Claude, Mistral, DeepSeek)
7. **Deploy** - Select target platform and region

## Project Structure

```
app/
├── (auth)/              # Public auth pages
├── (protected)/         # Protected dashboard routes
│   └── dashboard/
│       └── pipeline/    # Pipeline wizards
├── actions/             # Server actions
└── api/                 # API routes

components/
├── dudes/               # Pipeline wizard components
│   ├── preset/          # Preset Dude (8-step config)
│   └── workflow/        # Workflow Dude (6-step builder)
├── dashboard/           # Dashboard components
└── ui/                  # shadcn/ui components

lib/
├── supabase/           # Supabase clients
├── validations/        # Zod schemas
└── i18n/               # Translations
```

## Development

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.
