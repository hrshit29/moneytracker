import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import IncomeItem from './IncomeItem';

const Transactions: React.FC = () => {
  const { incomes, expenses, deleteIncome, deleteExpense } = useGlobalContext();

  // Combine incomes & expenses, sorted by newest first
  const allTransactions = [...incomes, ...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen w-full px-4 py-8 bg-white dark:bg-gray-900 transition-colors overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-10">
        All Transactions
      </h1>

      <div className="max-w-5xl mx-auto space-y-5">
        {allTransactions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center text-gray-500 dark:text-gray-400 shadow-sm">
            No transactions found.
          </div>
        ) : (
          allTransactions.map((tx) => (
            <div
              key={tx._id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5
              shadow hover:shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1"
            >
              <IncomeItem
                id={tx._id}
                title={tx.title}
                description={tx.description}
                amount={tx.amount}
                date={tx.date}
                type={tx.type}
                category={tx.category}
                deleteItem={tx.type === 'expense' ? deleteExpense : deleteIncome}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
