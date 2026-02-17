import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().optional(),
  description: z.string().optional(),
  tech_stack: z.string().transform((val) => val.split(",").map((t) => t.trim()).filter(Boolean)),
  demo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  repo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  image_url: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
