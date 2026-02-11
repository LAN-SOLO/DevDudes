'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import {
  workflowConfigV2Schema,
  isV1WorkflowConfig,
  migrateWorkflowV1toV2,
} from '@/lib/validations/workflow'
import type { WorkflowConfigV2 } from '@/lib/workflow-pipeline/types'
import { presetConfigV2Schema, isV1Config, migrateV1toV2 } from '@/lib/validations/preset'
import type { PresetConfigV2 } from '@/lib/preset-pipeline/types'

export type PresetConfig = PresetConfigV2

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

export async function savePresetConfig(projectId: string | null, rawConfig: PresetConfigV2 | Record<string, unknown>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', projectId: null }
  }

  // Auto-migrate v1 configs
  let config: PresetConfigV2
  if (isV1Config(rawConfig as Record<string, unknown>)) {
    config = migrateV1toV2(rawConfig as Record<string, string>)
  } else {
    const result = presetConfigV2Schema.safeParse(rawConfig)
    if (!result.success) {
      return { error: result.error.issues[0]?.message || 'Invalid configuration', projectId: null }
    }
    config = result.data as PresetConfigV2
  }

  const presetData = { type: 'preset', version: '2.0.0', ...config } as unknown as Record<string, unknown>
  const name = config.meta.businessName || 'Untitled Project'
  const description = config.meta.description || ''
  const appType = config.app.appType || 'custom'

  // If no project ID, create a new project
  if (!projectId) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name,
        description,
        app_type: appType,
        status: 'configuring',
        preset_config: presetData,
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
      name,
      description,
      app_type: appType,
      status: 'configuring',
      preset_config: presetData,
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

// Workflow configuration save
export async function saveWorkflowConfig(projectId: string | null, rawConfig: WorkflowConfigV2 | Record<string, unknown>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', projectId: null }
  }

  // Auto-migrate v1 configs
  let config: WorkflowConfigV2
  if (isV1WorkflowConfig(rawConfig as Record<string, unknown>)) {
    config = migrateWorkflowV1toV2(rawConfig as Record<string, unknown>)
  } else {
    const result = workflowConfigV2Schema.safeParse(rawConfig)
    if (!result.success) {
      return { error: result.error.issues[0]?.message || 'Invalid configuration', projectId: null }
    }
    config = result.data as WorkflowConfigV2
  }

  const workflowData = { type: 'workflow', version: '2.0.0', ...config } as unknown as Record<string, unknown>
  const workflowName = config.meta.name || config.steps[0]?.title || 'Untitled Workflow'
  const workflowDescription = config.meta.description || config.steps.map((s) => s.title).join(' -> ')

  // If no project ID, create a new project
  if (!projectId) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: workflowName,
        description: workflowDescription,
        app_type: 'workflow',
        status: 'configuring',
        preset_config: workflowData,
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
      name: workflowName,
      description: workflowDescription,
      app_type: 'workflow',
      status: 'configuring',
      preset_config: workflowData,
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
