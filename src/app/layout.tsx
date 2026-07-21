import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Dev Studio — Build in public",
  description:
    "Dev Studio is a builder platform for developers who want to build in public. Create projects, share updates, and track development progress with your community.",
  keywords: ["dev", "builder", "projects", "community", "ai", "poker", "blockchain"],
  openGraph: {
    title: "Dev Studio — Build in public",
    description: "A members' atelier for developers who build in public",
    url: "https://devstudio.build",
    siteName: "Dev Studio",
    images: [
      {
        url: "https://devstudio.build/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#08070a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
