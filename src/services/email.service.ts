import nodemailer from "nodemailer";
import { Email } from "../model/email.model";
import { BadRequestError } from "../utils/errorHandling/exceptions";
import schedule from "node-schedule";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    public async scheduleEmail(
        userId: string,
        userEmail: string,
        subject: string,
        body: string,
        scheduledTime: Date
    ): Promise<any> {
        try {
            // Create email record
            const email = new Email({
                userId,
                userEmail,
                subject,
                body,
                scheduledTime
            });
            await email.save();

            // Schedule the email
            schedule.scheduleJob(scheduledTime, async () => {
                try {
                    await this.sendEmail(email._id.toString());
                } catch (error) {
                    console.error('Failed to send scheduled email:', error);
                    await Email.findByIdAndUpdate(email._id, { status: 'FAILED' });
                }
            });

            return email;
        } catch (error) {
            throw new BadRequestError("Failed to schedule email", 400);
        }
    }

    private async sendEmail(emailId: string): Promise<void> {
        console.log("Sending email with ID:", emailId);
        const email = await Email.findById(emailId);
        if (!email || email.status !== 'PENDING') return;

        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email.userEmail, // Send to user's email from token
                subject: email.subject,
                text: email.body
            });

            await Email.findByIdAndUpdate(emailId, {
                status: 'SENT',
                sentAt: new Date()
            });
        } catch (error) {
            await Email.findByIdAndUpdate(emailId, { status: 'FAILED' });
            throw error;
        }
    }

    public async getScheduledEmails(userId: string): Promise<any> {
        try {
            return await Email.find({ userId }).sort({ scheduledTime: 1 });
        } catch (error) {
            throw new BadRequestError("Failed to fetch scheduled emails", 400);
        }
    }

    public async getEmailById(emailId: string, userId: string): Promise<any> {
        try {
            const email = await Email.findOne({ _id: emailId, userId });
            if (!email) {
                throw new BadRequestError("Email not found", 404);
            }
            return email;
        } catch (error) {
            throw new BadRequestError("Failed to fetch email details", 400);
        }
    }

    public async cancelEmail(emailId: string, userId: string): Promise<boolean> {
        try {
            const email = await Email.findOne({ _id: emailId, userId });
            if (!email) {
                throw new BadRequestError("Email not found", 404);
            }

            if (email.status !== 'PENDING') {
                throw new BadRequestError("Cannot cancel non-pending email", 400);
            }

            await Email.findByIdAndUpdate(emailId, { status: 'CANCELLED' });

            // Cancel the scheduled job
            const jobs = schedule.scheduledJobs;
            const job = jobs[emailId];
            if (job) {
                job.cancel();
            }

            return true;
        } catch (error) {
            throw new BadRequestError("Failed to cancel email", 400);
        }
    }
}

export default EmailService;
