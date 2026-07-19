import Link from "next/link";
import {
  currentUser,
  getBuilderProjects,
  formatCount,
  formatDate,
} from "@/lib/data";
import { Avatar, Stat } from "@/components/avatar";
import { StatusBadge } from "@/components/status-badge";
import { UpdateTimeline } from "@/components/update-timeline";

export const metadata = {
  title: "Studio — Dev Studio",
};

export default function DashboardPage() {
  const myProjects = getBuilderProjects(currentUser.id);
  const myUpdates = myProjects
    .flatMap((p) => p.updates.map((u) => ({ project: p, update: u })))
    .sort((a, b) => +new Date(b.update.date) - +new Date(a.update.date));

  const totalStars = myProjects.reduce((a, p) => a + p.stars, 0);
  const totalFollowers = myProjects.reduce((a, p) => a + p.followers, 0);

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      {/* Profile header */}
      <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-ink-900/60 p-6">
        <div className="flex items-center gap-4">
          <Avatar name={currentUser.name} initials={currentUser.avatar} size="lg" />
          <div>
            <h1 className="serif text-2xl font-semibold tracking-tight text-white">
              {currentUser.name}
            </h1>
            <p className="text-sm text-neutral-500">
              @{currentUser.handle} · {currentUser.location}
            </p>
            <p className="mt-1 text-sm text-neutral-400">{currentUser.tagline}</p>
          </div>
        </div>
        <Link
          href="/projects/new"
          className="btn-gold"
        >
          + New project
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-line bg-ink-900/60 p-4">
          <Stat label="Projects" value={myProjects.length} />
        </div>
        <div className="rounded-xl border border-line bg-ink-900/60 p-4">
          <Stat label="Stars" value={totalStars} />
        </div>
        <div className="rounded-xl border border-line bg-ink-900/60 p-4">
          <Stat label="Followers" value={totalFollowers} />
        </div>
        <div className="rounded-xl border border-line bg-ink-900/60 p-4">
          <Stat label="Updates" value={myUpdates.length} />
        </div>
      </div>

      {/* Projects */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-white">Your projects</h2>
        <div className="space-y-3">
          {myProjects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              className="card-hover flex items-center gap-4 rounded-xl border border-line bg-ink-900/60 p-4"
            >
              <div className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${p.accent}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{p.name}</span>
                  <StatusBadge status={p.status} />
                </div>
                <p className="line-clamp-1 text-sm text-neutral-400">{p.tagline}</p>
              </div>
              <div className="hidden text-right text-xs text-neutral-500 sm:block">
                <div>★ {formatCount(p.stars)}</div>
                <div>◆ {formatCount(p.followers)}</div>
              </div>
              <div className="w-28">
                <div className="mb-1 text-right text-xs text-neutral-500">{p.progress}%</div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent updates */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-white">Recent updates</h2>
        <UpdateTimeline
          updates={myUpdates.map((m) => m.update)}
          projectsById={Object.fromEntries(
            myUpdates.map((m) => [
              m.update.id,
              { name: m.project.name, href: `/projects/${m.project.slug}` },
            ])
          )}
        />
      </section>
    </main>
  );
}
