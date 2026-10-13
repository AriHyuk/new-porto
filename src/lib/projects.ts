import type { Project } from '@/types';
import { projectsData } from '@/constants/projects';

/**
 * Fetch a single project by slug from local static data
 */
export function getProjectBySlug(slug: string): Project | null {
  const project = projectsData.find((p) => p.slug === slug);
  return project || null;
}

/**
 * Fetch all projects sorted by sort_order
 */
export function getAllProjects(): Project[] {
  return [...projectsData].sort((a, b) => a.sort_order - b.sort_order);
}

/**
 * Get all project slugs for static path generation
 */
export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}
