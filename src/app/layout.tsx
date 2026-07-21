import { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import '@/app/globals.css';

export const metadata = {
  title: 'Dev Studio - Build in Public',
  description: 'Create projects, share updates, and track development progress while your community follows the journey from idea to launch.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devstudio.bagsfm.com',
    siteName: 'Dev Studio',
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
