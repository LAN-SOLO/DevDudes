import type { WorkflowOption, WorkflowStepCategory } from './types'

// ── Step Categories ──────────────────────────────────────────────
export const WORKFLOW_STEP_CATEGORIES: WorkflowStepCategory[] = [
  { id: 'define', label: 'Define', steps: [1, 2, 3] },
  { id: 'data', label: 'Data', steps: [4, 5, 6] },
  { id: 'intelligence', label: 'Intelligence', steps: [7, 8, 9] },
  { id: 'secure', label: 'Secure', steps: [10, 11, 12] },
  { id: 'ship', label: 'Ship', steps: [13, 14, 15, 16, 17, 18] },
]

export const WORKFLOW_STEP_LABELS: Record<number, string> = {
  1: 'Meta & Info',
  2: 'Steps Builder',
  3: 'Triggers & Orchestration',
  4: 'Data Connectors',
  5: 'Variables & Secrets',
  6: 'Storage & Caching',
  7: 'AI Integrations',
  8: 'Features & Modules',
  9: 'Middleware & Plugins',
  10: 'Authentication',
  11: 'Security & Compliance',
  12: 'Notifications & Hooks',
  13: 'Logging & Monitoring',
  14: 'Testing',
  15: 'Deployment & CI/CD',
  16: 'UI & Documentation',
  17: 'Corporate Identity',
  18: 'Publishing & Distribution',
}

// ── Step 1: Meta ────────────────────────────────────────────────
export const LICENSE_OPTIONS: WorkflowOption[] = [
  { value: 'MIT', label: 'MIT', description: 'Permissive open source' },
  { value: 'Apache-2.0', label: 'Apache 2.0', description: 'Permissive with patent grant' },
  { value: 'GPL-3.0', label: 'GPL 3.0', description: 'Copyleft open source' },
  { value: 'BSD-3', label: 'BSD 3-Clause', description: 'Permissive with attribution' },
  { value: 'proprietary', label: 'Proprietary', description: 'Closed source' },
  { value: 'none', label: 'None', description: 'No license specified' },
]

// ── Step 2: Steps Builder ───────────────────────────────────────
export const STEP_TYPE_OPTIONS: WorkflowOption[] = [
  { value: 'action', label: 'Action', description: 'Execute a task' },
  { value: 'condition', label: 'Condition', description: 'Branch based on logic' },
  { value: 'loop', label: 'Loop', description: 'Repeat for each item' },
  { value: 'parallel', label: 'Parallel', description: 'Run branches concurrently' },
  { value: 'delay', label: 'Delay', description: 'Wait before continuing' },
  { value: 'webhook', label: 'Webhook', description: 'Wait for external callback' },
  { value: 'manual', label: 'Manual', description: 'Require human approval' },
]

export const ERROR_HANDLING_OPTIONS: WorkflowOption[] = [
  { value: 'stop', label: 'Stop', description: 'Halt workflow on error' },
  { value: 'skip', label: 'Skip', description: 'Skip step and continue' },
  { value: 'retry', label: 'Retry', description: 'Retry the step' },
  { value: 'fallback', label: 'Fallback', description: 'Run fallback step' },
]

// ── Step 3: Triggers & Orchestration ───────────────────────────
export const TRIGGER_TYPE_OPTIONS: WorkflowOption[] = [
  { value: 'manual', label: 'Manual', description: 'Triggered by user action' },
  { value: 'cron', label: 'Cron Schedule', description: 'Recurring time-based trigger' },
  { value: 'webhook', label: 'Webhook', description: 'Triggered by HTTP callback' },
  { value: 'event', label: 'Event', description: 'Triggered by system event' },
  { value: 'api', label: 'API Call', description: 'Triggered via REST API' },
  { value: 'file-watch', label: 'File Watch', description: 'Triggered by file changes' },
  { value: 'queue', label: 'Queue Message', description: 'Triggered by queue message' },
  { value: 'schedule', label: 'Schedule', description: 'One-time scheduled trigger' },
]

