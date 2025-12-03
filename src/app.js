import express from 'express';
import dotenv from "dotenv";
import appRoutes from "./routes/index.js";
import connectDB from "./config/dataBase.js";

const app = express();
// Load .env variables
dotenv.config();
app.use('/books',appRoutes);


app.use(express.json());
// connect to database
connectDB();

// routes
app.use(appRoutes);

export default app;