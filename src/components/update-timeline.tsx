"use client";

import { useState } from "react";
import type { Update, UpdateKind } from "@/lib/data";
import { formatCount, formatDate } from "@/lib/data";

const kindMeta: Record<UpdateKind, { label: string; color: string }> = {
  milestone: { label: "Milestone", color: "text-gold-400 bg-gold-500/15 ring-gold-400/30" },
  feature: { label: "Feature", color: "text-brand-400 bg-brand-500/15 ring-brand-400/30" },
  fix: { label: "Fix", color: "text-amber-300 bg-amber-500/15 ring-amber-400/30" },
  note: { label: "Note", color: "text-neutral-300 bg-neutral-500/15 ring-neutral-400/30" },
  launch: { label: "Launch", color: "text-accent-400 bg-accent-500/15 ring-accent-400/30" },
};

export function UpdateTimeline({
  updates,
  projectsById,
}: {
  updates: Update[];
  projectsById?: Record<string, { name: string; href: string }>;
}) {
  const [reactions, setReactions] = useState<Record<string, number>>(
    Object.fromEntries(updates.map((u) => [u.id, u.reactions]))
  );
  const [comments, setComments] = useState<Record<string, number>>(
    Object.fromEntries(updates.map((u) => [u.id, u.comments]))
  );

  function toggleReaction(id: string) {
    setReactions((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  function toggleComment(id: string) {
    setComments((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }

  return (
    <ol className="relative space-y-6 border-l border-line pl-6">
      {updates.map((update) => {
        const meta = kindMeta[update.kind];
        return (
          <li key={update.id} className="relative">
            <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-ink-950 bg-brand-500" />
            <div className="rounded-xl border border-line bg-ink-900/60 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${meta.color}`}
                >
                  {meta.label}
                </span>
                <span className="text-xs text-neutral-500">{formatDate(update.date)}</span>
                {projectsById?.[update.id] && (
                  <a
                    href={projectsById[update.id].href}
                    className="text-xs text-brand-400 hover:underline"
                  >
                    {projectsById[update.id].name}
                  </a>
                )}
              </div>
              <h4 className="font-medium text-white">{update.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-neutral-400">{update.body}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
                <button
                  onClick={() => toggleReaction(update.id)}
                  className="transition-colors hover:text-brand-400"
                >
                  ▲ {formatCount(reactions[update.id] ?? update.reactions)}
                </button>
                <button
                  onClick={() => toggleComment(update.id)}
                  className="transition-colors hover:text-brand-400"
                >
                  💬 {formatCount(comments[update.id] ?? update.comments)}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
