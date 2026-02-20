'use client';

import { motion } from 'framer-motion';
import { cardVariants, containerVariants, itemVariants } from '@/utils/animation';

export default function AboutStats() {
  const stats = [
    { label: 'GPA', value: '3.51', suffix: '/4.0' },
    { label: 'Semester', value: '8', suffix: 'th' },
    { label: 'Experience', value: '2', suffix: '+ Yrs' },
    { label: 'Projects', value: '15', suffix: '+' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 px-1"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white/50 dark:bg-gray-800/40 backdrop-blur-md p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 flex flex-col items-center justify-center text-center group hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tighter group-hover:text-blue-600 transition-colors">
            {stat.value}<span className="text-sm font-bold text-blue-600 dark:text-blue-400 ml-0.5">{stat.suffix}</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
