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
import { defaultGamePresetConfig, gamePresetConfigSchema } from '@/lib/validations/game'
import { isCardGame } from '@/lib/game-pipeline/constants'

// ── Import Sanitizer ───────────────────────────────────────────
// Converts a freeform/creative JSON config into the wizard's expected schema.
// Handles type mismatches, structural differences, and unknown keys gracefully.

function pick<T>(val: unknown, fallback: T): T {
  if (val === null || val === undefined) return fallback
  if (typeof fallback === 'boolean') return (typeof val === 'boolean' ? val : fallback) as T
  if (typeof fallback === 'number') return (typeof val === 'number' ? val : fallback) as T
  if (typeof fallback === 'string') return (typeof val === 'string' ? val : fallback) as T
  return fallback
}

function pickArray(val: unknown, fallback: string[]): string[] {
  if (Array.isArray(val)) return val.filter((v): v is string => typeof v === 'string')
  if (val && typeof val === 'object') return Object.values(val).filter((v): v is string => typeof v === 'string')
  return fallback
}

function pickStringObj(val: unknown, fallback: Record<string, string>): Record<string, string> {
  if (val && typeof val === 'object' && !Array.isArray(val)) {
    const result: Record<string, string> = { ...fallback }
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      if (k in fallback && typeof v === 'string') result[k] = v
    }
    return result
  }
  return fallback
}

