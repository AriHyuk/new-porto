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
          className="bg-[#F5F0E8] dark:bg-[#1a1c23] p-4 md:p-6 border-2 border-black dark:border-white flex flex-col items-center justify-center text-center group hover:bg-[#CCFF00] dark:hover:bg-[#2B5CE6] transition-all duration-150 shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)]"
        >
          <div className="text-2xl md:text-4xl font-black text-black dark:text-white mb-1.5 tracking-tighter group-hover:text-black dark:group-hover:text-white transition-colors leading-none">
            {stat.value}<span className="text-[10px] md:text-sm font-black text-[#2B5CE6] group-hover:text-black dark:text-[#5b82ff] dark:group-hover:text-white ml-0.5">{stat.suffix}</span>
          </div>
          <p className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
