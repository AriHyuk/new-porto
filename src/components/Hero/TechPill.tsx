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
      whileHover={{ 
        scale: 1.1, 
        y: -15,
        boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1)"
      }}
      className={clsx(
        "absolute z-20 flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full border border-gray-100 dark:border-gray-700 shadow-xl cursor-pointer pointer-events-auto",
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
        scale: { type: 'spring', damping: 12 },
        boxShadow: { duration: 0.2 }
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
