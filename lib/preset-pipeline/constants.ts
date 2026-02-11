import type { PresetOption, StepCategory } from './types'

// ── Step Categories ──────────────────────────────────────────────
export const STEP_CATEGORIES: StepCategory[] = [
  { id: 'configure', label: 'Configure', steps: [1, 2, 3] },
  { id: 'data', label: 'Data', steps: [4, 5, 6] },
  { id: 'design', label: 'Design', steps: [7, 8, 9] },
  { id: 'services', label: 'Services', steps: [10, 11, 12, 13] },
  { id: 'ship', label: 'Ship', steps: [14, 15, 16] },
]

export const STEP_LABELS: Record<number, string> = {
  1: 'Meta & Business',
  2: 'App Shell',
  3: 'Auth & Security',
  4: 'Database',
  5: 'API Layer',
  6: 'Features & Modules',
  7: 'UI & Theme',
  8: 'Pages & Navigation',
  9: 'Storage & Media',
  10: 'Notifications',
  11: 'AI & Search',
  12: 'Payments',
  13: 'Real-time & Background',
  14: 'Testing & CI/CD',
  15: 'Integrations',
  16: 'Deploy',
}

// ── Step 1: Meta ─────────────────────────────────────────────────
export const INDUSTRY_OPTIONS: PresetOption[] = [
  { value: 'technology', label: 'Technology', description: 'Software, SaaS, IT services' },
  { value: 'healthcare', label: 'Healthcare', description: 'Medical, pharma, wellness' },
  { value: 'finance', label: 'Finance', description: 'Banking, fintech, insurance' },
  { value: 'ecommerce', label: 'E-commerce', description: 'Online retail, marketplace' },
  { value: 'education', label: 'Education', description: 'EdTech, LMS, training' },
  { value: 'manufacturing', label: 'Manufacturing', description: 'Production, supply chain' },
  { value: 'real-estate', label: 'Real Estate', description: 'Property, construction' },
  { value: 'hospitality', label: 'Hospitality', description: 'Hotels, restaurants, travel' },
  { value: 'media', label: 'Media', description: 'Content, publishing, streaming' },
  { value: 'other', label: 'Other', description: 'Custom industry' },
]

// ── Step 2: App Shell ────────────────────────────────────────────
export const APP_TYPE_OPTIONS: PresetOption[] = [
  { value: 'crm', label: 'CRM', description: 'Manage customers and sales' },
  { value: 'inventory', label: 'Inventory', description: 'Track products and stock' },
  { value: 'invoicing', label: 'Invoicing', description: 'Billing and payments' },
  { value: 'hrm', label: 'HR Management', description: 'Employees and payroll' },
  { value: 'project', label: 'Project Manager', description: 'Tasks and timelines' },
  { value: 'helpdesk', label: 'Help Desk', description: 'Support tickets' },
  { value: 'ecommerce', label: 'E-commerce', description: 'Online store' },
  { value: 'analytics', label: 'Analytics', description: 'Reports and dashboards' },
  { value: 'cms', label: 'CMS', description: 'Content management' },
  { value: 'social', label: 'Social Platform', description: 'Community and messaging' },
  { value: 'custom', label: 'Custom', description: 'Build from scratch' },
]

export const FRAMEWORK_OPTIONS: PresetOption[] = [
  { value: 'nextjs', label: 'Next.js', description: 'Full-stack React framework' },
  { value: 'remix', label: 'Remix', description: 'Full-stack web framework' },
  { value: 'astro', label: 'Astro', description: 'Content-focused framework' },
  { value: 'nuxt', label: 'Nuxt', description: 'Vue.js framework' },
  { value: 'sveltekit', label: 'SvelteKit', description: 'Svelte framework' },
]

export const LANGUAGE_OPTIONS: PresetOption[] = [
  { value: 'typescript', label: 'TypeScript', description: 'Type-safe JavaScript' },
  { value: 'javascript', label: 'JavaScript', description: 'Dynamic scripting' },
]

export const RUNTIME_OPTIONS: PresetOption[] = [
  { value: 'node', label: 'Node.js', description: 'Standard runtime' },
  { value: 'bun', label: 'Bun', description: 'Fast all-in-one runtime' },
  { value: 'deno', label: 'Deno', description: 'Secure runtime' },
]

