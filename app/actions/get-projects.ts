'use server';

import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';

/**
 * Fetch all projects from Supabase
 * 
 * @returns Array of projects, or empty array if error occurs
 * 
 * @example
 * ```tsx
 * // In a Server Component
 * import { getProjects } from '@/app/actions/get-projects';
 * 
 * export default async function ProjectsPage() {
 *   const projects = await getProjects();
 *   
 *   return (
 *     <div>
 *       {projects.map(project => (
 *         <div key={project.id}>{project.title}</div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching projects:', error);
    return [];
  }
}

