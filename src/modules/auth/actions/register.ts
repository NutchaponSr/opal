"use server";

import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

import { signUpSchema, SignUpSchema } from "@/modules/auth/schema";

const SALT = 10;

export const register = async (values: SignUpSchema) => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };                                 
  }

  const { email, name, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, SALT);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    });

  return { success: "Registration successfully" };
}