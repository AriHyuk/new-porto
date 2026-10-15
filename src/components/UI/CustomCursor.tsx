'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    let rafId: number;
    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      rafId = requestAnimationFrame(() => {
        cursorX.set(x);
        cursorY.set(y);
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isSelectable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isSelectable);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Primary Reticle Center */}
      <motion.div
        className="w-2.5 h-2.5 bg-[#FF4D00] border border-black dark:border-white fixed top-0 left-0"
        animate={{
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
      />
      
      {/* Outer Brutalist Frame */}
      <motion.div
        className="fixed top-0 left-0 border-2 border-black dark:border-white"
        animate={{
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          rotate: isHovering ? 45 : 0,
          backgroundColor: isHovering ? 'rgba(204, 255, 0, 0.35)' : 'rgba(0, 0, 0, 0)',
          boxShadow: isHovering
            ? '3px 3px 0px rgba(0, 0, 0, 1)'
            : '0px 0px 0px rgba(0, 0, 0, 0)',
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0
        }}
      />
    </div>
  );
}
