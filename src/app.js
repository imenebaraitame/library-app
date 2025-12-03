import express from 'express';
import appRoutes from "./routes/index.js";
import connectDB from "./config/dataBase.js";
const app = express();

app.use('/books',appRoutes);


app.use(express.json());
// connect to database
connectDB();

// routes
app.use(appRoutes);

export default app;