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
    <div className="space-y-12 pb-24">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full text-[10px] font-black transition-all duration-500 uppercase tracking-widest border-2 ${
              activeFilter === filter
                ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20 scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-400 border-gray-100 dark:border-gray-700 hover:border-blue-500/30 dark:hover:border-blue-500/30'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="relative px-2 max-w-5xl mx-auto">
        {/* Central Line - Fixed Z-Index and Alignment */}
        <div className="absolute inset-y-0 left-5 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-gray-100 dark:bg-gray-800/50 z-0" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute top-0 left-5 md:left-1/2 md:-translate-x-1/2 w-0.5 z-10 origin-top shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-colors duration-700"
          style={{ 
            height: heightTransform,
            backgroundColor: hoveredColor || '#3B82F6' 
          }}
        />

        <motion.div
          className="space-y-16 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperiences.map((item, index) => {
              const displayRole = item.role || (item as any).position || "Software Engineer";
              const displayColor = item.brandColor || "#3B82F6";
              
              return (
                <motion.div
                  key={`${item.company}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative flex items-center justify-start md:justify-normal w-full"
                  onMouseEnter={() => setHoveredColor(displayColor)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  {/* Timeline Dot - Absolute Centered */}
                  <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-30">
                    <div 
                      className="w-8 h-8 rounded-full border-4 border-white dark:border-gray-950 bg-white dark:bg-gray-900 shadow-xl flex items-center justify-center transition-all duration-500 group-hover:scale-125"
                      style={{ borderColor: hoveredColor === displayColor ? displayColor : undefined }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: displayColor }}
                      />
                    </div>
                  </div>

                  {/* Content Card - Offset to avoid covering center */}
                  <div className={`
                    w-full ml-12 md:ml-0 
                    md:w-[calc(50%-2rem)] 
                    ${index % 2 === 0 ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'}
                    group/card
                  `}>
                    <div className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all duration-500 hover:shadow-2xl relative overflow-visible"
                         style={{ borderLeftColor: displayColor, borderLeftWidth: '2px' }}>
                      
                      <div className="flex flex-col gap-4 mb-6">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-black text-2xl md:text-3xl text-gray-900 dark:text-gray-100 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors tracking-tight leading-tight max-w-[70%]">
                            {displayRole}
                          </h3>
                          <div className="shrink-0 pt-1">
                            <time 
                              className="text-[9px] font-black px-4 py-1.5 text-white rounded-full shadow-lg uppercase tracking-widest whitespace-nowrap block"
                              style={{ backgroundColor: displayColor, boxShadow: `0 8px 20px ${displayColor}30` }}
                            >
                              {item.period || "2020 - Present"}
                            </time>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap text-sm font-bold" style={{ color: displayColor }}>
                          <span className="w-6 h-[2.5px]" style={{ backgroundColor: displayColor }} />
                          <span className="font-black uppercase tracking-wider">{item.company}</span>
                          {item.type && (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                              <span className="opacity-60 font-black uppercase tracking-tighter text-[10px]">{item.type}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
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
