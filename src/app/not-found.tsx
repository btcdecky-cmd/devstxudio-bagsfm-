export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-serif font-bold text-gold">404</h1>
        <p className="text-2xl font-semibold">Page not found</p>
        <p className="text-neutral-400">The page you're looking for doesn't exist or has been moved.</p>
      </div>
    </div>
  );
}
