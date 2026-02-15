'use server';

import { createClient } from '@/lib/supabase/server';
import { Skill } from '@/types/skill';

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*');

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data as Skill[];
}

