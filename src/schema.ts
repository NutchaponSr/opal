import { z } from "zod";

export const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  slugUrl: z.string().min(1, "Organization slug is required")
});

export type OrganizationSchema = z.infer<typeof organizationSchema>;
