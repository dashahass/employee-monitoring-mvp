import React, { useState } from 'react';
import { EmployeeActivity as EmployeeActivityType } from '../../types/employee';
import './EmployeeActivity.css';

interface EmployeeActivityProps {
  activities: EmployeeActivityType[];
}

const EmployeeActivity: React.FC<EmployeeActivityProps> = ({ activities }) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'productive': return '#52c41a';
      case 'neutral': return '#1890ff';
      case 'distracting': return '#ff4d4f';
      case 'break': return '#fa8c16';
      case 'meeting': return '#722ed1';
      default: return '#8c8c8c';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'productive': return '✅';
      case 'neutral': return '📝';
      case 'distracting': return '⚠️';
      case 'break': return '☕';
      case 'meeting': return '👥';
      default: return '📌';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'productive': return 'Продуктивная';
      case 'neutral': return 'Нейтральная';
      case 'distracting': return 'Отвлекающая';
      case 'break': return 'Перерыв';
      case 'meeting': return 'Совещание';
      default: return 'Неизвестная';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} мин`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours}ч ${remainingMinutes}мин`
      : `${hours}ч`;
  };

  const filteredActivities = activities.filter(activity => {
    if (selectedType === 'all') return true;
    return activity.type === selectedType;
  });

  const activityTypes = ['all', 'productive', 'neutral', 'distracting', 'break', 'meeting'];
  const timeRanges = [
    { value: 'today', label: 'Сегодня' },
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' }
  ];

  return (
    <div className="employee-activity">
      <div className="activity-header">
        <h3>Активность сотрудника</h3>
        <div className="activity-controls">
          <div className="type-filter">
            {activityTypes.map(type => (
              <button
                key={type}
                className={`type-button ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type)}
                style={selectedType === type ? { 
                  backgroundColor: getActivityColor(type !== 'all' ? type : 'productive'),
                  color: 'white'
                } : {}}
              >
                {type !== 'all' && (
                  <span className="type-icon">{getActivityIcon(type)}</span>
                )}
                {type === 'all' ? 'Все' : getActivityLabel(type)}
              </button>
            ))}
          </div>
          <div className="time-filter">
            {timeRanges.map(range => (
              <button
                key={range.value}
                className={`time-button ${timeRange === range.value ? 'active' : ''}`}
                onClick={() => setTimeRange(range.value as any)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="activity-summary">
        <div className="summary-card">
          <div className="summary-value">{filteredActivities.length}</div>
          <div className="summary-label">Всего активностей</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">
            {formatDuration(filteredActivities.reduce((sum, activity) => sum + activity.duration, 0))}
          </div>
          <div className="summary-label">Общая длительность</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">
            {filteredActivities.filter(a => a.type === 'productive').length}
          </div>
          <div className="summary-label">Продуктивных</div>
        </div>
        <div className="summary-card">
          <div className="summary-value">
            {filteredActivities.filter(a => a.type === 'distracting').length}
          </div>
          <div className="summary-label">Отвлечений</div>
        </div>
      </div>

      <div className="activity-timeline">
        {filteredActivities.length === 0 ? (
          <div className="no-activities">
            <div className="no-activities-icon">📊</div>
            <p>Активности не найдены</p>
            <span className="no-activities-subtitle">Измените фильтры для отображения данных</span>
          </div>
        ) : (
          <div className="timeline">
            {filteredActivities.map((activity, index) => (
              <div key={activity.id} className="timeline-item">
                <div className="timeline-marker">
                  <div 
                    className="marker-dot"
                    style={{ backgroundColor: getActivityColor(activity.type) }}
                  />
                  {index < filteredActivities.length - 1 && (
                    <div className="timeline-line" />
                  )}
                </div>
                <div className="timeline-content">
                  <div className="activity-header-row">
                    <div className="activity-time">
                      {formatTime(activity.timestamp)}
                    </div>
                    <div className="activity-type">
                      <span 
                        className="type-badge"
                        style={{ 
                          backgroundColor: getActivityColor(activity.type) + '20',
                          color: getActivityColor(activity.type)
                        }}
                      >
                        <span className="badge-icon">{getActivityIcon(activity.type)}</span>
                        {getActivityLabel(activity.type)}
                      </span>
                    </div>
                  </div>
                  <div className="activity-details">
                    <div className="activity-description">
                      <div className="application-name">
                        <span className="app-icon">{activity.application.charAt(0)}</span>
                        {activity.application}
                      </div>
                      <div className="activity-text">{activity.description}</div>
                    </div>
                    <div className="activity-duration">
                      {formatDuration(activity.duration)}
                    </div>
                  </div>
                  {activity.screenshotUrl && (
                    <button className="screenshot-button">
                      📸 Просмотр скриншота
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeActivity;