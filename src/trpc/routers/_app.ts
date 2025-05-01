import { groupProcedure } from "@/modules/groups/server/procedure";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  groups: groupProcedure,
  greeting: protectedProcedure.query(({ ctx }) => {
    return { message: `hello world ${ctx.user.id}` }
  }), 
});

export type AppRouter = typeof appRouter;