'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import clsx from 'clsx';
import type { Project } from '@/types';
import { itemVariants, buttonVariants } from '@/utils/animation';

import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const router = useRouter();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (project.slug) {
      router.push(`/projects/${project.slug}`);
    }
  };

  if (!project) return null;

  const hasLinks = project.repo_url || project.demo_url;

  return (
    <motion.div
      className={clsx(
        'group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden',
        'transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl',
        'relative flex flex-col h-full cursor-pointer'
      )}
      variants={itemVariants}
      onClick={handleClick}
      role="article"
      aria-label={`Project: ${project.title}`}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-48">
        {/* Hover Overlay with Links */}
        {hasLinks && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
            <div className="flex gap-2">
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <FaGithub className="text-white text-lg" />
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live demo`}
                >
                  <FaExternalLinkAlt className="text-white text-lg" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Optimized Image */}
        <div className="relative w-full h-full">
          <Image
            src={project.image_url || '/placeholder.jpg'}
            alt={project.title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
          {project.description || 'No description available.'}
        </p>

        {/* Tech Stack Badges */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech_stack.map((tech, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* View Details Button */}
        <motion.button
          className="w-full py-2 text-center font-medium text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-300"
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
          aria-label={`View details for ${project.title}`}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}
