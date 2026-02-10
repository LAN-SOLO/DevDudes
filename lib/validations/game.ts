import { z } from 'zod'
import type { GamePresetConfig } from '@/lib/game-pipeline/types'

const multiplayerConfigSchema = z.object({
  maxPlayers: z.number().int().min(1).max(1000).default(4),
  networkModel: z.string().default(''),
  syncType: z.string().default(''),
})

const aiFreetextSchema = z.object({
  inGameAi: z.array(z.string()).default([]),
  devAi: z.array(z.string()).default([]),
  additionalNotes: z.string().default(''),
  detailedDescription: z.string().default(''),
  gameplayLoop: z.string().default(''),
  referenceGames: z.string().default(''),
  constraints: z.string().default(''),
})

// ── V2 Sub-Schemas ────────────────────────────────────────────

const loreConfigSchema = z.object({
  worldDescription: z.string().default(''),
  factions: z.array(z.string()).default([]),
  flavorTextTone: z.string().default(''),
})

const matchStructureConfigSchema = z.object({
  matchDuration: z.string().default(''),
  turnStructure: z.string().default(''),
  roundsPerMatch: z.number().int().min(1).max(99).default(1),
  timePerTurn: z.number().min(0).max(600).default(60),
  timePerTurnUnit: z.string().default('seconds'),
  ropeTimer: z.boolean().default(false),
})

const musicDetailConfigSchema = z.object({
  tempo: z.string().default(''),
  dynamicLayers: z.string().default(''),
  transitionStyle: z.string().default(''),
  combatIntensity: z.string().default(''),
  explorationMood: z.string().default(''),
  menuTheme: z.string().default(''),
  bossTheme: z.string().default(''),
  victoryTheme: z.string().default(''),
})

const soundEffectsDetailConfigSchema = z.object({
  uiFeedback: z.string().default(''),
  environmentAmbience: z.string().default(''),
  combatSounds: z.string().default(''),
  footsteps: z.string().default(''),
  weatherSounds: z.string().default(''),
  creatureVocals: z.string().default(''),
  impactSounds: z.string().default(''),
  magicEffects: z.string().default(''),
})

const hapticFeedbackConfigSchema = z.object({
  enabled: z.boolean().default(false),
  platform: z.string().default(''),
  events: z.array(z.string()).default([]),
})

const technicalConstraintsConfigSchema = z.object({
  minRAM: z.string().default(''),
  minGPU: z.string().default(''),
  minCPU: z.string().default(''),
  storageSize: z.string().default(''),
  networkBandwidth: z.string().default(''),
  maxLoadTime: z.string().default(''),
  targetResolution: z.string().default(''),
})

const performanceBudgetsConfigSchema = z.object({
  drawCalls: z.string().default(''),
  triangleCount: z.string().default(''),
  textureMemory: z.string().default(''),
  audioChannels: z.string().default(''),
})

const monetizationDetailConfigSchema = z.object({
  premiumCurrency: z.string().default(''),
  softCurrency: z.string().default(''),
  iapTiers: z.string().default(''),
  adPlacement: z.string().default(''),
  seasonPassDuration: z.string().default(''),
  battlePassTiers: z.string().default(''),
})

const rewardEconomyConfigSchema = z.object({
  dailyRewardCycle: z.string().default(''),
  firstPurchaseBonus: z.string().default(''),
  vipTiers: z.string().default(''),
  referralReward: z.string().default(''),
})

const aiOpponentConfigSchema = z.object({
  difficultyTiers: z.string().default(''),
  personality: z.string().default(''),
  cheatingEnabled: z.boolean().default(false),
})

const cardRarityEntrySchema = z.object({
  rarity: z.string(),
  percentage: z.number().min(0).max(100).default(0),
  dropRate: z.number().min(0).max(100).default(0),
  craftCost: z.number().min(0).default(0),
})

const cardElementSchema = z.object({
  name: z.string().default(''),
  color: z.string().default('#000000'),
  chainBonus: z.string().default(''),
})

const resourceSystemConfigSchema = z.object({
  name: z.string().default('Mana'),
  startingAmount: z.number().int().min(0).default(0),
  gainPerTurn: z.number().int().min(0).default(1),
  maxCap: z.number().int().min(0).default(10),
  specialMechanic: z.string().default(''),
})