export const ORCHESTRATION_MODE_OPTIONS: WorkflowOption[] = [
  { value: 'sequential', label: 'Sequential', description: 'Run steps one after another' },
  { value: 'parallel', label: 'Parallel', description: 'Run steps concurrently' },
  { value: 'dag', label: 'DAG', description: 'Directed acyclic graph execution' },
  { value: 'saga', label: 'Saga', description: 'Distributed transaction pattern' },
  { value: 'state-machine', label: 'State Machine', description: 'State-driven transitions' },
  { value: 'event-driven', label: 'Event-Driven', description: 'Reactive event processing' },
]

export const RETRY_POLICY_OPTIONS: WorkflowOption[] = [
  { value: 'none', label: 'None', description: 'No retry' },
  { value: 'fixed', label: 'Fixed Delay', description: 'Retry with fixed interval' },
  { value: 'exponential', label: 'Exponential Backoff', description: 'Increasing delay between retries' },
]

// ── Step 4: Data Connectors ────────────────────────────────────
export const DATA_CONNECTOR_TYPE_OPTIONS: WorkflowOption[] = [
  { value: 'database', label: 'Database', description: 'SQL or NoSQL database' },
  { value: 'api', label: 'REST API', description: 'External HTTP API' },
  { value: 'file', label: 'File System', description: 'Local or remote files' },
  { value: 'stream', label: 'Stream', description: 'Real-time data stream' },
  { value: 'queue', label: 'Queue', description: 'Message queue' },
  { value: 'cache', label: 'Cache', description: 'Cache layer' },
]

export const DATA_CONNECTOR_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'postgresql', label: 'PostgreSQL', description: 'Relational database' },
  { value: 'mysql', label: 'MySQL', description: 'Relational database' },
  { value: 'mongodb', label: 'MongoDB', description: 'Document database' },
  { value: 'redis', label: 'Redis', description: 'In-memory data store' },
  { value: 'supabase', label: 'Supabase', description: 'Postgres + Auth + Storage' },
  { value: 'firebase', label: 'Firebase', description: 'Google real-time database' },
  { value: 'elasticsearch', label: 'Elasticsearch', description: 'Search engine' },
  { value: 'kafka', label: 'Kafka', description: 'Event streaming' },
  { value: 'untermstrich', label: 'untermStrich', description: 'Project controlling & time tracking' },
  { value: 'custom', label: 'Custom', description: 'Custom connection' },
]

// ── Step 5: Variables & Secrets ────────────────────────────────
export const VARIABLE_SCOPE_OPTIONS: WorkflowOption[] = [
  { value: 'global', label: 'Global', description: 'Available everywhere' },
  { value: 'environment', label: 'Environment', description: 'Per-environment values' },
  { value: 'runtime', label: 'Runtime', description: 'Set during execution' },
  { value: 'computed', label: 'Computed', description: 'Derived from other variables' },
]

export const SECRETS_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'env', label: 'Environment Variables', description: 'Local .env files' },
  { value: 'vault', label: 'HashiCorp Vault', description: 'Secret management' },
  { value: 'aws-secrets', label: 'AWS Secrets Manager', description: 'AWS secret storage' },
  { value: 'gcp-secrets', label: 'GCP Secret Manager', description: 'Google secret storage' },
  { value: 'azure-keyvault', label: 'Azure Key Vault', description: 'Azure secret storage' },
  { value: 'doppler', label: 'Doppler', description: 'Universal secrets manager' },
]

// ── Step 6: Storage & Caching ──────────────────────────────────
export const STORAGE_TYPE_OPTIONS: WorkflowOption[] = [
  { value: 'local', label: 'Local', description: 'Server filesystem' },
  { value: 's3', label: 'AWS S3', description: 'Amazon file storage' },
  { value: 'gcs', label: 'Google Cloud Storage', description: 'GCP storage' },
  { value: 'azure-blob', label: 'Azure Blob', description: 'Azure storage' },
  { value: 'minio', label: 'MinIO', description: 'S3-compatible storage' },
]

export const CACHE_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'redis', label: 'Redis', description: 'In-memory cache' },
  { value: 'memcached', label: 'Memcached', description: 'Distributed cache' },
  { value: 'upstash', label: 'Upstash', description: 'Serverless Redis' },
  { value: 'in-memory', label: 'In-Memory', description: 'Local process cache' },
  { value: 'none', label: 'None', description: 'No caching' },
]

