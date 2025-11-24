import express from "express";
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // parse JSON
app.use(cookieParser());


app.use("/api/auth", authRoutes);

// Connect to DB first, then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server running on PORT:", PORT);
    });
}).catch((err) => {
    console.error("Failed to start server:", err);
});
