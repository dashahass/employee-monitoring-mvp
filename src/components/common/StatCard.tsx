import React from 'react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'blue',
  trend,
  subtitle
}) => {
  const colorClasses = {
    blue: 'stat-card-blue',
    green: 'stat-card-green',
    red: 'stat-card-red',
    purple: 'stat-card-purple',
    orange: 'stat-card-orange'
  };

  return (
    <div className={`stat-card ${colorClasses[color]}`}>
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
        {icon && <div className="stat-card-icon">{icon}</div>}
      </div>
      <div className="stat-card-content">
        <p className="stat-card-value">{value}</p>
        {(trend || subtitle) && (
          <div className="stat-card-footer">
            {trend && (
              <span className={`trend ${trend.isPositive ? 'positive' : 'negative'}`}>
                {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
              </span>
            )}
            {subtitle && <span className="subtitle">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;