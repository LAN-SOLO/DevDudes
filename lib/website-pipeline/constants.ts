import type { WebsiteOption, WebsiteStepCategory } from './types'

// ── Utility ─────────────────────────────────────────────────
export const ECOMMERCE_TYPES = ['ecommerce', 'marketplace', 'saas-product'] as const

export function isEcommerce(websiteTypes: string[]): boolean {
  return websiteTypes.some((t) => (ECOMMERCE_TYPES as readonly string[]).includes(t))
}

export const BUSINESS_SERVICE_TYPES = ['business-service'] as const

export function isBusinessService(websiteTypes: string[]): boolean {
  return websiteTypes.some((t) => (BUSINESS_SERVICE_TYPES as readonly string[]).includes(t))
}

// ── Nav Categories ──────────────────────────────────────────
export const STEP_CATEGORIES: WebsiteStepCategory[] = [
  { id: 'identity', label: 'Identity', steps: [1, 2, 3, 4] },
  { id: 'design', label: 'Design', steps: [5, 6, 7] },
  { id: 'tech', label: 'Tech', steps: [8, 9, 10] },
  { id: 'commerce', label: 'Commerce', steps: [11, 12, 13] },
  { id: 'launch', label: 'Launch', steps: [14, 15, 16, 17] },
  { id: 'business', label: 'Business', steps: [18, 19] },
]

export const STEP_LABELS: Record<number, string> = {
  1: 'Import',
  2: 'Type & Purpose',
  3: 'Branding',
  4: 'Corporate Identity',
  5: 'Layout',
  6: 'Visual Design',
  7: 'Content',
  8: 'Framework',
  9: 'Backend',
  10: 'Integrations',
  11: 'Products',
  12: 'Payments',
  13: 'Shipping',
  14: 'SEO',
  15: 'Security',
  16: 'Hosting',
  17: 'AI & Notes',
  18: 'Business Modules',
  19: 'Directory & Messaging',
}

// ── Step 2: Website Type & Purpose ──────────────────────────
export const WEBSITE_TYPE_OPTIONS: WebsiteOption[] = [
  { value: 'corporate', label: 'Corporate', icon: 'Building2', description: 'Business or company website with team and services pages' },
  { value: 'portfolio', label: 'Portfolio', icon: 'Briefcase', description: 'Showcase work, projects, and professional experience' },
  { value: 'blog', label: 'Blog', icon: 'PenLine', description: 'Content-focused site with articles and posts' },
  { value: 'ecommerce', label: 'E-Commerce', icon: 'ShoppingCart', description: 'Online store with products, cart, and checkout' },
  { value: 'saas-product', label: 'SaaS Product', icon: 'Cloud', description: 'Software-as-a-service with dashboard and subscriptions' },
  { value: 'landing-page', label: 'Landing Page', icon: 'FileText', description: 'Single conversion-focused page for a product or campaign' },
  { value: 'marketplace', label: 'Marketplace', icon: 'Store', description: 'Multi-vendor platform where users buy and sell' },
  { value: 'community', label: 'Community', icon: 'Users', description: 'Forum, social platform, or member-driven site' },
  { value: 'documentation', label: 'Documentation', icon: 'BookOpen', description: 'Technical docs, guides, and API references' },
  { value: 'webapp', label: 'Web App', icon: 'AppWindow', description: 'Interactive application with complex UI and state management' },
  { value: 'business-service', label: 'Business Service Portal', icon: 'Building', description: 'Employee intranet with admin, forms, signatures, and self-service areas' },
]

export const INDUSTRY_OPTIONS: WebsiteOption[] = [
  { value: 'technology', label: 'Technology', icon: 'Cpu', description: 'Software, hardware, and IT services' },
  { value: 'healthcare', label: 'Healthcare', icon: 'Heart', description: 'Medical, wellness, and health services' },
  { value: 'finance', label: 'Finance', icon: 'DollarSign', description: 'Banking, fintech, and financial services' },
  { value: 'education', label: 'Education', icon: 'GraduationCap', description: 'Schools, e-learning, and educational platforms' },
  { value: 'retail', label: 'Retail', icon: 'ShoppingBag', description: 'Physical and online retail businesses' },
  { value: 'real-estate', label: 'Real Estate', icon: 'Home', description: 'Property listings, agencies, and management' },
  { value: 'food-beverage', label: 'Food & Beverage', icon: 'UtensilsCrossed', description: 'Restaurants, delivery, and food brands' },
  { value: 'travel', label: 'Travel', icon: 'Plane', description: 'Tourism, booking, and travel services' },
  { value: 'media-entertainment', label: 'Media & Entertainment', icon: 'Film', description: 'Content, streaming, and entertainment' },
  { value: 'non-profit', label: 'Non-Profit', icon: 'HandHeart', description: 'Charitable organizations and NGOs' },
  { value: 'internal-services', label: 'Internal Services / HR', icon: 'Users', description: 'Internal employee tools, HR, and administration' },
]

export const TARGET_AUDIENCE_OPTIONS: WebsiteOption[] = [
  { value: 'b2b', label: 'B2B', icon: 'Building', description: 'Business-to-business targeting companies and teams' },
  { value: 'b2c', label: 'B2C', icon: 'User', description: 'Business-to-consumer targeting individual users' },
  { value: 'developers', label: 'Developers', icon: 'Code2', description: 'Software developers and technical audience' },
  { value: 'enterprise', label: 'Enterprise', icon: 'Landmark', description: 'Large organizations with complex requirements' },
  { value: 'startups', label: 'Startups', icon: 'Rocket', description: 'Early-stage companies and founders' },
  { value: 'creators', label: 'Creators', icon: 'Palette', description: 'Artists, designers, and content creators' },
  { value: 'students', label: 'Students', icon: 'BookOpen', description: 'Learners and academic audience' },
  { value: 'general', label: 'General Public', icon: 'Globe', description: 'Broad audience with no specific niche' },
]

// ── Step 3: Branding ────────────────────────────────────────
export const BRAND_TONE_OPTIONS: WebsiteOption[] = [
  { value: 'professional', label: 'Professional', icon: 'Briefcase', description: 'Formal, trustworthy, and corporate' },
  { value: 'playful', label: 'Playful', icon: 'Smile', description: 'Fun, casual, and approachable' },
  { value: 'minimal', label: 'Minimal', icon: 'Minus', description: 'Clean, simple, and understated' },
  { value: 'bold', label: 'Bold', icon: 'Zap', description: 'Strong, impactful, and attention-grabbing' },
  { value: 'elegant', label: 'Elegant', icon: 'Crown', description: 'Sophisticated, luxurious, and refined' },
  { value: 'technical', label: 'Technical', icon: 'Terminal', description: 'Developer-oriented, precise, and detailed' },
]

