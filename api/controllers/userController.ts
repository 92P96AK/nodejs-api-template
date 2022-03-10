export class UserController {
    constructor() { }

    public addNewUser(req: any, res: any) {
        res.apiSuccess({
            message: "Success",
            data: req.body,
            status: {
                code: 200,
                success: true
            }
        })
    }
    public getAllUser(req: any, res: any) {
        res.apiSuccess({
            message: "Success",
            data: {},
            status: {
                code: 200,
                success: true
            }
        })
    }
}