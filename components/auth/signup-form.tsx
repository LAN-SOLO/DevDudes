'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { signup } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { PasswordStrength } from '@/components/auth/password-strength'
import { OAuthButtons } from '@/components/auth/oauth-buttons'
import { useTranslation } from '@/lib/i18n/language-provider'

export function SignupForm() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  const [password, setPassword] = useState('')

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t('auth.signup.title')}</CardTitle>
        <CardDescription>{t('auth.signup.subtitle')}</CardDescription>
      </CardHeader>
      <form action={signup}>
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

          <OAuthButtons />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('auth.login.orContinueWith')}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.signup.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.signup.password')}</Label>
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
              {t('auth.signup.passwordRequirements')}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            {t('auth.signup.signUp')}
          </Button>
          <p className="text-sm text-center text-muted-foreground">
            {t('auth.signup.hasAccount')}{' '}
            <Link href="/login" className="text-primary hover:underline">
              {t('auth.signup.signIn')}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
