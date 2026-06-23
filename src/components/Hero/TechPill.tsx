'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface TechPillProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  delay?: number;
  variant?: 'light' | 'dark' | 'accent';
}

export default function TechPill({ icon, label, className, delay = 0, variant = 'light' }: TechPillProps) {
  const variantStyles = {
    light: 'bg-[#F5F0E8] dark:bg-[#1a1d27] border-black/10 dark:border-white/10 text-gray-900 dark:text-white shadow-[4px_4px_0px_rgba(0,0,0,0.8)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.1)]',
    dark: 'bg-black text-white border-black shadow-[4px_4px_0px_rgba(43,92,230,0.8)]',
    accent: 'bg-[#CCFF00] text-black border-black shadow-[4px_4px_0px_rgba(0,0,0,0.8)]',
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        x: -2,
        boxShadow: '6px 6px 0px rgba(0,0,0,0.9)',
      }}
      className={clsx(
        'absolute z-20 flex items-center gap-2 px-3 py-2 rounded-none border-2 cursor-pointer pointer-events-auto font-black uppercase tracking-tight text-xs',
        variantStyles[variant],
        className
      )}
      initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: [0, -6, 0],
      }}
      transition={{
        delay,
        y: {
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        opacity: { duration: 0.4 },
        scale: { type: 'spring', damping: 12 },
      }}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
}
