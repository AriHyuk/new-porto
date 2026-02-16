'use client';

import { motion } from 'framer-motion';
import SkillIcon from '@/components/SkillIcon';
import { containerVariants, itemVariants } from '@/utils/animation';
import { Skill } from '@/types/skill';

interface SkillsTabProps {
  skills: Skill[];
}

export default function SkillsTab({ skills }: SkillsTabProps) {
  if (!skills || skills.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No skills data found.
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-visibility-auto contain-strict"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {skills.map((skill, index) => {
        // Default color if we don't have a mapping yet (can be enhanced in SkillIcon or here)
        const displayColor = '#3B82F6'; // Default blue-500

        return (
          <motion.div
            key={index}
            className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg overflow-hidden flex flex-col justify-between min-h-[160px]
            before:absolute before:inset-0 before:opacity-[0.03] before:dark:opacity-[0.05] before:group-hover:opacity-10 before:transition-opacity before:duration-500
            after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/50 after:to-transparent after:dark:from-white/5 after:dark:to-transparent after:pointer-events-none"
            variants={itemVariants}
            whileHover={{ y: -5 }}
            style={{ 
              // @ts-ignore
              '--skill-color': displayColor 
            }}
          >
            {/* Background Accent via pseudo-element referencing CSS var */}
            <style jsx>{`
              .group::before {
                background-color: var(--skill-color);
              }
            `}</style>
            
            <div className="relative z-10 text-center">
              <div 
                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm"
                style={{ 
                  backgroundColor: `${displayColor}15`,
                  color: displayColor 
                }}
              >
                <SkillIcon iconKey={skill.icon_key} className="text-2xl" />
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white leading-tight mb-1">
                  {skill.name}
                </h3>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] font-bold">
                  {skill.category}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
