'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { clsx } from 'clsx';
import { navVariants, letterVariants } from '@/utils/animation';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Advanced Scroll Animations
  const { scrollY } = useScroll();
  
  // Dynamic background based on theme
  const isDark = mounted && resolvedTheme === 'dark';
  const bgColorStart = isDark ? 'rgba(17, 24, 39, 0)' : 'rgba(255, 255, 255, 0)';
  const bgColorEnd = isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  // Transform values based on scroll position
  const navWidth = useTransform(scrollY, [0, 100], ['100%', '85%']);
  const navTop = useTransform(scrollY, [0, 100], ['0px', '20px']);
  const navBorderRadius = useTransform(scrollY, [0, 100], ['0px', '24px']);
  const navBackground = useTransform(
    scrollY, 
    [0, 100], 
    [bgColorStart, bgColorEnd]
  );
  const navBackdropBlur = useTransform(scrollY, [0, 100], ['0px', '12px']);
  const navBorder = useTransform(
    scrollY, 
    [0, 100], 
    ['1px solid rgba(0,0,0,0)', `1px solid ${borderColor}`]
  );
  const navShadow = useTransform(
    scrollY,
    [0, 100],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 10px 30px -10px rgba(0,0,0,0.1)']
  );

  // Dark mode specifics (handled via CSS variables or conditional logic if needed, 
  // but framer motion handles rgba interpolation efficiently)

  const navLinks = ['hero', 'about', 'portfolio', 'certifity'];
  const nameText = "Ari Hyuk";
  const nameChars = nameText.split("");

  const handleLinkClick = (section: string) => {
    setActiveLink(section);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.nav
          style={{
            width: navWidth,
            top: navTop,
            borderRadius: navBorderRadius,
            backgroundColor: navBackground,
            backdropFilter: navBackdropBlur, // Note: backdrop-filter needs explicit style
            border: navBorder,
            boxShadow: navShadow,
          }}
          className="pointer-events-auto px-4 md:px-8 py-3 md:py-4 transition-colors max-w-7xl mx-auto dark:bg-gray-900/80"
        >
          <div className="flex justify-between items-center">
            {/* Animated Brand Name */}
            <motion.div 
              className="text-2xl font-bold dark:text-white cursor-pointer"
              variants={navVariants}
              initial="hidden"
              animate="visible"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="flex group">
                {nameChars.map((char, index) => (
                  <motion.span 
                    key={`name-${index}`} 
                    variants={letterVariants}
                    className="inline-block transition-transform duration-10 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                    whileHover={{ y: -5, transition: { duration: 0.2 }}}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 mr-4">
                {navLinks.map((section) => (
                  <NavLink
                    key={section}
                    to={section}
                    label={section}
                    isActive={activeLink === section}
                    onSetActive={setActiveLink}
                  />
                ))}
              </div>

              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2" />

              <ThemeToggle />

              <button
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-md hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105"
              >
                Hire me
              </button>
            </div>

            {/* Mobile Toggle & Icons */}
            <div className="flex md:hidden items-center gap-4">
              <ThemeToggle />
              
              <button 
                className="p-2 text-2xl text-gray-800 dark:text-gray-100 focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Content */}
      <MobileMenu 
        isOpen={menuOpen}
        navLinks={navLinks}
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
        onSetActive={setActiveLink}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
