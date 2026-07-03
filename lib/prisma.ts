import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
  prismaDatabaseUrl?: string;
};

const databaseUrl = process.env.DATABASE_URL;

export function validateDatabaseUrl() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is missing. Add it to digitales/.env and restart Next.js.");
  }

  if (
    databaseUrl.includes("PROJECT_REF") ||
    databaseUrl.includes("region") ||
    databaseUrl.includes("something")
  ) {
    throw new Error(
      "DATABASE_URL still contains a placeholder. Copy the exact Supabase pooler connection string from Project Settings > Database > Connection string."
    );
  }

  try {
    new URL(databaseUrl);
  } catch {
    throw new Error("DATABASE_URL is not a valid Postgres URL.");
  }
}

function createPrismaClient() {
  if (databaseUrl) {
    try {
      const parsedUrl = new URL(databaseUrl);
      console.log("DEBUG PRISMA INIT DATABASE_URL HOST:", parsedUrl.host);
      console.log("DEBUG PRISMA INIT DATABASE_URL USERNAME:", parsedUrl.username);
    } catch (error) {
      console.error("DEBUG PRISMA INIT DATABASE_URL PARSE ERROR:", error);
    }
  } else {
    console.error("DEBUG PRISMA INIT DATABASE_URL MISSING");
  }

  return new PrismaClient({
    log: ["query"],
    datasources: databaseUrl
      ? {
          db: {
            url: databaseUrl,
          },
        }
      : undefined,
  });
}

if (
  process.env.NODE_ENV !== "production" &&
  globalForPrisma.prisma &&
  globalForPrisma.prismaDatabaseUrl !== databaseUrl
) {
  console.log("DEBUG PRISMA DATABASE_URL CHANGED - recreating PrismaClient");
  void globalForPrisma.prisma.$disconnect();
  globalForPrisma.prisma = undefined;
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaDatabaseUrl = databaseUrl;
}
