import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./api/routes";
import { apiMethods } from "./api/middlewares/apiMethod"

const app: Application = express();

app.use(cors())
app.use(function (req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    if (req.method === 'OPTIONS') {
        res.status(200).header('Content-Length', '0')
            .header('Access-Control-Allow-Origin', '*')
            .header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
            .send()
    }
    next();
});
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
app.use("/api/v1", apiMethods, router);
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
    console.log(`Server is running at 9000`);
});