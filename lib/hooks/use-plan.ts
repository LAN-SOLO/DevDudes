'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { UserPlan } from '@/lib/types/database'

interface PlanLimits {
  projects: number
  connections: number
  apiCalls: number
  teamMembers: number
}

const PLAN_LIMITS: Record<UserPlan, PlanLimits> = {
  free: { projects: 3, connections: 1, apiCalls: 1000, teamMembers: 1 },
  pro: { projects: Infinity, connections: 5, apiCalls: 50000, teamMembers: 5 },
  enterprise: { projects: Infinity, connections: Infinity, apiCalls: Infinity, teamMembers: Infinity },
  super: { projects: Infinity, connections: Infinity, apiCalls: Infinity, teamMembers: Infinity },
}

const PLAN_LABELS: Record<UserPlan, string> = {
  free: 'Free',
  pro: 'Pro',
  enterprise: 'Enterprise',
  super: 'Super',
}

export function usePlan() {
  const [plan, setPlan] = useState<UserPlan>('free')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPlan() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single()

        if (data?.plan) {
          setPlan(data.plan as UserPlan)
        }
      }

      setIsLoading(false)
    }

    fetchPlan()
  }, [])

  return {
    plan,
    isLoading,
    isSuper: plan === 'super',
    isEnterprise: plan === 'enterprise' || plan === 'super',
    isPro: plan === 'pro' || plan === 'enterprise' || plan === 'super',
    isFree: plan === 'free',
    limits: PLAN_LIMITS[plan],
    label: PLAN_LABELS[plan],
  }
}
