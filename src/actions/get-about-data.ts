'use server';

import { createStaticClient } from '@/lib/supabase/server';
import { Skill } from '@/types/skill';
import { unstable_cache } from 'next/cache';

/**
 * Fetch all skills from Supabase (Cached)
 */
export const getSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*');

    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }

    const fetchedSkills = data as Skill[];
    
    // Inject custom skills if they don't exist
    const injectedSkills = [
      { 
        name: 'RESTful APIs', 
        icon_key: 'postman', 
        category: 'Backend',
        sort_order: 100 
      },
      { 
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
  ['skills-list'],
  { revalidate: 3600, tags: ['skills'] }
);

