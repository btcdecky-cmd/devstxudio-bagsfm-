import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-500 text-sm">
            💰
          </span>
          <span className="font-semibold">Dev Studio</span>
          <span className="text-sm text-neutral-500">— build in public</span>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
          <Link href="/projects" className="hover:text-white">
            Explore
          </Link>
          <Link href="/builders" className="hover:text-white">
            Builders
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
          <span className="text-neutral-600">© {new Date().getFullYear()}</span>
        </nav>
      </div>
    </footer>
  );
}
