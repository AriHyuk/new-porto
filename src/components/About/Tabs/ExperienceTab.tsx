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
      <div className="flex flex-wrap justify-center gap-2.5">
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border-2 ${
              activeFilter === filter
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25 scale-105'
                : 'bg-white dark:bg-gray-800/60 text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:text-blue-500'
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>

      <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 sm:px-6">
        {/* Static Background Line */}
        <div className="absolute inset-y-0 left-[1.625rem] sm:left-[1.625rem] md:left-1/2 md:-translate-x-px w-[1.5px] bg-gray-100 dark:bg-gray-800/60 z-0" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute top-0 left-[1.625rem] sm:left-[1.625rem] md:left-1/2 md:-translate-x-px w-[1.5px] z-10 origin-top"
          style={{ 
            height: heightTransform,
            backgroundColor: hoveredColor || '#3B82F6',
            filter: `drop-shadow(0 0 6px ${hoveredColor || '#3B82F6'}50)`,
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
              const displayColor = item.brandColor || "#3B82F6";
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={`${item.company}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="relative flex w-full"
                  onMouseEnter={() => setHoveredColor(displayColor)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  {/* Timeline Dot — aligned to top of card */}
                  <div className="absolute left-0 top-6 md:left-1/2 md:-translate-x-1/2 z-30 flex items-center justify-center">
                    <motion.div 
                      className="w-7 h-7 rounded-full border-[3px] bg-white dark:bg-gray-950 shadow-lg flex items-center justify-center transition-colors duration-500"
                      style={{ 
                        borderColor: hoveredColor === displayColor ? displayColor : 'rgb(209 213 219)',
                      }}
                      animate={hoveredColor === displayColor ? { scale: 1.2 } : { scale: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full transition-all duration-500"
                        style={{ backgroundColor: displayColor }}
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
                      className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 transition-shadow duration-500"
                      style={{ borderLeftColor: displayColor, borderLeftWidth: '3px' }}
                      whileHover={{ 
                        boxShadow: `0 20px 40px ${displayColor}15, 0 4px 16px rgba(0,0,0,0.08)` 
                      }}
                    >
                      <div className="p-5 sm:p-6">
                        {/* Header: Role + Period */}
                        <div className="flex flex-col gap-2 mb-4">
                          <h3 className="font-black text-lg sm:text-xl md:text-2xl text-gray-900 dark:text-gray-100 leading-snug tracking-tight">
                            {displayRole}
                          </h3>
                          <time 
                            className="self-start text-[9px] font-black px-3 py-1.5 text-white rounded-full shadow-md uppercase tracking-widest whitespace-nowrap"
                            style={{ 
                              backgroundColor: displayColor, 
                              boxShadow: `0 4px 14px ${displayColor}35` 
                            }}
                          >
                            {item.period || "2020 - Present"}
                          </time>
                        </div>

                        {/* Company + Type */}
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          <span className="w-5 h-[2px] shrink-0" style={{ backgroundColor: displayColor }} />
                          <span className="text-sm font-black uppercase tracking-wider" style={{ color: displayColor }}>
                            {item.company}
                          </span>
                          {item.type && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                {item.type}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
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
