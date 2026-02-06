import type { GameOption, StepCategory } from './types'

// ── Nav Categories ──────────────────────────────────────────────
export const STEP_CATEGORIES: StepCategory[] = [
  { id: 'setup', label: 'Setup', steps: [1, 2, 3] },
  { id: 'design', label: 'Design', steps: [4, 5, 6, 7] },
  { id: 'world', label: 'World', steps: [8, 9, 10] },
  { id: 'systems', label: 'Systems', steps: [11, 12, 13] },
  { id: 'tech', label: 'Tech', steps: [14, 15, 16] },
]

export const STEP_LABELS: Record<number, string> = {
  1: 'Import',
  2: 'Theme',
  3: 'Narrative',
  4: 'Genre',
  5: 'Platform',
  6: 'Visual',
  7: 'Camera',
  8: 'World',
  9: 'Player',
  10: 'Core Mechanics',
  11: 'Secondary',
  12: 'Progression',
  13: 'Audio',
  14: 'Engine',
  15: 'Monetization',
  16: 'AI & Notes',
}

// ── Step 2: Themes ──────────────────────────────────────────────
export const THEME_OPTIONS: GameOption[] = [
  { value: 'fantasy', label: 'Fantasy', icon: 'Wand2', description: 'Magic, mythical creatures, enchanted worlds', examples: ['Zelda', 'Elden Ring'] },
  { value: 'sci-fi', label: 'Sci-Fi', icon: 'Rocket', description: 'Futuristic technology, space exploration', examples: ['Mass Effect', 'Halo'] },
  { value: 'horror', label: 'Horror', icon: 'Skull', description: 'Fear, suspense, dark atmospheres', examples: ['Resident Evil', 'Silent Hill'] },
  { value: 'post-apocalyptic', label: 'Post-Apocalyptic', icon: 'Radiation', description: 'Survival in destroyed civilizations', examples: ['Fallout', 'The Last of Us'] },
  { value: 'medieval', label: 'Medieval', icon: 'Sword', description: 'Knights, castles, historical warfare', examples: ['Dark Souls', 'Kingdom Come'] },
  { value: 'cyberpunk', label: 'Cyberpunk', icon: 'CircuitBoard', description: 'High tech, low life, neon-lit cities', examples: ['Cyberpunk 2077', 'Deus Ex'] },
  { value: 'steampunk', label: 'Steampunk', icon: 'Cog', description: 'Victorian-era tech meets industrialism', examples: ['Bioshock Infinite', 'Dishonored'] },
  { value: 'mythology', label: 'Mythology', icon: 'Landmark', description: 'Ancient gods, legends, folklore', examples: ['God of War', 'Hades'] },
  { value: 'pirates', label: 'Pirates', icon: 'Anchor', description: 'Maritime adventure, treasure hunting', examples: ['Sea of Thieves', 'Monkey Island'] },
  { value: 'western', label: 'Western', icon: 'Sun', description: 'Frontier life, cowboys, outlaws', examples: ['Red Dead Redemption'] },
  { value: 'cartoon', label: 'Cartoon', icon: 'Palette', description: 'Fun, colorful, whimsical', examples: ['Cuphead', 'Rayman'] },
  { value: 'military', label: 'Military', icon: 'Shield', description: 'Realistic warfare, tactical operations', examples: ['Call of Duty', 'Arma'] },
  { value: 'nature', label: 'Nature', icon: 'Leaf', description: 'Wildlife, ecosystems, natural world', examples: ['Stardew Valley', 'Subnautica'] },
  { value: 'abstract', label: 'Abstract', icon: 'Hexagon', description: 'Non-representational, conceptual', examples: ['Tetris', 'Geometry Dash'] },
  { value: 'urban', label: 'Urban', icon: 'Building2', description: 'Modern city life, street culture', examples: ['GTA', 'Spider-Man'] },
]

