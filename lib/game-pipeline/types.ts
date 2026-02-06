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

// Full game preset configuration
export interface GamePresetConfig {
  // Step 1: Import
  importedProjectId: string | null
  importMode: 'full' | 'config-only' | 'assets-only' | ''

  // Step 2: Theme
  themes: string[]
  customTheme: string
  elevatorPitch: string

  // Step 3: Narrative
  narrativeFocus: string
  storyStructure: string
  victoryCondition: string

  // Step 4: Genre
  genres: string[]

  // Step 5: Platform
  platforms: string[]
  primaryPlatform: string

  // Step 6: Visual
  dimension: string
  artStyle: string

  // Step 7: Camera
  cameraStyle: string

  // Step 8: World
  worldStructure: string
  levelGeneration: string
  worldScope: string

  // Step 9: Player
  playerMode: string
  multiplayer: MultiplayerConfig

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

  // Step 14: Engine
  engine: string
  targetFps: string
  additionalTech: string[]

  // Step 15: Monetization
  businessModel: string
  distribution: string[]

  // Step 16: AI & Notes
  aiFreetext: AiFreetext
}
