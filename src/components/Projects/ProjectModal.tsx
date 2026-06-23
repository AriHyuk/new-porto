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
            className="relative w-full max-w-6xl bg-white dark:bg-[#1a1c23] shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col md:flex-row max-h-[90vh] border-4 border-black dark:border-white"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2.5 bg-[#FF4D00] text-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all group"
            >
              <FaTimes className="text-lg group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* ===== LEFT: Image Carousel ===== */}
            <div className="w-full md:w-[45%] h-[280px] md:h-auto relative bg-[#CCFF00] border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white overflow-hidden group/carousel shrink-0">
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
                      className="object-cover grayscale"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      priority
                    />
                 </motion.div>
               </AnimatePresence>
                
                {/* Carousel Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white text-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[calc(-50%-2px)] hover:translate-x-[-2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] opacity-0 group-hover/carousel:opacity-100 transition-all duration-150 z-30"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white text-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[calc(-50%-2px)] hover:translate-x-[-2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] opacity-0 group-hover/carousel:opacity-100 transition-all duration-150 z-30"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                    {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                          className={`h-2 transition-all duration-150 border-2 border-black ${i === currentImageIndex ? 'w-6 bg-[#FF4D00]' : 'w-2 bg-white'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
            </div>

            {/* ===== RIGHT: Content Panel ===== */}
            <div className="w-full md:w-[55%] flex flex-col overflow-y-auto custom-scrollbar bg-white dark:bg-[#1a1c23]">
              
              {/* Header: Title + Category */}
              <motion.div variants={contentVariants} className="px-8 pt-8 pb-6 md:px-12 md:pt-12 md:pb-8 border-b-4 border-black dark:border-white">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black border-2 border-transparent text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_rgba(255,255,255,0.5)] dark:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    {project.category || 'Showcase'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white leading-tight tracking-tight uppercase">
                  {project.title}
                </h2>
                {project.summary && project.summary !== project.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-4 font-bold">
                    {project.summary}
                  </p>
                )}
              </motion.div>

              {/* Content Sections */}
              <div className="px-8 py-8 md:px-12 md:py-10 space-y-10">
                
                {/* Overview Section */}
                <motion.section variants={contentVariants}>
                  <div className="flex items-center gap-2.5 mb-4">
                    <FaRocket className="text-black dark:text-white text-sm" />
                    <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white border-b-2 border-black dark:border-white inline-block">THE OVERVIEW</h3>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed font-medium">
                    {project.description || project.summary}
                  </p>
                </motion.section>

                {/* Challenge */}
                {project.challenge && (
                  <motion.section variants={contentVariants}>
                    <div className="p-6 bg-[#FF4D00] border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                       <div className="flex items-center gap-2.5 mb-3">
                          <FaLightbulb className="text-black text-sm" />
                          <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black">THE CHALLENGE</h3>
                       </div>
                       <p className="text-black font-bold text-sm uppercase">
                         &ldquo;{project.challenge}&rdquo;
                       </p>
                    </div>
                  </motion.section>
                )}

                {/* Contribution */}
                {project.contribution && (
                  <motion.section variants={contentVariants}>
                    <div className="flex items-center gap-2.5 mb-4">
                      <FaTools className="text-black dark:text-white text-sm" />
                      <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white border-b-2 border-black dark:border-white inline-block">MY CONTRIBUTION</h3>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm font-medium">
                      {project.contribution}
                    </p>
                  </motion.section>
                )}

                {/* Key Features */}
                {project.key_features && project.key_features.length > 0 && (
                  <motion.section variants={contentVariants}>
                    <div className="flex items-center gap-2.5 mb-5">
                      <HiLightningBolt className="text-black dark:text-white text-sm" />
                      <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white border-b-2 border-black dark:border-white inline-block">CORE FEATURES</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.key_features.map((feature, i) => (
                        <motion.div 
                          key={i} 
                          variants={contentVariants}
                          className="flex items-start gap-3 p-4 bg-white dark:bg-black border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)]"
                        >
                           <div className="w-2 h-2 bg-[#CCFF00] mt-1.5 shrink-0 border border-black" />
                           <span className="text-sm text-black dark:text-white font-bold">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                )}

                {/* Tech Stack */}
                <motion.section variants={contentVariants} className="pt-8 border-t-4 border-black dark:border-white">
                   <h3 className="text-[12px] font-black uppercase tracking-[0.2em] text-black dark:text-white mb-6 text-center">ENGINEERED WITH</h3>
                   <div className="flex flex-wrap justify-center gap-3">
                      {project.tech_stack?.map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-white dark:bg-black text-black dark:text-white text-xs font-black uppercase border-2 border-black dark:border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.5)] hover:bg-[#CCFF00] dark:hover:bg-[#CCFF00] hover:text-black dark:hover:text-black hover:-translate-y-1 transition-all duration-150">
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
                      className="flex-1 py-4 flex items-center justify-center gap-2.5 bg-[#2B5CE6] text-white font-black text-sm uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-150 active:scale-95"
                    >
                      <FaExternalLinkAlt className="text-xs" /> Live Showcase
                    </a>
                  )}
                  {project.repo_url && (
                    <a
                      href={project.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 flex items-center justify-center gap-2.5 bg-white text-black font-black text-sm uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-gray-100 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-150 active:scale-95"
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
