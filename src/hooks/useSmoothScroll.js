import { useContext, useEffect, useState } from 'react';
import { SmoothScrollContext } from '../context/SmoothScrollContext';

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/** Navbar / anchor links — smooth scroll when Lenis is active */
export function useLenisNavHandler() {
  const ctx = useSmoothScroll();

  return (event, href, onAfter) => {
    if (!href?.startsWith('#')) return;

    const isTop = href === '#' || href === '#top';
    if (ctx?.scrollTo) {
      event.preventDefault();
      if (isTop) {
        ctx.scrollTo(0);
      } else {
        ctx.scrollTo(href, { offset: -96 });
      }
      onAfter?.();
      return;
    }

    if (!isTop) onAfter?.();
  };
}

/** Scrolled state for fixed nav — uses Lenis when available */
export function useScrollProgress(threshold = 40) {
  const ctx = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = (scrollY) => setScrolled(scrollY > threshold);

    if (ctx?.getLenis?.()) {
      const lenis = ctx.getLenis();
      const onLenisScroll = ({ scroll }) => update(scroll);
      update(lenis.scroll);
      lenis.on('scroll', onLenisScroll);
      return () => lenis.off('scroll', onLenisScroll);
    }

    const onScroll = () => update(window.scrollY);
    update(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ctx, threshold]);

  return scrolled;
}
