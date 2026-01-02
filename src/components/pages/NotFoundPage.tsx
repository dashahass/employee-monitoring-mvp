import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Страница не найдена</h1>
        <p>Извините, запрашиваемая страница не существует или была перемещена.</p>
        <p className="suggestion">Проверьте правильность URL или вернитесь на главную страницу.</p>
        
        <div className="action-buttons">
          <Link to="/" className="home-button">
            🏠 На главную
          </Link>
          <button onClick={() => window.history.back()} className="back-button">
            ↩️ Назад
          </button>
        </div>
        
        <div className="help-links">
          <p>Полезные ссылки:</p>
          <div className="links">
            <Link to="/dashboard">Панель управления</Link>
            <Link to="/employees">Сотрудники</Link>
            <Link to="/reports">Отчеты</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;