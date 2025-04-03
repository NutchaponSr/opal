import { env } from "@/env";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});