export const CACHE_STRATEGY_OPTIONS: WorkflowOption[] = [
  { value: 'lru', label: 'LRU', description: 'Least Recently Used' },
  { value: 'lfu', label: 'LFU', description: 'Least Frequently Used' },
  { value: 'fifo', label: 'FIFO', description: 'First In, First Out' },
  { value: 'ttl', label: 'TTL', description: 'Time-To-Live based' },
]

export const QUEUE_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'bullmq', label: 'BullMQ', description: 'Redis-based queue' },
  { value: 'sqs', label: 'AWS SQS', description: 'Amazon queue service' },
  { value: 'rabbitmq', label: 'RabbitMQ', description: 'Message broker' },
  { value: 'kafka', label: 'Kafka', description: 'Event streaming' },
  { value: 'inngest', label: 'Inngest', description: 'Event-driven functions' },
]

// ── Step 7: AI Integrations ────────────────────────────────────
export const AI_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'openai', label: 'OpenAI', description: 'GPT models' },
  { value: 'anthropic', label: 'Anthropic', description: 'Claude models' },
  { value: 'google', label: 'Google AI', description: 'Gemini models' },
  { value: 'mistral', label: 'Mistral', description: 'Open-weight models' },
  { value: 'deepseek', label: 'DeepSeek', description: 'Efficient reasoning models' },
  { value: 'local', label: 'Local/Ollama', description: 'Self-hosted models' },
  { value: 'n8n', label: 'n8n', description: 'Workflow automation' },
]

export const AI_MODE_OPTIONS: WorkflowOption[] = [
  { value: 'service', label: 'Cloud Service', description: 'API-based access' },
  { value: 'local', label: 'Local Deployment', description: 'Self-hosted instance' },
  { value: 'both', label: 'Both', description: 'Cloud + local fallback' },
]

export const RAG_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'pinecone', label: 'Pinecone', description: 'Vector database' },
  { value: 'weaviate', label: 'Weaviate', description: 'Vector search engine' },
  { value: 'chroma', label: 'Chroma', description: 'Open-source embeddings DB' },
  { value: 'qdrant', label: 'Qdrant', description: 'Vector similarity search' },
  { value: 'supabase', label: 'Supabase pgvector', description: 'Postgres vectors' },
]

// ── Step 8: Features ──────────────────────────────────────────
export const FEATURE_OPTIONS: WorkflowOption[] = [
  { value: 'dashboard', label: 'Dashboard', description: 'Overview and analytics' },
  { value: 'notifications', label: 'Notifications', description: 'In-app alerts' },
  { value: 'search', label: 'Global Search', description: 'Find anything quickly' },
  { value: 'export', label: 'Data Export', description: 'CSV and PDF exports' },
  { value: 'audit', label: 'Audit Log', description: 'Track all changes' },
  { value: 'api', label: 'API Access', description: 'REST API for integrations' },
  { value: 'webhooks', label: 'Webhooks', description: 'Trigger external services' },
  { value: 'scheduling', label: 'Scheduling', description: 'Schedule workflow runs' },
  { value: 'versioning', label: 'Versioning', description: 'Track config versions' },
  { value: 'collaboration', label: 'Collaboration', description: 'Multi-user editing' },
  { value: 'templates', label: 'Templates', description: 'Reusable workflow templates' },
  { value: 'analytics', label: 'Analytics', description: 'Workflow performance metrics' },
]

export const MODULE_CATEGORY_OPTIONS: WorkflowOption[] = [
  { value: 'core', label: 'Core', description: 'Essential modules' },
  { value: 'data', label: 'Data', description: 'Data processing modules' },
  { value: 'integration', label: 'Integration', description: 'Third-party integrations' },
  { value: 'ui', label: 'UI', description: 'User interface modules' },
  { value: 'utility', label: 'Utility', description: 'Helper modules' },
]

// ── Step 9: Middleware & Plugins ───────────────────────────────
export const MIDDLEWARE_TYPE_OPTIONS: WorkflowOption[] = [
  { value: 'auth', label: 'Authentication', description: 'Verify identity' },
  { value: 'logging', label: 'Logging', description: 'Request logging' },
  { value: 'rate-limit', label: 'Rate Limit', description: 'Throttle requests' },
  { value: 'cors', label: 'CORS', description: 'Cross-origin access' },
  { value: 'compression', label: 'Compression', description: 'Response compression' },
  { value: 'transform', label: 'Transform', description: 'Data transformation' },
  { value: 'validation', label: 'Validation', description: 'Input validation' },
  { value: 'custom', label: 'Custom', description: 'Custom middleware' },
]

