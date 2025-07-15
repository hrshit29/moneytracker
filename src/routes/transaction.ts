import express from 'express';
import {
  addIncome,
  getIncomes,
  deleteIncome
} from '../controllers/incomes';
import {
  addExpense,
  getExpense,
  deleteExpense
} from '../controllers/expenses';
import { authMiddleware } from '../middleware';

const router = express.Router();

router.post('/add-income', authMiddleware, addIncome);
router.get('/get-incomes', authMiddleware, getIncomes);
router.delete('/delete-income/:id', authMiddleware, deleteIncome);

router.post('/add-expense', authMiddleware, addExpense);
router.get('/get-expenses', authMiddleware, getExpense);
router.delete('/delete-expense/:id', authMiddleware, deleteExpense);

export default router;





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
