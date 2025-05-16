import { z } from "zod";

export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  year: z.string(),
  cover: z.string().nullable().optional(),
  icon: z.string(),
  inTrash: z.boolean().default(false),

  createdAt: z.date(),
  createdBy: z.string(),
  updatedBy: z.string(),
  updatedAt: z.date(),

  organizationId: z.string().nullable().optional(),
});

export type GroupSchema = z.infer<typeof groupSchema>;