export const TARGET_USER_OPTIONS: PresetOption[] = [
  { value: 'internal', label: 'Internal Team', description: 'Employees only' },
  { value: 'customers', label: 'Customers', description: 'External users' },
  { value: 'both', label: 'Both', description: 'Internal and external' },
]

export const LOCALE_OPTIONS: PresetOption[] = [
  { value: 'en', label: 'English', description: 'en' },
  { value: 'de', label: 'German', description: 'de' },
  { value: 'fr', label: 'French', description: 'fr' },
  { value: 'es', label: 'Spanish', description: 'es' },
  { value: 'pt', label: 'Portuguese', description: 'pt' },
  { value: 'ja', label: 'Japanese', description: 'ja' },
  { value: 'zh', label: 'Chinese', description: 'zh' },
  { value: 'ko', label: 'Korean', description: 'ko' },
]

// ── Step 3: Auth & Security ──────────────────────────────────────
export const AUTH_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'email', label: 'Email & Password', description: 'Traditional login' },
  { value: 'magic-link', label: 'Magic Link', description: 'Passwordless email' },
  { value: 'google', label: 'Google', description: 'OAuth provider' },
  { value: 'github', label: 'GitHub', description: 'OAuth provider' },
  { value: 'microsoft', label: 'Microsoft', description: 'Azure AD / Office 365' },
  { value: 'saml', label: 'SAML/SSO', description: 'Enterprise single sign-on' },
  { value: 'apple', label: 'Apple', description: 'Sign in with Apple' },
]

export const SESSION_STRATEGY_OPTIONS: PresetOption[] = [
  { value: 'jwt', label: 'JWT', description: 'Stateless token-based' },
  { value: 'session', label: 'Server Session', description: 'Stateful server-side' },
  { value: 'hybrid', label: 'Hybrid', description: 'JWT + refresh tokens' },
]

// ── Step 4: Database ─────────────────────────────────────────────
export const DB_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'postgresql', label: 'PostgreSQL', description: 'Advanced relational DB' },
  { value: 'mysql', label: 'MySQL', description: 'Popular relational DB' },
  { value: 'mongodb', label: 'MongoDB', description: 'Document database' },
  { value: 'sqlite', label: 'SQLite', description: 'File-based database' },
  { value: 'supabase', label: 'Supabase', description: 'Postgres + Auth + Storage' },
  { value: 'planetscale', label: 'PlanetScale', description: 'Serverless MySQL' },
  { value: 'turso', label: 'Turso', description: 'Edge SQLite' },
]

export const ORM_OPTIONS: PresetOption[] = [
  { value: 'prisma', label: 'Prisma', description: 'Type-safe ORM' },
  { value: 'drizzle', label: 'Drizzle', description: 'Lightweight TypeScript ORM' },
  { value: 'typeorm', label: 'TypeORM', description: 'Decorator-based ORM' },
  { value: 'kysely', label: 'Kysely', description: 'Type-safe SQL builder' },
  { value: 'none', label: 'Raw SQL', description: 'Direct database queries' },
]

// ── Step 5: API Layer ────────────────────────────────────────────
export const API_STYLE_OPTIONS: PresetOption[] = [
  { value: 'rest', label: 'REST', description: 'RESTful API endpoints' },
  { value: 'graphql', label: 'GraphQL', description: 'Query language for APIs' },
  { value: 'trpc', label: 'tRPC', description: 'End-to-end type-safe API' },
  { value: 'grpc', label: 'gRPC', description: 'High-performance RPC' },
]

export const PAGINATION_OPTIONS: PresetOption[] = [
  { value: 'offset', label: 'Offset', description: 'Traditional page-based' },
  { value: 'cursor', label: 'Cursor', description: 'Cursor-based pagination' },
  { value: 'keyset', label: 'Keyset', description: 'Seek-based pagination' },
]

// ── Step 6: Features ─────────────────────────────────────────────
export const CORE_FEATURE_OPTIONS: PresetOption[] = [
  { value: 'dashboard', label: 'Dashboard', description: 'Overview and analytics' },
  { value: 'search', label: 'Global Search', description: 'Find anything quickly' },
  { value: 'notifications', label: 'Notifications', description: 'In-app alerts' },
  { value: 'export', label: 'Data Export', description: 'CSV and PDF exports' },
  { value: 'audit', label: 'Audit Log', description: 'Track all changes' },
  { value: 'api-access', label: 'API Access', description: 'REST API for integrations' },
  { value: 'file-upload', label: 'File Upload', description: 'Upload and manage files' },
  { value: 'user-management', label: 'User Management', description: 'Manage users and permissions' },
  { value: 'settings', label: 'Settings', description: 'App configuration panel' },
  { value: 'multi-language', label: 'Multi-language', description: 'i18n support' },
  { value: 'dark-mode', label: 'Dark Mode', description: 'Theme switching' },
  { value: 'email-templates', label: 'Email Templates', description: 'Transactional emails' },
]

