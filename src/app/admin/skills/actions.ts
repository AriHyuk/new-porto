'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { skillSchema, type SkillFormData } from '@/lib/validations/skill';
import { Skill } from '@/types/skill';

export type ActionState = {
  success?: boolean;
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
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData: SkillFormData = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    icon_key: formData.get('icon_key') as string,
  };

  const validatedFields = skillSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input fields.',
    };
  }

  const { error } = await supabase.from('skills').insert([validatedFields.data]);

  if (error) {
    console.error('DB Error:', error);
    return { success: false, message: 'Failed to create skill.' };
  }

  revalidatePath('/admin/skills', 'page');
  revalidatePath('/about', 'page');
  revalidateTag('skills', 'default');
  return { success: true, message: 'Skill created successfully!' };
}

export async function updateSkill(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData: SkillFormData = {
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    icon_key: formData.get('icon_key') as string,
  };

  const validatedFields = skillSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input fields.',
    };
  }

  const { error } = await supabase
    .from('skills')
    .update(validatedFields.data)
    .eq('id', id);

  if (error) {
    console.error('DB Error:', error);
    return { success: false, message: 'Failed to update skill.' };
  }

  revalidatePath('/admin/skills', 'page');
  revalidatePath('/about', 'page');
  revalidateTag('skills', 'default');
  return { success: true, message: 'Skill updated successfully!' };
}

export async function deleteSkill(id: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const { error } = await supabase.from('skills').delete().eq('id', id);

  if (error) {
    console.error('DB Error:', error);
    return { success: false, message: 'Failed to delete skill.' };
  }

  revalidatePath('/admin/skills', 'page');
  revalidatePath('/', 'page');
  revalidatePath('/about', 'page');
  revalidateTag('skills', 'default');
  return { success: true, message: 'Skill deleted successfully.' };
}

export async function getAdminSkills() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return [];
  return data as Skill[];
}

export async function getSkillById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Skill;
}
