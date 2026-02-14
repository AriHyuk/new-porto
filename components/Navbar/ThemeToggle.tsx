'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 w-9 h-9" aria-hidden="true" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <FaRegSun className="text-xl" />
      ) : (
        <FaRegMoon className="text-xl" />
      )}
    </motion.button>
  );
}
