'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackgroundShapes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {/* Floating geometric accents - Right panel (Desktop only) */}
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

      {/* Subtle noise texture over entire background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
