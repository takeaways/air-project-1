import { PrismaClient } from "@prisma/client";

const client = global.client || new PrismaClient();


declare global{
  var client: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "development") global.client = client;

export default new PrismaClient();
