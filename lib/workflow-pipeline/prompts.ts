import type { WorkflowConfigV2 } from './types'
import {
  STEP_TYPE_OPTIONS,
  ERROR_HANDLING_OPTIONS,
  TRIGGER_TYPE_OPTIONS,
  ORCHESTRATION_MODE_OPTIONS,
  RETRY_POLICY_OPTIONS,
  DATA_CONNECTOR_TYPE_OPTIONS,
  DATA_CONNECTOR_PROVIDER_OPTIONS,
  VARIABLE_SCOPE_OPTIONS,
  SECRETS_PROVIDER_OPTIONS,
  STORAGE_TYPE_OPTIONS,
  CACHE_PROVIDER_OPTIONS,
  CACHE_STRATEGY_OPTIONS,
  QUEUE_PROVIDER_OPTIONS,
  AI_PROVIDER_OPTIONS,
  AI_MODE_OPTIONS,
  FEATURE_OPTIONS,
  MIDDLEWARE_TYPE_OPTIONS,
  AUTH_METHOD_OPTIONS,
  SESSION_STRATEGY_OPTIONS,
  ENCRYPTION_OPTIONS,
  COMPLIANCE_OPTIONS,
  NOTIFICATION_CHANNEL_OPTIONS,
  HOOK_EVENT_OPTIONS,
  LOG_LEVEL_OPTIONS,
  LOGGING_PROVIDER_OPTIONS,
  MONITORING_PROVIDER_OPTIONS,
  TEST_FRAMEWORK_OPTIONS,
  E2E_FRAMEWORK_OPTIONS,
  DEPLOY_TARGET_OPTIONS,
  REGION_OPTIONS,
  SCALING_MODE_OPTIONS,
  CI_PROVIDER_OPTIONS,
  THEME_OPTIONS,
  LAYOUT_OPTIONS,
  COMPONENT_LIBRARY_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
  DISTRIBUTION_CHANNEL_OPTIONS,
  APP_LICENSE_OPTIONS,
  RELEASE_STRATEGY_OPTIONS,
  VERSIONING_OPTIONS,
} from './constants'

// ── Helpers ───────────────────────────────────────────────────────

function findLabel(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? (value || 'Not set')
}

function mapLabels(options: { value: string; label: string }[], values: string[]): string {
  return values.map((v) => findLabel(options, v)).join(', ') || 'None'
}

// ── Config Summary ────────────────────────────────────────────────

export function buildConfigSummary(config: WorkflowConfigV2): string {
  const sections: string[] = []

  // Meta
  sections.push(`## Project Info`)
  sections.push(`- **Name:** ${config.meta.name || 'Untitled'}`)
  sections.push(`- **Version:** ${config.meta.version}`)
  if (config.meta.description) sections.push(`- **Description:** ${config.meta.description}`)
  if (config.meta.author) sections.push(`- **Author:** ${config.meta.author}`)
  if (config.meta.tags.length > 0) sections.push(`- **Tags:** ${config.meta.tags.join(', ')}`)

  // Steps
  sections.push(`\n## Workflow Steps (${config.steps.length})`)
  if (config.steps.length > 0) {
    config.steps.forEach((s, i) => {
      sections.push(`- **${i + 1}. ${s.title || 'Untitled'}** (${findLabel(STEP_TYPE_OPTIONS, s.type)}) — ${s.description || 'No description'}`)
    })
  }

  // Triggers
  const enabledTriggers = config.triggers.triggers.filter((t) => t.enabled)
  sections.push(`\n## Triggers (${enabledTriggers.length})`)
  enabledTriggers.forEach((t) => {
    sections.push(`- ${findLabel(TRIGGER_TYPE_OPTIONS, t.type)}${t.config ? `: ${t.config}` : ''}`)
  })

  // Orchestration
  sections.push(`\n## Orchestration`)
  sections.push(`- **Mode:** ${findLabel(ORCHESTRATION_MODE_OPTIONS, config.orchestration.mode)}`)
  sections.push(`- **Retry Policy:** ${findLabel(RETRY_POLICY_OPTIONS, config.orchestration.retryPolicy)}`)
  if (config.orchestration.circuitBreaker) sections.push(`- **Circuit Breaker:** Enabled (threshold: ${config.orchestration.circuitBreakerThreshold})`)

  // Data Connectors
  sections.push(`\n## Data Connectors (${config.dataConnectors.connectors.length})`)
  config.dataConnectors.connectors.forEach((c) => {
    sections.push(`- **${c.name}** — ${findLabel(DATA_CONNECTOR_TYPE_OPTIONS, c.type)} (${findLabel(DATA_CONNECTOR_PROVIDER_OPTIONS, c.provider)})`)
  })

  // AI
  const enabledAi = config.aiIntegrations.providers.filter((p) => p.enabled)
  sections.push(`\n## AI Integrations (${enabledAi.length})`)
  enabledAi.forEach((p) => {
    sections.push(`- **${findLabel(AI_PROVIDER_OPTIONS, p.provider)}** — ${p.model || 'default'} (${findLabel(AI_MODE_OPTIONS, p.mode)})`)
  })
  if (config.aiIntegrations.rag) sections.push(`- **RAG:** Enabled (${config.aiIntegrations.ragProvider})`)

  // Features
  sections.push(`\n## Features`)
  sections.push(`- ${mapLabels(FEATURE_OPTIONS, config.features.featureIds)}`)

  // Auth
  sections.push(`\n## Authentication`)
  sections.push(`- **Enabled:** ${config.auth.enabled ? 'Yes' : 'No'}`)
  if (config.auth.enabled) {
    sections.push(`- **Methods:** ${config.auth.methods.filter((m) => m.enabled).map((m) => findLabel(AUTH_METHOD_OPTIONS, m.type)).join(', ')}`)
    sections.push(`- **Session:** ${findLabel(SESSION_STRATEGY_OPTIONS, config.auth.sessionStrategy)}`)
    sections.push(`- **RBAC:** ${config.auth.rbac ? 'Yes' : 'No'}`)
    if (config.auth.mfa) sections.push(`- **MFA:** Enabled`)
  }

  // Security
  sections.push(`\n## Security`)
  sections.push(`- **Encryption:** ${findLabel(ENCRYPTION_OPTIONS, config.security.encryption)}`)
  if (config.security.compliance.length > 0) sections.push(`- **Compliance:** ${mapLabels(COMPLIANCE_OPTIONS, config.security.compliance)}`)
  if (config.security.cors) sections.push(`- **CORS:** Enabled`)
  if (config.security.rateLimit) sections.push(`- **Rate Limiting:** Enabled (${config.security.rateLimitMax}/${config.security.rateLimitWindow}s)`)

  // Deployment
  sections.push(`\n## Deployment`)
  sections.push(`- **Target:** ${findLabel(DEPLOY_TARGET_OPTIONS, config.deployment.target)}`)
  sections.push(`- **Region:** ${findLabel(REGION_OPTIONS, config.deployment.region)}`)
  sections.push(`- **Scaling:** ${findLabel(SCALING_MODE_OPTIONS, config.deployment.scaling)}`)
  sections.push(`- **CI/CD:** ${findLabel(CI_PROVIDER_OPTIONS, config.deployment.ciProvider)}`)

  // Testing
  sections.push(`\n## Testing`)
  sections.push(`- **Unit:** ${findLabel(TEST_FRAMEWORK_OPTIONS, config.testing.unitFramework)}`)
  sections.push(`- **E2E:** ${findLabel(E2E_FRAMEWORK_OPTIONS, config.testing.e2eFramework)}`)
  sections.push(`- **Coverage Target:** ${config.testing.coverageTarget}%`)

  // Publishing
  sections.push(`\n## Publishing`)
  sections.push(`- **Business Model:** ${findLabel(BUSINESS_MODEL_OPTIONS, config.publishing.businessModel)}`)
  sections.push(`- **Distribution:** ${mapLabels(DISTRIBUTION_CHANNEL_OPTIONS, config.publishing.distributionChannels)}`)
  sections.push(`- **Versioning:** ${findLabel(VERSIONING_OPTIONS, config.publishing.versioning)}`)

  return sections.join('\n')
}

// ── Tech Stack Inference ──────────────────────────────────────────

interface InferredStack {
  language: string
  runtime: string
  framework: string
  buildTool: string
  packageManager: string
  projectStructure: string
  docsUrl: string
}

function inferStack(config: WorkflowConfigV2): InferredStack {
  const target = config.deployment.target
  const compLib = config.ui.componentLibrary
  const hasQueue = config.queues.enabled
  const hasAi = config.aiIntegrations.providers.some((p) => p.enabled)

  if (target === 'vercel' || target === 'netlify') {
    return {
      language: 'TypeScript',
      runtime: 'Node.js (Edge Runtime available)',
      framework: 'Next.js (App Router)',
      buildTool: 'Turbopack / Webpack',
      packageManager: 'npm / pnpm',
      projectStructure: `[project-name]/
├── app/
│   ├── (auth)/              # Auth routes
│   ├── (protected)/         # Auth-guarded routes
│   │   └── dashboard/       # Main app views
│   ├── api/                 # API routes
│   │   ├── workflow/        # Workflow execution endpoints
│   │   ├── webhooks/        # Webhook receivers
│   │   └── integrations/    # Third-party integration endpoints
│   ├── actions/             # Server actions
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # ${compLib || 'shadcn/ui'} components
│   ├── workflow/            # Workflow-specific components
│   └── shared/              # Shared components
├── lib/
│   ├── workflow/            # Workflow engine
│   │   ├── engine.ts        # Step executor
│   │   ├── triggers.ts      # Trigger handlers
│   │   ├── orchestrator.ts  # Orchestration logic
│   │   └── types.ts         # Type definitions
│   ├── connectors/          # Data connector implementations
│   ├── ai/                  # AI provider wrappers
│   ├── auth/                # Auth utilities
│   ├── db/                  # Database client
│   └── utils.ts             # Shared utilities
├── middleware.ts             # Auth + route protection${hasQueue ? '\n├── workers/                 # Background job processors' : ''}
├── public/                  # Static assets
├── tests/                   # Test files
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json`,
      docsUrl: 'https://nextjs.org/docs',
    }
  }

  if (target === 'docker' || target === 'self-host') {
    return {
      language: 'TypeScript',
      runtime: 'Node.js',
      framework: hasAi ? 'Express + LangChain' : 'Express / Fastify',
      buildTool: 'esbuild / tsup',
      packageManager: 'npm / pnpm',
      projectStructure: `[project-name]/
├── src/
│   ├── api/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/       # Express middleware
│   │   └── validators/      # Request validation (Zod)
│   ├── workflow/
│   │   ├── engine.ts        # Workflow execution engine
│   │   ├── triggers.ts      # Trigger handlers
│   │   ├── orchestrator.ts  # Step orchestration
│   │   └── steps/           # Step type implementations
│   ├── connectors/          # Data connector implementations
│   ├── ai/                  # AI provider integrations
│   ├── auth/                # Authentication logic
│   ├── db/                  # Database client & migrations
│   ├── queue/               # Job queue processors
│   ├── config/              # App configuration
│   └── index.ts             # Entry point
├── tests/                   # Test files
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── tsconfig.json
└── package.json`,
      docsUrl: 'https://expressjs.com/',
    }
  }

  if (target === 'aws' || target === 'gcp') {
    return {
      language: 'TypeScript',
      runtime: target === 'aws' ? 'AWS Lambda / ECS' : 'Cloud Functions / Cloud Run',
      framework: 'Serverless Framework / SST',
      buildTool: 'esbuild',
      packageManager: 'npm / pnpm',
      projectStructure: `[project-name]/
├── src/
│   ├── functions/           # Lambda / Cloud Functions
│   │   ├── api/             # HTTP handlers
│   │   ├── workflow/        # Workflow execution
│   │   ├── triggers/        # Event triggers
│   │   └── workers/         # Background processors
│   ├── lib/
│   │   ├── connectors/      # Data connectors
│   │   ├── ai/              # AI integrations
│   │   ├── auth/            # Auth utilities
│   │   └── shared/          # Shared code
│   └── config/              # Environment configs
├── infrastructure/          # IaC (CDK / Terraform)
├── tests/
├── ${target === 'aws' ? 'sst.config.ts' : 'serverless.yml'}
├── tsconfig.json
└── package.json`,
      docsUrl: target === 'aws' ? 'https://docs.aws.amazon.com/' : 'https://cloud.google.com/docs',
    }
  }

  // Default / Railway / other
  return {
    language: 'TypeScript',
    runtime: 'Node.js',
    framework: 'Next.js (App Router)',
    buildTool: 'Turbopack',
    packageManager: 'npm / pnpm',
    projectStructure: `[project-name]/
├── app/
│   ├── api/                 # API routes
│   ├── (protected)/         # Auth-guarded routes
│   ├── actions/             # Server actions
│   └── layout.tsx
├── components/              # UI components
├── lib/
│   ├── workflow/            # Workflow engine
│   ├── connectors/          # Data connectors
│   ├── ai/                  # AI integrations
│   └── utils.ts
├── tests/
├── tsconfig.json
└── package.json`,
    docsUrl: 'https://nextjs.org/docs',
  }
}

// ── Document 1: Init Prompt ───────────────────────────────────────

export function buildInitPromptDoc(config: WorkflowConfigV2): string {
  const stack = inferStack(config)
  const date = new Date().toISOString().split('T')[0]
  const projectName = config.meta.name || 'Untitled Workflow App'
  const enabledAi = config.aiIntegrations.providers.filter((p) => p.enabled)
  const enabledTriggers = config.triggers.triggers.filter((t) => t.enabled)
  const enabledMiddleware = config.middleware.items.filter((m) => m.enabled)
  const enabledAuth = config.auth.methods.filter((m) => m.enabled)
  const orchestrationMode = findLabel(ORCHESTRATION_MODE_OPTIONS, config.orchestration.mode)

  // Pre-compute step listing
  const stepListing = config.steps.map((s, i) => {
    const type = findLabel(STEP_TYPE_OPTIONS, s.type)
    const err = findLabel(ERROR_HANDLING_OPTIONS, s.errorHandling)
    const deps = s.dependencies.length > 0 ? ` [depends: ${s.dependencies.join(', ')}]` : ''
    return `  ${i + 1}. ${s.title || 'Untitled'} (${type}) — error: ${err}${deps}`
  }).join('\n')

  // Pre-compute trigger listing
  const triggerListing = enabledTriggers.map((t) => {
    return `  - ${findLabel(TRIGGER_TYPE_OPTIONS, t.type)}${t.config ? ` → ${t.config}` : ''}`
  }).join('\n') || '  - Manual trigger only'

  // Pre-compute data connector listing
  const connectorListing = config.dataConnectors.connectors.map((c) => {
    const type = findLabel(DATA_CONNECTOR_TYPE_OPTIONS, c.type)
    const provider = findLabel(DATA_CONNECTOR_PROVIDER_OPTIONS, c.provider)
    return `  - ${c.name}: ${type} (${provider})${c.healthCheck ? ' [health-check]' : ''}`
  }).join('\n') || '  - No data connectors configured'

  // Pre-compute AI provider listing
  const aiListing = enabledAi.map((p) => {
    const label = findLabel(AI_PROVIDER_OPTIONS, p.provider)
    const mode = findLabel(AI_MODE_OPTIONS, p.mode)
    return `  - ${label}: ${p.model || 'default model'} (${mode})`
  }).join('\n') || '  - No AI providers configured'

  // Pre-compute middleware listing
  const middlewareListing = enabledMiddleware.sort((a, b) => a.order - b.order).map((m) => {
    return `  ${m.order}. ${m.name} (${findLabel(MIDDLEWARE_TYPE_OPTIONS, m.type)})`
  }).join('\n') || '  - No middleware configured'

  // Pre-compute auth listing
  const authSection = config.auth.enabled ? `
Auth:           ${enabledAuth.map((m) => findLabel(AUTH_METHOD_OPTIONS, m.type)).join(', ') || 'None'}
Session:        ${findLabel(SESSION_STRATEGY_OPTIONS, config.auth.sessionStrategy)} (TTL: ${config.auth.sessionTtl}s)
RBAC:           ${config.auth.rbac ? `Yes (${config.auth.roles.length} roles: ${config.auth.roles.join(', ')})` : 'No'}
MFA:            ${config.auth.mfa ? 'Enabled' : 'Disabled'}` : `
Auth:           Disabled`

  // Pre-compute security listing
  const complianceStr = config.security.compliance.length > 0
    ? mapLabels(COMPLIANCE_OPTIONS, config.security.compliance)
    : 'None'

  // Pre-compute notification channels
  const notifChannels = config.notifications.enabled
    ? config.notifications.channels.filter((c) => c.enabled).map((c) => findLabel(NOTIFICATION_CHANNEL_OPTIONS, c.type)).join(', ') || 'None enabled'
    : 'Disabled'

  // Pre-compute queue listing
  const queueListing = config.queues.enabled
    ? config.queues.queues.map((q) => `  - ${q.name}: ${findLabel(QUEUE_PROVIDER_OPTIONS, q.provider)} (concurrency: ${q.concurrency})`).join('\n')
    : '  - No queues configured'

  // Pre-compute caching info
  const cachingInfo = config.caching.enabled
    ? `${findLabel(CACHE_PROVIDER_OPTIONS, config.caching.provider)} (${findLabel(CACHE_STRATEGY_OPTIONS, config.caching.strategy)}, TTL: ${config.caching.ttl}s)`
    : 'Disabled'

  // Pre-compute storage info
  const storageInfo = config.storage.enabled
    ? `${findLabel(STORAGE_TYPE_OPTIONS, config.storage.type)}${config.storage.bucket ? ` → ${config.storage.bucket}` : ''}`
    : 'Disabled'

  // Pre-compute feature listing
  const featureListing = config.features.featureIds.length > 0
    ? config.features.featureIds.map((f) => `  - ${findLabel(FEATURE_OPTIONS, f)}`).join('\n')
    : '  - No features selected'

  // Deployment info
  const deployTarget = findLabel(DEPLOY_TARGET_OPTIONS, config.deployment.target)
  const region = findLabel(REGION_OPTIONS, config.deployment.region)
  const ciProvider = findLabel(CI_PROVIDER_OPTIONS, config.deployment.ciProvider)

  // Build order steps — MVP
  const mvpPhases: string[] = []
  mvpPhases.push(`Phase 1: Foundation
  1. Initialize ${stack.framework} project with TypeScript strict mode
  2. Set up project structure (see Section 2.2)
  3. Configure ${config.auth.enabled ? 'authentication (' + enabledAuth.map((m) => findLabel(AUTH_METHOD_OPTIONS, m.type)).join(', ') + ')' : 'basic route protection'}
  4. Set up database${config.dataConnectors.connectors.length > 0 ? ' and data connectors (' + config.dataConnectors.connectors.map((c) => c.name).join(', ') + ')' : ''}`)

  mvpPhases.push(`Phase 2: Workflow Engine
  5. Implement workflow step executor for types: ${[...new Set(config.steps.map((s) => s.type))].map((t) => findLabel(STEP_TYPE_OPTIONS, t)).join(', ') || 'action'}
  6. Build ${orchestrationMode.toLowerCase()} orchestration engine
  7. Implement trigger system: ${enabledTriggers.map((t) => findLabel(TRIGGER_TYPE_OPTIONS, t.type)).join(', ') || 'manual'}
  8. Add error handling: ${[...new Set(config.steps.map((s) => s.errorHandling))].map((e) => findLabel(ERROR_HANDLING_OPTIONS, e)).join(', ')}
  9. Implement workflow state management and persistence`)

  mvpPhases.push(`Phase 3: Core Features
  10. ${config.features.featureIds.includes('dashboard') ? 'Build workflow dashboard with real-time status' : 'Build workflow listing and management UI'}
  11. ${enabledAi.length > 0 ? `Integrate AI providers: ${enabledAi.map((p) => findLabel(AI_PROVIDER_OPTIONS, p.provider)).join(', ')}` : 'Implement workflow configuration UI'}
  12. ${config.notifications.enabled ? `Set up notifications: ${notifChannels}` : 'Add workflow execution logging'}
  13. Implement ${config.ui.layout} layout with ${config.ui.theme} theme
  14. Build workflow monitoring and basic logging`)

  mvpPhases.push(`Phase 4: Polish
  15. Add input validation and error boundaries
  16. Implement ${config.testing.unitFramework !== 'none' ? findLabel(TEST_FRAMEWORK_OPTIONS, config.testing.unitFramework) + ' unit tests' : 'manual testing procedures'}
  17. ${config.security.rateLimit ? 'Configure rate limiting and security headers' : 'Add basic security headers'}
  18. Performance optimization and initial load testing`)

  // MAX phases
  const maxPhases: string[] = []
  maxPhases.push(`Phase 5: Advanced Features
  19. ${config.queues.enabled ? `Implement job queues: ${config.queues.queues.map((q) => `${q.name} (${findLabel(QUEUE_PROVIDER_OPTIONS, q.provider)})`).join(', ')}` : 'Add advanced workflow scheduling'}
  20. ${config.caching.enabled ? `Set up ${findLabel(CACHE_PROVIDER_OPTIONS, config.caching.provider)} caching layer` : 'Implement response caching'}
  21. ${config.aiIntegrations.rag ? `Configure RAG pipeline with ${config.aiIntegrations.ragProvider}` : 'Add advanced AI features (if configured)'}
  22. ${config.storage.enabled ? `Integrate ${findLabel(STORAGE_TYPE_OPTIONS, config.storage.type)} file storage` : 'Add asset and template management'}
  23. ${config.features.featureIds.includes('analytics') ? 'Build analytics dashboard with workflow metrics' : 'Add workflow execution analytics'}`)

  maxPhases.push(`Phase 6: Quality & Security
  24. ${config.testing.e2eFramework !== 'none' ? `Set up ${findLabel(E2E_FRAMEWORK_OPTIONS, config.testing.e2eFramework)} E2E tests` : 'Integration testing suite'}
  25. ${config.testing.loadTesting ? `Load testing with ${config.testing.loadTestTool}` : 'Performance profiling and optimization'}
  26. ${config.security.compliance.length > 0 ? `Implement ${complianceStr} compliance requirements` : 'Security audit and hardening'}
  27. ${config.auth.rbac ? `Implement RBAC policies (${config.auth.policies.length} policies)` : 'Role-based access refinement'}
  28. Vulnerability scanning and dependency audit`)

  maxPhases.push(`Phase 7: Deployment & Distribution
  29. ${config.deployment.ciProvider !== 'none' ? `Configure ${findLabel(CI_PROVIDER_OPTIONS, config.deployment.ciProvider)} CI/CD pipeline` : 'Set up deployment pipeline'}
  30. ${config.deployment.environments.length > 0 ? `Set up environments: ${config.deployment.environments.map((e) => e.name).join(', ')}` : 'Configure staging and production environments'}
  31. ${config.publishing.distributionChannels.length > 0 ? `Prepare for distribution: ${mapLabels(DISTRIBUTION_CHANNEL_OPTIONS, config.publishing.distributionChannels)}` : 'Prepare production release'}
  32. ${config.deployment.rollback ? 'Configure automatic rollback strategy' : 'Document rollback procedures'}`)

  // Constraints
  const constraints: string[] = []
  constraints.push(`### 4.1 Architecture`)
  constraints.push(`\`\`\``)
  constraints.push(`DO NOT couple workflow steps to each other — each step must be independently executable`)
  constraints.push(`DO NOT store secrets in code or config files — use ${findLabel(SECRETS_PROVIDER_OPTIONS, config.secrets.provider)}`)
  constraints.push(`DO NOT skip input validation on any API endpoint or webhook receiver`)
  constraints.push(`DO NOT hardcode connection strings — use environment variables`)
  constraints.push(`DO NOT create circular dependencies between workflow steps`)
  constraints.push(`DO NOT ignore error handling — every step must handle ${[...new Set(config.steps.map((s) => s.errorHandling))].join('/')} gracefully`)
  constraints.push(`\`\`\``)

  if (enabledAi.length > 0) {
    constraints.push(`\n### 4.2 AI Integration`)
    constraints.push(`\`\`\``)
    constraints.push(`DO NOT send sensitive data to AI providers without sanitization`)
    constraints.push(`DO NOT ignore rate limits on AI provider APIs`)
    constraints.push(`DO NOT hardcode API keys — use secrets management`)
    if (config.aiIntegrations.fallbackEnabled) {
      constraints.push(`DO NOT skip fallback provider configuration — always have a backup`)
    }
    if (config.aiIntegrations.costTracking) {
      constraints.push(`DO NOT skip cost tracking — log all AI API calls with token counts`)
    }
    constraints.push(`\`\`\``)
  }

  constraints.push(`\n### 4.${enabledAi.length > 0 ? '3' : '2'} Code Quality`)
  constraints.push(`\`\`\``)
  constraints.push(`DO NOT use \`any\` type — define proper TypeScript interfaces for all data`)
  constraints.push(`DO NOT write functions longer than 100 lines — split into smaller units`)
  constraints.push(`DO NOT skip Zod validation on server action / API inputs`)
  constraints.push(`DO NOT leave debug code or console.log in production`)
  constraints.push(`DO NOT ignore TypeScript compiler warnings — fix them properly`)
  constraints.push(`DO NOT commit .env files or secrets to version control`)
  constraints.push(`\`\`\``)

  return `# Initialization Prompt for ${projectName}

> **Generated by:** DevDudes Combo Dude
> **Date:** ${date}
> **Version:** 1.0.0
> **Target AI Tool:** Claude Code / Cursor / Windsurf / Copilot

---

## Section 1: Context

### 1.1 Project Identity

You are building **${projectName}**, a workflow automation application built with ${stack.framework}.

**Description:** ${config.meta.description || `A ${orchestrationMode.toLowerCase()} workflow system with ${config.steps.length} steps.`}
**Author:** ${config.meta.author || 'DevDudes'}
**Version:** ${config.meta.version}

### 1.2 Workflow Overview

This application orchestrates **${config.steps.length} workflow steps** using **${orchestrationMode.toLowerCase()} execution**${enabledTriggers.length > 0 ? `, triggered by ${enabledTriggers.map((t) => findLabel(TRIGGER_TYPE_OPTIONS, t.type).toLowerCase()).join(', ')}` : ''}.

### 1.3 Core Systems

| System | Description |
|--------|-------------|
| Orchestration | ${orchestrationMode} execution with ${findLabel(RETRY_POLICY_OPTIONS, config.orchestration.retryPolicy).toLowerCase()} retry |
| Steps | ${config.steps.length} steps (${[...new Set(config.steps.map((s) => s.type))].map((t) => findLabel(STEP_TYPE_OPTIONS, t)).join(', ')}) |
| Triggers | ${enabledTriggers.map((t) => findLabel(TRIGGER_TYPE_OPTIONS, t.type)).join(', ') || 'Manual'} |
| Data | ${config.dataConnectors.connectors.length} connectors (${config.dataConnectors.connectors.map((c) => findLabel(DATA_CONNECTOR_PROVIDER_OPTIONS, c.provider)).join(', ') || 'none'}) |
| AI | ${enabledAi.length > 0 ? enabledAi.map((p) => findLabel(AI_PROVIDER_OPTIONS, p.provider)).join(', ') : 'None'} |
| Auth | ${config.auth.enabled ? `${enabledAuth.map((m) => findLabel(AUTH_METHOD_OPTIONS, m.type)).join(', ')} (${findLabel(SESSION_STRATEGY_OPTIONS, config.auth.sessionStrategy)})` : 'Disabled'} |
| Deployment | ${deployTarget} (${region}) |

---

## Section 2: Technical Specification

### 2.1 Tech Stack (Mandatory)

\`\`\`
Framework:      ${stack.framework}
Language:       ${stack.language}
Runtime:        ${stack.runtime}
Build Tool:     ${stack.buildTool}
Package Mgr:    ${stack.packageManager}
UI:             ${config.ui.componentLibrary ? findLabel(COMPONENT_LIBRARY_OPTIONS, config.ui.componentLibrary) : 'shadcn/ui'}
Theme:          ${findLabel(THEME_OPTIONS, config.ui.theme)} / ${findLabel(LAYOUT_OPTIONS, config.ui.layout)} layout
${authSection}
Encryption:     ${findLabel(ENCRYPTION_OPTIONS, config.security.encryption)}
Compliance:     ${complianceStr}
\`\`\`

### 2.2 Project Structure

\`\`\`
${stack.projectStructure}
\`\`\`

### 2.3 Workflow Steps

\`\`\`
${stepListing || '  (No steps defined)'}
\`\`\`

### 2.4 Infrastructure

\`\`\`
Triggers:       ${triggerListing}

Data Connectors:
${connectorListing}

AI Providers:
${aiListing}

Middleware Pipeline:
${middlewareListing}

Queues:
${queueListing}

Caching:        ${cachingInfo}
Storage:        ${storageInfo}
Notifications:  ${notifChannels}
\`\`\`

---

## Section 3: Instructions

### 3.1 Build Order (MVP — follow this sequence exactly)

\`\`\`
${mvpPhases.join('\n\n')}
\`\`\`

### 3.2 Build Order (MAX Scope — extends MVP)

\`\`\`
${maxPhases.join('\n\n')}
\`\`\`

### 3.3 Implementation Rules

1. **Use ${stack.framework} best practices.** Follow framework conventions exactly.
2. **Validate all inputs** with Zod schemas — server actions, API routes, webhook payloads.
3. **Handle errors gracefully** — no silent failures, always log context.
4. **Keep workflow steps decoupled** — each step is independently testable.
5. **Use TypeScript strict mode** — no \`any\` types, proper interfaces for all data.
6. **Profile and monitor** — target sub-200ms step execution from day one.
7. **Version control everything** — commit after each working feature.

---

## Section 4: Constraints (DO NOT)

${constraints.join('\n')}

---

## Section 5: Error Handling Protocol

### When you encounter ANY error:

\`\`\`
Step 1: STOP — Do not modify code yet.
Step 2: Read the full error message and stack trace.
Step 3: Consult official documentation:
        - ${stack.docsUrl}
Step 4: Check for known error patterns.
Step 5: Reproduce in isolation if the error is unclear.
Step 6: Document the error and fix before continuing.
\`\`\`

### Workflow Execution Errors

\`\`\`
- Step timeout → Check step timeout config (currently ${config.steps[0]?.timeout ?? 30}s), verify external service response times
- Trigger not firing → Verify trigger config, check cron syntax, confirm webhook URL registration
- Data connector failure → Check connection strings, verify credentials, test health check endpoint
- Orchestration deadlock → Verify step dependencies for cycles, check parallel step concurrency limits
- AI provider error → Check API key validity, verify rate limits, test fallback provider
${config.queues.enabled ? '- Queue processing stuck → Check Redis connection, verify concurrency settings, inspect dead letter queue' : ''}
${config.auth.enabled ? '- Auth failure → Verify JWT secret, check session TTL, confirm OAuth callback URLs' : ''}
\`\`\`

---

## Section 6: References

### 6.1 Primary Documentation

| Resource | URL |
|----------|-----|
| **Development Concept** | \`./development-concept.md\` |
| **${stack.framework} Docs** | ${stack.docsUrl} |
| **TypeScript Docs** | https://www.typescriptlang.org/docs/ |
${config.deployment.target === 'vercel' ? '| **Vercel Docs** | https://vercel.com/docs |\n' : ''}${config.deployment.target === 'aws' ? '| **AWS Docs** | https://docs.aws.amazon.com/ |\n' : ''}${config.deployment.target === 'docker' ? '| **Docker Docs** | https://docs.docker.com/ |\n' : ''}${enabledAi.some((p) => p.provider === 'anthropic') ? '| **Anthropic Docs** | https://docs.anthropic.com/ |\n' : ''}${enabledAi.some((p) => p.provider === 'openai') ? '| **OpenAI Docs** | https://platform.openai.com/docs |\n' : ''}${enabledAi.some((p) => p.provider === 'n8n') ? '| **n8n Docs** | https://docs.n8n.io/ |\n' : ''}

### 6.2 Features

\`\`\`
${featureListing}
\`\`\`

---

## Section 7: Agent-Specific Prompts (MAX Scope)

> In MAX Scope with Multi-Agent architecture, the init prompt is split into specialized sub-prompts.

### 7.1 Architect Agent

\`\`\`
Focus: System architecture, data flow, API design, workflow orchestration.
Input: Full workflow config + development concept.
Output: Architecture decision records, system diagrams, data schemas.
Model: Claude Opus / GPT-4o
\`\`\`

### 7.2 Backend Agent

\`\`\`
Focus: Workflow engine, step executors, triggers, data connectors.
Input: Architecture specs + workflow step definitions.
Output: Production-ready TypeScript backend code.
Model: Claude Sonnet
\`\`\`

### 7.3 Frontend Agent

\`\`\`
Focus: ${config.ui.componentLibrary ? findLabel(COMPONENT_LIBRARY_OPTIONS, config.ui.componentLibrary) : 'shadcn/ui'} UI, ${findLabel(LAYOUT_OPTIONS, config.ui.layout)} layout, workflow visualization.
Input: Architecture specs + UI config.
Output: React components, pages, and layouts.
Model: Claude Sonnet
\`\`\`

### 7.4 Integration Agent

\`\`\`
Focus: ${enabledAi.length > 0 ? 'AI provider wrappers, ' : ''}data connectors, ${config.notifications.enabled ? 'notification channels, ' : ''}third-party APIs.
Input: Integration config + architecture specs.
Output: Connector implementations, API wrappers, webhook handlers.
Model: Claude Sonnet / Codestral
\`\`\`

### 7.5 Test Agent

\`\`\`
Focus: ${config.testing.unitFramework !== 'none' ? findLabel(TEST_FRAMEWORK_OPTIONS, config.testing.unitFramework) : 'Unit'} tests, ${config.testing.e2eFramework !== 'none' ? findLabel(E2E_FRAMEWORK_OPTIONS, config.testing.e2eFramework) : 'E2E'} tests, workflow integration tests.
Input: Completed codebase.
Output: Test suites, coverage reports, CI configuration.
Model: Gemini Flash / GPT-4o-mini
\`\`\`

### 7.6 DevOps Agent

\`\`\`
Focus: ${ciProvider} CI/CD, ${deployTarget} deployment, monitoring setup, ${config.deployment.rollback ? 'rollback strategy' : 'release management'}.
Input: All agent outputs combined.
Output: Infrastructure config, deployment scripts, monitoring dashboards.
Model: Claude Sonnet
\`\`\`

---

## Quick Start

\`\`\`bash
# 1. Paste this entire prompt into your AI development tool
# 2. The AI will follow the build order in Section 3
# 3. Reference development-concept.md for detailed specs
# 4. Use the DO NOT list (Section 4) as guardrails throughout
\`\`\`

---

> **This prompt is your development contract.**
> The AI assistant must follow these instructions exactly.
> Generated by DevDudes Combo Dude — do not edit structure manually.`
}

// ── Document 2: Development Concept ───────────────────────────────

export function buildDevelopmentConceptDoc(config: WorkflowConfigV2): string {
  const stack = inferStack(config)
  const date = new Date().toISOString().split('T')[0]
  const projectName = config.meta.name || 'Untitled Workflow App'
  const enabledAi = config.aiIntegrations.providers.filter((p) => p.enabled)
  const enabledTriggers = config.triggers.triggers.filter((t) => t.enabled)
  const enabledAuth = config.auth.methods.filter((m) => m.enabled)
  const orchestrationMode = findLabel(ORCHESTRATION_MODE_OPTIONS, config.orchestration.mode)
  const deployTarget = findLabel(DEPLOY_TARGET_OPTIONS, config.deployment.target)
  const region = findLabel(REGION_OPTIONS, config.deployment.region)
  const scaling = findLabel(SCALING_MODE_OPTIONS, config.deployment.scaling)
  const ciProvider = findLabel(CI_PROVIDER_OPTIONS, config.deployment.ciProvider)

  // Pre-compute step table rows
  const stepRows = config.steps.map((s, i) => {
    const type = findLabel(STEP_TYPE_OPTIONS, s.type)
    const err = findLabel(ERROR_HANDLING_OPTIONS, s.errorHandling)
    return `| ${i + 1} | ${s.title || 'Untitled'} | ${type} | ${err} | ${s.retries} | ${s.timeout}s |`
  }).join('\n')

  // Pre-compute trigger table rows
  const triggerRows = enabledTriggers.map((t) => {
    return `| ${findLabel(TRIGGER_TYPE_OPTIONS, t.type)} | ${t.config || '—'} | Enabled |`
  }).join('\n') || '| Manual | — | Default |'

  // Pre-compute connector table rows
  const connectorRows = config.dataConnectors.connectors.map((c) => {
    const type = findLabel(DATA_CONNECTOR_TYPE_OPTIONS, c.type)
    const provider = findLabel(DATA_CONNECTOR_PROVIDER_OPTIONS, c.provider)
    return `| ${c.name} | ${type} | ${provider} | ${c.poolSize} | ${c.healthCheck ? 'Yes' : 'No'} |`
  }).join('\n') || '| — | — | — | — | — |'

  // Pre-compute AI table rows
  const aiRows = enabledAi.map((p) => {
    const label = findLabel(AI_PROVIDER_OPTIONS, p.provider)
    const mode = findLabel(AI_MODE_OPTIONS, p.mode)
    return `| ${label} | ${p.model || 'default'} | ${mode} | ${p.endpoint || 'default'} |`
  }).join('\n') || '| None | — | — | — |'

  // Pre-compute feature rows
  const featureRows = config.features.featureIds.map((f) => {
    return `| ${findLabel(FEATURE_OPTIONS, f)} | Core | P1 |`
  }).join('\n') || '| — | — | — |'

  // Pre-compute middleware rows
  const middlewareRows = config.middleware.items.filter((m) => m.enabled).sort((a, b) => a.order - b.order).map((m) => {
    return `| ${m.order} | ${m.name} | ${findLabel(MIDDLEWARE_TYPE_OPTIONS, m.type)} |`
  }).join('\n') || '| — | — | — |'

  // Pre-compute notification rows
  const notifRows = config.notifications.enabled
    ? config.notifications.channels.filter((c) => c.enabled).map((c) => {
      return `| ${findLabel(NOTIFICATION_CHANNEL_OPTIONS, c.type)} | ${c.provider || 'default'} | Enabled |`
    }).join('\n') || '| — | — | Disabled |'
    : '| — | — | Disabled |'

  // Pre-compute hook rows
  const hookRows = config.hooks.hooks.filter((h) => h.enabled).map((h) => {
    return `| ${findLabel(HOOK_EVENT_OPTIONS, h.event)} | ${h.handler || '—'} |`
  }).join('\n') || '| — | — |'

  // Pre-compute queue rows
  const queueRows = config.queues.enabled
    ? config.queues.queues.map((q) => {
      return `| ${q.name} | ${findLabel(QUEUE_PROVIDER_OPTIONS, q.provider)} | ${q.concurrency} |`
    }).join('\n') || '| — | — | — |'
    : '| — | — | — |'

  // Pre-compute variable rows
  const variableRows = config.variables.variables.map((v) => {
    return `| ${v.key} | ${findLabel(VARIABLE_SCOPE_OPTIONS, v.scope)} | ${v.value ? 'Set' : 'Empty'} |`
  }).join('\n') || '| — | — | — |'

  // Pre-compute distribution rows
  const distNotes: Record<string, string> = {
    'web-custom': 'Custom domain + SSL setup',
    'app-store-ios': 'Apple Developer account required',
    'google-play': 'Google Play Console setup',
    pwa: 'Service worker + manifest.json',
    npm: 'npm publish + README',
    'docker-hub': 'Dockerfile + automated builds',
    'chrome-web-store': 'Chrome extension packaging',
    'slack-app-directory': 'Slack app manifest',
    'shopify-app-store': 'Shopify app configuration',
    'microsoft-appsource': 'AppSource submission',
    'github-marketplace': 'GitHub App manifest',
    'wordpress-plugins': 'WordPress plugin packaging',
  }
  const distributionRows = config.publishing.distributionChannels
    .map((d) => `| ${findLabel(DISTRIBUTION_CHANNEL_OPTIONS, d)} | Planned | ${distNotes[d] ?? 'Setup required'} |`)
    .join('\n') || '| — | — | — |'

  // Pre-compute environment rows
  const envRows = config.deployment.environments.map((e) => {
    return `| ${e.name} | ${e.url || '—'} | ${e.variables.length} vars |`
  }).join('\n') || '| Production | — | — |'

  // Effort estimation
  const stepCount = config.steps.length
  const complexityFactors = [
    enabledAi.length > 0,
    config.auth.enabled && config.auth.rbac,
    config.queues.enabled,
    config.dataConnectors.connectors.length > 2,
    config.security.compliance.length > 0,
    config.deployment.multiRegion,
  ].filter(Boolean).length

  const effort = stepCount <= 3 && complexityFactors <= 1 ? { mvp: 'Week 1–2', max: 'Week 3–4' }
    : stepCount <= 6 && complexityFactors <= 3 ? { mvp: 'Week 1–3', max: 'Month 2–3' }
    : stepCount <= 10 && complexityFactors <= 4 ? { mvp: 'Month 1–2', max: 'Month 3–5' }
    : { mvp: 'Month 1–3', max: 'Month 4–8' }

  return `# ${projectName} — Development Concept

> **Generated by:** DevDudes Combo Dude
> **Date:** ${date}
> **Version:** 1.0.0
> **Scope:** MVP | MAX (toggle per section)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [Data Model](#3-data-model)
4. [API Design](#4-api-design)
5. [Tech Stack](#5-tech-stack)
6. [Implementation Guidelines](#6-implementation-guidelines)
7. [Security Concept](#7-security-concept)
8. [Testing Strategy](#8-testing-strategy)
9. [Deployment Plan](#9-deployment-plan)
10. [Component Library](#10-component-library)
11. [DO NOT List](#11-do-not-list)

---

## 1. Project Overview

### 1.1 Goals & Scope

| Attribute | Value |
|-----------|-------|
| **Project Name** | ${projectName} |
| **Project Type** | Workflow Automation Application |
| **Framework** | ${stack.framework} |
| **Description** | ${config.meta.description || 'A workflow automation system'} |
| **Author** | ${config.meta.author || 'DevDudes'} |
| **Orchestration** | ${orchestrationMode} |
| **Deployment** | ${deployTarget} (${region}) |
| **Business Model** | ${findLabel(BUSINESS_MODEL_OPTIONS, config.publishing.businessModel)} |

### 1.2 Workflow Identity

${config.meta.description || `A ${orchestrationMode.toLowerCase()} workflow automation application with ${config.steps.length} steps, designed for ${config.auth.enabled ? 'multi-user' : 'single-user'} operation.`}

- **Steps:** ${config.steps.length} workflow steps (${[...new Set(config.steps.map((s) => s.type))].map((t) => findLabel(STEP_TYPE_OPTIONS, t)).join(', ')})
- **Triggers:** ${enabledTriggers.map((t) => findLabel(TRIGGER_TYPE_OPTIONS, t.type)).join(', ') || 'Manual'}
- **Data Sources:** ${config.dataConnectors.connectors.map((c) => findLabel(DATA_CONNECTOR_PROVIDER_OPTIONS, c.provider)).join(', ') || 'None'}
- **AI Integration:** ${enabledAi.map((p) => findLabel(AI_PROVIDER_OPTIONS, p.provider)).join(', ') || 'None'}

### 1.3 Timeline

| Milestone | MVP Target | MAX Target |
|-----------|-----------|-----------|
| Foundation & Auth | Week 1 | Week 1 |
| Workflow Engine | ${effort.mvp} | ${effort.max} |
| Features & Polish | ${effort.mvp} | ${effort.max} |
| Testing & QA | Final week | Final month |
| Distribution | — | Post-QA |

---

## 2. Technical Architecture

### 2.1 System Design (MVP)

\`\`\`
[Client — ${findLabel(LAYOUT_OPTIONS, config.ui.layout)} Layout]
       |
       v
[${stack.framework}]
       |
       +-- Workflow Engine (${orchestrationMode})
       |     +-- Step Executor
       |     +-- Trigger Manager
       |     +-- State Manager
       |
       +-- Data Layer
       |     ${config.dataConnectors.connectors.length > 0 ? config.dataConnectors.connectors.map((c) => `+-- ${findLabel(DATA_CONNECTOR_PROVIDER_OPTIONS, c.provider)}`).join('\n       |     ') : '+-- Database'}
       |
       +-- ${config.auth.enabled ? `Auth (${findLabel(SESSION_STRATEGY_OPTIONS, config.auth.sessionStrategy)})` : 'Basic Route Protection'}
\`\`\`

### 2.2 System Design (MAX Scope)

\`\`\`
[Client — ${findLabel(COMPONENT_LIBRARY_OPTIONS, config.ui.componentLibrary || 'shadcn')} + ${findLabel(LAYOUT_OPTIONS, config.ui.layout)}]
       |
       v
[${stack.framework}]
       |
       +-- Workflow Engine
       |     +-- ${orchestrationMode} Orchestrator
       |     +-- Step Executors (${[...new Set(config.steps.map((s) => s.type))].join(', ')})
       |     +-- Trigger System (${enabledTriggers.map((t) => t.type).join(', ') || 'manual'})
       |     +-- Error Recovery (${[...new Set(config.steps.map((s) => s.errorHandling))].join(', ')})
       |
       +-- Data Layer
       |     ${config.dataConnectors.connectors.map((c) => `+-- ${c.name} (${findLabel(DATA_CONNECTOR_PROVIDER_OPTIONS, c.provider)})`).join('\n       |     ') || '+-- Database'}
       |${config.caching.enabled ? `\n       +-- Cache (${findLabel(CACHE_PROVIDER_OPTIONS, config.caching.provider)})` : ''}
       |${config.queues.enabled ? `\n       +-- Queues (${config.queues.queues.map((q) => findLabel(QUEUE_PROVIDER_OPTIONS, q.provider)).join(', ')})` : ''}
       |${enabledAi.length > 0 ? `\n       +-- AI Layer (${enabledAi.map((p) => findLabel(AI_PROVIDER_OPTIONS, p.provider)).join(', ')})` : ''}
       |${config.notifications.enabled ? `\n       +-- Notifications (${config.notifications.channels.filter((c) => c.enabled).map((c) => findLabel(NOTIFICATION_CHANNEL_OPTIONS, c.type)).join(', ')})` : ''}
       |${config.monitoring.enabled ? `\n       +-- Monitoring (${findLabel(MONITORING_PROVIDER_OPTIONS, config.monitoring.provider)})` : ''}
       |
       +-- Auth (${config.auth.enabled ? enabledAuth.map((m) => findLabel(AUTH_METHOD_OPTIONS, m.type)).join(', ') : 'Disabled'})
       +-- Security (${findLabel(ENCRYPTION_OPTIONS, config.security.encryption)}${config.security.compliance.length > 0 ? `, ${mapLabels(COMPLIANCE_OPTIONS, config.security.compliance)}` : ''})
\`\`\`

### 2.3 Infrastructure

| Component | MVP | MAX Scope |
|-----------|-----|-----------|
| **Framework** | ${stack.framework} | ${stack.framework} (optimized) |
| **Orchestration** | ${orchestrationMode} | ${orchestrationMode} + circuit breaker |
| **Database** | ${config.dataConnectors.connectors.find((c) => c.type === 'database')?.provider || 'PostgreSQL'} | ${config.dataConnectors.connectors.find((c) => c.type === 'database')?.provider || 'PostgreSQL'} + read replicas |
| **Caching** | ${config.caching.enabled ? findLabel(CACHE_PROVIDER_OPTIONS, config.caching.provider) : '—'} | ${config.caching.enabled ? findLabel(CACHE_PROVIDER_OPTIONS, config.caching.provider) + ' cluster' : 'Redis'} |
| **Queue** | ${config.queues.enabled ? config.queues.queues.map((q) => findLabel(QUEUE_PROVIDER_OPTIONS, q.provider)).join(', ') : '—'} | ${config.queues.enabled ? 'Dedicated queue workers' : 'BullMQ'} |
| **AI** | ${enabledAi.length > 0 ? enabledAi.map((p) => findLabel(AI_PROVIDER_OPTIONS, p.provider)).join(', ') : '—'} | ${enabledAi.length > 0 ? 'Load-balanced AI gateway' : '—'} |
| **Monitoring** | ${config.logging.provider !== 'console' ? findLabel(LOGGING_PROVIDER_OPTIONS, config.logging.provider) : 'Console'} | ${config.monitoring.enabled ? findLabel(MONITORING_PROVIDER_OPTIONS, config.monitoring.provider) : 'Full observability stack'} |

---

## 3. Data Model

### 3.1 Workflow Data

\`\`\`
+------------------+       +------------------+
|  Workflow Run    |       |  Workflow Step   |
|                  |       |  Definition      |
| id               |       |                  |
| workflow_id      |--1:N--| id               |
| status           |       | order            |
| trigger_type     |       | type             |
| started_at       |       | title            |
| completed_at     |       | config           |
| error            |       | error_handling   |
| context          |       | timeout          |
+------------------+       +------------------+
       |
       | 1:N
       v
+------------------+       +------------------+
|  Step Execution  |       |  Audit Log       |
|                  |       |                  |
| id               |       | id               |
| run_id           |       | entity_type      |
| step_id          |       | entity_id        |
| status           |       | action           |
| input            |       | user_id          |
| output           |       | metadata         |
| started_at       |       | timestamp        |
| duration_ms      |       |                  |
| retries          |       |                  |
+------------------+       +------------------+
\`\`\`

### 3.2 Data Connectors

| Name | Type | Provider | Pool Size | Health Check |
|------|------|----------|-----------|-------------|
${connectorRows}

### 3.3 Variables & Secrets

| Key | Scope | Status |
|-----|-------|--------|
${variableRows}

**Secrets Provider:** ${findLabel(SECRETS_PROVIDER_OPTIONS, config.secrets.provider)}${config.secrets.keys.length > 0 ? ` (${config.secrets.keys.length} keys)` : ''}${config.secrets.rotationEnabled ? ' — rotation enabled' : ''}

### 3.4 Storage & Caching

| Component | Configuration |
|-----------|--------------|
| **Storage** | ${config.storage.enabled ? `${findLabel(STORAGE_TYPE_OPTIONS, config.storage.type)}${config.storage.bucket ? ` (${config.storage.bucket})` : ''} — max ${config.storage.maxFileSize}MB` : 'Disabled'} |
| **Caching** | ${config.caching.enabled ? `${findLabel(CACHE_PROVIDER_OPTIONS, config.caching.provider)} — ${findLabel(CACHE_STRATEGY_OPTIONS, config.caching.strategy)}, TTL ${config.caching.ttl}s` : 'Disabled'} |

---

## 4. API Design

### 4.1 Workflow API

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| /api/workflows | GET | List all workflows | ${config.auth.enabled ? 'Yes' : 'No'} |
| /api/workflows | POST | Create workflow | ${config.auth.enabled ? 'Yes' : 'No'} |
| /api/workflows/:id | GET | Get workflow details | ${config.auth.enabled ? 'Yes' : 'No'} |
| /api/workflows/:id/run | POST | Execute workflow | ${config.auth.enabled ? 'Yes' : 'No'} |
| /api/workflows/:id/runs | GET | List execution history | ${config.auth.enabled ? 'Yes' : 'No'} |
| /api/workflows/:id/runs/:runId | GET | Get run status | ${config.auth.enabled ? 'Yes' : 'No'} |
| /api/workflows/:id/runs/:runId/cancel | POST | Cancel running workflow | ${config.auth.enabled ? 'Yes' : 'No'} |
${enabledTriggers.some((t) => t.type === 'webhook') ? '| /api/webhooks/:id | POST | Receive webhook trigger | HMAC |' : ''}
${enabledAi.length > 0 ? '| /api/ai/process | POST | AI step execution | Yes |' : ''}

### 4.2 Triggers

| Type | Configuration | Status |
|------|--------------|--------|
${triggerRows}

### 4.3 Queues

| Queue | Provider | Concurrency |
|-------|----------|-------------|
${queueRows}

---

## 5. Tech Stack

| Category | MVP | MAX Scope |
|----------|-----|-----------|
| **Framework** | ${stack.framework} | ${stack.framework} (optimized) |
| **Language** | ${stack.language} | ${stack.language} |
| **Build Tool** | ${stack.buildTool} | ${stack.buildTool} + CI |
| **UI** | ${findLabel(COMPONENT_LIBRARY_OPTIONS, config.ui.componentLibrary || 'shadcn')} | ${findLabel(COMPONENT_LIBRARY_OPTIONS, config.ui.componentLibrary || 'shadcn')} (design system) |
| **Auth** | ${config.auth.enabled ? findLabel(SESSION_STRATEGY_OPTIONS, config.auth.sessionStrategy) : '—'} | ${config.auth.enabled ? findLabel(SESSION_STRATEGY_OPTIONS, config.auth.sessionStrategy) + ' + RBAC' : '—'} |
| **Database** | ${config.dataConnectors.connectors.find((c) => c.type === 'database')?.provider || 'PostgreSQL'} | + read replicas |
| **AI** | ${enabledAi.length > 0 ? enabledAi[0] ? findLabel(AI_PROVIDER_OPTIONS, enabledAi[0].provider) : '—' : '—'} | ${enabledAi.length > 1 ? 'Multi-provider + fallback' : enabledAi.length === 1 ? findLabel(AI_PROVIDER_OPTIONS, enabledAi[0].provider) + ' + fallback' : '—'} |
| **Testing** | ${findLabel(TEST_FRAMEWORK_OPTIONS, config.testing.unitFramework)} | + ${findLabel(E2E_FRAMEWORK_OPTIONS, config.testing.e2eFramework)} E2E |
| **Logging** | ${findLabel(LOGGING_PROVIDER_OPTIONS, config.logging.provider)} | ${config.monitoring.enabled ? findLabel(MONITORING_PROVIDER_OPTIONS, config.monitoring.provider) : findLabel(LOGGING_PROVIDER_OPTIONS, config.logging.provider)} |
| **CI/CD** | ${ciProvider} | ${ciProvider} + staged rollout |
| **Package Mgr** | ${stack.packageManager} | ${stack.packageManager} |

---

## 6. Implementation Guidelines

### 6.1 Code Standards

- **Naming:** camelCase for variables/functions, PascalCase for types/components
- **File structure:** Feature-based organization (see project structure in init prompt)
- **Error handling:** Always handle edge cases — no silent failures
- **Architecture:** ${config.orchestration.mode === 'event-driven' ? 'Event-driven architecture with pub/sub pattern' : config.orchestration.mode === 'saga' ? 'Saga pattern with compensation logic' : config.orchestration.mode === 'state-machine' ? 'State machine with explicit transitions' : 'Pipeline architecture with step isolation'}

### 6.2 Git Workflow

| Aspect | MVP | MAX Scope |
|--------|-----|-----------|
| Branching | \`main\` only | \`main\` > \`develop\` > \`feature/*\` |
| Commits | Conventional Commits | Conventional + tagged releases |
| Reviews | Self-review | PR required, 1 approval |
| CI | — | ${ciProvider !== 'None' ? ciProvider + ' pipeline' : 'Lint > Build > Test > Deploy'} |

### 6.3 Workflow-Specific Patterns

**Step Isolation:** Each workflow step must:
- Accept typed input and produce typed output
- Handle its own errors according to its error handling strategy
- Be independently testable
- Not hold references to other steps

**Orchestration:** Use ${orchestrationMode.toLowerCase()} pattern:
${config.orchestration.mode === 'sequential' ? '- Execute steps in order, pass output of each to the next\n- Fail fast on error (unless step has retry/skip)' : ''}${config.orchestration.mode === 'parallel' ? '- Execute independent steps concurrently (max concurrency: ' + config.orchestration.maxConcurrency + ')\n- Collect results and merge before dependent steps' : ''}${config.orchestration.mode === 'dag' ? '- Build dependency graph from step dependencies\n- Execute ready steps in parallel, respecting dependencies' : ''}${config.orchestration.mode === 'saga' ? '- Each step has a compensating action for rollback\n- On failure, execute compensations in reverse order' : ''}${config.orchestration.mode === 'state-machine' ? '- Define explicit states and transitions\n- Steps are transition handlers between states' : ''}${config.orchestration.mode === 'event-driven' ? '- Steps emit and consume events\n- Loosely coupled, reactive execution' : ''}

---

## 7. Security Concept

### 7.1 Authentication (${config.auth.enabled ? 'Enabled' : 'Disabled'})

${config.auth.enabled ? `| Concern | Solution |
|---------|----------|
| **Methods** | ${enabledAuth.map((m) => findLabel(AUTH_METHOD_OPTIONS, m.type)).join(', ')} |
| **Session** | ${findLabel(SESSION_STRATEGY_OPTIONS, config.auth.sessionStrategy)} (TTL: ${config.auth.sessionTtl}s) |
| **RBAC** | ${config.auth.rbac ? `${config.auth.roles.length} roles (${config.auth.roles.join(', ')})` : 'Disabled'} |
| **MFA** | ${config.auth.mfa ? 'Enabled' : 'Disabled'} |
| **Policies** | ${config.auth.policies.length} access policies defined |` : 'Authentication is disabled. All endpoints are publicly accessible.'}

### 7.2 Data Security

| Concern | Solution |
|---------|----------|
| **Encryption** | ${findLabel(ENCRYPTION_OPTIONS, config.security.encryption)} |
| **CORS** | ${config.security.cors ? `Enabled (${config.security.corsOrigins.length > 0 ? config.security.corsOrigins.join(', ') : 'configured origins'})` : 'Disabled'} |
| **CSP** | ${config.security.csp ? 'Enabled' : 'Disabled'} |
| **Rate Limiting** | ${config.security.rateLimit ? `${config.security.rateLimitMax} req/${config.security.rateLimitWindow}s` : 'Disabled'} |
| **Input Validation** | ${config.security.inputValidation ? 'Zod schemas on all inputs' : 'Disabled'} |
| **Secrets** | ${findLabel(SECRETS_PROVIDER_OPTIONS, config.secrets.provider)}${config.secrets.rotationEnabled ? ' + auto-rotation' : ''} |

### 7.3 Compliance

${config.security.compliance.length > 0 ? `| Standard | Status |
|----------|--------|
${config.security.compliance.map((c) => `| ${findLabel(COMPLIANCE_OPTIONS, c)} | Required |`).join('\n')}` : 'No compliance requirements configured.'}

### 7.4 Security Checklist (MAX Scope)

- [ ] All API inputs validated with Zod
- [ ] Authentication on all protected routes
- [ ] ${findLabel(ENCRYPTION_OPTIONS, config.security.encryption)} encryption for sensitive data
- [ ] Rate limiting on public endpoints
- [ ] CORS configured for allowed origins
- [ ] Secrets stored in ${findLabel(SECRETS_PROVIDER_OPTIONS, config.secrets.provider)}
- [ ] Security headers (CSP, HSTS, X-Frame-Options)
- [ ] Dependency vulnerability scanning
- [ ] ${config.security.compliance.length > 0 ? mapLabels(COMPLIANCE_OPTIONS, config.security.compliance) + ' compliance audit' : 'Security audit'}
- [ ] Webhook payload HMAC verification

---

## 8. Testing Strategy

### 8.1 MVP

| Type | Tool | Scope |
|------|------|-------|
| Unit | ${findLabel(TEST_FRAMEWORK_OPTIONS, config.testing.unitFramework)} | Step executors, utilities, validators |
| Integration | ${findLabel(TEST_FRAMEWORK_OPTIONS, config.testing.integrationFramework)} | API routes, workflow execution |
| Smoke | Manual | Full workflow runs |

### 8.2 MAX Scope

| Type | Tool | Scope | Target |
|------|------|-------|--------|
| Unit | ${findLabel(TEST_FRAMEWORK_OPTIONS, config.testing.unitFramework)} | Step logic, transformers, validators | ${config.testing.coverageTarget}% coverage |
| Integration | ${findLabel(TEST_FRAMEWORK_OPTIONS, config.testing.integrationFramework)} | API routes, data connectors, AI calls | Key paths |
| E2E | ${findLabel(E2E_FRAMEWORK_OPTIONS, config.testing.e2eFramework)} | Full workflow execution, UI flows | Critical paths |
| Load | ${config.testing.loadTesting ? config.testing.loadTestTool : '—'} | Workflow throughput, concurrent runs | Performance targets |
${config.testing.dryRun ? '| Dry Run | Built-in | Workflow validation without execution | All workflows |' : ''}

---

## 9. Deployment Plan

### 9.1 Environments

| Environment | URL | Variables |
|-------------|-----|-----------|
${envRows}

### 9.2 Deployment Configuration

| Setting | Value |
|---------|-------|
| **Target** | ${deployTarget} |
| **Region** | ${region} |
| **Scaling** | ${scaling}${config.deployment.scaling === 'auto' ? ` (${config.deployment.minInstances}–${config.deployment.maxInstances} instances)` : ''} |
| **Multi-Region** | ${config.deployment.multiRegion ? `Yes (${config.deployment.regions.join(', ')})` : 'No'} |
| **CI/CD** | ${ciProvider} |
| **Rollback** | ${config.deployment.rollback ? findLabel([{ value: 'automatic', label: 'Automatic' }, { value: 'manual', label: 'Manual' }], config.deployment.rollbackStrategy) : 'Not configured'} |

### 9.3 CI/CD Pipeline

\`\`\`
${config.deployment.ciStages.length > 0 ? config.deployment.ciStages.map((s, i) => `${i + 1}. ${s}`).join('\n') : `1. lint
2. typecheck
3. unit-test
4. build
5. deploy`}
\`\`\`

### 9.4 Distribution Channels

| Channel | Status | Notes |
|---------|--------|-------|
${distributionRows}

**Business Model:** ${findLabel(BUSINESS_MODEL_OPTIONS, config.publishing.businessModel)}
**License:** ${findLabel(APP_LICENSE_OPTIONS, config.publishing.license)}
**Versioning:** ${findLabel(VERSIONING_OPTIONS, config.publishing.versioning)}
**Release Strategy:** ${findLabel(RELEASE_STRATEGY_OPTIONS, config.publishing.releaseStrategy)}
${config.publishing.changelogEnabled ? '**Changelog:** Enabled' : ''}${config.publishing.autoPublish ? '\n**Auto-Publish:** Enabled' : ''}

---

## 10. Component Library

### 10.1 Workflow Engine (P0)

| Component | Description | Priority |
|-----------|-------------|----------|
| Step Executor | Execute workflow steps by type | P0 |
| ${orchestrationMode} Orchestrator | Coordinate step execution | P0 |
| Trigger Manager | Handle ${enabledTriggers.map((t) => findLabel(TRIGGER_TYPE_OPTIONS, t.type)).join(', ') || 'manual'} triggers | P0 |
| State Manager | Track workflow run state and history | P0 |
| Error Handler | ${[...new Set(config.steps.map((s) => s.errorHandling))].map((e) => findLabel(ERROR_HANDLING_OPTIONS, e)).join(', ')} strategies | P0 |

### 10.2 Features (P1)

| Feature | Category | Priority |
|---------|----------|----------|
${featureRows}

### 10.3 Middleware Pipeline

| Order | Name | Type |
|-------|------|------|
${middlewareRows}

### 10.4 Notifications & Hooks

**Notifications:**

| Channel | Provider | Status |
|---------|----------|--------|
${notifRows}

**Lifecycle Hooks:**

| Event | Handler |
|-------|---------|
${hookRows}

### 10.5 AI Integration (${enabledAi.length > 0 ? 'Configured' : 'Not Configured'})

| Provider | Model | Mode | Endpoint |
|----------|-------|------|----------|
${aiRows}

${config.aiIntegrations.rag ? `**RAG:** Enabled (${config.aiIntegrations.ragProvider})` : ''}
${config.aiIntegrations.guardrails ? '**Guardrails:** Enabled' : ''}
${config.aiIntegrations.fallbackEnabled ? `**Fallback:** ${config.aiIntegrations.fallbackProvider}` : ''}
${config.aiIntegrations.costTracking ? '**Cost Tracking:** Enabled' : ''}

### 10.6 Logging & Monitoring

| Setting | Value |
|---------|-------|
| **Log Level** | ${findLabel(LOG_LEVEL_OPTIONS, config.logging.level)} |
| **Log Provider** | ${findLabel(LOGGING_PROVIDER_OPTIONS, config.logging.provider)} |
| **Structured Logs** | ${config.logging.structured ? 'Yes' : 'No'} |
| **Retention** | ${config.logging.retentionDays} days |
| **Monitoring** | ${config.monitoring.enabled ? findLabel(MONITORING_PROVIDER_OPTIONS, config.monitoring.provider) : 'Disabled'} |
| **Metrics** | ${config.monitoring.metrics ? 'Enabled' : 'Disabled'} |
| **Tracing** | ${config.monitoring.tracing ? `${config.monitoring.tracingProvider || 'Enabled'}` : 'Disabled'} |
| **Health Checks** | ${config.monitoring.healthChecks ? `Every ${config.monitoring.healthCheckInterval}s` : 'Disabled'} |
| **Alerting** | ${config.monitoring.alerting ? `Via ${config.monitoring.alertChannels.join(', ')}` : 'Disabled'} |

---

## 11. DO NOT List

### Architecture

- DO NOT couple workflow steps to each other — each step must be independently executable
- DO NOT store state in memory across requests — use database or cache
- DO NOT skip input validation on any endpoint — use Zod schemas
- DO NOT hardcode secrets or connection strings — use ${findLabel(SECRETS_PROVIDER_OPTIONS, config.secrets.provider)}
- DO NOT create synchronous long-running processes — use queues for heavy work

### Code Quality

- DO NOT use \`any\` type — define proper TypeScript interfaces
- DO NOT write functions longer than 100 lines
- DO NOT commit .env files or secrets to version control
- DO NOT leave debug/console.log statements in production
- DO NOT skip error handling — every async operation needs try/catch
- DO NOT ignore TypeScript compiler warnings

### Workflow Design

- DO NOT create circular step dependencies
- DO NOT assume steps will execute in a fixed order (unless sequential mode)
- DO NOT skip step timeout configuration — every external call needs a timeout
- DO NOT ignore retry limits — infinite retries will exhaust resources
- DO NOT mix orchestration patterns — stick to ${orchestrationMode.toLowerCase()}

### Security

- DO NOT expose internal error details to clients
- DO NOT store passwords in plain text
- DO NOT skip CSRF protection on mutation endpoints
- DO NOT trust client-side data — always validate server-side
${config.security.compliance.length > 0 ? `- DO NOT skip ${mapLabels(COMPLIANCE_OPTIONS, config.security.compliance)} compliance requirements` : ''}

---

## Appendix

### A. Workflow Steps

| # | Title | Type | Error Handling | Retries | Timeout |
|---|-------|------|---------------|---------|---------|
${stepRows || '| — | — | — | — | — | — |'}

### B. Configuration Summary

${buildConfigSummary(config)}

---

> **This document is the single source of truth for development.**
> Generated by DevDudes Combo Dude — do not edit structure manually.`
}
