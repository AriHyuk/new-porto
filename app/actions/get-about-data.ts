'use server';

import { createClient } from '@/lib/supabase/server';

export async function getExperiences() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }

  return data;
}

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
