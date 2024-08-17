// src/components/LoginStatus.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'],
  datasets: [
    {
      label: 'Popularity',
      data: [75, 50, 45, 20, 60], // 예시 데이터
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Most Popular Coding Frameworks',
    },
  },
  layout: {
    padding: {
      top: 180, // 위쪽 패딩을 40px로 설정
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: false,
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

const LoginStatus = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Bar data={data} options={options} style={{ height: '500px', paddingTop: '40px' }} />
    </div>
  );
};

export default LoginStatus;