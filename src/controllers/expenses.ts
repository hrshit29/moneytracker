import { Request, Response } from "express";
import Expense from "../models/expense";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware";

export const addExpense = async (req: AuthRequest, res: Response): Promise<void> => {
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
    const expense = new Expense({
      title,
      amount,
      category,
      description,
      date,
      userId: req.user!._id
    });

    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const expenses = await Expense.find({ userId: req.user!._id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  try {
    await Expense.deleteOne({ _id: id, userId: req.user!._id });
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};










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
