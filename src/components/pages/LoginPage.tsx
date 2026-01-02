import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Простая проверка логина/пароля
      if (username === 'admin' && password === 'admin123') {
        const user = {
          id: 1,
          username: 'admin',
          email: 'admin@company.com',
          role: 'admin' as const,
          fullName: 'Администратор Системы'
        };
        
        // Сохраняем в localStorage
        localStorage.setItem('auth_token', 'demo_token_123');
        localStorage.setItem('user', JSON.stringify(user));
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Перезагружаем страницу для применения изменений
        window.location.href = '/';
      } else if (username === 'manager' && password === 'manager123') {
        const user = {
          id: 2,
          username: 'manager',
          email: 'manager@company.com',
          role: 'manager' as const,
          department: 'IT',
          fullName: 'Менеджер Отдела'
        };
        
        localStorage.setItem('auth_token', 'demo_token_456');
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/';
      } else if (username === 'user' && password === 'user123') {
        const user = {
          id: 3,
          username: 'user',
          email: 'user@company.com',
          role: 'viewer' as const,
          department: 'Разработка',
          fullName: 'Сотрудник Просмотр'
        };
        
        localStorage.setItem('auth_token', 'demo_token_789');
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/';
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>ScreenMonitor</h1>
          <p>Система мониторинга активности</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="username">Логин</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите логин"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Запомнить меня</span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти в систему'}
          </button>
          
          <div className="demo-credentials">
            <p>Демо доступы:</p>
            <div className="demo-users">
              <div><strong>Админ:</strong> admin / admin123</div>
              <div><strong>Менеджер:</strong> manager / manager123</div>
              <div><strong>Пользователь:</strong> user / user123</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;