'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { clsx } from 'clsx';
import { navVariants, letterVariants } from '@/utils/animation';
import ThemeToggle from './ThemeToggle';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['hero', 'about', 'portfolio', 'certifity'];
  const nameText = "Ari Hyuk";
  const nameChars = nameText.split("");

  const handleLinkClick = (section: string) => {
    setActiveLink(section);
    setMenuOpen(false);
  };

  return (
    <nav className={clsx(
      "fixed w-full transition-all duration-300 z-50 px-4 md:px-10 py-4",
      scrolled 
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
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

      {/* Mobile Menu Content */}
      <MobileMenu 
        isOpen={menuOpen}
        navLinks={navLinks}
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
        onSetActive={setActiveLink}
        onClose={() => setMenuOpen(false)}
      />
    </nav>
  );
}
