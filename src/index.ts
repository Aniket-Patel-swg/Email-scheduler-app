import { app } from "./app";
import { connectDB } from "./db";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log("Error starting server", error);
    }
}).catch((error) => {
    console.log("Error connecting to MongoDB", error);
});
