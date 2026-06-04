import SmoothScroll from '../components/SmoothScroll';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HeroHeadingSection from '../components/HeroHeadingSection';
import HeroVideoSection from '../components/HeroVideoSection';
import BrandsStrip from '../components/BrandsStrip';
import Services from '../components/Services';
import WhyMe from '../components/WhyMe';
import Work from '../components/Work';
import Experience from '../components/Experience';
import About from '../components/About';
import FAQ from '../components/FAQ';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function Home() {
  const { projects, services, testimonials, about, experience, loading, error } =
    usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 section-pad text-center">
        <p className="text-lg text-black/80">Could not load portfolio data.</p>
        <p style={{ color: 'var(--color-muted)' }}>{error}</p>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Ensure the API server is running on port 5001 (not 5000 — macOS uses that for
          AirPlay) and MongoDB is connected. Restart the server after updating{' '}
          <code className="text-accent">server/.env</code>.
        </p>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <div className="hero-region" data-name="hero-region">
          <HeroHeadingSection about={about} />
        </div>
        <HeroVideoSection />
        <BrandsStrip />
        <WhyMe about={about} />
        <Services services={services} />
        <Work projects={projects} />
        <Experience experience={experience} />
        <About about={about} />
        <FAQ about={about} />
        <Testimonials testimonials={testimonials} />
        <Contact about={about} />
      </main>
      <Footer about={about} />
    </SmoothScroll>
  );
}
