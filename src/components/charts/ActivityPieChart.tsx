import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ActivityDistribution } from '../../types/analytics';
import './ActivityPieChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ActivityPieChartProps {
  data: ActivityDistribution;
  title?: string;
  height?: number;
}

const ActivityPieChart: React.FC<ActivityPieChartProps> = ({
  data,
  title = 'Распределение активности',
  height = 300
}) => {
  const chartData = {
    labels: ['Продуктивная', 'Нейтральная', 'Отвлекающая', 'Перерыв'],
    datasets: [
      {
        data: [data.productive, data.neutral, data.distracting, data.break],
        backgroundColor: [
          '#52c41a', // Зеленый - продуктивная
          '#1890ff', // Синий - нейтральная
          '#ff4d4f', // Красный - отвлекающая
          '#fa8c16'  // Оранжевый - перерыв
        ],
        borderColor: [
          '#389e0d',
          '#096dd9',
          '#d4380d',
          '#d46b08'
        ],
        borderWidth: 2,
        hoverOffset: 15
      }
    ]
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 12,
        titleFont: {
          size: 14
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value}% (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="activity-pie-chart" style={{ height: `${height}px` }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ActivityPieChart;