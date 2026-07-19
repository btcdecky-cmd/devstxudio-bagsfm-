"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/live", label: "Live" },
  { href: "/projects", label: "Explore" },
  { href: "/arena", label: "Arena" },
  { href: "/builder", label: "Builder" },
  { href: "/incubator", label: "Incubator" },
  { href: "/builders", label: "Builders" },
  { href: "/dashboard", label: "Studio" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-hairline)] text-neutral-300 transition-colors hover:text-white lg:hidden"
        aria-label="Open menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 border-l border-[var(--color-hairline)] bg-ink-950/95 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="serif text-lg font-semibold text-white">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:text-white"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-brand-400"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