// ── Step 7: UI & Theme ───────────────────────────────────────────
export const COMPONENT_LIBRARY_OPTIONS: PresetOption[] = [
  { value: 'shadcn', label: 'shadcn/ui', description: 'Radix + Tailwind components' },
  { value: 'mui', label: 'Material UI', description: 'Google Material Design' },
  { value: 'chakra', label: 'Chakra UI', description: 'Simple, modular components' },
  { value: 'ant', label: 'Ant Design', description: 'Enterprise components' },
  { value: 'mantine', label: 'Mantine', description: 'Fully featured components' },
  { value: 'custom', label: 'Custom', description: 'Build your own' },
]

export const FONT_OPTIONS: PresetOption[] = [
  { value: 'inter', label: 'Inter', description: 'Modern sans-serif' },
  { value: 'geist', label: 'Geist', description: 'Vercel system font' },
  { value: 'roboto', label: 'Roboto', description: 'Google Material font' },
  { value: 'poppins', label: 'Poppins', description: 'Geometric sans-serif' },
  { value: 'system', label: 'System', description: 'OS default font' },
]

export const LAYOUT_OPTIONS: PresetOption[] = [
  { value: 'sidebar', label: 'Sidebar', description: 'Navigation on the left' },
  { value: 'topnav', label: 'Top Navigation', description: 'Navigation at top' },
  { value: 'minimal', label: 'Minimal', description: 'Clean, simple layout' },
  { value: 'dashboard', label: 'Dashboard', description: 'Admin-style layout' },
]

export const COLOR_OPTIONS: PresetOption[] = [
  { value: '#0066FF', label: 'Blue' },
  { value: '#10B981', label: 'Green' },
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#F59E0B', label: 'Amber' },
  { value: '#EF4444', label: 'Red' },
  { value: '#EC4899', label: 'Pink' },
  { value: '#06B6D4', label: 'Cyan' },
  { value: '#6366F1', label: 'Indigo' },
]

// ── Step 9: Storage ──────────────────────────────────────────────
export const STORAGE_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 's3', label: 'AWS S3', description: 'Amazon file storage' },
  { value: 'gcs', label: 'Google Cloud Storage', description: 'GCP storage' },
  { value: 'cloudinary', label: 'Cloudinary', description: 'Image management' },
  { value: 'supabase', label: 'Supabase Storage', description: 'Built-in storage' },
  { value: 'uploadthing', label: 'UploadThing', description: 'Simple file uploads' },
  { value: 'local', label: 'Local', description: 'Server filesystem' },
]

export const FILE_TYPE_OPTIONS: PresetOption[] = [
  { value: 'images', label: 'Images', description: 'PNG, JPG, WebP, SVG' },
  { value: 'documents', label: 'Documents', description: 'PDF, DOCX, XLSX' },
  { value: 'videos', label: 'Videos', description: 'MP4, WebM' },
  { value: 'audio', label: 'Audio', description: 'MP3, WAV' },
  { value: 'archives', label: 'Archives', description: 'ZIP, RAR' },
]

// ── Step 10: Notifications ───────────────────────────────────────
export const EMAIL_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'sendgrid', label: 'SendGrid', description: 'Email delivery' },
  { value: 'resend', label: 'Resend', description: 'Developer email API' },
  { value: 'postmark', label: 'Postmark', description: 'Transactional email' },
  { value: 'ses', label: 'AWS SES', description: 'Amazon email service' },
]

export const PUSH_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'firebase', label: 'Firebase', description: 'Google push notifications' },
  { value: 'onesignal', label: 'OneSignal', description: 'Multi-platform push' },
  { value: 'web-push', label: 'Web Push', description: 'Browser notifications' },
]

export const SMS_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'twilio', label: 'Twilio', description: 'SMS and voice' },
  { value: 'vonage', label: 'Vonage', description: 'Communication APIs' },
  { value: 'messagebird', label: 'MessageBird', description: 'Omnichannel messaging' },
]

