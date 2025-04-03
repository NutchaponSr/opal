import bcrypt from "bcryptjs";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { roles, users } from "@/db/schema";
import { signInSchema } from "@/modules/auth/schema";
import { env } from "@/env";

const adapter = DrizzleAdapter(db);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  // secret: env.AUTH_SECRET,
  // trustHost: true,
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);
          
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, email));
          
          if (!user || !user.password) return null;
          
          const passwordMatch = await bcrypt.compare(password, user.password);
          
          if (passwordMatch) return user;
        }
        
        return null;
      },
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as typeof roles.enumValues[number];
      }
      
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, token.sub));

      if (!existingUser) return token;

      token.role = existingUser.role;
      token.id = existingUser.id;

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
