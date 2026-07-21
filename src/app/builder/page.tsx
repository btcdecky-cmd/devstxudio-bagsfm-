'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AppBuilderPage() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [apps, setApps] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  const features = [
    'Generate production-ready code from descriptions',
    'Auto-deploy to Vercel with custom domains',
    'Integrate with pump.fun tokens',
    'Built-in database and authentication',
    'Full GitHub repository integration',
    'Community trading and monetization'
  ]

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)

      // Load user's generated apps
      const { data: appsData } = await supabase
        .from('generated_apps')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })

      if (appsData) {
        setApps(appsData)
      }
    }

    loadUser()
  }, [supabase, router])

  const handleGenerateApp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !prompt.trim()) return

    setIsGenerating(true)

    try {
      // In a real implementation, this would call an AI API to generate the app code
      // For now, we'll just create a record in the database
      const { error } = await supabase.from('generated_apps').insert([
        {
          creator_id: user.id,
          name: prompt.substring(0, 50),
          description: prompt,
          prompt: prompt,
          status: 'generating',
        },
      ])

      if (error) throw error

      setPrompt('')
      // Reload apps
      const { data: appsData } = await supabase
        .from('generated_apps')
        .select('*')
        .eq('creator_id', user.id)
        .order('created_at', { ascending: false })

      if (appsData) {
        setApps(appsData)
      }
    } catch (err) {
      console.error('Error generating app:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="serif text-4xl font-semibold text-white mb-2">AI App Builder</h1>
        <p className="text-neutral-400 max-w-2xl">
          Describe an app in plain language and it generates, deploys, and publishes in under a minute.
          Link to pump.fun tokens for trading, community, and monetization.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 mb-12">
        {/* Generator */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-8 sticky top-8">
            <h2 className="serif text-xl font-semibold text-white mb-6">Create new app</h2>

            <form onSubmit={handleGenerateApp} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-white mb-2">
                  Describe your app
                </label>
                <textarea
                  id="prompt"
                  placeholder="E.g., A real-time collaboration tool for designers with infinite canvas..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-3 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating || !prompt.trim()}
                className="w-full rounded-lg border border-brand-600/60 bg-brand-500/10 px-6 py-2.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate app'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-[var(--color-hairline)]">
              <p className="text-xs text-neutral-500 mb-4">Generated apps automatically get:</p>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>✓ Live deployment URL</li>
                <li>✓ GitHub repository</li>
                <li>✓ pump.fun token integration</li>
                <li>✓ Community trading</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Apps list */}
        <div className="lg:col-span-2">
          <h2 className="serif text-xl font-semibold text-white mb-6">Your apps</h2>

          {apps.length === 0 ? (
            <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-12 text-center">
              <p className="text-neutral-400 mb-4">No apps yet</p>
              <p className="text-sm text-neutral-500">Generate your first app to get started</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {apps.map((app) => (
                <Link
                  key={app.id}
                  href={`/builder/${app.id}`}
                  className="card-hover rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-6 transition-all"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="serif font-semibold text-white flex-1">{app.name}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
                        app.status === 'generated'
                          ? 'bg-green-500/20 text-green-300'
                          : app.status === 'error'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-400 line-clamp-2 mb-4">{app.description}</p>

                  <div className="flex gap-2 flex-wrap">
                    {app.live_url && (
                      <a
                        href={app.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded hover:bg-blue-500/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live app →
                      </a>
                    )}
                    {app.github_repo_url && (
                      <a
                        href={app.github_repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded hover:bg-purple-500/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Code →
                      </a>
                    )}
                    {app.pump_fun_ca && (
                      <a
                        href={`https://pump.fun/coin/${app.pump_fun_ca}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded hover:bg-green-500/30 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Token →
                      </a>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-[var(--color-hairline)] text-xs text-neutral-500">
                    Created {new Date(app.created_at).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <section>
        <h2 className="serif text-2xl font-semibold text-white mb-6">Built-in capabilities</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="card-hover rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-6">
              <div className="serif text-xl text-brand-500 mb-3">◆</div>
              <p className="text-sm text-neutral-300">{f}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
