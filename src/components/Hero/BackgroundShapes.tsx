'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackgroundShapes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Left Panel - Cream/Off-white (Top on mobile, Left on desktop) */}
      <div className="absolute top-0 left-0 w-full h-[52%] md:h-full md:w-[52%] bg-[#F5F0E8] dark:bg-[#0F1117]" />

      {/* Right Panel - Vivid Blue with polka dots (Bottom on mobile, Right on desktop) */}
      <div
        className="absolute bottom-0 right-0 w-full h-[48%] md:h-full md:w-[48%] bg-[#2B5CE6] dark:bg-[#1a3ab0]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 2px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Diagonal split accent line (Desktop) */}
      <div className="absolute top-0 bottom-0 left-[52%] w-[3px] bg-black/10 dark:bg-white/10 hidden md:block" />

      {/* Horizontal split accent line (Mobile) */}
      <div className="absolute left-0 right-0 top-[52%] h-[3px] bg-black/10 dark:bg-white/10 md:hidden" />

      {/* Floating geometric accents - Right panel */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-[15%] right-[18%] w-16 h-16 border-4 border-[#CCFF00] rounded-lg rotate-12 hidden md:block"
            animate={{ rotate: [12, 20, 12], y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[20%] right-[30%] w-10 h-10 bg-[#FF4D00] rounded-full hidden md:block"
            animate={{ scale: [1, 1.15, 1], y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
          <motion.div
            className="absolute top-[55%] right-[10%] w-8 h-8 border-4 border-white/40 rotate-45 hidden md:block"
            animate={{ rotate: [45, 90, 45], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          />
        </>
      )}

      {/* Top-left subtle noise texture */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[52%] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