// ── Step 3: Narrative ───────────────────────────────────────────
export const NARRATIVE_FOCUS_OPTIONS: GameOption[] = [
  { value: 'story-driven', label: 'Story-Driven', icon: 'BookOpen', description: 'Rich narrative with deep plot and character arcs' },
  { value: 'lore-heavy', label: 'Lore-Heavy', icon: 'Scroll', description: 'Extensive world-building via environmental storytelling' },
  { value: 'minimal', label: 'Minimal', icon: 'MessageSquare', description: 'Light story; gameplay takes center stage' },
  { value: 'emergent', label: 'Emergent', icon: 'Shuffle', description: 'Player-driven stories through systems and choices' },
  { value: 'none', label: 'No Narrative', icon: 'Gamepad2', description: 'Pure gameplay with no story elements' },
]

export const STORY_STRUCTURE_OPTIONS: GameOption[] = [
  { value: 'linear', label: 'Linear', icon: 'ArrowRight', description: 'Fixed sequence of events' },
  { value: 'branching', label: 'Branching', icon: 'GitBranch', description: 'Player choices affect the story path' },
  { value: 'open-ended', label: 'Open-Ended', icon: 'Globe', description: 'Non-linear, explore in any order' },
  { value: 'episodic', label: 'Episodic', icon: 'Tv', description: 'Self-contained chapters or episodes' },
  { value: 'procedural', label: 'Procedural', icon: 'Dices', description: 'Randomly generated story beats' },
]

export const VICTORY_CONDITION_OPTIONS: GameOption[] = [
  { value: 'boss-defeat', label: 'Boss Defeat', icon: 'Skull', description: 'Defeat a final boss or antagonist' },
  { value: 'story-completion', label: 'Story Complete', icon: 'BookMarked', description: 'Reach the end of the narrative' },
  { value: 'score-based', label: 'High Score', icon: 'Trophy', description: 'Achieve the highest score possible' },
  { value: 'survival', label: 'Survival', icon: 'Timer', description: 'Survive as long as possible' },
  { value: 'sandbox', label: 'Sandbox', icon: 'Infinity', description: 'No win condition - open play' },
  { value: 'competitive', label: 'Competitive', icon: 'Medal', description: 'Outlast or outscore other players' },
  { value: 'completion', label: '100% Completion', icon: 'CheckCircle', description: 'Collect or complete everything' },
]

// ── Step 4: Genre ───────────────────────────────────────────────
export const GENRE_OPTIONS: GameOption[] = [
  { value: 'action', label: 'Action', icon: 'Zap', description: 'Fast-paced combat and reflexes' },
  { value: 'adventure', label: 'Adventure', icon: 'Map', description: 'Exploration and puzzle-solving' },
  { value: 'rpg', label: 'RPG', icon: 'Swords', description: 'Character progression, stats, loot' },
  { value: 'strategy', label: 'Strategy', icon: 'Brain', description: 'Tactical planning and resource management' },
  { value: 'simulation', label: 'Simulation', icon: 'SlidersHorizontal', description: 'Realistic systems and management' },
  { value: 'puzzle', label: 'Puzzle', icon: 'Puzzle', description: 'Logic challenges and brain teasers' },
  { value: 'platformer', label: 'Platformer', icon: 'Footprints', description: 'Jumping between platforms, timing' },
  { value: 'shooter', label: 'Shooter', icon: 'Crosshair', description: 'Ranged combat (FPS or TPS)' },
  { value: 'fighting', label: 'Fighting', icon: 'Flame', description: 'Close combat between characters' },
  { value: 'racing', label: 'Racing', icon: 'Car', description: 'Vehicle or character racing' },
  { value: 'sports', label: 'Sports', icon: 'Activity', description: 'Real-world sports simulation' },
  { value: 'survival', label: 'Survival', icon: 'Tent', description: 'Resource gathering, crafting, staying alive' },
  { value: 'horror', label: 'Horror', icon: 'Ghost', description: 'Scares, tension, and dread' },
  { value: 'stealth', label: 'Stealth', icon: 'EyeOff', description: 'Sneaking, avoiding detection' },
  { value: 'sandbox', label: 'Sandbox', icon: 'Box', description: 'Open-ended creative freedom' },
  { value: 'roguelike', label: 'Roguelike', icon: 'Dices', description: 'Permadeath, procedural generation' },
  { value: 'rhythm', label: 'Rhythm', icon: 'Music', description: 'Music-based gameplay' },
  { value: 'tower-defense', label: 'Tower Defense', icon: 'Shield', description: 'Strategic placement of defenses' },
  { value: 'visual-novel', label: 'Visual Novel', icon: 'BookOpen', description: 'Story-driven with choice mechanics' },
  { value: 'idle', label: 'Idle/Incremental', icon: 'TrendingUp', description: 'Automated progression over time' },
]

