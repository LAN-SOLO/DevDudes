import type { GamePresetConfig } from './types'
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
} from './constants'

function findLabel(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value
}

function mapLabels(options: { value: string; label: string }[], values: string[]): string {
  return values.map((v) => findLabel(options, v)).join(', ') || 'None selected'
}

function buildConfigSummary(config: GamePresetConfig): string {
  const sections: string[] = []

  sections.push(`## Game Concept`)
  sections.push(`- **Themes:** ${mapLabels(THEME_OPTIONS, config.themes)}`)
  if (config.customTheme) sections.push(`- **Custom Theme:** ${config.customTheme}`)
  if (config.elevatorPitch) sections.push(`- **Elevator Pitch:** ${config.elevatorPitch}`)

  sections.push(`\n## Narrative`)
  sections.push(`- **Focus:** ${findLabel(NARRATIVE_FOCUS_OPTIONS, config.narrativeFocus)}`)
  sections.push(`- **Structure:** ${findLabel(STORY_STRUCTURE_OPTIONS, config.storyStructure)}`)
  sections.push(`- **Victory Condition:** ${findLabel(VICTORY_CONDITION_OPTIONS, config.victoryCondition)}`)

  sections.push(`\n## Genre & Platform`)
  sections.push(`- **Genres:** ${mapLabels(GENRE_OPTIONS, config.genres)}`)
  sections.push(`- **Platforms:** ${mapLabels(PLATFORM_OPTIONS, config.platforms)}`)
  sections.push(`- **Primary Platform:** ${findLabel(PLATFORM_OPTIONS, config.primaryPlatform)}`)

  sections.push(`\n## Visual Style`)
  sections.push(`- **Dimension:** ${findLabel(DIMENSION_OPTIONS, config.dimension)}`)
  sections.push(`- **Art Style:** ${findLabel(ART_STYLE_OPTIONS, config.artStyle)}`)
  sections.push(`- **Camera:** ${config.cameraStyle || 'Not specified'}`)

  sections.push(`\n## World Design`)
  sections.push(`- **Structure:** ${findLabel(WORLD_STRUCTURE_OPTIONS, config.worldStructure)}`)
  sections.push(`- **Level Generation:** ${findLabel(LEVEL_GENERATION_OPTIONS, config.levelGeneration)}`)
  sections.push(`- **Scope:** ${findLabel(WORLD_SCOPE_OPTIONS, config.worldScope)}`)

  sections.push(`\n## Player & Mechanics`)
  sections.push(`- **Player Mode:** ${findLabel(PLAYER_MODE_OPTIONS, config.playerMode)}`)
  if (config.playerMode !== 'single-player') {
    sections.push(`- **Max Players:** ${config.multiplayer.maxPlayers}`)
    if (config.multiplayer.networkModel) sections.push(`- **Network:** ${config.multiplayer.networkModel}`)
  }
  sections.push(`- **Core Mechanics:** ${mapLabels(CORE_MECHANICS_OPTIONS, config.coreMechanics)}`)
  sections.push(`- **Secondary Mechanics:** ${mapLabels(SECONDARY_MECHANICS_OPTIONS, config.secondaryMechanics)}`)

  sections.push(`\n## Progression`)
  sections.push(`- **Systems:** ${mapLabels(PROGRESSION_SYSTEM_OPTIONS, config.progressionSystems)}`)
  sections.push(`- **Difficulty:** ${findLabel(DIFFICULTY_OPTIONS, config.difficulty)}`)

  sections.push(`\n## Audio`)
  sections.push(`- **Music:** ${findLabel(MUSIC_STYLE_OPTIONS, config.musicStyle)}`)
  sections.push(`- **SFX:** ${mapLabels(SOUND_EFFECT_OPTIONS, config.soundEffects)}`)
  sections.push(`- **Voice:** ${findLabel(VOICE_ACTING_OPTIONS, config.voiceActing)}`)

  sections.push(`\n## Technology`)
  sections.push(`- **Engine:** ${findLabel(ENGINE_OPTIONS, config.engine)}`)
  sections.push(`- **Target FPS:** ${findLabel(TARGET_FPS_OPTIONS, config.targetFps)}`)
  if (config.additionalTech.length > 0) {
    sections.push(`- **Additional Tech:** ${config.additionalTech.join(', ')}`)
  }

  sections.push(`\n## Business`)
  sections.push(`- **Model:** ${findLabel(BUSINESS_MODEL_OPTIONS, config.businessModel)}`)
  sections.push(`- **Distribution:** ${mapLabels(DISTRIBUTION_OPTIONS, config.distribution)}`)

  if (config.aiFreetext.detailedDescription || config.aiFreetext.gameplayLoop || config.aiFreetext.referenceGames) {
    sections.push(`\n## Additional Details`)
    if (config.aiFreetext.detailedDescription) {
      sections.push(`- **Detailed Description:** ${config.aiFreetext.detailedDescription}`)
    }
    if (config.aiFreetext.gameplayLoop) {
      sections.push(`- **Gameplay Loop:** ${config.aiFreetext.gameplayLoop}`)
    }
    if (config.aiFreetext.referenceGames) {
      sections.push(`- **Reference Games:** ${config.aiFreetext.referenceGames}`)
    }
    if (config.aiFreetext.constraints) {
      sections.push(`- **Constraints:** ${config.aiFreetext.constraints}`)
    }
    if (config.aiFreetext.additionalNotes) {
      sections.push(`- **Notes:** ${config.aiFreetext.additionalNotes}`)
    }
  }

  return sections.join('\n')
}

// ── Engine Data Helper ─────────────────────────────────────────

interface EngineInfo {
  language: string
  runtime: string
  buildTool: string
  ide: string
  packageManager: string
  projectStructure: string
  docsUrl: string
  errorPatterns: string
  antiPatterns: string
}

