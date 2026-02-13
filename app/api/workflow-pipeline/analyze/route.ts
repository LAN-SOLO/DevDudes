import { NextResponse } from 'next/server'
import { workflowConfigV2Schema } from '@/lib/validations/workflow'
import { analyzeWorkflowConfig } from '@/lib/workflow-pipeline/analysis'
import {
  getAiProviderRecommendations,
  getFeatureRecommendations,
  getSecurityRecommendations,
  getDeploymentRecommendations,
  getIntegrationRecommendations,
  getStackRecommendations,
} from '@/lib/workflow-pipeline/recommendations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = workflowConfigV2Schema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid workflow configuration', details: result.error.flatten() },
        { status: 400 },
      )
    }

    const config = result.data
    const analysis = analyzeWorkflowConfig(config)
    const recommendations = {
      aiProviders: getAiProviderRecommendations(config),
      features: getFeatureRecommendations(config),
      security: getSecurityRecommendations(config),
      deployment: getDeploymentRecommendations(config),
      integrations: getIntegrationRecommendations(config),
      stack: getStackRecommendations(config),
    }

    return NextResponse.json({ recommendations, analysis })
  } catch {
    return NextResponse.json({ error: 'Failed to analyze workflow' }, { status: 500 })
  }
}
