"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/lib/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { signInSchema, SignInSchema } from "@/modules/auth/schema";

export const login = async (values: SignInSchema, callbackUrl?: string | null) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };                                 
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Login Sucess!" };
  } catch (error) {
    console.log("Login Error:", error);
    
    if (error instanceof AuthError) {
      console.log("Auth Error Type:", error.type);
      switch (error.type) {
        case "CredentialsSignin": 
          return { error: "Invalid credentials" };
        default:
          return { error: error.message };
      }
    }

    throw error;
  }
}