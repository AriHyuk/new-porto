'use client';

import { Link as ScrollLink } from 'react-scroll';
import { FaRocket } from 'react-icons/fa';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  onSetActive: (to: string) => void;
}

export default function NavLink({ to, label, isActive, onClick, onSetActive }: NavLinkProps) {
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
                className="absolute -right-5 top-1/2 -translate-y-1/2"
              >
                <FaRocket className="text-blue-500 animate-bounce text-xs" />
              </motion.div>
              
              <motion.div 
                layoutId="underline"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
              />
            </>
          )}
        </div>
      </ScrollLink>
    </div>
  );
}
