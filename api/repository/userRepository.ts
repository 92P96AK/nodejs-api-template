import { PrismaClient, User } from '@prisma/client'

export class UserRepository {
    public prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async addNewUser(payload: User) {
        return await this.prisma.user.create({
            data: payload,
        })
    }

    async getAllUser() {
        return await this.prisma.user.findMany()
    }

    //  get one user by condition
    public async getOneUser(payload: User) {
        return await this.prisma.user.findFirst({
            where: {
                ...payload
            }
        })
    }
}