export const LOGO_STYLE_OPTIONS: WebsiteOption[] = [
  { value: 'wordmark', label: 'Wordmark', icon: 'Type', description: 'Text-only logo using stylized typography' },
  { value: 'lettermark', label: 'Lettermark', icon: 'Hash', description: 'Initials or monogram-based logo' },
  { value: 'icon', label: 'Icon', icon: 'Shapes', description: 'Symbol or graphic mark without text' },
  { value: 'combination', label: 'Combination', icon: 'LayoutGrid', description: 'Icon paired with text together' },
  { value: 'emblem', label: 'Emblem', icon: 'Shield', description: 'Text enclosed within a badge or seal' },
]

export const FONT_HEADING_OPTIONS: WebsiteOption[] = [
  { value: 'inter', label: 'Inter', icon: 'Type', description: 'Modern geometric sans-serif, highly readable' },
  { value: 'poppins', label: 'Poppins', icon: 'Type', description: 'Rounded geometric sans-serif, friendly feel' },
  { value: 'playfair', label: 'Playfair Display', icon: 'Type', description: 'Elegant serif with high contrast strokes' },
  { value: 'roboto', label: 'Roboto', icon: 'Type', description: 'Mechanical yet friendly, great for UI' },
  { value: 'montserrat', label: 'Montserrat', icon: 'Type', description: 'Urban geometric sans-serif, bold presence' },
  { value: 'space-grotesk', label: 'Space Grotesk', icon: 'Type', description: 'Proportional sans-serif with a techy feel' },
  { value: 'dm-sans', label: 'DM Sans', icon: 'Type', description: 'Low-contrast geometric sans, clean and modern' },
  { value: 'cal-sans', label: 'Cal Sans', icon: 'Type', description: 'Geometric display font, bold and distinctive' },
]

export const FONT_BODY_OPTIONS: WebsiteOption[] = [
  { value: 'inter', label: 'Inter', icon: 'AlignLeft', description: 'Excellent readability for long-form content' },
  { value: 'roboto', label: 'Roboto', icon: 'AlignLeft', description: 'Versatile body font with good line length' },
  { value: 'open-sans', label: 'Open Sans', icon: 'AlignLeft', description: 'Humanist sans-serif, neutral and friendly' },
  { value: 'lato', label: 'Lato', icon: 'AlignLeft', description: 'Warm semi-rounded details, professional look' },
  { value: 'source-sans-3', label: 'Source Sans 3', icon: 'AlignLeft', description: 'Adobe open-source, optimized for UI' },
  { value: 'dm-sans', label: 'DM Sans', icon: 'AlignLeft', description: 'Pairs well with most heading fonts' },
]

// ── Step 4: Layout & Navigation ─────────────────────────────
export const LAYOUT_STYLE_OPTIONS: WebsiteOption[] = [
  { value: 'sidebar', label: 'Sidebar', icon: 'PanelLeft', description: 'Left sidebar navigation, ideal for dashboards' },
  { value: 'topnav', label: 'Top Navigation', icon: 'PanelTop', description: 'Horizontal navigation bar at the top' },
  { value: 'hero-centric', label: 'Hero Centric', icon: 'Maximize', description: 'Full-screen hero sections with scroll-based content' },
  { value: 'magazine', label: 'Magazine', icon: 'Newspaper', description: 'Multi-column grid layout for content-heavy sites' },
  { value: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Widget-based layout with cards and panels' },
  { value: 'minimal', label: 'Minimal', icon: 'Minus', description: 'Single-column focused layout with minimal chrome' },
]

export const NAV_STYLE_OPTIONS: WebsiteOption[] = [
  { value: 'sticky', label: 'Sticky', icon: 'Pin', description: 'Navigation stays visible while scrolling' },
  { value: 'fixed', label: 'Fixed', icon: 'Lock', description: 'Fixed position, always visible at the top' },
  { value: 'hamburger', label: 'Hamburger', icon: 'Menu', description: 'Collapsible menu behind a toggle icon' },
  { value: 'mega-menu', label: 'Mega Menu', icon: 'LayoutGrid', description: 'Expanded dropdown with multiple columns' },
  { value: 'breadcrumb', label: 'Breadcrumb', icon: 'ChevronRight', description: 'Hierarchical path-based navigation' },
  { value: 'tabbed', label: 'Tabbed', icon: 'Columns', description: 'Tab-based section switching' },
]

export const HEADER_STYLE_OPTIONS: WebsiteOption[] = [
  { value: 'transparent', label: 'Transparent', icon: 'Eye', description: 'Header blends into the hero section' },
  { value: 'solid', label: 'Solid', icon: 'Square', description: 'Opaque background header with clear separation' },
  { value: 'minimal', label: 'Minimal', icon: 'Minus', description: 'Slim header with just logo and essential links' },
  { value: 'with-cta', label: 'With CTA', icon: 'MousePointerClick', description: 'Header includes a prominent call-to-action button' },
]

export const FOOTER_STYLE_OPTIONS: WebsiteOption[] = [
  { value: 'simple', label: 'Simple', icon: 'Minus', description: 'Single-row footer with copyright and links' },
  { value: 'multi-column', label: 'Multi-Column', icon: 'Columns', description: 'Organized sections with links and info' },
  { value: 'minimal', label: 'Minimal', icon: 'ArrowDown', description: 'Compact footer with minimal content' },
  { value: 'mega-footer', label: 'Mega Footer', icon: 'LayoutGrid', description: 'Full-width footer with newsletter, social, and sitemap' },
]

export const PAGE_STRUCTURE_OPTIONS: WebsiteOption[] = [
  { value: 'home', label: 'Home', icon: 'Home', description: 'Main landing page with hero and overview' },
  { value: 'about', label: 'About', icon: 'Info', description: 'Company or personal about page' },
  { value: 'blog', label: 'Blog', icon: 'PenLine', description: 'Blog listing and article detail pages' },
  { value: 'products', label: 'Products', icon: 'Package', description: 'Product catalog and detail pages' },
  { value: 'pricing', label: 'Pricing', icon: 'DollarSign', description: 'Pricing tiers and comparison table' },
  { value: 'contact', label: 'Contact', icon: 'Mail', description: 'Contact form and company information' },
  { value: 'faq', label: 'FAQ', icon: 'HelpCircle', description: 'Frequently asked questions accordion' },
  { value: 'docs', label: 'Documentation', icon: 'BookOpen', description: 'Technical documentation and guides' },
  { value: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Authenticated user dashboard' },
  { value: 'portfolio', label: 'Portfolio', icon: 'Image', description: 'Gallery or project showcase page' },
]

// ── Step 5: Visual Design & Theme ───────────────────────────
export const DESIGN_SYSTEM_OPTIONS: WebsiteOption[] = [
  { value: 'material', label: 'Material Design', icon: 'Square', description: 'Google Material Design guidelines and components' },
  { value: 'fluent', label: 'Fluent Design', icon: 'Layers', description: 'Microsoft Fluent UI system with depth and motion' },
  { value: 'tailwind-first', label: 'Tailwind First', icon: 'Wind', description: 'Utility-first design built on Tailwind CSS' },
  { value: 'human-interface', label: 'Human Interface', icon: 'Apple', description: 'Apple HIG principles with clarity and depth' },
  { value: 'custom', label: 'Custom System', icon: 'Paintbrush', description: 'Bespoke design system tailored to the brand' },
]

export const ANIMATION_LEVEL_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No animations, static content only' },
  { value: 'subtle', label: 'Subtle', icon: 'Minus', description: 'Gentle fade-ins and smooth transitions' },
  { value: 'moderate', label: 'Moderate', icon: 'Activity', description: 'Scroll animations, hover effects, and micro-interactions' },
  { value: 'rich', label: 'Rich', icon: 'Sparkles', description: 'Complex animations, parallax, and motion design' },
]

export const ICON_STYLE_OPTIONS: WebsiteOption[] = [
  { value: 'lucide', label: 'Lucide', icon: 'Feather', description: 'Clean, consistent open-source icon set' },
  { value: 'heroicons', label: 'Heroicons', icon: 'Shield', description: 'Tailwind-native icons by the makers of Tailwind' },
  { value: 'phosphor', label: 'Phosphor', icon: 'Atom', description: 'Flexible icons with multiple weights and styles' },
  { value: 'tabler', label: 'Tabler', icon: 'Table', description: 'Over 4000 pixel-perfect stroke icons' },
  { value: 'custom', label: 'Custom Icons', icon: 'Paintbrush', description: 'Custom-designed icon set for the brand' },
]

export const IMAGE_STRATEGY_OPTIONS: WebsiteOption[] = [
  { value: 'stock', label: 'Stock Photos', icon: 'Image', description: 'Licensed stock photography from providers' },
  { value: 'ai-generated', label: 'AI Generated', icon: 'Wand2', description: 'AI-created images tailored to content' },
  { value: 'custom', label: 'Custom Photography', icon: 'Camera', description: 'Original photos and branded imagery' },
  { value: 'placeholder', label: 'Placeholder', icon: 'ImageOff', description: 'Temporary placeholder images for prototyping' },
]

export const BORDER_RADIUS_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None (0px)', icon: 'Square', description: 'Sharp corners for a strict, modern look' },
  { value: 'small', label: 'Small (4px)', icon: 'RectangleHorizontal', description: 'Subtle rounding for a professional feel' },
  { value: 'medium', label: 'Medium (8px)', icon: 'RectangleHorizontal', description: 'Balanced rounding, the most common choice' },
  { value: 'large', label: 'Large (16px)', icon: 'RectangleHorizontal', description: 'Noticeably rounded, friendly and approachable' },
  { value: 'full', label: 'Full (9999px)', icon: 'Circle', description: 'Pill-shaped elements, playful and soft' },
]

