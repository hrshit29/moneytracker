"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const incomes_1 = require("../controllers/incomes");
const expenses_1 = require("../controllers/expenses");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.post('/add-income', middleware_1.authMiddleware, incomes_1.addIncome);
router.get('/get-incomes', middleware_1.authMiddleware, incomes_1.getIncomes);
router.delete('/delete-income/:id', middleware_1.authMiddleware, incomes_1.deleteIncome);
router.post('/add-expense', middleware_1.authMiddleware, expenses_1.addExpense);
router.get('/get-expenses', middleware_1.authMiddleware, expenses_1.getExpense);
router.delete('/delete-expense/:id', middleware_1.authMiddleware, expenses_1.deleteExpense);
exports.default = router;
// import express from 'express';
// import {
//   addIncome,
//   getIncomes,
//   deleteIncome,} from '../controllers/incomes';
// import {
//   addExpense,
//   getExpense,
//   deleteExpense,
// } from '../controllers/expenses';
// const router = express.Router();
// // Income routes
// router.post('/add-income', addIncome);
// router.get('/get-incomes', getIncomes);
// router.delete('/delete-income/:id', deleteIncome);
// // Expense routes
// router.post('/add-expense', addExpense);
// router.get('/get-expenses', getExpense);
// router.delete('/delete-expense/:id', deleteExpense);
// export default router;
