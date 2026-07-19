"use client";

import { useState } from "react";
import type { Project } from "@/lib/data";
import { categories, statuses } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchStatus = status === "all" || p.status === status;
    const matchQuery =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchStatus && matchQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-ink-900/60 p-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, tags…"
          className="w-full rounded-lg border border-line bg-ink-950 px-3.5 py-2 text-sm text-white placeholder:text-neutral-600 outline-none focus:border-brand-500 lg:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-line bg-ink-950 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
          >
            <option value="all">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              category === c
                ? "border-brand-500 bg-brand-500/15 text-brand-400"
                : "border-line text-neutral-400 hover:border-brand-500/50 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-line bg-ink-900/60 p-12 text-center text-neutral-400">
          No projects match your filters.
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
