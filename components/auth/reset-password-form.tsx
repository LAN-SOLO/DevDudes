'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { resetPassword } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useTranslation } from '@/lib/i18n/language-provider'

export function ResetPasswordForm() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t('auth.resetPassword.title')}</CardTitle>
        <CardDescription>{t('auth.resetPassword.subtitle')}</CardDescription>
      </CardHeader>
      <form action={resetPassword}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          {message && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
              {message}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.resetPassword.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            {t('auth.resetPassword.sendResetLink')}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {t('auth.resetPassword.rememberPassword')}{' '}
            <Link href="/login" className="text-primary hover:underline">
              {t('auth.resetPassword.signIn')}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
