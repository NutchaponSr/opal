import { z } from "zod";

import { protectedProcedure, createTRPCRouter } from "@/trpc/init";

import { usersRouter } from "@/modules/users/server/procedure"; 

export const appRouter = createTRPCRouter({
  users: usersRouter,
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;