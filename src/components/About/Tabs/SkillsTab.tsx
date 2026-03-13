'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SkillIcon, { getSkillColor } from '@/components/UI/SkillIcon';
import { containerVariants } from '@/utils/animation';
import { Skill } from '@/constants/about';
import { useState, useMemo } from 'react';

interface SkillsTabProps {
  skills: Skill[];
}

function SkillCard({ skill }: { skill: Skill }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3 }}
      className="group relative bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-gray-700/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Bottom glow */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-10 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: `${skill.color}50` }}
      />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-20 p-4 flex flex-col items-center gap-3 text-center">
        {/* Icon container with glow */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-150"
            style={{ backgroundColor: skill.color }}
          />
          <div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 transition-all duration-300 shadow-sm"
            style={{ color: skill.color }}
          >
            <SkillIcon iconKey={skill.icon_key} className="text-2xl" />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-sm font-black text-gray-900 dark:text-white leading-tight tracking-tight">
          {skill.name}
        </h3>

        {/* Category badge */}
        <span
          className="px-2.5 py-0.5 text-[9px] rounded-full font-black uppercase tracking-widest"
          style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
        >
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function SkillsTab({ skills }: SkillsTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set(skills.map(s => s.category));
    return ['All', ...Array.from(cats)].sort();
  }, [skills]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skills.length };
    skills.forEach(s => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [skills]);

  const groupedSkills = useMemo(() => {
    if (activeCategory !== 'All') {
      return { [activeCategory]: skills.filter(s => s.category === activeCategory) };
    }
    const groups: Record<string, Skill[]> = {};
    skills.forEach(s => {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    });
    return groups;
  }, [skills, activeCategory]);

  if (!skills || skills.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No skills data found.
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Category Filter Chips with count */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileTap={{ scale: 0.93 }}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border ${
              activeCategory === cat
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30 scale-105'
                : 'bg-white/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-400/50 hover:text-blue-500'
            }`}
          >
            {cat}
            <span className={`ml-1.5 text-[8px] font-bold ${activeCategory === cat ? 'text-blue-200' : 'text-gray-400 dark:text-gray-600'}`}>
              {categoryCounts[cat] ?? 0}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Grouped skill sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-8"
        >
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              {/* Section divider — only in "All" mode */}
              {activeCategory === 'All' && (
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 shrink-0">
                    {category}
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-100 dark:bg-gray-800" />
                  <span className="text-[9px] font-bold text-gray-300 dark:text-gray-700 shrink-0">
                    {categorySkills.length}
                  </span>
                </div>
              )}

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {categorySkills.map((skill) => {
                  const brandColor = getSkillColor(skill.icon_key);
                  const enrichedSkill = { ...skill, color: brandColor };
                  return <SkillCard key={skill.name} skill={enrichedSkill as any} />;
                })}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
