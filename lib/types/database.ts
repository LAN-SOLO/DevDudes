export type UserRole = 'user' | 'admin' | 'enterprise'
export type UserPlan = 'free' | 'pro' | 'enterprise' | 'super'
export type ProjectStatus = 'draft' | 'configuring' | 'generating' | 'ready' | 'deployed' | 'archived'
export type DeploymentStatus = 'pending' | 'building' | 'deploying' | 'live' | 'failed' | 'stopped'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  plan: UserPlan
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  status: ProjectStatus
  app_type: string | null
  preset_config: Record<string, unknown>
  generated_concept: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface ProjectVersion {
  id: string
  project_id: string
  version: string
  changelog: string | null
  config_snapshot: Record<string, unknown> | null
  created_at: string
}

export interface Deployment {
  id: string
  project_id: string
  environment: 'staging' | 'production'
  provider: string
  status: DeploymentStatus
  url: string | null
  logs: string | null
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  user_id: string | null
  action: string
  resource: string
  resource_id: string | null
  changes: Record<string, unknown> | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

// Database types for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Profile, 'id'>>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Project, 'id' | 'user_id'>>
      }
      project_versions: {
        Row: ProjectVersion
        Insert: Omit<ProjectVersion, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Omit<ProjectVersion, 'id' | 'project_id'>>
      }
      deployments: {
        Row: Deployment
        Insert: Omit<Deployment, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Omit<Deployment, 'id' | 'project_id'>>
      }
      audit_logs: {
        Row: AuditLog
        Insert: Omit<AuditLog, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: never
      }
    }
  }
}
