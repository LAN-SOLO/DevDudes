'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const updateProfileSchema = z.object({
  full_name: z.string().max(100).optional(),
  avatar_url: z.string().url().optional().nullable(),
})

export async function getProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', data: null }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, role, created_at, updated_at')
    .eq('id', user.id)
    .single()

  if (error) {
    // If profile doesn't exist, return user data
    if (error.code === 'PGRST116') {
      return {
        error: null,
        data: {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || null,
          avatar_url: user.user_metadata?.avatar_url || null,
          role: 'user' as const,
          created_at: user.created_at,
          updated_at: user.updated_at || user.created_at,
        }
      }
    }
    return { error: error.message, data: null }
  }

  return { error: null, data }
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const rawData = {
    full_name: formData.get('full_name') as string || undefined,
  }

  const result = updateProfileSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.issues[0]?.message || 'Invalid input' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: result.data.full_name,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/profile')
  return { error: null }
}
