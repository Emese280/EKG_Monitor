import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 200 },
  scales: {
    x: { display: false },
    y: {
      min: -0.6,
      max: 2.0,
      ticks: { color: '#64748b', font: { size: 10 } },
      grid: { color: 'rgba(34,197,94,0.08)' },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
};

function ECGChart({ ecgBuffer }) {
  const chartData = {
    labels: ecgBuffer.map((_, i) => i),
    datasets: [
      {
        data: ecgBuffer,
        borderColor: '#22c55e',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.15,
      },
    ],
  };

  return React.createElement(
    'div',
    { className: 'chart-card chart-card--ecg' },
    React.createElement(
      'h3',
      { className: 'chart-card__title' },
      React.createElement('span', { className: 'chart-card__dot ecg-pulse', style: { background: '#22c55e' } }),
      'EKG Görbe — élő'
    ),
    React.createElement(
      'div',
      { className: 'chart-card__body chart-card__body--ecg' },
      React.createElement(Line, { data: chartData, options: OPTIONS })
    )
  );
}

export default ECGChart;
