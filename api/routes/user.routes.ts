import express, { Router } from "express";
import { getOneuser } from "../controllers";

const userRouter: Router = express.Router();

userRouter.get("/", getOneuser);

export default userRouter;