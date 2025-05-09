import { z } from "zod";

import { db } from "@/lib/db";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const groupProcedure = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        organizationId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const groups = await db.group.findMany({
        where: {
          inTrash: false,
          origanizationId: input.organizationId,
        },
      });

      const populatedData = await Promise.all(
        groups.map(async (group) => {
          const user = await db.user.findUnique({
            where: {
              clerkId: group.updatedBy
            }
          });

          if (!user) {
            throw new TRPCError({ code: "NOT_FOUND", message: "User not founf" });
          }

          return {
            ...group,
            updatedBy: user.name
          }
        })
      )

      return populatedData;
    }),
  craete: protectedProcedure
    .input(
      z.object({
        year: z.string(),
        organizationId: z.string(),
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
          origanizationId: input.organizationId,
        }
      });

      return data;
    })
})