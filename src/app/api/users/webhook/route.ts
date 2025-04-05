import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { env } from "@/env";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export async function POST(req: Request) {
  const SIGNING_SECRET = env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Error: Please add CLERK_SIGNING_SECRET from Clerk Dashboard to .env or .env");
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error: Could not verify webhook: ", error);
    return new Response("Error: Verification error", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { data } = evt;

    console.log(data);

    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  if (eventType === "user.updated") {
    const { data } = evt;

    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));
  }

  if (eventType === "user.deleted") {
    const { data } = evt;

    if (!data.id) {
      return new Response("Missing user id", { status: 400 });
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  return new Response("Webhook received", { status: 200 })
}