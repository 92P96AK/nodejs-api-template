import { Router } from "express";
import { UserController } from "../controllers";
class UserRoutes {
    public userRouter: Router

    constructor() {
        this.userRouter = Router({ mergeParams: true })
        this.setRoutes()
    }

    public setRoutes() {
        this.userRouter.get("/", UserController.getAllUser)
        this.userRouter.post("/create", UserController.addNewUser)
        this.userRouter.post("/login", UserController.login)
    }
}

export { UserRoutes }