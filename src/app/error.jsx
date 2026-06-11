'use client';

export default function Error({ error, reset }) {
  const message =
    error?.message?.includes('Server Components render') || !error?.message
      ? 'An unexpected error occurred while loading the page.'
      : error.message;

  return (
    <main className="setup-error-page">
      <div className="setup-error-card">
        <p className="setup-error-eyebrow">Unexpected error</p>
        <h1 className="setup-error-title">Something went wrong</h1>
        <p className="setup-error-message">{message}</p>
        <p className="setup-error-message">
          Check <code>/api/health</code> on your deployed URL for diagnostics, then verify Vercel
          environment variables and redeploy.
        </p>
        <button type="button" onClick={reset} className="btn-primary mt-4">
          Try again
        </button>
      </div>
    </main>
  );
}
