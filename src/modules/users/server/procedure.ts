import { db } from "@/db/drizzle";
import { users } from "@/db/schema"; 
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const usersRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(users)

    return data;
  }),
});