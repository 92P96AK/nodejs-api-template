import express, { Router } from "express";
import { userController } from "../controllers";

const userRouter: Router = express.Router();

userRouter.get("/", userController.getOneuser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/create", userController.createUser);

export default userRouter;