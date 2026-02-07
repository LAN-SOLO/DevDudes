'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { gamePresetConfigSchema } from '@/lib/validations/game'
import type { GamePresetConfig } from '@/lib/game-pipeline/types'

/** Recursively fix plain objects with numeric keys back into arrays */
function fixArrays(obj: unknown): unknown {
  if (obj === null || obj === undefined || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(fixArrays)
  const record = obj as Record<string, unknown>
  const keys = Object.keys(record)
  // Detect object-as-array: all keys are sequential numeric strings
  if (keys.length > 0 && keys.every((k, i) => k === String(i))) {
    return keys.map((k) => fixArrays(record[k]))
  }
  const result: Record<string, unknown> = {}
  for (const key of keys) {
    result[key] = fixArrays(record[key])
  }
  return result
}

export async function saveGamePresetConfig(
  projectId: string | null,
  config: GamePresetConfig
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', projectId: null }
  }

  // Re-parse through JSON and fix any arrays that were serialized as objects
  // (e.g., {0: "a", 1: "b"} → ["a", "b"]) across the server action boundary
  const sanitized = fixArrays(JSON.parse(JSON.stringify(config)))
  const result = gamePresetConfigSchema.safeParse(sanitized)
  if (!result.success) {
    const issue = result.error.issues[0]
    const path = issue?.path?.join('.') || 'unknown'
    return {
      error: `${issue?.message || 'Invalid configuration'} (field: ${path})`,
      projectId: null,
    }
  }

  const validated = result.data
  const gameName = validated.themes[0]
    ? `${validated.themes[0].charAt(0).toUpperCase() + validated.themes[0].slice(1)} Game`
    : 'Untitled Game'
  const gameDescription = [
    validated.genres.join(', '),
    validated.dimension,
    validated.engine,
  ]
    .filter(Boolean)
    .join(' | ')

  const presetConfig = { type: 'game', ...validated } as unknown as Record<string, unknown>

  if (!projectId) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: gameName,
        description: gameDescription || 'Game project',
        app_type: 'game',
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
      name: gameName,
      description: gameDescription || 'Game project',
      app_type: 'game',
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
