'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

interface Project {
  id: string
  title: string
  description: string
  tagline: string
  status: string
  category: string
  followers_count: number
  views_count: number
  image_url: string
  website_url: string
  github_url: string
  owner_id: string
  created_at: string
  updated_at: string
}

interface ProjectUpdate {
  id: string
  title: string
  content: string
  update_type: string
  likes_count: number
  created_at: string
  creator_id: string
}

interface Profile {
  display_name: string
  username: string
  avatar_url: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const router = useRouter()
  const supabase = createClient()

  const [project, setProject] = useState<Project | null>(null)
  const [updates, setUpdates] = useState<ProjectUpdate[]>([])
  const [creator, setCreator] = useState<Profile | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newUpdateTitle, setNewUpdateTitle] = useState('')
  const [newUpdateContent, setNewUpdateContent] = useState('')
  const [newUpdateType, setNewUpdateType] = useState('milestone')
  const [isPostingUpdate, setIsPostingUpdate] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setCurrentUser(user)

        // Get project
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single()

        if (projectError) throw projectError
        setProject(projectData)

        // Get creator profile
        if (projectData) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', projectData.owner_id)
            .single()

          if (profileData) {
            setCreator(profileData)
          }

          setIsOwner(user?.id === projectData.owner_id)

          // Check if user is following
          if (user) {
            const { data: followData } = await supabase
              .from('project_followers')
              .select('id')
              .eq('user_id', user.id)
              .eq('project_id', projectId)
              .single()

            setIsFollowing(!!followData)
          }

          // Get updates
          const { data: updatesData } = await supabase
            .from('project_updates')
            .select('*')
            .eq('project_id', projectId)
            .order('created_at', { ascending: false })

          if (updatesData) {
            setUpdates(updatesData)
          }
        }
      } catch (error) {
        console.error('Error loading project:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel(`project-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_updates',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setUpdates((prev) => [payload.new as ProjectUpdate, ...prev])
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [projectId, supabase])

  const handleFollow = async () => {
    if (!currentUser) {
      router.push('/auth/login')
      return
    }

    try {
      if (isFollowing) {
        await supabase
          .from('project_followers')
          .delete()
          .eq('user_id', currentUser.id)
          .eq('project_id', projectId)
      } else {
        await supabase.from('project_followers').insert([
          {
            user_id: currentUser.id,
            project_id: projectId,
          },
        ])
      }
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error('Error following project:', error)
    }
  }

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser || !newUpdateTitle || !newUpdateContent) return

    setIsPostingUpdate(true)
    try {
      const { error } = await supabase.from('project_updates').insert([
        {
          project_id: projectId,
          creator_id: currentUser.id,
          title: newUpdateTitle,
          content: newUpdateContent,
          update_type: newUpdateType,
        },
      ])

      if (error) throw error

      setNewUpdateTitle('')
      setNewUpdateContent('')
      setNewUpdateType('milestone')
    } catch (error) {
      console.error('Error posting update:', error)
    } finally {
      setIsPostingUpdate(false)
    }
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="text-center text-neutral-400">Loading project...</div>
      </main>
    )
  }

  if (!project) {
    return (
      <main className="mx-auto max-w-4xl px-5 py-12">
        <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-12 text-center">
          <p className="text-neutral-400">Project not found</p>
        </div>
      </main>
    )
  }

  const statusColors: Record<string, string> = {
    planning: 'bg-neutral-500/20 text-neutral-300',
    in_progress: 'bg-blue-500/20 text-blue-300',
    alpha: 'bg-yellow-500/20 text-yellow-300',
    beta: 'bg-purple-500/20 text-purple-300',
    launched: 'bg-green-500/20 text-green-300',
  }

  const updateTypeColors: Record<string, string> = {
    milestone: 'bg-green-500/20 text-green-300',
    feature: 'bg-blue-500/20 text-blue-300',
    bug_fix: 'bg-red-500/20 text-red-300',
    design: 'bg-purple-500/20 text-purple-300',
    other: 'bg-neutral-500/20 text-neutral-300',
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      {/* Back link */}
      <Link href="/projects" className="text-sm text-brand-400 hover:text-brand-300 mb-6 inline-block">
        ← Back to projects
      </Link>

      {/* Project header */}
      <div className="mb-8 rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-8">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="serif text-3xl font-semibold text-white">{project.title}</h1>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded capitalize ${statusColors[project.status] || statusColors.planning}`}
              >
                {project.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-lg text-neutral-300 mb-4">{project.tagline}</p>
            <p className="text-neutral-400 mb-4">{project.description}</p>

            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <span>{project.followers_count || 0} followers</span>
              <span>{project.views_count || 0} views</span>
              <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {isOwner && (
              <Link
                href={`/projects/${projectId}/edit`}
                className="rounded-lg border border-[var(--color-hairline)] px-4 py-2 text-sm font-medium text-neutral-400 transition-colors hover:border-brand-500 text-center"
              >
                Edit
              </Link>
            )}
            <button
              onClick={handleFollow}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isFollowing
                  ? 'border border-brand-500 text-brand-400 bg-brand-500/10'
                  : 'border border-brand-600/60 bg-brand-500/10 text-brand-400 hover:bg-brand-500/20'
              }`}
            >
              {isFollowing ? '✓ Following' : '+ Follow'}
            </button>
          </div>
        </div>

        {/* Creator info */}
        {creator && (
          <div className="flex items-center gap-3 border-t border-[var(--color-hairline)] pt-6">
            <div className="w-10 h-10 rounded-full bg-brand-500/20" />
            <div>
              <p className="font-medium text-white">{creator.display_name}</p>
              <p className="text-xs text-neutral-500">@{creator.username}</p>
            </div>
          </div>
        )}

        {/* Links */}
        {(project.website_url || project.github_url) && (
          <div className="mt-6 flex gap-3 flex-wrap">
            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[var(--color-hairline)] px-3 py-1.5 text-xs font-medium text-brand-400 hover:border-brand-500 transition-colors"
              >
                Website →
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[var(--color-hairline)] px-3 py-1.5 text-xs font-medium text-brand-400 hover:border-brand-500 transition-colors"
              >
                GitHub →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Updates section */}
      <section className="mb-12">
        <h2 className="serif text-2xl font-semibold text-white mb-6">Progress updates</h2>

        {/* Post update form (owner only) */}
        {isOwner && (
          <form onSubmit={handlePostUpdate} className="mb-8 rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Update title"
                value={newUpdateTitle}
                onChange={(e) => setNewUpdateTitle(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors mb-3"
              />
              <textarea
                placeholder="What's new with your project?"
                value={newUpdateContent}
                onChange={(e) => setNewUpdateContent(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={newUpdateType}
                onChange={(e) => setNewUpdateType(e.target.value)}
                className="rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="milestone">Milestone</option>
                <option value="feature">Feature</option>
                <option value="bug_fix">Bug Fix</option>
                <option value="design">Design</option>
                <option value="other">Other</option>
              </select>
              <button
                type="submit"
                disabled={isPostingUpdate || !newUpdateTitle || !newUpdateContent}
                className="ml-auto rounded-lg border border-brand-600/60 bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20 disabled:opacity-50"
              >
                {isPostingUpdate ? 'Posting...' : 'Post update'}
              </button>
            </div>
          </form>
        )}

        {/* Updates list */}
        {updates.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-12 text-center">
            <p className="text-neutral-400">No updates yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-white">{update.title}</h3>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded capitalize whitespace-nowrap ${updateTypeColors[update.update_type] || updateTypeColors.other}`}
                  >
                    {update.update_type.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-neutral-300 mb-4 whitespace-pre-wrap">{update.content}</p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{new Date(update.created_at).toLocaleDateString()}</span>
                  <span>{update.likes_count || 0} likes</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
