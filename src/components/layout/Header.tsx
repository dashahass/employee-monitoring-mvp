import React from 'react';
import './Header.css'; // Создадим позже

// Простейший функциональный компонент
const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Система мониторинга активности сотрудников</h1>
      <p>Версия 1.0</p>
    </header>
  );
};

export default Header;