const cardSystemConfigSchema = z.object({
  totalCards: z.number().int().min(0).max(10000).default(100),
  expansionCadence: z.string().default(''),
  cardTypes: z.array(z.string()).default([]),
  costRange: z.object({ min: z.number().default(0), max: z.number().default(10) }).default({ min: 0, max: 10 }),
  powerRange: z.object({ min: z.number().default(0), max: z.number().default(10) }).default({ min: 0, max: 10 }),
  keywords: z.array(z.string()).default([]),
  rarityDistribution: z.array(cardRarityEntrySchema).default([
    { rarity: 'common', percentage: 50, dropRate: 70, craftCost: 50 },
    { rarity: 'uncommon', percentage: 25, dropRate: 20, craftCost: 100 },
    { rarity: 'rare', percentage: 15, dropRate: 8, craftCost: 300 },
    { rarity: 'epic', percentage: 7, dropRate: 1.8, craftCost: 800 },
    { rarity: 'legendary', percentage: 3, dropRate: 0.2, craftCost: 1600 },
  ]),
  elements: z.array(cardElementSchema).default([]),
  deckSize: z.object({ min: z.number().default(20), max: z.number().default(40) }).default({ min: 20, max: 40 }),
  maxCopiesPerCard: z.number().int().min(1).max(10).default(2),
  deckRestrictions: z.string().default(''),
  startingHandSize: z.number().int().min(1).max(20).default(5),
  drawPerTurn: z.number().int().min(0).max(10).default(1),
  mulliganAllowed: z.boolean().default(true),
  resourceSystem: resourceSystemConfigSchema.default({
    name: 'Mana',
    startingAmount: 0,
    gainPerTurn: 1,
    maxCap: 10,
    specialMechanic: '',
  }),
})

const visualIdentityConfigSchema = z.object({
  colorPalette: z.array(z.string()).max(5).default(['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#533483']),
  cardShape: z.string().default(''),
  cardBorder: z.string().default(''),
  cardIllustration: z.string().default(''),
  cardBack: z.string().default(''),
  uiStyle: z.string().default(''),
  fontStyle: z.string().default(''),
})

const animationsConfigSchema = z.object({
  cardPlay: z.string().default(''),
  combo: z.string().default(''),
  damage: z.string().default(''),
  victory: z.string().default(''),
  defeat: z.string().default(''),
  packOpening: z.string().default(''),
  legendary: z.string().default(''),
})

const targetAudienceConfigSchema = z.object({
  ageRange: z.string().default(''),
  demographic: z.string().default(''),
  sessionLength: z.string().default(''),
  experienceLevel: z.string().default(''),
})

const onboardingConfigSchema = z.object({
  steps: z.array(z.string()).default([]),
  skipAllowed: z.boolean().default(true),
  progressiveDisclosure: z.boolean().default(true),
})

const uxPrinciplesConfigSchema = z.object({
  maxClicksToAction: z.number().int().min(1).max(20).default(3),
  maxLoadTime: z.number().min(0).max(30).default(3),
  offlineFallback: z.boolean().default(false),
  undoSupport: z.boolean().default(false),
  autoSuggest: z.boolean().default(false),
})

const socialSystemConfigSchema = z.object({
  emotes: z.boolean().default(false),
  tournaments: z.boolean().default(false),
  replaySharing: z.boolean().default(false),
})

const accessibilityDetailConfigSchema = z.object({
  colorblindMode: z.boolean().default(false),
  screenReaderSupport: z.boolean().default(false),
  remappableControls: z.boolean().default(false),
  subtitleSize: z.string().default('medium'),
  highContrastMode: z.boolean().default(false),
})

const localizationConfigSchema = z.object({
  defaultLanguage: z.string().default('en'),
  launchLanguages: z.array(z.string()).default(['en']),
  rtlSupport: z.boolean().default(false),
  textExpansionBuffer: z.number().min(0).max(100).default(30),
})

const contentPlanConfigSchema = z.object({
  mvpFeatures: z.array(z.string()).default([]),
  mvpTimeline: z.string().default(''),
  softLaunchFeatures: z.array(z.string()).default([]),
  softLaunchTimeline: z.string().default(''),
  fullLaunchFeatures: z.array(z.string()).default([]),
  fullLaunchTimeline: z.string().default(''),
  postLaunchFeatures: z.array(z.string()).default([]),
  postLaunchTimeline: z.string().default(''),
})

const analyticsConfigSchema = z.object({
  trackingPlatform: z.string().default(''),
  keyMetrics: z.array(z.string()).default([]),
  abTesting: z.boolean().default(false),
  privacyCompliance: z.string().default(''),
})