function getEngineInfo(engine: string): EngineInfo {
  const engines: Record<string, EngineInfo> = {
    unity: {
      language: 'C# (.NET)',
      runtime: 'Mono / IL2CPP',
      buildTool: 'Unity Build System',
      ide: 'Visual Studio / Rider',
      packageManager: 'Unity Package Manager (UPM)',
      projectStructure: `[project-name]/
├── Assets/
│   ├── Scripts/
│   │   ├── Core/           # Game managers, singletons
│   │   ├── Player/         # Player controller, input
│   │   ├── Enemies/        # Enemy AI, spawning
│   │   ├── UI/             # HUD, menus, dialogs
│   │   ├── Systems/        # Inventory, save, audio
│   │   └── Utils/          # Helpers, extensions
│   ├── Prefabs/            # Reusable game objects
│   ├── Scenes/             # Game scenes
│   ├── Materials/          # Shaders and materials
│   ├── Textures/           # Sprite sheets, textures
│   ├── Audio/              # Music and SFX
│   ├── Animations/         # Animation clips, controllers
│   └── Resources/          # Runtime-loaded assets
├── Packages/               # UPM packages
├── ProjectSettings/        # Unity project settings
└── .gitignore`,
      docsUrl: 'https://docs.unity3d.com/Manual/',
      errorPatterns: `- NullReferenceException → Always null-check GetComponent<T>() results
- Missing script references → Check serialized field assignments in Inspector
- Build errors on IL2CPP → Avoid reflection-heavy code, use [Preserve] attribute`,
      antiPatterns: `❌ DO NOT use Find() or FindObjectOfType() in Update loops
❌ DO NOT instantiate/destroy objects every frame — use object pooling
❌ DO NOT put game logic in MonoBehaviour.Start() without null checks
❌ DO NOT use public fields for serialization — use [SerializeField] private
❌ DO NOT ignore the Unity Event lifecycle order
❌ DO NOT hardcode layer/tag strings — use constants or enums`,
    },
    unreal: {
      language: 'C++ / Blueprints',
      runtime: 'Unreal Engine Runtime',
      buildTool: 'Unreal Build Tool (UBT)',
      ide: 'Visual Studio / Rider',
      packageManager: 'Unreal Marketplace / vcpkg',
      projectStructure: `[project-name]/
├── Source/
│   └── [ProjectName]/
│       ├── Core/           # Game instance, game mode, game state
│       ├── Player/         # Character, controller, input
│       ├── Enemies/        # AI controllers, behavior trees
│       ├── UI/             # Widgets, HUD
│       ├── Systems/        # Subsystems, managers
│       └── Utils/          # Helpers, macros
├── Content/
│   ├── Blueprints/         # Blueprint assets
│   ├── Maps/               # Level maps
│   ├── Materials/          # Material instances
│   ├── Textures/           # Texture assets
│   ├── Audio/              # Sound cues, music
│   └── Animations/         # Anim montages, blendspaces
├── Config/                 # INI configuration files
├── Plugins/                # Engine/project plugins
└── [ProjectName].uproject`,
      docsUrl: 'https://docs.unrealengine.com/',
      errorPatterns: `- Access violation → Check pointer validity with IsValid() before dereferencing
- Blueprint compilation errors → Verify C++ UFUNCTION/UPROPERTY macros
- Packaging failures → Check cooking logs, verify all assets referenced correctly`,
      antiPatterns: `❌ DO NOT use raw C++ pointers for UObjects — use UPROPERTY() or TWeakObjectPtr
❌ DO NOT tick every actor every frame — use timers or event-driven design
❌ DO NOT skip UCLASS/USTRUCT/UENUM macros for reflected types
❌ DO NOT hardcode asset paths — use soft references (TSoftObjectPtr)
❌ DO NOT ignore garbage collection rules for UObject lifecycle
❌ DO NOT bypass the Gameplay Ability System for complex combat`,
    },
    godot: {
      language: 'GDScript / C#',
      runtime: 'Godot Runtime',
      buildTool: 'SCons (engine) / Godot Export',
      ide: 'Godot Editor / VS Code',
      packageManager: 'Godot Asset Library',
      projectStructure: `[project-name]/
├── scenes/
│   ├── main/               # Main scene, game manager
│   ├── player/             # Player scene and scripts
│   ├── enemies/            # Enemy scenes
│   ├── ui/                 # UI scenes (HUD, menus)
│   └── levels/             # Level scenes
├── scripts/
│   ├── autoloads/          # Singleton autoloads
│   ├── resources/          # Custom resources
│   └── utils/              # Helper scripts
├── assets/
│   ├── sprites/            # 2D textures, spritesheets
│   ├── models/             # 3D models (if applicable)
│   ├── audio/              # Music and SFX
│   └── fonts/              # Custom fonts
├── addons/                 # Third-party plugins
├── project.godot           # Project configuration
└── export_presets.cfg      # Export settings`,
      docsUrl: 'https://docs.godotengine.org/en/stable/',
      errorPatterns: `- Null instance errors → Check is_instance_valid() before accessing freed nodes
- Signal connection errors → Verify signal exists and callable signature matches
- Export template missing → Install export templates for target platform`,
      antiPatterns: `❌ DO NOT use get_node() with hardcoded paths — use @onready or signals
❌ DO NOT call queue_free() without checking dependent references
❌ DO NOT process physics in _process() — use _physics_process()
❌ DO NOT use strings for signal names — use typed signal syntax
❌ DO NOT create scenes with circular dependencies
❌ DO NOT ignore Godot's node ownership rules for saved scenes`,
    },
    phaser3: {
      language: 'TypeScript',
      runtime: 'Browser (WebGL / Canvas)',
      buildTool: 'Vite',
      ide: 'VS Code / WebStorm',
      packageManager: 'npm / pnpm',
      projectStructure: `[project-name]/
├── src/
│   ├── scenes/
│   │   ├── BootScene.ts        # Asset preloading
│   │   ├── MenuScene.ts        # Main menu
│   │   ├── GameScene.ts        # Core gameplay
│   │   └── UIScene.ts          # HUD overlay scene
│   ├── objects/
│   │   ├── Player.ts           # Player sprite/physics
│   │   ├── Enemy.ts            # Enemy classes
│   │   └── Collectible.ts      # Pickup items
│   ├── systems/
│   │   ├── InputManager.ts     # Input handling
│   │   ├── AudioManager.ts     # Sound management
│   │   └── SaveManager.ts      # LocalStorage/IndexedDB
│   ├── config/
│   │   └── game-config.ts      # Phaser.Types.Core.GameConfig
│   └── main.ts                 # Entry point
├── public/
│   └── assets/
│       ├── images/             # Spritesheets, tilesets
│       ├── audio/              # Music and SFX files
│       └── tilemaps/           # Tiled JSON maps
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json`,
      docsUrl: 'https://phaser.io/docs',
      errorPatterns: `- WebGL context lost → Handle context restoration, reduce texture memory
- Asset loading failure → Check file paths are relative to public directory
- Physics body undefined → Verify physics plugin is enabled in game config`,
      antiPatterns: `❌ DO NOT create game objects outside of Scene lifecycle methods
❌ DO NOT use setInterval/setTimeout — use Phaser timers and events
❌ DO NOT load assets in create() — preload in preload()
❌ DO NOT manipulate DOM directly — use Phaser's display system
❌ DO NOT forget to destroy objects when switching scenes
❌ DO NOT use Phaser 2 patterns (Phaser.Sprite, game.add) — use Scene methods`,
    },
    threejs: {
      language: 'TypeScript',
      runtime: 'Browser (WebGL / WebGPU)',
      buildTool: 'Vite',
      ide: 'VS Code / WebStorm',
      packageManager: 'npm / pnpm',
      projectStructure: `[project-name]/
├── src/
│   ├── core/
│   │   ├── Engine.ts           # Renderer, loop, resize
│   │   ├── SceneManager.ts     # Scene transitions
│   │   └── InputManager.ts     # Keyboard, mouse, gamepad
│   ├── entities/
│   │   ├── Player.ts           # Player mesh, controls
│   │   ├── Enemy.ts            # Enemy entities
│   │   └── Environment.ts      # World objects
│   ├── systems/
│   │   ├── PhysicsSystem.ts    # Rapier / Cannon.js
│   │   ├── AudioSystem.ts      # Web Audio API / Howler
│   │   └── UISystem.ts         # HTML overlay or CSS2D
│   ├── utils/
│   │   ├── AssetLoader.ts      # GLTF, texture loading
│   │   └── MathUtils.ts        # Vector/math helpers
│   └── main.ts                 # Entry point
├── public/
│   └── assets/
│       ├── models/             # GLTF/GLB models
│       ├── textures/           # Image textures
│       └── audio/              # Sound files
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json`,
      docsUrl: 'https://threejs.org/docs/',
      errorPatterns: `- WebGL context lost → Implement renderer.forceContextRestore()
- Memory leaks → Always dispose geometries, materials, textures
- GLTF loading errors → Verify file paths and DRACO decoder setup`,
      antiPatterns: `❌ DO NOT create new Vector3/Matrix4 in render loops — reuse objects
❌ DO NOT forget to dispose materials, geometries, textures on cleanup
❌ DO NOT use requestAnimationFrame directly — centralize the game loop
❌ DO NOT skip frustum culling for large scenes
❌ DO NOT load uncompressed textures — use KTX2/Basis for GPU compression
❌ DO NOT ignore WebGL limits — check renderer.capabilities`,
    },
    pixijs: {
      language: 'TypeScript',
      runtime: 'Browser (WebGL / WebGPU)',
      buildTool: 'Vite',
      ide: 'VS Code',
      packageManager: 'npm / pnpm',
      projectStructure: `[project-name]/
├── src/
│   ├── scenes/
│   │   ├── GameScene.ts        # Main gameplay container
│   │   └── MenuScene.ts        # Menu UI
│   ├── objects/
│   │   ├── Player.ts           # Player sprite
│   │   └── Enemy.ts            # Enemy sprites
│   ├── systems/
│   │   ├── InputManager.ts     # Input handling
│   │   └── AssetManager.ts     # Asset bundle loading
│   └── main.ts                 # Application bootstrap
├── public/assets/              # Sprites, spritesheets, audio
├── vite.config.ts
├── tsconfig.json
└── package.json`,
      docsUrl: 'https://pixijs.com/docs',
      errorPatterns: `- Texture not found → Ensure assets are loaded via Assets.load() before use
- Render glitches → Check display object hierarchy and zIndex
- Memory spikes → Destroy unused textures from GPU cache`,
      antiPatterns: `❌ DO NOT create sprites before assets are loaded
❌ DO NOT add objects to stage without managing their lifecycle
❌ DO NOT use PIXI.Loader (deprecated) — use PIXI.Assets
❌ DO NOT render text with BitmapText for dynamic content — use Text or HTMLText
❌ DO NOT forget to call app.destroy() on cleanup`,
    },
    gamemaker: {
      language: 'GML (GameMaker Language)',
      runtime: 'GameMaker Runtime',
      buildTool: 'GameMaker IDE',
      ide: 'GameMaker IDE',
      packageManager: 'GameMaker Marketplace',
      projectStructure: `[project-name]/
├── objects/
│   ├── obj_player/         # Player object (Create/Step/Draw)
│   ├── obj_enemy/          # Enemy objects
│   ├── obj_manager/        # Game manager singleton
│   └── obj_ui/             # UI controller
├── rooms/
│   ├── rm_menu/            # Main menu room
│   ├── rm_game/            # Gameplay room
│   └── rm_gameover/        # Game over screen
├── sprites/                # Sprite assets
├── sounds/                 # Audio assets
├── fonts/                  # Font assets
├── scripts/
│   ├── scr_utils/          # Helper functions
│   └── scr_save/           # Save/load system
├── shaders/                # Custom shaders
└── [project].yyp           # Project file`,
      docsUrl: 'https://manual.gamemaker.io/',
      errorPatterns: `- Instance does not exist → Check instance_exists() before accessing
- Variable not set → Initialize all variables in Create event
- Room transition crash → Verify persistent objects are marked correctly`,
      antiPatterns: `❌ DO NOT put heavy logic in Draw events — use Step events
❌ DO NOT use global variables excessively — use controller objects
❌ DO NOT hardcode room names — use room asset references
❌ DO NOT forget to clean up alarms and timers on room change
❌ DO NOT ignore layer system — avoid deprecated functions`,
    },
    rpgmaker: {
      language: 'JavaScript (MV/MZ plugin system)',
      runtime: 'NW.js / Browser',
      buildTool: 'RPG Maker IDE',
      ide: 'RPG Maker IDE + VS Code for plugins',
      packageManager: 'Manual plugin management',
      projectStructure: `[project-name]/
├── js/
│   └── plugins/            # Custom and third-party plugins
├── data/                   # JSON data files (maps, events, database)
├── img/
│   ├── characters/         # Character sprites
│   ├── tilesets/           # Map tilesets
│   ├── battlebacks/        # Battle backgrounds
│   └── pictures/           # UI images
├── audio/
│   ├── bgm/               # Background music
│   ├── bgs/               # Background sounds
│   ├── se/                # Sound effects
│   └── me/                # Musical effects
└── Game.rpgproject`,
      docsUrl: 'https://rpgmaker.fandom.com/wiki/Main_Page',
      errorPatterns: `- Plugin conflicts → Check plugin order in Plugin Manager
- Event execution errors → Verify switch/variable IDs
- Deployment issues → Test with both NW.js and browser targets`,
      antiPatterns: `❌ DO NOT modify core engine files directly — use plugin hooks
❌ DO NOT skip plugin order requirements — dependencies matter
❌ DO NOT use deprecated MV patterns in MZ projects
❌ DO NOT hardcode database IDs — use named references where possible`,
    },
    construct: {
      language: 'Visual Scripting (Event Sheets) / JavaScript',
      runtime: 'Browser (HTML5)',
      buildTool: 'Construct IDE (cloud-based)',
      ide: 'Construct IDE',
      packageManager: 'Construct Addon Exchange',
      projectStructure: `[project-name]/
├── Event Sheets/
│   ├── GameLogic           # Core gameplay events
│   ├── PlayerControls      # Input handling
│   └── UIEvents            # Menu and HUD logic
├── Layouts/
│   ├── Menu                # Main menu layout
│   ├── Game                # Game level layout
│   └── UI                  # HUD overlay layout
├── Animations/             # Sprite animations
├── Sounds/                 # Audio files
└── project.c3proj`,
      docsUrl: 'https://www.construct.net/en/make-games/manuals/construct-3',
      errorPatterns: `- Object not found → Verify object is placed on active layout or created via events
- Performance drops → Reduce number of active objects, use containers
- Export issues → Check plugin compatibility with target platform`,
      antiPatterns: `❌ DO NOT create excessive global variables — use instance variables
❌ DO NOT put all logic in one event sheet — organize by feature
❌ DO NOT use "Every tick" for things that can be event-driven
❌ DO NOT ignore the family system for shared behaviors`,
    },
    bevy: {
      language: 'Rust',
      runtime: 'Native / WASM',
      buildTool: 'Cargo',
      ide: 'VS Code (rust-analyzer) / RustRover',
      packageManager: 'Cargo (crates.io)',
      projectStructure: `[project-name]/
├── src/
│   ├── main.rs             # App entry, plugin registration
│   ├── player/
│   │   ├── mod.rs          # Player plugin
│   │   ├── components.rs   # Player components
│   │   └── systems.rs      # Player systems
│   ├── enemies/
│   │   ├── mod.rs
│   │   ├── components.rs
│   │   └── systems.rs
│   ├── ui/
│   │   ├── mod.rs
│   │   └── hud.rs
│   ├── systems/
│   │   ├── audio.rs        # Audio system
│   │   ├── input.rs        # Input system
│   │   └── save.rs         # Save/load
│   └── resources/          # Shared game resources
├── assets/
│   ├── sprites/            # Image assets
│   ├── audio/              # Sound files
│   └── fonts/              # Font files
├── Cargo.toml
└── .cargo/config.toml      # Fast compile settings`,
      docsUrl: 'https://bevyengine.org/learn/',
      errorPatterns: `- Borrow checker errors → Restructure to avoid aliased mutable access
- System ordering issues → Use .before()/.after() or system sets
- Asset loading panics → Use AssetServer.load() and check Handle state`,
      antiPatterns: `❌ DO NOT fight the borrow checker — redesign with ECS patterns
❌ DO NOT use .single() queries without guaranteeing exactly one entity
❌ DO NOT create god-systems — keep systems small and focused
❌ DO NOT forget to add plugins to the App builder
❌ DO NOT use dynamic dispatch when static dispatch works
❌ DO NOT ignore Bevy's change detection — avoid unnecessary writes`,
    },
    custom: {
      language: 'Language of choice',
      runtime: 'Custom runtime',
      buildTool: 'Custom build pipeline',
      ide: 'VS Code / preferred editor',
      packageManager: 'Language-specific package manager',
      projectStructure: `[project-name]/
├── src/
│   ├── engine/
│   │   ├── core/           # Game loop, window, input
│   │   ├── renderer/       # Rendering pipeline
│   │   ├── audio/          # Audio subsystem
│   │   └── physics/        # Physics engine
│   ├── game/
│   │   ├── entities/       # Game entities
│   │   ├── systems/        # Game systems
│   │   ├── scenes/         # Scene management
│   │   └── ui/             # User interface
│   └── main               # Entry point
├── assets/                 # Game assets
├── tests/                  # Unit and integration tests
└── build configuration`,
      docsUrl: 'N/A (custom engine)',
      errorPatterns: `- Memory leaks → Implement proper resource lifecycle management
- Rendering artifacts → Verify graphics API state machine usage
- Platform-specific crashes → Test on all target platforms early`,
      antiPatterns: `❌ DO NOT reinvent the wheel for solved problems (physics, audio, etc.)
❌ DO NOT skip cross-platform abstraction layers
❌ DO NOT ignore memory management — profile regularly
❌ DO NOT couple engine code to game-specific logic`,
    },
  }
  return engines[engine] ?? engines.custom
}

