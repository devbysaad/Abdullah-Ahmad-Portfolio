'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Renders children only when near the viewport — keeps below-fold JS/CSS out of initial load.
 */
export default function LazyWhenVisible({
  children,
  minHeight = 'min-h-[80px]',
  rootMargin = '280px 0px',
  className = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div ref={ref} className={visible ? className : `${minHeight} ${className}`.trim()}>
      {visible ? children : null}
    </div>
  );
}
