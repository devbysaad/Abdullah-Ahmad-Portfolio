import { useEffect, useState } from 'react';
import {
  fetchAbout,
  fetchExperience,
  fetchProjects,
  fetchServices,
  fetchTestimonials,
} from '../lib/api';

export function usePortfolioData() {
  const [data, setData] = useState({
    projects: [],
    services: [],
    testimonials: [],
    about: null,
    experience: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [projects, services, testimonials, about, experience] = await Promise.all([
          fetchProjects(),
          fetchServices(),
          fetchTestimonials(),
          fetchAbout(),
          fetchExperience(),
        ]);
        if (!cancelled) {
          setData({ projects, services, testimonials, about, experience });
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load portfolio');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...data, loading, error };
}
