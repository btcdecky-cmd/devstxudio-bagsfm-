'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function NewProjectPage() {
  const [title, setTitle] = useState('')
  const [tagline, setTagline] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('AI')
  const [status, setStatus] = useState('planning')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const categories = ['AI', 'Web3', 'DeFi', 'NFT', 'Gaming', 'Productivity', 'Social', 'Infrastructure']
  const statuses = ['planning', 'in_progress', 'alpha', 'beta', 'launched']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      if (!title || !tagline || !description) {
        setError('Please fill in all fields')
        setIsLoading(false)
        return
      }

      const { data, error: insertError } = await supabase
        .from('projects')
        .insert([
          {
            owner_id: user.id,
            title,
            tagline,
            description,
            category,
            status,
            visibility: 'public',
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError

      router.push(`/projects/${data.id}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <div className="mb-10">
        <Link href="/dashboard" className="text-sm text-brand-400 hover:text-brand-300 mb-4 inline-block">
          ← Back to studio
        </Link>
        <h1 className="serif text-3xl font-semibold text-white mb-2">Create a project</h1>
        <p className="text-neutral-400">Start building in public and share your journey with the community</p>
      </div>

      <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
              Project title
            </label>
            <input
              id="title"
              type="text"
              placeholder="E.g., AI Content Generator"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-white mb-2">
              Tagline
            </label>
            <input
              id="tagline"
              type="text"
              placeholder="One-line description of your project"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Tell us more about what you're building"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white focus:border-brand-500 focus:outline-none transition-colors"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white focus:border-brand-500 focus:outline-none transition-colors"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg border border-brand-600/60 bg-brand-500/10 px-6 py-2.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create project'}
            </button>
            <Link
              href="/dashboard"
              className="flex items-center justify-center rounded-lg border border-[var(--color-hairline)] px-6 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:border-brand-500"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
