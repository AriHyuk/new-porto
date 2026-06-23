'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center border-2 border-black dark:border-white bg-transparent text-gray-900 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-150 focus:outline-none shadow-[2px_2px_0px_rgba(0,0,0,0.8)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.3)]"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <FaRegSun className="text-sm" />
      ) : (
        <FaRegMoon className="text-sm" />
      )}
    </motion.button>
  );
}
