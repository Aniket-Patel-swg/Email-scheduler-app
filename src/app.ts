import express, { NextFunction } from "express";
import dotenv from "dotenv";
import { APIRespone } from "./utils/APIReseponse/apiResponse";
import { CustomError } from "./utils/errorHandling/exceptions";

dotenv.config();

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log("Welcome to the Conspiracy API");
    res.send(new APIRespone(200, "Welcome to the Conspiracy API"));
});


app.use((err: any, req: any, res: any, next: NextFunction) => {
    console.log('error occured');
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.serializeErrors());
    }
    res.status(500).json({ message: "Internal Server Error" });
});

export default app;