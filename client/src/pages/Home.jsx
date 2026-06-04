import SmoothScroll from '../components/SmoothScroll';
import Navbar from '../components/Navbar';
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
  const { projects, services, testimonials, about, experience, loading, apiOnline } =
    usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--color-accent)', borderTopColor: 'transparent' }}
          aria-label="Loading portfolio"
        />
      </div>
    );
  }

  return (
    <SmoothScroll>
      <Navbar />
      {!apiOnline && (
        <div
          className="fixed top-24 left-1/2 z-40 -translate-x-1/2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs text-amber-900 shadow-sm"
          role="status"
        >
          Showing offline content — connect the API and MongoDB for live data.
        </div>
      )}
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
