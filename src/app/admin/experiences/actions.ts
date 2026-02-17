'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { experienceSchema, type ExperienceFormData } from '@/lib/validations/experience';

export type ActionState = {
  success?: boolean;
  errors?: {
    position?: string[];
    company?: string[];
    location?: string[];
    period?: string[];
    description?: string[];
    sort_order?: string[];
    _form?: string[];
  };
  message?: string;
};

export async function createExperience(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    position: formData.get('position') as string,
    company: formData.get('company') as string,
    period: formData.get('period') as string,
    description: formData.get('description') as string,
    sort_order: formData.get('sort_order') as string,
  };

  const validatedFields = experienceSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  const { error } = await supabase.from('experiences').insert([{
    ...validatedFields.data,
    user_id: user.id
  }]);

  if (error) {
    console.error('DB Error:', error);
    return { success: false, message: 'Failed to record experience.' };
  }

  revalidatePath('/admin/experiences', 'page');
  revalidateTag('experiences', 'default');
  return { success: true, message: 'Experience added to your legacy!' };
}

export async function updateExperience(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = {
    position: formData.get('position') as string,
    company: formData.get('company') as string,
    period: formData.get('period') as string,
    description: formData.get('description') as string,
    sort_order: formData.get('sort_order') as string,
  };

  const validatedFields = experienceSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  const { error } = await supabase
    .from('experiences')
    .update(validatedFields.data)
    .eq('id', id);

  if (error) {
    console.error('DB Error:', error);
    return { success: false, message: 'Failed to update experience.' };
  }

  revalidatePath('/admin/experiences', 'page');
  revalidateTag('experiences', 'default');
  return { success: true, message: 'Experience refined successfully!' };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const { error } = await supabase.from('experiences').delete().eq('id', id);

  if (error) {
    console.error('DB Error:', error);
    return { success: false, message: 'Failed to delete experience.' };
  }

  revalidatePath('/admin/experiences', 'page');
  revalidateTag('experiences', 'default');
  return { success: true, message: 'Experience deleted.' };
}

export async function getAdminExperiences() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) return [];
  return data;
}

export async function getExperienceById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}
