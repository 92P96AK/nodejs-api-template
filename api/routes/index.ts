import { Router } from "express";
import { UserRoutes } from "./userRoutes";
export class Routes {
    public router: Router
    public userRoutes: UserRoutes
    constructor() {
        this.router = Router({ mergeParams: true })
        this.userRoutes = new UserRoutes()
        this.setRoutes()
    }

    public setRoutes() {
        this.router.use("/user", this.userRoutes.userRouter)
    }
}
