'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { itemVariants } from '@/utils/animation';

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  delay?: number;
}

function Counter({ end, duration = 2, delay = 0 }: { end: number; duration?: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay * 1000);
    }
  }, [isInView, end, duration, delay]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { label: 'Years Experience', value: 5, suffix: '+', delay: 0.1 },
  { label: 'Projects Completed', value: 50, suffix: '+', delay: 0.3 },
  { label: 'Happy Clients', value: 30, suffix: '+', delay: 0.5 },
  { label: 'Coffee Cups', value: 99, suffix: '', delay: 0.7 },
];

export default function AboutStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl border border-gray-100 dark:border-gray-700 text-center group"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="text-3xl md:text-4xl font-black text-blue-600 dark:text-blue-400 mb-2 flex items-center justify-center">
            <Counter end={stat.value} delay={stat.delay} />
            <span className="opacity-70">{stat.suffix}</span>
          </div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
