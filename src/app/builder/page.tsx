import {
  appBuilderFeatures,
  appTemplates,
  formatCount,
} from "@/lib/data";
import { AppBuilderDemo } from "@/components/app-builder-demo";

export const metadata = {
  title: "AI App Builder — Dev Studio",
};

export default function BuilderPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <span className="eyebrow">dev-fun.gitbook.io</span>
        <h1 className="serif mt-3 text-3xl font-semibold tracking-tight text-white">
          AI-Powered App Builder
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Describe an app in natural language and it generates, deploys, and publishes it in under
          a minute — no code required. Link apps to pump.fun tokens for trading, community, and
          monetization, with on-chain features and custom backend logic.
        </p>
      </div>

      <AppBuilderDemo />

      {/* Features */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {appBuilderFeatures.map((f, i) => (
          <div key={i} className="card-hover rounded-2xl border border-line bg-ink-900/60 p-5">
            <span className="serif text-xl text-brand-500">◆</span>
            <p className="mt-3 text-sm text-neutral-300">{f}</p>
          </div>
        ))}
      </section>

      {/* Templates */}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-white">Built in seconds</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {appTemplates.map((t) => (
            <div key={t.id} className="card-hover overflow-hidden rounded-2xl border border-line bg-ink-900/60">
              <div className={`h-16 bg-gradient-to-br ${t.accent}`} />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{t.name}</h3>
                  {t.linkedToken && (
                    <span className="rounded-full bg-accent-500/15 px-2 py-0.5 text-xs text-accent-400 ring-1 ring-inset ring-accent-400/30">
                      {t.linkedToken}
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-neutral-400">“{t.prompt}”</p>
                <p className="mt-2 text-xs text-neutral-500">
                  {t.category} · built in {t.buildSeconds}s
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
