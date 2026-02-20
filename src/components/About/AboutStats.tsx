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
          className="bg-gray-100/50 dark:bg-black/20 backdrop-blur-3xl p-4 md:p-5 rounded-2xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white dark:hover:bg-blue-600/10 transition-all duration-500 shadow-xl hover:-translate-y-1"
        >
          <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1 tracking-tighter group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-none">
            {stat.value}<span className="text-[10px] md:text-xs font-black text-blue-600 dark:text-blue-500 ml-0.5">{stat.suffix}</span>
          </div>
          <p className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-blue-500 dark:group-hover:text-gray-300 transition-colors">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
