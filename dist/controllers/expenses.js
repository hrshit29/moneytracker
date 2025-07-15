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
exports.deleteExpense = exports.getExpense = exports.addExpense = void 0;
const expense_1 = __importDefault(require("../models/expense"));
const mongoose_1 = __importDefault(require("mongoose"));
const addExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, amount, category, description, date } = req.body;
    if (!title || !category || !description || !date) {
        res.status(400).json({ message: "All fields are required!" });
        return;
    }
    if (typeof amount !== "number" || amount <= 0) {
        res.status(400).json({ message: "Amount must be a positive number!" });
        return;
    }
    try {
        const expense = new expense_1.default({
            title,
            amount,
            category,
            description,
            date,
            userId: req.user._id
        });
        yield expense.save();
        res.status(200).json({ message: "Expense Added" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.addExpense = addExpense;
const getExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield expense_1.default.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getExpense = getExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
    }
    try {
        yield expense_1.default.deleteOne({ _id: id, userId: req.user._id });
        res.status(200).json({ message: "Expense Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.deleteExpense = deleteExpense;
// import { Request, Response } from "express";
// import Expense from "../models/expense"; 
// import mongoose from "mongoose";
// // POST /api/expense
// export const addExpense = async (req: Request, res: Response): Promise<void> => {
//   const { title, amount, category, description, date } = req.body;
//   // Validation
//   if (!title || !category || !description || !date) {
//     res.status(400).json({ message: "All fields are required!" });
//     return;
//   }
//   if (typeof amount !== "number" || amount <= 0) {
//     res.status(400).json({ message: "Amount must be a positive number!" });
//     return;
//   }
//   try {
//     const expense = new Expense({
//       title,
//       amount,
//       category,
//       description,
//       date,
//     });
//     await expense.save();
//     res.status(200).json({ message: "Expense Added" });
//     console.log(expense);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // GET /api/expense
// export const getExpense = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const expenses = await Expense.find().sort({ createdAt: -1 });
//     res.status(200).json(expenses);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // DELETE /api/expense/:id
// export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ message: "Invalid ID" });
//     return;
//   }
//   try {
//     await Expense.findByIdAndDelete(id);
//     res.status(200).json({ message: "Expense Deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// import { Request, Response } from "express";
// import Expense from "../models/expense"; 
// import mongoose from "mongoose";
// // POST /api/expense
// export const addExpense = async (req: Request, res: Response): Promise<void> => {
//   const { title, amount, category, description, date } = req.body;
//   // Validation
//   if (!title || !category || !description || !date) {
//     res.status(400).json({ message: "All fields are required!" });
//     return;
//   }
//   if (typeof amount !== "number" || amount <= 0) {
//     res.status(400).json({ message: "Amount must be a positive number!" });
//     return;
//   }
//   try {
//     const expense = new ContentModel({
//       title,
//       amount,
//       category,
//       description,
//       date,
//     });
//     await expense.save();
//     res.status(200).json({ message: "Expense Added" });
//     console.log(expense);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // GET /api/expense
// export const getExpense = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const expenses = await ContentModel.find().sort({ createdAt: -1 });
//     res.status(200).json(expenses);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // DELETE /api/expense/:id
// export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ message: "Invalid ID" });
//     return;
//   }
//   try {
//     await ContentModel.findByIdAndDelete(id);
//     res.status(200).json({ message: "Expense Deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
