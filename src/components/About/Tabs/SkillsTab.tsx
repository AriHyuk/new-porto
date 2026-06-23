"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";
import SkillIcon, { getSkillColor } from "@/components/UI/SkillIcon";
import { containerVariants } from "@/utils/animation";
import { Skill } from "@/constants/about";
import { useState, useMemo } from "react";

interface SkillsTabProps {
  skills: Skill[];
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group relative bg-white dark:bg-[#1a1c23] border-2 border-black dark:border-white transition-all duration-150 cursor-pointer overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)]"
    >
      <div className="relative z-20 p-4 flex flex-col items-center gap-3 text-center">
        {/* Icon container */}
        <div className="relative group/icon">
          <div
            className="relative w-12 h-12 flex items-center justify-center bg-white dark:bg-black border-2 border-black dark:border-white transition-transform duration-150 group-hover:scale-110 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]"
            style={{ color: skill.color }}
          >
            <SkillIcon iconKey={skill.icon_key} className="text-2xl" />
          </div>
        </div>

        <div className="space-y-1.5 px-1 mt-2">
          {/* Name */}
          <h3 className="text-xs font-black text-black dark:text-white leading-tight tracking-tight uppercase">
            {skill.name}
          </h3>

          {/* Category badge */}
          <span
            className="inline-block px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border-2 border-black dark:border-white bg-[#CCFF00] text-black"
          >
            {skill.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsTab({ skills }: SkillsTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(skills.map((s) => s.category));
    return ["All", ...Array.from(cats)].sort();
  }, [skills]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: skills.length };
    skills.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  if (!skills || skills.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 font-black uppercase tracking-widest">
        No skills data found.
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 text-[10px] md:text-xs font-black transition-all duration-150 uppercase tracking-widest border-2 border-black dark:border-white ${
              activeCategory === cat
                ? "bg-[#2B5CE6] text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.8)] -translate-y-0.5 -translate-x-0.5"
                : "bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]"
            }`}
          >
            {cat}
            <span
              className={`ml-2 px-1 border border-current text-[9px]`}
            >
              {categoryCounts[cat] ?? 0}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Unified skill grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredSkills.map((skill) => {
            const brandColor = getSkillColor(skill.icon_key);
            const enrichedSkill = { ...skill, color: brandColor };
            return (
              <SkillCard key={skill.name} skill={enrichedSkill as any} />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
