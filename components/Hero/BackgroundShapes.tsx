'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { shapeVariants } from '@/utils/animation';
import { useEffect } from 'react';

export default function BackgroundShapes() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement
  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Interactive Spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-[120px] z-0"
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

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
