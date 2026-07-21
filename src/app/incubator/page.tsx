'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface IncubatorProject {
  id: string
  name: string
  description: string
  tagline: string
  status: string
  founder_id: string
  pump_fun_ca: string | null
  apps_count: number
  total_raised: number
  vesting_schedule: string
  created_at: string
}

interface Profile {
  display_name: string
  username: string
  avatar_url: string
}

export default function IncubatorPage() {
  const [projects, setProjects] = useState<IncubatorProject[]>([])
  const [profiles, setProfiles] = useState<Record<string, Profile>>({})
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const steps = [
    {
      step: '1',
      title: 'Build your idea',
      body: 'Create your app using the AI Builder or code from scratch'
    },
    {
      step: '2',
      title: 'Form on-chain business',
      body: 'Bundle apps under one brand, launch pump.fun token'
    },
    {
      step: '3',
      title: 'Get incubator support',
      body: 'Access mentorship, resources, and community'
    },
    {
      step: '4',
      title: 'Run IPO & grow',
      body: 'Execute vested token IPO and scale with users'
    }
  ]

  useEffect(() => {
    async function loadData() {
      try {
        // Get projects
        const { data: projectsData } = await supabase
          .from('incubator_projects')
          .select('*')
          .order('created_at', { ascending: false })

        if (projectsData) {
          setProjects(projectsData)

          // Fetch profiles for all founders
          const founderIds = [...new Set(projectsData.map((p) => p.founder_id))]
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, display_name, username, avatar_url')
            .in('id', founderIds)

          if (profilesData) {
            const profileMap = Object.fromEntries(
              profilesData.map((p: any) => [p.id, p])
            )
            setProfiles(profileMap)
          }
        }
      } catch (error) {
        console.error('Error loading incubator data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [supabase])

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center text-neutral-400">Loading incubator...</div>
      </main>
    )
  }

  const totalRaised = projects.reduce((sum, p) => sum + (p.total_raised || 0), 0)
  const liveCount = projects.filter((p) => p.status === 'live').length

  const statusColors: Record<string, string> = {
    incubating: 'bg-brand-500/20 text-brand-300',
    ipo: 'bg-yellow-500/20 text-yellow-300',
    live: 'bg-green-500/20 text-green-300',
    planning: 'bg-neutral-500/20 text-neutral-300',
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="serif text-4xl font-semibold text-white mb-2">Project Incubator & IPO</h1>
          <p className="text-neutral-400 max-w-2xl">
            Turn ideas into tradable assets. Bundle apps under one brand, get incubator support, 
            then run a pump.fun IPO with vesting that aligns creators, users, and traders.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-4 text-center flex-shrink-0">
          <div>
            <p className="text-sm font-semibold text-white">${totalRaised.toLocaleString()}</p>
            <p className="text-xs text-neutral-500">Raised</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{liveCount}</p>
            <p className="text-xs text-neutral-500">Live coins</p>
          </div>
        </div>
      </div>

      <div className="rule mx-0 mb-10" />

      {/* Steps */}
      <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.step} className="card-hover rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-6">
            <span className="text-2xl font-semibold text-brand-500">{s.step}</span>
            <h3 className="mt-3 font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-neutral-400">{s.body}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="serif text-2xl font-semibold text-white">On-chain businesses</h2>
          <Link href="/incubator/apply" className="text-sm text-brand-400 hover:text-brand-300">
            Apply now →
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-12 text-center">
            <p className="text-neutral-400">No projects yet</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {projects.map((project) => {
              const founder = profiles[project.founder_id]
              return (
                <Link
                  key={project.id}
                  href={`/incubator/${project.id}`}
                  className="card-hover overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 transition-all"
                >
                  <div className="h-1.5 bg-gradient-to-r from-brand-500 to-accent-500" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="serif font-semibold text-white mb-1">{project.name}</h3>
                        <p className="text-sm text-neutral-400 line-clamp-1">{project.tagline}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded capitalize whitespace-nowrap ml-2 ${statusColors[project.status] || statusColors.planning}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 border-t border-[var(--color-hairline)] pt-4 text-center">
                      <div>
                        <p className="text-sm font-semibold text-white">{project.apps_count}</p>
                        <p className="text-xs text-neutral-500">apps</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-400">${(project.total_raised / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-neutral-500">raised</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{project.vesting_schedule}</p>
                        <p className="text-xs text-neutral-500">vesting</p>
                      </div>
                    </div>

                    {founder && (
                      <div className="mt-4 pt-4 border-t border-[var(--color-hairline)] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-500/20 flex-shrink-0" />
                        <span className="text-xs text-neutral-400">Led by <span className="text-brand-400">{founder.display_name}</span></span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
