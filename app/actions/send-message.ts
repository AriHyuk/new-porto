'use server';

import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

const CollaborationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  category: z.string().min(1, 'Please select a category'),
  budget: z.string().min(1, 'Budget is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type CollaborationFormData = z.infer<typeof CollaborationSchema>;

export async function sendMessage(formData: CollaborationFormData) {
  try {
    // Validate data using Zod
    const validatedData = CollaborationSchema.parse(formData);

    const supabase = await createClient();

    const { error } = await supabase
      .from('collaborations')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          category: validatedData.category,
          budget: validatedData.budget,
          message: validatedData.message,
          status: 'pending',
        },
      ]);

    if (error) {
      throw error;
    }

    return { success: true, message: 'Your request has been sent successfully!' };
  } catch (error) {
    console.error('Error in sendMessage:', error);
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        message: 'Validation failed', 
        errors: error.flatten().fieldErrors 
      };
    }
    return { 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    };
  }
}
