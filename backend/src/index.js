import express from 'express';
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from './lib/db.js';

// creates and express app


dotenv.config()
const app = express()

const PORT = process.env.PORT;

// extract json data
app.use(express.json())

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("server is running on " + PORT)
    connectDB()
})