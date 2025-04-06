import { z } from "zod";

import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { groupsRouter } from "@/modules/groups/server/procedure";

export const appRouter = createTRPCRouter({
  groups: groupsRouter,
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