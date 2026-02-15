'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { skillSchema, type SkillFormData } from '@/lib/validations/skill';
import { Skill } from '@/types/skill';

export type ActionState = {
  errors?: {
    name?: string[];
    category?: string[];
    icon_key?: string[];
    _form?: string[];
  };
  message?: string;
};

export async function createSkill(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { message: 'Unauthorized' };
  }

  const rawData: SkillFormData = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    icon_key: formData.get('icon_key') as string,
  };

  const validatedFields = skillSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Skill.',
    };
  }

  const { error } = await supabase
    .from('skills')
    .insert([validatedFields.data]);

  if (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Create Skill.',
    };
  }

  revalidatePath('/admin/skills');
  revalidatePath('/about'); // Revalidate public about page
  redirect('/admin/skills');
}

export async function updateSkill(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { message: 'Unauthorized' };
  }

  const rawData: SkillFormData = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    icon_key: formData.get('icon_key') as string,
  };

  const validatedFields = skillSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Skill.',
    };
  }

  const { error } = await supabase
    .from('skills')
    .update(validatedFields.data)
    .eq('id', id);

  if (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to Update Skill.',
    };
  }

  revalidatePath('/admin/skills');
  revalidatePath('/about');
  redirect('/admin/skills');
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('skills')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete skill');
  }

  revalidatePath('/admin/skills');
  revalidatePath('/about');
}

export async function getAdminSkills() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }

  return data as Skill[];
}

export async function getSkillById(id: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching skill:', error);
    return null;
  }

  return data as Skill;
}