const gameplayLoopConfigSchema = z.object({
  microLoop: z.string().default(''),
  sessionLoop: z.string().default(''),
  progressionLoop: z.string().default(''),
  engagementLoop: z.string().default(''),
})

// ── Main Schema ───────────────────────────────────────────────

export const gamePresetConfigSchema = z.object({
  // Step 1
  importedProjectId: z.string().nullable().default(null),
  importMode: z.enum(['full', 'config-only', 'assets-only', '']).default(''),
  // Step 2
  themes: z.array(z.string()).max(3).default([]),
  customTheme: z.string().max(1000).default(''),
  elevatorPitch: z.string().max(1000).default(''),
  tagline: z.string().max(120).default(''),
  // Step 3
  narrativeFocus: z.string().default(''),
  storyStructure: z.string().default(''),
  victoryCondition: z.string().default(''),
  lore: loreConfigSchema.default({ worldDescription: '', factions: [], flavorTextTone: '' }),
  // Step 4
  genres: z.array(z.string()).default([]),
  // Step 5
  platforms: z.array(z.string()).default([]),
  primaryPlatform: z.string().default(''),
  // Step 6
  dimension: z.string().default(''),
  artStyle: z.string().default(''),
  animationIntensity: z.string().default(''),
  // Step 7
  cameraStyle: z.string().default(''),
  // Step 8
  worldStructure: z.string().default(''),
  levelGeneration: z.string().default(''),
  worldScope: z.string().default(''),
  // Step 9
  playerMode: z.string().default(''),
  multiplayer: multiplayerConfigSchema.default({ maxPlayers: 4, networkModel: '', syncType: '' }),
  matchStructure: matchStructureConfigSchema.default({
    matchDuration: '', turnStructure: '', roundsPerMatch: 1,
    timePerTurn: 60, timePerTurnUnit: 'seconds', ropeTimer: false,
  }),
  // Step 10
  coreMechanics: z.array(z.string()).max(3).default([]),
  // Step 11
  secondaryMechanics: z.array(z.string()).default([]),
  // Step 12
  progressionSystems: z.array(z.string()).default([]),
  difficulty: z.string().default(''),
  rewardTypes: z.array(z.string()).default([]),
  // Step 13
  musicStyle: z.string().default(''),
  soundEffects: z.array(z.string()).default([]),
  voiceActing: z.string().default(''),
  musicConfig: musicDetailConfigSchema.default({
    tempo: '', dynamicLayers: '', transitionStyle: '', combatIntensity: '',
    explorationMood: '', menuTheme: '', bossTheme: '', victoryTheme: '',
  }),
  soundEffectsConfig: soundEffectsDetailConfigSchema.default({
    uiFeedback: '', environmentAmbience: '', combatSounds: '', footsteps: '',
    weatherSounds: '', creatureVocals: '', impactSounds: '', magicEffects: '',
  }),
  hapticFeedback: hapticFeedbackConfigSchema.default({ enabled: false, platform: '', events: [] }),
  // Step 14
  engine: z.string().default(''),
  targetFps: z.string().default(''),
  additionalTech: z.array(z.string()).default([]),
  technicalConstraints: technicalConstraintsConfigSchema.default({
    minRAM: '', minGPU: '', minCPU: '', storageSize: '',
    networkBandwidth: '', maxLoadTime: '', targetResolution: '',
  }),
  performanceBudgets: performanceBudgetsConfigSchema.default({
    drawCalls: '', triangleCount: '', textureMemory: '', audioChannels: '',
  }),
  // Step 15
  businessModel: z.string().default(''),
  distribution: z.array(z.string()).default([]),
  monetizationDetail: monetizationDetailConfigSchema.default({
    premiumCurrency: '', softCurrency: '', iapTiers: '', adPlacement: '',
    seasonPassDuration: '', battlePassTiers: '',
  }),
  rewardEconomy: rewardEconomyConfigSchema.default({
    dailyRewardCycle: '', firstPurchaseBonus: '', vipTiers: '', referralReward: '',
  }),
  // Step 16
  aiFreetext: aiFreetextSchema.default({
    inGameAi: [], devAi: [], additionalNotes: '',
    detailedDescription: '', gameplayLoop: '', referenceGames: '', constraints: '',
  }),
  aiOpponent: aiOpponentConfigSchema.default({ difficultyTiers: '', personality: '', cheatingEnabled: false }),
  // Step 17: Card System
  cardSystem: cardSystemConfigSchema.default({
    totalCards: 100, expansionCadence: '', cardTypes: [],
    costRange: { min: 0, max: 10 }, powerRange: { min: 0, max: 10 },
    keywords: [],
    rarityDistribution: [
      { rarity: 'common', percentage: 50, dropRate: 70, craftCost: 50 },
      { rarity: 'uncommon', percentage: 25, dropRate: 20, craftCost: 100 },
      { rarity: 'rare', percentage: 15, dropRate: 8, craftCost: 300 },
      { rarity: 'epic', percentage: 7, dropRate: 1.8, craftCost: 800 },
      { rarity: 'legendary', percentage: 3, dropRate: 0.2, craftCost: 1600 },
    ],
    elements: [], deckSize: { min: 20, max: 40 }, maxCopiesPerCard: 2,
    deckRestrictions: '', startingHandSize: 5, drawPerTurn: 1, mulliganAllowed: true,
    resourceSystem: { name: 'Mana', startingAmount: 0, gainPerTurn: 1, maxCap: 10, specialMechanic: '' },
  }),
  // Step 19: Card Visual
  visualIdentity: visualIdentityConfigSchema.default({
    colorPalette: ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#533483'],
    cardShape: '', cardBorder: '', cardIllustration: '', cardBack: '', uiStyle: '', fontStyle: '',
  }),
  animations: animationsConfigSchema.default({
    cardPlay: '', combo: '', damage: '', victory: '', defeat: '', packOpening: '', legendary: '',
  }),
  // Step 20: Target Audience
  targetAudience: targetAudienceConfigSchema.default({
    ageRange: '', demographic: '', sessionLength: '', experienceLevel: '',
  }),
  tutorialStyle: z.string().default(''),
  onboarding: onboardingConfigSchema.default({ steps: [], skipAllowed: true, progressiveDisclosure: true }),
  uxPrinciples: uxPrinciplesConfigSchema.default({
    maxClicksToAction: 3, maxLoadTime: 3, offlineFallback: false, undoSupport: false, autoSuggest: false,
  }),
  // Step 21: Social & Retention
  socialFeatures: z.array(z.string()).default([]),
  retentionMechanics: z.array(z.string()).default([]),
  socialConfig: socialSystemConfigSchema.default({ emotes: false, tournaments: false, replaySharing: false }),
  // Step 22: Accessibility
  accessibilityFeatures: z.array(z.string()).default([]),
  accessibilityConfig: accessibilityDetailConfigSchema.default({
    colorblindMode: false, screenReaderSupport: false, remappableControls: false,
    subtitleSize: 'medium', highContrastMode: false,
  }),
  localization: localizationConfigSchema.default({
    defaultLanguage: 'en', launchLanguages: ['en'], rtlSupport: false, textExpansionBuffer: 30,
  }),
  // Step 23: Content Plan
  contentPlan: contentPlanConfigSchema.default({
    mvpFeatures: [], mvpTimeline: '', softLaunchFeatures: [], softLaunchTimeline: '',
    fullLaunchFeatures: [], fullLaunchTimeline: '', postLaunchFeatures: [], postLaunchTimeline: '',
  }),
  analytics: analyticsConfigSchema.default({
    trackingPlatform: '', keyMetrics: [], abTesting: false, privacyCompliance: '',
  }),
  // Step 24: Advanced
  gameplayLoopStructured: gameplayLoopConfigSchema.default({
    microLoop: '', sessionLoop: '', progressionLoop: '', engagementLoop: '',
  }),
  offlineMode: z.boolean().default(false),
  offlineModeScope: z.string().default(''),
  pwaSupport: z.boolean().default(false),
})

