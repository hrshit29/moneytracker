import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { trash } from '../help/icons';

type Props = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
  deleteItem: (id: string) => Promise<void>;
};

const IncomeItem: React.FC<Props> = ({
  id,
  title,
  description,
  amount,
  date,
  type,
  category,
  deleteItem,
}) => {
  const isExpense = type === 'expense';

  const amountColor = isExpense ? 'text-red-600' : 'text-green-600';

  return (
    <div
      className={`
        flex flex-col gap-2 p-4 rounded-xl border shadow hover:shadow-lg transition
        bg-pink-100 dark:bg-pink-800 border-pink-300 dark:border-pink-600
      `}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-8 rounded-full bg-white/80 dark:bg-white"
          ></div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
            {description && (
              <p className="text-gray-600 dark:text-gray-300 text-xs">{description}</p>
            )}
          </div>
        </div>

        <div className="text-right">
          <p className={`text-lg font-bold ${amountColor}`}>
            {isExpense ? '-' : '+'} ₹{amount.toFixed(2)}
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-xs">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex justify-between text-gray-700 dark:text-gray-200 text-xs">
        <span>Category: {category}</span>
        <button
          onClick={() => deleteItem(id)}
          className="text-red-600 hover:text-red-700 transition"
        >
          {trash}
        </button>
      </div>
    </div>
  );
};

export default IncomeItem;
