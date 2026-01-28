/**
 * API Client for interacting with the DevDudes API
 *
 * Usage:
 * import { api } from '@/lib/api-client'
 *
 * // Get all projects
 * const { projects, error } = await api.projects.list()
 *
 * // Create a project
 * const { project, error } = await api.projects.create({ name: 'My App' })
 */

interface ApiError {
  error: string
}

interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  app_type: string
  status: string
  preset_config: Record<string, unknown> | null
  generated_concept: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

interface CreateProjectInput {
  name: string
  description?: string
  app_type?: string
}

interface UpdateProjectInput {
  name?: string
  description?: string
  status?: string
  preset_config?: Record<string, unknown>
}

async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        data: null,
        error: (data as ApiError).error || `Request failed with status ${response.status}`,
      }
    }

    return { data: data as T, error: null }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'An unknown error occurred',
    }
  }
}

export const api = {
  projects: {
    /**
     * List all projects for the authenticated user
     */
    async list() {
      const result = await fetchApi<{ projects: Project[] }>('/api/projects')
      return {
        projects: result.data?.projects ?? [],
        error: result.error,
      }
    },

    /**
     * Get a single project by ID
     */
    async get(id: string) {
      const result = await fetchApi<{ project: Project }>(`/api/projects/${id}`)
      return {
        project: result.data?.project ?? null,
        error: result.error,
      }
    },

    /**
     * Create a new project
     */
    async create(input: CreateProjectInput) {
      const result = await fetchApi<{ project: Project }>('/api/projects', {
        method: 'POST',
        body: JSON.stringify(input),
      })
      return {
        project: result.data?.project ?? null,
        error: result.error,
      }
    },

    /**
     * Update an existing project
     */
    async update(id: string, input: UpdateProjectInput) {
      const result = await fetchApi<{ project: Project }>(`/api/projects/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(input),
      })
      return {
        project: result.data?.project ?? null,
        error: result.error,
      }
    },

    /**
     * Delete a project
     */
    async delete(id: string) {
      const result = await fetchApi<{ success: boolean }>(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      return {
        success: result.data?.success ?? false,
        error: result.error,
      }
    },
  },
}

// Re-export types for use in components
export type { Project, CreateProjectInput, UpdateProjectInput }
