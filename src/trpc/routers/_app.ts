import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const appRouter = createTRPCRouter({
  greeting: protectedProcedure.query(({ ctx }) => {
    return { message: `hello world ${ctx.user.id}` }
  }), 
});

export type AppRouter = typeof appRouter;