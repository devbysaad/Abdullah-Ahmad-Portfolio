import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollProgress } from '../hooks/useSmoothScroll';
import NavLogo from './NavLogo';

const links = [
  { href: '#why-me', label: 'About' },
  { href: '#work', label: 'Portfolio' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

/** Matches uiwithbugvi.com: fixed, top 24px, centered (framer-1n4yw3m-container) */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollProgress(40);

  return (
    <header
      className="fixed top-4 sm:top-6 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[1280px] -translate-x-1/2 pointer-events-none sm:w-[calc(100%-2.5rem)] md:w-[calc(100%-5rem)]"
      data-name="navbar-shell"
    >
      <motion.nav
        initial={{ opacity: 0.001 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
        className={`pointer-events-auto mx-auto flex h-14 sm:h-16 w-full max-w-full items-center justify-between gap-3 glass-nav px-3 sm:px-4 ${
          scrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : ''
        }`}
        style={{ minHeight: '56px' }}
      >
        <NavLogo />

        <ul className="hidden md:flex items-center gap-5 px-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14px] font-medium text-black/55 hover:text-black transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 rounded-[100px] bg-black py-2.5 pl-5 pr-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-black/90"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span>Got an idea?</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
            <ArrowRight size={12} strokeWidth={2.5} />
          </span>
        </a>

        <button
          type="button"
          className="md:hidden p-1.5"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-4 h-0.5 bg-black mb-1" />
          <span className="block w-4 h-0.5 bg-black mb-1" />
          <span className="block w-3 h-0.5 bg-black" />
        </button>
      </motion.nav>

      {open && (
        <motion.div
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-auto mx-auto mt-3 w-full glass-nav p-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary w-fit" onClick={() => setOpen(false)}>
              Let&apos;s Ship
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
