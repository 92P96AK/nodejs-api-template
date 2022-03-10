import { UserModel } from "../../interfaces"
import { EntityRepository, getRepository } from "typeorm"
import { User } from "../entities/userEntity"

@EntityRepository(User)
export class UserRepository {

    async addNewUser(payload: UserModel) {
        try {
            const userRepo = getRepository(User)
            await userRepo.save(payload)
            return true

        } catch (error) {
            throw error
        }
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