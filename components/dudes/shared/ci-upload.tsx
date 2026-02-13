'use client'

import { useCallback, useState } from 'react'
import { useTranslation } from '@/lib/i18n/language-provider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Upload, X, Plus, FileText, ImageIcon, Type, Palette, FileSpreadsheet, AlertTriangle } from 'lucide-react'
import type { CIConfig, CIAsset } from '@/lib/shared-pipeline/ci'
import { CI_ASSET_CATEGORIES, MAX_FILE_SIZE, MAX_PREVIEW_SIZE, MAX_BRAND_COLORS } from '@/lib/shared-pipeline/ci'

interface CIUploadProps {
  config: CIConfig
  onUpdate: (updates: Partial<CIConfig>) => void
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function getCategoryIcon(category: CIAsset['category']) {
  switch (category) {
    case 'logo': return <ImageIcon className="h-4 w-4" />
    case 'letterhead': return <FileText className="h-4 w-4" />
    case 'font': return <Type className="h-4 w-4" />
    case 'pptx-master': return <FileSpreadsheet className="h-4 w-4" />
    case 'style-example': return <Palette className="h-4 w-4" />
    default: return <FileText className="h-4 w-4" />
  }
}

function isSafePreviewType(mimeType: string): boolean {
  // Only generate previews for raster images, skip SVG (XSS vector)
  return mimeType.startsWith('image/') && mimeType !== 'image/svg+xml'
}

export function CIUpload({ config, onUpdate }: CIUploadProps) {
  const { t } = useTranslation()
  const [rejectedFiles, setRejectedFiles] = useState<string[]>([])

  const handleFileUpload = useCallback(async (
    files: FileList | null,
    category: CIAsset['category'],
    accept: string,
    maxFiles: number,
  ) => {
    if (!files || files.length === 0) return
    setRejectedFiles([])

    const existingCount = config.assets.filter((a) => a.category === category).length
    const remaining = maxFiles - existingCount
    if (remaining <= 0) return

    // Parse accepted extensions from accept string
    const allowedExts = accept === '*'
      ? null
      : accept.split(',').map((e) => e.trim().toLowerCase())

    const filesToProcess = Array.from(files).slice(0, remaining)
    const rejected: string[] = []

    const results = await Promise.all(
      filesToProcess.map(async (file): Promise<CIAsset | null> => {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
          rejected.push(`${file.name} (too large)`)
          return null
        }

        // Validate file extension
        if (allowedExts) {
          const ext = '.' + file.name.split('.').pop()?.toLowerCase()
          if (!ext || !allowedExts.includes(ext)) {
            rejected.push(`${file.name} (invalid type)`)
            return null
          }
        }

        let preview: string | undefined
        if (isSafePreviewType(file.type) && file.size <= MAX_PREVIEW_SIZE) {
          try {
            preview = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => {
                const result = reader.result
                if (typeof result === 'string' && result.startsWith('data:image/')) {
                  resolve(result)
                } else {
                  resolve('') // Skip preview for non-image data URIs
                }
              }
              reader.onerror = () => reject(new Error('Failed to read file'))
              reader.onabort = () => reject(new Error('File read aborted'))
              reader.readAsDataURL(file)
            })
            if (!preview) preview = undefined
          } catch {
            preview = undefined
          }
        }

        return {
          id: crypto.randomUUID(),
          category,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          preview,
        }
      }),
    )

    if (rejected.length > 0) setRejectedFiles(rejected)

    const newAssets = results.filter((a): a is CIAsset => a !== null)

