import { Router } from "express";
import { UserController } from "../controllers";
export class UserRoutes {
    public userRouter: Router
    public userController: UserController

    constructor() {
        this.userController = new UserController()
        this.userRouter = Router({ mergeParams: true })
        this.setRoutes()
    }

    public setRoutes() {
        this.userRouter.get("/", this.userController.getAllUser)
        this.userRouter.post("/create", this.userController.addNewUser)
    }
}