// ── Analysis Prompt (unchanged — used by analyze API) ──────────

export function buildAnalysisPrompt(config: GamePresetConfig): string {
  const summary = buildConfigSummary(config)

  return `You are an experienced game design consultant. Analyze the following game configuration and provide a thorough assessment.

# Game Configuration
${summary}

# Analysis Requirements

Provide the analysis in the following JSON format:
{
  "complexityScore": <number 1-10>,
  "complexityLabel": "<Simple|Moderate|Complex|Very Complex|Extremely Complex>",
  "scopeEstimate": "<estimated development time range, e.g. '3-6 months for a solo dev'>",
  "techFeasibility": "<high|medium|low>",
  "summary": "<2-3 paragraph overall assessment>",
  "warnings": [
    {"severity": "<error|warning|info>", "message": "<description>", "field": "<optional field name>"}
  ],
  "suggestions": ["<improvement suggestion 1>", "<suggestion 2>"],
  "compatibilityIssues": ["<issue 1 if any>"]
}

Consider:
1. Technical complexity based on chosen engine, dimension, and platform targets
2. Scope relative to team size implications
3. Compatibility between chosen features (e.g., MMO with simple engines, VR with 2D)
4. Market viability of the genre/platform/monetization combination
5. Any missing critical decisions

Return ONLY valid JSON, no markdown code fences.`
}

