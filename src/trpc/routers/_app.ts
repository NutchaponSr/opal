import { groupProcedure } from "@/modules/groups/server/procedure";
import { organizationRouter } from "@/modules/organization/server/procedure";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  groups: groupProcedure,
  organizations: organizationRouter,
  greeting: protectedProcedure.query(({ ctx }) => {
    return { message: `hello world ${ctx.user.id}` }
  }), 
});

export type AppRouter = typeof appRouter;