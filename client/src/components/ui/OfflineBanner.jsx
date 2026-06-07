export default function OfflineBanner() {
  return (
    <div className="offline-banner" role="status" aria-live="polite" data-name="offline-banner">
      <span className="offline-banner-indicator" aria-hidden="true" />
      <div className="offline-banner-copy">
        <p className="offline-banner-title">Preview mode</p>
        <p className="offline-banner-text">
          You&apos;re viewing saved content. Live updates resume when the API is connected.
        </p>
      </div>
    </div>
  );
}
