'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import NavLink from './NavLink';
import BrandLogo from './BrandLogo';
import { clsx } from 'clsx';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: { id: string; label: string }[];
  activeLink: string;
  isHome: boolean;
  onLinkClick: (to: string) => void;
  onSetActive: (to: string) => void;
  onClose: () => void;
}

export default function MobileMenu({ 
  isOpen, 
  navLinks, 
  activeLink, 
  isHome,
  onLinkClick, 
  onSetActive,
  onClose 
}: MobileMenuProps) {
  const pathname = usePathname();

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
            className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-gray-900 shadow-2xl z-50 md:hidden flex flex-col p-8 pt-10"
          >
            <div className="mb-4">
              <BrandLogo onClick={onClose} />
            </div>

            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.id}
                  label={link.label}
                  isActive={activeLink === link.id}
                  isHome={isHome}
                  onClick={() => onLinkClick(link.id)}
                  onSetActive={onSetActive}
                />
              ))}

              <Link
                href="/blog"
                onClick={onClose}
                className={clsx(
                  "text-base font-semibold transition-colors flex items-center gap-2",
                  pathname === '/blog' ? "text-blue-600" : "text-gray-600 dark:text-gray-400 hover:text-blue-600"
                )}
              >
                Blog
              </Link>
              
              <Link
                href={isHome ? "#contact" : "/#contact"}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    onLinkClick('contact');
                  } else {
                    onClose();
                  }
                }}
                className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-lg shadow-md hover:from-blue-700 hover:to-blue-900 transition-all text-center"
              >
                Hire me
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
