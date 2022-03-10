import { v4 as uuidv4 } from 'uuid';
import { UserModel } from "../../interfaces"
import { UserService } from "../services"
export class UserController {
    constructor() { }

    public async addNewUser(req: any, res: any) {
        try {
            const userService: UserService = new UserService()
            const payload: UserModel = req.body
            payload.id = uuidv4()
            payload.disabled = false
            payload.isCreator = false
            payload.verified = false
            // payload.createdAt= 
            const data = await userService.addNewUser(payload)
            res.apiSuccess({
                message: "User Added Successfully",
                data,
                status: {
                    code: 200,
                    success: true
                }
            })
        } catch (error) {
            res.apiFail({
                message: "Error while adding user ",
                error,
                status: {
                    code: 404,
                    success: false
                }
            })
        }
    }

    async getAllUser(req: any, res: any) {
        try {
            const userService: UserService = new UserService()
            const data = await userService.getAllUser()
            res.apiSuccess({
                message: "User Fetched Successfully",
                data,
                status: {
                    code: 200,
                    success: true
                }
            })
        } catch (error) {
            res.apiFail({
                message: "Error while fetching user ",
                error,
                status: {
                    code: 404,
                    success: false
                }
            })
        }
    }
}