// ── Document 1: Init Prompt ────────────────────────────────────

export function buildInitPromptDoc(config: GamePresetConfig): string {
  const engine = getEngineInfo(config.engine)
  const engineLabel = findLabel(ENGINE_OPTIONS, config.engine)
  const themes = mapLabels(THEME_OPTIONS, config.themes)
  const genres = mapLabels(GENRE_OPTIONS, config.genres)
  const platforms = mapLabels(PLATFORM_OPTIONS, config.platforms)
  const dimension = findLabel(DIMENSION_OPTIONS, config.dimension)
  const artStyle = findLabel(ART_STYLE_OPTIONS, config.artStyle)
  const playerMode = findLabel(PLAYER_MODE_OPTIONS, config.playerMode)
  const coreMechanics = mapLabels(CORE_MECHANICS_OPTIONS, config.coreMechanics)
  const secondaryMechanics = mapLabels(SECONDARY_MECHANICS_OPTIONS, config.secondaryMechanics)
  const scope = findLabel(WORLD_SCOPE_OPTIONS, config.worldScope)
  const date = new Date().toISOString().split('T')[0]

  const projectName = config.elevatorPitch
    ? config.elevatorPitch.split(/[.!?]/)[0].trim().slice(0, 60)
    : `${themes.split(',')[0].trim()} ${genres.split(',')[0].trim()} Game`

  const isMultiplayer = config.playerMode !== 'single-player'
  const isWebEngine = ['phaser3', 'threejs', 'pixijs'].includes(config.engine)

  return `# Initialization Prompt for ${projectName}

> **Generated by:** DevDudes Combo Dude
> **Date:** ${date}
> **Version:** 1.0.0
> **Target AI Tool:** Claude Code / Cursor / Windsurf / Copilot

---

## Section 1: Context

### 1.1 Project Identity

You are building **${projectName}**, a ${dimension} ${genres} game built with ${engineLabel}.

**Genre:** ${genres}
**Themes:** ${themes}
**Art Style:** ${artStyle}
**Player Mode:** ${playerMode}${isMultiplayer ? ` (up to ${config.multiplayer.maxPlayers} players)` : ''}
**Scope:** ${scope}

### 1.2 Game Context

${config.elevatorPitch || `A ${themes.toLowerCase()} ${genres.toLowerCase()} game featuring ${coreMechanics.toLowerCase()} as core mechanics, with ${artStyle.toLowerCase()} visuals in ${dimension}.`}${config.aiFreetext.detailedDescription ? `\n\n${config.aiFreetext.detailedDescription}` : ''}

### 1.3 Core Systems

| System | Description |
|--------|-------------|
| Core Mechanics | ${coreMechanics} |
| Secondary Mechanics | ${secondaryMechanics} |
| Progression | ${mapLabels(PROGRESSION_SYSTEM_OPTIONS, config.progressionSystems)} |
| Difficulty | ${findLabel(DIFFICULTY_OPTIONS, config.difficulty)} |
| World Structure | ${findLabel(WORLD_STRUCTURE_OPTIONS, config.worldStructure)} |
| Level Generation | ${findLabel(LEVEL_GENERATION_OPTIONS, config.levelGeneration)} |${isMultiplayer ? `
| Networking | ${config.multiplayer.networkModel || 'TBD'} (${config.multiplayer.syncType || 'state-sync'})` : ''}${config.aiFreetext.gameplayLoop ? `

**Gameplay Loop:** ${config.aiFreetext.gameplayLoop}` : ''}

---

## Section 2: Technical Specification

### 2.1 Tech Stack (Mandatory)

\`\`\`
Engine:         ${engineLabel}
Language:       ${engine.language}
Runtime:        ${engine.runtime}
Build Tool:     ${engine.buildTool}
IDE:            ${engine.ide}
Package Manager: ${engine.packageManager}
Target FPS:     ${findLabel(TARGET_FPS_OPTIONS, config.targetFps)}
Platforms:      ${platforms}
\`\`\`

### 2.2 Project Structure

\`\`\`
${engine.projectStructure}
\`\`\`

### 2.3 Additional Technology

${config.additionalTech.length > 0 ? config.additionalTech.map((t) => `- ${t}`).join('\n') : '- No additional technology specified'}

### 2.4 Audio Configuration

\`\`\`
Music Style:    ${findLabel(MUSIC_STYLE_OPTIONS, config.musicStyle)}
Sound Effects:  ${mapLabels(SOUND_EFFECT_OPTIONS, config.soundEffects)}
Voice Acting:   ${findLabel(VOICE_ACTING_OPTIONS, config.voiceActing)}
\`\`\`

---

## Section 3: Instructions

### 3.1 Build Order (MVP — follow this sequence exactly)

\`\`\`
Phase 1: Foundation
  1. Initialize ${engineLabel} project with correct settings for ${dimension} ${artStyle.toLowerCase()}
  2. Configure build pipeline for ${findLabel(PLATFORM_OPTIONS, config.primaryPlatform)}
  3. Set up project structure (see Section 2.2)
  4. Configure input system for ${config.primaryPlatform.includes('mobile') ? 'touch + gamepad' : config.primaryPlatform.includes('web') ? 'keyboard + mouse' : 'keyboard + mouse + gamepad'}

Phase 2: Core Gameplay
  5. Implement player controller with basic ${config.coreMechanics[0] ? findLabel(CORE_MECHANICS_OPTIONS, config.coreMechanics[0]).toLowerCase() : 'movement'}
  6. Build ${findLabel(WORLD_STRUCTURE_OPTIONS, config.worldStructure).toLowerCase()} world structure
  7. Implement camera system (${config.cameraStyle || 'default for ' + dimension})
  8. Add core mechanics: ${coreMechanics}
  9. Implement basic UI/HUD

Phase 3: Game Systems
  10. ${config.progressionSystems.length > 0 ? `Implement progression: ${mapLabels(PROGRESSION_SYSTEM_OPTIONS, config.progressionSystems)}` : 'Implement scoring / win condition'}
  11. Add secondary mechanics: ${secondaryMechanics}
  12. Implement audio system (${findLabel(MUSIC_STYLE_OPTIONS, config.musicStyle)} music + ${mapLabels(SOUND_EFFECT_OPTIONS, config.soundEffects)} SFX)
  13. Build save/load system
  14. Implement ${findLabel(VICTORY_CONDITION_OPTIONS, config.victoryCondition).toLowerCase()} victory condition

Phase 4: Polish
  15. Add particle effects and visual feedback
  16. Implement menu system (main menu, pause, settings)
  17. Add difficulty system: ${findLabel(DIFFICULTY_OPTIONS, config.difficulty)}
  18. Performance optimization for ${findLabel(TARGET_FPS_OPTIONS, config.targetFps)} target
\`\`\`

### 3.2 Build Order (MAX Scope — extends MVP)

\`\`\`
Phase 5: Content & Features
  19. Expand level/world content
  20. Add all secondary mechanics
  21. ${config.voiceActing !== 'none' ? `Integrate ${findLabel(VOICE_ACTING_OPTIONS, config.voiceActing).toLowerCase()} voice acting` : 'Add advanced sound design'}
  22. ${isMultiplayer ? `Implement ${config.multiplayer.networkModel} networking with ${config.multiplayer.syncType} sync` : 'Add replay system or advanced AI'}
  23. Mod support or custom content tools

Phase 6: Quality & Testing
  24. Unit tests for core systems
  25. Integration tests for game mechanics
  26. Playtest sessions and balance tuning
  27. Platform-specific testing: ${platforms}
  28. Performance profiling and optimization

Phase 7: Distribution
  29. Build configuration for ${mapLabels(DISTRIBUTION_OPTIONS, config.distribution)}
  30. Store page assets (screenshots, trailers)
  31. Analytics integration
  32. Launch and post-launch patch plan
\`\`\`

### 3.3 Implementation Rules

1. **Follow ${engineLabel} best practices exactly.** Do not improvise engine patterns.
2. **Handle all errors gracefully** — no silent failures, always log context.
3. **Use ${engine.language} conventions** for naming and file organization.
4. **Keep systems decoupled** — one responsibility per system/component.
5. **Name files consistently:** follow the project structure conventions above.
6. **Profile early and often** — target ${findLabel(TARGET_FPS_OPTIONS, config.targetFps)} from day one.
7. **Version control everything** — commit after each working feature.

---

## Section 4: Constraints (DO NOT)

### 4.1 Engine-Specific — CRITICAL

\`\`\`
${engine.antiPatterns}
\`\`\`

### 4.2 General Game Development

\`\`\`
❌ DO NOT optimize prematurely — get it working first, then profile
❌ DO NOT hardcode configuration values — use data-driven design
❌ DO NOT skip playtesting — test every feature with actual gameplay
❌ DO NOT ignore platform-specific requirements (input, screen size, performance)
❌ DO NOT leave debug code in production builds
❌ DO NOT couple rendering logic to game logic
\`\`\`

### 4.3 Code Quality

\`\`\`
❌ DO NOT ignore ${engine.language} compiler warnings — fix them properly
❌ DO NOT use magic numbers — define constants with descriptive names
❌ DO NOT write systems longer than 200 lines without splitting
❌ DO NOT skip input validation on save/load data
❌ DO NOT create circular dependencies between systems
\`\`\`${config.aiFreetext.constraints ? `

### 4.4 Project-Specific Constraints

\`\`\`
${config.aiFreetext.constraints}
\`\`\`` : ''}

