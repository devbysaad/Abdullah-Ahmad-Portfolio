'use client';

import Navbar from '@/components/Navbar';
import HeroHeadingSection from '@/components/HeroHeadingSection';
import HeroVideoSection from '@/components/HeroVideoSection';
import BrandsStrip from '@/components/BrandsStrip';
import WhyMe from '@/components/WhyMe';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Experience from '@/components/Experience';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export default function HomePage({ portfolio }) {
  const { projects, services, testimonials, about, experience, site } = portfolio;

  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <div className="hero-region" data-name="hero-region">
          <HeroHeadingSection about={about} site={site} />
        </div>

        <HeroVideoSection about={about} />
        <BrandsStrip site={site} />
        <WhyMe about={about} site={site} />
        <Services services={services} />
        <Work projects={projects} />
        <Experience experience={experience} site={site} />
        <About about={about} />
        <FAQ about={about} site={site} />
        <Testimonials testimonials={testimonials} />
        <Contact about={about} />
      </main>

      <Footer about={about} />
    </SmoothScroll>
  );
}
