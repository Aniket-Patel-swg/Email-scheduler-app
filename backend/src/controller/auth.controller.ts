import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../utils/errorHandling/exceptions";
import AuthService from "../services/auth.service";
import { APIRespone } from "../utils/APIReseponse/apiResponse";


export class AuthController {
    public async signup(req: Request, res: Response, next: any) {
        try {
            const { username, password, email } = req.body;

            if (!username || !password || !email) {
                throw new BadRequestError("Username, password and email are required", 400);
            }

            const authService = new AuthService();
            const result = await authService.signup(username, password, email);
            res.send(new APIRespone(200, "User created successfully", result));
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request, res: Response, next: any) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                throw new BadRequestError("Username and password are required", 400);
            }

            const authService = new AuthService();
            const result = await authService.login(username, password);
            res.send(new APIRespone(200, "User logged in successfully", result));
        } catch (error) {
            next(error);
        }
    }
}
