import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

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
      min: 50,
      max: 160,
      ticks: { color: '#64748b', font: { size: 11 } },
      grid: { color: 'rgba(100,116,139,0.12)' },
    },
  },
  plugins: {
    legend: { labels: { color: '#cbd5e1', font: { size: 12 } } },
  },
};

function BloodPressureChart({ timeLabels, bpHistory }) {
  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Szisztolés (mmHg)',
        data: bpHistory.map((b) => b.systolic),
        borderColor: '#f97316',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
      {
        label: 'Diasztolés (mmHg)',
        data: bpHistory.map((b) => b.diastolic),
        borderColor: '#fb923c',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
        borderDash: [6, 4],
      },
    ],
  };

  return React.createElement(
    'div',
    { className: 'chart-card' },
    React.createElement(
      'h3',
      { className: 'chart-card__title' },
      React.createElement('span', { className: 'chart-card__dot', style: { background: '#f97316' } }),
      'Vérnyomás'
    ),
    React.createElement(
      'div',
      { className: 'chart-card__body' },
      React.createElement(Line, { data: chartData, options: OPTIONS })
    )
  );
}

export default BloodPressureChart;
