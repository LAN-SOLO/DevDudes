'use client'

import * as React from 'react'
import { Upload, X, File, Image, FileText, FileArchive, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  onFilesChange?: (files: File[]) => void
  onUpload?: (files: File[]) => Promise<void>
  className?: string
}

interface FileWithPreview extends File {
  preview?: string
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  disabled = false,
  onFilesChange,
  onUpload,
  className,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FileWithPreview[]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [uploading, setUploading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateFiles = (fileList: FileList | File[]): File[] => {
    const validFiles: File[] = []
    const fileArray = Array.from(fileList)

    for (const file of fileArray) {
      if (maxSize && file.size > maxSize) {
        setError(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`)
        continue
      }

      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim())
        const fileType = file.type
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension === type.toLowerCase()
          }
          if (type.endsWith('/*')) {
            return fileType.startsWith(type.replace('/*', '/'))
          }
          return fileType === type
        })

        if (!isAccepted) {
          setError(`File "${file.name}" is not an accepted file type`)
          continue
        }
      }

      validFiles.push(file)
    }

    return validFiles
  }

  const addFiles = (newFiles: File[]) => {
    setError(null)
    const validFiles = validateFiles(newFiles)

    if (validFiles.length === 0) return

    const updatedFiles = multiple
      ? [...files, ...validFiles].slice(0, maxFiles)
      : validFiles.slice(0, 1)

    // Create previews for images
    const filesWithPreviews = updatedFiles.map((file) => {
      if (file.type.startsWith('image/') && !(file as FileWithPreview).preview) {
        Object.assign(file, { preview: URL.createObjectURL(file) })
      }
      return file as FileWithPreview
    })

    setFiles(filesWithPreviews)
    onFilesChange?.(filesWithPreviews)
  }

  const removeFile = (index: number) => {
    const file = files[index]
    if (file.preview) {
      URL.revokeObjectURL(file.preview)
    }
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
    setError(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (!disabled && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files))
    }
    // Reset input so the same file can be selected again
    e.target.value = ''
  }

  const handleUpload = async () => {
    if (!onUpload || files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    try {
      // Simulate progress (in real app, use XMLHttpRequest or fetch with progress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 100)

      await onUpload(files)

      clearInterval(progressInterval)
      setUploadProgress(100)

      // Clear files after successful upload
      setTimeout(() => {
        files.forEach((file) => {
          if (file.preview) URL.revokeObjectURL(file.preview)
        })
        setFiles([])
        setUploadProgress(0)
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  // Cleanup previews on unmount
  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview)
      })
    }
  }, [files])

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop zone */}
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer',
          'flex flex-col items-center justify-center gap-2 text-center',
          isDragging && 'border-primary bg-primary/5',
          disabled && 'cursor-not-allowed opacity-50',
          !isDragging && !disabled && 'hover:border-primary/50 hover:bg-muted/50'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className="sr-only"
        />
        <Upload className="h-10 w-10 text-muted-foreground" />
        <div>
          <p className="font-medium">
            {isDragging ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-muted-foreground">
            {accept ? accept.split(',').join(', ') : 'Any file type'} up to {formatFileSize(maxSize)}
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 p-3 rounded-lg border bg-muted/30"
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                  <FileIcon type={file.type} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              {!uploading && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          {/* Upload progress */}
          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-muted-foreground text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Upload button */}
          {onUpload && !uploading && (
            <Button onClick={handleUpload} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload {files.length} {files.length === 1 ? 'file' : 'files'}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// Helper component for file type icons
function FileIcon({ type }: { type: string }) {
  if (type.startsWith('image/')) {
    return <Image className="h-5 w-5 text-muted-foreground" />
  }
  if (type.startsWith('text/') || type.includes('document')) {
    return <FileText className="h-5 w-5 text-muted-foreground" />
  }
  if (type.includes('zip') || type.includes('archive') || type.includes('compressed')) {
    return <FileArchive className="h-5 w-5 text-muted-foreground" />
  }
  return <File className="h-5 w-5 text-muted-foreground" />
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Avatar upload variant
interface AvatarUploadProps {
  src?: string
  onImageChange?: (file: File | null) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export function AvatarUpload({
  src,
  onImageChange,
  size = 'md',
  disabled = false,
  className,
}: AvatarUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(src || null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (preview && preview !== src) {
        URL.revokeObjectURL(preview)
      }
      const url = URL.createObjectURL(file)
      setPreview(url)
      onImageChange?.(file)
    }
    e.target.value = ''
  }

  const handleRemove = () => {
    if (preview && preview !== src) {
      URL.revokeObjectURL(preview)
    }
    setPreview(null)
    onImageChange?.(null)
  }

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          'rounded-full overflow-hidden bg-muted flex items-center justify-center cursor-pointer',
          'border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 transition-colors',
          sizeClasses[size],
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
        />
        {preview ? (
          <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
        ) : (
          <Upload className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      {preview && !disabled && (
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute -top-1 -right-1 h-6 w-6 rounded-full"
          onClick={handleRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  )
}
