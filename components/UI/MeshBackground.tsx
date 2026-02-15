'use client';

import { motion } from 'framer-motion';

export default function MeshBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] will-change-transform"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] will-change-transform"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 70, -30, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] bg-purple-500/8 dark:bg-purple-600/5 rounded-full blur-[120px] will-change-transform"
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}
