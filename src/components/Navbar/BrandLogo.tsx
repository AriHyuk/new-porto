'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  onClick?: () => void;
}

export default function BrandLogo({ className, onClick }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-0 cursor-pointer group ${className}`}
      onClick={(e) => {
        if (onClick) {
          onClick();
        } else {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    >
      {/* "ARI" block */}
      <motion.span
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
        className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white px-2 py-1 border-2 border-black dark:border-white bg-transparent group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-150"
      >
        ARI
      </motion.span>

      {/* "HYUK" block — filled accent */}
      <motion.span
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.04 }}
        className="text-xl font-black uppercase tracking-tight bg-[#2B5CE6] text-white px-2 py-1 border-2 border-black dark:border-[#2B5CE6] group-hover:bg-[#1a3ab0] transition-colors duration-150"
      >
        HYUK
      </motion.span>

      {/* Code tag accent */}
      <motion.span
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.08 }}
        className="text-[11px] font-black font-mono text-[#2B5CE6] dark:text-[#5b82ff] ml-1.5 hidden sm:block"
      >
        &lt;/&gt;
      </motion.span>
    </Link>
  );
}
