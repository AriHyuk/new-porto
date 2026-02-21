"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaRocket, FaLightbulb, FaTools, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import Image from "next/image";
import type { Project } from "@/types";
import { useEffect, useState } from "react";

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
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project ? [project.image_url, ...(project.additional_images || [])].filter(Boolean) : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0); // Reset index on open
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            className="absolute inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-md"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <motion.div
            layoutId={`project-card-${project.id}`}
            className="relative w-full max-w-6xl bg-white dark:bg-[#0A0C10] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:row-span-1 md:flex-row max-h-[90vh] border border-gray-100 dark:border-white/10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 bg-gray-900/10 hover:bg-gray-900/20 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white rounded-full transition-all border border-gray-900/10 dark:border-white/10 backdrop-blur-xl group"
            >
              <FaTimes className="text-xl group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Sticky Sidebar (Left - Carousel) */}
            <div className="w-full md:w-[45%] h-[350px] md:h-auto relative bg-gray-100 dark:bg-[#111] overflow-hidden group/carousel">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentImageIndex}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.5 }}
                   className="absolute inset-0"
                 >
                   <Image
                      src={images[currentImageIndex] || "https://placehold.co/800x600?text=Project"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                 </motion.div>
               </AnimatePresence>
               
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-transparent dark:from-[#0A0C10] dark:via-[#0A0C10]/20 to-transparent" />
                
                {/* Carousel Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white opacity-0 group-hover/carousel:opacity-100 transition-all z-30"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white opacity-0 group-hover/carousel:opacity-100 transition-all z-30"
                    >
                      <FaChevronRight />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                      {images.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Floating Badges on Image */}
                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                   <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-1.5 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 backdrop-blur-md border border-blue-500/20 dark:border-blue-500/30 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        {project.category || 'Showcase'}
                      </span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tighter">
                     {project.title}
                   </h2>
                </div>
            </div>

            {/* Content Body (Right) */}
            <div className="w-full md:w-[55%] flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar bg-white dark:bg-[#0A0C10]">
              <div className="space-y-12">
                
                {/* Overview Section */}
                <motion.section variants={contentVariants}>
                  <div className="flex items-center gap-3 mb-4">
                    <FaRocket className="text-blue-500" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">The Overview</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                    {project.description || project.summary}
                  </p>
                </motion.section>

                {/* Challenge & Solution Grid */}
                {project.challenge && (
                  <motion.div variants={contentVariants} className="grid grid-cols-1 gap-8">
                    <div className="p-8 rounded-[2rem] bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                          <FaLightbulb className="text-6xl text-yellow-500" />
                       </div>
                       <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-yellow-500">The Challenge</h3>
                       </div>
                       <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                         "{project.challenge}"
                       </p>
                    </div>
                  </motion.div>
                )}

                {/* Main Contribution */}
                {project.contribution && (
                  <motion.section variants={contentVariants}>
                    <div className="flex items-center gap-3 mb-4">
                      <FaTools className="text-purple-500" />
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-purple-500">My Contribution</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.contribution}
                    </p>
                  </motion.section>
                )}

                {/* Key Features Array */}
                {project.key_features && project.key_features.length > 0 && (
                  <motion.section variants={contentVariants}>
                    <div className="flex items-center gap-3 mb-6">
                      <HiLightningBolt className="text-emerald-500" />
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">Core Features</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.key_features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                           <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Tech Stack Pills */}
                <motion.section variants={contentVariants} className="pt-8 border-t border-gray-100 dark:border-white/5">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 text-center">Engineered With</h3>
                   <div className="flex flex-wrap justify-center gap-2">
                      {project.tech_stack?.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs border border-gray-200 dark:border-white/5">
                          {tech}
                        </span>
                      ))}
                   </div>
                </motion.section>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-5 flex items-center justify-center gap-3 bg-blue-600 text-white rounded-[1.25rem] font-black text-sm uppercase tracking-widest hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all active:scale-95"
                    >
                      <FaExternalLinkAlt className="text-sm" /> Live Showcase
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-5 flex items-center justify-center gap-3 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-[1.25rem] font-black text-sm uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10 active:scale-95"
                    >
                      <FaGithub className="text-xl" /> Repository
                    </a>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
