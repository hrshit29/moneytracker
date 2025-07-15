"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("./models/User"));
const config_1 = require("./config");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        const user = yield User_1.default.findById(decoded.id);
        if (!user)
            return res.status(401).json({ message: 'User not found' });
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
exports.authMiddleware = authMiddleware;
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { UserModel } from "./models/User"; // Make sure User model is exported properly
// import { UserType } from "./models/User";  // Import user type if defined
// interface AuthRequest extends Request {
//   user?: UserType | null;
// }
// export const authMiddleware = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) {
//     res.status(401).send({ message: "Not authorized" });
//     return;
//   }
//   const token = authHeader.replace("Bearer ", "");
//   if (!token) {
//     res.status(401).send({ message: "Not authorized" });
//     return;
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       id: string;
//     };
//     const user = await UserModel.findById(decoded.id);
//     if (!user) {
//       res.status(401).send({ message: "User not found" });
//       return;
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).send({ message: "Invalid token" });
//   }
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import { JWT_PASSWORD } from "./config";
// import { UserModel, UserType } from "./db"; // ✅ import your UserType
// export interface AuthRequest extends Request {
//   user?: UserType; // ✅ Attach full user, not just ID
// }
// export const UserMiddleware = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const header = req.headers["authorization"];
//   if (!header) {
//     return res.status(403).json({
//       message: "No token provided",
//     });
//   }
//   try {
//     const decoded = jwt.verify(header as string, JWT_PASSWORD) as { id: string };
//     const user = await UserModel.findById(decoded.id);
//     if (!user) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.user = user; // ✅ Attach full user object
//     next();
//   } catch (e) {
//     res.status(403).json({ message: "Token invalid" });
//   }
// };
// import {NextFunction ,Request,Response} from"express";
// import jwt from"jsonwebtoken";
// import{JWT_PASSWORD} from"./config";
// export interface AuthRequest extends Request {
//   userId?: string;
// }
// export const UserMiddleware =(req:AuthRequest,res:Response,
//     next:NextFunction)=>{
//         const header=req.headers["authorization"];
//         const decoded=jwt.verify(header as string,JWT_PASSWORD)as{id:string}
//         if(decoded){
//             req.userId =decoded.id;
//             next()
//         }else{
//             res.status(403).json({
//                 message:"You are not Logged in"
//             })
//         }
//     }