// ── Step 11: AI & Search ─────────────────────────────────────────
export const AI_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'openai', label: 'OpenAI', description: 'GPT models' },
  { value: 'anthropic', label: 'Anthropic', description: 'Claude models' },
  { value: 'google', label: 'Google AI', description: 'Gemini models' },
  { value: 'mistral', label: 'Mistral', description: 'Open-weight models' },
  { value: 'local', label: 'Local/Ollama', description: 'Self-hosted models' },
]

export const AI_FEATURE_OPTIONS: PresetOption[] = [
  { value: 'chat', label: 'Chat', description: 'Conversational AI' },
  { value: 'summarization', label: 'Summarization', description: 'Text summaries' },
  { value: 'classification', label: 'Classification', description: 'Content categorization' },
  { value: 'generation', label: 'Generation', description: 'Content creation' },
  { value: 'embeddings', label: 'Embeddings', description: 'Vector representations' },
  { value: 'code-assist', label: 'Code Assist', description: 'AI code completion' },
]

export const SEARCH_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'algolia', label: 'Algolia', description: 'Hosted search' },
  { value: 'meilisearch', label: 'Meilisearch', description: 'Open-source search' },
  { value: 'typesense', label: 'Typesense', description: 'Typo-tolerant search' },
  { value: 'elasticsearch', label: 'Elasticsearch', description: 'Full-text search' },
  { value: 'built-in', label: 'Built-in', description: 'Database full-text search' },
]

export const SEARCH_INDEXING_OPTIONS: PresetOption[] = [
  { value: 'realtime', label: 'Real-time', description: 'Index on write' },
  { value: 'batch', label: 'Batch', description: 'Periodic reindexing' },
  { value: 'manual', label: 'Manual', description: 'On-demand indexing' },
]

// ── Step 12: Payments ────────────────────────────────────────────
export const PAYMENT_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'stripe', label: 'Stripe', description: 'Full payment platform' },
  { value: 'paypal', label: 'PayPal', description: 'Online payments' },
  { value: 'paddle', label: 'Paddle', description: 'SaaS billing' },
  { value: 'lemonsqueezy', label: 'Lemon Squeezy', description: 'Digital product sales' },
]

export const PLAN_INTERVAL_OPTIONS: PresetOption[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
  { value: 'one-time', label: 'One-time' },
]

// ── Step 13: Real-time & Background ──────────────────────────────
export const QUEUE_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'bullmq', label: 'BullMQ', description: 'Redis-based queue' },
  { value: 'sqs', label: 'AWS SQS', description: 'Amazon queue service' },
  { value: 'inngest', label: 'Inngest', description: 'Event-driven functions' },
  { value: 'trigger', label: 'Trigger.dev', description: 'Background jobs' },
  { value: 'none', label: 'None', description: 'No background queue' },
]

export const CACHE_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'redis', label: 'Redis', description: 'In-memory cache' },
  { value: 'upstash', label: 'Upstash', description: 'Serverless Redis' },
  { value: 'memcached', label: 'Memcached', description: 'Distributed cache' },
  { value: 'none', label: 'None', description: 'No caching layer' },
]

export const LOGGING_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'sentry', label: 'Sentry', description: 'Error tracking' },
  { value: 'datadog', label: 'Datadog', description: 'Full observability' },
  { value: 'logtail', label: 'Logtail', description: 'Log management' },
  { value: 'axiom', label: 'Axiom', description: 'Log analytics' },
  { value: 'console', label: 'Console', description: 'Built-in logging' },
]

// ── Step 14: Testing & CI/CD ─────────────────────────────────────
export const UNIT_FRAMEWORK_OPTIONS: PresetOption[] = [
  { value: 'vitest', label: 'Vitest', description: 'Vite-native testing' },
  { value: 'jest', label: 'Jest', description: 'JavaScript testing' },
  { value: 'node-test', label: 'Node Test', description: 'Built-in Node.js runner' },
]

export const E2E_FRAMEWORK_OPTIONS: PresetOption[] = [
  { value: 'playwright', label: 'Playwright', description: 'Cross-browser testing' },
  { value: 'cypress', label: 'Cypress', description: 'E2E testing framework' },
  { value: 'none', label: 'None', description: 'No E2E testing' },
]

