"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <main className="mx-auto grid min-h-[60vh] max-w-6xl place-items-center px-5 text-center">
          <div>
            <p className="text-6xl font-semibold gradient-text">500</p>
            <h1 className="mt-4 text-2xl font-semibold text-white">Something went wrong</h1>
            <p className="mt-2 text-neutral-400">
              An unexpected error occurred. Please try again.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={reset}
                className="btn-gold"
              >
                Try again
              </button>
              <Link href="/" className="btn-ghost">
                Back to Dev Studio
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
