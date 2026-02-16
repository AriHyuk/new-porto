"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import type { Project } from "@/types";
import { useEffect } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 300,
      staggerChildren: 0.1,
      delayChildren: 0.2
    } 
  },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // ... existing useEffects ...
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20 dark:border-white/10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
              aria-label="Close modal"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Image Header */}
            <div className="relative h-64 md:h-80 w-full flex-shrink-0 bg-gray-200 dark:bg-zinc-800 overflow-hidden">
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 5, ease: "linear" }}
              >
                {/* Shimmer Overlay */}
                <div className="absolute inset-0 bg-shimmer z-0" />
                
                <Image
                  src={project.image_url || "/images/projects/placeholder.png"}
                  alt={project.title}
                  fill
                  className="object-cover z-10"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                <div className="p-6 md:p-8 w-full">
                  <motion.h2 
                    className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg"
                    variants={contentVariants}
                  >
                    {project.title}
                  </motion.h2>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={contentVariants}
                  >
                     {project.tech_stack?.map((tech, i) => (
                      <span 
                        key={i} 
                        className="text-xs md:text-sm bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
              <motion.div 
                className="prose dark:prose-invert max-w-none"
                variants={contentVariants}
              >
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-gray-200/50 dark:border-white/10"
                variants={contentVariants}
              >
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
                {project.repo_url && (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all hover:shadow-lg hover:-translate-y-0.5 border border-transparent dark:border-white/10"
                  >
                    <FaGithub /> Source Code
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
