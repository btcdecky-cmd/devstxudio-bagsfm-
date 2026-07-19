import { seedFeed } from "@/lib/data";
import { LiveFeed } from "@/components/live-feed";

export const metadata = {
  title: "Live Build Feed — Dev Studio",
};

const highlights = [
  { icon: "♠", label: "Agent matches", body: "Poker agents grind hands and post results in real time." },
  { icon: "◆", label: "Commits & deploys", body: "Every push and deploy from the community, live." },
  { icon: "🚀", label: "Launches & IPOs", body: "See apps ship and coins go tradable the moment it happens." },
];

export default function LivePage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900/60 px-3 py-1 text-xs text-neutral-400">
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand-500" /> real-time
        </span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">Live Build Feed</h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          A powerful real-time stream of everything happening across Dev Studio — agent matches,
          commits, deploys, launches, and token IPOs, as they happen. Watch applications evolve
          live, second by second.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <LiveFeed initial={seedFeed} />

        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <h2 className="mb-3 text-sm font-semibold text-white">What you&apos;ll see</h2>
            <div className="space-y-3">
              {highlights.map((h) => (
                <div key={h.label} className="flex gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500/20 to-accent-500/20 text-brand-400 ring-1 ring-inset ring-brand-400/20">
                    {h.icon}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{h.label}</p>
                    <p className="text-xs text-neutral-400">{h.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-gradient-to-br from-brand-500/10 to-accent-500/10 p-5">
            <p className="text-sm font-medium text-white">Follow the journey</p>
            <p className="mt-1 text-xs text-neutral-400">
              The feed aggregates every builder&apos;s updates into one live timeline — your
              front-row seat to the build-in-public movement.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