---

## Section 5: Error Handling Protocol

### When you encounter ANY error:

\`\`\`
Step 1: STOP — Do not modify code yet.
Step 2: Read the full error message and stack trace.
Step 3: Consult official ${engineLabel} documentation:
        - ${engine.docsUrl}
Step 4: Check for known error patterns (see below).
Step 5: Reproduce in isolation if the error is unclear.
Step 6: Document the error and fix before continuing.
\`\`\`

### Known Error Patterns (${engineLabel})

\`\`\`
${engine.errorPatterns}
\`\`\`

---

## Section 6: References

### 6.1 Primary Documentation

| Resource | URL |
|----------|-----|
| **Development Concept** | \`./development-concept.md\` |
| **${engineLabel} Docs** | ${engine.docsUrl} |${isWebEngine ? `
| **TypeScript Docs** | https://www.typescriptlang.org/docs/ |
| **Vite Docs** | https://vitejs.dev/guide/ |` : ''}${config.engine === 'unity' ? `
| **Unity Learn** | https://learn.unity.com/ |` : ''}${config.engine === 'unreal' ? `
| **Unreal Learning** | https://dev.epicgames.com/community/unreal-engine/learning |` : ''}${config.engine === 'godot' ? `
| **Godot Recipes** | https://kidscancode.org/godot_recipes/ |` : ''}${config.engine === 'bevy' ? `
| **Bevy Cheat Book** | https://bevy-cheatbook.github.io/ |` : ''}

### 6.2 Game Dev Resources

| Pattern | Source |
|---------|--------|
| Game Programming Patterns | https://gameprogrammingpatterns.com/ |
| ${dimension} ${artStyle} Reference | Search for "${genres.toLowerCase()} ${artStyle.toLowerCase()} ${dimension} games" |${config.aiFreetext.referenceGames ? `
| Reference Games | ${config.aiFreetext.referenceGames} |` : ''}

---

## Section 7: Agent-Specific Prompts (MAX Scope)

> In MAX Scope with Multi-Agent architecture, the init prompt is split into specialized sub-prompts. Each agent receives only its relevant sections.

### 7.1 Architect Agent

\`\`\`
Focus: Game systems architecture, data model, component design, scene graph.
Input: Full game config + development concept.
Output: Architecture decision records, system interaction diagrams, data schemas.
Model: Claude Opus / GPT-4o
\`\`\`

### 7.2 Gameplay Agent

\`\`\`
Focus: Core mechanics (${coreMechanics}), game feel, balancing.
Input: Mechanics config, progression systems, difficulty settings.
Output: Mechanic implementations, balance spreadsheets, tuning parameters.
Model: Claude Sonnet
\`\`\`

### 7.3 Art & Audio Agent

\`\`\`
Focus: ${artStyle} ${dimension} assets, ${findLabel(MUSIC_STYLE_OPTIONS, config.musicStyle)} audio, UI design.
Input: Visual style, audio config, UI requirements.
Output: Asset pipeline setup, shader configurations, audio system.
Model: Claude Sonnet
\`\`\`

### 7.4 Code Agent

\`\`\`
Focus: Feature implementation in ${engine.language} following architect specs.
Input: All agent outputs + development concept.
Output: Production-ready ${engineLabel} source code.
Model: Claude Sonnet / Codestral
\`\`\`

### 7.5 Test Agent

\`\`\`
Focus: Game testing — unit, integration, playtest automation.
Input: Completed codebase from Code Agent.
Output: Test files, gameplay recordings, bug reports, coverage.
Model: Gemini Flash / GPT-4o-mini
\`\`\`

### 7.6 QA & Review Agent

\`\`\`
Focus: Final QA — code review, performance profiling, platform compliance.
Input: All agent outputs combined.
Output: Approval or revision requests with specific feedback.
Model: Claude Opus
\`\`\`

---

## Quick Start

\`\`\`bash
# 1. Paste this entire prompt into your AI development tool
# 2. The AI will follow the build order in Section 3
# 3. Reference development-concept.md for detailed specs
# 4. Use the DO NOT list (Section 4) as guardrails throughout
\`\`\`

---

> **This prompt is your development contract.**
> The AI assistant must follow these instructions exactly.
> Generated by DevDudes Combo Dude — do not edit structure manually.`
}

// ── Document 2: Development Concept ────────────────────────────

