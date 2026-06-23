'use client';

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { containerVariants } from '@/utils/animation';
import { useRef, useState, useMemo } from 'react';
import { Experience } from '@/constants/about';

interface ExperienceTabProps {
  experiences: Experience[];
}

export default function ExperienceTab({ experiences }: ExperienceTabProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

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

  const filters = useMemo(() => {
    if (!experiences) return ['All'];
    const types = new Set(experiences.filter(e => e.type).map(e => e.type));
    return ['All', ...Array.from(types)].sort();
  }, [experiences]);

  const filteredExperiences = useMemo(() => {
    if (!experiences) return [];
    return activeFilter === 'All' 
      ? experiences 
      : experiences.filter(e => e.type === activeFilter);
  }, [experiences, activeFilter]);

  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        No experience data found.
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 text-[10px] md:text-xs font-black transition-all duration-150 uppercase tracking-widest border-2 border-black dark:border-white ${
              activeFilter === filter
                ? "bg-[#2B5CE6] text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.8)] -translate-y-0.5 -translate-x-0.5"
                : "bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]"
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Static Background Line */}
        <div className="absolute inset-y-0 left-[1.625rem] sm:left-[1.625rem] md:left-1/2 md:-translate-x-px w-1 bg-black dark:bg-white z-0" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute top-0 left-[1.625rem] sm:left-[1.625rem] md:left-1/2 md:-translate-x-px w-1 z-10 origin-top"
          style={{ 
            height: heightTransform,
            backgroundColor: hoveredColor || '#2B5CE6',
          }}
        />

        <motion.div
          className="space-y-10 md:space-y-14 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((item, index) => {
              const displayRole = item.role || (item as any).position || "Software Engineer";
              const displayColor = item.brandColor || "#2B5CE6";
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={`${item.company}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="relative flex w-full"
                  onMouseEnter={() => setHoveredColor(displayColor)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  {/* Timeline Dot — aligned to top of card */}
                  <div className="absolute left-0 top-6 md:left-1/2 md:-translate-x-1/2 z-30 flex items-center justify-center">
                    <motion.div 
                      className="w-8 h-8 border-4 bg-white dark:bg-black flex items-center justify-center transition-colors duration-150 relative border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]"
                      style={{ 
                        borderColor: hoveredColor === displayColor ? displayColor : '',
                      }}
                    >
                      <motion.div 
                        className="w-3 h-3 z-10 transition-all duration-150 bg-black dark:bg-white"
                        style={{ backgroundColor: hoveredColor === displayColor ? displayColor : '' }}
                        animate={hoveredColor === displayColor ? { scale: 1.2 } : { scale: 1 }}
                      />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  {/* Mobile: offset kanan dari dot. Desktop: alternating left/right */}
                  <div className={`
                    w-full pl-12 sm:pl-14 
                    md:pl-0 md:w-[calc(50%-2.5rem)]
                    ${isEven 
                      ? 'md:mr-auto md:pr-0' 
                      : 'md:ml-auto md:pl-0'
                    }
                  `}>
                    <motion.div 
                      className="bg-white dark:bg-[#1a1c23] border-2 border-black dark:border-white transition-all duration-150 overflow-hidden group/card shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)] relative"
                    >
                      {/* Suble localized glow on hover */}
                      <div className="absolute left-0 top-0 bottom-0 w-2 z-10" style={{ backgroundColor: displayColor }} />
                      <div className="p-5 sm:p-6 pl-7 sm:pl-8">
                        {/* Header: Role + Period */}
                        <div className="flex flex-col gap-2 mb-4">
                          <h3 className="font-black text-lg sm:text-xl md:text-2xl text-black dark:text-white leading-snug tracking-tight uppercase">
                            {displayRole}
                          </h3>
                          <time 
                            className="self-start text-[9px] font-black px-3 py-1.5 text-black bg-[#CCFF00] border-2 border-black uppercase tracking-widest whitespace-nowrap shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                          >
                            {item.period || "2020 - Present"}
                          </time>
                        </div>

                        {/* Company + Type */}
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          <span className="w-5 h-1 shrink-0" style={{ backgroundColor: displayColor }} />
                          <span className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
                            {item.company}
                          </span>
                          {item.type && (
                            <>
                              <span className="w-1.5 h-1.5 bg-black dark:bg-white" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                                {item.type}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-bold">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
