'use server';

import { createClient } from '@/lib/supabase/server';

export async function getSkills() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*');

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data;
}

