import { z } from "zod";

export const certificateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  issuer: z.string().min(2, "Issuer must be at least 2 characters"),
  issued_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  image_url: z.string().url("Invalid image URL"),
  certificate_url: z.string().url("Invalid certificate URL").optional().or(z.literal("")),
});

export type CertificateFormData = z.infer<typeof certificateSchema>;
