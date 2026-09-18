import { PrismaClient } from "@prisma/client";

// Next.js hot-reloads modules in dev, which would normally create a brand new
// PrismaClient (and a brand new DB connection pool) on every single file save.
// Neon has a limited number of concurrent connections, so we stash the client
// on the global object and reuse it across reloads instead of recreating it.

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
