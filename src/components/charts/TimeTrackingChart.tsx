import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TimeTracking } from '../../types/analytics';
import './TimeTrackingChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TimeTrackingChartProps {
  data: TimeTracking[];
  title?: string;
  height?: number;
}

const TimeTrackingChart: React.FC<TimeTrackingChartProps> = ({
  data,
  title = 'Активность по времени',
  height = 300
}) => {
  const chartData = {
    labels: data.map(item => item.timeRange),
    datasets: [
      {
        label: 'Продуктивная',
        data: data.map(item => item.productiveCount),
        backgroundColor: 'rgba(82, 196, 26, 0.7)',
        borderColor: '#52c41a',
        borderWidth: 1
      },
      {
        label: 'Отвлекающая',
        data: data.map(item => item.distractingCount),
        backgroundColor: 'rgba(255, 77, 79, 0.7)',
        borderColor: '#ff4d4f',
        borderWidth: 1
      }
    ]
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
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
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          maxRotation: 45
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          },
          stepSize: 5
        },
        title: {
          display: true,
          text: 'Количество сотрудников',
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="time-tracking-chart" style={{ height: `${height}px` }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TimeTrackingChart;