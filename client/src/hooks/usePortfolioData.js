import { useEffect, useState } from 'react';
import {
  fetchAbout,
  fetchExperience,
  fetchProjects,
  fetchServices,
  fetchTestimonials,
} from '../lib/api';
import { FALLBACK_EXPERIENCE, FALLBACK_PROJECTS } from '../content/aak.constants';
import {
  FALLBACK_TESTIMONIALS,
  normalizeTestimonials,
} from '../components/testimonials/testimonials.constants';

const EMPTY = {
  projects: FALLBACK_PROJECTS,
  services: [],
  testimonials: FALLBACK_TESTIMONIALS,
  about: null,
  experience: FALLBACK_EXPERIENCE,
};

async function loadEndpoint(name, fetcher, fallback) {
  try {
    const data = await fetcher();
    return { ok: true, data };
  } catch (err) {
    console.warn(`[portfolio] ${name} failed:`, err?.message || err);
    return { ok: false, data: fallback };
  }
}

/**
 * Renders immediately with fallbacks — API data hydrates in the background.
 * Never blocks the initial paint on network latency or cold API starts.
 */
export function usePortfolioData() {
  const [data, setData] = useState(EMPTY);
  const [apiOnline, setApiOnline] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const results = await Promise.all([
        loadEndpoint('projects', fetchProjects, FALLBACK_PROJECTS),
        loadEndpoint('services', fetchServices, []),
        loadEndpoint('testimonials', fetchTestimonials, FALLBACK_TESTIMONIALS),
        loadEndpoint('about', fetchAbout, null),
        loadEndpoint('experience', fetchExperience, FALLBACK_EXPERIENCE),
      ]);

      if (cancelled) return;

      const [projects, services, testimonials, about, experience] = results;
      const anyOk = results.some((r) => r.ok);

      setData({
        projects: projects.data?.length ? projects.data : FALLBACK_PROJECTS,
        services: services.data,
        testimonials: normalizeTestimonials(
          testimonials.data?.length ? testimonials.data : FALLBACK_TESTIMONIALS,
        ),
        about: about.data,
        experience: experience.data?.length ? experience.data : FALLBACK_EXPERIENCE,
      });
      setApiOnline(anyOk);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { ...data, apiOnline };
}
