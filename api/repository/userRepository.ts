import { PrismaClient, User } from '@prisma/client'

export class UserRepository {
    public prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async addNewUser(payload: User) {
        return await this.prisma.user.create({
            data: { ...payload, password: await bcrypt.hash(payload.password, 10) },
        })
    }

    async getAllUser() {
        return await this.prisma.user.findMany()
    }

    public async getUserByEmail(email: string) {
        return await this.prisma.user.findFirst({
            where: {
                email
            }
        })
    }
}