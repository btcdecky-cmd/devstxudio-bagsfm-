"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/live", label: "Live", icon: "●" },
  { href: "/projects", label: "Explore", icon: "◇" },
  { href: "/builder", label: "Build", icon: "◆" },
  { href: "/arena", label: "Arena", icon: "♠" },
  { href: "/dashboard", label: "Studio", icon: "◎" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--color-hairline)] bg-ink-950/90 pb-safe pt-1 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 text-xs transition-colors ${
                active ? "text-brand-400" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <span className={`text-base ${active ? "text-brand-400" : "text-neutral-400"}`}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
