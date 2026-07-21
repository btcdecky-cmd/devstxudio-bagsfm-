'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ROUTES, SITE_NAME } from '@/lib/constants';
import { Button } from './ui/button';

const navigation = [
  { name: 'Projects', href: ROUTES.PROJECTS },
  { name: 'Builders', href: ROUTES.BUILDERS },
  { name: 'Arena', href: ROUTES.ARENA },
  { name: 'Builder', href: ROUTES.BUILDER },
  { name: 'Live', href: ROUTES.LIVE },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-neutral-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
              <span className="text-xs font-bold text-ink-900">DS</span>
            </div>
            <span className="hidden font-serif text-lg font-bold text-gold sm:inline">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden space-x-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-neutral-300 hover:text-gold transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={ROUTES.ACCESS}>Get Access</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gold" />
              ) : (
                <Menu className="h-6 w-6 text-gold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="space-y-1 pb-4 md:hidden">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-neutral-300 hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
