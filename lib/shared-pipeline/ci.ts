import { z } from 'zod'

// ── Types ─────────────────────────────────────────────────────────

export interface CIAsset {
  id: string
  category: 'logo' | 'letterhead' | 'font' | 'pptx-master' | 'style-example' | 'other'
  fileName: string
  fileType: string
  fileSize: number
  preview?: string
}

export interface CIConfig {
  assets: CIAsset[]
  brandColors: string[]
  fontPrimary: string
  fontSecondary: string
  brandUrl: string
  brandNotes: string
}

// ── Constants ─────────────────────────────────────────────────────

export const CI_ASSET_CATEGORIES = [
  { value: 'logo' as const, label: 'Logo', accept: '.png,.svg,.jpg,.jpeg,.webp', maxFiles: 1 },
  { value: 'letterhead' as const, label: 'Company Letterhead', accept: '.png,.jpg,.jpeg,.pdf', maxFiles: 1 },
  { value: 'font' as const, label: 'Font Files', accept: '.ttf,.otf,.woff,.woff2', maxFiles: 5 },
  { value: 'pptx-master' as const, label: 'PPTX Master', accept: '.pptx', maxFiles: 1 },
  { value: 'style-example' as const, label: 'Style Examples', accept: '.png,.jpg,.jpeg,.pdf,.webp', maxFiles: 10 },
  { value: 'other' as const, label: 'Other', accept: '*', maxFiles: 5 },
] as const

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const MAX_PREVIEW_SIZE = 500 * 1024 // 500KB — skip base64 preview for larger images
export const MAX_BRAND_COLORS = 20
export const MAX_BRAND_NOTE_LENGTH = 2000
export const MAX_FONT_NAME_LENGTH = 100
export const MAX_URL_LENGTH = 500

// ── Zod Schemas ───────────────────────────────────────────────────

export const ciAssetSchema = z.object({
  id: z.string().max(64),
  category: z.enum(['logo', 'letterhead', 'font', 'pptx-master', 'style-example', 'other']),
  fileName: z.string().max(255),
  fileType: z.string().max(100),
  fileSize: z.number().min(0).max(MAX_FILE_SIZE),
  preview: z.string().regex(/^data:image\/(?!svg)/).max(1_000_000).optional(),
})

export const ciConfigSchema = z.object({
  assets: z.array(ciAssetSchema).max(23).default([]), // sum of all category maxFiles
  brandColors: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).max(MAX_BRAND_COLORS).default([]),
  fontPrimary: z.string().max(MAX_FONT_NAME_LENGTH).default(''),
  fontSecondary: z.string().max(MAX_FONT_NAME_LENGTH).default(''),
  brandUrl: z.string().max(MAX_URL_LENGTH).default(''),
  brandNotes: z.string().max(MAX_BRAND_NOTE_LENGTH).default(''),
})

// ── Defaults ──────────────────────────────────────────────────────

export const defaultCIConfig: CIConfig = {
  assets: [],
  brandColors: [],
  fontPrimary: '',
  fontSecondary: '',
  brandUrl: '',
  brandNotes: '',
}
