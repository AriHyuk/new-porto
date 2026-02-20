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
      {/* Search & Category Filter */}
      <div className="flex flex-col items-center gap-8 mb-16">
        {/* Search Bar */}
        <div className="relative w-full max-w-md group">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
           </div>
           <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="block w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-white/10 rounded-full leading-5 bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm hover:shadow-md transition-all duration-300"
           />
        </div>

        {/* Categories Filter Bar */}
        <div className="flex flex-col items-center gap-4">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">Filter by Category</h3>
           <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setPage(1); }}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-105'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30'
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[450px]"
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
            className="flex flex-col items-center justify-center min-h-[300px] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
             <p className="text-gray-500 dark:text-gray-400 text-lg">No projects match your criteria</p>
             <button
               onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
               className="mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium"
             >
               Clear Filters
             </button>
           </motion.div>
        )}
      </AnimatePresence>
      
      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-16">
            <button
                onClick={() => setPage(prev => prev + 1)}
                className="group relative px-10 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            >
                <span className="text-xs font-black text-gray-400 group-hover:text-white uppercase tracking-[0.2em]">
                    Discover More Projects
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
