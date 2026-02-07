import type { GamePresetConfig, GameAnalysisReport, AnalysisWarning } from './types'
import { isCardGame } from './constants'

/**
 * Rule-based game analysis that evaluates the configuration
 * for complexity, compatibility issues, and provides suggestions.
 */
export function analyzeGameConfig(config: GamePresetConfig): GameAnalysisReport {
  const warnings: AnalysisWarning[] = []
  const suggestions: string[] = []
  const compatibilityIssues: string[] = []
  let complexityPoints = 0

  // ── Complexity Scoring ────────────────────────────────────

  // Dimension complexity
  if (config.dimension === '3d') complexityPoints += 3
  else if (config.dimension === '2.5d') complexityPoints += 2
  else if (config.dimension === '2d') complexityPoints += 1

  // Platform count
  complexityPoints += Math.min(config.platforms.length, 3)
  if (config.platforms.length > 3) {
    warnings.push({
      severity: 'warning',
      message: `Targeting ${config.platforms.length} platforms significantly increases development and testing effort.`,
      field: 'platforms',
    })
  }

  // Genre complexity
  if (config.genres.includes('mmo') || config.genres.includes('rpg')) complexityPoints += 2
  if (config.genres.includes('simulation')) complexityPoints += 1
  if (config.genres.length > 3) complexityPoints += 1

  // Card game complexity
  if (isCardGame(config.genres)) {
    complexityPoints += 2
    const cs = config.cardSystem
    if (cs.totalCards > 200) complexityPoints += 1
    if (cs.rarityDistribution.length > 4) complexityPoints += 1
    if (cs.keywords.length > 10) complexityPoints += 1
  }

  // Multiplayer
  if (config.playerMode === 'online-multiplayer' || config.playerMode === 'mmo') {
    complexityPoints += 3
    if (config.playerMode === 'mmo') complexityPoints += 2
  } else if (config.playerMode === 'local-multiplayer' || config.playerMode === 'co-op') {
    complexityPoints += 1
  } else if (config.playerMode === 'async-multiplayer') {
    complexityPoints += 2
  }

  // World scope
  if (config.worldScope === 'massive') complexityPoints += 3
  else if (config.worldScope === 'large') complexityPoints += 2
  else if (config.worldScope === 'medium') complexityPoints += 1

  // Mechanics count
  complexityPoints += Math.min(config.coreMechanics.length + config.secondaryMechanics.length, 4)

  // Procedural generation
  if (config.levelGeneration === 'procedural' || config.levelGeneration === 'hybrid') {
    complexityPoints += 1
  }

  // Voice acting
  if (config.voiceActing === 'full') complexityPoints += 1

  // Social features add minor complexity
  complexityPoints += Math.min(Math.floor(config.socialFeatures.length / 3), 2)

  // Content plan affects scope
  if (config.contentPlan.mvpTimeline || config.contentPlan.fullLaunchTimeline) {
    complexityPoints += 1
  }

  // Cap at 10
  const complexityScore = Math.min(Math.max(Math.round(complexityPoints * 10 / 30), 1), 10)

  // ── Complexity Label ──────────────────────────────────────

  let complexityLabel: string
  if (complexityScore <= 2) complexityLabel = 'Simple'
  else if (complexityScore <= 4) complexityLabel = 'Moderate'
  else if (complexityScore <= 6) complexityLabel = 'Complex'
  else if (complexityScore <= 8) complexityLabel = 'Very Complex'
  else complexityLabel = 'Extremely Complex'

  // ── Compatibility Checks ──────────────────────────────────

  // VR + 2D incompatibility
  if (config.platforms.includes('vr') && config.dimension === '2d') {
    compatibilityIssues.push('VR platforms typically require 3D rendering. Consider switching to 3D or removing VR from target platforms.')
    warnings.push({
      severity: 'error',
      message: 'VR and 2D dimension are generally incompatible.',
      field: 'platforms',
    })
  }

  // MMO with simple engine
  const simpleEngines = ['phaser3', 'pixijs', 'rpgmaker', 'construct', 'gamemaker']
  if (config.playerMode === 'mmo' && simpleEngines.includes(config.engine)) {
    compatibilityIssues.push(`MMO games require robust networking infrastructure. ${config.engine} may not be suitable for MMO-scale multiplayer.`)
    warnings.push({
      severity: 'error',
      message: `Engine "${config.engine}" is not well-suited for MMO development.`,
      field: 'engine',
    })
  }

  // 3D with 2D engines
  const engines2d = ['phaser3', 'pixijs', 'rpgmaker', 'construct', 'gamemaker']
  if (config.dimension === '3d' && engines2d.includes(config.engine)) {
    compatibilityIssues.push(`${config.engine} is primarily a 2D engine. For 3D games, consider Unity, Unreal, Godot, Three.js, or Bevy.`)
    warnings.push({
      severity: 'error',
      message: `Engine "${config.engine}" does not support 3D rendering.`,
      field: 'engine',
    })
  }

  // Console targeting with web-only engines
  const webEngines = ['phaser3', 'pixijs', 'threejs']
  const hasConsole = config.platforms.some((p) => p.startsWith('console-'))
  if (hasConsole && webEngines.includes(config.engine)) {
    compatibilityIssues.push('Web-based engines cannot target console platforms directly. Consider Unity, Unreal, or Godot for console support.')
    warnings.push({
      severity: 'error',
      message: `Engine "${config.engine}" cannot compile for console platforms.`,
      field: 'engine',
    })
  }

  // Realistic art with pixel-art
  if (config.artStyle === 'pixel-art' && config.dimension === '3d') {
    warnings.push({
      severity: 'info',
      message: 'Pixel art in 3D is possible (e.g., texture filtering) but uncommon. Consider if "voxel" or "low-poly" might better serve your vision.',
      field: 'artStyle',
    })
  }

  // ── Missing Critical Selections ───────────────────────────

  if (config.themes.length === 0) {
    warnings.push({ severity: 'warning', message: 'No theme selected. A theme helps define the overall atmosphere.', field: 'themes' })
  }
  if (config.genres.length === 0) {
    warnings.push({ severity: 'warning', message: 'No genre selected. Genre is fundamental to game design.', field: 'genres' })
  }
  if (!config.engine) {
    warnings.push({ severity: 'warning', message: 'No engine selected. Engine choice affects all technical decisions.', field: 'engine' })
  }
  if (!config.dimension) {
    warnings.push({ severity: 'warning', message: 'No dimension selected. This is needed for proper engine recommendations.', field: 'dimension' })
  }
  if (config.platforms.length === 0) {
    warnings.push({ severity: 'warning', message: 'No target platforms selected.', field: 'platforms' })
  }

  // ── Suggestions ───────────────────────────────────────────

  if (config.worldScope === 'massive' && config.levelGeneration === 'hand-crafted') {
    suggestions.push('A massive world scope with hand-crafted levels requires significant content creation. Consider hybrid or procedural generation to reduce workload.')
  }

  if (config.playerMode !== 'single-player' && !config.additionalTech.includes('networking')) {
    suggestions.push('For multiplayer games, consider adding "Networking" to your additional technology stack.')
  }

  if (config.genres.includes('roguelike') && config.levelGeneration !== 'procedural' && config.levelGeneration !== 'hybrid') {
    suggestions.push('Roguelike games typically use procedural level generation. Consider switching from hand-crafted levels.')
  }

  if (config.platforms.length > 1 && !config.primaryPlatform) {
    suggestions.push('When targeting multiple platforms, selecting a primary platform helps prioritize development and testing.')
  }

  if (config.businessModel === 'free-to-play' && !config.genres.includes('idle') && config.secondaryMechanics.length === 0) {
    suggestions.push('Free-to-play games benefit from engagement mechanics (crafting, daily rewards, etc.). Consider adding secondary mechanics.')
  }

  if (config.dimension === '3d' && config.targetFps === '120') {
    suggestions.push('Targeting 120 FPS in 3D is demanding. Ensure your art style and engine choice support high-performance rendering.')
  }

  if (config.aiFreetext.inGameAi.length > 0 && !config.additionalTech.includes('ai-navigation')) {
    suggestions.push('If using in-game AI features, consider adding "AI Navigation" to your tech stack.')
  }

  // V2 warnings
  if (isCardGame(config.genres) && config.cardSystem.deckSize.min === 0 && config.cardSystem.deckSize.max === 0) {
    warnings.push({
      severity: 'warning',
      message: 'Card game detected but no deck rules configured. Define min/max deck size for balanced gameplay.',
      field: 'cardSystem',
    })
  }

  if (config.victoryCondition === 'competitive' && !config.aiFreetext.inGameAi.includes('matchmaking')) {
    suggestions.push('Competitive games benefit from matchmaking AI. Consider adding "Matchmaking" to your in-game AI options.')
  }

  if (['free-to-play', 'freemium', 'battle-pass'].includes(config.businessModel) && config.retentionMechanics.length === 0) {
    suggestions.push('F2P/freemium games rely on retention mechanics (daily rewards, season pass, etc.). Consider configuring retention features.')
  }

  if (config.playerMode === 'async-multiplayer' && !config.additionalTech.includes('websockets')) {
    suggestions.push('Async multiplayer typically requires WebSockets for real-time communication. Consider adding it to your tech stack.')
  }

  if (config.pwaSupport && !config.additionalTech.includes('service-worker-offline')) {
    suggestions.push('PWA support works best with service workers for offline capability. Consider adding "Service Worker / Offline" to your tech stack.')
  }

  if (config.accessibilityFeatures.length >= 5) {
    suggestions.push('Good accessibility coverage detected. Consider documenting your accessibility features for marketing and compliance.')
  }

  // ── Scope Estimate ────────────────────────────────────────

  let scopeEstimate: string
  if (complexityScore <= 2) {
    scopeEstimate = '1-3 months for a solo developer'
  } else if (complexityScore <= 4) {
    scopeEstimate = '3-6 months for a solo developer, or 2-3 months for a small team'
  } else if (complexityScore <= 6) {
    scopeEstimate = '6-12 months for a small team (2-4 developers)'
  } else if (complexityScore <= 8) {
    scopeEstimate = '12-24 months for a medium team (5-10 developers)'
  } else {
    scopeEstimate = '24+ months for a large team (10+ developers)'
  }

  // ── Tech Feasibility ──────────────────────────────────────

  const errorCount = warnings.filter((w) => w.severity === 'error').length
  let techFeasibility: 'high' | 'medium' | 'low'
  if (errorCount >= 2) techFeasibility = 'low'
  else if (errorCount === 1 || compatibilityIssues.length > 0) techFeasibility = 'medium'
  else techFeasibility = 'high'

  // ── Summary ───────────────────────────────────────────────

  const themeStr = config.themes.join(', ') || 'unspecified theme'
  const genreStr = config.genres.join(', ') || 'unspecified genre'
  const summary = `This is a ${complexityLabel.toLowerCase()} ${config.dimension || '?D'} ${genreStr} game with ${themeStr} themes, targeting ${config.platforms.length || 0} platform(s). ` +
    `The project has a complexity score of ${complexityScore}/10 with an estimated scope of ${scopeEstimate}. ` +
    `Technical feasibility is ${techFeasibility}${errorCount > 0 ? ` with ${errorCount} critical issue(s) to resolve` : ''}.` +
    (suggestions.length > 0 ? ` There are ${suggestions.length} improvement suggestion(s) to consider.` : '')

  return {
    complexityScore,
    complexityLabel,
    scopeEstimate,
    warnings,
    suggestions,
    compatibilityIssues,
    techFeasibility,
    summary,
  }
}