export const EXTENSION_TYPE_OPTIONS: WorkflowOption[] = [
  { value: 'transform', label: 'Transform', description: 'Data transformation' },
  { value: 'validator', label: 'Validator', description: 'Custom validation' },
  { value: 'adapter', label: 'Adapter', description: 'Protocol adapter' },
  { value: 'formatter', label: 'Formatter', description: 'Output formatting' },
  { value: 'hook', label: 'Hook', description: 'Lifecycle hook' },
]

// ── Step 10: Authentication ────────────────────────────────────
export const AUTH_METHOD_OPTIONS: WorkflowOption[] = [
  { value: 'email', label: 'Email & Password', description: 'Traditional login' },
  { value: 'magic-link', label: 'Magic Link', description: 'Passwordless email' },
  { value: 'google', label: 'Google', description: 'OAuth provider' },
  { value: 'github', label: 'GitHub', description: 'OAuth provider' },
  { value: 'microsoft', label: 'Microsoft', description: 'Azure AD / Office 365' },
  { value: 'saml', label: 'SAML/SSO', description: 'Enterprise single sign-on' },
  { value: 'api-key', label: 'API Key', description: 'Service-to-service auth' },
  { value: 'jwt', label: 'JWT', description: 'Token-based auth' },
]

export const SESSION_STRATEGY_OPTIONS: WorkflowOption[] = [
  { value: 'jwt', label: 'JWT', description: 'Stateless token-based' },
  { value: 'session', label: 'Server Session', description: 'Stateful server-side' },
  { value: 'hybrid', label: 'Hybrid', description: 'JWT + refresh tokens' },
]

// ── Step 11: Security ──────────────────────────────────────────
export const ENCRYPTION_OPTIONS: WorkflowOption[] = [
  { value: 'aes-256', label: 'AES-256', description: 'Industry standard encryption' },
  { value: 'rsa', label: 'RSA', description: 'Asymmetric encryption' },
  { value: 'none', label: 'None', description: 'No encryption' },
]

export const COMPLIANCE_OPTIONS: WorkflowOption[] = [
  { value: 'gdpr', label: 'GDPR', description: 'EU data protection' },
  { value: 'hipaa', label: 'HIPAA', description: 'Healthcare data' },
  { value: 'soc2', label: 'SOC 2', description: 'Service organization controls' },
  { value: 'pci-dss', label: 'PCI DSS', description: 'Payment card security' },
  { value: 'iso27001', label: 'ISO 27001', description: 'Information security' },
  { value: 'ccpa', label: 'CCPA', description: 'California privacy' },
]

// ── Step 12: Notifications ─────────────────────────────────────
export const NOTIFICATION_CHANNEL_OPTIONS: WorkflowOption[] = [
  { value: 'email', label: 'Email', description: 'Email notifications' },
  { value: 'sms', label: 'SMS', description: 'Text message alerts' },
  { value: 'push', label: 'Push', description: 'Browser/mobile push' },
  { value: 'webhook', label: 'Webhook', description: 'HTTP callback' },
  { value: 'slack', label: 'Slack', description: 'Slack messages' },
  { value: 'teams', label: 'Teams', description: 'Microsoft Teams' },
  { value: 'in-app', label: 'In-App', description: 'In-app notifications' },
]

export const HOOK_EVENT_OPTIONS: WorkflowOption[] = [
  { value: 'before-step', label: 'Before Step', description: 'Before a step executes' },
  { value: 'after-step', label: 'After Step', description: 'After a step completes' },
  { value: 'on-error', label: 'On Error', description: 'When an error occurs' },
  { value: 'on-complete', label: 'On Complete', description: 'When workflow completes' },
  { value: 'on-start', label: 'On Start', description: 'When workflow starts' },
  { value: 'on-cancel', label: 'On Cancel', description: 'When workflow is cancelled' },
]

// ── Step 13: Logging & Monitoring ──────────────────────────────
export const LOG_LEVEL_OPTIONS: WorkflowOption[] = [
  { value: 'debug', label: 'Debug', description: 'Verbose debugging info' },
  { value: 'info', label: 'Info', description: 'General information' },
  { value: 'warn', label: 'Warn', description: 'Warning messages' },
  { value: 'error', label: 'Error', description: 'Error messages only' },
  { value: 'fatal', label: 'Fatal', description: 'Critical failures only' },
]

