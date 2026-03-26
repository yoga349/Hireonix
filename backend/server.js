import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Fix __dirname (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Database connection
connectDB();
//Routes
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




// Server
const port = process.env.PORT || 2000;

app.listen(port, () =>
    console.log(`server is running on port ${port}`)
);