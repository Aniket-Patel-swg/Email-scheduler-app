import express, { NextFunction } from "express";
import dotenv from "dotenv";
import { APIRespone } from "./utils/APIReseponse/apiResponse";
import { CustomError } from "./utils/errorHandling/exceptions";
import authRoutes from "./routes/auth.routes";

dotenv.config();

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log("Welcome to the email scheduling application");
    res.send(new APIRespone(200, "Welcome to the email scheduling application"));
});


app.use("/v1/auth", authRoutes);

app.use((err: any, req: any, res: any, next: NextFunction) => {
    console.log('error occured');
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.serializeErrors());
    }
    res.status(500).json({ message: "Internal Server Error" });
});

export default app;