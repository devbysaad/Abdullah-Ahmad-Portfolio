import { env, getEmailJsMissingVars, isEmailJsConfigured } from '../../lib/env';

export default function EmailJsSetupBanner({ contactEmail }) {
  if (isEmailJsConfigured()) return null;

  const missing = getEmailJsMissingVars();
  const fallbackEmail = contactEmail?.trim() || 'hello@abdullahahmad.dev';

  return (
    <div className="emailjs-setup-banner" role="status" data-name="emailjs-setup-banner">
      {env.isDev ? (
        <>
          <p className="emailjs-setup-banner-title">EmailJS not configured — forms are disabled</p>
          <p className="emailjs-setup-banner-text">
            Add these to <code>client/.env</code> and restart <code>npm run dev</code>:
          </p>
          <ul className="emailjs-setup-banner-list">
            {missing.map((key) => (
              <li key={key}>
                <code>{key}</code>
              </li>
            ))}
          </ul>
          <p className="emailjs-setup-banner-text">
            Full setup steps are in <code>client/.env.example</code>.
          </p>
        </>
      ) : (
        <>
          <p className="emailjs-setup-banner-title">Scheduling is temporarily offline</p>
          <p className="emailjs-setup-banner-text">
            Please email directly at{' '}
            <a href={`mailto:${fallbackEmail}`} className="emailjs-setup-banner-link">
              {fallbackEmail}
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}
