import { z } from "zod";

import { db } from "@/lib/db";

import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { groupSchema } from "../schema";

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
          organizationId: input.organizationId,
        },
        orderBy: {
          updatedAt: "desc",
        }
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
          icon: "hugeicons:file-empty-02",
          createdBy: ctx.user.clerkId,
          updatedBy: ctx.user.clerkId,
          organizationId: input.organizationId,
        }
      });

      return data;
    }),
  rename: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        icon: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = await db.group.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          icon: input.icon,
          updatedBy: ctx.user.clerkId,
        },
      });

      return data;
    }),
  copy: protectedProcedure
    .input(groupSchema.omit({ id: true }))
    .mutation(async ({ ctx, input }) => {
      console.log(ctx);

      const data = await db.group.create({
        data: {
          ...input,
          createdBy: ctx.user.clerkId,
          updatedBy: ctx.user.clerkId,
        },
      });

      return data;
    }),
  trash: protectedProcedure
    .input(groupSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      const data = await db.group.update({
        where: {
          id: input.id,
        },
        data: {
          inTrash: true,
          updatedBy: ctx.user.clerkId,
        },
      });

      return data;
    }),
  delete: protectedProcedure
    .input(groupSchema.pick({ id: true }))
    .mutation(async ({ input }) => {
      const data = await db.group.delete({
        where: {
          id: input.id,
        },
      });

      return data;
    })
})