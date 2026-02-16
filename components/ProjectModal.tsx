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
  // ... (useEffects can stay logic-wise, but I will include them to be safe if I'm replacing the whole component body)
  
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-5xl bg-[#0f1115] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-white/10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layoutId={`project-card-${project.id}`} // Match the card's layoutId
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all border border-white/10 backdrop-blur-md group"
              aria-label="Close modal"
            >
              <FaTimes className="text-lg group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Immersive Image Sidebar (Left/Top) */}
            <motion.div 
                className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-900 group"
                layoutId={`project-content-${project.id}`} // Optional: separate ID for image morph
            >
               <Image
                  src={project.image_url || "/images/projects/placeholder.png"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-60" />
            </motion.div>

            {/* Content Body (Right/Bottom) */}
            <div className="w-full md:w-1/2 flex flex-col p-8 md:p-10 overflow-y-auto custom-scrollbar relative bg-[#0f1115]">
              {/* Category & Date (Mock) */}
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
                  {project.tech_stack?.[0] || 'Showcase'}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                  2023 - Present
                </span>
              </div>

              <motion.h2 
                className="text-4xl md:text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight"
                variants={contentVariants}
              >
                {project.title}
              </motion.h2>

              <motion.div 
                className="prose prose-invert max-w-none mb-8"
                variants={contentVariants}
              >
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  {project.description}
                </p>
              </motion.div>

              {/* Tech Stack Grid */}
              <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/5">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech, i) => (
                    <span 
                      key={i} 
                      className="text-sm text-gray-300 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 flex gap-4">
                {project.demo_url && (
                   <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 flex items-center justify-center gap-2 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors"
                  >
                    <FaExternalLinkAlt className="text-sm" /> Live Demo
                  </a>
                )}
                 {project.repo_url && (
                   <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 flex items-center justify-center gap-2 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <FaGithub className="text-lg" /> Code
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
