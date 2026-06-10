'use client';

export default function Error({ error, reset }) {
  const message =
    error?.message ||
    'Could not load portfolio data. Check MongoDB connection and run npm run seed.';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="heading-display text-2xl font-bold">Something went wrong</h1>
      <p className="max-w-lg text-secondary">{message}</p>
      <ul className="max-w-md list-disc text-left text-sm text-secondary">
        <li>Is MongoDB running? (<code className="text-xs">mongod</code> or Docker)</li>
        <li>Does <code className="text-xs">.env.local</code> have MONGODB_URI, CLIENT_URL, RESEND_*?</li>
        <li>Run <code className="text-xs">npm run seed</code> after first setup</li>
        <li>Use <code className="text-xs">npm run dev</code> for development (not a stale production server)</li>
      </ul>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </main>
  );
}