export function buildDevelopmentConceptDoc(config: GamePresetConfig): string {
  const engine = getEngineInfo(config.engine)
  const engineLabel = findLabel(ENGINE_OPTIONS, config.engine)
  const themes = mapLabels(THEME_OPTIONS, config.themes)
  const genres = mapLabels(GENRE_OPTIONS, config.genres)
  const platforms = mapLabels(PLATFORM_OPTIONS, config.platforms)
  const primaryPlatform = findLabel(PLATFORM_OPTIONS, config.primaryPlatform)
  const dimension = findLabel(DIMENSION_OPTIONS, config.dimension)
  const artStyle = findLabel(ART_STYLE_OPTIONS, config.artStyle)
  const playerMode = findLabel(PLAYER_MODE_OPTIONS, config.playerMode)
  const coreMechanics = mapLabels(CORE_MECHANICS_OPTIONS, config.coreMechanics)
  const secondaryMechanics = mapLabels(SECONDARY_MECHANICS_OPTIONS, config.secondaryMechanics)
  const worldStructure = findLabel(WORLD_STRUCTURE_OPTIONS, config.worldStructure)
  const levelGen = findLabel(LEVEL_GENERATION_OPTIONS, config.levelGeneration)
  const scope = findLabel(WORLD_SCOPE_OPTIONS, config.worldScope)
  const progressionSystems = mapLabels(PROGRESSION_SYSTEM_OPTIONS, config.progressionSystems)
  const difficulty = findLabel(DIFFICULTY_OPTIONS, config.difficulty)
  const musicStyle = findLabel(MUSIC_STYLE_OPTIONS, config.musicStyle)
  const sfx = mapLabels(SOUND_EFFECT_OPTIONS, config.soundEffects)
  const voiceActing = findLabel(VOICE_ACTING_OPTIONS, config.voiceActing)
  const businessModel = findLabel(BUSINESS_MODEL_OPTIONS, config.businessModel)
  const distribution = mapLabels(DISTRIBUTION_OPTIONS, config.distribution)
  const narrative = findLabel(NARRATIVE_FOCUS_OPTIONS, config.narrativeFocus)
  const storyStructure = findLabel(STORY_STRUCTURE_OPTIONS, config.storyStructure)
  const victoryCondition = findLabel(VICTORY_CONDITION_OPTIONS, config.victoryCondition)
  const targetFps = findLabel(TARGET_FPS_OPTIONS, config.targetFps)
  const date = new Date().toISOString().split('T')[0]

  const isMultiplayer = config.playerMode !== 'single-player'
  const isWebEngine = ['phaser3', 'threejs', 'pixijs'].includes(config.engine)
  const isOnline = ['online-multiplayer', 'mmo'].includes(config.playerMode)

  const projectName = config.elevatorPitch
    ? config.elevatorPitch.split(/[.!?]/)[0].trim().slice(0, 60)
    : `${themes.split(',')[0].trim()} ${genres.split(',')[0].trim()} Game`

  // Scope-based timeline estimation
  const scopeTimelines: Record<string, { mvp: string; max: string }> = {
    small: { mvp: 'Week 1–2', max: 'Week 2–4' },
    medium: { mvp: 'Week 1–4', max: 'Month 2–3' },
    large: { mvp: 'Month 1–2', max: 'Month 3–6' },
    massive: { mvp: 'Month 1–3', max: 'Month 4–12' },
  }
  const timeline = scopeTimelines[config.worldScope] ?? scopeTimelines.medium

  // Pre-compute distribution channels table rows
  const distNotes: Record<string, string> = {
    steam: 'Steamworks SDK integration required',
    epic: 'Epic Online Services setup',
    itch: 'butler CLI for uploads',
    'app-store': 'Apple Developer account required',
    'google-play': 'Google Play Console setup',
    web: 'Web hosting + CDN',
    gog: 'GOG Galaxy SDK',
    'console-store': 'Platform dev kit required',
  }
  const distributionRows = config.distribution
    .map((d) => `| ${findLabel(DISTRIBUTION_OPTIONS, d)} | Planned | ${distNotes[d] ?? 'Setup required'} |`)
    .join('\n')

  return `# ${projectName} — Development Concept

> **Generated by:** DevDudes Combo Dude
> **Date:** ${date}
> **Version:** 1.0.0
> **Scope:** MVP | MAX (toggle per section)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technical Architecture](#2-technical-architecture)
3. [Data Model](#3-data-model)
4. [API Design](#4-api-design)
5. [Tech Stack](#5-tech-stack)
6. [Implementation Guidelines](#6-implementation-guidelines)
7. [Security Concept](#7-security-concept)
8. [Testing Strategy](#8-testing-strategy)
9. [Deployment Plan](#9-deployment-plan)
10. [Component Library](#10-component-library)
11. [DO NOT List](#11-do-not-list)

---

## 1. Project Overview

### 1.1 Goals & Scope

| Attribute | Value |
|-----------|-------|
| **Project Name** | ${projectName} |
| **Project Type** | ${dimension} ${genres} Game |
| **Engine** | ${engineLabel} |
| **Themes** | ${themes} |
| **Art Style** | ${artStyle} |
| **Primary Platform** | ${primaryPlatform} |
| **Player Mode** | ${playerMode} |
| **Scope** | ${scope} |

### 1.2 Game Identity

${config.elevatorPitch || `A ${themes.toLowerCase()} ${genres.toLowerCase()} game with ${artStyle.toLowerCase()} visuals.`}

- **Narrative:** ${narrative} — ${storyStructure} structure
- **Victory Condition:** ${victoryCondition}
- **Core Mechanics:** ${coreMechanics}${config.aiFreetext.detailedDescription ? `\n\n${config.aiFreetext.detailedDescription}` : ''}${config.aiFreetext.gameplayLoop ? `\n\n**Gameplay Loop:** ${config.aiFreetext.gameplayLoop}` : ''}${config.aiFreetext.referenceGames ? `\n\n**Reference Games:** ${config.aiFreetext.referenceGames}` : ''}

### 1.3 Timeline

| Milestone | MVP Target | MAX Target |
|-----------|-----------|-----------|
| Foundation & Core Setup | Week 1 | Week 1 |
| Core Gameplay Mechanics | ${timeline.mvp} | ${timeline.max} |
| Content & Polish | ${timeline.mvp} | ${timeline.max} |
| Testing & QA | Final week | Final month |
| Distribution Release | — | Post-QA |

---

## 2. Technical Architecture

### 2.1 System Design (MVP)

\`\`\`
${isWebEngine ? `[Web Browser]
       │
       ▼
[${engineLabel} Game (${engine.runtime})]
       │
       ├── Scene Manager
       ├── Game Systems
       ├── Asset Pipeline
       └── ${isMultiplayer ? 'WebSocket Server' : 'Local Storage (saves)'}` : `[${primaryPlatform}]
       │
       ▼
[${engineLabel} Runtime]
       │
       ├── Scene / Level Manager
       ├── Game Systems (ECS / Component)
       ├── Asset Pipeline
       ├── Audio Engine
       └── ${isMultiplayer ? 'Network Layer' : 'Save System'}`}
\`\`\`

> **MVP:** Monolithic ${engineLabel} project targeting ${primaryPlatform}.

### 2.2 System Design (MAX Scope)

\`\`\`
${platforms}
       │
       ▼
[${engineLabel} Game Client]
       │
       ├── Core Engine Loop (${targetFps})
       ├── Rendering Pipeline (${dimension} ${artStyle})
       ├── Physics / Collision System
       ├── Audio System (${musicStyle})
       ├── Input System (platform-adaptive)
       ├── UI / HUD System${isMultiplayer ? `
       ├── Networking (${config.multiplayer.networkModel || 'client-server'})` : ''}
       ├── Save / Persistence
       └── Analytics / Telemetry
\`\`\`

> **MAX:** Multi-platform build with all systems fully featured.

### 2.3 Infrastructure

| Component | MVP | MAX Scope |
|-----------|-----|-----------|
| **Engine** | ${engineLabel} | ${engineLabel} (optimized build) |
| **Rendering** | ${dimension} ${artStyle} | ${dimension} ${artStyle} + post-processing |
| **Physics** | Basic collisions | ${config.additionalTech.includes('physics-engine') ? 'Advanced physics engine' : 'Standard physics'} |
| **Audio** | Basic playback | ${musicStyle} adaptive audio |
| **Networking** | ${isMultiplayer ? config.multiplayer.networkModel || 'Client-server' : '—'} | ${isMultiplayer ? 'Dedicated servers + matchmaking' : '—'} |
| **Storage** | Local saves | ${config.additionalTech.includes('cloud-save') ? 'Cloud save sync' : 'Local saves'} |
| **Analytics** | — | ${config.additionalTech.includes('analytics') ? 'Player analytics pipeline' : 'Basic telemetry'} |

---

## 3. Data Model

### 3.1 Core Game Data

\`\`\`
┌──────────────┐       ┌──────────────┐
│  Player Data │       │  World Data  │
│              │       │              │
│ id           │       │ id           │
│ position     │──1:N──│ level_id     │
│ stats        │       │ entities[]   │
│ inventory[]  │       │ state        │
│ progression  │       │ generated    │
│ settings     │       │ seed         │
└──────────────┘       └──────────────┘
       │
       │ 1:N
       ▼
┌──────────────┐       ┌──────────────┐
│  Save Data   │       │  Config      │
│              │       │              │
│ slot_id      │       │ difficulty   │
│ timestamp    │       │ audio_vol    │
│ player_ref   │       │ controls     │
│ world_ref    │       │ graphics     │
│ playtime     │       │ language     │
└──────────────┘       └──────────────┘
\`\`\`

### 3.2 Player State Schema

\`\`\`
PlayerState {
  id: string
  position: { x, y${config.dimension === '3d' ? ', z' : ''} }
  health: number
  ${config.progressionSystems.includes('xp-levels') ? 'level: number\n  experience: number' : ''}
  ${config.progressionSystems.includes('equipment-loot') ? 'inventory: Item[]\n  equipment: EquipmentSlots' : ''}
  ${config.progressionSystems.includes('skill-tree') ? 'skills: SkillTree' : ''}
  ${config.progressionSystems.includes('achievement') ? 'achievements: string[]' : ''}
  ${config.coreMechanics.includes('resource-management') ? 'resources: Record<string, number>' : ''}
  stats: {
    ${config.coreMechanics.includes('combat-melee') || config.coreMechanics.includes('combat-ranged') || config.coreMechanics.includes('combat-magic') ? 'attack: number\n    defense: number' : 'score: number'}
    playtime: number
  }
}
\`\`\`

### 3.3 Save File Structure

\`\`\`
SaveFile {
  version: string
  timestamp: number
  slot: number
  player: PlayerState
  world: {
    currentLevel: string
    ${config.levelGeneration === 'procedural' || config.levelGeneration === 'hybrid' ? 'seed: number' : 'completedLevels: string[]'}
    entities: EntityState[]
  }
  settings: GameSettings
  playtime: number
  checksum: string    // Integrity verification
}
\`\`\`

### 3.4 Extended Data (MAX Scope)

> MAX adds: leaderboards, player profiles, achievement tracking, replay data, mod manifests, analytics events.

---

## 4. API Design

${isOnline ? `### 4.1 Game Server API

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| /api/auth/login | POST | Player authentication | No |
| /api/auth/register | POST | Create account | No |
| /api/player/profile | GET | Get player profile | Yes |
| /api/player/save | POST | Upload save data | Yes |
| /api/player/save | GET | Download save data | Yes |
| /api/leaderboard | GET | Get leaderboard | No |
| /api/leaderboard | POST | Submit score | Yes |
| /api/matchmaking/queue | POST | Join matchmaking queue | Yes |
| /api/matchmaking/status | GET | Check match status | Yes |

### 4.2 Real-Time Protocol

| Event | Direction | Description |
|-------|-----------|-------------|
| player_move | Client → Server | Position update |
| world_state | Server → Client | Authoritative state sync |
| player_action | Client → Server | Game action (attack, use item) |
| player_join | Server → All | New player notification |
| player_leave | Server → All | Player disconnect |` : `### 4.1 Game Systems API (Internal)

Since this is a ${playerMode.toLowerCase()} game, the "API" refers to internal system interfaces:

| System | Interface | Description |
|--------|-----------|-------------|
| Save System | \`save(slot)\` / \`load(slot)\` | Serialize/deserialize game state |
| Input System | \`getAction(name)\` / \`isPressed(key)\` | Abstracted input queries |
| Audio System | \`play(id, opts)\` / \`stopAll()\` | Sound playback control |
| Scene System | \`loadScene(id)\` / \`transition(type)\` | Level/scene management |
| Entity System | \`spawn(type, pos)\` / \`destroy(id)\` | Entity lifecycle |
| UI System | \`showDialog(opts)\` / \`updateHUD(data)\` | User interface control |

### 4.2 Data Persistence

| Operation | MVP | MAX |
|-----------|-----|-----|
| Save | ${isWebEngine ? 'LocalStorage / IndexedDB' : 'Local file system'} | ${config.additionalTech.includes('cloud-save') ? 'Cloud sync + local fallback' : 'Local file system'} |
| Settings | ${isWebEngine ? 'LocalStorage' : 'Config file'} | ${isWebEngine ? 'LocalStorage' : 'Config file'} |
| Analytics | — | Remote telemetry endpoint |`}

