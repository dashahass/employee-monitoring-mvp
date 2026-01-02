import React, { useState, useEffect } from 'react';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Получаем данные пользователя из localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Панель управления</h2>
        {user && (
          <div className="user-info">
            <span>Добро пожаловать, {user.fullName}!</span>
            <span className="user-role">({user.role})</span>
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
          </div>
        )}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Всего сотрудников</h3>
          <p className="stat-value">85</p>
          <p className="stat-change">+5 за месяц</p>
        </div>
        
        <div className="stat-card">
          <h3>Средняя продуктивность</h3>
          <p className="stat-value">78%</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: '78%' }}></div>
          </div>
        </div>
        
        <div className="stat-card">
          <h3>Активных сейчас</h3>
          <p className="stat-value">42</p>
          <p className="stat-subtext">из 85 сотрудников</p>
        </div>
        
        <div className="stat-card">
          <h3>Нарушений сегодня</h3>
          <p className="stat-value">8</p>
          <p className="stat-change">-3 с прошлой недели</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <h3>Быстрые действия</h3>
          <div className="action-buttons">
            <button className="action-button">
              📊 Создать отчет
            </button>
            <button className="action-button">
              👥 Просмотр сотрудников
            </button>
            <button className="action-button">
              ⚙️ Настройки системы
            </button>
            <button className="action-button">
              📈 Аналитика
            </button>
          </div>
        </div>

        <div className="content-section">
          <h3>Последняя активность</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-time">10:30</span>
              <span className="activity-text">Иван Петров запустил запрещенное ПО</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">11:15</span>
              <span className="activity-text">Мария Сидорова превысила время простоя</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">12:00</span>
              <span className="activity-text">Сформирован отчет за утро</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;