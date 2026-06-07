export default function PageSpinner({ label = 'Loading' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
        role="status"
        aria-label={label}
      />
    </div>
  );
}
