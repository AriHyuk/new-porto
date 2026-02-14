'use client';

import { motion } from 'framer-motion';
import { servicesData } from '@/constants/about';
import { containerVariants, itemVariants } from '@/utils/animation';

export default function ServicesTab() {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {servicesData.map((service, index) => (
        <motion.div
          key={index}
          className="group p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ y: -5 }}
        >
          {/* Background Highlight */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors duration-500" />
          
          <div className="relative z-10">
            <div className="text-4xl mb-4 bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
              {service.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
          
          {/* Arrow Indicator */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
             <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
             </svg>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
