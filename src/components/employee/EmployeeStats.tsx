import React from 'react';
import { EmployeeStats as EmployeeStatsType } from '../../types/employee';
import './EmployeeStats.css';

interface EmployeeStatsProps {
  stats: EmployeeStatsType;
}

const EmployeeStats: React.FC<EmployeeStatsProps> = ({ stats }) => {
  const productivityPercentage = Math.round((stats.productiveHours / stats.totalHours) * 100);
  const distractionsPerHour = (stats.distractions / stats.totalHours).toFixed(1);

  const getProductivityColor = (score: number) => {
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#f5222d';
  };

  const getProductivityLabel = (score: number) => {
    if (score >= 80) return 'Высокая';
    if (score >= 60) return 'Средняя';
    return 'Низкая';
  };

  return (
    <div className="employee-stats">
      <div className="stats-header">
        <h3>Статистика продуктивности</h3>
        <span className="stats-date">
          {new Date(stats.date).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </span>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e6f7ff', color: '#1890ff' }}>
            ⏱️
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalHours}ч</div>
            <div className="stat-label">Всего часов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}>
            ✅
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.productiveHours}ч</div>
            <div className="stat-label">Продуктивных часов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fff2f0', color: '#ff4d4f' }}>
            ⚠️
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.distractions}</div>
            <div className="stat-label">Отвлечений</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fff7e6', color: '#fa8c16' }}>
            📊
          </div>
          <div className="stat-content">
            <div className="stat-value">{distractionsPerHour}/ч</div>
            <div className="stat-label">Отвлечений в час</div>
          </div>
        </div>
      </div>

      <div className="productivity-section">
        <div className="section-header">
          <h4>Общая продуктивность</h4>
          <span className="score-badge" style={{ backgroundColor: getProductivityColor(stats.productivityScore) }}>
            {stats.productivityScore}%
          </span>
        </div>
        <div className="productivity-details">
          <div className="productivity-bar-container">
            <div 
              className="productivity-bar-fill"
              style={{ 
                width: `${productivityPercentage}%`,
                backgroundColor: getProductivityColor(productivityPercentage)
              }}
            />
            <div className="productivity-labels">
              <span>0%</span>
              <span className="current-productivity">
                {productivityPercentage}% продуктивного времени
              </span>
              <span>100%</span>
            </div>
          </div>
          <div className="productivity-description">
            <p>
              <strong>Уровень продуктивности:</strong>{' '}
              <span style={{ color: getProductivityColor(stats.productivityScore) }}>
                {getProductivityLabel(stats.productivityScore)}
              </span>
            </p>
            <p className="recommendation">
              {productivityPercentage >= 80 
                ? 'Отличные показатели! Сотрудник эффективно использует рабочее время.'
                : productivityPercentage >= 60
                ? 'Хорошие показатели. Есть возможность для улучшения.'
                : 'Требуется внимание. Рекомендуется провести анализ рабочего процесса.'}
            </p>
          </div>
        </div>
      </div>

      <div className="applications-section">
        <h4>Наиболее используемые приложения</h4>
        <div className="applications-list">
          {stats.topApplications.map((app, index) => (
            <div key={index} className="application-item">
              <div className="application-icon">
                {app.name.charAt(0)}
              </div>
              <div className="application-info">
                <div className="application-name">{app.name}</div>
                <div className="application-duration">{Math.round(app.duration / 60)} часов</div>
              </div>
              <div className="application-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${(app.duration / stats.totalHours / 60) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeStats;