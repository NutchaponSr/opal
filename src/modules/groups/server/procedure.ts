import { z } from "zod";

import { db } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const groupProcedure = createTRPCRouter({
  getMany: protectedProcedure
    .query(async () => {
      const data = await db.group.findMany();

      return data;
    }),
  craete: protectedProcedure
    .input(
      z.object({
        year: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await db.group.create({
        data: {
          name: "Untitled",
          year: input.year,
          icon: "lucide:file",
          createdBy: ctx.user.clerkId,
          updatedBy: ctx.user.clerkId,
        }
      });

      return data;
    })
})