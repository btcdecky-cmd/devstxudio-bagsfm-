'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  tagline: string
  status: string
  followers_count: number
  views_count: number
  created_at: string
}

interface Profile {
  display_name: string
  username: string
  bio: string
  avatar_url: string
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)

      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      }

      // Get user's projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

      if (projectsData) {
        setProjects(projectsData)
      }

      setIsLoading(false)

      // Subscribe to real-time project updates
      const subscription = supabase
        .channel('projects-channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'projects',
            filter: `owner_id=eq.${user.id}`,
          },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setProjects((prev) => [payload.new as Project, ...prev])
            } else if (payload.eventType === 'UPDATE') {
              setProjects((prev) =>
                prev.map((p) => (p.id === payload.new.id ? (payload.new as Project) : p))
              )
            } else if (payload.eventType === 'DELETE') {
              setProjects((prev) => prev.filter((p) => p.id !== payload.old.id))
            }
          }
        )
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }

    loadData()
  }, [supabase, router])

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center text-neutral-400">Loading your studio...</div>
      </main>
    )
  }

  const statusColors: Record<string, string> = {
    planning: 'bg-neutral-500/20 text-neutral-300',
    in_progress: 'bg-blue-500/20 text-blue-300',
    alpha: 'bg-yellow-500/20 text-yellow-300',
    beta: 'bg-purple-500/20 text-purple-300',
    launched: 'bg-green-500/20 text-green-300',
    paused: 'bg-red-500/20 text-red-300',
  }

  const totalFollowers = projects.reduce((a, p) => a + (p.followers_count || 0), 0)
  const totalViews = projects.reduce((a, p) => a + (p.views_count || 0), 0)

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      {/* Profile header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-8">
        <div>
          <h1 className="serif text-3xl font-semibold text-white mb-1">
            {profile?.display_name || 'Studio'}
          </h1>
          <p className="text-sm text-neutral-400">@{profile?.username}</p>
          {profile?.bio && <p className="mt-2 text-sm text-neutral-400">{profile.bio}</p>}
        </div>
        <Link
          href="/projects/new"
          className="rounded-lg border border-brand-600/60 bg-brand-500/10 px-6 py-2.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20 whitespace-nowrap"
        >
          + New project
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Projects</div>
          <div className="text-2xl font-semibold text-white">{projects.length}</div>
        </div>
        <div className="rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Followers</div>
          <div className="text-2xl font-semibold text-white">{totalFollowers}</div>
        </div>
        <div className="rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Views</div>
          <div className="text-2xl font-semibold text-white">{totalViews}</div>
        </div>
        <div className="rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5">
          <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Member since</div>
          <div className="text-xs text-neutral-400 mt-2">
            {user && new Date(user.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Projects section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Your projects</h2>
          {projects.length > 0 && (
            <Link href="/projects" className="text-sm text-brand-400 hover:text-brand-300">
              View all →
            </Link>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-12 text-center">
            <p className="serif text-lg text-neutral-400 mb-4">No projects yet</p>
            <p className="text-sm text-neutral-500 mb-6">
              Start building by creating your first project to track progress with your community
            </p>
            <Link
              href="/projects/new"
              className="inline-block rounded-lg border border-brand-600/60 bg-brand-500/10 px-6 py-2.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
            >
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="card-hover group flex items-start justify-between gap-6 rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="serif text-lg font-semibold text-white group-hover:text-brand-400 transition-colors">
                      {project.title}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded capitalize ${statusColors[project.status] || statusColors.planning}`}
                    >
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
                    {project.tagline || project.description || 'No description yet'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span>{project.followers_count || 0} followers</span>
                    <span>{project.views_count || 0} views</span>
                  </div>
                </div>
                <div className="text-right text-xs text-neutral-500 whitespace-nowrap">
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