export const LOGGING_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'console', label: 'Console', description: 'Built-in console' },
  { value: 'file', label: 'File', description: 'Log to file' },
  { value: 'sentry', label: 'Sentry', description: 'Error tracking' },
  { value: 'datadog', label: 'Datadog', description: 'Full observability' },
  { value: 'logtail', label: 'Logtail', description: 'Log management' },
  { value: 'axiom', label: 'Axiom', description: 'Log analytics' },
]

export const MONITORING_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'datadog', label: 'Datadog', description: 'Full observability' },
  { value: 'prometheus', label: 'Prometheus', description: 'Metrics collection' },
  { value: 'grafana', label: 'Grafana', description: 'Dashboards and visualization' },
  { value: 'newrelic', label: 'New Relic', description: 'Application performance' },
  { value: 'custom', label: 'Custom', description: 'Custom monitoring' },
]

// ── Step 14: Testing ──────────────────────────────────────────
export const TEST_FRAMEWORK_OPTIONS: WorkflowOption[] = [
  { value: 'vitest', label: 'Vitest', description: 'Vite-native testing' },
  { value: 'jest', label: 'Jest', description: 'JavaScript testing' },
  { value: 'node-test', label: 'Node Test', description: 'Built-in Node.js runner' },
  { value: 'supertest', label: 'Supertest', description: 'HTTP testing' },
  { value: 'none', label: 'None', description: 'No testing framework' },
]

export const E2E_FRAMEWORK_OPTIONS: WorkflowOption[] = [
  { value: 'playwright', label: 'Playwright', description: 'Cross-browser testing' },
  { value: 'cypress', label: 'Cypress', description: 'E2E testing framework' },
  { value: 'none', label: 'None', description: 'No E2E testing' },
]

export const LOAD_TEST_OPTIONS: WorkflowOption[] = [
  { value: 'k6', label: 'k6', description: 'Load testing tool' },
  { value: 'artillery', label: 'Artillery', description: 'Load and smoke testing' },
  { value: 'locust', label: 'Locust', description: 'Python load testing' },
  { value: 'none', label: 'None', description: 'No load testing' },
]

// ── Step 15: Deployment ───────────────────────────────────────
export const DEPLOY_TARGET_OPTIONS: WorkflowOption[] = [
  { value: 'vercel', label: 'Vercel', description: 'Recommended for Next.js' },
  { value: 'aws', label: 'AWS', description: 'Amazon Web Services' },
  { value: 'gcp', label: 'Google Cloud', description: 'Google Cloud Platform' },
  { value: 'docker', label: 'Docker', description: 'Container export' },
  { value: 'self-host', label: 'Self-hosted', description: 'Your own server' },
  { value: 'netlify', label: 'Netlify', description: 'JAMstack hosting' },
  { value: 'railway', label: 'Railway', description: 'Simple cloud hosting' },
]

export const REGION_OPTIONS: WorkflowOption[] = [
  { value: 'auto', label: 'Auto (Recommended)', description: 'Closest to your users' },
  { value: 'us-east', label: 'US East', description: 'North Virginia' },
  { value: 'us-west', label: 'US West', description: 'San Francisco' },
  { value: 'eu-west', label: 'Europe', description: 'Frankfurt' },
  { value: 'eu-north', label: 'Europe North', description: 'Stockholm' },
  { value: 'ap-south', label: 'Asia Pacific', description: 'Singapore' },
  { value: 'ap-east', label: 'Asia East', description: 'Tokyo' },
]

export const SCALING_MODE_OPTIONS: WorkflowOption[] = [
  { value: 'auto', label: 'Auto Scaling', description: 'Scale based on load' },
  { value: 'fixed', label: 'Fixed', description: 'Static resources' },
  { value: 'serverless', label: 'Serverless', description: 'Pay per request' },
]

export const CI_PROVIDER_OPTIONS: WorkflowOption[] = [
  { value: 'github-actions', label: 'GitHub Actions', description: 'GitHub CI/CD' },
  { value: 'gitlab-ci', label: 'GitLab CI', description: 'GitLab pipelines' },
  { value: 'circleci', label: 'CircleCI', description: 'Continuous integration' },
  { value: 'vercel', label: 'Vercel', description: 'Auto deployment' },
  { value: 'none', label: 'None', description: 'No CI/CD' },
]

