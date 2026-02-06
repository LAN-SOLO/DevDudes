'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { gamePresetConfigSchema } from '@/lib/validations/game'
import type { GamePresetConfig } from '@/lib/game-pipeline/types'

export async function saveGamePresetConfig(
  projectId: string | null,
  config: GamePresetConfig
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', projectId: null }
  }

  const result = gamePresetConfigSchema.safeParse(config)
  if (!result.success) {
    return {
      error: result.error.issues[0]?.message || 'Invalid configuration',
      projectId: null,
    }
  }

  const gameName = config.themes[0]
    ? `${config.themes[0].charAt(0).toUpperCase() + config.themes[0].slice(1)} Game`
    : 'Untitled Game'
  const gameDescription = [
    config.genres.join(', '),
    config.dimension,
    config.engine,
  ]
    .filter(Boolean)
    .join(' | ')

  if (!projectId) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: gameName,
        description: gameDescription || 'Game project',
        app_type: 'game',
        status: 'configuring',
        preset_config: { type: 'game', ...config } as unknown as Record<string, unknown>,
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
      preset_config: { type: 'game', ...config } as unknown as Record<string, unknown>,
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
