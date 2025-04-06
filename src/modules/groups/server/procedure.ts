import { z } from "zod";

import { db } from "@/db/drizzle";
import { groups } from "@/db/schema";

import { protectedProcedure, createTRPCRouter, baseProcedure } from "@/trpc/init";

export const groupsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ year: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      const [group] = await db
        .insert(groups)
        .values({
          name: "Untitled",
          year: input.year,
          createdBy: userId,
          updatedBy: userId,
        })
        .returning();

      return { group };
    }),
  getAll: baseProcedure
    .query(async () => {
      const group = await db.query.groups.findMany();

      return { group };
    })
})