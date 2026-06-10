import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const SmoothScrollContext = createContext(null);

/**
 * Lenis + GSAP ScrollTrigger — loaded after first paint so they don't block LCP.
 */
export function SmoothScrollProvider({ children, enabled = true }) {
  const lenisRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let destroyed = false;
    let lenis = null;
    let gsapRef = null;
    let ticker = null;
    let onScroll = null;
    let onAnchorClick = null;
    let idleId = null;
    let timeoutId = null;
    let refreshScroll = () => {};
    let resizeObserver = null;

    const init = async () => {
      const [{ default: Lenis }, gsapModule] = await Promise.all([
        import('lenis'),
        import('../lib/gsap'),
        import('lenis/dist/lenis.css'),
      ]);

      if (destroyed) return;

      const { gsap, ScrollTrigger } = gsapModule;
      gsapRef = gsap;

      lenis = new Lenis({
        duration: 0.95,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.2,
        infinite: false,
      });

      lenisRef.current = lenis;

      onScroll = () => ScrollTrigger.update();
      lenis.on('scroll', onScroll);

      ticker = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      document.documentElement.classList.add('lenis', 'lenis-smooth');
      refreshScroll = () => ScrollTrigger.refresh();

      requestAnimationFrame(() => {
        refreshScroll();
        setReady(true);
      });

      window.addEventListener('load', refreshScroll);
      resizeObserver = new ResizeObserver(() => refreshScroll());
      resizeObserver.observe(document.body);

      onAnchorClick = (event) => {
        const anchor = event.target.closest('a[href^="#"]');
        if (!anchor || anchor.dataset.nativeScroll !== undefined) return;

        const href = anchor.getAttribute('href');
        if (!href) return;

        if (href === '#') {
          event.preventDefault();
          lenis.scrollTo(0);
          return;
        }

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        lenis.scrollTo(target, { offset: -96 });
      };

      document.addEventListener('click', onAnchorClick);
    };

    if (typeof requestIdleCallback === 'function') {
      idleId = requestIdleCallback(init, { timeout: 1500 });
    } else {
      timeoutId = setTimeout(init, 80);
    }

    return () => {
      destroyed = true;

      if (idleId != null) cancelIdleCallback(idleId);
      if (timeoutId != null) clearTimeout(timeoutId);

      setReady(false);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');

      window.removeEventListener('load', refreshScroll);
      resizeObserver?.disconnect();
      if (onAnchorClick) document.removeEventListener('click', onAnchorClick);
      if (lenis && onScroll) lenis.off('scroll', onScroll);
      if (gsapRef && ticker) gsapRef.ticker.remove(ticker);

      lenis?.destroy();
      lenisRef.current = null;

      import('../lib/gsap').then(({ ScrollTrigger }) => {
        ScrollTrigger.clearScrollMemory?.();
        ScrollTrigger.refresh();
      });
    };
  }, [enabled]);

  const scrollTo = useCallback((target, options = {}) => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const { offset = -88, immediate = false, ...rest } = options;

    if (target === 0 || target === '0' || target === '#top') {
      lenis.scrollTo(0, { immediate, ...rest });
      return;
    }

    if (typeof target === 'number') {
      lenis.scrollTo(target, { immediate, ...rest });
      return;
    }

    const el =
      typeof target === 'string'
        ? document.querySelector(target.startsWith('#') ? target : `#${target}`)
        : target;

    if (el) {
      lenis.scrollTo(el, { offset, immediate, ...rest });
    }
  }, []);

  const value = useMemo(
    () => ({
      ready,
      scrollTo,
      getLenis: () => lenisRef.current,
    }),
    [ready, scrollTo]
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
