import Link from "next/link";
import { builders, formatCount, getBuilderProjects } from "@/lib/data";
import { Avatar, Stat } from "@/components/avatar";
import { StatusBadge } from "@/components/status-badge";

export const metadata = {
  title: "Builders — Dev Studio",
};

export default function BuildersPage() {
  const ranked = [...builders].sort((a, b) => b.followers - a.followers);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white">Meet the builders</h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Discover developers building in public. Follow their work, explore their projects, and
          watch applications evolve from idea to launch.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map((b) => {
          const bProjects = getBuilderProjects(b.id);
          return (
            <div
              key={b.id}
              className="card-hover rounded-2xl border border-line bg-ink-900/60 p-5"
            >
              <div className="flex items-center gap-3">
                <Avatar name={b.name} initials={b.avatar} size="lg" />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{b.name}</p>
                  <p className="text-xs text-neutral-500">@{b.handle} · {b.location}</p>
                </div>
              </div>

              <p className="mt-3 text-sm text-neutral-400">{b.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {b.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line px-2 py-0.5 text-[11px] text-neutral-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-6 border-t border-line pt-4">
                <Stat label="Followers" value={b.followers} />
                <Stat label="Projects" value={b.projects} />
              </div>

              {bProjects.length > 0 && (
                <div className="mt-4 space-y-2">
                  {bProjects.slice(0, 2).map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="flex items-center justify-between rounded-lg border border-line p-2.5 text-sm transition-colors hover:border-brand-500"
                    >
                      <span className="truncate text-neutral-300">{p.name}</span>
                      <StatusBadge status={p.status} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
