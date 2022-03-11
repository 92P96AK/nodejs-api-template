import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan"
import { apiMethods } from "./middlewares/apiMethod";
import { requestQueryTransformer } from "./middlewares/apiUtils";
import { ServerEnv } from "../interfaces";
import { Routes } from "./routes";
import { BaseRepository } from "./repository";

export class Server {
    private app: Application
    private routes: Routes
    private env: ServerEnv
    constructor() {
        this.app = express()
        this.routes = new Routes()
        this.loadEnv()
        this.use()
        this.configuration()
        new BaseRepository().configureSoftDelete()
    }

    private loadEnv() {
        this.env = { port: 9000 }
    }

    private use() {
        this.app.use(cors())
        this.app.use(morgan('combined'))
        this.app.use(express.json());
        this.app.use(bodyParser.json({ limit: '150mb' }));
        this.app.use(bodyParser.urlencoded({
            limit: '150mb',
            extended: true
        }));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use("/api/v1/", requestQueryTransformer, apiMethods, this.routes.router)
        this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.status(200).send("Oops ! Server is Creashed")
        });
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            next({
                message: "Route Not Found",
                status: {
                    code: 404,
                    success: false
                },
                error: {}
            });
        });
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            res.status(error?.status?.code || 404).json(error)
        });

    }

    private configuration() {
        this.app.set("port", this.env.port)

    }

    public run() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`.............. momentonft running at port ${this.app.get("port")}  .........`);
        })
    }
}