    if (newAssets.length > 0) {
      onUpdate({ assets: [...config.assets, ...newAssets] })
    }
  }, [config.assets, onUpdate])

  const removeAsset = useCallback((id: string) => {
    onUpdate({ assets: config.assets.filter((a) => a.id !== id) })
  }, [config.assets, onUpdate])

  const addColor = useCallback(() => {
    if (config.brandColors.length >= MAX_BRAND_COLORS) return
    onUpdate({ brandColors: [...config.brandColors, '#000000'] })
  }, [config.brandColors, onUpdate])

  const updateColor = useCallback((index: number, color: string) => {
    // Only accept valid hex colors
    if (!/^#[0-9a-fA-F]{0,6}$/.test(color)) return
    const updated = [...config.brandColors]
    updated[index] = color
    onUpdate({ brandColors: updated })
  }, [config.brandColors, onUpdate])

  const removeColor = useCallback((index: number) => {
    onUpdate({ brandColors: config.brandColors.filter((_, i) => i !== index) })
  }, [config.brandColors, onUpdate])

  return (
    <div className="space-y-6">
      {/* Asset Upload Sections */}
      {CI_ASSET_CATEGORIES.map((cat) => {
        const assets = config.assets.filter((a) => a.category === cat.value)
        const atLimit = assets.length >= cat.maxFiles

        return (
          <div key={cat.value} className="space-y-2">
            <Label className="flex items-center gap-2">
              {getCategoryIcon(cat.value)}
              {t(`ci.categories.${cat.value}`)}
              <span className="text-xs text-muted-foreground">
                ({assets.length}/{cat.maxFiles})
              </span>
            </Label>

            {/* Existing assets */}
            {assets.length > 0 && (
              <div className="space-y-2">
                {assets.map((asset) => (
                  <div key={asset.id} className="flex items-center gap-3 rounded-lg border p-3">
                    {asset.preview && asset.preview.startsWith('data:image/') && !asset.preview.startsWith('data:image/svg') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset.preview}
                        alt={asset.fileName}
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                        {getCategoryIcon(asset.category)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{asset.fileName}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(asset.fileSize)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAsset(asset.id)}
                      className="text-muted-foreground hover:text-destructive flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload dropzone */}
            {!atLimit && (
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 p-4 transition-colors hover:border-primary/50 hover:bg-muted/50">
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {t('ci.upload.dropOrClick')}
                </span>
                <span className="text-[10px] text-muted-foreground/60">
                  {t('ci.upload.maxSize')}
                </span>
                <input
                  type="file"
                  accept={cat.accept}
                  multiple={cat.maxFiles > 1}
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files, cat.value, cat.accept, cat.maxFiles)}
                />
              </label>
            )}
          </div>
        )
      })}

      {/* Rejected files warning */}
      {rejectedFiles.length > 0 && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">{t('ci.upload.rejected')}</p>
            <ul className="mt-1 list-disc pl-4 text-xs">
              {rejectedFiles.map((name) => <li key={name}>{name}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* Brand Colors */}
      <div className="space-y-2">
        <Label>{t('ci.brandColors')}</Label>
        <div className="flex flex-wrap gap-3">
          {config.brandColors.map((color, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border p-2">
              <input
                type="color"
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border-0 p-0"
              />
              <Input
                value={color}
                onChange={(e) => updateColor(i, e.target.value)}
                className="h-8 w-20 font-mono text-xs"
                maxLength={7}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeColor(i)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addColor} disabled={config.brandColors.length >= MAX_BRAND_COLORS} className="h-12">
            <Plus className="mr-1 h-3 w-3" />
            {t('ci.addColor')}
          </Button>
        </div>
      </div>

      {/* Font Names */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>{t('ci.fontPrimary')}</Label>
          <Input
            placeholder={t('ci.fontPrimaryPlaceholder')}
            value={config.fontPrimary}
            onChange={(e) => onUpdate({ fontPrimary: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>{t('ci.fontSecondary')}</Label>
          <Input
            placeholder={t('ci.fontSecondaryPlaceholder')}
            value={config.fontSecondary}
            onChange={(e) => onUpdate({ fontSecondary: e.target.value })}
          />
        </div>
      </div>

      {/* Brand Guidelines URL */}
      <div className="space-y-2">
        <Label>{t('ci.brandUrl')}</Label>
        <Input
          placeholder="https://brand.example.com/guidelines"
          value={config.brandUrl}
          onChange={(e) => onUpdate({ brandUrl: e.target.value })}
        />
      </div>

      {/* Brand Notes */}
      <div className="space-y-2">
        <Label>{t('ci.brandNotes')}</Label>
        <Textarea
          placeholder={t('ci.brandNotesPlaceholder')}
          value={config.brandNotes}
          onChange={(e) => onUpdate({ brandNotes: e.target.value })}
          rows={3}
        />
      </div>
    </div>
  )
}
