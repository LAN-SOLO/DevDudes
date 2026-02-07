// Game option used across all step selection cards
export interface GameOption {
  value: string
  label: string
  icon: string
  description: string
  examples?: string[]
  aiOnly?: boolean
}

// Step category grouping for the nav
export interface StepCategory {
  id: string
  label: string
  steps: number[]
}

// Multiplayer configuration
export interface MultiplayerConfig {
  maxPlayers: number
  networkModel: string
  syncType: string
}

// AI freetext fields
export interface AiFreetext {
  inGameAi: string[]
  devAi: string[]
  additionalNotes: string
  detailedDescription: string
  gameplayLoop: string
  referenceGames: string
  constraints: string
}

// ── V2 Sub-Interfaces ─────────────────────────────────────────

// Step 3: Lore (conditional on narrativeFocus !== 'none')
export interface LoreConfig {
  worldDescription: string
  factions: string[]
  flavorTextTone: string
}

// Step 6: Animation intensity
// (stored as a simple string on GamePresetConfig)

// Step 9: Match structure (conditional on competitive/multiplayer)
export interface MatchStructureConfig {
  matchDuration: string
  turnStructure: string
  roundsPerMatch: number
  timePerTurn: number
  timePerTurnUnit: string
  ropeTimer: boolean
}

// Step 13: Advanced audio
export interface MusicDetailConfig {
  tempo: string
  dynamicLayers: string
  transitionStyle: string
  combatIntensity: string
  explorationMood: string
  menuTheme: string
  bossTheme: string
  victoryTheme: string
}

export interface SoundEffectsDetailConfig {
  uiFeedback: string
  environmentAmbience: string
  combatSounds: string
  footsteps: string
  weatherSounds: string
  creatureVocals: string
  impactSounds: string
  magicEffects: string
}

export interface HapticFeedbackConfig {
  enabled: boolean
  platform: string
  events: string[]
}

// Step 14: Technical constraints & performance
export interface TechnicalConstraintsConfig {
  minRAM: string
  minGPU: string
  minCPU: string
  storageSize: string
  networkBandwidth: string
  maxLoadTime: string
  targetResolution: string
}

export interface PerformanceBudgetsConfig {
  drawCalls: string
  triangleCount: string
  textureMemory: string
  audioChannels: string
}

// Step 15: Monetization detail & reward economy
export interface MonetizationDetailConfig {
  premiumCurrency: string
  softCurrency: string
  iapTiers: string
  adPlacement: string
  seasonPassDuration: string
  battlePassTiers: string
}

export interface RewardEconomyConfig {
  dailyRewardCycle: string
  firstPurchaseBonus: string
  vipTiers: string
  referralReward: string
}

// Step 16: AI Opponent (conditional on card-game or competitive)
export interface AiOpponentConfig {
  difficultyTiers: string
  personality: string
  cheatingEnabled: boolean
}

// Step 17: Card System
export interface CardSystemConfig {
  totalCards: number
  expansionCadence: string
  cardTypes: string[]
  costRange: { min: number; max: number }
  powerRange: { min: number; max: number }
  keywords: string[]
  rarityDistribution: CardRarityEntry[]
  elements: CardElement[]
  deckSize: { min: number; max: number }
  maxCopiesPerCard: number
  deckRestrictions: string
  startingHandSize: number
  drawPerTurn: number
  mulliganAllowed: boolean
  resourceSystem: ResourceSystemConfig
}

export interface CardRarityEntry {
  rarity: string
  percentage: number
  dropRate: number
  craftCost: number
}

export interface CardElement {
  name: string
  color: string
  chainBonus: string
}

export interface ResourceSystemConfig {
  name: string
  startingAmount: number
  gainPerTurn: number
  maxCap: number
  specialMechanic: string
}

// Step 19: Card Visual Identity
export interface VisualIdentityConfig {
  colorPalette: string[]
  cardShape: string
  cardBorder: string
  cardIllustration: string
  cardBack: string
  uiStyle: string
  fontStyle: string
}

export interface AnimationsConfig {
  cardPlay: string
  combo: string
  damage: string
  victory: string
  defeat: string
  packOpening: string
  legendary: string
}

// Step 20: Target Audience
export interface TargetAudienceConfig {
  ageRange: string
  demographic: string
  sessionLength: string
  experienceLevel: string
}

export interface OnboardingConfig {
  steps: string[]
  skipAllowed: boolean
  progressiveDisclosure: boolean
}

export interface UxPrinciplesConfig {
  maxClicksToAction: number
  maxLoadTime: number
  offlineFallback: boolean
  undoSupport: boolean
  autoSuggest: boolean
}

// Step 21: Social & Retention
export interface SocialSystemConfig {
  emotes: boolean
  tournaments: boolean
  replaySharing: boolean
}

