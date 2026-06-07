import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useScrollProgress } from '../hooks/useSmoothScroll';
import NavLogo from './NavLogo';

const links = [
  { href: '#why-me', label: 'About' },
  { href: '#work', label: 'Portfolio' },
  { href: '#experience', label: 'Experience' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

const menuEase = [0.44, 0, 0.56, 1];
const menuTransition = { duration: 0.42, ease: menuEase };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollProgress(40);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar-shell" data-name="navbar-shell">
      <motion.nav
        layout
        initial={{ opacity: 0.001 }}
        animate={{ opacity: 1 }}
        transition={{ layout: menuTransition, opacity: { duration: 0.6, ease: menuEase } }}
        className={[
          'glass-nav',
          open ? 'glass-nav--open' : '',
          scrolled && !open ? 'glass-nav--scrolled' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        data-name="navbar"
        data-open={open || undefined}
      >
        <div className="glass-nav-mobile-top md:hidden">
          <div className="glass-nav-icon-slot">
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.button
                  key="close"
                  type="button"
                  className="glass-nav-icon-btn"
                  aria-label="Close menu"
                  initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                  transition={{ duration: 0.28, ease: menuEase }}
                  onClick={closeMenu}
                >
                  <X size={20} strokeWidth={2} color="var(--color-gray-999)" />
                </motion.button>
              ) : (
                <motion.button
                  key="menu"
                  type="button"
                  className="glass-nav-toggle glass-nav-toggle--two"
                  aria-label="Open menu"
                  aria-expanded={false}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.28, ease: menuEase }}
                  onClick={() => setOpen(true)}
                >
                  <span />
                  <span />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <NavLogo />
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-body"
              className="glass-nav-mobile-body md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={menuTransition}
              style={{ overflow: 'hidden' }}
            >
              <nav className="glass-nav-mobile-links" aria-label="Mobile navigation">
                {links.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, delay: open ? 0.06 + i * 0.04 : 0, ease: menuEase }}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <motion.div
                className="glass-nav-mobile-cta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.35, delay: 0.22, ease: menuEase }}
              >
                <a href="#contact" className="glass-nav-cta" onClick={closeMenu}>
                  <span>Got an idea?</span>
                  <span className="glass-nav-cta-icon">
                    <ArrowRight size={12} strokeWidth={2.5} />
                  </span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass-nav-desktop hidden md:flex">
          <NavLogo />
          <ul className="glass-nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="glass-nav-cta">
            <span>Got an idea?</span>
            <span className="glass-nav-cta-icon">
              <ArrowRight size={12} strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </motion.nav>
    </header>
  );
}
