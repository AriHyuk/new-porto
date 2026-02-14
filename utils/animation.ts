import type { Variants } from 'framer-motion';

/**
 * Animation variants for framer-motion
 * Refactored from legacy code with proper TypeScript typing
 */

export const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Tab switching animation
export const tabVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    x: 10,
    transition: { duration: 0.3, ease: 'easeIn' } 
  },
};

// Generic scroll reveal
export const entryVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Container animation with stagger children
export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Item animation (fade + slide up)
export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Button hover animation
export const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Card hover animation
export const cardVariants: Variants = {
  hover: {
    y: -8,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Navbar and Text animations
export const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

export const letterVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Background shape animations
export const shapeVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: 0.8,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.2 + i * 0.1,
    },
  }),
};

// Profile image animation
export const profileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.4,
    },
  },
  hover: {
    scale: 1.05,
    rotate: 2,
    boxShadow: '0px 0px 30px rgba(59,130,246,0.6)',
    transition: { duration: 0.3 },
  },
};
