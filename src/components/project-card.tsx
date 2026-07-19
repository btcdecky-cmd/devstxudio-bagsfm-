import Link from "next/link";
import type { Project } from "@/lib/data";
import { formatCount, getBuilder } from "@/lib/data";
import { StatusBadge } from "@/components/status-badge";

export function ProjectCard({ project }: { project: Project }) {
  const owner = getBuilder(project.ownerId);
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-900/60"
    >
      <div className={`relative h-24 bg-gradient-to-br ${project.accent}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="absolute right-3 top-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold tracking-tight text-white group-hover:text-brand-400">
              {project.name}
            </h3>
            <span className="text-xs text-neutral-500">{project.category}</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-neutral-400">
            {project.tagline}
          </p>
        </div>

        <div className="mt-auto">
          <div className="mb-1.5 flex items-center justify-between text-xs text-neutral-500">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-3">
          <div className="flex items-center gap-2">
            {owner && (
              <>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-[10px] font-semibold text-white">
                  {owner.avatar}
                </span>
                <span className="text-xs text-neutral-400">@{owner.handle}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span>★ {formatCount(project.stars)}</span>
            <span>◆ {formatCount(project.followers)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