// ── Step 6: Content Strategy ────────────────────────────────
export const CONTENT_TYPE_OPTIONS: WebsiteOption[] = [
  { value: 'static', label: 'Static Pages', icon: 'FileText', description: 'Hand-coded static content with no CMS' },
  { value: 'blog', label: 'Blog', icon: 'PenLine', description: 'Regularly updated articles and posts' },
  { value: 'cms', label: 'CMS-Managed', icon: 'Database', description: 'Content managed through a headless CMS' },
  { value: 'user-generated', label: 'User-Generated', icon: 'Users', description: 'Content created by community members' },
  { value: 'documentation', label: 'Documentation', icon: 'BookOpen', description: 'Structured technical docs and guides' },
  { value: 'wiki', label: 'Wiki', icon: 'Library', description: 'Collaborative knowledge base with versioning' },
]

export const CMS_PROVIDER_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No CMS, content managed in code' },
  { value: 'sanity', label: 'Sanity', icon: 'Database', description: 'Real-time collaborative CMS with GROQ queries' },
  { value: 'strapi', label: 'Strapi', icon: 'Server', description: 'Open-source headless CMS with REST and GraphQL' },
  { value: 'contentful', label: 'Contentful', icon: 'Cloud', description: 'Enterprise headless CMS with CDN delivery' },
  { value: 'payload', label: 'Payload', icon: 'Box', description: 'TypeScript-first CMS with built-in auth' },
  { value: 'wordpress-headless', label: 'WordPress (Headless)', icon: 'Globe', description: 'WordPress as a headless backend via REST API' },
  { value: 'directus', label: 'Directus', icon: 'Database', description: 'Open-source data platform wrapping any SQL database' },
  { value: 'keystatic', label: 'Keystatic', icon: 'FileText', description: 'Git-based CMS for Markdown and JSON content' },
]

export const SEARCH_PROVIDER_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No search functionality' },
  { value: 'algolia', label: 'Algolia', icon: 'Search', description: 'Fast hosted search with typo tolerance and faceting' },
  { value: 'typesense', label: 'Typesense', icon: 'Search', description: 'Open-source search engine with instant results' },
  { value: 'meilisearch', label: 'Meilisearch', icon: 'Search', description: 'Lightning-fast open-source search with filtering' },
  { value: 'built-in', label: 'Built-In', icon: 'Search', description: 'Custom search implementation using the database' },
]

// ── Step 7: Framework & Stack ───────────────────────────────
export const FRAMEWORK_OPTIONS: WebsiteOption[] = [
  { value: 'nextjs', label: 'Next.js', icon: 'Globe', description: 'React framework with SSR, SSG, and App Router' },
  { value: 'nuxt', label: 'Nuxt', icon: 'Layers', description: 'Vue.js framework with auto-imports and SSR' },
  { value: 'astro', label: 'Astro', icon: 'Sparkles', description: 'Content-first framework with island architecture' },
  { value: 'remix', label: 'Remix', icon: 'RefreshCw', description: 'Full-stack React framework with nested routing' },
  { value: 'sveltekit', label: 'SvelteKit', icon: 'Zap', description: 'Svelte framework with file-based routing and SSR' },
  { value: 'gatsby', label: 'Gatsby', icon: 'Hexagon', description: 'Static site generator with GraphQL data layer' },
  { value: 'wordpress', label: 'WordPress', icon: 'FileText', description: 'Full WordPress CMS with themes and plugins' },
  { value: 'shopify', label: 'Shopify', icon: 'ShoppingBag', description: 'E-commerce platform with Hydrogen/Liquid themes' },
  { value: 'custom', label: 'Custom', icon: 'Code2', description: 'Custom framework or vanilla setup' },
]

export const STYLING_OPTIONS: WebsiteOption[] = [
  { value: 'tailwindcss', label: 'Tailwind CSS', icon: 'Wind', description: 'Utility-first CSS framework with JIT compiler' },
  { value: 'css-modules', label: 'CSS Modules', icon: 'FileText', description: 'Scoped CSS with local class names' },
  { value: 'styled-components', label: 'Styled Components', icon: 'Paintbrush', description: 'CSS-in-JS with tagged template literals' },
  { value: 'sass', label: 'Sass/SCSS', icon: 'Palette', description: 'CSS preprocessor with variables and nesting' },
  { value: 'emotion', label: 'Emotion', icon: 'Heart', description: 'Performant CSS-in-JS with flexible APIs' },
  { value: 'vanilla', label: 'Vanilla CSS', icon: 'FileText', description: 'Plain CSS with modern features and custom properties' },
]

