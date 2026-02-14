'use client';

import { motion } from 'framer-motion';
import { shapeVariants } from '@/utils/animation';

export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top Right Glow */}
      <motion.div 
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900/20 filter blur-3xl"
        variants={shapeVariants}
        custom={0}
        initial="hidden"
        animate="visible"
      />
      
      {/* Bottom Left Glow */}
      <motion.div 
        className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-purple-100 dark:bg-purple-900/20 filter blur-3xl"
        variants={shapeVariants}
        custom={1}
        initial="hidden"
        animate="visible"
      />
      
      {/* Center Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-yellow-50 dark:bg-yellow-900/10 filter blur-3xl opacity-50"
        variants={shapeVariants}
        custom={2}
        initial="hidden"
        animate="visible"
      />

      {/* Decorative dots or extra shapes could go here */}
    </div>
  );
}
