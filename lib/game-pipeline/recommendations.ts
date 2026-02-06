import type { GamePresetConfig } from './types'

/**
 * Rule-based AI recommendations for steps 11-16.
 * Returns arrays of recommended option values based on prior selections.
 */

export function getSecondaryMechanicsRecommendations(config: GamePresetConfig): string[] {
  const recs: string[] = []
  const { genres, coreMechanics } = config

  if (genres.includes('rpg') || coreMechanics.includes('dialogue')) {
    recs.push('companions', 'reputation', 'diplomacy')
  }
  if (genres.includes('survival') || genres.includes('sandbox')) {
    recs.push('crafting', 'farming', 'base-building')
  }
  if (genres.includes('adventure') || coreMechanics.includes('exploration')) {
    recs.push('photography', 'fishing', 'mini-games')
  }
  if (genres.includes('simulation')) {
    recs.push('weather-system', 'day-night', 'trading')
  }
  if (genres.includes('stealth') || genres.includes('action')) {
    recs.push('hacking', 'crafting')
  }

  return [...new Set(recs)]
}

export function getProgressionRecommendations(config: GamePresetConfig): {
  systems: string[]
  difficulty: string[]
  rewards: string[]
} {
  const systems: string[] = []
  const difficulty: string[] = []
  const rewards: string[] = []

  const { genres, victoryCondition } = config

  if (genres.includes('rpg')) {
    systems.push('xp-levels', 'skill-tree', 'equipment-loot')
    rewards.push('items', 'abilities')
  }
  if (genres.includes('roguelike')) {
    systems.push('prestige', 'unlock-system')
    rewards.push('abilities', 'cosmetics')
  }
  if (genres.includes('action') || genres.includes('platformer')) {
    systems.push('mastery', 'unlock-system')
    rewards.push('areas', 'cosmetics')
  }
  if (genres.includes('idle')) {
    systems.push('prestige', 'xp-levels')
    rewards.push('currency')
  }

  if (victoryCondition === 'competitive') {
    difficulty.push('selectable')
  } else if (genres.includes('roguelike')) {
    difficulty.push('scaling')
  } else {
    difficulty.push('selectable', 'adaptive')
  }

  if (victoryCondition === 'story-completion') {
    systems.push('story-progress')
    rewards.push('story-content')
  }

  return {
    systems: [...new Set(systems)],
    difficulty: [...new Set(difficulty)],
    rewards: [...new Set(rewards)],
  }
}

export function getAudioRecommendations(config: GamePresetConfig): {
  music: string[]
  sfx: string[]
  voice: string[]
} {
  const music: string[] = []
  const sfx: string[] = []
  const voice: string[] = []

  const { themes, genres } = config

  if (themes.includes('horror')) {
    music.push('minimal-drone', 'ambient')
    sfx.push('foley')
  }
  if (themes.includes('fantasy') || themes.includes('medieval')) {
    music.push('orchestral', 'folk')
  }
  if (themes.includes('sci-fi') || themes.includes('cyberpunk')) {
    music.push('electronic')
    sfx.push('stylized')
  }
  if (themes.includes('cartoon') || themes.includes('abstract')) {
    music.push('chiptune', 'electronic')
    sfx.push('stylized', 'retro')
  }
  if (genres.includes('action') || genres.includes('shooter')) {
    music.push('rock-metal')
    sfx.push('realistic')
  }
  if (genres.includes('rpg') || genres.includes('adventure')) {
    music.push('orchestral', 'adaptive')
    voice.push('full', 'partial')
  }
  if (genres.includes('visual-novel')) {
    voice.push('full')
  }
  if (genres.includes('puzzle') || genres.includes('idle')) {
    music.push('ambient')
    sfx.push('minimal')
    voice.push('none')
  }

  return {
    music: [...new Set(music)],
    sfx: [...new Set(sfx)],
    voice: [...new Set(voice)],
  }
}

export function getEngineRecommendations(config: GamePresetConfig): {
  engine: string[]
  fps: string[]
  tech: string[]
} {
  const engine: string[] = []
  const fps: string[] = []
  const tech: string[] = []

  const { dimension, platforms, playerMode, genres } = config
  const hasWeb = platforms.includes('web')
  const hasMobile = platforms.includes('mobile-ios') || platforms.includes('mobile-android')
  const hasConsole = platforms.some((p) => p.startsWith('console-'))

  if (dimension === '2d') {
    if (hasWeb) {
      engine.push('phaser3', 'pixijs')
    } else {
      engine.push('godot', 'gamemaker')
    }
  } else if (dimension === '3d') {
    if (hasWeb) {
      engine.push('threejs')
    }
    engine.push('unity', 'godot')
    if (hasConsole) {
      engine.push('unreal')
    }
  } else {
    engine.push('unity', 'godot')
  }

  if (genres.includes('rpg') && dimension === '2d') {
    engine.push('rpgmaker')
  }

  if (hasMobile) {
    fps.push('30', '60')
  } else if (hasConsole) {
    fps.push('60')
  } else {
    fps.push('60', '120')
  }

  if (playerMode === 'online-multiplayer' || playerMode === 'mmo' || playerMode === 'co-op') {
    tech.push('networking')
  }
  if (genres.includes('roguelike') || genres.includes('sandbox')) {
    tech.push('procedural-gen')
  }
  if (dimension === '3d') {
    tech.push('physics-engine', 'ai-navigation')
  }

  return {
    engine: [...new Set(engine)],
    fps: [...new Set(fps)],
    tech: [...new Set(tech)],
  }
}

export function getMonetizationRecommendations(config: GamePresetConfig): {
  model: string[]
  distribution: string[]
} {
  const model: string[] = []
  const distribution: string[] = []

  const { platforms, genres } = config
  const hasMobile = platforms.includes('mobile-ios') || platforms.includes('mobile-android')
  const hasPC = platforms.some((p) => p.startsWith('pc-'))
  const hasWeb = platforms.includes('web')
  const hasConsole = platforms.some((p) => p.startsWith('console-'))

  if (hasMobile) {
    model.push('free-to-play', 'ad-supported')
    if (platforms.includes('mobile-ios')) distribution.push('app-store')
    if (platforms.includes('mobile-android')) distribution.push('google-play')
  }
  if (hasPC) {
    model.push('premium')
    distribution.push('steam')
    if (genres.includes('indie') || genres.includes('puzzle')) {
      distribution.push('itch')
    }
  }
  if (hasWeb) {
    model.push('free-to-play', 'donation')
    distribution.push('web', 'itch')
  }
  if (hasConsole) {
    model.push('premium')
    distribution.push('console-store')
  }
  if (genres.includes('mmo') || genres.includes('idle')) {
    model.push('free-to-play', 'subscription')
  }

  return {
    model: [...new Set(model)],
    distribution: [...new Set(distribution)],
  }
}