export const COMPONENT_LIBRARY_OPTIONS: WebsiteOption[] = [
  { value: 'shadcn', label: 'shadcn/ui', icon: 'Blocks', description: 'Beautifully designed components built on Radix UI' },
  { value: 'mui', label: 'Material UI', icon: 'Square', description: 'Comprehensive React component library by Google' },
  { value: 'chakra', label: 'Chakra UI', icon: 'Circle', description: 'Accessible React components with style props' },
  { value: 'mantine', label: 'Mantine', icon: 'Hexagon', description: 'Full-featured React components and hooks library' },
  { value: 'radix', label: 'Radix UI', icon: 'Layers', description: 'Unstyled, accessible primitives for React' },
  { value: 'headless-ui', label: 'Headless UI', icon: 'Box', description: 'Unstyled, accessible components by Tailwind Labs' },
  { value: 'daisyui', label: 'daisyUI', icon: 'Flower2', description: 'Tailwind CSS component library with themes' },
  { value: 'custom', label: 'Custom', icon: 'Paintbrush', description: 'Build components from scratch' },
  { value: 'none', label: 'None', icon: 'X', description: 'No component library, raw elements only' },
]

export const PACKAGE_MANAGER_OPTIONS: WebsiteOption[] = [
  { value: 'npm', label: 'npm', icon: 'Package', description: 'Default Node.js package manager' },
  { value: 'pnpm', label: 'pnpm', icon: 'Package', description: 'Fast, disk-efficient package manager' },
  { value: 'yarn', label: 'Yarn', icon: 'Package', description: 'Reliable package manager with workspaces' },
  { value: 'bun', label: 'Bun', icon: 'Zap', description: 'All-in-one JavaScript runtime and package manager' },
]

// ── Step 8: Database & Backend ──────────────────────────────
export const DATABASE_OPTIONS: WebsiteOption[] = [
  { value: 'postgresql', label: 'PostgreSQL', icon: 'Database', description: 'Advanced open-source relational database' },
  { value: 'mysql', label: 'MySQL', icon: 'Database', description: 'Popular open-source relational database' },
  { value: 'mongodb', label: 'MongoDB', icon: 'Database', description: 'Document-oriented NoSQL database' },
  { value: 'sqlite', label: 'SQLite', icon: 'Database', description: 'Lightweight file-based relational database' },
  { value: 'supabase', label: 'Supabase', icon: 'Zap', description: 'Postgres with auth, storage, and real-time built in' },
  { value: 'firebase', label: 'Firebase', icon: 'Flame', description: 'Google NoSQL cloud database with real-time sync' },
  { value: 'planetscale', label: 'PlanetScale', icon: 'Globe', description: 'Serverless MySQL with branching and deploy requests' },
  { value: 'turso', label: 'Turso', icon: 'Zap', description: 'Edge-hosted SQLite with libSQL, ultra-low latency' },
  { value: 'none', label: 'None', icon: 'X', description: 'No database, static site or external API only' },
]

export const ORM_OPTIONS: WebsiteOption[] = [
  { value: 'prisma', label: 'Prisma', icon: 'Triangle', description: 'Type-safe ORM with auto-generated client and migrations' },
  { value: 'drizzle', label: 'Drizzle', icon: 'Droplets', description: 'Lightweight TypeScript ORM with SQL-like syntax' },
  { value: 'typeorm', label: 'TypeORM', icon: 'Database', description: 'Decorator-based ORM supporting multiple databases' },
  { value: 'mongoose', label: 'Mongoose', icon: 'Database', description: 'MongoDB object modeling for Node.js' },
  { value: 'none', label: 'None', icon: 'X', description: 'Direct database queries or no database' },
]

export const AUTH_PROVIDER_OPTIONS: WebsiteOption[] = [
  { value: 'supabase-auth', label: 'Supabase Auth', icon: 'Shield', description: 'Built-in auth with RLS and social providers' },
  { value: 'nextauth', label: 'NextAuth.js', icon: 'Lock', description: 'Flexible authentication for Next.js applications' },
  { value: 'clerk', label: 'Clerk', icon: 'User', description: 'Drop-in auth with user management UI components' },
  { value: 'auth0', label: 'Auth0', icon: 'Shield', description: 'Enterprise identity platform with SSO and MFA' },
  { value: 'firebase-auth', label: 'Firebase Auth', icon: 'Flame', description: 'Google authentication with multiple sign-in methods' },
  { value: 'lucia', label: 'Lucia', icon: 'Key', description: 'Lightweight auth library with session management' },
  { value: 'ldap', label: 'LDAP / Active Directory', icon: 'FolderTree', description: 'Enterprise directory service authentication (LDAP, Entra AD)' },
  { value: 'custom', label: 'Custom Auth', icon: 'Code2', description: 'Roll your own authentication system' },
  { value: 'none', label: 'None', icon: 'X', description: 'No authentication required' },
]

export const AUTH_METHOD_OPTIONS: WebsiteOption[] = [
  { value: 'email', label: 'Email & Password', icon: 'Mail', description: 'Traditional email and password login' },
  { value: 'google', label: 'Google', icon: 'Globe', description: 'Sign in with Google OAuth' },
  { value: 'github', label: 'GitHub', icon: 'Github', description: 'Sign in with GitHub OAuth' },
  { value: 'apple', label: 'Apple', icon: 'Apple', description: 'Sign in with Apple ID' },
  { value: 'microsoft', label: 'Microsoft', icon: 'Monitor', description: 'Sign in with Microsoft account' },
  { value: 'magic-link', label: 'Magic Link', icon: 'Wand2', description: 'Passwordless email link authentication' },
  { value: 'sms', label: 'SMS OTP', icon: 'Smartphone', description: 'Phone number verification via SMS code' },
  { value: 'ldap-bind', label: 'LDAP Bind', icon: 'FolderTree', description: 'Authenticate via LDAP directory bind' },
  { value: 'saml', label: 'SAML SSO', icon: 'Shield', description: 'Enterprise single sign-on via SAML 2.0' },
]

export const STORAGE_OPTIONS: WebsiteOption[] = [
  { value: 'supabase-storage', label: 'Supabase Storage', icon: 'HardDrive', description: 'S3-compatible storage with RLS policies' },
  { value: 's3', label: 'AWS S3', icon: 'Cloud', description: 'Scalable object storage by Amazon' },
  { value: 'cloudinary', label: 'Cloudinary', icon: 'Image', description: 'Media management with transformations and CDN' },
  { value: 'uploadthing', label: 'UploadThing', icon: 'Upload', description: 'Simple file uploads for TypeScript apps' },
  { value: 'none', label: 'None', icon: 'X', description: 'No file storage needed' },
]

