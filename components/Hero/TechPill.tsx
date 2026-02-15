'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface TechPillProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  delay?: number;
}

export default function TechPill({ icon, label, className, delay = 0 }: TechPillProps) {
  return (
    <motion.div
      className={clsx(
        "absolute z-20 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full border border-gray-100 dark:border-gray-700 shadow-xl pointer-events-none",
        className
      )}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -10, 0],
      }}
      transition={{
        delay,
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.5 },
        scale: { type: 'spring', damping: 12 }
      }}
    >
      <span className="text-blue-600 dark:text-blue-400 text-lg">
        {icon}
      </span>
      <span className="text-xs font-black text-gray-800 dark:text-gray-200">
        {label}
      </span>
    </motion.div>
  );
}
