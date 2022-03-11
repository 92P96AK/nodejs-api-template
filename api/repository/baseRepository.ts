import { PrismaClient } from '@prisma/client'
import { prismaConfig } from '../../constants'

class BaseRepository {
  public prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient(prismaConfig)
  }
}

export { BaseRepository }