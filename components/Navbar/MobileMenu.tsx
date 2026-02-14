'use client';

import { motion, AnimatePresence } from 'framer-motion';
import NavLink from './NavLink';
import { clsx } from 'clsx';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: string[];
  activeLink: string;
  onLinkClick: (to: string) => void;
  onSetActive: (to: string) => void;
  onClose: () => void;
}

export default function MobileMenu({ 
  isOpen, 
  navLinks, 
  activeLink, 
  onLinkClick, 
  onSetActive,
  onClose 
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden flex flex-col p-8"
          >
            <div className="flex flex-col gap-6 mt-16">
              {navLinks.map((section) => (
                <NavLink
                  key={section}
                  to={section}
                  label={section}
                  isActive={activeLink === section}
                  onClick={() => onLinkClick(section)}
                  onSetActive={onSetActive}
                />
              ))}
              
              <button
                onClick={() => onLinkClick('hire-me')}
                className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-900 transition-all text-center"
              >
                Hire me
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
