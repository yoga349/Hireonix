import express from 'express';
import dotenv, { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import cors from "cors";
import connectDB from './config/db.js';

dotenv.config();
import authRoutes from "./routes/authRoutes.js";


const app = express();

app.use(
    cors({
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
);
app.use("/api/auth", authRoutes);
connectDB()
const port = process.env.PORT || 2000;

app.listen(port,()=>console.log(`server is running on  port ${port}`));