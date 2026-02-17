import { z } from 'zod';

export const CollaborationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  category: z.string().min(1, 'Please select a category'),
  budget: z.string().min(1, 'Budget is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  _honeypot: z.string().optional(),
});

export type CollaborationFormData = z.infer<typeof CollaborationSchema>;
