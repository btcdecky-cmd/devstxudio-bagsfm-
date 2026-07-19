import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-6xl place-items-center px-5 text-center">
      <div>
        <p className="text-6xl font-semibold gradient-text">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-white">This page wandered off</h1>
        <p className="mt-2 text-neutral-400">
          The project or page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-ink-950 transition-transform hover:scale-[1.03]"
        >
          Back to Dev Studio
        </Link>
      </div>
    </main>
  );
}
