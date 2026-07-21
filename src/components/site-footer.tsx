import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-ink-900/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <span className="text-xs font-bold text-ink-900">DS</span>
              </div>
              <span className="font-serif text-lg font-bold text-gold">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-neutral-400">
              Build in public. Create projects, share updates, and track development progress.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gold">Product</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="/projects" className="hover:text-gold transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/builders" className="hover:text-gold transition-colors">
                  Builders
                </Link>
              </li>
              <li>
                <Link href="/arena" className="hover:text-gold transition-colors">
                  Arena
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-gold transition-colors">
                  AI Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gold">Community</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="https://twitter.com" className="hover:text-gold transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://github.com" className="hover:text-gold transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="hover:text-gold transition-colors">
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gold">Legal</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <Link href="#" className="hover:text-gold transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gold transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gold transition-colors">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="rule mt-8 pt-8">
          <p className="text-center text-sm text-neutral-500">
            © {currentYear} {SITE_NAME}. Built in public by the community.
          </p>
        </div>
      </div>
    </footer>
  );
}
