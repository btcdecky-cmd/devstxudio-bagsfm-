import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getBuilder, getBuilderProjects, formatCount, formatDate } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";
import { Avatar, Stat } from "@/components/avatar";
import { UpdateTimeline } from "@/components/update-timeline";
import { ProjectCard } from "@/components/project-card";

export function generateStaticParams() {
  return [];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const owner = getBuilder(project.ownerId)!;
  const others = getBuilderProjects(owner.id).filter((p) => p.id !== project.id);

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <Link href="/projects" className="text-sm text-neutral-400 hover:text-white">
        ← Back to explore
      </Link>

      {/* Header */}
      <div className={`mt-5 rounded-3xl bg-gradient-to-br ${project.accent} p-[1px]`}>
        <div className="rounded-3xl bg-ink-950/80 p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  {project.name}
                </h1>
                <StatusBadge status={project.status} />
              </div>
              <p className="mt-1 text-neutral-300">{project.tagline}</p>
            </div>
            <button className="rounded-xl border border-line bg-ink-900/80 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-brand-500">
              ◆ Follow · {formatCount(project.followers)}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-6">
            <Stat label="Stars" value={project.stars} />
            <span className="h-8 w-px bg-line" />
            <Stat label="Followers" value={project.followers} />
            <span className="h-8 w-px bg-line" />
            <Stat label="Updates" value={project.updates.length} />
            <span className="h-8 w-px bg-line" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{project.progress}%</span>
              <span className="text-xs text-neutral-500">Complete</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between text-xs text-neutral-500">
              <span>Development progress</span>
              <span>{formatDate(project.updatedAt)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-white/90 to-white/60"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-white">About</h2>
          <p className="leading-relaxed text-neutral-300">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-2.5 py-1 text-xs text-neutral-300"
              >
                #{t}
              </span>
            ))}
          </div>

          <h2 className="mb-4 mt-8 text-lg font-semibold text-white">Build log</h2>
          <UpdateTimeline updates={project.updates} />
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Builder</h3>
            <Link href="/builders" className="flex items-center gap-3">
              <Avatar name={owner.name} initials={owner.avatar} size="lg" />
              <div>
                <p className="font-medium text-white">{owner.name}</p>
                <p className="text-xs text-neutral-500">@{owner.handle}</p>
              </div>
            </Link>
            <p className="mt-3 text-sm text-neutral-400">{owner.tagline}</p>
            <div className="mt-4 flex gap-5 border-t border-line pt-4">
              <Stat label="Followers" value={owner.followers} />
              <Stat label="Projects" value={owner.projects} />
            </div>
          </div>

          {others.length > 0 && (
            <div className="rounded-2xl border border-line bg-ink-900/60 p-5">
              <h3 className="mb-3 text-sm font-semibold text-white">More from {owner.name}</h3>
              <div className="space-y-3">
                {others.map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="block rounded-lg border border-line p-3 transition-colors hover:border-brand-500"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{p.name}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">{p.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