---

## 5. Tech Stack

| Category | MVP | MAX Scope |
|----------|-----|-----------|
| **Engine** | ${engineLabel} | ${engineLabel} (optimized) |
| **Language** | ${engine.language} | ${engine.language} |
| **Build Tool** | ${engine.buildTool} | ${engine.buildTool} + CI pipeline |
| **IDE** | ${engine.ide} | ${engine.ide} |
| **Physics** | Built-in / basic | ${config.additionalTech.includes('physics-engine') ? 'Advanced physics engine' : 'Built-in'} |
| **Audio** | Basic engine audio | ${musicStyle} adaptive system |
| **Networking** | ${isMultiplayer ? config.multiplayer.networkModel || 'Client-server' : '—'} | ${isMultiplayer ? 'Dedicated servers' : '—'} |
| **Testing** | Manual playtesting | Automated + manual |
| **Version Control** | Git | Git + branching strategy |
| **Package Mgr** | ${engine.packageManager} | ${engine.packageManager} |
| **Analytics** | — | ${config.additionalTech.includes('analytics') ? 'Player analytics' : 'Basic telemetry'} |

---

## 6. Implementation Guidelines

### 6.1 Code Standards

- **Naming:** Follow ${engine.language} conventions (${config.engine === 'unity' ? 'PascalCase for classes/methods, camelCase for local vars' : config.engine === 'unreal' ? 'PascalCase with F/U/A prefixes per UE convention' : config.engine === 'godot' ? 'snake_case for functions/variables, PascalCase for classes (GDScript)' : config.engine === 'bevy' ? 'snake_case for functions/variables, PascalCase for types (Rust)' : 'camelCase for variables/functions, PascalCase for classes'})
- **File structure:** Feature-based organization (see project structure in init prompt)
- **Error handling:** Always handle edge cases — no silent failures
- **Architecture:** ${config.engine === 'bevy' ? 'ECS (Entity-Component-System) pattern' : config.engine === 'unity' ? 'Component-based architecture' : config.engine === 'unreal' ? 'Actor-Component model with Gameplay Framework' : 'Scene-based architecture with decoupled systems'}

### 6.2 Git Workflow

| Aspect | MVP | MAX Scope |
|--------|-----|-----------|
| Branching | \`main\` only | \`main\` → \`develop\` → \`feature/*\` |
| Commits | Conventional | Conventional + tagged releases |
| Reviews | Self-review | PR required, 1 approval |
| CI | — | Lint → Build → Test → Package |

### 6.3 Game-Specific Patterns

\`\`\`
// ✅ CORRECT — Decouple systems
// Each system has a single responsibility
// Systems communicate via events/signals, not direct references

// ❌ WRONG — God object
// One massive class that handles input, rendering, physics, and UI
\`\`\`

**State Management:** Use ${config.engine === 'unity' ? 'ScriptableObjects for shared data, Events for communication' : config.engine === 'unreal' ? 'GameInstance for persistent state, Event Dispatchers for communication' : config.engine === 'godot' ? 'Autoloads for global state, Signals for communication' : config.engine === 'bevy' ? 'Resources for global state, Events for communication' : 'centralized state store with event-driven updates'}

---

## 7. Security Concept

### 7.1 Save Integrity (MVP)

| Concern | Solution |
|---------|----------|
| **Save tampering** | Checksum validation on load |
| **Save corruption** | Backup save slot, verify schema version |
| **Cheat prevention** | ${isMultiplayer ? 'Server-authoritative game state' : 'Local validation (trust boundary at save file)'} |

${isOnline ? `### 7.2 Network Security

| Concern | Solution |
|---------|----------|
| **Authentication** | Token-based auth (JWT or session) |
| **Data in transit** | TLS/WSS for all connections |
| **Cheating** | Server-authoritative state, input validation |
| **DDoS** | Rate limiting, connection throttling |
| **Injection** | Validate all client inputs server-side |

### 7.3 Account Security

| Concern | Solution |
|---------|----------|
| **Password storage** | bcrypt / argon2 hashing |
| **Session management** | Secure, expiring tokens |
| **Account recovery** | Email verification flow |` : `### 7.2 Client-Side Security

