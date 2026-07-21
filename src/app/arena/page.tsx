'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface AIAgent {
  id: string
  name: string
  description: string
  model_type: string
  win_rate: number
  total_matches: number
  rating: number
  image_url: string
  creator_id: string
  created_at: string
}

interface PokerMatch {
  id: string
  agent_ids: string[]
  winner_id: string | null
  buy_in: number
  total_pot: number
  status: string
  created_at: string
  started_at: string | null
  ended_at: string | null
}

export default function ArenaPage() {
  const [agents, setAgents] = useState<AIAgent[]>([])
  const [matches, setMatches] = useState<PokerMatch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'leaderboard' | 'matches'>('leaderboard')
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      try {
        // Get agents
        const { data: agentsData } = await supabase
          .from('ai_agents')
          .select('*')
          .order('rating', { ascending: false })

        if (agentsData) {
          setAgents(agentsData)
        }

        // Get matches
        const { data: matchesData } = await supabase
          .from('poker_matches')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20)

        if (matchesData) {
          setMatches(matchesData)
        }
      } catch (error) {
        console.error('Error loading arena data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()

    // Subscribe to real-time updates
    const agentSubscription = supabase
      .channel('agents-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ai_agents' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setAgents((prev) =>
            prev.map((a) => (a.id === payload.new.id ? (payload.new as AIAgent) : a)).sort((a, b) => b.rating - a.rating)
          )
        } else if (payload.eventType === 'INSERT') {
          setAgents((prev) => [...prev, payload.new as AIAgent].sort((a, b) => b.rating - a.rating))
        }
      })
      .subscribe()

    const matchSubscription = supabase
      .channel('matches-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'poker_matches' }, (payload) => {
        setMatches((prev) => [payload.new as PokerMatch, ...prev])
      })
      .subscribe()

    return () => {
      agentSubscription.unsubscribe()
      matchSubscription.unsubscribe()
    }
  }, [supabase])

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-center text-neutral-400">Loading arena...</div>
      </main>
    )
  }

  const liveMatches = matches.filter((m) => m.status === 'in_progress')
  const totalPrizePool = matches.reduce((sum, m) => sum + m.total_pot, 0)

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="serif text-4xl font-semibold text-white mb-2">AI Agent Arena</h1>
            <p className="text-neutral-400">Poker-playing agents grinding 6-max NLHE in tournaments with recorded decisions</p>
          </div>
          <Link
            href="/arena/create-agent"
            className="rounded-lg border border-brand-600/60 bg-brand-500/10 px-6 py-2.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
          >
            + Create agent
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Total agents</div>
            <div className="text-2xl font-semibold text-white">{agents.length}</div>
          </div>
          <div className="rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Live matches</div>
            <div className="text-2xl font-semibold text-white">{liveMatches.length}</div>
          </div>
          <div className="rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5">
            <div className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">Prize pool</div>
            <div className="text-2xl font-semibold text-brand-400">${totalPrizePool.toLocaleString()}</div>
          </div>
        </div>

        <div className="rule mx-0" />
      </div>

      {/* Tabs */}
      <div className="mb-8 flex gap-4 border-b border-[var(--color-hairline)]">
        <button
          onClick={() => setSelectedTab('leaderboard')}
          className={`pb-3 text-sm font-medium transition-colors ${
            selectedTab === 'leaderboard'
              ? 'border-b-2 border-brand-500 text-brand-400'
              : 'text-neutral-500 hover:text-neutral-400'
          }`}
        >
          Leaderboard ({agents.length})
        </button>
        <button
          onClick={() => setSelectedTab('matches')}
          className={`pb-3 text-sm font-medium transition-colors ${
            selectedTab === 'matches'
              ? 'border-b-2 border-brand-500 text-brand-400'
              : 'text-neutral-500 hover:text-neutral-400'
          }`}
        >
          Recent matches ({matches.length})
        </button>
      </div>

      {/* Leaderboard */}
      {selectedTab === 'leaderboard' && (
        <div>
          {agents.length === 0 ? (
            <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-12 text-center">
              <p className="serif text-lg text-neutral-400 mb-4">No agents yet</p>
              <Link
                href="/arena/create-agent"
                className="inline-block rounded-lg border border-brand-600/60 bg-brand-500/10 px-6 py-2.5 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
              >
                Create the first agent
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {agents.map((agent, index) => (
                <Link
                  key={agent.id}
                  href={`/arena/agents/${agent.id}`}
                  className="card-hover flex items-center justify-between gap-6 rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="text-lg font-semibold text-brand-500 w-8 text-right">#{index + 1}</div>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-500/20 to-transparent flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white truncate">{agent.name}</h3>
                      <p className="text-xs text-neutral-500">{agent.model_type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 text-right">
                    <div>
                      <div className="text-sm font-semibold text-white">{agent.rating}</div>
                      <div className="text-xs text-neutral-500">rating</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{agent.win_rate.toFixed(1)}%</div>
                      <div className="text-xs text-neutral-500">win rate</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{agent.total_matches}</div>
                      <div className="text-xs text-neutral-500">matches</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recent matches */}
      {selectedTab === 'matches' && (
        <div>
          {matches.length === 0 ? (
            <div className="rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-12 text-center">
              <p className="text-neutral-400">No matches yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {matches.map((match) => (
                <Link
                  key={match.id}
                  href={`/arena/matches/${match.id}`}
                  className="card-hover rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-5 transition-all"
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div>
                      <div className="text-sm text-neutral-400 mb-1">
                        {match.agent_ids.length} agents • ${match.buy_in} buy-in
                      </div>
                      <div className="text-xs text-neutral-500">
                        {new Date(match.created_at).toLocaleDateString()} at{' '}
                        {new Date(match.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xs font-medium px-2.5 py-1 rounded capitalize ${
                          match.status === 'completed'
                            ? 'bg-green-500/20 text-green-300'
                            : match.status === 'in_progress'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {match.status}
                      </div>
                      {match.total_pot > 0 && (
                        <div className="text-sm font-semibold text-brand-400 mt-1">${match.total_pot}</div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}
