import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { connectDB } from './config/db.js';
import authRouter from './routes/authroutes.js';
import userRouter from './routes/user routes.js';
import propertyRouter from './routes/propertyroutes.js';
import inquiryRouter from './routes/inquiryroutes.js';

dotenv.config();

const app = express();
const PORT =  5000;

// DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property",propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.get('/', (req, res) => {
    res.send('API WORKING');
  });


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});

