import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { gamePresetConfigSchema } from '@/lib/validations/game'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .eq('app_type', 'game')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  const { config, projectId } = body

  const result = gamePresetConfigSchema.safeParse(config)
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message || 'Invalid configuration' },
      { status: 400 }
    )
  }

  const gameName = config.themes?.[0]
    ? `${config.themes[0].charAt(0).toUpperCase() + config.themes[0].slice(1)} Game`
    : 'Untitled Game'
  const gameDescription = [config.genres?.join(', '), config.dimension, config.engine]
    .filter(Boolean)
    .join(' | ')

  if (projectId) {
    const { data, error } = await supabase
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
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  }

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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('id')

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
