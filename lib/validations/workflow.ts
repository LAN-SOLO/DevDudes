import { z } from 'zod'

// Template attached to a workflow step
export const workflowTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['document', 'spreadsheet', 'image', 'code', 'other']),
  size: z.number().optional(),
  url: z.string().url().optional(),
})

// Link attached to a workflow step
export const workflowLinkSchema = z.object({
  id: z.string(),
  label: z.string().min(1),
  url: z.string().url(),
  type: z.enum(['reference', 'documentation', 'api', 'external', 'internal']),
})

// Service/API connected to a workflow step
export const workflowServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  type: z.enum(['rest', 'graphql', 'webhook', 'database', 'queue', 'storage']),
  endpoint: z.string().optional(),
  authType: z.enum(['none', 'api-key', 'oauth', 'bearer', 'basic']),
})

// Individual workflow step
export const workflowStepSchema = z.object({
  id: z.string(),
  order: z.number().int().min(0),
  title: z.string().min(1, 'Step title is required'),
  description: z.string(),
  templates: z.array(workflowTemplateSchema).default([]),
  links: z.array(workflowLinkSchema).default([]),
  services: z.array(workflowServiceSchema).default([]),
  isExpanded: z.boolean().default(true),
})

// AI integration configuration
export const aiIntegrationSchema = z.object({
  provider: z.enum(['n8n', 'openai', 'claude', 'mistral', 'deepseek']),
  enabled: z.boolean().default(false),
  mode: z.enum(['local', 'service', 'both']).default('service'),
  config: z.object({
    endpoint: z.string().optional(),
    model: z.string().optional(),
  }).default({}),
})

// Full workflow configuration
export const workflowConfigSchema = z.object({
  // Step 1: Workflow steps
  steps: z.array(workflowStepSchema).min(1, 'At least one workflow step is required'),

  // Step 2: Features
  features: z.array(z.string()).default([]),
  customFeatures: z.string().default(''),

  // Step 3: Authentication
  authEnabled: z.boolean().default(false),
  authMethods: z.array(z.string()).default([]),
  roles: z.array(z.string()).default([]),

  // Step 4: UI Preferences
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  primaryColor: z.string().default('#0ea5e9'),
  layout: z.enum(['sidebar', 'topnav', 'minimal']).default('sidebar'),

  // Step 5: AI Integrations
  aiIntegrations: z.array(aiIntegrationSchema).default([]),

  // Step 6: Deployment
  deployTarget: z.string().default(''),
  region: z.string().default(''),
})

// Type exports
export type WorkflowTemplate = z.infer<typeof workflowTemplateSchema>
export type WorkflowLink = z.infer<typeof workflowLinkSchema>
export type WorkflowService = z.infer<typeof workflowServiceSchema>
export type WorkflowStep = z.infer<typeof workflowStepSchema>
export type AIIntegration = z.infer<typeof aiIntegrationSchema>
export type WorkflowConfig = z.infer<typeof workflowConfigSchema>

// Default configuration
export const defaultWorkflowConfig: WorkflowConfig = {
  steps: [],
  features: [],
  customFeatures: '',
  authEnabled: false,
  authMethods: [],
  roles: [],
  theme: 'system',
  primaryColor: '#0ea5e9',
  layout: 'sidebar',
  aiIntegrations: [
    { provider: 'n8n', enabled: false, mode: 'service', config: {} },
    { provider: 'openai', enabled: false, mode: 'service', config: {} },
    { provider: 'claude', enabled: false, mode: 'service', config: {} },
    { provider: 'mistral', enabled: false, mode: 'service', config: {} },
    { provider: 'deepseek', enabled: false, mode: 'service', config: {} },
  ],
  deployTarget: '',
  region: '',
}

// Helper to generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

// Helper to create a new empty step
export function createEmptyStep(order: number): WorkflowStep {
  return {
    id: generateId(),
    order,
    title: '',
    description: '',
    templates: [],
    links: [],
    services: [],
    isExpanded: true,
  }
}
