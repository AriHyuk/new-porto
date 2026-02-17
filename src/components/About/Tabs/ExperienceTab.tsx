'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animation';
import { useRef } from 'react';

interface Experience {
  role?: string;
  position?: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceTabProps {
  experiences: Experience[];
}

export default function ExperienceTab({ experiences }: ExperienceTabProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathValue = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heightTransform = useTransform(pathValue, [0, 1], ["0%", "100%"]);

  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No experience data found.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        className="space-y-8 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Static Background Line */}
        <div className="absolute inset-y-0 left-5 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gray-200 dark:bg-gray-800" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute top-0 left-5 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 z-0 origin-top shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          style={{ height: heightTransform }}
        />

        {experiences.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            variants={itemVariants}
          >
            {/* Dot with Glow */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:border-blue-500">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:bg-blue-600 transition-colors" />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content Card with Glass Effect */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/70 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl hover:border-blue-500/30 group/card relative overflow-hidden">
              {/* Inner Gradient Flash */}
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 group-hover/card:left-full transition-all duration-1000 ease-in-out" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="font-black text-xl text-gray-900 dark:text-gray-100 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors tracking-tight">
                  {item.position || item.role}
                </h3>
                <time className="text-[10px] font-black px-3 py-1 bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 uppercase tracking-widest">
                  {item.period}
                </time>
              </div>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-blue-500" />
                {item.company}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
