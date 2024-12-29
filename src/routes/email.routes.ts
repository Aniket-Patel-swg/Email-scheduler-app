import { Router } from "express";
import { EmailController } from "../controller/email.controller";
import { authenticateToken } from "../utils/middleware/auth.middleware";

const router = Router();
const emailController = new EmailController();

/**
 * @openapi
 * /emails/schedule-email:
 *   post:
 *     tags:
 *       - Emails
 *     summary: Schedule a new email
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - body
 *               - scheduledTime
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               body:
 *                 type: string
 *               scheduledTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Email scheduled successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/schedule-email", authenticateToken, emailController.scheduleEmail);

/**
 * @openapi
 * /emails/scheduled-emails:
 *   get:
 *     tags:
 *       - Emails
 *     summary: Get all scheduled emails
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of scheduled emails
 *       401:
 *         description: Unauthorized
 */
router.get("/scheduled-emails", authenticateToken, emailController.getScheduledEmails);

/**
 * @openapi
 * /emails/scheduled-emails/{id}:
 *   get:
 *     tags:
 *       - Emails
 *     summary: Get a specific scheduled email
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email details
 *       404:
 *         description: Email not found
 */
router.get("/scheduled-emails/:id", authenticateToken, emailController.getEmailById);

/**
 * @openapi
 * /emails/scheduled-emails/{id}:
 *   delete:
 *     tags:
 *       - Emails
 *     summary: Cancel a scheduled email
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email cancelled successfully
 *       404:
 *         description: Email not found
 */
router.delete("/scheduled-emails/:id", authenticateToken, emailController.cancelEmail);

export default router;

