'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MoreVertical, Trash2, Archive, ExternalLink, FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmDialog, DeleteConfirmDialog } from '@/components/ui/confirm-dialog'
import { deleteProject, updateProject } from '@/app/actions/projects'
import { useToast } from '@/components/ui/toast'

interface ProjectActionsProps {
  projectId: string
  projectName: string
  status: string
}

export function ProjectActions({ projectId, projectName, status }: ProjectActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await deleteProject(projectId)
      if (result?.error) {
        addToast({
          type: 'error',
          title: 'Error',
          description: result.error,
        })
      } else {
        addToast({
          type: 'success',
          title: 'Project deleted',
          description: `"${projectName}" has been deleted.`,
        })
      }
    } catch {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
      })
    } finally {
      setLoading(false)
      setDeleteOpen(false)
    }
  }

  const handleArchive = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.set('status', 'archived')
      const result = await updateProject(projectId, formData)
      if (result?.error) {
        addToast({
          type: 'error',
          title: 'Error',
          description: result.error,
        })
      } else {
        addToast({
          type: 'success',
          title: 'Project archived',
          description: `"${projectName}" has been archived.`,
        })
      }
    } catch {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to archive project. Please try again.',
      })
    } finally {
      setLoading(false)
      setArchiveOpen(false)
    }
  }

  const isDeployed = status === 'deployed'
  const isArchived = status === 'archived'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/projects/${projectId}`} className="flex items-center">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          {isDeployed && (
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/pipeline/docu?project=${projectId}`} className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                View Documentation
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {!isArchived && (
            <DropdownMenuItem
              onClick={() => setArchiveOpen(true)}
              className="text-yellow-600 focus:text-yellow-600"
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={`project "${projectName}"`}
        loading={loading}
        onConfirm={handleDelete}
      />

      {/* Archive Confirmation */}
      <ConfirmDialog
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        title={`Archive "${projectName}"?`}
        description="Archived projects will be moved out of your active list. You can still view them in the completed projects section."
        confirmLabel="Archive"
        variant="default"
        loading={loading}
        onConfirm={handleArchive}
      />
    </>
  )
}

// Simpler version for active pipeline projects with continue action
interface ActiveProjectActionsProps {
  projectId: string
  projectName: string
  nextStep: { label: string; href: string } | null
}

export function ActiveProjectActions({ projectId, projectName, nextStep }: ActiveProjectActionsProps) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await deleteProject(projectId)
      if (result?.error) {
        addToast({
          type: 'error',
          title: 'Error',
          description: result.error,
        })
      } else {
        addToast({
          type: 'success',
          title: 'Project deleted',
          description: `"${projectName}" has been deleted.`,
        })
      }
    } catch {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Failed to delete project. Please try again.',
      })
    } finally {
      setLoading(false)
      setDeleteOpen(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {nextStep && (
          <Link href={nextStep.href}>
            <Button size="sm">
              {nextStep.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/projects/${projectId}`} className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteOpen(true)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={`project "${projectName}"`}
        loading={loading}
        onConfirm={handleDelete}
      />
    </>
  )
}
