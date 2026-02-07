'use client'

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react'
import type {
  GamePresetConfig,
  MultiplayerConfig,
  AiFreetext,
  CardSystemConfig,
  VisualIdentityConfig,
  AnimationsConfig,
  MatchStructureConfig,
  SocialSystemConfig,
  OnboardingConfig,
  ContentPlanConfig,
  LocalizationConfig,
} from '@/lib/game-pipeline/types'
import { defaultGamePresetConfig } from '@/lib/validations/game'
import { isCardGame } from '@/lib/game-pipeline/constants'

// All 24 step numbers
const ALL_STEPS = Array.from({ length: 24 }, (_, i) => i + 1)
// Card game conditional steps
const CARD_GAME_STEPS = [17, 18, 19]

function computeVisibleSteps(genres: string[]): number[] {
  if (isCardGame(genres)) return ALL_STEPS
  return ALL_STEPS.filter((s) => !CARD_GAME_STEPS.includes(s))
}

interface GameWizardContextType {
  config: GamePresetConfig
  updateConfig: (updates: Partial<GamePresetConfig>) => void
  updateMultiplayer: (updates: Partial<MultiplayerConfig>) => void
  updateAiFreetext: (updates: Partial<AiFreetext>) => void
  updateCardSystem: (updates: Partial<CardSystemConfig>) => void
  updateVisualIdentity: (updates: Partial<VisualIdentityConfig>) => void
  updateAnimations: (updates: Partial<AnimationsConfig>) => void
  updateMatchStructure: (updates: Partial<MatchStructureConfig>) => void
  updateSocialConfig: (updates: Partial<SocialSystemConfig>) => void
  updateOnboarding: (updates: Partial<OnboardingConfig>) => void
  updateContentPlan: (updates: Partial<ContentPlanConfig>) => void
  updateLocalization: (updates: Partial<LocalizationConfig>) => void
  importConfig: (config: Partial<GamePresetConfig>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  visibleSteps: number[]
  nextStep: (current: number) => number | null
  prevStep: (current: number) => number | null
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
}

const GameWizardContext = createContext<GameWizardContextType | null>(null)

export function GameWizardProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<GamePresetConfig>(defaultGamePresetConfig)
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)

  const visibleSteps = useMemo(() => computeVisibleSteps(config.genres), [config.genres])
  const totalSteps = visibleSteps.length

  const nextStep = useCallback((current: number): number | null => {
    const idx = visibleSteps.indexOf(current)
    if (idx === -1 || idx >= visibleSteps.length - 1) return null
    return visibleSteps[idx + 1]
  }, [visibleSteps])

  const prevStep = useCallback((current: number): number | null => {
    const idx = visibleSteps.indexOf(current)
    if (idx <= 0) return null
    return visibleSteps[idx - 1]
  }, [visibleSteps])

  const updateConfig = (updates: Partial<GamePresetConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  const updateMultiplayer = (updates: Partial<MultiplayerConfig>) => {
    setConfig((prev) => ({
      ...prev,
      multiplayer: { ...prev.multiplayer, ...updates },
    }))
  }

  const updateAiFreetext = (updates: Partial<AiFreetext>) => {
    setConfig((prev) => ({
      ...prev,
      aiFreetext: { ...prev.aiFreetext, ...updates },
    }))
  }

  const updateCardSystem = (updates: Partial<CardSystemConfig>) => {
    setConfig((prev) => ({
      ...prev,
      cardSystem: { ...prev.cardSystem, ...updates },
    }))
  }

  const updateVisualIdentity = (updates: Partial<VisualIdentityConfig>) => {
    setConfig((prev) => ({
      ...prev,
      visualIdentity: { ...prev.visualIdentity, ...updates },
    }))
  }

  const updateAnimations = (updates: Partial<AnimationsConfig>) => {
    setConfig((prev) => ({
      ...prev,
      animations: { ...prev.animations, ...updates },
    }))
  }

  const updateMatchStructure = (updates: Partial<MatchStructureConfig>) => {
    setConfig((prev) => ({
      ...prev,
      matchStructure: { ...prev.matchStructure, ...updates },
    }))
  }

  const updateSocialConfig = (updates: Partial<SocialSystemConfig>) => {
    setConfig((prev) => ({
      ...prev,
      socialConfig: { ...prev.socialConfig, ...updates },
    }))
  }

  const updateOnboarding = (updates: Partial<OnboardingConfig>) => {
    setConfig((prev) => ({
      ...prev,
      onboarding: { ...prev.onboarding, ...updates },
    }))
  }

  const updateContentPlan = (updates: Partial<ContentPlanConfig>) => {
    setConfig((prev) => ({
      ...prev,
      contentPlan: { ...prev.contentPlan, ...updates },
    }))
  }

  const updateLocalization = (updates: Partial<LocalizationConfig>) => {
    setConfig((prev) => ({
      ...prev,
      localization: { ...prev.localization, ...updates },
    }))
  }

  const importConfig = (imported: Partial<GamePresetConfig>) => {
    const merged = { ...defaultGamePresetConfig, ...imported }
    setConfig(merged)
    // Jump to last visible step
    const visible = computeVisibleSteps(merged.genres)
    setCurrentStep(visible[visible.length - 1])
    setIsComplete(false)
  }

  return (
    <GameWizardContext.Provider
      value={{
        config,
        updateConfig,
        updateMultiplayer,
        updateAiFreetext,
        updateCardSystem,
        updateVisualIdentity,
        updateAnimations,
        updateMatchStructure,
        updateSocialConfig,
        updateOnboarding,
        updateContentPlan,
        updateLocalization,
        importConfig,
        currentStep,
        setCurrentStep,
        totalSteps,
        visibleSteps,
        nextStep,
        prevStep,
        isComplete,
        setIsComplete,
      }}
    >
      {children}
    </GameWizardContext.Provider>
  )
}

export function useGameWizard() {
  const context = useContext(GameWizardContext)
  if (!context) {
    throw new Error('useGameWizard must be used within GameWizardProvider')
  }
  return context
}