// ── Step 5: Platform ────────────────────────────────────────────
export const PLATFORM_OPTIONS: GameOption[] = [
  { value: 'pc-windows', label: 'PC (Windows)', icon: 'Monitor', description: 'Windows desktop' },
  { value: 'pc-mac', label: 'PC (macOS)', icon: 'Laptop', description: 'macOS desktop' },
  { value: 'pc-linux', label: 'PC (Linux)', icon: 'Terminal', description: 'Linux desktop' },
  { value: 'web', label: 'Web Browser', icon: 'Globe', description: 'HTML5 / WebGL' },
  { value: 'mobile-ios', label: 'iOS', icon: 'Smartphone', description: 'iPhone and iPad' },
  { value: 'mobile-android', label: 'Android', icon: 'Tablet', description: 'Android phones and tablets' },
  { value: 'console-playstation', label: 'PlayStation', icon: 'Gamepad2', description: 'PS4 / PS5' },
  { value: 'console-xbox', label: 'Xbox', icon: 'Gamepad', description: 'Xbox Series X/S' },
  { value: 'console-switch', label: 'Nintendo Switch', icon: 'Joystick', description: 'Switch / Switch 2' },
  { value: 'vr', label: 'VR', icon: 'Glasses', description: 'Virtual Reality headsets' },
]

// ── Step 6: Visual ──────────────────────────────────────────────
export const DIMENSION_OPTIONS: GameOption[] = [
  { value: '2d', label: '2D', icon: 'Square', description: 'Flat, two-dimensional graphics' },
  { value: '2.5d', label: '2.5D', icon: 'Layers', description: 'Isometric or parallax depth' },
  { value: '3d', label: '3D', icon: 'Box', description: 'Full three-dimensional environment' },
]

export const ART_STYLE_OPTIONS: GameOption[] = [
  { value: 'pixel-art', label: 'Pixel Art', icon: 'Grid3X3', description: 'Retro pixel-based graphics' },
  { value: 'hand-drawn', label: 'Hand-Drawn', icon: 'Pencil', description: 'Sketch or painted aesthetic' },
  { value: 'cel-shaded', label: 'Cel-Shaded', icon: 'Palette', description: 'Comic book / cartoon style 3D' },
  { value: 'realistic', label: 'Realistic', icon: 'Camera', description: 'Photo-realistic graphics' },
  { value: 'low-poly', label: 'Low-Poly', icon: 'Gem', description: 'Minimalist geometric style' },
  { value: 'voxel', label: 'Voxel', icon: 'Blocks', description: 'Block-based 3D (Minecraft-like)' },
  { value: 'vector', label: 'Vector', icon: 'PenTool', description: 'Clean, scalable vector art' },
  { value: 'anime', label: 'Anime', icon: 'Flower2', description: 'Japanese animation style' },
  { value: 'minimalist', label: 'Minimalist', icon: 'Minimize', description: 'Simple shapes, clean design' },
  { value: 'stylized', label: 'Stylized', icon: 'Sparkles', description: 'Unique artistic interpretation' },
]

// ── Step 7: Camera ──────────────────────────────────────────────
export const CAMERA_OPTIONS_2D: GameOption[] = [
  { value: 'side-scroll', label: 'Side-Scroll', icon: 'ArrowRight', description: 'Horizontal scrolling view' },
  { value: 'top-down', label: 'Top-Down', icon: 'ArrowDown', description: 'Bird-eye overhead view' },
  { value: 'static', label: 'Static Screen', icon: 'Monitor', description: 'Fixed camera per room/level' },
  { value: 'free-scroll', label: 'Free Scroll', icon: 'Move', description: 'Multi-directional scrolling' },
]

