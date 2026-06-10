/**
 * Consistent image loading — eager + high priority for LCP, lazy for everything else.
 */
export default function LazyImage({ priority = false, alt = '', ...props }) {
  return (
    <img
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...props}
    />
  );
}
