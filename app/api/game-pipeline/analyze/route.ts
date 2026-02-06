import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { gamePresetConfigSchema } from '@/lib/validations/game'
import { analyzeGameConfig } from '@/lib/game-pipeline/analysis'

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

  const report = analyzeGameConfig(result.data as Parameters<typeof analyzeGameConfig>[0])

  return NextResponse.json({ data: report })
}
