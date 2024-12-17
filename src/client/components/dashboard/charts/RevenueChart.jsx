import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RevenueChart({ data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Revenue',
        data: data.map((d) => d.revenue),
        borderColor: 'rgb(2, 132, 199)',
        backgroundColor: 'rgba(2, 132, 199, 0.5)',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <Line options={options} data={chartData} />
    </div>
  );
}

export default RevenueChart;