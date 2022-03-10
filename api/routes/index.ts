import { Router } from "express";
import { UserRoutes } from "./userRoutes";

export class Routes {
    public router: Router
    public userRoutes: UserRoutes
    constructor() {
        this.userRoutes = new UserRoutes()
        this.router = Router({ mergeParams: true })
        this.setRoutes()
    }

    public setRoutes() {
        this.router.use("/user", this.userRoutes.userRouter)
    }
}