export const CAMERA_OPTIONS_25D: GameOption[] = [
  { value: 'isometric', label: 'Isometric', icon: 'Diamond', description: 'Angled top-down perspective' },
  { value: 'side-scroll', label: 'Side-Scroll', icon: 'ArrowRight', description: 'Horizontal with parallax depth' },
  { value: 'top-down', label: 'Top-Down', icon: 'ArrowDown', description: 'Overhead with depth layers' },
]

export const CAMERA_OPTIONS_3D: GameOption[] = [
  { value: 'first-person', label: 'First-Person', icon: 'Eye', description: 'Through the character\'s eyes' },
  { value: 'third-person', label: 'Third-Person', icon: 'User', description: 'Behind/over-the-shoulder camera' },
  { value: 'isometric-3d', label: 'Isometric 3D', icon: 'Diamond', description: 'Fixed-angle 3D view' },
  { value: 'top-down-3d', label: 'Top-Down 3D', icon: 'ArrowDown', description: 'Overhead 3D perspective' },
  { value: 'free-camera', label: 'Free Camera', icon: 'Video', description: 'Player-controlled camera' },
  { value: 'fixed-angles', label: 'Fixed Angles', icon: 'Aperture', description: 'Pre-set cinematic angles' },
]

// ── Step 8: World ───────────────────────────────────────────────
export const WORLD_STRUCTURE_OPTIONS: GameOption[] = [
  { value: 'open-world', label: 'Open World', icon: 'Globe', description: 'Large seamless explorable world' },
  { value: 'level-based', label: 'Level-Based', icon: 'Target', description: 'Discrete, designed levels/stages' },
  { value: 'hub-and-spoke', label: 'Hub & Spoke', icon: 'Network', description: 'Central hub connecting areas' },
  { value: 'procedural', label: 'Procedural', icon: 'Dices', description: 'Randomly generated layouts' },
  { value: 'room-based', label: 'Room-Based', icon: 'DoorOpen', description: 'Connected rooms / dungeons' },
  { value: 'linear-corridor', label: 'Linear Corridor', icon: 'Ruler', description: 'Guided path with scenery' },
]

export const LEVEL_GENERATION_OPTIONS: GameOption[] = [
  { value: 'hand-crafted', label: 'Hand-Crafted', icon: 'Hand', description: 'Manually designed levels' },
  { value: 'procedural', label: 'Procedural', icon: 'Dices', description: 'Algorithmically generated' },
  { value: 'hybrid', label: 'Hybrid', icon: 'Shuffle', description: 'Mix of designed and generated' },
  { value: 'user-created', label: 'User-Created', icon: 'Wrench', description: 'Level editor for players' },
]

export const WORLD_SCOPE_OPTIONS: GameOption[] = [
  { value: 'small', label: 'Small', icon: 'Package', description: 'Compact, focused experience (1-3 hours)' },
  { value: 'medium', label: 'Medium', icon: 'ClipboardList', description: 'Moderate scope (5-15 hours)' },
  { value: 'large', label: 'Large', icon: 'Map', description: 'Expansive world (20-50 hours)' },
  { value: 'massive', label: 'Massive', icon: 'Orbit', description: 'Enormous scale (50+ hours)' },
]

// ── Step 9: Player ──────────────────────────────────────────────
export const PLAYER_MODE_OPTIONS: GameOption[] = [
  { value: 'single-player', label: 'Single-Player', icon: 'User', description: 'Solo experience only' },
  { value: 'local-multiplayer', label: 'Local Multiplayer', icon: 'Users', description: 'Shared screen / split screen' },
  { value: 'online-multiplayer', label: 'Online Multiplayer', icon: 'Globe', description: 'Connected over the internet' },
  { value: 'co-op', label: 'Co-op', icon: 'Handshake', description: 'Cooperative play (online or local)' },
  { value: 'mmo', label: 'MMO', icon: 'Globe', description: 'Massively multiplayer online' },
]

export const NETWORK_MODEL_OPTIONS: GameOption[] = [
  { value: 'peer-to-peer', label: 'Peer-to-Peer', icon: 'Network', description: 'Direct player connections' },
  { value: 'client-server', label: 'Client-Server', icon: 'Monitor', description: 'Dedicated or listen server' },
  { value: 'relay', label: 'Relay', icon: 'Satellite', description: 'Relay server for NAT traversal' },
]

