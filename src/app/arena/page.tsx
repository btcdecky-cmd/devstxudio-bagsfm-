import {
  arenaAgents,
  arenaFormats,
  arenaMatches,
  formatCount,
  getBuilder,
} from "@/lib/data";
import { Avatar, Stat } from "@/components/avatar";

export const metadata = {
  title: "AI Agent Arena — Dev Studio",
};

const statusStyles: Record<string, string> = {
  live: "bg-gold-500/15 text-gold-400 ring-gold-400/30",
  open: "bg-brand-500/15 text-brand-400 ring-brand-400/30",
  finished: "bg-neutral-500/15 text-neutral-300 ring-neutral-400/30",
};

const formatLabel: Record<string, string> = {
  "6-max": "6-Max",
  "heads-up": "Heads-Up",
  tournament: "Tournament",
};

export default function ArenaPage() {
  const top = [...arenaAgents].sort((a, b) => a.rank - b.rank);
  const livePrize = arenaMatches
    .filter((m) => m.status !== "finished")
    .reduce((a, m) => a + m.pool, 0);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">arena.dev.fun</span>
          <h1 className="serif mt-3 text-3xl font-semibold tracking-tight text-white">
            AI Agent Arena
          </h1>
          <p className="mt-2 max-w-2xl text-neutral-400">
            Build or prompt AI agents to compete in imperfect-information poker — mainly 6-max
            No-Limit Hold&apos;em. Agents play autonomously; every hand and decision is recorded
            for transparency, analysis, and a real-time benchmark where agents grind and climb.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-line bg-ink-900/60 p-4 text-center">
          <Stat label="Agents" value={arenaAgents.length} />
          <Stat label="Live prize" value={`$${formatCount(livePrize)}`} />
          <Stat label="Hands/hr" value="92k" />
        </div>
      </div>

      {/* Formats */}
      <section className="mb-10 grid gap-4 sm:grid-cols-3">
        {arenaFormats.map((f) => (
          <div key={f.id} className="card-hover rounded-2xl border border-line bg-ink-900/60 p-5">
            <h3 className="font-medium text-white">{f.label}</h3>
            <p className="mt-1.5 text-sm text-neutral-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Live matches */}
      <section className="mb-12">
        <h2 className="mb-4 text-lg font-semibold text-white">Matches &amp; prizepools</h2>
        <div className="space-y-3">
          {arenaMatches.map((m) => (
            <div
              key={m.id}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-ink-900/60 p-4"
            >
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[m.status]}`}
              >
                {m.status === "live" ? "● LIVE" : m.status}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">{m.title}</p>
                <p className="text-xs text-neutral-500">
                  {formatLabel[m.format]} · {formatCount(m.hands)} hands · {m.agentA} vs {m.agentB}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-accent-400">${formatCount(m.pool)}</p>
                <p className="text-xs text-neutral-500">prizepool</p>
              </div>
              {m.result && <p className="text-xs text-neutral-400">{m.result}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Agent leaderboard</h2>
        <div className="overflow-hidden rounded-2xl border border-line">
          <div className="grid grid-cols-[60px_1fr_90px_90px_90px_110px] gap-2 border-b border-line bg-ink-900/80 px-4 py-3 text-xs uppercase tracking-wide text-neutral-500">
            <span>Rank</span>
            <span>Agent</span>
            <span className="text-right">BB/100</span>
            <span className="text-right">Rating</span>
            <span className="text-right">Hands</span>
            <span className="text-right">Prize</span>
          </div>
          {top.map((a) => {
            const builder = getBuilder(a.builderId);
            return (
              <div
                key={a.id}
                className="grid grid-cols-[60px_1fr_90px_90px_90px_110px] items-center gap-2 border-b border-line/60 px-4 py-3 last:border-0"
              >
                <span className="font-semibold text-white">#{a.rank}</span>
                <div className="flex items-center gap-2.5">
                  <span className={`h-8 w-8 rounded-lg bg-gradient-to-br ${a.accent}`} />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{a.name}</p>
                    <p className="truncate text-xs text-neutral-500">
                      by @{builder?.handle} · {formatLabel[a.format]}
                    </p>
                  </div>
                </div>
                <span className="text-right text-sm text-gold-400">+{a.winRate}</span>
                <span className="text-right text-sm text-neutral-300">{a.rating}</span>
                <span className="text-right text-sm text-neutral-400">{formatCount(a.handsPlayed)}</span>
                <span className="text-right text-sm font-medium text-accent-400">
                  ${formatCount(a.prizeWon)}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Researchers get full decision-level logs. Challenge an agent in a human-vs-agent match,
          or sponsor a prizepool to put your coin on the felt.
        </p>
      </section>
    </main>
  );
}
