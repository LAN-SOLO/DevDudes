import { z } from 'zod'
import type { GamePresetConfig } from '@/lib/game-pipeline/types'

const multiplayerConfigSchema = z.object({
  maxPlayers: z.number().int().min(2).max(1000).default(4),
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

export const gamePresetConfigSchema = z.object({
  // Step 1
  importedProjectId: z.string().nullable().default(null),
  importMode: z.enum(['full', 'config-only', 'assets-only', '']).default(''),
  // Step 2
  themes: z.array(z.string()).max(3).default([]),
  customTheme: z.string().max(100).default(''),
  elevatorPitch: z.string().max(500).default(''),
  // Step 3
  narrativeFocus: z.string().default(''),
  storyStructure: z.string().default(''),
  victoryCondition: z.string().default(''),
  // Step 4
  genres: z.array(z.string()).default([]),
  // Step 5
  platforms: z.array(z.string()).default([]),
  primaryPlatform: z.string().default(''),
  // Step 6
  dimension: z.string().default(''),
  artStyle: z.string().default(''),
  // Step 7
  cameraStyle: z.string().default(''),
  // Step 8
  worldStructure: z.string().default(''),
  levelGeneration: z.string().default(''),
  worldScope: z.string().default(''),
  // Step 9
  playerMode: z.string().default(''),
  multiplayer: multiplayerConfigSchema.default({ maxPlayers: 4, networkModel: '', syncType: '' }),
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
  // Step 14
  engine: z.string().default(''),
  targetFps: z.string().default(''),
  additionalTech: z.array(z.string()).default([]),
  // Step 15
  businessModel: z.string().default(''),
  distribution: z.array(z.string()).default([]),
  // Step 16
  aiFreetext: aiFreetextSchema.default({
    inGameAi: [],
    devAi: [],
    additionalNotes: '',
    detailedDescription: '',
    gameplayLoop: '',
    referenceGames: '',
    constraints: '',
  }),
})

export const defaultGamePresetConfig: GamePresetConfig = {
  importedProjectId: null,
  importMode: '',
  themes: [],
  customTheme: '',
  elevatorPitch: '',
  narrativeFocus: '',
  storyStructure: '',
  victoryCondition: '',
  genres: [],
  platforms: [],
  primaryPlatform: '',
  dimension: '',
  artStyle: '',
  cameraStyle: '',
  worldStructure: '',
  levelGeneration: '',
  worldScope: '',
  playerMode: '',
  multiplayer: { maxPlayers: 4, networkModel: '', syncType: '' },
  coreMechanics: [],
  secondaryMechanics: [],
  progressionSystems: [],
  difficulty: '',
  rewardTypes: [],
  musicStyle: '',
  soundEffects: [],
  voiceActing: '',
  engine: '',
  targetFps: '',
  additionalTech: [],
  businessModel: '',
  distribution: [],
  aiFreetext: {
    inGameAi: [],
    devAi: [],
    additionalNotes: '',
    detailedDescription: '',
    gameplayLoop: '',
    referenceGames: '',
    constraints: '',
  },
}
