'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import ProjectCard from './ProjectCard';
import type { Project } from '@/types';
import { containerVariants } from '@/utils/animation';

const ProjectModal = dynamic(() => import('./ProjectModal'), {
  ssr: false,
});

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const ITEMS_PER_PAGE = 3;

  // Extract unique categories
  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean) as string[])];

  // Filter Logic (Search + Category)
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = !searchQuery || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech_stack?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  // Mouse tracking for spotlight effect
  // Mouse tracking moved to individual ProjectCard components for performance
  const handleMouseMove = () => {};

  return (
    <div onMouseMove={handleMouseMove} className="w-full">
      {/* Search & Category Filter - Brutalist */}
      <div className="flex flex-col items-center gap-10 mb-20">
        {/* Search Bar */}
        <div className="relative w-full max-w-lg group">
           <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
           </div>
           <input
              type="text"
              placeholder="SEARCH PROJECTS..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="block w-full pl-14 pr-6 py-4 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:focus:shadow-[4px_4px_0px_rgba(255,255,255,0.3)] transition-all duration-150 font-black uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.2)]"
           />
        </div>

        {/* Categories Filter Bar */}
        <div className="flex flex-col items-center gap-6">
           <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-2">Category Filter</h3>
           <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                  className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-150 border-2 border-black dark:border-white ${
                    activeCategory === cat
                      ? 'bg-[#2B5CE6] text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.8)] -translate-y-1 -translate-x-1'
                      : 'bg-white dark:bg-black text-black dark:text-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_rgba(255,255,255,0.5)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {paginatedProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            key={`project-grid-${activeCategory}-${searchQuery}-${page}`}
          >
            {paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="col-span-1"
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  layoutId={`project-card-${project.id}`}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
           <motion.div
            className="flex flex-col items-center justify-center min-h-[400px] text-center border-2 border-black dark:border-white border-dashed bg-white/50 dark:bg-black/50 p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             <div className="w-16 h-16 bg-white dark:bg-black flex items-center justify-center text-3xl mb-8 border-2 border-black dark:border-white grayscale shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.5)]">🔍</div>
             <p className="text-black dark:text-white text-lg font-black uppercase tracking-[0.2em]">0 Results Found</p>
             <button
               onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
               className="mt-6 text-[#FF4D00] hover:text-black dark:hover:text-white font-black text-xs uppercase tracking-[0.3em] transition-colors border-b-2 border-transparent hover:border-[#FF4D00]"
             >
               Reset Parameters
             </button>
           </motion.div>
        )}
      </AnimatePresence>
      
      {/* Load More Button - Brutalist */}
      {hasMore && (
        <div className="flex justify-center mt-24">
            <button
                onClick={() => setPage(prev => prev + 1)}
                className="group relative px-12 py-5 bg-[#CCFF00] border-2 border-black dark:border-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.2)] hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_rgba(255,255,255,0.3)] active:scale-95"
            >
                <span className="text-[10px] font-black text-black uppercase tracking-[0.4em] transition-colors">
                    Expand Project Database
                </span>
            </button>
        </div>
      )}

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
