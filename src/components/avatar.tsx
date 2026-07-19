import { formatCount } from "@/lib/data";

export function Avatar({
  name,
  initials,
  size = "md",
  accent,
}: {
  name: string;
  initials: string;
  size?: "sm" | "md" | "lg";
  accent?: string;
}) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };
  const bg = accent ?? "from-brand-500 to-accent-500";
  return (
    <span
      title={name}
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${bg} font-semibold text-white ${sizes[size]}`}
    >
      {initials}
    </span>
  );
}

export function Stat({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  const display = typeof value === "number" ? formatCount(value) : value;
  return (
    <div className="flex flex-col">
      <span className="text-sm font-semibold text-white">{display}</span>
      <span className="text-xs text-neutral-500">{label}</span>
    </div>
  );
}