function sanitizeImportedConfig(raw: Record<string, unknown>): GamePresetConfig {
  const d = defaultGamePresetConfig
  const r = raw

  // Helper: extract string[] from colorPalette (could be object with hex values or array)
  const extractColorPalette = (): string[] => {
    const cp = (r.visualIdentity as Record<string, unknown>)?.colorPalette
    if (Array.isArray(cp)) return cp.filter((v): v is string => typeof v === 'string').slice(0, 5)
    if (cp && typeof cp === 'object') {
      // Extract hex values from descriptions like "#0D0D0D — deep void black"
      return Object.values(cp)
        .filter((v): v is string => typeof v === 'string')
        .map((s) => { const m = s.match(/#[0-9a-fA-F]{6}/); return m ? m[0] : s })
        .slice(0, 5)
    }
    return d.visualIdentity.colorPalette
  }

  // Helper: extract flat content plan from nested structure
  const extractContentPlan = () => {
    const cp = r.contentPlan as Record<string, unknown> | undefined
    if (!cp || typeof cp !== 'object') return d.contentPlan
    const mvp = cp.mvpScope as Record<string, unknown> | undefined
    const soft = cp.softLaunch as Record<string, unknown> | undefined
    const full = cp.fullLaunch as Record<string, unknown> | undefined
    const post = cp.postLaunch as Record<string, unknown> | undefined
    return {
      mvpFeatures: pickArray(mvp?.features || cp.mvpFeatures, d.contentPlan.mvpFeatures),
      mvpTimeline: pick(cp.mvpTimeline, d.contentPlan.mvpTimeline) as string,
      softLaunchFeatures: pickArray(soft?.additions || cp.softLaunchFeatures, d.contentPlan.softLaunchFeatures),
      softLaunchTimeline: pick(cp.softLaunchTimeline, d.contentPlan.softLaunchTimeline) as string,
      fullLaunchFeatures: pickArray(full?.additions || cp.fullLaunchFeatures, d.contentPlan.fullLaunchFeatures),
      fullLaunchTimeline: pick(cp.fullLaunchTimeline, d.contentPlan.fullLaunchTimeline) as string,
      postLaunchFeatures: pickArray(post?.additions || cp.postLaunchFeatures, d.contentPlan.postLaunchFeatures),
      postLaunchTimeline: pick(cp.postLaunchTimeline, d.contentPlan.postLaunchTimeline) as string,
    }
  }

  // Helper: extract accessibility config from freeform descriptions
  const extractAccessibilityConfig = () => {
    const ac = r.accessibilityConfig as Record<string, unknown> | undefined
    if (!ac || typeof ac !== 'object') return d.accessibilityConfig
    return {
      colorblindMode: typeof ac.colorblindMode === 'boolean' ? ac.colorblindMode : !!ac.colorblindMode,
      screenReaderSupport: typeof ac.screenReaderSupport === 'boolean' ? ac.screenReaderSupport : (typeof ac.screenReader === 'string' ? true : d.accessibilityConfig.screenReaderSupport),
      remappableControls: typeof ac.remappableControls === 'boolean' ? ac.remappableControls : d.accessibilityConfig.remappableControls,
      highContrastMode: typeof ac.highContrastMode === 'boolean' ? ac.highContrastMode : d.accessibilityConfig.highContrastMode,
      subtitleSize: pick(ac.subtitleSize || ac.textScaling, d.accessibilityConfig.subtitleSize) as string,
    }
  }

  // Helper: extract offlineMode boolean + scope string from object or boolean
  const extractOfflineMode = (): { offlineMode: boolean; offlineModeScope: string } => {
    if (typeof r.offlineMode === 'boolean') {
      return { offlineMode: r.offlineMode, offlineModeScope: pick(r.offlineModeScope, '') as string }
    }
    if (r.offlineMode && typeof r.offlineMode === 'object') {
      const om = r.offlineMode as Record<string, unknown>
      return {
        offlineMode: !!om.enabled,
        offlineModeScope: pick(om.scope, '') as string,
      }
    }
    return { offlineMode: d.offlineMode, offlineModeScope: d.offlineModeScope }
  }

  // Helper: extract onboarding from freeform
  const extractOnboarding = () => {
    const ob = r.onboarding as Record<string, unknown> | undefined
    if (!ob || typeof ob !== 'object') return d.onboarding
    return {
      steps: pickArray(ob.steps, d.onboarding.steps),
      skipAllowed: typeof ob.skipAllowed === 'boolean' ? ob.skipAllowed :
                   typeof ob.skipOption === 'boolean' ? ob.skipOption : d.onboarding.skipAllowed,
      progressiveDisclosure: typeof ob.progressiveDisclosure === 'boolean' ? ob.progressiveDisclosure : d.onboarding.progressiveDisclosure,
    }
  }

  // Helper: extract UX principles
  const extractUxPrinciples = () => {
    const ux = r.uxPrinciples as Record<string, unknown> | undefined
    if (!ux || typeof ux !== 'object') return d.uxPrinciples
    return {
      maxClicksToAction: typeof ux.maxClicksToAction === 'number' ? ux.maxClicksToAction :
                          typeof ux.maxTapsToStartPuzzle === 'number' ? ux.maxTapsToStartPuzzle : d.uxPrinciples.maxClicksToAction,
      maxLoadTime: typeof ux.maxLoadTime === 'number' ? ux.maxLoadTime : d.uxPrinciples.maxLoadTime,
      offlineFallback: typeof ux.offlineFallback === 'boolean' ? ux.offlineFallback : d.uxPrinciples.offlineFallback,
      undoSupport: typeof ux.undoSupport === 'boolean' ? ux.undoSupport :
                   typeof ux.undoSystem === 'string' ? true : d.uxPrinciples.undoSupport,
      autoSuggest: typeof ux.autoSuggest === 'boolean' ? ux.autoSuggest : d.uxPrinciples.autoSuggest,
    }
  }

  // Helper: extract target audience with field name mapping
  const extractTargetAudience = () => {
    const ta = r.targetAudience as Record<string, unknown> | undefined
    if (!ta || typeof ta !== 'object') return d.targetAudience
    return {
      ageRange: pick(ta.ageRange, d.targetAudience.ageRange) as string,
      demographic: pick(ta.demographic || ta.primaryDemographic, d.targetAudience.demographic) as string,
      sessionLength: pick(ta.sessionLength, d.targetAudience.sessionLength) as string,
      experienceLevel: pick(ta.experienceLevel || ta.gamingExperience, d.targetAudience.experienceLevel) as string,
    }
  }

  // Helper: extract social config
  const extractSocialConfig = () => {
    const sc = r.socialConfig as Record<string, unknown> | undefined
    if (!sc || typeof sc !== 'object') return d.socialConfig
    return {
      emotes: typeof sc.emotes === 'boolean' ? sc.emotes :
              sc.emoteSystem !== null && sc.emoteSystem !== undefined ? true : d.socialConfig.emotes,
      tournaments: typeof sc.tournaments === 'boolean' ? sc.tournaments :
                   typeof sc.tournaments === 'object' ? true : d.socialConfig.tournaments,
      replaySharing: typeof sc.replaySharing === 'boolean' ? sc.replaySharing :
                     typeof sc.replaySharing === 'object' ? true : d.socialConfig.replaySharing,
    }
  }

  // Helper: extract hapticFeedback — events can be object or array
  const extractHapticFeedback = () => {
    const hf = r.hapticFeedback as Record<string, unknown> | undefined
    if (!hf || typeof hf !== 'object') return d.hapticFeedback
    return {
      enabled: typeof hf.enabled === 'boolean' ? hf.enabled : d.hapticFeedback.enabled,
      platform: pick(hf.platform, d.hapticFeedback.platform) as string,
      events: pickArray(hf.events, d.hapticFeedback.events),
    }
  }

  // Helper: extract localization with type coercion
  const extractLocalization = () => {
    const loc = r.localization as Record<string, unknown> | undefined
    if (!loc || typeof loc !== 'object') return d.localization
    let buffer = d.localization.textExpansionBuffer
    if (typeof loc.textExpansionBuffer === 'number') buffer = loc.textExpansionBuffer
    else if (typeof loc.textExpansionBuffer === 'string') {
      const parsed = parseInt(loc.textExpansionBuffer)
      if (!isNaN(parsed)) buffer = parsed
    }
    return {
      defaultLanguage: pick(loc.defaultLanguage, d.localization.defaultLanguage) as string,
      launchLanguages: pickArray(loc.launchLanguages, d.localization.launchLanguages),
      rtlSupport: typeof loc.rtlSupport === 'boolean' ? loc.rtlSupport : d.localization.rtlSupport,
      textExpansionBuffer: buffer,
    }
  }

  // Helper: extract cardSystem, handling null
  const extractCardSystem = () => {
    if (!r.cardSystem || typeof r.cardSystem !== 'object') return d.cardSystem
    const cs = r.cardSystem as Record<string, unknown>
    return {
      ...d.cardSystem,
      totalCards: typeof cs.totalCards === 'number' ? cs.totalCards : d.cardSystem.totalCards,
      expansionCadence: pick(cs.expansionCadence, d.cardSystem.expansionCadence) as string,
      cardTypes: pickArray(cs.cardTypes, d.cardSystem.cardTypes),
      keywords: pickArray(cs.keywords, d.cardSystem.keywords),
      elements: Array.isArray(cs.elements) ? cs.elements : d.cardSystem.elements,
      rarityDistribution: Array.isArray(cs.rarityDistribution) ? cs.rarityDistribution : d.cardSystem.rarityDistribution,
    }
  }

  // Helper: extract analytics with type coercion
  const extractAnalytics = () => {
    const an = r.analytics as Record<string, unknown> | undefined
    if (!an || typeof an !== 'object') return d.analytics
    return {
      trackingPlatform: pick(an.trackingPlatform, d.analytics.trackingPlatform) as string,
      keyMetrics: pickArray(an.keyMetrics, d.analytics.keyMetrics),
      abTesting: typeof an.abTesting === 'boolean' ? an.abTesting :
                 typeof an.abTesting === 'string' ? true : d.analytics.abTesting,
      privacyCompliance: pick(an.privacyCompliance, d.analytics.privacyCompliance) as string,
    }
  }

  // Helper: extract gameplayLoop from various structures
  const extractGameplayLoop = () => {
    const gls = (r.gameplayLoopStructured || r.gameplayLoop) as Record<string, unknown> | undefined
    if (!gls || typeof gls !== 'object') return d.gameplayLoopStructured
    return {
      microLoop: pick(gls.microLoop, d.gameplayLoopStructured.microLoop) as string,
      sessionLoop: pick(gls.sessionLoop, d.gameplayLoopStructured.sessionLoop) as string,
      progressionLoop: pick(gls.progressionLoop, d.gameplayLoopStructured.progressionLoop) as string,
      engagementLoop: pick(gls.engagementLoop, d.gameplayLoopStructured.engagementLoop) as string,
    }
  }

  // Helper: extract aiFreetext
  const extractAiFreetext = () => {
    const af = r.aiFreetext as Record<string, unknown> | undefined
    if (!af || typeof af !== 'object') return d.aiFreetext
    return {
      inGameAi: pickArray(af.inGameAi, d.aiFreetext.inGameAi),
      devAi: pickArray(af.devAi, d.aiFreetext.devAi),
      detailedDescription: pick(af.detailedDescription, d.aiFreetext.detailedDescription) as string,
      gameplayLoop: pick(af.gameplayLoop, d.aiFreetext.gameplayLoop) as string,
      referenceGames: pick(af.referenceGames, d.aiFreetext.referenceGames) as string,
      constraints: pick(af.constraints, d.aiFreetext.constraints) as string,
      additionalNotes: pick(af.additionalNotes, d.aiFreetext.additionalNotes) as string,
    }
  }

  // Helper: extract visualIdentity
  const extractVisualIdentity = () => {
    const vi = r.visualIdentity as Record<string, unknown> | undefined
    if (!vi || typeof vi !== 'object') return d.visualIdentity
    return {
      colorPalette: extractColorPalette(),
      cardShape: pick(vi.cardShape, d.visualIdentity.cardShape) as string,
      cardBorder: pick(vi.cardBorder, d.visualIdentity.cardBorder) as string,
      cardIllustration: pick(vi.cardIllustration, d.visualIdentity.cardIllustration) as string,
      cardBack: pick(vi.cardBack, d.visualIdentity.cardBack) as string,
      uiStyle: pick(vi.uiStyle, d.visualIdentity.uiStyle) as string,
      fontStyle: pick(vi.fontStyle, d.visualIdentity.fontStyle) as string,
    }
  }

  // Helper: extract matchStructure
  const extractMatchStructure = () => {
    const ms = r.matchStructure as Record<string, unknown> | undefined
    if (!ms || typeof ms !== 'object') return d.matchStructure
    return {
      matchDuration: pick(ms.matchDuration, d.matchStructure.matchDuration) as string,
      turnStructure: pick(ms.turnStructure, d.matchStructure.turnStructure) as string,
      roundsPerMatch: typeof ms.roundsPerMatch === 'number' ? ms.roundsPerMatch : d.matchStructure.roundsPerMatch,
      timePerTurn: typeof ms.timePerTurn === 'number' ? ms.timePerTurn : d.matchStructure.timePerTurn,
      timePerTurnUnit: pick(ms.timePerTurnUnit, d.matchStructure.timePerTurnUnit) as string,
      ropeTimer: typeof ms.ropeTimer === 'boolean' ? ms.ropeTimer : d.matchStructure.ropeTimer,
    }
  }

  const { offlineMode: offlineModeVal, offlineModeScope: offlineModeS } = extractOfflineMode()

  const config: GamePresetConfig = {
    importedProjectId: d.importedProjectId,
    importMode: d.importMode,
    themes: pickArray(r.themes, d.themes).slice(0, 3),
    customTheme: pick(r.customTheme, d.customTheme) as string,
    elevatorPitch: pick(r.elevatorPitch, d.elevatorPitch) as string,
    tagline: pick(r.tagline, d.tagline) as string,
    narrativeFocus: pick(r.narrativeFocus, d.narrativeFocus) as string,
    storyStructure: pick(r.storyStructure, d.storyStructure) as string,
    victoryCondition: pick(r.victoryCondition, d.victoryCondition) as string,
    lore: r.lore && typeof r.lore === 'object' ? {
      worldDescription: pick((r.lore as Record<string, unknown>).worldDescription, d.lore.worldDescription) as string,
      factions: pickArray((r.lore as Record<string, unknown>).factions, d.lore.factions),
      flavorTextTone: pick((r.lore as Record<string, unknown>).flavorTextTone, d.lore.flavorTextTone) as string,
    } : d.lore,
    genres: pickArray(r.genres, d.genres),
    platforms: pickArray(r.platforms, d.platforms),
    primaryPlatform: pick(r.primaryPlatform, d.primaryPlatform) as string,
    dimension: pick(r.dimension, d.dimension) as string,
    artStyle: pick(r.artStyle, d.artStyle) as string,
    animationIntensity: pick(r.animationIntensity, d.animationIntensity) as string,
    cameraStyle: pick(r.cameraStyle, d.cameraStyle) as string,
    worldStructure: pick(r.worldStructure, d.worldStructure) as string,
    levelGeneration: pick(r.levelGeneration, d.levelGeneration) as string,
    worldScope: pick(r.worldScope, d.worldScope) as string,
    playerMode: pick(r.playerMode, d.playerMode) as string,
    multiplayer: r.multiplayer && typeof r.multiplayer === 'object' ? {
      maxPlayers: typeof (r.multiplayer as Record<string, unknown>).maxPlayers === 'number'
        ? (r.multiplayer as Record<string, unknown>).maxPlayers as number : d.multiplayer.maxPlayers,
      networkModel: pick((r.multiplayer as Record<string, unknown>).networkModel, d.multiplayer.networkModel) as string,
      syncType: pick((r.multiplayer as Record<string, unknown>).syncType, d.multiplayer.syncType) as string,
    } : d.multiplayer,
    matchStructure: extractMatchStructure(),
    coreMechanics: pickArray(r.coreMechanics, d.coreMechanics).slice(0, 3),
    secondaryMechanics: pickArray(r.secondaryMechanics, d.secondaryMechanics),
    progressionSystems: pickArray(r.progressionSystems, d.progressionSystems),
    difficulty: pick(r.difficulty, d.difficulty) as string,
    rewardTypes: pickArray(r.rewardTypes, d.rewardTypes),
    musicStyle: pick(r.musicStyle, d.musicStyle) as string,
    soundEffects: pickArray(r.soundEffects, d.soundEffects),
    voiceActing: pick(r.voiceActing, d.voiceActing) as string,
    musicConfig: r.musicConfig && typeof r.musicConfig === 'object'
      ? pickStringObj(r.musicConfig, d.musicConfig as unknown as Record<string, string>) as unknown as typeof d.musicConfig
      : d.musicConfig,
    soundEffectsConfig: r.soundEffectsConfig && typeof r.soundEffectsConfig === 'object'
      ? pickStringObj(r.soundEffectsConfig, d.soundEffectsConfig as unknown as Record<string, string>) as unknown as typeof d.soundEffectsConfig
      : d.soundEffectsConfig,
    hapticFeedback: extractHapticFeedback(),
    engine: pick(r.engine, d.engine) as string,
    targetFps: pick(r.targetFps, d.targetFps) as string,
    additionalTech: pickArray(r.additionalTech, d.additionalTech),
    technicalConstraints: r.technicalConstraints && typeof r.technicalConstraints === 'object'
      ? pickStringObj(r.technicalConstraints, d.technicalConstraints as unknown as Record<string, string>) as unknown as typeof d.technicalConstraints
      : d.technicalConstraints,
    performanceBudgets: r.performanceBudgets && typeof r.performanceBudgets === 'object'
      ? pickStringObj(r.performanceBudgets, d.performanceBudgets as unknown as Record<string, string>) as unknown as typeof d.performanceBudgets
      : d.performanceBudgets,
    businessModel: pick(r.businessModel, d.businessModel) as string,
    distribution: pickArray(r.distribution, d.distribution),
    monetizationDetail: r.monetizationDetail && typeof r.monetizationDetail === 'object'
      ? pickStringObj(r.monetizationDetail, d.monetizationDetail as unknown as Record<string, string>) as unknown as typeof d.monetizationDetail
      : d.monetizationDetail,
    rewardEconomy: r.rewardEconomy && typeof r.rewardEconomy === 'object'
      ? pickStringObj(r.rewardEconomy, d.rewardEconomy as unknown as Record<string, string>) as unknown as typeof d.rewardEconomy
      : d.rewardEconomy,
    aiFreetext: extractAiFreetext(),
    aiOpponent: r.aiOpponent && typeof r.aiOpponent === 'object' ? {
      difficultyTiers: pick((r.aiOpponent as Record<string, unknown>).difficultyTiers, d.aiOpponent.difficultyTiers) as string,
      personality: pick((r.aiOpponent as Record<string, unknown>).personality, d.aiOpponent.personality) as string,
      cheatingEnabled: typeof (r.aiOpponent as Record<string, unknown>).cheatingEnabled === 'boolean'
        ? (r.aiOpponent as Record<string, unknown>).cheatingEnabled as boolean : d.aiOpponent.cheatingEnabled,
    } : d.aiOpponent,
    cardSystem: extractCardSystem(),
    visualIdentity: extractVisualIdentity(),
    animations: r.animations && typeof r.animations === 'object'
      ? pickStringObj(r.animations, d.animations as unknown as Record<string, string>) as unknown as typeof d.animations
      : d.animations,
    targetAudience: extractTargetAudience(),
    tutorialStyle: pick(r.tutorialStyle, d.tutorialStyle) as string,
    onboarding: extractOnboarding(),
    uxPrinciples: extractUxPrinciples(),
    socialFeatures: pickArray(r.socialFeatures, d.socialFeatures),
    retentionMechanics: pickArray(r.retentionMechanics, d.retentionMechanics),
    socialConfig: extractSocialConfig(),
    accessibilityFeatures: pickArray(r.accessibilityFeatures, d.accessibilityFeatures),
    accessibilityConfig: extractAccessibilityConfig(),
    localization: extractLocalization(),
    contentPlan: extractContentPlan(),
    analytics: extractAnalytics(),
    gameplayLoopStructured: extractGameplayLoop(),
    offlineMode: offlineModeVal,
    offlineModeScope: offlineModeS,
    pwaSupport: typeof r.pwaSupport === 'boolean' ? r.pwaSupport : d.pwaSupport,
  }

  // Final pass through Zod to ensure all types are correct and fill any gaps
  const parsed = gamePresetConfigSchema.safeParse(config)
  return parsed.success ? parsed.data as GamePresetConfig : config
}

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
    const sanitized = sanitizeImportedConfig(imported as Record<string, unknown>)
    setConfig(sanitized)
    // Jump to first step so user can review
    setCurrentStep(1)
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
