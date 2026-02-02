'use client'

import { getPasswordStrength } from '@/lib/validations/auth'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n/language-provider'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { t } = useTranslation()
  if (!password) return null

  const { score, label, color } = getPasswordStrength(password)
  const maxScore = 6

  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {Array.from({ length: maxScore }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i < score ? color : 'bg-muted'
            )}
          />
        ))}
      </div>
      <p className={cn(
        'text-xs',
        score <= 2 && 'text-red-500',
        score > 2 && score <= 4 && 'text-yellow-600',
        score > 4 && 'text-green-600'
      )}>
        {t('auth.passwordStrength.label')}: {label}
      </p>
    </div>
  )
}
