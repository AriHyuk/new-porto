'use client';

import { motion } from 'framer-motion';

export default function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll Down</span>
      <div className="w-[26px] h-[40px] rounded-full border-2 border-gray-300 dark:border-gray-700 p-1">
        <motion.div
          className="w-1 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mx-auto"
          animate={{
            y: [0, 15, 0],
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}