export const SYNC_TYPE_OPTIONS: GameOption[] = [
  { value: 'lockstep', label: 'Lockstep', icon: 'Lock', description: 'Deterministic synchronized frames' },
  { value: 'state-sync', label: 'State Sync', icon: 'RefreshCcw', description: 'Server authoritative state' },
  { value: 'snapshot', label: 'Snapshot Interpolation', icon: 'Camera', description: 'Periodic state snapshots' },
]

// ── Step 10: Core Mechanics ─────────────────────────────────────
export const CORE_MECHANICS_OPTIONS: GameOption[] = [
  { value: 'combat-melee', label: 'Melee Combat', icon: 'Sword', description: 'Close-range weapon fighting' },
  { value: 'combat-ranged', label: 'Ranged Combat', icon: 'Crosshair', description: 'Projectile / gun combat' },
  { value: 'combat-magic', label: 'Magic Combat', icon: 'Wand2', description: 'Spellcasting and abilities' },
  { value: 'platforming', label: 'Platforming', icon: 'Footprints', description: 'Jumping and traversal' },
  { value: 'puzzle-solving', label: 'Puzzle Solving', icon: 'Puzzle', description: 'Logic and spatial puzzles' },
  { value: 'resource-management', label: 'Resource Mgmt', icon: 'Package', description: 'Gathering, crafting, managing inventory' },
  { value: 'building', label: 'Building', icon: 'Hammer', description: 'Construction and placement' },
  { value: 'stealth', label: 'Stealth', icon: 'EyeOff', description: 'Sneaking and avoidance' },
  { value: 'driving', label: 'Driving/Racing', icon: 'Car', description: 'Vehicle control and races' },
  { value: 'dialogue', label: 'Dialogue', icon: 'MessageSquare', description: 'Conversation and choices' },
  { value: 'exploration', label: 'Exploration', icon: 'Compass', description: 'Discovering new areas and secrets' },
  { value: 'rhythm', label: 'Rhythm/Music', icon: 'Music', description: 'Timing-based musical inputs' },
  { value: 'card-based', label: 'Card-Based', icon: 'Layers', description: 'Deck building and card play' },
  { value: 'turn-based', label: 'Turn-Based', icon: 'RotateCcw', description: 'Sequential player turns' },
  { value: 'real-time-strategy', label: 'Real-Time Strategy', icon: 'Timer', description: 'Continuous strategic decisions' },
  { value: 'physics', label: 'Physics', icon: 'Circle', description: 'Physics-based interactions' },
]

// ── Step 11: Secondary Mechanics ────────────────────────────────
export const SECONDARY_MECHANICS_OPTIONS: GameOption[] = [
  { value: 'crafting', label: 'Crafting', icon: 'Hammer', description: 'Combine materials to create items' },
  { value: 'trading', label: 'Trading', icon: 'Coins', description: 'Buy, sell, and barter' },
  { value: 'farming', label: 'Farming', icon: 'Leaf', description: 'Grow crops and raise animals' },
  { value: 'fishing', label: 'Fishing', icon: 'Fish', description: 'Fishing mini-game system' },
  { value: 'cooking', label: 'Cooking', icon: 'Flame', description: 'Food preparation for buffs' },
  { value: 'companions', label: 'Companions', icon: 'Users', description: 'AI-controlled allies' },
  { value: 'pet-system', label: 'Pet System', icon: 'PawPrint', description: 'Collectible / tameable creatures' },
  { value: 'photography', label: 'Photography', icon: 'Camera', description: 'In-game photo mode or mechanic' },
  { value: 'mini-games', label: 'Mini-Games', icon: 'Dices', description: 'Small side activities' },
  { value: 'hacking', label: 'Hacking', icon: 'Terminal', description: 'Digital infiltration puzzles' },
  { value: 'diplomacy', label: 'Diplomacy', icon: 'Handshake', description: 'Negotiation and alliances' },
  { value: 'base-building', label: 'Base Building', icon: 'Home', description: 'Build and upgrade a home base' },
  { value: 'weather-system', label: 'Weather', icon: 'Cloud', description: 'Dynamic weather affecting gameplay' },
  { value: 'day-night', label: 'Day/Night Cycle', icon: 'Sunrise', description: 'Time progression mechanic' },
  { value: 'reputation', label: 'Reputation', icon: 'Star', description: 'Faction standing and renown' },
]

