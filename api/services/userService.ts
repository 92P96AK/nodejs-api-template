import { UserModel } from "../../interfaces"
import { UserRepository } from "../repository"
export class UserService {

    public userRepo: UserRepository

    constructor() {
        this.userRepo = new UserRepository()
    }

    public addNewUser(payload: UserModel) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.userRepo.addNewUser(payload)
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    public async getAllUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.userRepo.getAllUser()
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }
}