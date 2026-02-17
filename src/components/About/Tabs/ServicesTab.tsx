'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animation';
import { servicesData } from '@/constants/about';

export default function ServicesTab() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {servicesData.map((service, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="group relative p-8 rounded-3xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-md border border-gray-100 dark:border-gray-700/50 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 flex flex-col justify-between h-[280px]"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-4xl p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Learn more
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* Make Your Idea Real Card */}
      <motion.div
        variants={itemVariants}
        className="group relative p-8 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700/50 hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all duration-300 flex flex-col items-center justify-center text-center h-[280px]"
      >
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
          ✨
        </div>
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          Have a Project?
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px]">
          Let's collaborate and build something amazing together.
        </p>
      </motion.div>
    </motion.div>
  );
}
