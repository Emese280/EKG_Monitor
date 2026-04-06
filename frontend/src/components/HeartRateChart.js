import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  interaction: { mode: 'index', intersect: false },
  scales: {
    x: {
      ticks: { color: '#64748b', maxTicksLimit: 8, font: { size: 11 } },
      grid: { color: 'rgba(100,116,139,0.12)' },
    },
    y: {
      min: 40,
      max: 120,
      ticks: { color: '#64748b', font: { size: 11 } },
      grid: { color: 'rgba(100,116,139,0.12)' },
    },
  },
  plugins: {
    legend: { labels: { color: '#cbd5e1', font: { size: 12 } } },
  },
};

function HeartRateChart({ timeLabels, data }) {
  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Pulzus (bpm)',
        data,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.08)',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return React.createElement(
    'div',
    { className: 'chart-card' },
    React.createElement(
      'h3',
      { className: 'chart-card__title' },
      React.createElement('span', { className: 'chart-card__dot', style: { background: '#ef4444' } }),
      'Pulzusszám'
    ),
    React.createElement(
      'div',
      { className: 'chart-card__body' },
      React.createElement(Line, { data: chartData, options: OPTIONS })
    )
  );
}

export default HeartRateChart;
