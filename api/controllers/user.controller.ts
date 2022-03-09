import { Request } from "express";

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