// ── Step 12: Progression ────────────────────────────────────────
export const PROGRESSION_SYSTEM_OPTIONS: GameOption[] = [
  { value: 'xp-levels', label: 'XP & Levels', icon: 'BarChart3', description: 'Experience points and leveling up' },
  { value: 'skill-tree', label: 'Skill Tree', icon: 'GitBranch', description: 'Branching ability unlocks' },
  { value: 'equipment-loot', label: 'Equipment/Loot', icon: 'Gem', description: 'Find and equip better gear' },
  { value: 'unlock-system', label: 'Unlocks', icon: 'Unlock', description: 'Gradually unlock content' },
  { value: 'prestige', label: 'Prestige/Reset', icon: 'RotateCcw', description: 'Reset for permanent bonuses' },
  { value: 'story-progress', label: 'Story Progress', icon: 'BookOpen', description: 'Advance through narrative' },
  { value: 'achievement', label: 'Achievements', icon: 'Medal', description: 'Goal-based milestones' },
  { value: 'mastery', label: 'Mastery', icon: 'Star', description: 'Skill-based improvement' },
]

export const DIFFICULTY_OPTIONS: GameOption[] = [
  { value: 'fixed-easy', label: 'Fixed Easy', icon: 'Smile', description: 'Single easy difficulty' },
  { value: 'fixed-medium', label: 'Fixed Medium', icon: 'Meh', description: 'Single balanced difficulty' },
  { value: 'fixed-hard', label: 'Fixed Hard', icon: 'Angry', description: 'Single challenging difficulty' },
  { value: 'selectable', label: 'Selectable', icon: 'SlidersHorizontal', description: 'Player chooses difficulty' },
  { value: 'adaptive', label: 'Adaptive', icon: 'Bot', description: 'AI adjusts based on performance' },
  { value: 'scaling', label: 'Scaling', icon: 'TrendingUp', description: 'Difficulty increases over time' },
]

export const REWARD_TYPE_OPTIONS: GameOption[] = [
  { value: 'currency', label: 'Currency', icon: 'Coins', description: 'In-game money' },
  { value: 'items', label: 'Items/Loot', icon: 'Gift', description: 'Weapons, armor, consumables' },
  { value: 'cosmetics', label: 'Cosmetics', icon: 'Paintbrush', description: 'Visual customization' },
  { value: 'abilities', label: 'Abilities', icon: 'Zap', description: 'New skills or powers' },
  { value: 'story-content', label: 'Story Content', icon: 'BookOpen', description: 'Narrative unlocks' },
  { value: 'areas', label: 'New Areas', icon: 'Map', description: 'Access to new zones' },
]

// ── Step 13: Audio ──────────────────────────────────────────────
export const MUSIC_STYLE_OPTIONS: GameOption[] = [
  { value: 'orchestral', label: 'Orchestral', icon: 'Music', description: 'Full symphony / cinematic' },
  { value: 'electronic', label: 'Electronic', icon: 'Headphones', description: 'Synth, EDM, ambient electronic' },
  { value: 'rock-metal', label: 'Rock/Metal', icon: 'Guitar', description: 'Guitar-driven heavy tracks' },
  { value: 'chiptune', label: 'Chiptune', icon: 'Binary', description: 'Retro 8-bit/16-bit music' },
  { value: 'ambient', label: 'Ambient', icon: 'Waves', description: 'Atmospheric soundscapes' },
  { value: 'jazz', label: 'Jazz', icon: 'Drum', description: 'Jazz and blues influences' },
  { value: 'minimal-drone', label: 'Minimal/Drone', icon: 'Volume', description: 'Dark, minimal tonal textures' },
  { value: 'folk', label: 'Folk/Acoustic', icon: 'Flower2', description: 'Traditional instruments' },
  { value: 'hip-hop', label: 'Hip-Hop', icon: 'Mic', description: 'Beats and urban vibes' },
  { value: 'adaptive', label: 'Adaptive/Dynamic', icon: 'Shuffle', description: 'Music changes with gameplay' },
]

