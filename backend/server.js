import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

import { connectDB } from './config/db.js';

import authRouter from './routes/authroutes.js';
import userRouter from './routes/user routes.js';
import propertyRouter from './routes/propertyroutes.js';
import inquiryRouter from './routes/inquiryroutes.js';
import wishlistRouter from './routes/wishlistroutes.js';
import chatRouter from "./routes/chatroutes.js";
import contactRouter from './routes/contactroutes.js';
import adminRouter from './routes/adminroutes.js';
import businessProfileRoutes from "./routes/businessProfileRoutes.js";
import propertyBusinessLinkRoutes from "./routes/propertybusinesslinkroutes.js";

dotenv.config();

const app = express();
const PORT =  5000;

// DB
connectDB();

// Middlewares
const allowedOrigins= [
    "http://localhost:5173",
].filter(Boolean);
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)){
      callback(null,true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property",propertyRouter);
app.use("/api/inquiry", inquiryRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/propertybusinesslink", propertyBusinessLinkRoutes);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);
app.use("/api/business-profile", businessProfileRoutes);
app.get('/', (req, res) => {
    res.send('API WORKING');
  });


const server = http.createServer(app);
//socket.io setup

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket)=> {
  socket.on("joinChat",(chatId) => {
    socket.join(chatId);
  });
   socket.on("sendMessage", (data) =>{
    io.to(data.chatId).enit("receiveMessage", data);
   });

   socket.on("disconnect",() =>{

   });
})

server.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});

