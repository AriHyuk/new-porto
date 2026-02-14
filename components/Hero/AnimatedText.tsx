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
            staggerChildren,
          },
        },
      }}
      className={className}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letterVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
