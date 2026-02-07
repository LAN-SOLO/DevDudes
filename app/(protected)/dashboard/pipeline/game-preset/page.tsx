'use client'

import { useRef } from 'react'
import { GameWizard, GameWizardHandle } from '@/components/dudes/game/game-wizard'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Button } from '@/components/ui/button'
import { Upload, Download } from 'lucide-react'
import {
  THEME_OPTIONS,
  GENRE_OPTIONS,
  PLATFORM_OPTIONS,
  DIMENSION_OPTIONS,
  ART_STYLE_OPTIONS,
  CORE_MECHANICS_OPTIONS,
  SECONDARY_MECHANICS_OPTIONS,
  ENGINE_OPTIONS,
  BUSINESS_MODEL_OPTIONS,
  DISTRIBUTION_OPTIONS,
  NARRATIVE_FOCUS_OPTIONS,
  STORY_STRUCTURE_OPTIONS,
  VICTORY_CONDITION_OPTIONS,
  WORLD_STRUCTURE_OPTIONS,
  LEVEL_GENERATION_OPTIONS,
  WORLD_SCOPE_OPTIONS,
  PLAYER_MODE_OPTIONS,
  PROGRESSION_SYSTEM_OPTIONS,
  DIFFICULTY_OPTIONS,
  MUSIC_STYLE_OPTIONS,
  SOUND_EFFECT_OPTIONS,
  VOICE_ACTING_OPTIONS,
  TARGET_FPS_OPTIONS,
  ADDITIONAL_TECH_OPTIONS,
  CAMERA_OPTIONS_2D,
  CAMERA_OPTIONS_25D,
  CAMERA_OPTIONS_3D,
  NETWORK_MODEL_OPTIONS,
  SYNC_TYPE_OPTIONS,
  REWARD_TYPE_OPTIONS,
  IN_GAME_AI_OPTIONS,
  DEV_AI_OPTIONS,
  CARD_RARITY_OPTIONS,
  CARD_TYPE_OPTIONS,
  ANIMATION_INTENSITY_OPTIONS,
  TUTORIAL_STYLE_OPTIONS,
  MATCH_DURATION_OPTIONS,
  SOCIAL_FEATURE_OPTIONS,
  RETENTION_MECHANIC_OPTIONS,
  ACCESSIBILITY_FEATURE_OPTIONS,
} from '@/lib/game-pipeline/constants'

