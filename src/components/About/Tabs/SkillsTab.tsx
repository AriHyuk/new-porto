'use client';

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SkillIcon, { getSkillColor } from '@/components/SkillIcon';
import { containerVariants, itemVariants } from '@/utils/animation';
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
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

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
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="group relative p-6 bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl overflow-hidden flex flex-col justify-between min-h-[160px] cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 text-center flex flex-col items-center h-full"
      >
        <div 
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110 shadow-sm bg-white dark:bg-gray-900 border border-gray-50 dark:border-gray-700 overflow-hidden relative"
          style={{ color: skill.color }}
        >
          <SkillIcon iconKey={skill.icon_key} className="text-3xl" />
          <motion.div 
            className="absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity"
          />
        </div>

        <div className="mt-auto">
          <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight mb-2 tracking-tight">
            {skill.name}
          </h3>
          <span 
            className="px-3 py-1 text-[9px] rounded-full font-black uppercase tracking-widest bg-opacity-10"
            style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
          >
            {skill.category}
          </span>
        </div>
      </div>

      {/* Hover Glow */}
      <div 
        className="absolute -bottom-10 -right-10 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: `${skill.color}40` }}
      />
    </motion.div>
  );
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
            className={`px-5 py-2 rounded-full text-[10px] font-black transition-all duration-300 uppercase tracking-widest border ${
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
          {filteredSkills.map((skill) => {
            const brandColor = getSkillColor(skill.icon_key);
            // Enrich skill with color for the card
            const enrichedSkill = { ...skill, color: brandColor };
            return <SkillCard key={skill.name} skill={enrichedSkill as any} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
