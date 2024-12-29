import { Router } from "express";
import { EmailController } from "../controller/email.controller";
import { authenticateToken } from "../utils/middleware/auth.middleware";

const router = Router();
const emailController = new EmailController();

router.post("/schedule-email", authenticateToken, emailController.scheduleEmail);
router.get("/scheduled-emails", authenticateToken, emailController.getScheduledEmails);
router.get("/scheduled-emails/:id", authenticateToken, emailController.getEmailById);
router.delete("/scheduled-emails/:id", authenticateToken, emailController.cancelEmail);

export default router;

