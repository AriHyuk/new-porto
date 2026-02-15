import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string().optional(),
  position: z.string().min(2, "Position must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  period: z.string().min(2, "Period is required (e.g. 2023 - Present)"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  sort_order: z.coerce.number().int().default(0),
});

export type ExperienceFormData = z.infer<typeof experienceSchema>;
