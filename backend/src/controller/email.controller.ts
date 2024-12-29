import { Request, Response, NextFunction } from "express";
import EmailService from "../services/email.service";
import { BadRequestError } from "../utils/errorHandling/exceptions";
import { APIRespone } from "../utils/APIReseponse/apiResponse";

export class EmailController {
    public async scheduleEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { subject, body, scheduledTime } = req.body;
            const userId = (req as any).user.userId;
            const userEmail = (req as any).user.email; // Get email from token

            if (!subject || !body || !scheduledTime) {
                throw new BadRequestError("Missing required fields", 400);
            }

            const emailService = new EmailService();
            const result = await emailService.scheduleEmail(
                userId,
                userEmail,
                subject,
                body,
                new Date(scheduledTime)
            );

            res.send(new APIRespone(200, "Email scheduled successfully", result));
        } catch (error) {
            next(error);
        }
    }

    public async getScheduledEmails(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const emailService = new EmailService();
            const emails = await emailService.getScheduledEmails(userId);
            res.send(new APIRespone(200, "Emails retrieved successfully", emails));
        } catch (error) {
            next(error);
        }
    }

    public async getEmailById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userId = (req as any).user.userId;
            const emailService = new EmailService();
            const email = await emailService.getEmailById(id, userId);
            res.send(new APIRespone(200, "Email retrieved successfully", email));
        } catch (error) {
            next(error);
        }
    }

    public async cancelEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userId = (req as any).user.userId;
            const emailService = new EmailService();
            const result = await emailService.cancelEmail(id, userId);
            res.send(new APIRespone(200, "Email cancelled successfully", result));
        } catch (error) {
            next(error);
        }
    }
}
