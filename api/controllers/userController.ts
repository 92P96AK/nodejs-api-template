import { v4 as uuidv4 } from 'uuid';
import { UserService } from "../services";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from '@prisma/client';
const TOKEN_VALID_DAYS = 30;
const JWT_SECRET = "this is secret";
export class UserController {

    public async addNewUser(req: any, res: any) {
        try {
            const userService: UserService = new UserService();
            const payload: User = req.body;
            const checkpayload: any = {
                email: payload.email,
                username: payload.username
            }
            const dbUser = await userService.getOneUser(checkpayload)
            if (dbUser) throw {
                message: "Email or username already exist"
            }
            payload.id = uuidv4();
            payload.disabled = false;
            payload.isCreator = false;
            payload.verified = false;
            const salt = bcrypt.genSaltSync(10);
            payload.password = await bcrypt.hash(payload.password!, salt);
            const user = await userService.addNewUser(payload);
            const expireOn = Math.floor(Date.now() / 1000) + (60 * 60 * TOKEN_VALID_DAYS);

            res.apiSuccess({
                message: "User Signed Up Successfully",
                data: {
                    user,
                    token: jwt.sign({
                        exp: expireOn,
                        data: user
                    }, JWT_SECRET),
                    expireOn
                },
                status: {
                    code: 200,
                    success: true
                }
            })
        } catch (error: any) {
            res.apiFail({
                message: error?.message || "Error while adding user ",
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
            // need to implement pagination
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
                message: "Error While Fetching Users",
                error,
                status: {
                    code: 404,
                    success: false
                }
            })
        }
    }

    public async login(req: any, res: any) {
        try {
            const userService: UserService = new UserService()
            const { email, password } = req.body
            const payload: any = {
                email,
            }
            const user = await userService.getOneUser(payload)
            if (!user || user.disabled) throw {
                message: "Invalid Login Credential"
            }
            if (!bcrypt.compareSync(password, user.password!)) {
                throw {
                    message: "Invalid Login Credential"
                }
            }
            const expireOn = Math.floor(Date.now() / 1000) + (60 * 60 * TOKEN_VALID_DAYS);

            res.apiSuccess({
                message: "Loggedin Successfully",
                data: {
                    user,
                    token: jwt.sign({
                        exp: expireOn,
                        data: user
                    }, JWT_SECRET),
                    expireOn
                },
                status: {
                    code: 200,
                    success: true
                }
            })

        } catch (error) {
            res.apiFail({
                message: "Invalid Login Credential",
                error,
                status: {
                    code: 404,
                    success: false
                }
            })
        }
    }
}