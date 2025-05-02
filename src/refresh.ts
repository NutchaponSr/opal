import { db } from "@/lib/db";

async function main() {
  await db.member.deleteMany();
  await db.group.deleteMany();
  await db.organization.deleteMany();
  await db.user.deleteMany();
}

try {
  await main();
  console.log("Seeding completed successfully");
  process.exit(0);
} catch (error) {
  console.error("Error during seeding...", error);
  process.exit(1);
}