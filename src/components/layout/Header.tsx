// src/components/layout/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('auth_token') !== null;
  const user = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null;

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <h1>ScreenMonitor</h1>
          </Link>
        </div>
        
        {isAuthenticated && (
          <div className="header-right">
            <nav className="navigation">
              <Link to="/" className="nav-link">Главная</Link>
              <Link to="/employees" className="nav-link">Сотрудники</Link>
              <Link to="/reports" className="nav-link">Отчеты</Link>
            </nav>
            
            <div className="user-section">
              {user && (
                <div className="user-info">
                  <span className="user-name">{user.fullName}</span>
                  <span className="user-role">{user.role}</span>
                </div>
              )}
              <button onClick={handleLogout} className="logout-button">
                Выйти
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;