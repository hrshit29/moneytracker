import { Request, Response } from "express";
import Income from "../models/income";
import mongoose from "mongoose";
import { AuthRequest } from "../middleware";

export const addIncome = async (req: AuthRequest, res: Response): Promise<void> => {
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
    const income = new Income({
      title,
      amount,
      category,
      description,
      date,
      userId: req.user!._id
    });

    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getIncomes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const incomes = await Income.find({ userId: req.user!._id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteIncome = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  try {
    await Income.deleteOne({ _id: id, userId: req.user!._id });
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};











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
