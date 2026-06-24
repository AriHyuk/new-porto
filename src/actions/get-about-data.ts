'use server';

import { Skill } from '@/types/skill';
import { skills as staticSkills } from '@/constants/about';
import { unstable_cache } from 'next/cache';

/**
 * Fetch all skills from Local Static Data (Cached)
 */
export const getSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    // Map the static skills to match the Supabase Skill type
    const fetchedSkills: Skill[] = staticSkills.map((s, index) => ({
      id: `static-skill-${index}`,
      name: s.name,
      category: s.category,
      icon_key: s.icon_key,
    }));
    
    // Inject custom skills if they don't exist
    const injectedSkills = [
      { 
        id: 'static-injected-1',
        name: 'RESTful APIs', 
        icon_key: 'postman', 
        category: 'Backend',
        sort_order: 100 
      },
      { 
        id: 'static-injected-2',
        name: 'CI/CD Pipelines', 
        icon_key: 'githubactions', 
        category: 'Engineering',
        sort_order: 101 
      }
    ];

    const result = [...fetchedSkills];
    injectedSkills.forEach(injected => {
      if (!result.some(s => s.name === injected.name)) {
        result.push(injected as any);
      }
    });

    return result;
  },
  ['skills-list-static'],
  { revalidate: 3600, tags: ['skills'] }
);