export const API_STYLE_OPTIONS: WebsiteOption[] = [
  { value: 'rest', label: 'REST', icon: 'ArrowLeftRight', description: 'RESTful API with standard HTTP methods' },
  { value: 'graphql', label: 'GraphQL', icon: 'CircleDot', description: 'Query language for flexible data fetching' },
  { value: 'trpc', label: 'tRPC', icon: 'Zap', description: 'End-to-end type-safe APIs without code generation' },
  { value: 'server-actions', label: 'Server Actions', icon: 'Server', description: 'React Server Actions for direct server mutations' },
]

// ── Step 9: Integrations & APIs ─────────────────────────────
export const EMAIL_PROVIDER_OPTIONS: WebsiteOption[] = [
  { value: 'resend', label: 'Resend', icon: 'Mail', description: 'Modern email API built for developers' },
  { value: 'sendgrid', label: 'SendGrid', icon: 'Send', description: 'Scalable email delivery by Twilio' },
  { value: 'postmark', label: 'Postmark', icon: 'Mail', description: 'Fast transactional email with high deliverability' },
  { value: 'ses', label: 'Amazon SES', icon: 'Cloud', description: 'Cost-effective bulk and transactional email' },
  { value: 'none', label: 'None', icon: 'X', description: 'No email sending capability' },
]

export const ANALYTICS_OPTIONS: WebsiteOption[] = [
  { value: 'google-analytics', label: 'Google Analytics', icon: 'BarChart3', description: 'Industry-standard web analytics by Google' },
  { value: 'plausible', label: 'Plausible', icon: 'BarChart3', description: 'Privacy-friendly, lightweight analytics' },
  { value: 'umami', label: 'Umami', icon: 'BarChart3', description: 'Open-source, self-hostable web analytics' },
  { value: 'posthog', label: 'PostHog', icon: 'Activity', description: 'Product analytics with feature flags and session replay' },
  { value: 'mixpanel', label: 'Mixpanel', icon: 'PieChart', description: 'Event-based product analytics with funnels' },
  { value: 'none', label: 'None', icon: 'X', description: 'No analytics tracking' },
]

export const MONITORING_OPTIONS: WebsiteOption[] = [
  { value: 'sentry', label: 'Sentry', icon: 'Bug', description: 'Error tracking and performance monitoring' },
  { value: 'datadog', label: 'Datadog', icon: 'Activity', description: 'Full-stack observability and APM' },
  { value: 'logrocket', label: 'LogRocket', icon: 'Video', description: 'Session replay with error tracking' },
  { value: 'none', label: 'None', icon: 'X', description: 'No monitoring or error tracking' },
]

export const CRM_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No CRM integration' },
  { value: 'hubspot', label: 'HubSpot', icon: 'Users', description: 'All-in-one CRM with marketing and sales tools' },
  { value: 'salesforce', label: 'Salesforce', icon: 'Cloud', description: 'Enterprise CRM platform with extensive ecosystem' },
  { value: 'pipedrive', label: 'Pipedrive', icon: 'Filter', description: 'Sales-focused CRM with pipeline management' },
]

export const MARKETING_OPTIONS: WebsiteOption[] = [
  { value: 'mailchimp', label: 'Mailchimp', icon: 'Mail', description: 'Email marketing and audience management' },
  { value: 'convertkit', label: 'ConvertKit', icon: 'Send', description: 'Creator-focused email marketing platform' },
  { value: 'lemonsqueezy', label: 'Lemon Squeezy', icon: 'Citrus', description: 'Digital product sales with built-in marketing' },
  { value: 'none', label: 'None', icon: 'X', description: 'No marketing tool integration' },
]

export const CHAT_WIDGET_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No live chat or support widget' },
  { value: 'intercom', label: 'Intercom', icon: 'MessageSquare', description: 'Customer messaging platform with bots and inbox' },
  { value: 'crisp', label: 'Crisp', icon: 'MessageCircle', description: 'All-in-one messaging with live chat and chatbot' },
  { value: 'tawk', label: 'Tawk.to', icon: 'MessageSquare', description: 'Free live chat with monitoring and ticketing' },
  { value: 'zendesk', label: 'Zendesk', icon: 'Headphones', description: 'Enterprise support suite with chat and help center' },
]

// ── Step 10: Products & Catalog ─────────────────────────────
export const PRODUCT_TYPE_OPTIONS: WebsiteOption[] = [
  { value: 'physical', label: 'Physical', icon: 'Package', description: 'Tangible goods that require shipping' },
  { value: 'digital', label: 'Digital', icon: 'FileDown', description: 'Downloadable files, software, or media' },
  { value: 'subscription', label: 'Subscription', icon: 'RefreshCw', description: 'Recurring access to services or content' },
  { value: 'service', label: 'Service', icon: 'Wrench', description: 'Professional services or consulting' },
  { value: 'mixed', label: 'Mixed', icon: 'Layers', description: 'Combination of physical, digital, and services' },
]

export const CATALOG_SIZE_OPTIONS: WebsiteOption[] = [
  { value: 'small', label: 'Small (1-50)', icon: 'Package', description: 'Curated catalog with a few dozen products' },
  { value: 'medium', label: 'Medium (50-500)', icon: 'Boxes', description: 'Growing catalog with hundreds of products' },
  { value: 'large', label: 'Large (500-5000)', icon: 'Warehouse', description: 'Extensive inventory with thousands of products' },
  { value: 'enterprise', label: 'Enterprise (5000+)', icon: 'Building2', description: 'Massive catalog requiring advanced search and filtering' },
]

// ── Step 11: Payments & Checkout ────────────────────────────
export const PAYMENT_PROCESSOR_OPTIONS: WebsiteOption[] = [
  { value: 'stripe', label: 'Stripe', icon: 'CreditCard', description: 'Full-featured payment platform with subscriptions' },
  { value: 'paypal', label: 'PayPal', icon: 'Wallet', description: 'Widely recognized online payment system' },
  { value: 'square', label: 'Square', icon: 'Square', description: 'Payment processing for online and in-person sales' },
  { value: 'mollie', label: 'Mollie', icon: 'Euro', description: 'European payment provider with local methods' },
  { value: 'adyen', label: 'Adyen', icon: 'Globe', description: 'Global payment platform for enterprise commerce' },
  { value: 'lemonsqueezy', label: 'Lemon Squeezy', icon: 'Citrus', description: 'All-in-one platform for selling digital products' },
]

export const CHECKOUT_STYLE_OPTIONS: WebsiteOption[] = [
  { value: 'one-page', label: 'One Page', icon: 'FileText', description: 'All checkout steps on a single page' },
  { value: 'multi-step', label: 'Multi-Step', icon: 'ListOrdered', description: 'Guided checkout with separate steps' },
  { value: 'drawer', label: 'Drawer', icon: 'PanelRight', description: 'Slide-out cart and checkout panel' },
  { value: 'redirect', label: 'Redirect', icon: 'ExternalLink', description: 'Redirect to hosted checkout page (e.g., Stripe)' },
]

