import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    userEmail: { type: String, required: true }, // Store user's email from token
    subject: { type: String, required: true },
    body: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'SENT', 'FAILED', 'CANCELLED'],
        default: 'PENDING'
    },
    sentAt: { type: Date },
}, { timestamps: true });

export const Email = mongoose.model("email", emailSchema);
