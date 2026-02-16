'use client';

import { motion, AnimatePresence } from 'framer-motion';
import SkillIcon from '@/components/SkillIcon';
import { containerVariants, itemVariants } from '@/utils/animation';
import { Skill } from '@/types/skill';
import { useState, useMemo } from 'react';

interface SkillsTabProps {
  skills: Skill[];
}

export default function SkillsTab({ skills }: SkillsTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(skills.map(s => s.category));
    return ['All', ...Array.from(cats)].sort();
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return activeCategory === 'All' 
      ? skills 
      : skills.filter(s => s.category === activeCategory);
  }, [skills, activeCategory]);

  if (!skills || skills.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No skills data found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-black transition-all duration-300 uppercase tracking-widest border ${
              activeCategory === cat
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/40 scale-105'
                : 'bg-white/50 dark:bg-gray-800/50 text-gray-500 border-gray-100 dark:border-gray-700 hover:border-blue-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => {
            // Internal color mapping for premium look
            const colorMap: Record<string, string> = {
              react: '#61DAFB',
              nextjs: '#888888',
              typescript: '#3178C6',
              javascript: '#F7DF1E',
              tailwindcss: '#06B6D4',
              node: '#339933',
              mongodb: '#47A248',
              express: '#888888',
              supabase: '#3ECF8E',
              postgresql: '#4169E1',
              docker: '#2496ED',
              go: '#00ADD8',
              kotlin: '#7F52FF',
              laravel: '#FF2D20',
              python: '#3776AB',
              figma: '#F24E1E',
              firebase: '#FFCA28',
              mysql: '#4479A1',
              github: '#181717',
              git: '#F05032',
              vercel: '#888888'
            };
            
            const brandColor = colorMap[skill.icon_key.toLowerCase()] || '#3B82F6';

            return (
              <motion.div
                layout
                key={skill.id || skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative p-6 bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col justify-between min-h-[160px]
                before:absolute before:inset-0 before:opacity-[0.03] before:dark:opacity-[0.05] before:group-hover:opacity-10 before:transition-opacity before:duration-500
                after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/5 after:to-transparent after:dark:from-white/5 after:dark:to-transparent after:pointer-events-none"
              >
                <div className="relative z-10 text-center flex flex-col items-center h-full">
                  <div 
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm bg-white dark:bg-gray-900 border border-gray-50 dark:border-gray-700 overflow-hidden relative"
                    style={{ color: brandColor }}
                  >
                    <SkillIcon iconKey={skill.icon_key} className="text-3xl" />
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
                      {skill.name}
                    </h3>
                    <span 
                      className="px-3 py-1 text-[9px] rounded-full font-black uppercase tracking-widest bg-opacity-10"
                      style={{ backgroundColor: `${brandColor}20`, color: brandColor }}
                    >
                      {skill.category}
                    </span>
                  </div>
                </div>

                {/* Hover Glow using brand color */}
                <div 
                  className="absolute -bottom-10 -right-10 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: `${brandColor}40` }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
