import express, { Router } from "express";
import { getOneuser, loginUser } from "../controllers";

const userRouter: Router = express.Router();

userRouter.get("/", getOneuser);
userRouter.post("/login", loginUser);

export default userRouter;