import "server-only";

import { cache } from "react";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import { appRouter } from "@/trpc/routers/_app";
import { makeQueryClient } from "@/trpc/query-client";
import { createCallerFactory, createTRPCContext } from "@/trpc/init";

export const getQueryClient = cache(makeQueryClient);

const caller = createCallerFactory(appRouter)(createTRPCContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(caller, getQueryClient);