import { Prisma } from '@prisma/client'

export const prismaConfig: Prisma.Subset<
   Prisma.PrismaClientOptions,
   Prisma.PrismaClientOptions
> = {
   log: [
      {
         emit: 'event',
         level: 'query',
      },
      {
         emit: 'stdout',
         level: 'error',
      },
      {
         emit: 'stdout',
         level: 'info',
      },
      {
         emit: 'stdout',
         level: 'warn',
      },
   ],
   errorFormat: 'pretty',
}
