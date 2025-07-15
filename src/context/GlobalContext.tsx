import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { INCOME_API, EXPENSE_API } from '../api/apis';

export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  type: 'income' | 'expense';
  createdAt: string;
}

interface GlobalContextType {
  incomes: Transaction[];
  expenses: Transaction[];
  error: string | null;

  addIncome: (income: Partial<Transaction>) => Promise<void>;
  getIncomes: () => Promise<void>;
  deleteIncome: (id: string) => Promise<void>;
  totalIncome: () => number;

  addExpense: (expense: Partial<Transaction>) => Promise<void>;
  getExpenses: () => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  totalExpenses: () => number;

  totalBalance: () => number;
  transactionHistory: () => Transaction[];

  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: ProviderProps) {
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  // ✅ helper to get token
  const getToken = () => localStorage.getItem('token');

  // 📌 INCOME methods
  const addIncome = async (income: Partial<Transaction>) => {
    try {
      const token = getToken();
      const payload = {
        title: income.title,
        amount: Number(income.amount),
        category: income.category,
        description: income.description,
        date: income.date,
      };

      console.log('Adding income:', payload);
      await axios.post(INCOME_API.ADD, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getIncomes();
    } catch (err: any) {
      console.error('Error adding income:', err.response?.data);
      setError(err.response?.data?.message || 'Error adding income');
    }
  };

  const getIncomes = async () => {
    try {
      const token = getToken();
      const response = await axios.get<Transaction[]>(INCOME_API.GET, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(response.data);
    } catch (err: any) {
      console.error('Error fetching incomes:', err.response?.data);
      setError(err.response?.data?.message || 'Error fetching incomes');
    }
  };

  const deleteIncome = async (id: string) => {
    try {
      const token = getToken();
      await axios.delete(INCOME_API.DELETE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getIncomes();
    } catch (err: any) {
      console.error('Error deleting income:', err.response?.data);
      setError(err.response?.data?.message || 'Error deleting income');
    }
  };

  const totalIncome = () =>
    incomes.reduce((total, item) => total + item.amount, 0);

  // 📌 EXPENSE methods
  const addExpense = async (expense: Partial<Transaction>) => {
    try {
      const token = getToken();
      const payload = {
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
        description: expense.description,
        date: expense.date,
      };

      console.log('Adding expense:', payload);
      await axios.post(EXPENSE_API.ADD, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getExpenses();
    } catch (err: any) {
      console.error('Error adding expense:', err.response?.data);
      setError(err.response?.data?.message || 'Error adding expense');
    }
  };

  const getExpenses = async () => {
    try {
      const token = getToken();
      const response = await axios.get<Transaction[]>(EXPENSE_API.GET, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (err: any) {
      console.error('Error fetching expenses:', err.response?.data);
      setError(err.response?.data?.message || 'Error fetching expenses');
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const token = getToken();
      await axios.delete(EXPENSE_API.DELETE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      await getExpenses();
    } catch (err: any) {
      console.error('Error deleting expense:', err.response?.data);
      setError(err.response?.data?.message || 'Error deleting expense');
    }
  };

  const totalExpenses = () =>
    expenses.reduce((total, item) => total + item.amount, 0);

  // 📌 balance & history
  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = (): Transaction[] => {
    const all = [...incomes, ...expenses];
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}
