import Link from "next/link";
import { currentUser, formatCount } from "@/lib/data";

const links = [
  { href: "/projects", label: "Explore" },
  { href: "/builders", label: "Builders" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 glass">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 font-bold text-white shadow-lg shadow-brand-500/30">
            ◆
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Dev Studio</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="hidden text-sm text-neutral-300 hover:text-white sm:block"
          >
            @{currentUser.handle}
          </Link>
          <Link
            href="/projects"
            className="rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
          >
            Start building
          </Link>
        </div>
      </div>
    </header>
  );
}
