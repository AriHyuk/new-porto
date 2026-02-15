'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { experienceSchema, type ExperienceFormData } from '@/lib/validations/experience';
import { z } from 'zod';

export type ActionState = {
  message: string;
  errors?: Record<string, string[]>;
  success?: boolean;
};

export async function createExperience(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { message: 'Unauthorized. Please login.' };
  }

  // Parse and validate form data
  const rawData: ExperienceFormData = {
    position: formData.get('position') as string,
    company: formData.get('company') as string,
    period: formData.get('period') as string,
    description: formData.get('description') as string,
    sort_order: Number(formData.get('sort_order') || 0),
  };

  const validatedFields = experienceSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Insert into Supabase
  const { error } = await supabase
    .from('experiences')
    .insert([validatedFields.data]);

  if (error) {
    console.error('Database Error:', error);
    return { message: 'Failed to create experience.' };
  }

  revalidatePath('/admin/experiences');
  revalidatePath('/about'); // Assuming it's used in the about page
  return { success: true, message: 'Experience created successfully!' };
}

export async function updateExperience(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  const id = formData.get('id') as string;

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { message: 'Unauthorized. Please login.' };
  }

  // Parse and validate form data
  const rawData: ExperienceFormData = {
    position: formData.get('position') as string,
    company: formData.get('company') as string,
    period: formData.get('period') as string,
    description: formData.get('description') as string,
    sort_order: Number(formData.get('sort_order') || 0),
  };

  const validatedFields = experienceSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Update Supabase
  const { error } = await supabase
    .from('experiences')
    .update(validatedFields.data)
    .eq('id', id);

  if (error) {
    console.error('Database Error:', error);
    return { message: 'Failed to update experience.' };
  }

  revalidatePath('/admin/experiences');
  revalidatePath('/about');
  return { success: true, message: 'Experience updated successfully!' };
}

export async function deleteExperience(id: string) {
  const supabase = await createClient();

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
     throw new Error('Unauthorized');
  }

  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete experience');
  }

  revalidatePath('/admin/experiences');
  revalidatePath('/about');
}

export async function getAdminExperiences() {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
      // Return empty array or throw error depending on preference, 
      // but for list components empty array is usually safer to prevent crashes
      console.error("Unauthorized access to getAdminExperiences");
      return []; 
  }

  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching experiences:', error);
    return [];
  }

  return data || [];
}

export async function getExperienceById(id: string) {
    const supabase = await createClient();
    
    // Auth check optional here if we want to reuse for public, 
    // but this file is in app/admin so implied admin context.
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return null;
    }
  
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();
  
    if (error) {
      console.error('Error fetching experience:', error);
      return null;
    }
  
    return data;
  }
