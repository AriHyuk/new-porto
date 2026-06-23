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
          className="flex items-center gap-2 px-6 py-3 bg-[#2B5CE6] text-white font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-150 active:scale-95"
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
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-black text-black dark:text-white font-black uppercase tracking-widest border-2 border-black dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] hover:bg-gray-100 dark:hover:bg-gray-900 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.6)] transition-all duration-150 active:scale-95"
        >
          <FaGithub className="text-xl" />
          <span>Source Code</span>
        </a>
      )}

      <div className="relative">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-3 bg-[#CCFF00] text-black font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-150 active:scale-95"
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
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] border-2 border-transparent shadow-[2px_2px_0px_rgba(255,255,255,0.5)] dark:shadow-[2px_2px_0px_rgba(0,0,0,1)] whitespace-nowrap"
            >
              Link Copied!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
