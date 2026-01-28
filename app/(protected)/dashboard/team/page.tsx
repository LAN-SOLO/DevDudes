'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DeleteConfirmDialog } from '@/components/ui/confirm-dialog'
import { useToast } from '@/components/ui/toast'
import {
  Users,
  UserPlus,
  Mail,
  Crown,
  Shield,
  User,
  Trash2,
  Lock,
  X,
  Loader2,
  Check,
  Copy,
  Link as LinkIcon,
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'member'
  avatar?: string
  joinedAt: string
  lastActive: string
}

interface Invitation {
  id: string
  email: string
  role: 'admin' | 'member'
  sentAt: string
  status: 'pending' | 'accepted' | 'expired'
}

const roleConfig = {
  owner: { label: 'Owner', icon: Crown, color: 'bg-yellow-100 text-yellow-700' },
  admin: { label: 'Admin', icon: Shield, color: 'bg-blue-100 text-blue-700' },
  member: { label: 'Member', icon: User, color: 'bg-gray-100 text-gray-700' },
}

export default function TeamPage() {
  const { addToast } = useToast()
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'You',
      email: 'you@example.com',
      role: 'owner',
      joinedAt: '2024-01-01',
      lastActive: 'Just now',
    },
  ])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteForm, setInviteForm] = useState<{ email: string; role: 'admin' | 'member' }>({ email: '', role: 'member' })
  const [isSending, setIsSending] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null)
  const currentPlan = 'free' // In a real app, this would come from the user's subscription

  const canInvite = currentPlan !== 'free'
  const memberLimit = currentPlan === 'free' ? 1 : currentPlan === 'pro' ? 5 : Infinity

  const handleInvite = async () => {
    if (!inviteForm.email) return

    setIsSending(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newInvitation: Invitation = {
      id: Date.now().toString(),
      email: inviteForm.email,
      role: inviteForm.role,
      sentAt: new Date().toISOString(),
      status: 'pending',
    }

    setInvitations([...invitations, newInvitation])
    setIsSending(false)
    setShowInviteModal(false)
    setInviteForm({ email: '', role: 'member' })

    addToast({
      type: 'success',
      title: 'Invitation sent',
      description: `Invite sent to ${newInvitation.email}`,
    })
  }

  const handleCancelInvitation = (id: string) => {
    const invitation = invitations.find((inv) => inv.id === id)
    setInvitations(invitations.filter((inv) => inv.id !== id))
    addToast({
      type: 'info',
      title: 'Invitation cancelled',
      description: invitation ? `Invitation to ${invitation.email} was cancelled` : 'Invitation cancelled',
    })
  }

  const handleRemoveMember = (member: TeamMember) => {
    if (member.role === 'owner') return
    setMembers(members.filter((m) => m.id !== member.id))
    setMemberToRemove(null)
    addToast({
      type: 'success',
      title: 'Member removed',
      description: `${member.name} has been removed from the team`,
    })
  }

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText('https://devdudes.app/invite/abc123xyz')
    addToast({
      type: 'info',
      title: 'Copied',
      description: 'Invite link copied to clipboard',
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team</h2>
          <p className="text-muted-foreground">
            Manage your team members and permissions
          </p>
        </div>
        <Button
          onClick={() => (canInvite ? setShowInviteModal(true) : setShowUpgradeModal(true))}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Plan Info */}
      {currentPlan === 'free' && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Team collaboration is a Pro feature</p>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to invite team members and collaborate on projects
                  </p>
                </div>
              </div>
              <Button onClick={() => setShowUpgradeModal(true)}>
                Upgrade to Pro
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{members.length}</p>
                <p className="text-sm text-muted-foreground">
                  {memberLimit === Infinity ? 'Team Members' : `of ${memberLimit} members`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Mail className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {invitations.filter((i) => i.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending Invites</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {members.filter((m) => m.role === 'admin' || m.role === 'owner').length}
                </p>
                <p className="text-sm text-muted-foreground">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>People with access to this workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => {
              const roleInfo = roleConfig[member.role]
              const RoleIcon = roleInfo.icon
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{member.name}</p>
                        <Badge className={roleInfo.color} variant="secondary">
                          <RoleIcon className="mr-1 h-3 w-3" />
                          {roleInfo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      Active {member.lastActive}
                    </p>
                    {member.role !== 'owner' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-red-500"
                        onClick={() => setMemberToRemove(member)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Invitations</CardTitle>
            <CardDescription>Invitations that haven&apos;t been accepted yet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invitations
                .filter((inv) => inv.status === 'pending')
                .map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{invitation.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Invited as {invitation.role} •{' '}
                          {new Date(invitation.sentAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Pending</Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-red-500"
                        onClick={() => handleCancelInvitation(invitation.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invite Link */}
      {canInvite && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Invite Link
            </CardTitle>
            <CardDescription>Share this link to invite people to your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value="https://devdudes.app/invite/abc123xyz"
                readOnly
                className="font-mono text-sm"
              />
              <Button variant="outline" onClick={handleCopyInviteLink}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invite Dialog */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>Send an invitation to join your team</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="grid grid-cols-2 gap-2">
                {(['member', 'admin'] as const).map((role) => {
                  const config = roleConfig[role]
                  const Icon = config.icon
                  return (
                    <button
                      key={role}
                      onClick={() => setInviteForm({ ...inviteForm, role })}
                      className={`flex items-center gap-2 rounded-lg border p-3 transition-colors ${
                        inviteForm.role === role
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{config.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite} disabled={!inviteForm.email || isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invite
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle>Upgrade to Pro</DialogTitle>
                <DialogDescription>Unlock team collaboration</DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Team collaboration is available on Pro and Enterprise plans. Upgrade to:
            </p>
            <ul className="space-y-2">
              {[
                'Invite up to 5 team members (Pro) or unlimited (Enterprise)',
                'Role-based permissions (Admin, Member)',
                'Shared projects and templates',
                'Team activity log',
                'Collaborative editing',
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
              Maybe Later
            </Button>
            <Button asChild>
              <a href="/dashboard/billing">View Plans</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Member Confirmation */}
      {memberToRemove && (
        <DeleteConfirmDialog
          open={true}
          onOpenChange={(open) => !open && setMemberToRemove(null)}
          itemName={`team member "${memberToRemove.name}"`}
          onConfirm={() => handleRemoveMember(memberToRemove)}
        />
      )}
    </div>
  )
}
