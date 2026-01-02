import React from 'react';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import Practice from './components/layout/Practice';

function App() {
  return (
    <MainLayout>
      {/* Это содержимое попадет в {children} */}
      <div className="content">
        <h2>Добро пожаловать в систему мониторинга!</h2>
        <p>Это демонстрационная версия интерфейса.</p>
        
        <div className="card">
          <h3>Статус системы</h3>
          <p>✅ Все системы работают нормально</p>
          <p>👥 Мониторится: 25 сотрудников</p>
          <p>📊 Продуктивность: 85%</p>
        </div>
        
        <Practice />
      </div>
    </MainLayout>
  );
}

export default App;