export const SOUND_EFFECT_OPTIONS: GameOption[] = [
  { value: 'realistic', label: 'Realistic', icon: 'Volume', description: 'Real-world accurate sounds' },
  { value: 'stylized', label: 'Stylized', icon: 'Sparkles', description: 'Exaggerated and fun SFX' },
  { value: 'retro', label: 'Retro', icon: 'Binary', description: '8-bit / 16-bit style bleeps' },
  { value: 'foley', label: 'Foley', icon: 'Mic', description: 'Detailed environmental audio' },
  { value: 'minimal', label: 'Minimal', icon: 'VolumeX', description: 'Sparse, intentional sounds' },
]

export const VOICE_ACTING_OPTIONS: GameOption[] = [
  { value: 'full', label: 'Full Voice Acting', icon: 'Theater', description: 'All dialogue voiced' },
  { value: 'partial', label: 'Partial', icon: 'MessageSquare', description: 'Key scenes voiced only' },
  { value: 'grunts', label: 'Grunts/Emotes', icon: 'Angry', description: 'Character sounds, no dialogue' },
  { value: 'none', label: 'None', icon: 'VolumeX', description: 'Text only' },
  { value: 'ai-generated', label: 'AI Generated', icon: 'Bot', description: 'TTS / AI voice synthesis' },
]

// ── Step 14: Engine ─────────────────────────────────────────────
export const ENGINE_OPTIONS: GameOption[] = [
  { value: 'unity', label: 'Unity', icon: 'Gamepad2', description: 'Popular cross-platform engine (C#)' },
  { value: 'unreal', label: 'Unreal Engine', icon: 'Clapperboard', description: 'AAA-quality engine (C++/Blueprints)' },
  { value: 'godot', label: 'Godot', icon: 'Triangle', description: 'Open-source engine (GDScript/C#)' },
  { value: 'phaser3', label: 'Phaser 3', icon: 'Globe', description: 'JavaScript 2D web game framework' },
  { value: 'threejs', label: 'Three.js', icon: 'Box', description: 'JavaScript 3D library for web' },
  { value: 'pixijs', label: 'PixiJS', icon: 'Sparkles', description: 'Fast 2D WebGL renderer' },
  { value: 'gamemaker', label: 'GameMaker', icon: 'Hammer', description: '2D-focused engine (GML)' },
  { value: 'rpgmaker', label: 'RPG Maker', icon: 'Swords', description: 'RPG-specific creation tool' },
  { value: 'construct', label: 'Construct', icon: 'Blocks', description: 'No-code/visual scripting 2D engine' },
  { value: 'bevy', label: 'Bevy', icon: 'Settings', description: 'Rust-based ECS game engine' },
  { value: 'custom', label: 'Custom Engine', icon: 'Cog', description: 'Build your own from scratch' },
]

export const TARGET_FPS_OPTIONS: GameOption[] = [
  { value: '30', label: '30 FPS', icon: 'Film', description: 'Standard for consoles / mobile' },
  { value: '60', label: '60 FPS', icon: 'Monitor', description: 'Smooth for most platforms' },
  { value: '120', label: '120 FPS', icon: 'Zap', description: 'High-refresh competitive' },
  { value: 'uncapped', label: 'Uncapped', icon: 'Rocket', description: 'No frame limit' },
]

