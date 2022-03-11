import { User } from '@prisma/client'
import { BaseRepository } from './baseRepository'

class UserRepository extends BaseRepository {
    constructor() {
        super()
    }

    async addNewUser(payload: User) {
        return await this.prisma.user.create({
            data: payload
        })
    }

    async getAllUser() {
        return await this.prisma.user.findMany()
    }

    async getOneUser(payload: User) {
        return await this.prisma.user.findFirst({
            where: {
                ...payload
            }
        })
    }
}

export { UserRepository }