export const CI_STAGE_OPTIONS: WorkflowOption[] = [
  { value: 'lint', label: 'Lint', description: 'Code quality checks' },
  { value: 'typecheck', label: 'Type Check', description: 'TypeScript validation' },
  { value: 'unit-test', label: 'Unit Tests', description: 'Run unit tests' },
  { value: 'integration-test', label: 'Integration Tests', description: 'Run integration tests' },
  { value: 'e2e-test', label: 'E2E Tests', description: 'Run end-to-end tests' },
  { value: 'build', label: 'Build', description: 'Production build' },
  { value: 'deploy', label: 'Deploy', description: 'Deploy to environment' },
]

export const ROLLBACK_STRATEGY_OPTIONS: WorkflowOption[] = [
  { value: 'automatic', label: 'Automatic', description: 'Auto-rollback on failure' },
  { value: 'manual', label: 'Manual', description: 'Manual rollback trigger' },
]

// ── Step 16: UI & Documentation ───────────────────────────────
export const THEME_OPTIONS: WorkflowOption[] = [
  { value: 'light', label: 'Light', description: 'Light theme' },
  { value: 'dark', label: 'Dark', description: 'Dark theme' },
  { value: 'system', label: 'System', description: 'Follow OS preference' },
]

export const LAYOUT_OPTIONS: WorkflowOption[] = [
  { value: 'sidebar', label: 'Sidebar', description: 'Navigation on the left' },
  { value: 'topnav', label: 'Top Navigation', description: 'Navigation at top' },
  { value: 'minimal', label: 'Minimal', description: 'Clean, simple layout' },
  { value: 'dashboard', label: 'Dashboard', description: 'Admin-style layout' },
]

export const COMPONENT_LIBRARY_OPTIONS: WorkflowOption[] = [
  { value: 'shadcn', label: 'shadcn/ui', description: 'Radix + Tailwind' },
  { value: 'mui', label: 'Material UI', description: 'Google Material Design' },
  { value: 'chakra', label: 'Chakra UI', description: 'Simple, modular components' },
  { value: 'ant', label: 'Ant Design', description: 'Enterprise components' },
  { value: 'mantine', label: 'Mantine', description: 'Fully featured components' },
  { value: 'custom', label: 'Custom', description: 'Build your own' },
]

export const FONT_OPTIONS: WorkflowOption[] = [
  { value: 'inter', label: 'Inter', description: 'Modern sans-serif' },
  { value: 'geist', label: 'Geist', description: 'Vercel system font' },
  { value: 'roboto', label: 'Roboto', description: 'Google Material font' },
  { value: 'system', label: 'System', description: 'OS default font' },
]

export const COLOR_OPTIONS: WorkflowOption[] = [
  { value: '#0ea5e9', label: 'Sky' },
  { value: '#10B981', label: 'Green' },
  { value: '#8B5CF6', label: 'Purple' },
  { value: '#F59E0B', label: 'Amber' },
  { value: '#EF4444', label: 'Red' },
  { value: '#EC4899', label: 'Pink' },
  { value: '#06B6D4', label: 'Cyan' },
  { value: '#6366F1', label: 'Indigo' },
]

export const DOC_FORMAT_OPTIONS: WorkflowOption[] = [
  { value: 'markdown', label: 'Markdown', description: 'Markdown documentation' },
  { value: 'openapi', label: 'OpenAPI', description: 'API specification' },
  { value: 'jsdoc', label: 'JSDoc', description: 'JavaScript documentation' },
  { value: 'typedoc', label: 'TypeDoc', description: 'TypeScript documentation' },
  { value: 'storybook', label: 'Storybook', description: 'Component documentation' },
]

export const LOCALE_OPTIONS: WorkflowOption[] = [
  { value: 'en', label: 'English', description: 'en' },
  { value: 'de', label: 'German', description: 'de' },
  { value: 'fr', label: 'French', description: 'fr' },
  { value: 'es', label: 'Spanish', description: 'es' },
  { value: 'pt', label: 'Portuguese', description: 'pt' },
  { value: 'ja', label: 'Japanese', description: 'ja' },
  { value: 'zh', label: 'Chinese', description: 'zh' },
]