export const TAX_CALCULATION_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No automated tax calculation' },
  { value: 'manual', label: 'Manual', icon: 'Calculator', description: 'Manually configured tax rates per region' },
  { value: 'stripe-tax', label: 'Stripe Tax', icon: 'CreditCard', description: 'Automatic tax calculation via Stripe' },
  { value: 'taxjar', label: 'TaxJar', icon: 'Receipt', description: 'Automated sales tax compliance and reporting' },
]

// ── Step 12: Shipping & Fulfillment ─────────────────────────
export const SHIPPING_PROVIDER_OPTIONS: WebsiteOption[] = [
  { value: 'usps', label: 'USPS', icon: 'Mail', description: 'United States Postal Service' },
  { value: 'ups', label: 'UPS', icon: 'Truck', description: 'United Parcel Service worldwide shipping' },
  { value: 'fedex', label: 'FedEx', icon: 'Truck', description: 'Express and ground shipping worldwide' },
  { value: 'dhl', label: 'DHL', icon: 'Plane', description: 'International express shipping and logistics' },
  { value: 'custom-flat-rate', label: 'Flat Rate', icon: 'DollarSign', description: 'Fixed shipping cost regardless of order size' },
  { value: 'free-shipping', label: 'Free Shipping', icon: 'Gift', description: 'No shipping charge to customers' },
  { value: 'local-pickup', label: 'Local Pickup', icon: 'MapPin', description: 'Customer picks up order at a physical location' },
]

export const FULFILLMENT_OPTIONS: WebsiteOption[] = [
  { value: 'self', label: 'Self-Fulfilled', icon: 'Package', description: 'Pack and ship orders yourself' },
  { value: 'third-party', label: 'Third-Party (3PL)', icon: 'Warehouse', description: 'Outsource fulfillment to a logistics provider' },
  { value: 'dropship', label: 'Dropship', icon: 'Truck', description: 'Supplier ships directly to customer' },
  { value: 'print-on-demand', label: 'Print on Demand', icon: 'Printer', description: 'Products printed and shipped per order' },
]

// ── Step 13: SEO & Analytics ────────────────────────────────
export const SEO_STRATEGY_OPTIONS: WebsiteOption[] = [
  { value: 'basic', label: 'Basic', icon: 'Search', description: 'Meta tags, titles, and sitemap generation' },
  { value: 'advanced', label: 'Advanced', icon: 'TrendingUp', description: 'Structured data, schema markup, and content optimization' },
  { value: 'programmatic', label: 'Programmatic', icon: 'Code2', description: 'Auto-generated pages targeting long-tail keywords' },
]

export const STRUCTURED_DATA_OPTIONS: WebsiteOption[] = [
  { value: 'organization', label: 'Organization', icon: 'Building2', description: 'Company name, logo, and contact info' },
  { value: 'product', label: 'Product', icon: 'Package', description: 'Product details, pricing, and availability' },
  { value: 'article', label: 'Article', icon: 'FileText', description: 'Blog posts and news article metadata' },
  { value: 'faq', label: 'FAQ', icon: 'HelpCircle', description: 'Frequently asked questions for rich snippets' },
  { value: 'breadcrumb', label: 'Breadcrumb', icon: 'ChevronRight', description: 'Navigation breadcrumb trail in search results' },
  { value: 'local-business', label: 'Local Business', icon: 'MapPin', description: 'Physical location, hours, and reviews' },
]

export const PERFORMANCE_BUDGET_OPTIONS: WebsiteOption[] = [
  { value: 'relaxed', label: 'Relaxed', icon: 'Minus', description: 'No strict limits, prioritize features over speed' },
  { value: 'moderate', label: 'Moderate', icon: 'Gauge', description: 'LCP < 2.5s, CLS < 0.1, reasonable bundle sizes' },
  { value: 'strict', label: 'Strict', icon: 'Zap', description: 'LCP < 1.5s, CLS < 0.05, minimal JS bundles' },
]

// ── Step 14: Performance & Security ─────────────────────────
export const BACKUP_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No automated backups' },
  { value: 'daily', label: 'Daily', icon: 'Calendar', description: 'Automatic daily database and file backups' },
  { value: 'weekly', label: 'Weekly', icon: 'CalendarDays', description: 'Weekly full backups with daily incremental' },
  { value: 'continuous', label: 'Continuous', icon: 'RefreshCw', description: 'Point-in-time recovery with continuous replication' },
]

export const COMPLIANCE_OPTIONS: WebsiteOption[] = [
  { value: 'gdpr', label: 'GDPR', icon: 'Shield', description: 'EU General Data Protection Regulation compliance' },
  { value: 'ccpa', label: 'CCPA', icon: 'Shield', description: 'California Consumer Privacy Act compliance' },
  { value: 'pci-dss', label: 'PCI-DSS', icon: 'CreditCard', description: 'Payment Card Industry Data Security Standard' },
  { value: 'hipaa', label: 'HIPAA', icon: 'Heart', description: 'Health Insurance Portability and Accountability Act' },
  { value: 'soc2', label: 'SOC 2', icon: 'Lock', description: 'Service Organization Control 2 audit compliance' },
]

export const CDN_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No CDN, serve directly from origin' },
  { value: 'cloudflare', label: 'Cloudflare', icon: 'Shield', description: 'Global CDN with DDoS protection and edge workers' },
  { value: 'vercel-edge', label: 'Vercel Edge Network', icon: 'Globe', description: 'Built-in edge caching on Vercel deployments' },
  { value: 'fastly', label: 'Fastly', icon: 'Zap', description: 'Real-time CDN with edge computing via VCL' },
  { value: 'aws-cloudfront', label: 'AWS CloudFront', icon: 'Cloud', description: 'Amazon global content delivery network' },
]

export const CACHING_OPTIONS: WebsiteOption[] = [
  { value: 'none', label: 'None', icon: 'X', description: 'No explicit caching strategy' },
  { value: 'isr', label: 'ISR', icon: 'RefreshCw', description: 'Incremental Static Regeneration for stale-while-revalidate pages' },
  { value: 'swr', label: 'SWR', icon: 'RefreshCw', description: 'Client-side stale-while-revalidate data fetching' },
  { value: 'cdn-cache', label: 'CDN Cache', icon: 'Globe', description: 'Edge caching with cache-control headers' },
  { value: 'redis', label: 'Redis', icon: 'Database', description: 'In-memory data store for API and session caching' },
]

