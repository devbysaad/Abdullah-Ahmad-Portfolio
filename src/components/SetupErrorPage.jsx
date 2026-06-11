const VERCEL_ENV_VARS = [
  'MONGODB_URI',
  'CLIENT_URL',
  'NEXT_PUBLIC_SITE_URL',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'RESEND_TO_EMAIL',
];

export default function SetupErrorPage({ message, code }) {
  const isVercel = code !== 'LOCAL_MONGO';

  return (
    <main className="setup-error-page">
      <div className="setup-error-card">
        <p className="setup-error-eyebrow">Portfolio setup</p>
        <h1 className="setup-error-title">Could not load the site</h1>
        <p className="setup-error-message">{message}</p>

        <div className="setup-error-steps">
          <h2 className="setup-error-steps-title">
            {isVercel ? 'Vercel checklist' : 'Local checklist'}
          </h2>
          <ol className="setup-error-list">
            {isVercel ? (
              <>
                <li>
                  In <strong>Vercel → Settings → Environment Variables</strong>, set:
                  <ul>
                    {VERCEL_ENV_VARS.map((name) => (
                      <li key={name}>
                        <code>{name}</code>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <code>MONGODB_URI</code> must be <strong>Atlas</strong> (
                  <code>mongodb+srv://…</code>), not <code>localhost</code>
                </li>
                <li>
                  Atlas → <strong>Network Access</strong> → allow <code>0.0.0.0/0</code>
                </li>
                <li>
                  Seed once: <code>MONGODB_URI=&quot;mongodb+srv://…&quot; npm run seed</code>
                </li>
                <li>
                  Redeploy, then check{' '}
                  <code>/api/health</code> → should return <code>{'"ok":true,"mongo":true'}</code>
                </li>
              </>
            ) : (
              <>
                <li>
                  Start MongoDB (<code>mongod</code> or Docker)
                </li>
                <li>
                  Copy <code>.env.example</code> → <code>.env.local</code> and fill all values
                </li>
                <li>
                  Run <code>npm run seed</code>
                </li>
                <li>
                  Run <code>npm run dev</code>
                </li>
              </>
            )}
          </ol>
        </div>
      </div>
    </main>
  );
}
