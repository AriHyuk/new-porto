'use client';

import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import { FaRocket } from 'react-icons/fa';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
  isHome: boolean;
  onClick?: () => void;
  onSetActive: (to: string) => void;
}

export default function NavLink({ to, label, isActive, isHome, onClick, onSetActive }: NavLinkProps) {
  if (!isHome) {
    return (
      <div className="relative group">
        <Link
          href={`/#${to}`}
          className={clsx(
            'px-4 md:px-0 py-2 md:py-0 font-semibold transition-all duration-300 flex items-center justify-between md:justify-start',
            isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
          )}
          onClick={onClick}
        >
          <span>{label}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative group">
      <ScrollLink
        to={to}
        href={`#${to}`}
        spy={true}
        smooth={true}
        duration={500}
        offset={-70}
        className={clsx(
          'cursor-pointer px-4 md:px-0 py-2 md:py-0 font-semibold transition-all duration-300 flex items-center justify-between md:justify-start',
          isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
        )}
        onClick={onClick}
        onSetActive={() => onSetActive(to)}
      >
        <span className="transition-all duration-300">{label}</span>
        
        {/* Mobile Rocket - Only visible when active on mobile */}
        {isActive && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="md:hidden ml-2"
          >
            <FaRocket className="text-blue-500 text-sm" />
          </motion.div>
        )}

        {/* Desktop Rocket & Underline */}
        <div className="hidden md:block">
          {isActive && (
            <>
              <motion.div 
                layoutId="rocket"
                className="absolute -right-5 top-1/2 -translate-y-1/2 z-10"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaRocket className="text-blue-500 text-xs" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                layoutId="underline"
                className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[1px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                layoutId="underline-glow"
                className="absolute -bottom-1 left-0 w-full h-[1px] bg-blue-400 z-20"
              />
            </>
          )}
        </div>
      </ScrollLink>
    </div>
  );
}
