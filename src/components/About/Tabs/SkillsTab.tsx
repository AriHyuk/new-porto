"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import SkillIcon, { getSkillColor } from "@/components/UI/SkillIcon";
import { containerVariants } from "@/utils/animation";
import { Skill } from "@/constants/about";
import { useState, useMemo } from "react";

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
      whileHover={{ y: -5 }}
      className="group relative bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-100 dark:border-white/5 transition-all duration-500 cursor-pointer overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Glare/Shine Effect */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => `radial-gradient(circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(255,255,255,0.15), transparent 60%)`
          ),
        }}
      />

      {/* Dynamic Glow Background */}
      <div
        className="absolute -inset-2 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-2xl z-0"
        style={{ backgroundColor: skill.color }}
      />

      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative z-20 p-5 flex flex-col items-center gap-4 text-center"
      >
        {/* Icon container with enhanced glow */}
        <div className="relative group/icon">
          <motion.div
            className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-80 transition-all duration-500 scale-125"
            style={{ backgroundColor: skill.color }}
            animate={{
              scale: [1.25, 1.4, 1.25],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 transition-all duration-300 shadow-xl group-hover:scale-110 group-hover:rotate-3"
            style={{ color: skill.color }}
          >
            <SkillIcon iconKey={skill.icon_key} className="text-3xl" />
          </div>
        </div>

        <div className="space-y-1.5 px-1">
          {/* Name */}
          <h3 className="text-[13px] font-black text-gray-900 dark:text-white leading-tight tracking-tight">
            {skill.name}
          </h3>

          {/* Category badge */}
          <span
            className="inline-block px-2.5 py-0.5 text-[8px] rounded-full font-black uppercase tracking-widest border border-current opacity-70"
            style={{ backgroundColor: `${skill.color}10`, color: skill.color }}
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
      <div className="text-center py-20 text-gray-400">
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
                ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/30 scale-105"
                : "bg-white/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 hover:border-blue-400/50 hover:text-blue-500"
            }`}
          >
            {cat}
            <span
              className={`ml-1.5 text-[8px] font-bold ${activeCategory === cat ? "text-blue-200" : "text-gray-400 dark:text-gray-600"}`}
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
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