export const defaultGamePresetConfig: GamePresetConfig = {
  importedProjectId: null,
  importMode: '',
  themes: [],
  customTheme: '',
  elevatorPitch: '',
  tagline: '',
  narrativeFocus: '',
  storyStructure: '',
  victoryCondition: '',
  lore: { worldDescription: '', factions: [], flavorTextTone: '' },
  genres: [],
  platforms: [],
  primaryPlatform: '',
  dimension: '',
  artStyle: '',
  animationIntensity: '',
  cameraStyle: '',
  worldStructure: '',
  levelGeneration: '',
  worldScope: '',
  playerMode: '',
  multiplayer: { maxPlayers: 4, networkModel: '', syncType: '' },
  matchStructure: {
    matchDuration: '', turnStructure: '', roundsPerMatch: 1,
    timePerTurn: 60, timePerTurnUnit: 'seconds', ropeTimer: false,
  },
  coreMechanics: [],
  secondaryMechanics: [],
  progressionSystems: [],
  difficulty: '',
  rewardTypes: [],
  musicStyle: '',
  soundEffects: [],
  voiceActing: '',
  musicConfig: {
    tempo: '', dynamicLayers: '', transitionStyle: '', combatIntensity: '',
    explorationMood: '', menuTheme: '', bossTheme: '', victoryTheme: '',
  },
  soundEffectsConfig: {
    uiFeedback: '', environmentAmbience: '', combatSounds: '', footsteps: '',
    weatherSounds: '', creatureVocals: '', impactSounds: '', magicEffects: '',
  },
  hapticFeedback: { enabled: false, platform: '', events: [] },
  engine: '',
  targetFps: '',
  additionalTech: [],
  technicalConstraints: {
    minRAM: '', minGPU: '', minCPU: '', storageSize: '',
    networkBandwidth: '', maxLoadTime: '', targetResolution: '',
  },
  performanceBudgets: { drawCalls: '', triangleCount: '', textureMemory: '', audioChannels: '' },
  businessModel: '',
  distribution: [],
  monetizationDetail: {
    premiumCurrency: '', softCurrency: '', iapTiers: '', adPlacement: '',
    seasonPassDuration: '', battlePassTiers: '',
  },
  rewardEconomy: { dailyRewardCycle: '', firstPurchaseBonus: '', vipTiers: '', referralReward: '' },
  aiFreetext: {
    inGameAi: [], devAi: [], additionalNotes: '',
    detailedDescription: '', gameplayLoop: '', referenceGames: '', constraints: '',
  },
  aiOpponent: { difficultyTiers: '', personality: '', cheatingEnabled: false },
  cardSystem: {
    totalCards: 100, expansionCadence: '', cardTypes: [],
    costRange: { min: 0, max: 10 }, powerRange: { min: 0, max: 10 },
    keywords: [],
    rarityDistribution: [
      { rarity: 'common', percentage: 50, dropRate: 70, craftCost: 50 },
      { rarity: 'uncommon', percentage: 25, dropRate: 20, craftCost: 100 },
      { rarity: 'rare', percentage: 15, dropRate: 8, craftCost: 300 },
      { rarity: 'epic', percentage: 7, dropRate: 1.8, craftCost: 800 },
      { rarity: 'legendary', percentage: 3, dropRate: 0.2, craftCost: 1600 },
    ],
    elements: [], deckSize: { min: 20, max: 40 }, maxCopiesPerCard: 2,
    deckRestrictions: '', startingHandSize: 5, drawPerTurn: 1, mulliganAllowed: true,
    resourceSystem: { name: 'Mana', startingAmount: 0, gainPerTurn: 1, maxCap: 10, specialMechanic: '' },
  },
  visualIdentity: {
    colorPalette: ['#1a1a2e', '#16213e', '#0f3460', '#e94560', '#533483'],
    cardShape: '', cardBorder: '', cardIllustration: '', cardBack: '', uiStyle: '', fontStyle: '',
  },
  animations: {
    cardPlay: '', combo: '', damage: '', victory: '', defeat: '', packOpening: '', legendary: '',
  },
  targetAudience: { ageRange: '', demographic: '', sessionLength: '', experienceLevel: '' },
  tutorialStyle: '',
  onboarding: { steps: [], skipAllowed: true, progressiveDisclosure: true },
  uxPrinciples: {
    maxClicksToAction: 3, maxLoadTime: 3, offlineFallback: false, undoSupport: false, autoSuggest: false,
  },
  socialFeatures: [],
  retentionMechanics: [],
  socialConfig: { emotes: false, tournaments: false, replaySharing: false },
  accessibilityFeatures: [],
  accessibilityConfig: {
    colorblindMode: false, screenReaderSupport: false, remappableControls: false,
    subtitleSize: 'medium', highContrastMode: false,
  },
  localization: { defaultLanguage: 'en', launchLanguages: ['en'], rtlSupport: false, textExpansionBuffer: 30 },
  contentPlan: {
    mvpFeatures: [], mvpTimeline: '', softLaunchFeatures: [], softLaunchTimeline: '',
    fullLaunchFeatures: [], fullLaunchTimeline: '', postLaunchFeatures: [], postLaunchTimeline: '',
  },
  analytics: { trackingPlatform: '', keyMetrics: [], abTesting: false, privacyCompliance: '' },
  gameplayLoopStructured: { microLoop: '', sessionLoop: '', progressionLoop: '', engagementLoop: '' },
  offlineMode: false,
  offlineModeScope: '',
  pwaSupport: false,
}
