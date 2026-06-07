import { lazy, Suspense, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroHeadingSection from '../components/HeroHeadingSection';
import SmoothScroll from '../components/SmoothScroll';
import OfflineBanner from '../components/ui/OfflineBanner';
import { usePortfolioData } from '../hooks/usePortfolioData';

const HeroVideoSection = lazy(() => import('../components/HeroVideoSection'));
const BrandsStrip = lazy(() => import('../components/BrandsStrip'));
const WhyMe = lazy(() => import('../components/WhyMe'));
const Services = lazy(() => import('../components/Services'));
const Work = lazy(() => import('../components/Work'));
const Experience = lazy(() => import('../components/Experience'));
const About = lazy(() => import('../components/About'));
const FAQ = lazy(() => import('../components/FAQ'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

function SectionShell({ minHeight = 'min-h-[80px]' }) {
  return <div className={minHeight} aria-hidden="true" />;
}

export default function Home() {
  const { projects, services, testimonials, about, experience, apiOnline } = usePortfolioData();

  useEffect(() => {
    const prefetch = [
      import('../components/HeroVideoSection'),
      import('../components/BrandsStrip'),
      import('../components/WhyMe'),
      import('../components/Services'),
      import('../components/Work'),
      import('../components/Experience'),
      import('../components/About'),
      import('../components/FAQ'),
      import('../components/Testimonials'),
      import('../components/Contact'),
      import('../components/Footer'),
    ];
    prefetch.forEach((load) => load.catch(() => {}));
  }, []);

  return (
    <SmoothScroll>
      <Navbar />
      {!apiOnline && <OfflineBanner />}
      <main>
        <div className="hero-region" data-name="hero-region">
          <HeroHeadingSection about={about} />
        </div>

        <Suspense fallback={<SectionShell minHeight="min-h-[280px]" />}>
          <HeroVideoSection />
        </Suspense>

        <Suspense fallback={<SectionShell />}>
          <BrandsStrip />
        </Suspense>

        <Suspense fallback={<SectionShell minHeight="min-h-[320px]" />}>
          <WhyMe about={about} />
        </Suspense>

        <Suspense fallback={<SectionShell minHeight="min-h-[420px]" />}>
          <Services services={services} />
        </Suspense>

        <Suspense fallback={<SectionShell minHeight="min-h-[480px]" />}>
          <Work projects={projects} />
        </Suspense>

        <Suspense fallback={<SectionShell minHeight="min-h-[360px]" />}>
          <Experience experience={experience} />
        </Suspense>

        <Suspense fallback={<SectionShell minHeight="min-h-[520px]" />}>
          <About about={about} />
        </Suspense>

        <Suspense fallback={<SectionShell minHeight="min-h-[400px]" />}>
          <FAQ about={about} />
        </Suspense>

        <Suspense fallback={<SectionShell minHeight="min-h-[480px]" />}>
          <Testimonials testimonials={testimonials} />
        </Suspense>

        <Suspense fallback={<SectionShell minHeight="min-h-[520px]" />}>
          <Contact about={about} />
        </Suspense>
      </main>

      <Suspense fallback={<SectionShell minHeight="min-h-[280px]" />}>
        <Footer about={about} />
      </Suspense>
    </SmoothScroll>
  );
}
