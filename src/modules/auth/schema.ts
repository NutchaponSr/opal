import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(6, "Must be at least 6 characters").max(20, "Must be at most 20 characters").trim(),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(4, "Must be at least 4 characters").max(20, "Must be at most 20 characters").trim(),
})

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;