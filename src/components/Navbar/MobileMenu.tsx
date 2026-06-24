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
  onClose,
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
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-[#F5F0E8] dark:bg-[#0F1117] z-50 md:hidden flex flex-col border-l-4 border-black dark:border-white shadow-[-8px_0px_0px_rgba(43,92,230,0.5)]"
          >
            {/* Top accent bar */}
            <div className="w-full h-[3px] bg-[#CCFF00]" />

            {/* Header */}
            <div className="px-6 py-5 border-b-2 border-black/10 dark:border-white/10">
              <BrandLogo onClick={onClose} />
            </div>

            {/* Links */}
            <div className="flex flex-col px-6 py-6 gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="border-b border-black/8 dark:border-white/8 py-3"
                >
                  <NavLink
                    to={link.id}
                    label={link.label}
                    isActive={activeLink === link.id}
                    isHome={isHome}
                    onClick={() => onLinkClick(link.id)}
                    onSetActive={onSetActive}
                  />
                </motion.div>
              ))}

              {/* <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
                className="border-b border-black/8 dark:border-white/8 py-3"
              >
                <Link
                  href="/blog"
                  onClick={onClose}
                  className={clsx(
                    'text-xs font-black uppercase tracking-widest transition-colors',
                    pathname === '/blog'
                      ? 'text-[#2B5CE6] dark:text-[#5b82ff]'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  Blog
                </Link>
              </motion.div> */}
            </div>

            {/* CTA Footer */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.35 }}
              className="px-6 pb-8"
            >
              <Link
                href={isHome ? '#contact' : '/#contact'}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    onLinkClick('contact');
                  } else {
                    onClose();
                  }
                }}
                className="block w-full py-4 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest text-center border-2 border-black dark:border-white shadow-[4px_4px_0px_#2B5CE6] hover:shadow-[6px_6px_0px_#2B5CE6] transition-shadow duration-150"
              >
                Hire Me ✦
              </Link>

              {/* Decorative label */}
              <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-600 mt-4">
                Open to Work ✓
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
