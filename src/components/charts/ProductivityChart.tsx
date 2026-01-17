import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ProductivityData } from '../../types/analytics';
import './ProductivityChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProductivityChartProps {
  data: ProductivityData[];
  title?: string;
  height?: number;
}

const ProductivityChart: React.FC<ProductivityChartProps> = ({
  data,
  title = 'Продуктивность за неделю',
  height = 300
}) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Продуктивность (%)',
        data: data.map(item => item.productivity),
        borderColor: '#1890ff',
        backgroundColor: 'rgba(24, 144, 255, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        yAxisID: 'y'
      },
      {
        label: 'Продуктивные часы',
        data: data.map(item => item.productiveHours),
        borderColor: '#52c41a',
        backgroundColor: 'rgba(82, 196, 26, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true,
        yAxisID: 'y1'
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
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
        },
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label.includes('Продуктивность')) {
              return `${label}: ${value}%`;
            }
            return `${label}: ${value} ч`;
          }
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
            size: 12
          }
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Продуктивность (%)',
          font: {
            size: 12
          }
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Часы',
          font: {
            size: 12
          }
        },
        min: 0,
        max: 8,
        ticks: {
          stepSize: 2,
          font: {
            size: 11
          }
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  return (
    <div className="productivity-chart" style={{ height: `${height}px` }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProductivityChart;