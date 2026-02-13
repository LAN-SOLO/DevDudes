import type { WebsiteConfig } from './types'
import {
  WEBSITE_TYPE_OPTIONS,
  INDUSTRY_OPTIONS,
  TARGET_AUDIENCE_OPTIONS,
  FRAMEWORK_OPTIONS,
  DATABASE_OPTIONS,
  ORM_OPTIONS,
  AUTH_PROVIDER_OPTIONS,
  HOSTING_OPTIONS,
  STYLING_OPTIONS,
  COMPONENT_LIBRARY_OPTIONS,
  LAYOUT_STYLE_OPTIONS,
  NAV_STYLE_OPTIONS,
  DESIGN_SYSTEM_OPTIONS,
  CMS_PROVIDER_OPTIONS,
  PAYMENT_PROCESSOR_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  API_STYLE_OPTIONS,
  CDN_OPTIONS,
  CACHING_OPTIONS,
  SCALING_OPTIONS,
  CI_OPTIONS,
  DISTRIBUTION_CHANNEL_OPTIONS,
  BUSINESS_MODULE_OPTIONS,
  DIRECTORY_PROVIDER_OPTIONS,
  isEcommerce,
  isBusinessService,
} from './constants'

function findLabel(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value
}

function mapLabels(options: { value: string; label: string }[], values: string[]): string {
  return values.map((v) => findLabel(options, v)).join(', ') || 'None selected'
}

// ── Framework Info ──────────────────────────────────────────────

interface FrameworkInfo {
  name: string
  projectStructure: string
  bestPractices: string[]
  errorPatterns: string[]
  antiPatterns: string[]
}

function getFrameworkInfo(framework: string): FrameworkInfo {
  const frameworks: Record<string, FrameworkInfo> = {
    nextjs: {
      name: 'Next.js (App Router)',
      projectStructure: `app/
├── (auth)/              # Auth route group
├── (marketing)/         # Public pages
├── (dashboard)/         # Protected pages
├── api/                 # API routes
├── layout.tsx           # Root layout
├── page.tsx             # Home page
├── loading.tsx          # Loading UI
├── error.tsx            # Error boundary
└── not-found.tsx        # 404 page
components/
├── ui/                  # Reusable UI components
├── forms/               # Form components
├── layouts/             # Layout components
└── shared/              # Shared components
lib/
├── db/                  # Database client & queries
├── auth/                # Auth utilities
├── utils.ts             # Utility functions
└── validations/         # Zod schemas
public/                  # Static assets
middleware.ts            # Auth & routing middleware`,
      bestPractices: [
        'Use Server Components by default, Client Components only when needed',
        'Implement route groups for layout organization',
        'Use server actions for mutations',
        'Implement middleware for auth protection',
        'Use dynamic imports for heavy components',
        'Implement proper loading.tsx and error.tsx boundaries',
      ],
      errorPatterns: [
        'Hydration mismatch — ensure server/client render the same initial HTML',
        'Missing "use client" directive for components using hooks or browser APIs',
        'Importing server-only code in client components',
        'Not handling loading states during server action execution',
      ],
      antiPatterns: [
        'DO NOT use getServerSideProps/getStaticProps (Pages Router patterns)',
        'DO NOT mix App Router and Pages Router',
        'DO NOT use client-side fetch for data that can be fetched on the server',
        'DO NOT put secrets in client components',
      ],
    },
    nuxt: {
      name: 'Nuxt 3',
      projectStructure: `pages/
├── index.vue            # Home page
├── about.vue            # About page
├── blog/
│   ├── index.vue        # Blog listing
│   └── [slug].vue       # Blog post
└── dashboard/
    └── index.vue        # Dashboard
components/
├── App/                 # App-level components
├── UI/                  # UI components
└── Forms/               # Form components
composables/             # Vue composables
server/
├── api/                 # API routes
├── middleware/           # Server middleware
└── utils/               # Server utilities
plugins/                 # Nuxt plugins
public/                  # Static assets`,
      bestPractices: [
        'Use auto-imports for composables and components',
        'Implement server routes in server/api/',
        'Use useFetch/useAsyncData for data fetching',
        'Implement middleware for route protection',
      ],
      errorPatterns: [
        'SSR hydration issues with client-only components',
        'Not wrapping browser APIs in onMounted or client-only checks',
      ],
      antiPatterns: [
        'DO NOT use Options API — use Composition API',
        'DO NOT manually import auto-imported composables',
      ],
    },
    astro: {
      name: 'Astro',
      projectStructure: `src/
├── pages/               # File-based routing
│   ├── index.astro      # Home page
│   ├── about.astro      # About page
│   └── blog/
│       ├── index.astro  # Blog listing
│       └── [slug].astro # Blog post
├── components/          # UI components (.astro, .tsx, .vue)
├── layouts/             # Page layouts
├── content/             # Content collections (MDX, MD)
├── styles/              # Global styles
└── lib/                 # Utilities
public/                  # Static assets
astro.config.mjs         # Astro configuration`,
      bestPractices: [
        'Use content collections for structured content',
        'Ship zero JS by default, add interactivity with islands',
        'Use .astro components for static content',
        'Use framework components (React/Vue/Svelte) only for interactive islands',
      ],
      errorPatterns: [
        'Client-side state not persisting between page navigations',
        'Importing node modules in client-side islands',
      ],
      antiPatterns: [
        'DO NOT use Astro for highly interactive SPAs',
        'DO NOT add client:load to every component — defeats the purpose',
      ],
    },
    remix: {
      name: 'Remix',
      projectStructure: `app/
├── routes/
│   ├── _index.tsx       # Home page
│   ├── about.tsx        # About page
│   ├── dashboard.tsx    # Dashboard layout
│   └── dashboard._index.tsx
├── components/          # UI components
├── lib/                 # Utilities
├── models/              # Data models
└── root.tsx             # Root layout
public/                  # Static assets`,
      bestPractices: [
        'Use loader/action pattern for data flow',
        'Leverage nested routing for layouts',
        'Use Form component for progressive enhancement',
        'Implement error boundaries per route',
      ],
      errorPatterns: [
        'Not returning Response objects from loaders/actions',
        'Waterfall data fetching in nested routes',
      ],
      antiPatterns: [
        'DO NOT use useEffect for data fetching — use loaders',
        'DO NOT bypass Remix data flow with client-side fetch',
      ],
    },
    sveltekit: {
      name: 'SvelteKit',
      projectStructure: `src/
├── routes/
│   ├── +page.svelte     # Home page
│   ├── +layout.svelte   # Root layout
│   ├── about/
│   │   └── +page.svelte
│   └── dashboard/
│       ├── +page.svelte
│       └── +page.server.ts
├── lib/
│   ├── components/      # UI components
│   └── server/          # Server-only modules
└── app.html             # HTML template
static/                  # Static assets`,
      bestPractices: [
        'Use +page.server.ts for server-side data loading',
        'Use form actions for mutations',
        'Leverage SvelteKit adapters for deployment',
      ],
      errorPatterns: [
        'Importing $app/environment in wrong context',
        'Not handling form action responses properly',
      ],
      antiPatterns: [
        'DO NOT use onMount for data fetching — use load functions',
        'DO NOT store secrets in $env/static/public',
      ],
    },
    gatsby: {
      name: 'Gatsby',
      projectStructure: `src/
├── pages/               # Page components
├── components/          # UI components
├── templates/           # Page templates
├── hooks/               # Custom hooks
└── styles/              # Stylesheets
gatsby-config.ts         # Configuration
gatsby-node.ts           # Node APIs
gatsby-browser.ts        # Browser APIs`,
      bestPractices: [
        'Use GraphQL data layer for content',
        'Implement image optimization with gatsby-image',
        'Use static queries for component-level data',
      ],
      errorPatterns: [
        'Build failures due to missing GraphQL fields',
        'Window reference errors during SSG',
      ],
      antiPatterns: [
        'DO NOT use Gatsby for dynamic content-heavy sites',
        'DO NOT ignore build-time performance',
      ],
    },
    wordpress: {
      name: 'WordPress (Headless)',
      projectStructure: `wordpress/
├── wp-content/
│   ├── themes/custom-theme/
│   ├── plugins/
│   └── uploads/
frontend/               # Headless frontend (Next.js/Nuxt)
├── pages/
├── components/
└── lib/
    └── wordpress.ts     # WP REST/GraphQL client`,
      bestPractices: [
        'Use WPGraphQL plugin for efficient data fetching',
        'Implement ISR for content updates',
        'Separate WordPress backend from frontend deployment',
      ],
      errorPatterns: [
        'CORS issues between WordPress and frontend',
        'Authentication token expiry handling',
      ],
      antiPatterns: [
        'DO NOT expose wp-admin to the public internet without IP restriction',
        'DO NOT install untrusted plugins',
      ],
    },
    shopify: {
      name: 'Shopify (Hydrogen/Storefront)',
      projectStructure: `app/
├── routes/
│   ├── ($locale)._index.tsx
│   ├── ($locale).products.$handle.tsx
│   ├── ($locale).collections.$handle.tsx
│   └── ($locale).cart.tsx
├── components/
│   ├── Layout.tsx
│   ├── ProductCard.tsx
│   └── Cart.tsx
└── lib/
    └── shopify.ts       # Storefront API client`,
      bestPractices: [
        'Use Storefront API for product data',
        'Implement cart with Shopify Cart API',
        'Use Shopify Analytics for tracking',
      ],
      errorPatterns: [
        'Rate limiting on Storefront API',
        'Stale product data from aggressive caching',
      ],
      antiPatterns: [
        'DO NOT bypass Shopify checkout — it handles PCI compliance',
        'DO NOT store customer data outside Shopify',
      ],
    },
  }

  return frameworks[framework] || {
    name: framework || 'Custom',
    projectStructure: `src/\n├── components/\n├── pages/\n├── lib/\n└── styles/`,
    bestPractices: ['Follow framework-specific best practices', 'Implement proper error handling'],
    errorPatterns: ['Configuration issues', 'Dependency conflicts'],
    antiPatterns: ['DO NOT skip error handling', 'DO NOT ignore security best practices'],
  }
}

// ── Config Summary ──────────────────────────────────────────────

function buildConfigSummary(config: WebsiteConfig): string {
  const sections: string[] = []

  sections.push(`## Website Overview`)
  sections.push(`- **Site Name:** ${config.siteName || 'Untitled Website'}`)
  sections.push(`- **Types:** ${mapLabels(WEBSITE_TYPE_OPTIONS, config.websiteTypes)}`)
  sections.push(`- **Industry:** ${findLabel(INDUSTRY_OPTIONS, config.industry)}`)
  sections.push(`- **Target Audience:** ${findLabel(TARGET_AUDIENCE_OPTIONS, config.targetAudience)}`)
  if (config.elevatorPitch) sections.push(`- **Description:** ${config.elevatorPitch}`)

  sections.push(`\n## Technical Stack`)
  sections.push(`- **Framework:** ${findLabel(FRAMEWORK_OPTIONS, config.framework)}`)
  sections.push(`- **Language:** ${config.language || 'TypeScript'}`)
  sections.push(`- **Styling:** ${findLabel(STYLING_OPTIONS, config.styling)}`)
  sections.push(`- **Component Library:** ${findLabel(COMPONENT_LIBRARY_OPTIONS, config.componentLibrary)}`)
  sections.push(`- **Database:** ${findLabel(DATABASE_OPTIONS, config.database)}`)
  sections.push(`- **ORM:** ${findLabel(ORM_OPTIONS, config.orm)}`)
  sections.push(`- **Auth:** ${findLabel(AUTH_PROVIDER_OPTIONS, config.auth)}`)
  sections.push(`- **API Style:** ${findLabel(API_STYLE_OPTIONS, config.apiStyle)}`)

  sections.push(`\n## Design`)
  sections.push(`- **Layout:** ${findLabel(LAYOUT_STYLE_OPTIONS, config.layoutStyle)}`)
  sections.push(`- **Navigation:** ${findLabel(NAV_STYLE_OPTIONS, config.navigationStyle)}`)
  sections.push(`- **Design System:** ${findLabel(DESIGN_SYSTEM_OPTIONS, config.designSystem)}`)
  sections.push(`- **Theme:** ${config.theme || 'Not specified'}`)

  if (config.cmsProvider && config.cmsProvider !== 'none') {
    sections.push(`\n## Content`)
    sections.push(`- **CMS:** ${findLabel(CMS_PROVIDER_OPTIONS, config.cmsProvider)}`)
    sections.push(`- **Blog:** ${config.blogEnabled ? 'Yes' : 'No'}`)
    sections.push(`- **i18n:** ${config.i18nEnabled ? `Yes (${config.i18nLanguages.join(', ')})` : 'No'}`)
    sections.push(`- **Search:** ${config.searchEnabled ? config.searchProvider : 'No'}`)
  }

  if (isEcommerce(config.websiteTypes)) {
    sections.push(`\n## E-Commerce`)
    sections.push(`- **Product Type:** ${findLabel(PRODUCT_TYPE_OPTIONS, config.productType)}`)
    sections.push(`- **Payment:** ${findLabel(PAYMENT_PROCESSOR_OPTIONS, config.paymentProcessor)}`)
    sections.push(`- **Checkout:** ${config.checkoutStyle || 'Not specified'}`)
    if (config.subscriptionBilling) sections.push(`- **Subscription Billing:** Enabled`)
  }

  if (isBusinessService(config.websiteTypes) && config.businessModules.length > 0) {
    sections.push(`\n## Business Service Modules`)
    sections.push(`- **Modules:** ${mapLabels(BUSINESS_MODULE_OPTIONS, config.businessModules)}`)
    if (config.directoryProvider && config.directoryProvider !== 'none') {
      sections.push(`- **Directory Provider:** ${findLabel(DIRECTORY_PROVIDER_OPTIONS, config.directoryProvider)}`)
      sections.push(`- **Auto-Sync:** ${config.directoryAutoSync ? 'Yes' : 'No'}`)
    }
  }

  sections.push(`\n## Hosting & Deployment`)
  sections.push(`- **Hosting:** ${findLabel(HOSTING_OPTIONS, config.hosting)}`)
  sections.push(`- **CI/CD:** ${findLabel(CI_OPTIONS, config.ci)}`)
  sections.push(`- **CDN:** ${findLabel(CDN_OPTIONS, config.cdn)}`)
  sections.push(`- **Caching:** ${findLabel(CACHING_OPTIONS, config.caching)}`)
  sections.push(`- **Scaling:** ${findLabel(SCALING_OPTIONS, config.scaling)}`)
  if (config.distributionChannels.length > 0) {
    const channelLabels = config.distributionChannels.map((c) => findLabel(DISTRIBUTION_CHANNEL_OPTIONS, c))
    sections.push(`- **Distribution:** ${channelLabels.join(', ')}`)
  }

  return sections.join('\n')
}

// ── Init Prompt Document ────────────────────────────────────────

export function buildInitPromptDoc(config: WebsiteConfig): string {
  const fw = getFrameworkInfo(config.framework)
  const summary = buildConfigSummary(config)
  const hasEcommerce = isEcommerce(config.websiteTypes)

  // Pre-compute complex expressions to avoid template literal parse errors
  const complianceList = config.compliance.length > 0 ? config.compliance.join(', ') : 'None specified'
  const analyticsStr = config.analytics.filter((a) => a !== 'none').join(', ') || 'None'
  const aiFeaturesList = config.aiFeatures.length > 0 ? config.aiFeatures.join(', ') : 'None'
  const authMethodsList = config.authMethods.length > 0 ? config.authMethods.join(', ') : 'None'
  const structuredDataList = config.structuredData.length > 0 ? config.structuredData.join(', ') : 'None'

  const mvpSteps: string[] = [
    '1. Initialize project with ' + fw.name,
    '2. Set up ' + (config.styling || 'CSS') + ' and design system',
    '3. Create base layout (' + (config.layoutStyle || 'default') + ' with ' + (config.navigationStyle || 'default') + ' navigation)',
    '4. Implement core pages: ' + (config.pageStructure.length > 0 ? config.pageStructure.slice(0, 5).join(', ') : 'home, about, contact'),
  ]

  if (config.auth && config.auth !== 'none') {
    mvpSteps.push('5. Set up authentication with ' + findLabel(AUTH_PROVIDER_OPTIONS, config.auth))
    mvpSteps.push('   - Methods: ' + authMethodsList)
  }

  if (config.database && config.database !== 'none') {
    mvpSteps.push((mvpSteps.length + 1) + '. Configure database (' + findLabel(DATABASE_OPTIONS, config.database) + ') with ' + findLabel(ORM_OPTIONS, config.orm))
  }

  if (config.cmsProvider && config.cmsProvider !== 'none') {
    mvpSteps.push((mvpSteps.length + 1) + '. Integrate CMS: ' + findLabel(CMS_PROVIDER_OPTIONS, config.cmsProvider))
  }

  if (hasEcommerce) {
    mvpSteps.push((mvpSteps.length + 1) + '. Set up product catalog (' + findLabel(PRODUCT_TYPE_OPTIONS, config.productType) + ')')
    mvpSteps.push((mvpSteps.length + 1) + '. Integrate payment processor: ' + findLabel(PAYMENT_PROCESSOR_OPTIONS, config.paymentProcessor))
    mvpSteps.push((mvpSteps.length + 1) + '. Build checkout flow (' + (config.checkoutStyle || 'one-page') + ')')
  }

  const hasBusinessService = isBusinessService(config.websiteTypes)
  if (hasBusinessService && config.businessModules.length > 0) {
    mvpSteps.push((mvpSteps.length + 1) + '. Implement business modules: ' + mapLabels(BUSINESS_MODULE_OPTIONS, config.businessModules))
    if (config.directoryProvider && config.directoryProvider !== 'none') {
      mvpSteps.push((mvpSteps.length + 1) + '. Set up directory integration: ' + findLabel(DIRECTORY_PROVIDER_OPTIONS, config.directoryProvider))
    }
  }

  mvpSteps.push((mvpSteps.length + 1) + '. Implement SEO (' + (config.seoStrategy || 'basic') + ') with structured data: ' + structuredDataList)
  mvpSteps.push((mvpSteps.length + 1) + '. Deploy to ' + findLabel(HOSTING_OPTIONS, config.hosting))

  const maxSteps: string[] = []
  if (config.i18nEnabled) maxSteps.push('- Add internationalization: ' + config.i18nLanguages.join(', '))
  if (config.searchEnabled) maxSteps.push('- Implement search with ' + (config.searchProvider || 'built-in'))
  if (config.aiFeatures.length > 0) maxSteps.push('- Integrate AI features: ' + aiFeaturesList)
  if (config.subscriptionBilling) maxSteps.push('- Add subscription billing system')
  if (config.internationalShipping) maxSteps.push('- Enable international shipping')
  maxSteps.push('- Add analytics: ' + analyticsStr)
  if (config.monitoring && config.monitoring !== 'none') maxSteps.push('- Set up monitoring: ' + config.monitoring)
  if (config.chatWidget && config.chatWidget !== 'none') maxSteps.push('- Add chat widget: ' + config.chatWidget)
  if (hasBusinessService && config.businessModules.includes('form-builder')) maxSteps.push('- Build drag-and-drop form builder with AI generation')
  if (hasBusinessService && config.businessModules.includes('signature-builder')) maxSteps.push('- Implement email signature builder with AD auto-fill')
  if (hasBusinessService && config.communicationChannels.length > 0) maxSteps.push('- Integrate notification channels: ' + config.communicationChannels.filter((c) => c !== 'none').join(', '))

  const constraintsList: string[] = [
    'DO NOT use deprecated APIs or patterns',
    'DO NOT store secrets in client-side code',
    'DO NOT skip input validation on forms',
    'DO NOT ignore accessibility (WCAG 2.1 AA minimum)',
    'DO NOT commit .env files or API keys',
  ]
  fw.antiPatterns.forEach((ap) => constraintsList.push(ap))
  if (hasEcommerce) {
    constraintsList.push('DO NOT store raw credit card numbers — use tokenized payments')
    constraintsList.push('DO NOT bypass payment processor checkout for PCI compliance')
  }
  if (hasBusinessService) {
    constraintsList.push('DO NOT store LDAP/AD credentials in client-side code')
    constraintsList.push('DO NOT expose directory sync endpoints without authentication')
    if (config.businessModules.includes('travel-expenses') || config.businessModules.includes('employee-budget')) {
      constraintsList.push('DO NOT process expense approvals without proper role checks')
    }
  }

  const errorHandling: string[] = [
    '- Implement global error boundary with user-friendly fallback UI',
    '- Add loading states for all async operations',
    '- Handle network failures gracefully with retry logic',
    '- Validate all user input on both client and server',
    '- Log errors to monitoring service in production',
  ]
  fw.errorPatterns.forEach((ep) => errorHandling.push('- Watch for: ' + ep))

  const mvpStepsBlock = mvpSteps.join('\n')
  const maxStepsBlock = maxSteps.join('\n')
  const constraintsBlock = constraintsList.map((c) => '- ' + c).join('\n')
  const errorBlock = errorHandling.join('\n')
  const bestPracticesBlock = fw.bestPractices.map((bp) => '- ' + bp).join('\n')

  return `# Website Init Prompt

## 1. Context & Overview

${summary}

## 2. Technical Specification

**Framework:** ${fw.name}
**Language:** ${config.language || 'TypeScript'}
**Styling:** ${config.styling || 'Not specified'}
**Component Library:** ${config.componentLibrary || 'None'}
**Package Manager:** ${config.packageManager || 'npm'}
**Monorepo:** ${config.monorepo ? 'Yes' : 'No'}

### Project Structure
\`\`\`
${fw.projectStructure}
\`\`\`

### Best Practices
${bestPracticesBlock}

## 3. Build Instructions — MVP

${mvpStepsBlock}

## 4. Build Instructions — Full Feature Set

${maxStepsBlock}

## 5. Constraints (DO NOT)

${constraintsBlock}

## 6. Error Handling & Edge Cases

${errorBlock}

## 7. Agent Prompts

When using AI coding assistants with this project:
- Always reference this init prompt for project context
- Follow the ${fw.name} patterns described above
- Validate changes against the constraint list before committing
- Test across different screen sizes (mobile-first)
- Compliance requirements: ${complianceList}
- Keep bundle size minimal — lazy load non-critical features
`
}

// ── Development Concept Document ────────────────────────────────

export function buildDevelopmentConceptDoc(config: WebsiteConfig): string {
  const fw = getFrameworkInfo(config.framework)
  const hasEcommerce = isEcommerce(config.websiteTypes)
  const hasBusinessService = isBusinessService(config.websiteTypes)

  // Pre-compute lists
  const websiteTypesList = mapLabels(WEBSITE_TYPE_OPTIONS, config.websiteTypes)
  const pagesList = config.pageStructure.length > 0 ? config.pageStructure.join(', ') : 'home, about, contact'
  const authMethodsList = config.authMethods.length > 0 ? config.authMethods.join(', ') : 'None'
  const environmentsList = config.environments.length > 0 ? config.environments.join(', ') : 'development, production'
  const complianceList = config.compliance.length > 0 ? config.compliance.join(', ') : 'None specified'

  // Data model entities
  const entities: string[] = ['User (id, email, name, role, created_at, updated_at)']
  if (config.blogEnabled || config.contentTypes.includes('blog')) {
    entities.push('Post (id, title, slug, content, author_id, published_at, status)')
    entities.push('Category (id, name, slug)')
    entities.push('Tag (id, name, slug)')
  }
  if (hasEcommerce) {
    entities.push('Product (id, name, slug, description, price, images, category_id, status)')
    entities.push('Order (id, user_id, status, total, shipping_address, created_at)')
    entities.push('OrderItem (id, order_id, product_id, quantity, price)')
    entities.push('Cart (id, user_id, items, updated_at)')
    if (config.variants) entities.push('ProductVariant (id, product_id, name, sku, price, stock)')
    if (config.reviews) entities.push('Review (id, product_id, user_id, rating, content, created_at)')
    if (config.coupons) entities.push('Coupon (id, code, discount_type, value, expires_at)')
    if (config.subscriptionBilling) entities.push('Subscription (id, user_id, plan_id, status, current_period_end)')
  }
  if (config.contentTypes.includes('user-generated')) {
    entities.push('Comment (id, user_id, content, parent_id, created_at)')
  }
  if (hasBusinessService) {
    if (config.businessModules.includes('travel-expenses')) {
      entities.push('ExpenseReport (id, user_id, title, amount, currency, status, receipt_url, approved_by, created_at)')
    }
    if (config.businessModules.includes('employee-budget')) {
      entities.push('BudgetRequest (id, user_id, amount, category, receipt_url, status, approved_by, created_at)')
    }
    if (config.businessModules.includes('sick-leave')) {
      entities.push('SickLeave (id, user_id, start_date, end_date, half_day, status, notified_at)')
    }
    if (config.businessModules.includes('form-builder')) {
      entities.push('FormTemplate (id, name, schema, created_by, created_at)')
      entities.push('FormSubmission (id, template_id, user_id, data, status, created_at)')
    }
    if (config.businessModules.includes('signature-builder')) {
      entities.push('SignatureTemplate (id, user_id, layout, fields, html, created_at)')
    }
  }
  const entitiesBlock = entities.map((e) => '- ' + e).join('\n')

  // API endpoints
  const endpoints: string[] = []
  if (config.auth && config.auth !== 'none') {
    endpoints.push('POST /auth/login — Authenticate user')
    endpoints.push('POST /auth/register — Create account')
    endpoints.push('POST /auth/logout — End session')
    endpoints.push('GET /auth/me — Get current user')
  }
  if (config.blogEnabled || config.contentTypes.includes('blog')) {
    endpoints.push('GET /posts — List posts (paginated)')
    endpoints.push('GET /posts/:slug — Get single post')
  }
  if (hasEcommerce) {
    endpoints.push('GET /products — List products (filtered, paginated)')
    endpoints.push('GET /products/:slug — Get product detail')
    endpoints.push('POST /cart — Add to cart')
    endpoints.push('PUT /cart/:id — Update cart item')
    endpoints.push('DELETE /cart/:id — Remove from cart')
    endpoints.push('POST /checkout — Create checkout session')
    endpoints.push('POST /webhooks/payment — Handle payment webhook')
    endpoints.push('GET /orders — List user orders')
  }
  if (config.searchEnabled) {
    endpoints.push('GET /search?q= — Search content')
  }
  if (hasBusinessService) {
    if (config.businessModules.includes('travel-expenses')) {
      endpoints.push('GET /expenses — List expense reports')
      endpoints.push('POST /expenses — Submit expense report')
      endpoints.push('PUT /expenses/:id/approve — Approve expense')
    }
    if (config.businessModules.includes('employee-budget')) {
      endpoints.push('POST /budget-requests — Submit budget request')
      endpoints.push('PUT /budget-requests/:id/approve — Approve request')
    }
    if (config.businessModules.includes('sick-leave')) {
      endpoints.push('POST /sick-leave — Report sick leave')
      endpoints.push('GET /sick-leave/team — Team absence overview')
    }
    if (config.businessModules.includes('form-builder')) {
      endpoints.push('GET /forms — List form templates')
      endpoints.push('POST /forms — Create form template')
      endpoints.push('POST /forms/:id/submit — Submit form response')
    }
    if (config.directoryProvider && config.directoryProvider !== 'none') {
      endpoints.push('POST /directory/sync — Trigger directory sync')
      endpoints.push('GET /directory/users — List directory users')
    }
  }
  const endpointsBlock = endpoints.map((e) => '- ' + e).join('\n')

  // Component library
  const components: string[] = [
    'Layout — Base page layout with header, main, footer',
    'Header — Navigation with ' + (config.navigationStyle || 'default') + ' style',
    'Footer — ' + (config.footerStyle || 'simple') + ' footer',
    'Button — Primary, secondary, outline, ghost variants',
    'Input — Text, email, password, number variants',
    'Card — Content container with header, body, footer',
  ]
  if (hasEcommerce) {
    components.push('ProductCard — Product image, title, price, add-to-cart')
    components.push('CartDrawer — Slide-out cart summary')
    components.push('CheckoutForm — ' + (config.checkoutStyle || 'one-page') + ' checkout')
    components.push('PriceDisplay — Formatted price with currency')
  }
  if (config.blogEnabled) {
    components.push('PostCard — Blog post preview card')
    components.push('PostContent — Rich text renderer')
  }
  if (config.searchEnabled) {
    components.push('SearchBar — Search input with autocomplete')
    components.push('SearchResults — Filtered results display')
  }
  if (hasBusinessService) {
    if (config.businessModules.includes('admin-area')) components.push('AdminPanel — User/group/role management dashboard')
    if (config.businessModules.includes('form-builder')) components.push('FormBuilder — Drag-and-drop form editor with preview')
    if (config.businessModules.includes('signature-builder')) components.push('SignatureEditor — Email signature configurator with live preview')
    if (config.businessModules.includes('travel-expenses')) components.push('ExpenseForm — Expense submission with receipt upload')
    if (config.businessModules.includes('employee-budget')) components.push('BudgetRequestForm — Budget request with AI receipt extraction')
    if (config.businessModules.includes('sick-leave')) components.push('SickLeaveForm — Absence reporting with calendar picker')
  }
  const componentsBlock = components.map((c) => '- ' + c).join('\n')

  // Testing strategy
  const testingItems: string[] = [
    'Unit tests for utility functions and helpers',
    'Component tests for UI components',
    'Integration tests for API routes',
    'E2E tests for critical user flows',
  ]
  if (hasEcommerce) {
    testingItems.push('E2E: Complete purchase flow (add to cart → checkout → payment)')
    testingItems.push('Integration: Payment webhook handling')
  }
  if (config.auth && config.auth !== 'none') {
    testingItems.push('Integration: Authentication flow (register, login, logout)')
  }
  const testingBlock = testingItems.map((t) => '- ' + t).join('\n')

  // DO NOT list
  const doNotList: string[] = [
    'DO NOT use any deprecated APIs or libraries',
    'DO NOT store credentials or secrets in version control',
    'DO NOT skip form validation on either client or server',
    'DO NOT ignore mobile responsiveness',
    'DO NOT deploy without running the full test suite',
    'DO NOT use inline styles — use the configured styling solution',
  ]
  fw.antiPatterns.forEach((ap) => doNotList.push(ap))
  if (hasEcommerce) {
    doNotList.push('DO NOT process payments without proper error handling and idempotency')
    doNotList.push('DO NOT store sensitive customer data without encryption')
  }
  if (hasBusinessService) {
    doNotList.push('DO NOT expose internal employee data without proper RBAC checks')
    doNotList.push('DO NOT store directory service credentials in client-accessible code')
    if (config.businessModules.includes('sick-leave')) doNotList.push('DO NOT log sensitive health information — only store absence dates')
    if (config.businessModules.includes('travel-expenses')) doNotList.push('DO NOT approve expenses without validation against budget limits')
  }
  const doNotBlock = doNotList.map((d) => '- ' + d).join('\n')

  return `# Website Development Concept

## 1. Project Overview

**Site Name:** ${config.siteName || 'Untitled Website'}
**Type:** ${websiteTypesList}
**Industry:** ${findLabel(INDUSTRY_OPTIONS, config.industry)}
**Target Audience:** ${findLabel(TARGET_AUDIENCE_OPTIONS, config.targetAudience)}
**E-Commerce:** ${hasEcommerce ? 'Yes' : 'No'}

${config.elevatorPitch ? `**Description:** ${config.elevatorPitch}` : ''}

## 2. Architecture

**Framework:** ${fw.name}
**Pattern:** ${config.apiStyle === 'server-actions' ? 'Server Actions (co-located mutations)' : config.apiStyle === 'trpc' ? 'tRPC (type-safe API)' : config.apiStyle === 'graphql' ? 'GraphQL API' : 'REST API'}
**Rendering:** ${config.framework === 'astro' ? 'Static Site Generation (SSG) with Islands' : config.framework === 'gatsby' ? 'Static Site Generation (SSG)' : 'Server-Side Rendering (SSR) with selective static generation'}

### Project Structure
\`\`\`
${fw.projectStructure}
\`\`\`

## 3. Data Model

${entitiesBlock}

## 4. API Design

**Style:** ${findLabel(API_STYLE_OPTIONS, config.apiStyle)}
**Authentication:** ${findLabel(AUTH_PROVIDER_OPTIONS, config.auth)} (${authMethodsList})

### Endpoints
${endpointsBlock}

## 5. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | ${fw.name} |
| Language | ${config.language || 'TypeScript'} |
| Styling | ${findLabel(STYLING_OPTIONS, config.styling)} |
| Components | ${findLabel(COMPONENT_LIBRARY_OPTIONS, config.componentLibrary)} |
| Database | ${findLabel(DATABASE_OPTIONS, config.database)} |
| ORM | ${findLabel(ORM_OPTIONS, config.orm)} |
| Auth | ${findLabel(AUTH_PROVIDER_OPTIONS, config.auth)} |
| Hosting | ${findLabel(HOSTING_OPTIONS, config.hosting)} |
| CDN | ${findLabel(CDN_OPTIONS, config.cdn)} |
| CI/CD | ${findLabel(CI_OPTIONS, config.ci)} |

## 6. Implementation Guidelines

### Pages
${pagesList}

### Key Patterns
${fw.bestPractices.map((bp) => '- ' + bp).join('\n')}

### Design System
- **Theme:** ${config.theme || 'System'}
- **Design System:** ${findLabel(DESIGN_SYSTEM_OPTIONS, config.designSystem)}
- **Layout:** ${findLabel(LAYOUT_STYLE_OPTIONS, config.layoutStyle)}
- **Primary Color:** ${config.primaryColor}
- **Border Radius:** ${config.borderRadius || 'medium'}
- **Animation Level:** ${config.animationLevel || 'subtle'}
- **Icon Set:** ${config.iconStyle || 'lucide'}

## 7. Security Plan

- **SSL:** ${config.ssl ? 'Enabled' : 'Disabled'}
- **CSP:** ${config.csp ? 'Enabled' : 'Disabled'}
- **Rate Limiting:** ${config.rateLimiting ? 'Enabled' : 'Disabled'}
- **DDoS Protection:** ${config.ddosProtection ? 'Enabled' : 'Disabled'}
- **WAF:** ${config.waf ? 'Enabled' : 'Disabled'}
- **Backups:** ${config.backups || 'None'}
- **Compliance:** ${complianceList}
${hasBusinessService && config.directoryProvider && config.directoryProvider !== 'none' ? `- **Directory Provider:** ${findLabel(DIRECTORY_PROVIDER_OPTIONS, config.directoryProvider)}\n- **Directory Auto-Sync:** ${config.directoryAutoSync ? 'Yes' : 'No'}` : ''}

## 8. Testing Strategy

${testingBlock}

## 9. Deployment Plan

- **Hosting:** ${findLabel(HOSTING_OPTIONS, config.hosting)}
- **CI/CD:** ${findLabel(CI_OPTIONS, config.ci)}
- **Environments:** ${environmentsList}
- **Scaling:** ${findLabel(SCALING_OPTIONS, config.scaling)}
- **Region:** ${config.region || 'Not specified'}
- **Containerized:** ${config.containerized ? 'Yes' : 'No'}
- **Caching:** ${findLabel(CACHING_OPTIONS, config.caching)}
- **Distribution Channels:** ${config.distributionChannels.length > 0 ? config.distributionChannels.map((c) => findLabel(DISTRIBUTION_CHANNEL_OPTIONS, c)).join(', ') : 'None specified'}

## 10. Component Library

${componentsBlock}

## 11. DO NOT List

${doNotBlock}
`
}
