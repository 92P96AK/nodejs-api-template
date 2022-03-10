import { UserModel } from "../../interfaces"
import { PrismaClient } from '@prisma/client'

export class UserRepository {
    public prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async addNewUser(payload: UserModel) {
        return await this.prisma.user.create({
            data: { ...payload, password: await bcrypt.hash(payload.password, 10) },
        })
    }

    public getAllUser() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
}