export const CI_PROVIDER_OPTIONS: PresetOption[] = [
  { value: 'github-actions', label: 'GitHub Actions', description: 'GitHub CI/CD' },
  { value: 'gitlab-ci', label: 'GitLab CI', description: 'GitLab pipelines' },
  { value: 'vercel', label: 'Vercel', description: 'Auto deployment' },
  { value: 'circleci', label: 'CircleCI', description: 'Continuous integration' },
]

export const CI_STAGE_OPTIONS: PresetOption[] = [
  { value: 'lint', label: 'Lint', description: 'Code quality checks' },
  { value: 'typecheck', label: 'Type Check', description: 'TypeScript validation' },
  { value: 'unit-test', label: 'Unit Tests', description: 'Run unit tests' },
  { value: 'e2e-test', label: 'E2E Tests', description: 'Run end-to-end tests' },
  { value: 'build', label: 'Build', description: 'Production build' },
  { value: 'deploy', label: 'Deploy', description: 'Deploy to environment' },
]

export const ENVIRONMENT_OPTIONS: PresetOption[] = [
  { value: 'development', label: 'Development', description: 'Local dev' },
  { value: 'staging', label: 'Staging', description: 'Pre-production' },
  { value: 'production', label: 'Production', description: 'Live environment' },
]

// ── Step 15: Integrations ────────────────────────────────────────
export const INTEGRATION_TYPE_OPTIONS: PresetOption[] = [
  { value: 'payment', label: 'Payment', description: 'Payment processing' },
  { value: 'communication', label: 'Communication', description: 'Email, SMS, chat' },
  { value: 'storage', label: 'Storage', description: 'File storage' },
  { value: 'analytics', label: 'Analytics', description: 'Usage tracking' },
  { value: 'monitoring', label: 'Monitoring', description: 'Error tracking' },
  { value: 'ai', label: 'AI', description: 'AI capabilities' },
  { value: 'automation', label: 'Automation', description: 'Workflow automation' },
]

export const INTEGRATION_SERVICE_OPTIONS: PresetOption[] = [
  { value: 'stripe', label: 'Stripe', description: 'Payment processing' },
  { value: 'paypal', label: 'PayPal', description: 'Online payments' },
  { value: 'sendgrid', label: 'SendGrid', description: 'Email delivery' },
  { value: 'twilio', label: 'Twilio', description: 'SMS and voice' },
  { value: 'slack', label: 'Slack', description: 'Team notifications' },
  { value: 's3', label: 'AWS S3', description: 'File storage' },
  { value: 'cloudinary', label: 'Cloudinary', description: 'Image management' },
  { value: 'google-analytics', label: 'Google Analytics', description: 'Usage tracking' },
  { value: 'posthog', label: 'PostHog', description: 'Product analytics' },
  { value: 'sentry', label: 'Sentry', description: 'Error tracking' },
  { value: 'openai', label: 'OpenAI', description: 'AI capabilities' },
  { value: 'zapier', label: 'Zapier', description: 'Workflow automation' },
]

// ── Step 16: Deploy ──────────────────────────────────────────────
export const DEPLOY_TARGET_OPTIONS: PresetOption[] = [
  { value: 'vercel', label: 'Vercel', description: 'Recommended for Next.js' },
  { value: 'aws', label: 'AWS', description: 'Amazon Web Services' },
  { value: 'gcp', label: 'Google Cloud', description: 'Google Cloud Platform' },
  { value: 'docker', label: 'Docker', description: 'Container export' },
  { value: 'self-host', label: 'Self-hosted', description: 'Your own server' },
  { value: 'netlify', label: 'Netlify', description: 'JAMstack hosting' },
  { value: 'railway', label: 'Railway', description: 'Simple cloud hosting' },
]

export const REGION_OPTIONS: PresetOption[] = [
  { value: 'auto', label: 'Auto (Recommended)', description: 'Closest to your users' },
  { value: 'us-east', label: 'US East', description: 'North Virginia' },
  { value: 'us-west', label: 'US West', description: 'San Francisco' },
  { value: 'eu-west', label: 'Europe', description: 'Frankfurt' },
  { value: 'ap-south', label: 'Asia Pacific', description: 'Singapore' },
]

export const SCALING_OPTIONS: PresetOption[] = [
  { value: 'auto', label: 'Auto Scaling', description: 'Scale based on load' },
  { value: 'fixed', label: 'Fixed', description: 'Static resources' },
  { value: 'serverless', label: 'Serverless', description: 'Pay per request' },
]
