'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1.5 bg-[#CCFF00] border-b-2 border-black dark:border-white shadow-[0_2px_0px_rgba(0,0,0,1)] dark:shadow-[0_2px_0px_rgba(255,255,255,0.4)] z-[100] origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}