// ── Step 15: Hosting & Deployment ───────────────────────────
export const HOSTING_OPTIONS: WebsiteOption[] = [
  { value: 'vercel', label: 'Vercel', icon: 'Globe', description: 'Optimized for Next.js with edge functions and previews' },
  { value: 'netlify', label: 'Netlify', icon: 'Zap', description: 'JAMstack hosting with serverless functions' },
  { value: 'aws', label: 'AWS', icon: 'Cloud', description: 'Amazon Web Services with full infrastructure control' },
  { value: 'gcp', label: 'Google Cloud', icon: 'Server', description: 'Google Cloud Platform with Cloud Run and App Engine' },
  { value: 'azure', label: 'Azure', icon: 'Monitor', description: 'Microsoft cloud with Static Web Apps and App Service' },
  { value: 'railway', label: 'Railway', icon: 'Train', description: 'Simple deployment platform with instant provisioning' },
  { value: 'fly-io', label: 'Fly.io', icon: 'Plane', description: 'Edge hosting with global VM deployment' },
  { value: 'self-hosted', label: 'Self-Hosted', icon: 'HardDrive', description: 'Host on your own servers or VPS' },
  { value: 'cloudflare-pages', label: 'Cloudflare Pages', icon: 'Shield', description: 'JAMstack platform with edge functions and Workers' },
]

export const CI_OPTIONS: WebsiteOption[] = [
  { value: 'github-actions', label: 'GitHub Actions', icon: 'GitBranch', description: 'CI/CD workflows integrated with GitHub repos' },
  { value: 'gitlab-ci', label: 'GitLab CI', icon: 'GitBranch', description: 'Built-in CI/CD pipelines in GitLab' },
  { value: 'circleci', label: 'CircleCI', icon: 'Circle', description: 'Cloud-native CI/CD with parallelism and caching' },
  { value: 'vercel-auto', label: 'Vercel Auto', icon: 'Zap', description: 'Automatic deployments on push via Vercel' },
  { value: 'none', label: 'None', icon: 'X', description: 'Manual deployment with no CI/CD pipeline' },
]

export const ENVIRONMENT_OPTIONS: WebsiteOption[] = [
  { value: 'development', label: 'Development', icon: 'Code2', description: 'Local development environment' },
  { value: 'staging', label: 'Staging', icon: 'FlaskConical', description: 'Pre-production testing environment' },
  { value: 'production', label: 'Production', icon: 'Rocket', description: 'Live production environment' },
  { value: 'preview', label: 'Preview', icon: 'Eye', description: 'Per-branch preview deployments' },
]

export const REGION_OPTIONS: WebsiteOption[] = [
  { value: 'us-east', label: 'US East', icon: 'MapPin', description: 'US East Coast (Virginia, N. Carolina)' },
  { value: 'us-west', label: 'US West', icon: 'MapPin', description: 'US West Coast (California, Oregon)' },
  { value: 'eu-west', label: 'EU West', icon: 'MapPin', description: 'Western Europe (Ireland, London)' },
  { value: 'eu-central', label: 'EU Central', icon: 'MapPin', description: 'Central Europe (Frankfurt, Amsterdam)' },
  { value: 'ap-southeast', label: 'AP Southeast', icon: 'MapPin', description: 'Asia Pacific (Singapore, Sydney)' },
  { value: 'ap-northeast', label: 'AP Northeast', icon: 'MapPin', description: 'Asia Pacific (Tokyo, Seoul)' },
]

export const SCALING_OPTIONS: WebsiteOption[] = [
  { value: 'serverless', label: 'Serverless', icon: 'Cloud', description: 'Auto-scales to zero, pay per invocation' },
  { value: 'auto', label: 'Auto-Scaling', icon: 'TrendingUp', description: 'Automatically scales up and down based on traffic' },
  { value: 'fixed', label: 'Fixed', icon: 'Server', description: 'Fixed number of instances, manually adjusted' },
]

export const DISTRIBUTION_CHANNEL_OPTIONS: WebsiteOption[] = [
  { value: 'web-custom', label: 'Web (Custom Domain)', icon: 'Globe', description: 'Self-hosted web application on a custom domain' },
  { value: 'pwa', label: 'PWA', icon: 'Smartphone', description: 'Progressive Web App installable on devices' },
  { value: 'cdn-global', label: 'CDN (Global)', icon: 'Network', description: 'Distribute static assets via global CDN' },
  { value: 'docker-registry', label: 'Docker Registry', icon: 'Container', description: 'Publish as a Docker container image' },
  { value: 'app-store-ios', label: 'App Store (iOS)', icon: 'Smartphone', description: 'Apple App Store via PWA wrapper or native' },
  { value: 'google-play', label: 'Google Play', icon: 'Tablet', description: 'Android distribution via TWA or native wrapper' },
  { value: 'chrome-web-store', label: 'Chrome Web Store', icon: 'Chrome', description: 'Browser extension marketplace' },
  { value: 'npm', label: 'npm', icon: 'Package', description: 'Publish as an npm package' },
  { value: 'github-pages', label: 'GitHub Pages', icon: 'GitBranch', description: 'Free static site hosting on GitHub' },
  { value: 'lan-server', label: 'LAN Server', icon: 'Network', description: 'Deploy to a local area network server' },
  { value: 'local-docker', label: 'Local Docker', icon: 'Container', description: 'Run as a Docker container on local infrastructure' },
  { value: 'usb-portable', label: 'USB / Portable', icon: 'Usb', description: 'Package for offline USB or portable distribution' },
  { value: 'network-share', label: 'Network Share', icon: 'FolderSync', description: 'Deploy via network file share (SMB/NFS)' },
  { value: 'intranet', label: 'Intranet Portal', icon: 'Building2', description: 'Deploy to an internal company intranet' },
]

// ── Step 16: AI & Notes ─────────────────────────────────────
export const AI_FEATURE_OPTIONS: WebsiteOption[] = [
  { value: 'chatbot', label: 'Chatbot', icon: 'MessageSquare', description: 'AI-powered conversational assistant on the site' },
  { value: 'content-generation', label: 'Content Generation', icon: 'PenLine', description: 'AI-generated blog posts, descriptions, and copy' },
  { value: 'image-generation', label: 'Image Generation', icon: 'ImagePlus', description: 'AI-created images, thumbnails, and graphics' },
  { value: 'search', label: 'AI Search', icon: 'Search', description: 'Semantic search with natural language queries' },
  { value: 'recommendations', label: 'Recommendations', icon: 'Sparkles', description: 'Personalized content or product suggestions' },
  { value: 'translation', label: 'Translation', icon: 'Languages', description: 'AI-powered multi-language content translation' },
]

export const AI_PROVIDER_OPTIONS: WebsiteOption[] = [
  { value: 'openai', label: 'OpenAI', icon: 'Bot', description: 'GPT models for text and DALL-E for images' },
  { value: 'anthropic', label: 'Anthropic', icon: 'Brain', description: 'Claude models for safe, capable AI assistance' },
  { value: 'google', label: 'Google AI', icon: 'Sparkles', description: 'Gemini models for multimodal AI features' },
  { value: 'local', label: 'Local / Self-Hosted', icon: 'HardDrive', description: 'Run open-source models locally (Ollama, vLLM)' },
  { value: 'none', label: 'None', icon: 'X', description: 'No AI provider integration' },
]

