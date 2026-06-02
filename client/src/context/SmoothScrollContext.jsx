import { createContext, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

export const SmoothScrollContext = createContext(null);

/**
 * Lenis smooth scroll + GSAP ScrollTrigger sync (standard stack for buttery scroll).
 */
export function SmoothScrollProvider({ children, enabled = true }) {
  const lenisRef = useRef(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
      infinite: false,
    });

    lenisRef.current = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    document.documentElement.classList.add('lenis', 'lenis-smooth');
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setReady(true);
    });

    const onAnchorClick = (event) => {
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

    return () => {
      document.removeEventListener('click', onAnchorClick);
      setReady(false);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.clearScrollMemory?.();
      ScrollTrigger.refresh();
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
