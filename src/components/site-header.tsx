import Link from "next/link";
import { currentUser, formatCount } from "@/lib/data";

const links = [
  { href: "/live", label: "Live" },
  { href: "/projects", label: "Explore" },
  { href: "/arena", label: "Agent Arena" },
  { href: "/builder", label: "App Builder" },
  { href: "/incubator", label: "Incubator" },
  { href: "/builders", label: "Builders" },
  { href: "/github", label: "GitHub Finder" },
  { href: "/access", label: "Access" },
  { href: "/dashboard", label: "Studio" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-hairline)] glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-sm shadow-lg shadow-brand-500/40">
            💰
          </span>
          <span className="serif text-lg font-semibold tracking-tight text-white">
            Dev&nbsp;Studio
          </span>
          <span className="hidden border-l border-[var(--color-hairline)] pl-2.5 text-[0.65rem] uppercase tracking-[0.25em] text-brand-500 sm:block">
            Est. Build
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-neutral-400 transition-colors hover:bg-white/5 hover:text-brand-400"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden text-sm text-neutral-400 hover:text-brand-400 sm:block"
          >
            @{currentUser.handle}
          </Link>
          <Link
            href="/access"
            className="rounded-lg border border-brand-600/60 bg-brand-500/10 px-3.5 py-2 text-sm font-medium text-brand-400 transition-colors hover:bg-brand-500/20"
          >
            Request access
          </Link>
        </div>
      </div>
    </header>
  );
}
