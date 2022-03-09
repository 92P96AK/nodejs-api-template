import { Request } from "express";
import * as jwt from "jsonwebtoken";

export const getOneuser = (req: Request, res: any) => {
    try {
        res.apiSuccess({
            data: "get one user"
        })
    } catch (error) {
        res.apiFail({
            message: "failed",
            status: {
                code: 400
            },
            error
        })
    }
}

export const loginUser = (req: Request, res: any) => {
    try {
        const tokenUser: any = {}
        tokenUser.email = "email"
        tokenUser.id = "12345"
        tokenUser.name = "name"
        const access_token = jwt.sign(tokenUser, "SecretKey", {
            expiresIn: 60 * 60 * 24 * 365, // TOKEN_EXPIRE  day
        });
        res.apiSuccess({
            message: "LoggedIn SuccessFully",
            data: access_token
        })
    } catch {
        res.apiFail({
            message: "Login User Failed",
            status: {
                code: 400
            },
            error: {
                message: "Login User Failed"
            }
        })
    }
};