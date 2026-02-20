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
      {/* Search & Category Filter - Cyber Polish */}
      <div className="flex flex-col items-center gap-10 mb-20">
        {/* Search Bar */}
        <div className="relative w-full max-w-lg group">
           <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
           </div>
           <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="block w-full pl-14 pr-6 py-4 border border-white/5 rounded-2xl bg-black/40 text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 hover:border-white/10 transition-all duration-500 font-medium backdrop-blur-3xl"
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
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border ${
                    activeCategory === cat
                      ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-105'
                      : 'bg-black/20 border-white/5 text-gray-500 hover:text-white hover:border-white/20'
                  } backdrop-blur-md`}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-[440px]"
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
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-8 border border-white/5 grayscale">🔍</div>
             <p className="text-gray-500 text-lg font-black uppercase tracking-[0.2em]">0 Results Found</p>
             <button
               onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
               className="mt-6 text-blue-500 hover:text-blue-400 font-black text-xs uppercase tracking-[0.3em] transition-colors"
             >
               Reset Parameters
             </button>
           </motion.div>
        )}
      </AnimatePresence>
      
      {/* Load More Button - Elitist Polish */}
      {hasMore && (
        <div className="flex justify-center mt-24">
            <button
                onClick={() => setPage(prev => prev + 1)}
                className="group relative px-12 py-5 rounded-2xl bg-black/20 border border-white/5 hover:border-blue-500/30 transition-all active:scale-95 shadow-2xl"
            >
                <span className="text-[10px] font-black text-gray-500 group-hover:text-blue-400 uppercase tracking-[0.4em] transition-colors">
                    Expand Project Database
                </span>
                <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
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
