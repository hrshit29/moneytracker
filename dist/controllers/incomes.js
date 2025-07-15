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
exports.deleteIncome = exports.getIncomes = exports.addIncome = void 0;
const income_1 = __importDefault(require("../models/income"));
const mongoose_1 = __importDefault(require("mongoose"));
const addIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, description, date } = req.body;
    const amount = Number(req.body.amount);
    if (!title || !category || !description || !date || amount === undefined) {
        res.status(400).json({ message: "All fields are required!" });
        return;
    }
    if (typeof amount !== "number" || amount <= 0) {
        res.status(400).json({ message: "Amount must be a positive number!" });
        return;
    }
    try {
        const income = new income_1.default({
            title,
            amount,
            category,
            description,
            date,
            userId: req.user._id
        });
        yield income.save();
        res.status(200).json({ message: "Income Added" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.addIncome = addIncome;
const getIncomes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomes = yield income_1.default.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getIncomes = getIncomes;
const deleteIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: "Invalid ID" });
        return;
    }
    try {
        yield income_1.default.deleteOne({ _id: id, userId: req.user._id });
        res.status(200).json({ message: "Income Deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.deleteIncome = deleteIncome;
// import { Request, Response } from "express";
// import Income from "../models/income"; // ✅ Default import
// import mongoose from "mongoose";
// // POST /api/income
// export const addIncome = async (req: Request, res: Response): Promise<void> => {
//   const { title, category, description, date } = req.body;
//     const amount = Number(req.body.amount); // Convert to number
//   if (!title || !category || !description || !date || amount === undefined) {
//     res.status(400).json({ message: "All fields are required!" });
//     return;
//   }
//   if (typeof amount !== "number" || amount <= 0) {
//     res.status(400).json({ message: "Amount must be a positive number!" });
//     return;
//   }
//   try {
//     const income = new Income({
//       title,
//       amount,
//       category,
//       description,
//       date,
//     });
//     await income.save();
//     res.status(200).json({ message: "Income Added" });
//     console.log(income);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // GET /api/incomes
// export const getIncomes = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const incomes = await Income.find().sort({ createdAt: -1 });
//     res.status(200).json(incomes);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // DELETE /api/income/:id
// export const deleteIncome = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ message: "Invalid ID" });
//     return;
//   }
//   try {
//     await Income.findByIdAndDelete(id);
//     res.status(200).json({ message: "Income Deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// import { Request, Response } from "express";
// import Income from "../models/income"; 
// import mongoose from "mongoose";
// // POST /api/income
// export const addIncome = async (req: Request, res: Response): Promise<void> => {
//   const { title, amount, category, description, date } = req.body;
//   // Validation
//   if (!title || !category || !description || !date || amount === undefined) {
//     res.status(400).json({ message: "All fields are required!" });
//     return;
//   }
//   if (typeof amount !== "number" || amount <= 0) {
//     res.status(400).json({ message: "Amount must be a positive number!" });
//     return;
//   }
//   try {
//     const income = new IncomeModel({
//       title,
//       amount,
//       category,
//       description,
//       date,
//     });
//     await income.save();
//     res.status(200).json({ message: "Income Added" });
//     console.log(income);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // GET /api/incomes
// export const getIncomes = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const incomes = await IncomeModel.find().sort({ createdAt: -1 });
//     res.status(200).json(incomes);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// // DELETE /api/income/:id
// export const deleteIncome = async (req: Request, res: Response): Promise<void> => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400).json({ message: "Invalid ID" });
//     return;
//   }
//   try {
//     await IncomeModel.findByIdAndDelete(id);
//     res.status(200).json({ message: "Income Deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