// ── Step 17: Business Modules (conditional: business-service) ──
export const BUSINESS_MODULE_OPTIONS: WebsiteOption[] = [
  { value: 'admin-area', label: 'Admin Area', icon: 'Settings', description: 'User management, groups, templates, and audit log' },
  { value: 'form-builder', label: 'Form Builder', icon: 'FileText', description: 'Drag-and-drop form creation with templates and AI' },
  { value: 'signature-builder', label: 'Signature Builder', icon: 'PenLine', description: 'Corporate email signature generator with live preview' },
  { value: 'travel-expenses', label: 'Travel Expenses', icon: 'Plane', description: 'Expense submission with receipt upload and approval workflow' },
  { value: 'employee-budget', label: 'Employee Budget', icon: 'Wallet', description: 'Personal budget tracking with receipt AI and manager approval' },
  { value: 'sick-leave', label: 'Sick Leave', icon: 'Heart', description: 'Sick leave reporting with team notifications and calendar sync' },
]

export const ADMIN_FEATURE_OPTIONS: WebsiteOption[] = [
  { value: 'user-management', label: 'User Management', icon: 'Users', description: 'Create, edit, and deactivate user accounts' },
  { value: 'group-management', label: 'Group Management', icon: 'UsersRound', description: 'Organize users into departments and teams' },
  { value: 'template-management', label: 'Template Management', icon: 'LayoutTemplate', description: 'Manage form and email templates' },
  { value: 'content-management', label: 'Content Management', icon: 'FileEdit', description: 'Edit intranet pages and announcements' },
  { value: 'role-management', label: 'Role Management', icon: 'Shield', description: 'Define roles and permission sets' },
  { value: 'audit-log', label: 'Audit Log', icon: 'ScrollText', description: 'Track all administrative actions and changes' },
]

export const DIRECTORY_PROVIDER_OPTIONS: WebsiteOption[] = [
  { value: 'ldap-selfhosted', label: 'LDAP (Self-Hosted)', icon: 'Server', description: 'Self-hosted OpenLDAP or Samba AD' },
  { value: 'entra-id', label: 'Entra ID', icon: 'Cloud', description: 'Microsoft Entra ID (formerly Azure AD)' },
  { value: 'azure-ad', label: 'Azure AD (Legacy)', icon: 'Monitor', description: 'Legacy Azure Active Directory connector' },
  { value: 'okta', label: 'Okta', icon: 'Shield', description: 'Okta Universal Directory and SSO' },
  { value: 'none', label: 'None', icon: 'X', description: 'No directory integration — manual user management' },
]

export const DIRECTORY_SYNC_FIELD_OPTIONS: WebsiteOption[] = [
  { value: 'name', label: 'Display Name', icon: 'User', description: 'Full name from directory' },
  { value: 'email', label: 'Email', icon: 'Mail', description: 'Corporate email address' },
  { value: 'profession', label: 'Job Title', icon: 'Briefcase', description: 'Job title or profession' },
  { value: 'department', label: 'Department', icon: 'Building2', description: 'Department or business unit' },
  { value: 'phone', label: 'Phone', icon: 'Phone', description: 'Business phone number' },
  { value: 'avatar', label: 'Avatar', icon: 'Image', description: 'Profile photo from directory' },
]

export const FORM_BUILDER_FEATURE_OPTIONS: WebsiteOption[] = [
  { value: 'layout-templates', label: 'Layout Templates', icon: 'LayoutTemplate', description: 'Pre-built form layouts for common use cases' },
  { value: 'text-templates', label: 'Text Templates', icon: 'FileText', description: 'Reusable text blocks and field presets' },
  { value: 'ai-generation', label: 'AI Generation', icon: 'Sparkles', description: 'Generate form fields from natural language' },
  { value: 'drag-drop-editor', label: 'Drag & Drop Editor', icon: 'GripVertical', description: 'Visual form builder with drag-and-drop fields' },
  { value: 'conditional-fields', label: 'Conditional Fields', icon: 'GitBranch', description: 'Show/hide fields based on other answers' },
]

export const SIGNATURE_LAYOUT_OPTIONS: WebsiteOption[] = [
  { value: 'classic', label: 'Classic', icon: 'AlignLeft', description: 'Traditional multi-line signature with logo and contact info' },
  { value: 'simplified', label: 'Simplified', icon: 'Minus', description: 'Compact single-line signature for minimal branding' },
]

export const SIGNATURE_FEATURE_OPTIONS: WebsiteOption[] = [
  { value: 'live-preview', label: 'Live Preview', icon: 'Eye', description: 'Real-time preview as you configure the signature' },
  { value: 'copy-paste', label: 'Copy & Paste', icon: 'Clipboard', description: 'One-click copy for pasting into email clients' },
  { value: 'export-formatted', label: 'Export Formatted', icon: 'Download', description: 'Export as HTML for direct email insertion' },
  { value: 'ad-auto-insert', label: 'AD Auto-Insert', icon: 'RefreshCw', description: 'Auto-fill signature fields from Active Directory' },
]

export const EXPENSE_FEATURE_OPTIONS: WebsiteOption[] = [
  { value: 'receipt-upload', label: 'Receipt Upload', icon: 'Upload', description: 'Upload photos or scans of receipts' },
  { value: 'ai-auto-fill', label: 'AI Auto-Fill', icon: 'Sparkles', description: 'Extract amount, date, and vendor from receipts via AI' },
  { value: 'multi-currency', label: 'Multi-Currency', icon: 'DollarSign', description: 'Support multiple currencies with auto-conversion' },
  { value: 'approval-workflow', label: 'Approval Workflow', icon: 'CheckCircle', description: 'Manager and finance approval chain' },
  { value: 'export-csv', label: 'Export CSV', icon: 'FileSpreadsheet', description: 'Export expense reports as CSV for accounting' },
]

export const SICK_LEAVE_FEATURE_OPTIONS: WebsiteOption[] = [
  { value: 'period-selection', label: 'Period Selection', icon: 'Calendar', description: 'Select start/end dates with half-day support' },
  { value: 'team-notification', label: 'Team Notification', icon: 'Bell', description: 'Notify direct manager and team automatically' },
  { value: 'channel-message', label: 'Channel Message', icon: 'MessageSquare', description: 'Post absence to Teams/Slack channel' },
  { value: 'calendar-sync', label: 'Calendar Sync', icon: 'CalendarDays', description: 'Sync absence to shared calendar' },
  { value: 'manager-approval', label: 'Manager Approval', icon: 'UserCheck', description: 'Optional approval step for extended leave' },
]

// ── Step 18: Directory & Messaging (conditional: business-service) ──
export const COMMUNICATION_CHANNEL_OPTIONS: WebsiteOption[] = [
  { value: 'teams', label: 'Microsoft Teams', icon: 'MessageSquare', description: 'Send notifications via Microsoft Teams' },
  { value: 'slack', label: 'Slack', icon: 'Hash', description: 'Send notifications via Slack channels' },
  { value: 'email', label: 'Email', icon: 'Mail', description: 'Send notifications via email' },
  { value: 'webhook', label: 'Webhook', icon: 'Globe', description: 'Send notifications via custom webhook' },
  { value: 'none', label: 'None', icon: 'X', description: 'No automated messaging' },
]
