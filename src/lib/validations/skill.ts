import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon_key: z.string().min(1, "Icon key is required"),
});

export type SkillFormData = z.infer<typeof skillSchema>;
