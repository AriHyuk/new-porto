'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { clsx } from 'clsx';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import NavLink from './NavLink';
import dynamic from 'next/dynamic';
import BrandLogo from './BrandLogo';
import { usePathname } from 'next/navigation';

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
});

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Projects' },
    { id: 'certificates', label: 'Certs' },
  ];

  const handleLinkClick = (section: string) => {
    setActiveLink(section);
    setMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        {/* Top accent bar — neon yellow, like the ClipFun marquee bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full h-[3px] bg-[#CCFF00] origin-left"
        />

        {/* Main nav bar */}
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
          className={clsx(
            'w-full px-5 md:px-10 py-3 flex items-center justify-between transition-all duration-300',
            scrolled
              ? 'bg-[#F5F0E8]/95 dark:bg-[#0F1117]/95 backdrop-blur-md border-b-2 border-black/10 dark:border-white/10 shadow-[0_2px_0px_rgba(0,0,0,0.08)]'
              : 'bg-[#F5F0E8] dark:bg-[#0F1117]'
          )}
        >
          {/* Brand */}
          <BrandLogo />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.id}
                label={link.label}
                isActive={activeLink === link.id}
                isHome={isHome}
                onSetActive={setActiveLink}
              />
            ))}

            {/* Divider */}
            <span className="w-px h-4 bg-black/20 dark:bg-white/20" />

            <Link
              href="/blog"
              className={clsx(
                'text-xs font-black uppercase tracking-widest transition-colors duration-150',
                pathname === '/blog'
                  ? 'text-[#2B5CE6] dark:text-[#5b82ff]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              Blog
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            {/* CTA button — hard shadow brutalist */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              whileHover={{ y: -2, x: -1 }}
              className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest border-2 border-black dark:border-white shadow-[3px_3px_0px_#2B5CE6] hover:shadow-[5px_5px_0px_#2B5CE6] transition-shadow duration-150 cursor-pointer"
            >
              Let's Collaborate
            </motion.a>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              className="w-8 h-8 flex flex-col items-center justify-center gap-[5px] border-2 border-black dark:border-white bg-transparent hover:bg-black dark:hover:bg-white group transition-colors duration-150 shadow-[2px_2px_0px_rgba(43,92,230,0.8)]"
            >
              <span
                className={clsx(
                  'block w-4 h-[2px] bg-black dark:bg-white group-hover:bg-white dark:group-hover:bg-black transition-all duration-200',
                  menuOpen && 'rotate-45 translate-y-[7px]'
                )}
              />
              <span
                className={clsx(
                  'block w-4 h-[2px] bg-black dark:bg-white group-hover:bg-white dark:group-hover:bg-black transition-all duration-200',
                  menuOpen && 'opacity-0'
                )}
              />
              <span
                className={clsx(
                  'block w-4 h-[2px] bg-black dark:bg-white group-hover:bg-white dark:group-hover:bg-black transition-all duration-200',
                  menuOpen && '-rotate-45 -translate-y-[7px]'
                )}
              />
            </motion.button>
          </div>
        </motion.nav>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        navLinks={navLinks}
        activeLink={activeLink}
        isHome={isHome}
        onLinkClick={handleLinkClick}
        onSetActive={setActiveLink}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
