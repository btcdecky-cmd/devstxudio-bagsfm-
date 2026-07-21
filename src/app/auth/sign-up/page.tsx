'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            display_name: displayName,
          },
        },
      })
      if (error) throw error
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="serif text-3xl font-semibold text-white mb-2">Join the community</h1>
          <p className="text-neutral-400">Start building in public today</p>
        </div>

        <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-8">
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-white mb-2">
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                placeholder="Your name"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="repeatPassword" className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                id="repeatPassword"
                type="password"
                placeholder="••••••••"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-hairline)] bg-ink-800/50 px-4 py-2.5 text-white placeholder-neutral-500 focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg border border-brand-600/60 bg-brand-500/10 px-5 py-2.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-400">Already have an account? </span>
            <Link href="/auth/login" className="text-brand-400 hover:text-brand-300 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
