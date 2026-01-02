import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '../../types/employee';
import './EmployeeDetailPage.css';

// Мок-данные для сотрудника
const mockEmployeeData: Employee = {
  id: 1,
  name: 'Иван Петров',
  email: 'ivan@company.com',
  department: 'Разработка',
  position: 'Frontend разработчик',
  productivity: 85,
  isActive: true,
  lastActivity: new Date()
};

// Мок-данные для активности
const mockActivities = [
  { time: '09:00', activity: 'Работа с React кодом', type: 'productive', duration: '60 мин' },
  { time: '10:00', activity: 'Совещание по проекту', type: 'productive', duration: '45 мин' },
  { time: '11:00', activity: 'Просмотр YouTube', type: 'distracting', duration: '15 мин' },
  { time: '11:15', activity: 'Работа с API', type: 'productive', duration: '75 мин' },
  { time: '12:30', activity: 'Обеденный перерыв', type: 'break', duration: '45 мин' },
  { time: '13:15', activity: 'Code review', type: 'productive', duration: '60 мин' },
  { time: '14:15', activity: 'Работа с документацией', type: 'productive', duration: '45 мин' },
];

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Проверяем авторизацию
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Имитация загрузки данных
    setTimeout(() => {
      setEmployee(mockEmployeeData);
      setLoading(false);
    }, 1000);
  }, [id, navigate]);

  const handleGoBack = () => {
    navigate('/employees');
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'productive': return '#52c41a';
      case 'distracting': return '#ff4d4f';
      case 'break': return '#faad14';
      default: return '#8c8c8c';
    }
  };

  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case 'productive': return 'Продуктивная';
      case 'distracting': return 'Отвлечение';
      case 'break': return 'Перерыв';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка данных сотрудника...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="error-container">
        <h2>Сотрудник не найден</h2>
        <p>Сотрудник с ID {id} не существует или был удален.</p>
        <button onClick={handleGoBack} className="back-button">
          ← Вернуться к списку сотрудников
        </button>
      </div>
    );
  }

  return (
    <div className="employee-detail">
      <div className="detail-header">
        <button onClick={handleGoBack} className="back-link">
          ← Назад к списку
        </button>
        <h2>Детальная информация о сотруднике</h2>
      </div>

      <div className="employee-profile">
        <div className="profile-header">
          <div className="profile-avatar">
            {employee.name.charAt(0)}
          </div>
          <div className="profile-info">
            <h1>{employee.name}</h1>
            <div className="profile-meta">
              <span className="position">{employee.position}</span>
              <span className="department">{employee.department}</span>
              <span className="email">{employee.email}</span>
            </div>
          </div>
          <div className="profile-stats">
            <div className="productivity-score">
              <div className="score-circle" style={{ 
                borderColor: employee.productivity >= 80 ? '#52c41a' : 
                            employee.productivity >= 60 ? '#faad14' : '#ff4d4f'
              }}>
                {employee.productivity}%
              </div>
              <span>Продуктивность</span>
            </div>
            <div className="status-indicator">
              <div className={`status-dot ${employee.isActive ? 'active' : 'inactive'}`} />
              <span>{employee.isActive ? 'В сети' : 'Неактивен'}</span>
            </div>
          </div>
        </div>

        <div className="stats-overview">
          <div className="stat-card">
            <h3>Общее время работы</h3>
            <p className="stat-value">7ч 45м</p>
            <p className="stat-label">сегодня</p>
          </div>
          <div className="stat-card">
            <h3>Продуктивное время</h3>
            <p className="stat-value">6ч 30м</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(6.5 / 7.75 * 100).toFixed(0)}%` }}
              />
            </div>
          </div>
          <div className="stat-card">
            <h3>Кол-во отвлечений</h3>
            <p className="stat-value">3</p>
            <p className="stat-label">за сегодня</p>
          </div>
          <div className="stat-card">
            <h3>Время простоя</h3>
            <p className="stat-value">45м</p>
            <p className="stat-change">+5м вчера</p>
          </div>
        </div>

        <div className="activity-section">
          <div className="section-header">
            <h3>Активность за сегодня</h3>
            <div className="date-selector">
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
              />
            </div>
          </div>

          <div className="activity-timeline">
            {mockActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-time">{activity.time}</div>
                <div className="activity-content">
                  <div className="activity-header">
                    <span className="activity-text">{activity.activity}</span>
                    <span 
                      className="activity-type"
                      style={{ backgroundColor: getActivityTypeColor(activity.type) }}
                    >
                      {getActivityTypeLabel(activity.type)}
                    </span>
                  </div>
                  <div className="activity-duration">
                    <span>Длительность: {activity.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-button primary">
            📊 Сформировать отчет
          </button>
          <button className="action-button secondary">
            ⚠️ Отправить предупреждение
          </button>
          <button className="action-button">
            📝 Редактировать профиль
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;