'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animation';

interface Stat {
  label: string;
  value: string;
  suffix: string;
}

interface AboutStatsProps {
  stats?: Stat[];
}

const FALLBACK_STATS: Stat[] = [
  { label: 'GPA', value: '3.51', suffix: '/4.0' },
  { label: 'Semester', value: '8', suffix: 'th' },
  { label: 'Experience', value: '2', suffix: '+ Yrs' },
  { label: 'Projects', value: '15', suffix: '+' },
];

export default function AboutStats({ stats: propStats }: AboutStatsProps) {
  const stats = propStats?.length ? propStats : FALLBACK_STATS;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 p-2"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white/50 dark:bg-white/[0.03] backdrop-blur-3xl p-4 md:p-6 rounded-[1.8rem] border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white dark:hover:bg-blue-600/10 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
        >
          <div className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-1.5 tracking-tighter group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-none">
            {stat.value}<span className="text-[10px] md:text-sm font-black text-blue-600 dark:text-blue-500 ml-0.5">{stat.suffix}</span>
          </div>
          <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-gray-300 transition-colors">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
