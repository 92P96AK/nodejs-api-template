import { PrismaClient } from '@prisma/client'
import { prismaConfig } from '../../constants'

class BaseRepository {
  public prisma: PrismaClient
  public softDeleteModels: string[]

  constructor() {
    this.prisma = new PrismaClient(prismaConfig)
    this.softDeleteModels = ['User']
  }

  public configureSoftDelete() {
    this.prisma.$use(async (params, next) => {
      if (this.softDeleteModels.includes(params.model!!)) {
        switch (params.action) {
          case 'delete':
            params.action = 'update'
            params.args['data'] = { deletedAt: + new Date() }
            break;
          case 'deleteMany':
            params.action = 'updateMany'
            if (params.args.data != undefined) {
              params.args.data['deletedAt'] = + new Date()
            } else {
              params.args['data'] = { deletedAt: + new Date() }
            }
            break;
        }
      }
      return next(params)
    })
  }
}

export { BaseRepository }