import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";

import { cuid } from "@/lib/utils";

export const users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: text("clerkId").unique().notNull(),
  name: text("name").notNull(),
  imageUrl: text("imageUrl").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (t) => [uniqueIndex("clerk_id_idx").on(t.clerkId)]);

export const groups = pgTable("group", {
  id: text("id").primaryKey().$defaultFn(() => cuid()),
  name: text("name").notNull(),
  year: text("year").notNull(),
  icon: text("icon"),
  banner: text("banner"),
  inTrash: boolean("inTrash").$default(() => false).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).notNull().defaultNow(),
  createdBy: text("createdBy").notNull(),
  updatedAt: timestamp("updatedAt", { mode: "string" }).notNull().$onUpdateFn(() => new Date().toISOString()),
  updatedBy: text("updatedBy").notNull(),
});