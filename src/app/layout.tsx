import { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import '@/app/globals.css';

export const metadata = {
  title: 'Bags.fm | Discover what is being built',
  description: 'Bags.fm is the ecosystem advertising and discovery platform helping builders, projects, and partners turn attention into measurable activity.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bags.fm',
    siteName: 'Bags.fm',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@bagsfm',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
