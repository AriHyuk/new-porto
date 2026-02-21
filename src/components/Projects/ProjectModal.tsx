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
      staggerChildren: 0.08,
      delayChildren: 0.15
    } 
  },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2, ease: [.4, 0, .2, 1] } },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [.4, 0, .2, 1] } },
};

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project ? [project.image_url, ...(project.additional_images || [])].filter(Boolean) : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1) nextImage();
      if (e.key === "ArrowLeft" && images.length > 1) prevImage();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, images.length]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentImageIndex(0);
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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 dark:bg-black/90 backdrop-blur-xl"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            layoutId={`project-card-${project.id}`}
            className="relative w-full max-w-6xl bg-white dark:bg-[#0A0C10] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-gray-200/50 dark:border-white/10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-50 p-2.5 bg-black/20 hover:bg-black/40 dark:bg-white/10 dark:hover:bg-white/20 text-white rounded-xl transition-all backdrop-blur-xl group"
            >
              <FaTimes className="text-lg group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* ===== LEFT: Image Carousel (Clean, no text overlay) ===== */}
            <div className="w-full md:w-[45%] h-[280px] md:h-auto relative bg-gray-100 dark:bg-[#111] overflow-hidden group/carousel shrink-0">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentImageIndex}
                   initial={{ opacity: 0, scale: 1.05 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   transition={{ duration: 0.4, ease: [.4, 0, .2, 1] }}
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
               
                {/* Subtle vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
                
                {/* Carousel Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/30 hover:bg-black/60 backdrop-blur-md text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/30 hover:bg-black/60 backdrop-blur-md text-white opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-30"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                    {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
            </div>

            {/* ===== RIGHT: Content Panel (Title moved here) ===== */}
            <div className="w-full md:w-[55%] flex flex-col overflow-y-auto custom-scrollbar bg-white dark:bg-[#0A0C10]">
              
              {/* Header: Title + Category (NO LONGER overlapping image) */}
              <motion.div variants={contentVariants} className="px-8 pt-8 pb-6 md:px-12 md:pt-12 md:pb-8 border-b border-gray-100 dark:border-white/5">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-600/10 border border-blue-200/50 dark:border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    {project.category || 'Showcase'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                  {project.title}
                </h2>
                {project.summary && project.summary !== project.description && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 leading-relaxed font-medium">
                    {project.summary}
                  </p>
                )}
              </motion.div>

              {/* Content Sections */}
              <div className="px-8 py-8 md:px-12 md:py-10 space-y-10">
                
                {/* Overview Section */}
                <motion.section variants={contentVariants}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <FaRocket className="text-blue-500 text-sm" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">The Overview</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    {project.description || project.summary}
                  </p>
                </motion.section>

                {/* Challenge */}
                {project.challenge && (
                  <motion.section variants={contentVariants}>
                    <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-500/[0.03] border border-amber-200/30 dark:border-amber-500/10 relative overflow-hidden">
                       <div className="absolute -top-2 -right-2 opacity-[0.04]">
                          <FaLightbulb className="text-7xl text-amber-500" />
                       </div>
                       <div className="flex items-center gap-2.5 mb-3">
                          <FaLightbulb className="text-amber-500 text-sm" />
                          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">The Challenge</h3>
                       </div>
                       <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm italic">
                         &ldquo;{project.challenge}&rdquo;
                       </p>
                    </div>
                  </motion.section>
                )}

                {/* Contribution */}
                {project.contribution && (
                  <motion.section variants={contentVariants}>
                    <div className="flex items-center gap-2.5 mb-4">
                      <FaTools className="text-purple-500 text-sm" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500">My Contribution</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                      {project.contribution}
                    </p>
                  </motion.section>
                )}

                {/* Key Features */}
                {project.key_features && project.key_features.length > 0 && (
                  <motion.section variants={contentVariants}>
                    <div className="flex items-center gap-2.5 mb-5">
                      <HiLightningBolt className="text-emerald-500 text-sm" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Core Features</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.key_features.map((feature, i) => (
                        <motion.div 
                          key={i} 
                          variants={contentVariants}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50/80 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5"
                        >
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                           <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Tech Stack */}
                <motion.section variants={contentVariants} className="pt-8 border-t border-gray-100 dark:border-white/5">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-4 text-center">Engineered With</h3>
                   <div className="flex flex-wrap justify-center gap-2">
                      {project.tech_stack?.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-xs font-medium border border-gray-200/50 dark:border-white/5 transition-colors hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/5">
                          {tech}
                        </span>
                      ))}
                   </div>
                </motion.section>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 flex items-center justify-center gap-2.5 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all duration-300 active:scale-[0.97]"
                    >
                      <FaExternalLinkAlt className="text-xs" /> Live Showcase
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 flex items-center justify-center gap-2.5 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-2xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300 border border-gray-200 dark:border-white/10 active:scale-[0.97]"
                    >
                      <FaGithub className="text-lg" /> Repository
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
