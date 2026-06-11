const VERCEL_ENV_VARS = [
  'MONGODB_URI',
  'CLIENT_URL',
  'NEXT_PUBLIC_SITE_URL',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'RESEND_TO_EMAIL',
];

export default function SetupErrorPage({ message, code }) {
  const isWhitelist = code === 'MONGO_IP_WHITELIST' || /whitelist/i.test(message || '');
  const isVercel = code !== 'LOCAL_MONGO';

  return (
    <main className="setup-error-page">
      <div className="setup-error-card">
        <p className="setup-error-eyebrow">Portfolio setup</p>
        <h1 className="setup-error-title">Could not load the site</h1>
        <p className="setup-error-message">{message}</p>

        {isWhitelist && (
          <div className="setup-error-alert">
            <strong>Fix this in MongoDB Atlas (required for Vercel):</strong>
            <ol>
              <li>
                Open{' '}
                <a href="https://cloud.mongodb.com/v2" target="_blank" rel="noopener noreferrer">
                  cloud.mongodb.com
                </a>{' '}
                → your project → <strong>Network Access</strong>
              </li>
              <li>
                Click <strong>Add IP Address</strong> → <strong>Allow Access from Anywhere</strong>{' '}
                (<code>0.0.0.0/0</code>)
              </li>
              <li>Confirm — status must show <code>0.0.0.0/0</code> Active</li>
              <li>Wait 1–2 minutes, then <strong>Redeploy</strong> on Vercel (no code change needed)</li>
            </ol>
            <p className="setup-error-note">
              Vercel uses changing IPs — your home IP works locally, but production needs{' '}
              <code>0.0.0.0/0</code>.
            </p>
          </div>
        )}

        <div className="setup-error-steps">
          <h2 className="setup-error-steps-title">
            {isVercel ? 'Vercel checklist' : 'Local checklist'}
          </h2>
          <ol className="setup-error-list">
            {isVercel ? (
              <>
                {!isWhitelist && (
                  <li>
                    Atlas → <strong>Network Access</strong> → allow <code>0.0.0.0/0</code>
                  </li>
                )}
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
                  <code>MONGODB_URI</code> = same Atlas string as local, ending with{' '}
                  <code>/abdullah-portfolio</code>
                </li>
                <li>
                  Seed once: <code>npm run seed</code> (already done if local seed succeeded)
                </li>
                <li>
                  Redeploy, then open <code>/api/health</code> → expect{' '}
                  <code>{'"ok":true,"mongo":true'}</code>
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
