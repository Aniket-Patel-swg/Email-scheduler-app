import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {

        if (MONGO_URI == null) {
            throw new Error("MONGO_URI is not set");
        }

        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}