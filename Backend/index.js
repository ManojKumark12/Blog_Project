import express, { Router } from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
import mongoose from 'mongoose';
import router from './routes/Auth.route.js';
import userRouter from './routes/User.route.js';
dotenv.config();
const app=express();
app.use(cookieParser());//////////////////////////
app.use(express.json());//////////////////////
app.use(cors({///////////////////////////////////
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use('/api/auth',router);
app.use('/api/user',userRouter);
await mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("created")).catch(()=>console.log("error"));
app.listen(process.env.PORT,()=>{
    console.log("Listening");
})



// 1:42 min-error

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const msg=err.message || "Internal Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message:msg
    })
})