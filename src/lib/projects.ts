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

/**
 * Get adjacent (previous and next) projects relative to the current project slug
 */
export function getAdjacentProjects(currentSlug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const all = getAllProjects();
  const currentIndex = all.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;

  return { prev, next };
}
