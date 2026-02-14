'use client';

import { motion } from 'framer-motion';
import { skills } from '@/constants/about';
import { containerVariants, itemVariants } from '@/utils/animation';

export default function SkillsTab() {
  return (
    <motion.div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="relative group cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="h-full bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-500/30 flex flex-col items-center justify-center text-center">
            {/* Soft Glow Background */}
            <div 
              className="absolute inset-x-4 inset-y-8 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0 bg-current pointer-events-none"
              style={{ color: skill.color }}
            />
            
            <div className="relative z-10">
              <div 
                className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-900 shadow-inner group-hover:scale-110 transition-transform duration-300"
                style={{ color: skill.color }}
              >
                <skill.icon className="text-3xl" />
              </div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {skill.name}
              </h3>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
                {skill.category}
              </p>
            </div>
            
            {/* Bottom Accent */}
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-current rounded-full"
              style={{ color: skill.color }}
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
