import type { Project } from "@/lib/data";

const statusStyles: Record<Project["status"], string> = {
  idea: "bg-neutral-500/15 text-neutral-300 ring-neutral-400/30",
  building: "bg-brand-500/15 text-brand-400 ring-brand-400/30",
  beta: "bg-accent-500/15 text-accent-400 ring-accent-400/30",
  launched: "bg-gold-500/15 text-gold-400 ring-gold-400/30",
};

const statusLabel: Record<Project["status"], string> = {
  idea: "Idea",
  building: "Building",
  beta: "Beta",
  launched: "Launched",
};

export function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}
