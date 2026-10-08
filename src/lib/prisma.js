import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 3306),
  user: process.env.DATABASE_USER ?? "tienda",
  password: process.env.DATABASE_PASSWORD ?? "tienda123",
  database: process.env.DATABASE_NAME ?? "tienda_db",
  connectionLimit: 10
});

export const prisma = new PrismaClient({ adapter });
