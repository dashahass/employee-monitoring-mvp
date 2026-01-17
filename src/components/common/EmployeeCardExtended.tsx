import React from 'react';
import { Employee } from '../../types/employee';
import './EmployeeCardExtended.css';

interface EmployeeCardExtendedProps {
  employee: Employee;
  onSelect: (id: number) => void;
  onStatusChange?: (id: number, status: Employee['status']) => void;
  showActions?: boolean;
}

const EmployeeCardExtended: React.FC<EmployeeCardExtendedProps> = ({
  employee,
  onSelect,
  onStatusChange,
  showActions = false
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return '#52c41a';
      case 'away': return '#faad14';
      case 'busy': return '#f5222d';
      case 'offline': return '#8c8c8c';
      default: return '#8c8c8c';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'online': return 'В сети';
      case 'away': return 'Отошел';
      case 'busy': return 'Занят';
      case 'offline': return 'Не в сети';
      default: return 'Неизвестно';
    }
  };

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

  const formatLastActivity = (date?: Date) => {
    if (!date) return 'Нет данных';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Только что';
    if (diffMins < 60) return `${diffMins} мин назад`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} ч назад`;
    
    return date.toLocaleDateString('ru-RU');
  };

  const handleCardClick = () => {
    onSelect(employee.id);
  };

  const handleStatusChange = (e: React.MouseEvent, newStatus: Employee['status']) => {
    e.stopPropagation();
    if (onStatusChange) {
      onStatusChange(employee.id, newStatus);
    }
  };

  return (
    <div className="employee-card-extended" onClick={handleCardClick}>
      <div className="card-header">
        <div className="employee-avatar" style={{ backgroundColor: employee.avatarColor || '#1890ff' }}>
          {employee.name.charAt(0)}
        </div>
        <div className="employee-main-info">
          <h3 className="employee-name">{employee.name}</h3>
          <p className="employee-position">{employee.position}</p>
          <div className="employee-department">
            <span className="department-badge">{employee.department}</span>
          </div>
        </div>
        <div className="employee-status">
          <div 
            className="status-indicator" 
            style={{ backgroundColor: getStatusColor(employee.status) }}
            title={getStatusText(employee.status)}
          />
          <span className="status-text">{getStatusText(employee.status)}</span>
        </div>
      </div>

      <div className="card-content">
        <div className="info-row">
          <span className="info-label">Продуктивность:</span>
          <div className="info-value">
            <div className="productivity-container">
              <div 
                className="productivity-bar"
                style={{ 
                  width: `${employee.productivity}%`,
                  backgroundColor: getProductivityColor(employee.productivity)
                }}
              />
              <span className="productivity-score">{employee.productivity}%</span>
            </div>
            <span className="productivity-label">
              {getProductivityLabel(employee.productivity)}
            </span>
          </div>
        </div>

        <div className="info-row">
          <span className="info-label">Последняя активность:</span>
          <span className="info-value">
            {formatLastActivity(employee.lastActivity)}
          </span>
        </div>

        <div className="info-row">
          <span className="info-label">Контакты:</span>
          <span className="info-value">
            <a href={`mailto:${employee.email}`} className="contact-link">
              {employee.email}
            </a>
            {employee.phone && (
              <span className="phone">{employee.phone}</span>
            )}
          </span>
        </div>

        {employee.location && (
          <div className="info-row">
            <span className="info-label">Локация:</span>
            <span className="info-value">{employee.location}</span>
          </div>
        )}
      </div>

      {showActions && onStatusChange && (
        <div className="card-actions">
          <div className="status-actions">
            <button 
              className="status-action-btn online"
              onClick={(e) => handleStatusChange(e, 'online')}
              title="Установить статус: В сети"
            >
              🟢
            </button>
            <button 
              className="status-action-btn away"
              onClick={(e) => handleStatusChange(e, 'away')}
              title="Установить статус: Отошел"
            >
              🟡
            </button>
            <button 
              className="status-action-btn busy"
              onClick={(e) => handleStatusChange(e, 'busy')}
              title="Установить статус: Занят"
            >
              🔴
            </button>
            <button 
              className="status-action-btn offline"
              onClick={(e) => handleStatusChange(e, 'offline')}
              title="Установить статус: Не в сети"
            >
              ⚫
            </button>
          </div>
        </div>
      )}

      <div className="card-footer">
        <button className="view-details-btn">
          Подробнее →
        </button>
      </div>
    </div>
  );
};

export default EmployeeCardExtended;