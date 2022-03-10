import { UserModel } from "../../interfaces"
import { UserService } from "../services"
export class UserController {

    public userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    public async addNewUser(req: any, res: any) {
        try {
            const payload: UserModel = req.body
            await this.userService.addNewUser(payload)
            res.apiSuccess({
                message: "User Added Successfully",
                data: {},
                status: {
                    code: 200,
                    success: true
                }
            })
        } catch (error) {
            console.log(error)
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

    public async getAllUser(req: any, res: any) {
        try {
            const data = await this.userService.getAllUser()
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