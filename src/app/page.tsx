import Link from "next/link";
import { feed, projects, builders, formatCount } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { Avatar, Stat } from "@/components/avatar";
import { StatusBadge } from "@/components/status-badge";

const pillars = [
  {
    title: "Curate a project",
    body: "Give your idea a home among a considered circle of builders. Track its standing from first commit to launch.",
    icon: "I",
  },
  {
    title: "Disclose your work",
    body: "Publish milestones, features, and fixes as you go. Members follow the arc of your craft in real time.",
    icon: "II",
  },
  {
    title: "Measure the climb",
    body: "A measured progress and an honest timeline keep you accountable to the people who matter.",
    icon: "III",
  },
  {
    title: "Belong to the guild",
    body: "Discover fellow builders, study work early, and build a quiet following around what you make.",
    icon: "IV",
  },
];

export default function Home() {
  const preview = feed.slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-20 text-center md:pt-28">
          <span className="eyebrow">A private circle for public builders</span>
          <h1 className="serif mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Build in the open, <span className="gradient-text">among peers</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Dev Studio is a members&apos; atelier for developers who build in public — a place to
            keep a project, share its progress, and let a discerning community follow the journey
            from idea to launch.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/access"
            className="rounded-lg border border-brand-600/60 bg-brand-500/10 px-5 py-3 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
          >
            Enter the floor
          </Link>
          <Link
            href="/access"
            className="rounded-lg border border-[var(--color-hairline)] px-5 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-brand-500"
          >
            Request a studio
          </Link>
          </div>

          <div className="rule mx-auto mt-14 max-w-md" />

          <div className="mx-auto mt-8 flex max-w-md items-center justify-between">
            <Stat label="Projects" value={projects.length * 142} />
            <span className="h-8 w-px bg-[var(--color-hairline)]" />
            <Stat label="Builders" value={builders.length * 318} />
            <span className="h-8 w-px bg-[var(--color-hairline)]" />
            <Stat label="Disclosures" value={projects.reduce((a, p) => a + p.updates.length, 0) * 96} />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-hairline)] bg-[var(--color-hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((f) => (
            <div key={f.title} className="bg-ink-900/70 p-6">
              <span className="serif text-lg text-brand-500">{f.icon}</span>
              <h3 className="serif mt-3 text-lg font-medium text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="eyebrow">Currently in residence</span>
            <h2 className="serif mt-2 text-2xl font-semibold tracking-tight text-white">
              Projects gaining momentum
            </h2>
          </div>
          <Link href="/projects" className="text-sm text-brand-400 hover:underline">
            View the collection →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* Live feed preview */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="eyebrow">From the members</span>
            <h2 className="serif mt-2 text-2xl font-semibold tracking-tight text-white">
              Latest disclosures
            </h2>
          </div>
          <Link href="/builders" className="text-sm text-brand-400 hover:underline">
            Meet the builders →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {preview.map(({ project, builder, update }) => (
            <Link
              key={update.id}
              href={`/projects/${project.slug}`}
              className="card-hover flex items-start gap-3 rounded-xl border border-[var(--color-hairline)] bg-ink-900/60 p-4"
            >
              <Avatar name={builder.name} initials={builder.avatar} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-white">{builder.name}</span>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mt-1 truncate text-sm text-neutral-400">
                  <span className="font-medium text-brand-400">{update.title}</span> · {project.name}
                </p>
                <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
                  {formatCount(update.reactions)} reactions · {formatCount(update.comments)} notes
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Platform features */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6">
          <span className="eyebrow">The wider estate</span>
          <h2 className="serif mt-2 text-2xl font-semibold tracking-tight text-white">
            Beyond the build log
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            A considered ecosystem for those who compete, generate, and launch.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/arena"
            className="card-hover group rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-5"
          >
            <span className="serif text-2xl text-brand-500">♠</span>
            <h3 className="serif mt-4 text-lg font-medium text-white group-hover:text-brand-400">
              AI Agent Arena
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
              Poker-playing agents grind 6-max NLHE in measured tournaments with prizepools and a
              transparent, recorded ledger.
            </p>
          </Link>
          <Link
            href="/builder"
            className="card-hover group rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-5"
          >
            <span className="serif text-2xl text-brand-500">◆</span>
            <h3 className="serif mt-4 text-lg font-medium text-white group-hover:text-brand-400">
              AI App Builder
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
              Describe an app in plain language and have it built in under a minute — linked to
              pump.fun tokens for community and trade.
            </p>
          </Link>
          <Link
            href="/incubator"
            className="card-hover group rounded-2xl border border-[var(--color-hairline)] bg-ink-900/60 p-5"
          >
            <span className="serif text-2xl text-brand-500">⬡</span>
            <h3 className="serif mt-4 text-lg font-medium text-white group-hover:text-brand-400">
              Incubator &amp; IPO
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
              Gather apps into on-chain houses, receive patronage, and list a pump.fun IPO with
              vesting that aligns all parties.
            </p>
          </Link>
        </div>
      </section>

      {/* Live banner */}
      <section className="mx-auto max-w-6xl px-5">
        <Link
          href="/live"
          className="card-hover group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--color-hairline)] bg-gradient-to-br from-brand-500/10 to-transparent p-5"
        >
          <div className="flex items-center gap-3">
            <span className="live-dot h-2.5 w-2.5 rounded-full bg-brand-500" />
            <div>
              <p className="serif font-medium text-white">The Live Floor</p>
              <p className="text-sm text-neutral-400">
                Watch agents, commits, launches, and IPOs unfold in real time.
              </p>
            </div>
          </div>
          <span className="rounded-lg border border-[var(--color-hairline)] px-4 py-2 text-sm text-brand-400 transition-colors group-hover:border-brand-500">
            Enter →
          </span>
        </Link>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-hairline)] bg-gradient-to-br from-brand-500/10 via-ink-900/60 to-transparent p-10 text-center md:p-16">
          <span className="eyebrow">By invitation &amp; by craft</span>
          <h2 className="serif mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Claim your place at the bench
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-400">
            Keep your first project, post your first disclosure, and let a considered community
            follow every step from idea to launch.
          </p>
          <Link
            href="/access"
            className="mt-7 inline-block rounded-lg border border-brand-600/60 bg-brand-500/10 px-6 py-3 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
          >
            Request a studio
          </Link>
        </div>
      </section>
    </main>
  );
}
