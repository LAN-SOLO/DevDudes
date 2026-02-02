'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { updatePassword } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PasswordStrength } from '@/components/auth/password-strength'
import { useTranslation } from '@/lib/i18n/language-provider'

export function UpdatePasswordForm() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [password, setPassword] = useState('')

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t('auth.updatePassword.title')}</CardTitle>
        <CardDescription>{t('auth.updatePassword.subtitle')}</CardDescription>
      </CardHeader>
      <form action={updatePassword}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.updatePassword.newPassword')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PasswordStrength password={password} />
            <p className="text-xs text-muted-foreground">
              {t('auth.updatePassword.passwordRequirements')}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('auth.updatePassword.confirmPassword')}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              minLength={8}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {t('auth.updatePassword.updatePassword')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
