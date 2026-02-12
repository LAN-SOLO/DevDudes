'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/components/ui/toast'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Camera } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/language-provider'
import { usePlan } from '@/lib/hooks/use-plan'
import type { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { addToast } = useToast()
  const { t } = useTranslation()
  const { label: planLabel } = usePlan()
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    company: '',
    role: '',
    website: '',
  })

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      // Load profile data from user metadata or database
      if (user?.user_metadata) {
        setProfileForm({
          fullName: user.user_metadata.full_name || '',
          company: user.user_metadata.company || '',
          role: user.user_metadata.role || '',
          website: user.user_metadata.website || '',
        })
      }

      setIsLoading(false)
    }
    loadUser()
  }, [])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: profileForm.fullName,
        company: profileForm.company,
        role: profileForm.role,
        website: profileForm.website,
      },
    })

    setIsSaving(false)

    if (error) {
      addToast({
        type: 'error',
        title: t('profile.toasts.errorTitle'),
        description: error.message,
      })
    } else {
      addToast({
        type: 'success',
        title: t('profile.toasts.profileUpdatedTitle'),
        description: t('profile.toasts.profileUpdatedDesc'),
      })
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    // In a real app, this would call an API to delete the account
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsDeleting(false)
    setShowDeleteConfirm(false)
    addToast({
      type: 'info',
      title: t('profile.toasts.deleteRequestedTitle'),
      description: t('profile.toasts.deleteRequestedDesc'),
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const initials = profileForm.fullName
    ? profileForm.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || 'U'

  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{t('profile.title')}</h2>
        <p className="text-muted-foreground">
          {t('profile.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{t('profile.yourAvatar')}</CardTitle>
            <CardDescription>{t('profile.avatarDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm font-medium">{profileForm.fullName || user?.email}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-2">{t('profile.memberSince')} {createdAt}</p>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('profile.profileInfo')}</CardTitle>
            <CardDescription>{t('profile.profileInfoDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('profile.fullName')}</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={profileForm.fullName}
                  onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('profile.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">{t('profile.company')}</Label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={profileForm.company}
                  onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">{t('profile.role')}</Label>
                <Input
                  id="role"
                  placeholder="Software Engineer"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">{t('profile.website')}</Label>
              <Input
                id="website"
                placeholder="https://example.com"
                value={profileForm.website}
                onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
              />
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('common.saving')}
                </>
              ) : (
                t('common.save')
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Account Stats */}
      <Card>
        <CardHeader>
          <CardTitle>{t('profile.accountStats')}</CardTitle>
          <CardDescription>{t('profile.accountStatsDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">{t('profile.projectsCreated')}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">{t('profile.appsDeployed')}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-muted-foreground">{t('profile.templatesUsed')}</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-2xl font-bold">{planLabel}</p>
              <p className="text-sm text-muted-foreground">{t('profile.currentPlan')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">{t('profile.dangerZone')}</CardTitle>
          <CardDescription>{t('profile.dangerZoneDesc')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('profile.deleteAccount')}</p>
              <p className="text-sm text-muted-foreground">
                {t('profile.deleteAccountDesc')}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteConfirm(true)}
            >
              {t('profile.deleteAccount')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account Confirmation */}
      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title={t('profile.deleteAccountConfirm')}
        description="This action cannot be undone. This will permanently delete your account, all your projects and generated apps, profile settings, connected databases, and API keys."
        confirmLabel={t('profile.deleteAccount')}
        variant="destructive"
        loading={isDeleting}
        onConfirm={handleDeleteAccount}
      />
    </div>
  )
}