| Concern | Solution |
|---------|----------|
| **Memory manipulation** | ${isWebEngine ? 'Obfuscation, integrity checks' : 'Anti-debug measures (MAX scope)'} |
| **Asset extraction** | ${isWebEngine ? 'Asset bundling, obfuscation' : 'Packed asset formats'} |
| **Leaderboard cheating** | ${isMultiplayer ? 'Server validation' : 'Local only — client trust'} |`}

### 7.${isOnline ? '4' : '3'} Production Security Checklist (MAX Scope)

- [ ] Save file integrity verification
- [ ] Input validation on all game actions
- [ ] ${isOnline ? 'Server-side anti-cheat' : 'Client-side tamper detection'}
- [ ] ${isWebEngine ? 'Content Security Policy headers' : 'Code signing for distribution'}
- [ ] Secure storage for any credentials/API keys
- [ ] ${config.additionalTech.includes('analytics') ? 'Privacy-compliant analytics (GDPR)' : 'No PII collected'}
- [ ] Platform compliance (${platforms})

---

## 8. Testing Strategy

### 8.1 MVP

| Type | Tool | Scope |
|------|------|-------|
| Manual Playtesting | ${engineLabel} Editor | All core mechanics, game feel |
| Unit Tests | ${config.engine === 'unity' ? 'Unity Test Framework' : config.engine === 'unreal' ? 'Unreal Automation' : config.engine === 'godot' ? 'GUT (Godot Unit Testing)' : config.engine === 'bevy' ? 'cargo test' : isWebEngine ? 'Vitest' : 'Engine-specific'} | Game logic, math utilities |
| Smoke Tests | Manual | Build runs on ${primaryPlatform} |

### 8.2 MAX Scope

| Type | Tool | Scope | Coverage |
|------|------|-------|----------|
| Unit | ${config.engine === 'unity' ? 'Unity Test Framework' : config.engine === 'unreal' ? 'Unreal Automation' : config.engine === 'godot' ? 'GUT' : config.engine === 'bevy' ? 'cargo test' : isWebEngine ? 'Vitest' : 'Framework tests'} | Game systems, utilities | Core systems |
| Integration | ${config.engine === 'unity' ? 'Unity Integration Tests' : config.engine === 'unreal' ? 'Unreal Functional Tests' : isWebEngine ? 'Vitest + Playwright' : 'Custom test harness'} | System interactions, save/load | Key interactions |
| Performance | ${config.engine === 'unity' ? 'Unity Profiler' : config.engine === 'unreal' ? 'Unreal Insights' : config.engine === 'bevy' ? 'tracy / puffin' : isWebEngine ? 'Chrome DevTools / Lighthouse' : 'Platform profiler'} | Frame time, memory, loading | ${targetFps} target |
| Platform | Per-platform build | ${platforms} | All target platforms |
| Playtest | Human testers | Game feel, balance, fun factor | Complete game |

---

## 9. Deployment Plan

### 9.1 Environments

| Environment | MVP | MAX Scope |
|-------------|-----|-----------|
| Development | Local (${engine.ide}) | Local + test server |
| Testing | Local build | Dedicated test builds |
| Production | ${distribution.split(',')[0].trim()} | ${distribution} |

### 9.2 Build & Distribute (MVP)

\`\`\`
${config.engine === 'unity' ? `# Unity Build
Unity Editor → File → Build Settings → ${primaryPlatform}
# Or via CLI:
Unity -batchmode -buildTarget ${config.primaryPlatform.includes('web') ? 'WebGL' : config.primaryPlatform.includes('windows') ? 'Win64' : config.primaryPlatform.includes('mac') ? 'OSXUniversal' : config.primaryPlatform.includes('linux') ? 'Linux64' : config.primaryPlatform.includes('android') ? 'Android' : config.primaryPlatform.includes('ios') ? 'iOS' : 'Win64'} -projectPath . -executeMethod BuildScript.Build` : config.engine === 'unreal' ? `# Unreal Package
# Via Editor: Platforms → ${primaryPlatform} → Package Project
# Or via CLI:
RunUAT BuildCookRun -project="[Project].uproject" -platform=${config.primaryPlatform.includes('windows') ? 'Win64' : config.primaryPlatform.includes('linux') ? 'Linux' : config.primaryPlatform.includes('mac') ? 'Mac' : 'Win64'} -cook -build -stage -pak` : config.engine === 'godot' ? `# Godot Export
godot --headless --export-release "${primaryPlatform}" build/game` : isWebEngine ? `# Web Build (Vite)
npm run build
# Output in dist/ — deploy to web host` : config.engine === 'bevy' ? `# Bevy Build
cargo build --release
# For WASM: cargo build --release --target wasm32-unknown-unknown` : config.engine === 'gamemaker' ? `# GameMaker Export
# Via IDE: Build → Create Executable → ${primaryPlatform}` : `# Build for ${primaryPlatform}
# Follow engine-specific build instructions`}
\`\`\`

### 9.3 Distribution Channels

| Channel | Status | Notes |
|---------|--------|-------|
${distributionRows}

### 9.4 Post-Launch (MAX Scope)

- Update pipeline: Version tagging → Build → Test → Stage → Release
- Hotfix process: Branch from release tag → Fix → Test → Deploy
- ${config.additionalTech.includes('analytics') ? 'Analytics dashboard for player behavior monitoring' : 'Player feedback channels'}

---

## 10. Component Library

### 10.1 Core Game Systems (MVP)

| System | Description | Priority |
|--------|-------------|----------|
| Game Loop | Core update cycle at ${targetFps} | P0 |
| Input | ${config.primaryPlatform.includes('mobile') ? 'Touch + virtual gamepad' : 'Keyboard + mouse + gamepad'} support | P0 |
| Scene Manager | ${worldStructure} scene transitions | P0 |
| Camera | ${config.cameraStyle || 'Default ' + dimension + ' camera'} system | P0 |
${config.coreMechanics.map((m) => `| ${findLabel(CORE_MECHANICS_OPTIONS, m)} | Core gameplay mechanic | P0 |`).join('\n')}
| Audio | ${musicStyle} music + ${sfx} SFX | P1 |
| UI/HUD | Health, score, minimap, menus | P1 |
| Save/Load | ${isWebEngine ? 'LocalStorage/IndexedDB' : 'File-based'} persistence | P1 |
| ${findLabel(VICTORY_CONDITION_OPTIONS, config.victoryCondition)} | Win/lose condition logic | P1 |

### 10.2 Secondary Systems (MAX Scope)

| System | Description |
|--------|-------------|
${config.secondaryMechanics.map((m) => `| ${findLabel(SECONDARY_MECHANICS_OPTIONS, m)} | Secondary gameplay mechanic |`).join('\n')}
| ${difficulty} Difficulty | AI or rule-based difficulty scaling |
| ${voiceActing !== 'None' ? `Voice System | ${voiceActing} voice acting playback` : 'Localization | Multi-language support'} |${isMultiplayer ? `
| Networking | ${config.multiplayer.networkModel} with ${config.multiplayer.syncType || 'state-sync'} |
| Matchmaking | Player lobby and match pairing |` : ''}
${config.additionalTech.map((t) => `| ${t} | Additional technology integration |`).join('\n')}

---

## 11. DO NOT List

### Game Engine (${engineLabel})

${engine.antiPatterns}

### Game Design

- ❌ Do NOT skip the core gameplay loop — everything else is secondary
- ❌ Do NOT add features before core mechanics feel good
- ❌ Do NOT ignore player feedback during playtesting
- ❌ Do NOT scope creep — stick to MVP milestones first
- ❌ Do NOT mix ${dimension} and incompatible rendering techniques

### General Development

- ❌ Do NOT commit broken builds to main branch
- ❌ Do NOT hardcode values that should be configurable (damage, speed, etc.)
- ❌ Do NOT skip version control for asset files
- ❌ Do NOT ignore platform-specific submission requirements (${distribution})
- ❌ Do NOT leave debug/cheat modes enabled in release builds
- ❌ Do NOT use deprecated ${engineLabel} APIs — check migration guides${config.aiFreetext.constraints ? `

### Project-Specific

${config.aiFreetext.constraints}` : ''}

---

## Appendix

### A. Configuration Summary

${buildConfigSummary(config)}

### B. References

- [${engineLabel} Documentation](${engine.docsUrl})
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)${config.aiFreetext.referenceGames ? `
- Reference Games: ${config.aiFreetext.referenceGames}` : ''}${config.aiFreetext.additionalNotes ? `

### C. Additional Notes

${config.aiFreetext.additionalNotes}` : ''}

---

> **This document is the single source of truth for development.**
> Generated by DevDudes Combo Dude — do not edit structure manually.`
}
