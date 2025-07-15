import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { useTheme } from '../context/ThemeContext';

interface HistoryItem {
  _id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
}

const History: React.FC = () => {
  const { transactionHistory } = useGlobalContext();
  const { theme } = useTheme();

  const history: HistoryItem[] = transactionHistory();

  // Theme-based card styling
  const cardBg = theme === 'dark'
    ? 'bg-gray-800/80 border-gray-700 text-gray-200'
    : 'bg-white/80 border-gray-200 text-gray-800';

  const amountText = (isExpense: boolean) =>
    isExpense ? 'text-red-400' : 'text-green-500';

  return (
    <div className="flex flex-col gap-5 animate-fadeIn">
      <h2 className="text-xl font-semibold text-center mb-2 text-gray-700 dark:text-gray-200">
        Recent History
      </h2>

      {history.length === 0 ? (
        <div
          className={`border rounded-2xl shadow backdrop-blur-md ${cardBg} 
            p-5 text-center text-gray-400`}
        >
          No recent transactions.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map(({ _id, title, amount, type }) => {
            const isExpense = type === 'expense';
            const formattedAmount = isExpense
              ? `- ₹${amount <= 0 ? 0 : amount}`
              : `+ ₹${amount <= 0 ? 0 : amount}`;

            return (
              <div
                key={_id}
                className={`
                  flex justify-between items-center border rounded-xl 
                  backdrop-blur-md shadow transition-all duration-200 ease-in-out
                  hover:shadow-lg hover:scale-[1.02]
                  px-4 py-3 ${cardBg}
                `}
              >
                <span className={`font-medium truncate ${amountText(isExpense)}`}>
                  {title}
                </span>
                <span className={`font-semibold ${amountText(isExpense)}`}>
                  {formattedAmount}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
