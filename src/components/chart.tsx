import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { useGlobalContext } from '../context/GlobalContext';
import { useTheme } from '../context/ThemeContext';
import { dateFormat } from '../help/date';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const Chart: React.FC = () => {
  const { incomes, expenses } = useGlobalContext();
  const { theme } = useTheme();
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const isDark = theme === 'dark';

  const textColor = isDark ? '#f9fafb' : '#111827';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const tooltipBg = isDark ? '#334155' : '#fef2f8';       // deep blue vs light pink
  const tooltipTitle = isDark ? '#fff' : '#111827';
  const tooltipBody = isDark ? '#e2e8f0' : '#475569';

  const data = {
    labels: incomes.map((inc) => dateFormat(inc.date)),
    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount),
        fill: true,
        backgroundColor: chartType === 'line' ? 'rgba(34,197,94,0.1)' : 'rgba(34,197,94,0.4)',
        borderColor: 'rgba(34,197,94,1)',
        pointBackgroundColor: 'rgba(34,197,94,1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4ade80',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        fill: true,
        backgroundColor: chartType === 'line' ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.4)',
        borderColor: 'rgba(239,68,68,1)',
        pointBackgroundColor: 'rgba(239,68,68,1)',
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#f87171',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: {
        labels: { color: textColor, font: { weight: 500 } },
        position: 'top' as const,
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipTitle,
        bodyColor: tooltipBody,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { weight: 500 } },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: textColor, font: { weight: 500 } },
        grid: { color: gridColor },
      },
    },
  };

  return (
    <div
      className={`relative flex flex-col border rounded-2xl shadow-lg transition-shadow duration-300 ease-in-out p-4 animate-fadeIn
        ${isDark ? 'bg-black border-pink-900 hover:shadow-pink-700/30' : 'bg-white border-pink-200 hover:shadow-pink-300/30'}
      `}
      style={{ height: '400px', minHeight: '300px' }}
    >
      {/* Toggle button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setChartType(prev => prev === 'line' ? 'bar' : 'line')}
          className={`px-4 py-2 text-white rounded-full transition duration-200 text-sm font-medium
            ${isDark ? 'bg-pink-600 hover:bg-pink-700' : 'bg-pink-500 hover:bg-pink-600'}
          `}
        >
          Switch to {chartType === 'line' ? 'Bar' : 'Line'} Chart
        </button>
      </div>

      <div className="relative flex-1">
        {chartType === 'line' ? (
          <Line data={data} options={options} />
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </div>
  );
};

export default Chart;