function buildTemplate() {
  const vals = (opts: { value: string }[]) => opts.map((o) => o.value)
  return {
    _comment: 'Game Dude Import Template — fill in your values, then import via the Import Config button.',
    _validOptions: {
      'themes (max 3)': vals(THEME_OPTIONS),
      narrativeFocus: vals(NARRATIVE_FOCUS_OPTIONS),
      storyStructure: vals(STORY_STRUCTURE_OPTIONS),
      victoryCondition: vals(VICTORY_CONDITION_OPTIONS),
      genres: vals(GENRE_OPTIONS),
      platforms: vals(PLATFORM_OPTIONS),
      dimension: vals(DIMENSION_OPTIONS),
      artStyle: vals(ART_STYLE_OPTIONS),
      'cameraStyle (2D)': vals(CAMERA_OPTIONS_2D),
      'cameraStyle (2.5D)': vals(CAMERA_OPTIONS_25D),
      'cameraStyle (3D)': vals(CAMERA_OPTIONS_3D),
      worldStructure: vals(WORLD_STRUCTURE_OPTIONS),
      levelGeneration: vals(LEVEL_GENERATION_OPTIONS),
      worldScope: vals(WORLD_SCOPE_OPTIONS),
      playerMode: vals(PLAYER_MODE_OPTIONS),
      networkModel: vals(NETWORK_MODEL_OPTIONS),
      syncType: vals(SYNC_TYPE_OPTIONS),
      'coreMechanics (max 3)': vals(CORE_MECHANICS_OPTIONS),
      secondaryMechanics: vals(SECONDARY_MECHANICS_OPTIONS),
      progressionSystems: vals(PROGRESSION_SYSTEM_OPTIONS),
      difficulty: vals(DIFFICULTY_OPTIONS),
      rewardTypes: vals(REWARD_TYPE_OPTIONS),
      musicStyle: vals(MUSIC_STYLE_OPTIONS),
      soundEffects: vals(SOUND_EFFECT_OPTIONS),
      voiceActing: vals(VOICE_ACTING_OPTIONS),
      engine: vals(ENGINE_OPTIONS),
      targetFps: vals(TARGET_FPS_OPTIONS),
      additionalTech: vals(ADDITIONAL_TECH_OPTIONS),
      businessModel: vals(BUSINESS_MODEL_OPTIONS),
      distribution: vals(DISTRIBUTION_OPTIONS),
      inGameAi: vals(IN_GAME_AI_OPTIONS),
      devAi: vals(DEV_AI_OPTIONS),
      cardRarity: vals(CARD_RARITY_OPTIONS),
      cardTypes: vals(CARD_TYPE_OPTIONS),
      animationIntensity: vals(ANIMATION_INTENSITY_OPTIONS),
      tutorialStyle: vals(TUTORIAL_STYLE_OPTIONS),
      matchDuration: vals(MATCH_DURATION_OPTIONS),
      socialFeatures: vals(SOCIAL_FEATURE_OPTIONS),
      retentionMechanics: vals(RETENTION_MECHANIC_OPTIONS),
      accessibilityFeatures: vals(ACCESSIBILITY_FEATURE_OPTIONS),
    },
    themes: ['fantasy'],
    customTheme: '',
    elevatorPitch: 'A short description of your game concept',
    tagline: '',
    narrativeFocus: 'story-driven',
    storyStructure: 'branching',
    victoryCondition: 'boss-defeat',
    genres: ['action', 'rpg'],
    platforms: ['pc-windows', 'console-playstation'],
    primaryPlatform: 'pc-windows',
    dimension: '3d',
    artStyle: 'stylized',
    animationIntensity: 'medium',
    cameraStyle: 'third-person',
    worldStructure: 'open-world',
    levelGeneration: 'hand-crafted',
    worldScope: 'large',
    playerMode: 'single-player',
    multiplayer: { maxPlayers: 4, networkModel: '', syncType: '' },
    coreMechanics: ['combat-melee', 'exploration'],
    secondaryMechanics: ['crafting', 'companions'],
    progressionSystems: ['xp-levels', 'skill-tree', 'equipment-loot'],
    difficulty: 'selectable',
    rewardTypes: ['items', 'abilities', 'areas'],
    musicStyle: 'orchestral',
    soundEffects: ['realistic', 'foley'],
    voiceActing: 'full',
    engine: 'unreal',
    targetFps: '60',
    additionalTech: ['physics-engine', 'ai-navigation'],
    businessModel: 'premium',
    distribution: ['steam', 'epic', 'console-store'],
    aiFreetext: {
      inGameAi: ['npc-behavior', 'enemy-ai'],
      devAi: ['code-generation', 'testing'],
      detailedDescription: '',
      gameplayLoop: '',
      referenceGames: '',
      constraints: '',
      additionalNotes: '',
    },
    socialFeatures: [],
    retentionMechanics: [],
    accessibilityFeatures: [],
    offlineMode: false,
    pwaSupport: false,
  }
}

export default function GamePresetPage() {
  const { t } = useTranslation()
  const wizardRef = useRef<GameWizardHandle>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const config = JSON.parse(event.target?.result as string)
        wizardRef.current?.importConfig(config)
      } catch {
        // Invalid JSON - ignore
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleDownloadTemplate = () => {
    const template = buildTemplate()
    const json = JSON.stringify(template, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'game-config-template.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t('pipeline.dudes.gamePreset.name')}
          </h2>
          <p className="text-muted-foreground">
            {t('pipeline.dudes.gamePreset.description')}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <Download className="mr-2 h-4 w-4" />
            {t('game.common.downloadTemplate')}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button variant="outline" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            {t('game.common.importConfig')}
          </Button>
        </div>
      </div>
      <GameWizard ref={wizardRef} />
    </div>
  )
}
