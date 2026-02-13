'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { websiteConfigSchema } from '@/lib/validations/website'
import type { WebsiteConfig } from '@/lib/website-pipeline/types'

/** Recursively fix plain objects with numeric keys back into arrays */
function fixArrays(obj: unknown): unknown {
  if (obj === null || obj === undefined || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(fixArrays)
  const record = obj as Record<string, unknown>
  const keys = Object.keys(record)
  if (keys.length > 0 && keys.every((k, i) => k === String(i))) {
    return keys.map((k) => fixArrays(record[k]))
  }
  const result: Record<string, unknown> = {}
  for (const key of keys) {
    result[key] = fixArrays(record[key])
  }
  return result
}

export async function saveWebsiteConfig(
  projectId: string | null,
  config: WebsiteConfig
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', projectId: null }
  }

  const sanitized = fixArrays(JSON.parse(JSON.stringify(config)))
  const result = websiteConfigSchema.safeParse(sanitized)
  if (!result.success) {
    const issue = result.error.issues[0]
    const path = issue?.path?.join('.') || 'unknown'
    return {
      error: `${issue?.message || 'Invalid configuration'} (field: ${path})`,
      projectId: null,
    }
  }

  const validated = result.data
  const websiteName = validated.siteName || 'Untitled Website'
  const websiteDescription = [
    validated.websiteTypes.join(', '),
    validated.framework,
    validated.hosting,
  ]
    .filter(Boolean)
    .join(' | ')

  const presetConfig = { type: 'website', ...validated } as unknown as Record<string, unknown>

  if (!projectId) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: websiteName,
        description: websiteDescription || 'Website project',
        app_type: 'website',
        status: 'configuring',
        preset_config: presetConfig,
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

  const { error } = await supabase
    .from('projects')
    .update({
      name: websiteName,
      description: websiteDescription || 'Website project',
      app_type: 'website',
      status: 'configuring',
      preset_config: presetConfig,
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
