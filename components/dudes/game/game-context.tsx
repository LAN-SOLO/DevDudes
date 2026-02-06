'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { GamePresetConfig, MultiplayerConfig, AiFreetext } from '@/lib/game-pipeline/types'
import { defaultGamePresetConfig } from '@/lib/validations/game'

interface GameWizardContextType {
  config: GamePresetConfig
  updateConfig: (updates: Partial<GamePresetConfig>) => void
  updateMultiplayer: (updates: Partial<MultiplayerConfig>) => void
  updateAiFreetext: (updates: Partial<AiFreetext>) => void
  importConfig: (config: Partial<GamePresetConfig>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  totalSteps: number
  isComplete: boolean
  setIsComplete: (complete: boolean) => void
}

const GameWizardContext = createContext<GameWizardContextType | null>(null)

export function GameWizardProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<GamePresetConfig>(defaultGamePresetConfig)
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const totalSteps = 16

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

  const importConfig = (imported: Partial<GamePresetConfig>) => {
    setConfig({ ...defaultGamePresetConfig, ...imported })
    setCurrentStep(16)
    setIsComplete(false)
  }

  return (
    <GameWizardContext.Provider
      value={{
        config,
        updateConfig,
        updateMultiplayer,
        updateAiFreetext,
        importConfig,
        currentStep,
        setCurrentStep,
        totalSteps,
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
