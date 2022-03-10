import { User } from "@prisma/client"
import { UserRepository } from "../repository"
export class UserService {
    public userRepo: UserRepository

    constructor() {
        this.userRepo = new UserRepository()
    }

    public async addNewUser(payload: User) {
        try {
            const user = await this.userRepo.addNewUser(payload)
            return user
        } catch (error) {
            throw error
        }
    }

    public async getAllUser() {
        try {
            const data = await this.userRepo.getAllUser()
            return data
        } catch (error) {
            throw error
        }
    }

    public async getUserByEmail(email: string) {
        try {
            const data = await this.userRepo.getUserByEmail(email)
            return data;
        } catch (error) {
            throw error
        }
    }
}