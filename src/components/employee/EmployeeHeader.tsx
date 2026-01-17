import React from 'react';
import { Employee } from '../../types/employee';
import './EmployeeHeader.css';

interface EmployeeHeaderProps {
  employee: Employee;
  onBack: () => void;
  onStatusChange?: (status: Employee['status']) => void;
}

const EmployeeHeader: React.FC<EmployeeHeaderProps> = ({
  employee,
  onBack,
  onStatusChange
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

  const formatDate = (date?: Date) => {
    if (!date) return 'Не указана';
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleStatusChange = (newStatus: Employee['status']) => {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <div className="employee-header">
      <div className="header-top">
        <button className="back-button" onClick={onBack}>
          ← Назад к списку
        </button>
        <div className="header-actions">
          <button className="action-button">
            📧 Написать
          </button>
          <button className="action-button">
            📞 Позвонить
          </button>
          <button className="action-button primary">
            ✏️ Редактировать
          </button>
        </div>
      </div>

      <div className="employee-main-info">
        <div className="employee-avatar-large" style={{ backgroundColor: employee.avatarColor || '#1890ff' }}>
          {employee.name.charAt(0)}
          <div 
            className="status-indicator-large"
            style={{ backgroundColor: getStatusColor(employee.status) }}
            title={getStatusText(employee.status)}
          />
        </div>

        <div className="employee-details">
          <div className="name-section">
            <h1>{employee.name}</h1>
            <div className="status-selector">
              <span className="current-status">
                Статус: <strong>{getStatusText(employee.status)}</strong>
              </span>
              {onStatusChange && (
                <select
                  value={employee.status || ''}
                  onChange={(e) => handleStatusChange(e.target.value as Employee['status'])}
                  className="status-select"
                >
                  <option value="online">В сети</option>
                  <option value="away">Отошел</option>
                  <option value="busy">Занят</option>
                  <option value="offline">Не в сети</option>
                </select>
              )}
            </div>
          </div>

          <div className="position-section">
            <h2>{employee.position}</h2>
            <div className="department-tag" style={{ backgroundColor: employee.avatarColor + '20', color: employee.avatarColor }}>
              {employee.department}
            </div>
          </div>

          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href={`mailto:${employee.email}`} className="contact-value">
                {employee.email}
              </a>
            </div>
            {employee.phone && (
              <div className="contact-item">
                <span className="contact-label">Телефон:</span>
                <a href={`tel:${employee.phone}`} className="contact-value">
                  {employee.phone}
                </a>
              </div>
            )}
            {employee.location && (
              <div className="contact-item">
                <span className="contact-label">Локация:</span>
                <span className="contact-value">{employee.location}</span>
              </div>
            )}
            {employee.hireDate && (
              <div className="contact-item">
                <span className="contact-label">Дата приема:</span>
                <span className="contact-value">{formatDate(employee.hireDate)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHeader;