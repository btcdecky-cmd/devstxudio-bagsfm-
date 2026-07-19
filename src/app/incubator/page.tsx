import {
  incubatorProjects,
  incubatorSteps,
  formatCount,
  getBuilder,
} from "@/lib/data";
import { Avatar } from "@/components/avatar";

export const metadata = {
  title: "Project Incubator & IPO — Dev Studio",
};

const statusStyles: Record<string, string> = {
  incubating: "bg-brand-500/15 text-brand-400 ring-brand-400/30",
  ipo: "bg-brand-500/15 text-brand-400 ring-brand-400/30",
  live: "bg-gold-500/15 text-gold-400 ring-gold-400/30",
};

export default function IncubatorPage() {
  const totalRaised = incubatorProjects.reduce((a, p) => a + p.raised, 0);
  const liveCount = incubatorProjects.filter((p) => p.status === "live").length;

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="serif text-3xl font-semibold tracking-tight text-white">
            Project Incubator &amp; IPO
          </h1>
          <p className="mt-2 max-w-2xl text-neutral-400">
            Turn ideas into tradable assets. Bundle multiple apps under one brand and coin to
            form an on-chain business, get incubator support, then run a pump.fun IPO with
            vesting that aligns creators, users, and traders.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-line bg-ink-900/60 p-4 text-center">
          <div>
            <p className="text-sm font-semibold text-white">${formatCount(totalRaised)}</p>
            <p className="text-xs text-neutral-500">Raised</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{liveCount}</p>
            <p className="text-xs text-neutral-500">Live coins</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {incubatorSteps.map((s) => (
          <div key={s.step} className="card-hover rounded-2xl border border-line bg-ink-900/60 p-5">
            <span className="text-2xl font-semibold gradient-text">{s.step}</span>
            <h3 className="mt-2 font-medium text-white">{s.title}</h3>
            <p className="mt-1.5 text-sm text-neutral-400">{s.body}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">On-chain businesses</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {incubatorProjects.map((p) => {
            const builder = getBuilder(p.builderId);
            return (
              <div
                key={p.id}
                className="card-hover overflow-hidden rounded-2xl border border-line bg-ink-900/60"
              >
                <div className={`h-1.5 bg-gradient-to-r ${p.accent}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">{p.name}</h3>
                        <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-medium text-white">
                          {p.coin}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-neutral-400">{p.tagline}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 text-center">
                    <div>
                      <p className="text-sm font-semibold text-white">{p.apps}</p>
                      <p className="text-xs text-neutral-500">apps</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {p.raised > 0 ? `$${formatCount(p.raised)}` : "—"}
                      </p>
                      <p className="text-xs text-neutral-500">raised</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{p.vesting}</p>
                      <p className="text-xs text-neutral-500">vesting</p>
                    </div>
                  </div>

                  {builder && (
                    <div className="mt-4 flex items-center gap-2 border-t border-line pt-4">
                      <Avatar name={builder.name} initials={builder.avatar} size="sm" />
                      <span className="text-xs text-neutral-400">Led by @{builder.handle}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
