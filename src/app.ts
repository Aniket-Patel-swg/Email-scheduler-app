import express, { NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { APIRespone } from "./utils/APIReseponse/apiResponse";
import { CustomError } from "./utils/errorHandling/exceptions";
import authRoutes from "./routes/auth.routes";
import emailRoutes from "./routes/email.routes";
import { specs } from './utils/swagger/swagger.config';

dotenv.config();

export const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

// Swagger documentation route
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
    console.log("Welcome to the email scheduling application");
    res.send(new APIRespone(200, "Welcome to the email scheduling application"));
});

app.use("/v1/auth", authRoutes);
app.use("/v1/emails", emailRoutes);

app.use((err: any, req: any, res: any, next: NextFunction) => {
    console.log('error occured', err);
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err.serializeErrors());
    }
    res.status(500).json({ message: "Internal Server Error" });
});

export default app;