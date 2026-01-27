'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(500).optional(),
  app_type: z.string().optional(),
})

const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  status: z.enum(['draft', 'configuring', 'generating', 'ready', 'deployed', 'archived']).optional(),
  preset_config: z.record(z.unknown()).optional(),
})

export async function getProjects() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', data: null }
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message, data: null }
  }

  return { error: null, data }
}

export async function getProject(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated', data: null }
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    return { error: error.message, data: null }
  }

  return { error: null, data }
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const rawData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string || undefined,
    app_type: formData.get('app_type') as string || undefined,
  }

  const result = createProjectSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.errors[0]?.message || 'Invalid input' }
  }

  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      name: result.data.name,
      description: result.data.description || null,
      app_type: result.data.app_type || null,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  redirect(`/dashboard/projects/${data.id}`)
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const rawData: Record<string, unknown> = {}
  const name = formData.get('name')
  const description = formData.get('description')
  const status = formData.get('status')

  if (name) rawData.name = name
  if (description !== null) rawData.description = description
  if (status) rawData.status = status

  const result = updateProjectSchema.safeParse(rawData)
  if (!result.success) {
    return { error: result.error.errors[0]?.message || 'Invalid input' }
  }

  const { error } = await supabase
    .from('projects')
    .update(result.data)
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  revalidatePath(`/dashboard/projects/${id}`)
  return { error: null }
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard/projects')
  redirect('/dashboard/projects')
}

export async function getProjectStats() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { total: 0, draft: 0, deployed: 0, thisMonth: 0 }
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('status, created_at')

  if (!projects) {
    return { total: 0, draft: 0, deployed: 0, thisMonth: 0 }
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return {
    total: projects.length,
    draft: projects.filter(p => p.status === 'draft').length,
    deployed: projects.filter(p => p.status === 'deployed').length,
    thisMonth: projects.filter(p => new Date(p.created_at) >= startOfMonth).length,
  }
}