// Step 22: Accessibility
export interface AccessibilityDetailConfig {
  colorblindMode: boolean
  screenReaderSupport: boolean
  remappableControls: boolean
  subtitleSize: string
  highContrastMode: boolean
}

export interface LocalizationConfig {
  defaultLanguage: string
  launchLanguages: string[]
  rtlSupport: boolean
  textExpansionBuffer: number
}

// Step 23: Content Plan & Analytics
export interface ContentPlanConfig {
  mvpFeatures: string[]
  mvpTimeline: string
  softLaunchFeatures: string[]
  softLaunchTimeline: string
  fullLaunchFeatures: string[]
  fullLaunchTimeline: string
  postLaunchFeatures: string[]
  postLaunchTimeline: string
}

export interface AnalyticsConfig {
  trackingPlatform: string
  keyMetrics: string[]
  abTesting: boolean
  privacyCompliance: string
}

// Step 24: Gameplay Loop Structured
export interface GameplayLoopConfig {
  microLoop: string
  sessionLoop: string
  progressionLoop: string
  engagementLoop: string
}

// ── Analysis & Generated Docs ─────────────────────────────────

// Analysis report from the analyze step
export interface GameAnalysisReport {
  complexityScore: number // 1-10
  complexityLabel: string
  scopeEstimate: string
  warnings: AnalysisWarning[]
  suggestions: string[]
  compatibilityIssues: string[]
  techFeasibility: 'high' | 'medium' | 'low'
  summary: string
}

export interface AnalysisWarning {
  severity: 'error' | 'warning' | 'info'
  message: string
  field?: string
}

// Generated documents from the combo step
export interface GeneratedGameDocs {
  initPrompt: string
  developmentConcept: string
}

// ── Full Game Preset Configuration ────────────────────────────

export interface GamePresetConfig {
  // Step 1: Import
  importedProjectId: string | null
  importMode: 'full' | 'config-only' | 'assets-only' | ''

  // Step 2: Theme
  themes: string[]
  customTheme: string
  elevatorPitch: string
  tagline: string

  // Step 3: Narrative
  narrativeFocus: string
  storyStructure: string
  victoryCondition: string
  lore: LoreConfig

  // Step 4: Genre
  genres: string[]

  // Step 5: Platform
  platforms: string[]
  primaryPlatform: string

  // Step 6: Visual
  dimension: string
  artStyle: string
  animationIntensity: string

  // Step 7: Camera
  cameraStyle: string

  // Step 8: World
  worldStructure: string
  levelGeneration: string
  worldScope: string

  // Step 9: Player
  playerMode: string
  multiplayer: MultiplayerConfig
  matchStructure: MatchStructureConfig

  // Step 10: Core Mechanics
  coreMechanics: string[]

  // Step 11: Secondary Mechanics
  secondaryMechanics: string[]

  // Step 12: Progression
  progressionSystems: string[]
  difficulty: string
  rewardTypes: string[]

  // Step 13: Audio
  musicStyle: string
  soundEffects: string[]
  voiceActing: string
  musicConfig: MusicDetailConfig
  soundEffectsConfig: SoundEffectsDetailConfig
  hapticFeedback: HapticFeedbackConfig

  // Step 14: Engine
  engine: string
  targetFps: string
  additionalTech: string[]
  technicalConstraints: TechnicalConstraintsConfig
  performanceBudgets: PerformanceBudgetsConfig

  // Step 15: Monetization
  businessModel: string
  distribution: string[]
  monetizationDetail: MonetizationDetailConfig
  rewardEconomy: RewardEconomyConfig

  // Step 16: AI & Notes
  aiFreetext: AiFreetext
  aiOpponent: AiOpponentConfig

  // Step 17: Card System (conditional)
  cardSystem: CardSystemConfig

  // Step 18: Match & Turns (conditional — uses matchStructure from step 9)

  // Step 19: Card Visual (conditional)
  visualIdentity: VisualIdentityConfig
  animations: AnimationsConfig

  // Step 20: Target Audience
  targetAudience: TargetAudienceConfig
  tutorialStyle: string
  onboarding: OnboardingConfig
  uxPrinciples: UxPrinciplesConfig

  // Step 21: Social & Retention
  socialFeatures: string[]
  retentionMechanics: string[]
  socialConfig: SocialSystemConfig

  // Step 22: Accessibility
  accessibilityFeatures: string[]
  accessibilityConfig: AccessibilityDetailConfig
  localization: LocalizationConfig

  // Step 23: Content Plan
  contentPlan: ContentPlanConfig
  analytics: AnalyticsConfig

  // Step 24: Advanced
  gameplayLoopStructured: GameplayLoopConfig
  offlineMode: boolean
  offlineModeScope: string
  pwaSupport: boolean
}
