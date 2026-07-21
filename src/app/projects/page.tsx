'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

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
  owner_id: string
  created_at: string
}

interface Profile {
  display_name: string
  username: string
  avatar_url: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [profiles, setProfiles] = useState<Record<string, Profile>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const supabase = createClient()

  const categories = ['AI', 'Web3', 'DeFi', 'NFT', 'Gaming', 'Productivity', 'Social', 'Infrastructure']
  const statuses = ['planning', 'in_progress', 'alpha', 'beta', 'launched']

  useEffect(() => {
    async function loadProjects() {
      try {
        let query = supabase
          .from('projects')
          .select('*')
          .eq('visibility', 'public')
          .order('created_at', { ascending: false })

        if (selectedCategory) {
          query = query.eq('category', selectedCategory)
        }

        if (selectedStatus) {
          query = query.eq('status', selectedStatus)
        }

        const { data: projectsData, error } = await query

        if (error) throw error

        if (projectsData) {
          setProjects(projectsData)

          // Fetch profiles for all project owners
          const ownerIds = [...new Set(projectsData.map((p) => p.owner_id))]
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, display_name, username, avatar_url')
            .in('id', ownerIds)

          if (profilesData) {
            const profileMap = Object.fromEntries(
              profilesData.map((p: any) => [p.id, p])
            )
            setProfiles(profileMap)
          }
        }
      } catch (error) {
        console.error('Error loading projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [selectedCategory, selectedStatus, supabase])

  const statusColors: Record<string, string> = {
    planning: 'bg-neutral-500/20 text-neutral-300',
    in_progress: 'bg-blue-500/20 text-blue-300',
    alpha: 'bg-yellow-500/20 text-yellow-300',
    beta: 'bg-purple-500/20 text-purple-300',
    launched: 'bg-green-500/20 text-green-300',
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="serif text-4xl font-semibold text-white mb-2">Discover projects</h1>
        <p className="text-neutral-400 max-w-2xl">
          Explore new builders, discover projects early, and watch applications evolve in real time. 
          Filter by category or status to find what&apos;s being built right now.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === ''
                  ? 'bg-brand-500/20 text-brand-300'
                  : 'border border-[var(--color-hairline)] text-neutral-400 hover:border-brand-500'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'border border-[var(--color-hairline)] text-neutral-400 hover:border-brand-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-3">Status</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus('')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedStatus === ''
                  ? 'bg-brand-500/20 text-brand-300'
                  : 'border border-[var(--color-hairline)] text-neutral-400 hover:border-brand-500'
              }`}
            >
              All
            </button>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors capitalize ${
                  selectedStatus === status
                    ? 'bg-brand-500/20 text-brand-300'
                    : 'border border-[var(--color-hairline)] text-neutral-400 hover:border-brand-500'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects grid */}
      {isLoading ? (
        <div className="text-center text-neutral-400">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-12 text-center">
          <p className="text-neutral-400">No projects found matching your filters</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const creator = profiles[project.owner_id]
            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="card-hover group flex flex-col rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 overflow-hidden transition-all"
              >
                {project.image_url && (
                  <div className="h-40 w-full overflow-hidden bg-gradient-to-br from-brand-500/20 to-transparent">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="serif text-lg font-semibold text-white group-hover:text-brand-400 transition-colors flex-1">
                      {project.title}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded capitalize whitespace-nowrap ${statusColors[project.status] || statusColors.planning}`}
                    >
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-400 line-clamp-2 mb-4 flex-1">
                    {project.tagline || project.description}
                  </p>

                  {creator && (
                    <div className="mb-4 text-xs text-neutral-500">
                      by <span className="text-brand-400">{creator.display_name}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-[var(--color-hairline)] pt-4">
                    <span>{project.followers_count || 0} followers</span>
                    <span>{project.views_count || 0} views</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