export const ADDITIONAL_TECH_OPTIONS: GameOption[] = [
  { value: 'ray-tracing', label: 'Ray Tracing', icon: 'Lightbulb', description: 'Realistic lighting and reflections' },
  { value: 'physics-engine', label: 'Physics Engine', icon: 'Circle', description: 'Advanced physics simulation' },
  { value: 'ai-navigation', label: 'AI Navigation', icon: 'Navigation', description: 'Pathfinding and AI behavior' },
  { value: 'networking', label: 'Networking', icon: 'Wifi', description: 'Multiplayer networking layer' },
  { value: 'procedural-gen', label: 'Procedural Gen', icon: 'Dices', description: 'Algorithmic content creation' },
  { value: 'mod-support', label: 'Mod Support', icon: 'Wrench', description: 'Community modding tools' },
  { value: 'cloud-save', label: 'Cloud Save', icon: 'Cloud', description: 'Cloud-synced progress' },
  { value: 'analytics', label: 'Analytics', icon: 'BarChart3', description: 'Telemetry and player analytics' },
]

// ── Step 15: Monetization ───────────────────────────────────────
export const BUSINESS_MODEL_OPTIONS: GameOption[] = [
  { value: 'premium', label: 'Premium', icon: 'Gem', description: 'One-time purchase price' },
  { value: 'free-to-play', label: 'Free-to-Play', icon: 'Gift', description: 'Free with optional purchases' },
  { value: 'freemium', label: 'Freemium', icon: 'CreditCard', description: 'Free base + paid upgrades' },
  { value: 'subscription', label: 'Subscription', icon: 'Repeat', description: 'Monthly/yearly access fee' },
  { value: 'ad-supported', label: 'Ad-Supported', icon: 'Tv', description: 'Free with advertisements' },
  { value: 'donation', label: 'Donation-Based', icon: 'Heart', description: 'Pay what you want' },
  { value: 'open-source', label: 'Open Source', icon: 'Code', description: 'Free and open source' },
]

export const DISTRIBUTION_OPTIONS: GameOption[] = [
  { value: 'steam', label: 'Steam', icon: 'Gamepad2', description: 'Valve\'s PC platform' },
  { value: 'epic', label: 'Epic Games Store', icon: 'Store', description: 'Epic\'s PC storefront' },
  { value: 'itch', label: 'itch.io', icon: 'Target', description: 'Indie game marketplace' },
  { value: 'app-store', label: 'App Store', icon: 'Smartphone', description: 'Apple iOS distribution' },
  { value: 'google-play', label: 'Google Play', icon: 'Tablet', description: 'Android distribution' },
  { value: 'web', label: 'Web (Self-Hosted)', icon: 'Globe', description: 'Host on your own website' },
  { value: 'gog', label: 'GOG', icon: 'Shield', description: 'DRM-free distribution' },
  { value: 'console-store', label: 'Console Stores', icon: 'Joystick', description: 'PlayStation/Xbox/Nintendo stores' },
]

// ── Step 16: AI ─────────────────────────────────────────────────
export const IN_GAME_AI_OPTIONS: GameOption[] = [
  { value: 'npc-behavior', label: 'NPC Behavior', icon: 'Bot', description: 'Intelligent non-player characters' },
  { value: 'dynamic-dialogue', label: 'Dynamic Dialogue', icon: 'MessageSquare', description: 'AI-generated conversations' },
  { value: 'procedural-content', label: 'Procedural Content', icon: 'Dices', description: 'AI-generated levels/quests' },
  { value: 'adaptive-difficulty', label: 'Adaptive Difficulty', icon: 'TrendingUp', description: 'AI-tuned challenge level' },
  { value: 'enemy-ai', label: 'Advanced Enemy AI', icon: 'Skull', description: 'Smart enemy tactics' },
  { value: 'none', label: 'None', icon: 'X', description: 'No in-game AI features' },
]

export const DEV_AI_OPTIONS: GameOption[] = [
  { value: 'code-generation', label: 'Code Generation', icon: 'Code', description: 'AI-assisted coding' },
  { value: 'asset-generation', label: 'Asset Generation', icon: 'Paintbrush', description: 'AI-generated art/music/3D models' },
  { value: 'testing', label: 'AI Testing', icon: 'TestTube', description: 'AI-powered QA and testing' },
  { value: 'balancing', label: 'Game Balancing', icon: 'Scale', description: 'AI-assisted balance tuning' },
  { value: 'localization', label: 'Localization', icon: 'Languages', description: 'AI translation of content' },
  { value: 'none', label: 'None', icon: 'X', description: 'No dev AI tools' },
]
