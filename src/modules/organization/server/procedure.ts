import { db } from "@/lib/db";
import { generateInviteCode, generateOrganizationId } from "@/lib/utils";
import { organizationSchema } from "@/schema";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const organizationRouter = createTRPCRouter({
  getOne: protectedProcedure
    .query(async ({ ctx }) => {
      const organization = await db.organization.findFirst({
        where: {
          userId: ctx.user.clerkId,
        },
      })

      return organization;
    }),
  create: protectedProcedure
    .input(organizationSchema)
    .mutation(async ({ ctx, input }) => {
      console.log(input, ctx.user)

      const organization = await db.organization.create({
        data: {
          id: generateOrganizationId(),
          name: input.name,
          organizationSlug: input.slugUrl,
          inviteCode: generateInviteCode(),
          userId: ctx.user.clerkId,
          members: {
            create: {
              userId: ctx.user.clerkId,
            },
          },
        },
      });

      return organization;
    })
});