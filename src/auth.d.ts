import { DefaultSession, DefaultUser } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { roles } from "@/db/schema";

export type ExtendedUser = DefaultSession["user"] & {
  role: typeof roles.enumValues[number];
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

