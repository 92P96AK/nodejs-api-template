import { UserModel } from "../../interfaces"
export class UserRepository {

    constructor() { }

    public addNewUser(payload: UserModel) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(payload)
                resolve(payload)
            } catch (error) {
                reject(error)
            }
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