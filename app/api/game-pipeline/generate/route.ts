import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { gamePresetConfigSchema } from '@/lib/validations/game'
import {
  buildInitPromptDoc,
  buildDevelopmentConceptDoc,
} from '@/lib/game-pipeline/prompts'
import type { GamePresetConfig } from '@/lib/game-pipeline/types'

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  const { config } = body

  const result = gamePresetConfigSchema.safeParse(config)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message || 'Invalid configuration' },
      { status: 400 }
    )
  }

  const validConfig = result.data as unknown as GamePresetConfig

  const initPrompt = buildInitPromptDoc(validConfig)
  const developmentConcept = buildDevelopmentConceptDoc(validConfig)

  return NextResponse.json({
    data: {
      initPrompt,
      developmentConcept,
    },
  })
}
