import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prismaDB: PrismaClient | undefined
}

export const prismaDB =
  globalForPrisma.prismaDB ??
  new PrismaClient({
    // remove next line to avoid logging all the executed queries
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaDB = prismaDB