// ── Step 17: Publishing & Distribution ──────────────────────────
export const BUSINESS_MODEL_OPTIONS: WorkflowOption[] = [
  { value: 'saas-subscription', label: 'SaaS Subscription', description: 'Recurring monthly/yearly payments' },
  { value: 'one-time-license', label: 'One-Time License', description: 'Single purchase, lifetime access' },
  { value: 'freemium', label: 'Freemium', description: 'Free tier with paid upgrades' },
  { value: 'open-source', label: 'Open Source', description: 'Free, community-driven' },
  { value: 'usage-based', label: 'Usage-Based', description: 'Pay per API call or resource' },
  { value: 'per-seat', label: 'Per-Seat', description: 'Price per user or team member' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom contracts and pricing' },
  { value: 'free-donation', label: 'Free / Donation', description: 'Free with optional donations' },
]

export const DISTRIBUTION_CHANNEL_OPTIONS: WorkflowOption[] = [
  { value: 'web-custom', label: 'Web (Custom Domain)', description: 'Self-hosted web application' },
  { value: 'app-store-ios', label: 'App Store (iOS)', description: 'Apple App Store distribution' },
  { value: 'google-play', label: 'Google Play', description: 'Android app distribution' },
  { value: 'pwa', label: 'PWA', description: 'Progressive Web App installable' },
  { value: 'npm', label: 'npm', description: 'Node.js package registry' },
  { value: 'docker-hub', label: 'Docker Hub', description: 'Container image registry' },
  { value: 'chrome-web-store', label: 'Chrome Web Store', description: 'Browser extension marketplace' },
  { value: 'slack-app-directory', label: 'Slack App Directory', description: 'Slack integration marketplace' },
  { value: 'shopify-app-store', label: 'Shopify App Store', description: 'Shopify plugin marketplace' },
  { value: 'microsoft-appsource', label: 'Microsoft AppSource', description: 'Microsoft 365 marketplace' },
  { value: 'github-marketplace', label: 'GitHub Marketplace', description: 'GitHub Actions and Apps' },
  { value: 'wordpress-plugins', label: 'WordPress Plugins', description: 'WordPress plugin directory' },
  { value: 'lan-server', label: 'LAN Server', description: 'Deploy to a local area network server' },
  { value: 'local-docker', label: 'Local Docker', description: 'Run as a Docker container on local infrastructure' },
  { value: 'usb-portable', label: 'USB / Portable', description: 'Package for offline USB or portable distribution' },
  { value: 'network-share', label: 'Network Share', description: 'Deploy via network file share (SMB/NFS)' },
  { value: 'intranet', label: 'Intranet Portal', description: 'Deploy to an internal company intranet' },
]

export const APP_LICENSE_OPTIONS: WorkflowOption[] = [
  { value: 'MIT', label: 'MIT', description: 'Permissive open source' },
  { value: 'Apache-2.0', label: 'Apache 2.0', description: 'Permissive with patent grant' },
  { value: 'GPL-3.0', label: 'GPL 3.0', description: 'Copyleft open source' },
  { value: 'BSD-3', label: 'BSD 3-Clause', description: 'Permissive with attribution' },
  { value: 'proprietary', label: 'Proprietary', description: 'Closed source, all rights reserved' },
  { value: 'custom-eula', label: 'Custom EULA', description: 'Custom end-user license agreement' },
]

export const RELEASE_STRATEGY_OPTIONS: WorkflowOption[] = [
  { value: 'stable', label: 'Stable', description: 'Full releases only' },
  { value: 'beta', label: 'Beta', description: 'Beta channel for early adopters' },
  { value: 'canary', label: 'Canary', description: 'Bleeding-edge nightly builds' },
  { value: 'rolling', label: 'Rolling', description: 'Continuous deployment on merge' },
  { value: 'lts', label: 'LTS', description: 'Long-term support releases' },
]

export const VERSIONING_OPTIONS: WorkflowOption[] = [
  { value: 'semver', label: 'SemVer', description: 'Semantic Versioning (major.minor.patch)' },
  { value: 'calver', label: 'CalVer', description: 'Calendar Versioning (YYYY.MM.DD)' },
  { value: 'custom', label: 'Custom', description: 'Custom versioning scheme' },
]
