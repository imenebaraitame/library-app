import express from 'express';
import dotenv from "dotenv";
import appRoutes from "./routes/index.js";
import connectDB from "./config/dataBase.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

dotenv.config();// Load .env variables
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
connectDB();

// routes
app.use(appRoutes);

app.use(errorMiddleware);
export default app;