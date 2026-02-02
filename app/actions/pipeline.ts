'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Preset configuration schema
const presetConfigSchema = z.object({
  businessName: z.string().min(1),
  industry: z.string(),
  description: z.string(),
  appType: z.string(),
  targetUsers: z.array(z.string()),
  features: z.array(z.string()),
  customFeatures: z.string(),
  entities: z.array(z.object({
    name: z.string(),
    fields: z.array(z.object({
      name: z.string(),
      type: z.string(),
      required: z.boolean(),
    })),
  })),
  authMethods: z.array(z.string()),
  roles: z.array(z.string()),
  theme: z.enum(['light', 'dark', 'system']),
  primaryColor: z.string(),
  layout: z.enum(['sidebar', 'topnav', 'minimal']),
  integrations: z.array(z.string()),
  deployTarget: z.string(),
  region: z.string(),
})

export type PresetConfig = z.infer<typeof presetConfigSchema>

// Generated concept structure
export interface GeneratedConcept {
  summary: string
  architecture: {
    frontend: string[]
    backend: string[]
    database: string[]
  }
  pages: Array<{
    name: string
    route: string
    components: string[]
    description: string
  }>
  apiEndpoints: Array<{
    method: string
    path: string
    description: string
  }>
  dataModels: Array<{
    name: string
    fields: Array<{
      name: string
      type: string
      required: boolean
      relation?: string
    }>
  }>
  implementationSteps: string[]
  estimatedComplexity: 'simple' | 'moderate' | 'complex'
}

export async function savePresetConfig(projectId: string | null, config: PresetConfig) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', projectId: null }
  }

  const result = presetConfigSchema.safeParse(config)
  if (!result.success) {
    return { error: result.error.issues[0]?.message || 'Invalid configuration', projectId: null }
  }

  // If no project ID, create a new project
  if (!projectId) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: config.businessName,
        description: config.description,
        app_type: config.appType,
        status: 'configuring',
        preset_config: config as unknown as Record<string, unknown>,
      })
      .select()
      .single()

    if (error) {
      return { error: error.message, projectId: null }
    }

    revalidatePath('/dashboard/projects')
    revalidatePath('/dashboard/pipeline')
    return { error: null, projectId: data.id }
  }

  // Update existing project
  const { error } = await supabase
    .from('projects')
    .update({
      name: config.businessName,
      description: config.description,
      app_type: config.appType,
      status: 'configuring',
      preset_config: config as unknown as Record<string, unknown>,
    })
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message, projectId: null }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath(`/dashboard/projects/${projectId}`)
  revalidatePath('/dashboard/pipeline')
  return { error: null, projectId }
}

export async function getProjectConfig(projectId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', data: null }
  }

  const { data, error } = await supabase
    .from('projects')
    .select('id, name, status, preset_config, generated_concept')
    .eq('id', projectId)
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  return { error: null, data }
}

export async function getCurrentProject() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', data: null }
  }

  // Get the most recent project that's in configuring or generating state
  const { data, error } = await supabase
    .from('projects')
    .select('id, name, status, preset_config, generated_concept')
    .in('status', ['configuring', 'generating'])
    .order('updated_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    return { error: error.message, data: null }
  }

  return { error: null, data: data || null }
}

export async function saveGeneratedConcept(projectId: string, concept: GeneratedConcept) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Basic structure validation
  if (!concept?.summary || !concept?.architecture || !concept?.pages || !concept?.implementationSteps || !concept?.estimatedComplexity) {
    return { error: 'Invalid concept structure' }
  }

  const { error } = await supabase
    .from('projects')
    .update({
      status: 'generating',
      generated_concept: concept as unknown as Record<string, unknown>,
    })
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath(`/dashboard/projects/${projectId}`)
  revalidatePath('/dashboard/pipeline')
  return { error: null }
}

const validStatuses = ['draft', 'configuring', 'generating', 'ready', 'deployed', 'archived'] as const

export async function updateProjectStatus(projectId: string, status: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  if (!validStatuses.includes(status as typeof validStatuses[number])) {
    return { error: 'Invalid status' }
  }

  const { error } = await supabase
    .from('projects')
    .update({ status })
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath(`/dashboard/projects/${projectId}`)
  revalidatePath('/dashboard/pipeline')
  return { error: null }
}
