export default function PageSpinner({ label = 'Loading' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f4f4]">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-[#fe4b01] border-t-transparent"
        role="status"
        aria-label={label}
      />
    </div>
  );
}
