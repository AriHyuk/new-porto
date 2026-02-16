'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  onClick?: () => void;
}

export default function BrandLogo({ className, onClick }: BrandLogoProps) {
  const brandText = "AriHyuk";
  
  const springTransition = {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10,
  };

  return (
    <Link 
      href="/"
      className={`text-2xl font-black cursor-pointer relative group flex items-center gap-1.5 ${className}`}
      onClick={(e) => {
        if (onClick) {
          onClick();
        } else {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    >
      <div className="flex items-baseline py-1">
        {brandText.split("").map((char, index) => (
          <motion.span 
            key={index}
            className="inline-block transition-colors duration-300 text-blue-600 dark:text-blue-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            whileHover={{ y: -8, transition: springTransition }}
            whileTap={{ y: -8, transition: springTransition }}
          >
            {char}
          </motion.span>
        ))}
        
        {/* Logo Icon */}
        <motion.span 
          className="ml-1 text-blue-600 dark:text-blue-500 font-mono text-base font-bold transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          whileHover={{ 
            y: -8,
            rotate: [0, -10, 10, 0],
            transition: { 
              ...springTransition,
              rotate: { duration: 0.4, ease: "easeInOut" }
            } 
          }}
          whileTap={{ 
            y: -8,
            rotate: [0, -10, 10, 0],
            transition: { 
              ...springTransition,
              rotate: { duration: 0.4, ease: "easeInOut" }
            } 
          }}
        >
          &lt;/&gt;
        </motion.span>
      </div>
      
      {/* Subtle Shimmer Line Underneath */}
      <motion.div 
        className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
        initial={{ width: 0 }}
        whileHover={{ width: '100%', transition: { duration: 0.3 } }}
      />
    </Link>
  );
}
