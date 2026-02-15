'use client';

import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/utils/animation';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceTabProps {
  experiences: Experience[];
}

export default function ExperienceTab({ experiences }: ExperienceTabProps) {
  if (!experiences || experiences.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No experience data found.
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-blue-500/30 before:to-transparent"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {experiences.map((item, index) => (
        <motion.div
          key={index}
          className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          variants={itemVariants}
        >
          {/* Dot */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-800 bg-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 transition-transform group-hover:scale-125">
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          </div>

          {/* Card */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:border-blue-500/20 group animate-in slide-in-from-bottom-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.role}
              </h3>
              <time className="text-xs font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full">
                {item.period}
              </time>
            </div>
            <div className="text-sm font-medium text-blue-600 dark:text-neutral-400 mb-3">
              {item.company}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
