"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const transaction_1 = __importDefault(require("./routes/transaction"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.set('trust proxy', true); //
// Routes
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1", transaction_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect("mongodb://localhost:27017/expenses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) // 👈 Cast for strict TS
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch((error) => {
    console.error("MongoDB connection error:", error);
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// import express from"express";
// import mongoose from "mongoose";
// import jwt from"jsonwebtoken";
// import{UserModel,ContentModel} from "./db";
// import{JWT_PASSWORD} from"./config";
// import{UserMiddleware} from "./middleware"
// import { AuthRequest } from "./middleware";
// import { Response } from "express";
// const app =express();
// app.use(express.json());
// app.post("/api/v1/auth/signup", async(req,res)=>{
//     const username=req.body.username;
//     const password=req.body.password;
//     if(!username||!password){
//         return res.status(400).json({error:'username and password are required'})
//     }
//     try{
//         await UserModel.create({
//         username:username,
//         password:password
//     })
//     res.json({
//         message:"user signed up"
//     })
//     } catch(e){
//         res.status(411).json({
//             message:"User already exists"
//         })
//     }
// })
// app.post("/api/v1/auth/login",async (req,res)=>{
//     const username=req.body.username;
//     const password=req.body.password;
//     const existingUser=await UserModel.findOne({
//         username,password
//     })
//     if(existingUser){
//         const token=jwt.sign({
//             id:existingUser._id
//         } ,JWT_PASSWORD)
//         res.json({
//             token
//         })
//     } else{
//         res.status(403).json({
//             message:"incorrect credentials"
//         })
//     }
// })
// app.get("/profile",UserMiddleware,(req,res)=>{
//     res.send(req.userId)
// })
// app.post("/api/v1/expense",UserMiddleware,async(req:AuthRequest,res:Response)=>{
//   const title= req.body.title;
//   const amount= req.body.amount;
//   const category= req.body.category;
//   const date=req.body.date;
//    await ContentModel.create({
//     title,
//     amount,
//     category,
//     date,
//     userId:req.userId
//    })
//    return res.json({
//      message:"content added"
//    })
// })
// app.get("/api/v1/expense",UserMiddleware,async (req :AuthRequest,res:Response)=>{
//     const userId=req.userId;
//     const content=await ContentModel.find({
//         userId:userId
//     }).populate("userId","username")
//    res.json({
//       content
//    })
//    })
// app.delete("/api/v1/expense",UserMiddleware,async (req :AuthRequest,res:Response)=>{
//     const contentId=req.body.contentId;
//     await ContentModel.deleteOne({
//         _id:contentId,
//         userId:req.userId
//     })
//    res.json({
//       message:"deleted"
//    })
//    })
// app.listen(5000);
