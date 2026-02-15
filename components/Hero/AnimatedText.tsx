'use client';

import { motion } from 'framer-motion';
import { letterVariants } from '@/utils/animation';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

export default function AnimatedText({ 
  text, 
  className, 
  delayChildren = 0, 
  staggerChildren = 0.08 
}: AnimatedTextProps) {
  const chars = text.split('');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            delayChildren,
            staggerChildren: 0.05,
          },
        },
      }}
      className={className}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 50, rotateX: -90 },
            visible: { 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
              }
            }
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
