import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Rate limiting: track requests per user
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10 // requests per window
const RATE_WINDOW = 60 * 60 * 1000 // 1 hour

function checkRateLimit(userId: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(userId)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// Sanitize user input to prevent prompt injection
function sanitize(str: string, maxLen = 500): string {
  return String(str || '').slice(0, maxLen).replace(/[<>]/g, '')
}

const configSchema = z.object({
  businessName: z.string().min(1).max(200),
  industry: z.string().max(200),
  description: z.string().max(2000),
  appType: z.string().max(100),
  targetUsers: z.array(z.string().max(100)).max(20),
  features: z.array(z.string().max(100)).max(50),
  customFeatures: z.string().max(1000),
  entities: z.array(z.object({
    name: z.string().max(100),
    fields: z.array(z.object({
      name: z.string().max(100),
      type: z.string().max(50),
      required: z.boolean(),
    })).max(50),
  })).max(20),
  authMethods: z.array(z.string().max(50)).max(10),
  roles: z.array(z.string().max(50)).max(10),
  theme: z.enum(['light', 'dark', 'system']),
  primaryColor: z.string().max(20),
  layout: z.enum(['sidebar', 'topnav', 'minimal']),
  integrations: z.array(z.string().max(100)).max(20),
  deployTarget: z.string().max(100),
  region: z.string().max(100),
})

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Anthropic API key not configured' }, { status: 500 })
  }

  // Verify authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Rate limit
  if (!checkRateLimit(user.id)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 })
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const parsed = configSchema.safeParse(rawBody)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid configuration' }, { status: 400 })
  }

  const config = parsed.data
  const anthropic = new Anthropic()

  const prompt = `You are an expert software architect. Based on the following application configuration, generate a complete app concept as JSON.

## Application Configuration

- **Business Name:** ${sanitize(config.businessName)}
- **Industry:** ${sanitize(config.industry)}
- **Description:** ${sanitize(config.description, 2000)}
- **App Type:** ${sanitize(config.appType)}
- **Target Users:** ${config.targetUsers.map(u => sanitize(u, 100)).join(', ')}
- **Features:** ${config.features.map(f => sanitize(f, 100)).join(', ')}
${config.customFeatures ? `- **Custom Features:** ${sanitize(config.customFeatures, 1000)}` : ''}
- **Data Entities:**
${config.entities.map(e => `  - ${sanitize(e.name, 100)}: ${e.fields.map(f => `${sanitize(f.name, 100)} (${sanitize(f.type, 50)}${f.required ? ', required' : ''})`).join(', ')}`).join('\n')}
- **Auth Methods:** ${config.authMethods.map(m => sanitize(m, 50)).join(', ')}
- **User Roles:** ${config.roles.map(r => sanitize(r, 50)).join(', ')}
- **Theme:** ${config.theme}
- **Primary Color:** ${sanitize(config.primaryColor, 20)}
- **Layout:** ${config.layout}
- **Integrations:** ${config.integrations.map(i => sanitize(i, 100)).join(', ')}
- **Deploy Target:** ${sanitize(config.deployTarget)}
- **Region:** ${sanitize(config.region)}

## Required Output

Return ONLY valid JSON (no markdown, no code fences) matching this exact structure:

{
  "summary": "A 2-3 sentence description of the application and its purpose",
  "architecture": {
    "frontend": ["array of frontend technology choices and patterns"],
    "backend": ["array of backend technology choices and patterns"],
    "database": ["array of database design decisions"]
  },
  "pages": [
    {
      "name": "Page Name",
      "route": "/route/path",
      "components": ["ComponentName1", "ComponentName2"],
      "description": "What this page does"
    }
  ],
  "apiEndpoints": [
    {
      "method": "GET|POST|PUT|DELETE",
      "path": "/api/path",
      "description": "What this endpoint does"
    }
  ],
  "dataModels": [
    {
      "name": "ModelName",
      "fields": [
        { "name": "field_name", "type": "type", "required": true, "relation": "optional_relation" }
      ]
    }
  ],
  "implementationSteps": ["Step 1", "Step 2", "..."],
  "estimatedComplexity": "simple|moderate|complex"
}

Be thorough and creative. Design a professional, production-ready architecture. Include all CRUD pages for each entity, authentication pages if auth is enabled, a dashboard page, and any pages implied by the selected features. Always include id, user_id, created_at, and updated_at fields in data models.`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })

    const textBlock = message.content.find(block => block.type === 'text')
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
    }

    const concept = JSON.parse(textBlock.text)

    // Basic shape validation
    if (!concept.summary || !concept.architecture || !concept.pages || !concept.apiEndpoints || !concept.dataModels || !concept.implementationSteps || !concept.estimatedComplexity) {
      return NextResponse.json({ error: 'Invalid AI response structure' }, { status: 500 })
    }

    return NextResponse.json(concept)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI generation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
