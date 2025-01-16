import express from 'express';
import authRoutes from "./routes/auth.route.js";

// creates and express app
const app = express()

app.use("/api/auth", authRoutes)

app.listen(5001, () => {
    console.log("server is running on 5173")
})