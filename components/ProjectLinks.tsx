'use client';

import { FaGithub, FaExternalLinkAlt, FaShareAlt } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectLinksProps {
  repoUrl: string | null;
  demoUrl: string | null;
  projectTitle: string;
}

export default function ProjectLinks({ repoUrl, demoUrl, projectTitle }: ProjectLinksProps) {
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 mt-8">
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          <FaExternalLinkAlt />
          <span>Live Demo</span>
        </a>
      )}

      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 font-medium rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1"
        >
          <FaGithub className="text-xl" />
          <span>Source Code</span>
        </a>
      )}

      <div className="relative">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          aria-label="Share project"
        >
          <FaShareAlt />
        </button>

        <AnimatePresence>
          {showShareTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black text-white text-xs rounded-md whitespace-nowrap"
            >
              Link Copied!
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
