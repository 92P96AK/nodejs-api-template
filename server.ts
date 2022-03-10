import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./api/routes";
import { apiMethods } from "./api/middlewares/apiMethod"
import { requestQueryTransformer } from "./api/middlewares/apiUtils"
import { dbCreateConnection } from "./infrastructure/db";

const app: Application = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Oops ! Server is Creashed")
});
app.use("/api/v1", requestQueryTransformer, apiMethods, router);
app.use((req: Request, res: Response, next: NextFunction) => {
    next({
        message: "Route Not Found",
        status: {
            code: 404,
            success: false
        },
        error: {}
    });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error?.status?.code || 404).json(error)
});
app.listen(9000, async () => {
    try {
        await dbCreateConnection();
        console.log(`Server is running at 9000`);
    } catch (error) {
        console.log(error)
    }
});


