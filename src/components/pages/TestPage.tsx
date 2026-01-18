import React, { useState } from 'react';
import { generateMockEmployees } from '../../utils/testUtils';
import EmployeeCard from '../common/EmployeeCard';
import StatCard from '../common/StatCard';
import Loading from '../common/Loading';
import './TestPage.css';

const TestPage: React.FC = () => {
  const [testMode, setTestMode] = useState<'components' | 'performance' | 'error'>('components');
  const [mockEmployees] = useState(() => generateMockEmployees(10));
  const [showLoading, setShowLoading] = useState(false);
  const [triggerError, setTriggerError] = useState(false);

  const handleTestPerformance = () => {
    setShowLoading(true);
    // Имитация тяжелой операции
    setTimeout(() => {
      const start = performance.now();
      // Генерация большого количества данных
      generateMockEmployees(10000);
      const end = performance.now();
      alert(`Генерация 10000 сотрудников заняла: ${(end - start).toFixed(2)}ms`);
      setShowLoading(false);
    }, 100);
  };

  const handleTriggerError = () => {
    setTriggerError(true);
    setTimeout(() => setTriggerError(false), 3000);
  };

  if (triggerError) {
    throw new Error('Тестовая ошибка для проверки ErrorBoundary');
  }

  if (showLoading) {
    return <Loading text="Тестирование производительности..." size="large" />;
  }

  return (
    <div className="test-page">
      <h1>Страница тестирования</h1>
      
      <div className="test-controls">
        <div className="test-buttons">
          <button
            className={testMode === 'components' ? 'active' : ''}
            onClick={() => setTestMode('components')}
          >
            Тест компонентов
          </button>
          <button
            className={testMode === 'performance' ? 'active' : ''}
            onClick={() => setTestMode('performance')}
          >
            Тест производительности
          </button>
          <button
            className={testMode === 'error' ? 'active' : ''}
            onClick={() => setTestMode('error')}
          >
            Тест ошибок
          </button>
        </div>
      </div>

      {testMode === 'components' && (
        <div className="components-test">
          <h2>Тестирование компонентов</h2>
          
          <div className="test-section">
            <h3>Карточки статистики</h3>
            <div className="stats-grid">
              <StatCard
                title="Всего сотрудников"
                value="85"
                icon="👥"
              />
              <StatCard
                title="Средняя продуктивность"
                value="78%"
                icon="📈"
              />
              <StatCard
                title="Нарушений сегодня"
                value="8"
                icon="⚠️"
              />
            </div>
          </div>

          <div className="test-section">
            <h3>Карточки сотрудников</h3>
            <div className="employees-grid">
              {mockEmployees.slice(0, 3).map(employee => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  onSelect={(id) => alert(`Выбран сотрудник с ID: ${id}`)}
                />
              ))}
            </div>
          </div>

          <div className="test-section">
            <h3>Состояния загрузки</h3>
            <div className="loading-test">
              <Loading text="Загрузка данных..." size="small" />
              <Loading text="Подождите немного..." size="medium" />
              <Loading text="Идет обработка..." size="large" />
            </div>
          </div>
        </div>
      )}

      {testMode === 'performance' && (
        <div className="performance-test">
          <h2>Тестирование производительности</h2>
          
          <div className="test-actions">
            <button className="perf-button" onClick={handleTestPerformance}>
              Тест генерации данных
            </button>
            <button className="perf-button" onClick={() => window.location.reload()}>
              Тест перезагрузки
            </button>
          </div>

          <div className="performance-info">
            <h3>Метрики производительности</h3>
            <div className="metrics">
              <div className="metric">
                <span className="metric-label">Время загрузки страницы:</span>
                <span className="metric-value">{(performance.now()).toFixed(2)}ms</span>
              </div>
              <div className="metric">
                <span className="metric-label">Используемая память:</span>
                <span className="metric-value">
                  {/* Используем type assertion для доступа к memory, если оно доступно */}
                  {(performance as any).memory 
                    ? `${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)}MB`
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {testMode === 'error' && (
        <div className="error-test">
          <h2>Тестирование обработки ошибок</h2>
          
          <div className="error-actions">
            <button className="error-button" onClick={handleTriggerError}>
              Вызвать ошибку
            </button>
            <button 
              className="error-button"
              onClick={() => {
                throw new Error('Синхронная ошибка');
              }}
            >
              Синхронная ошибка
            </button>
          </div>

          <div className="error-info">
            <h3>Информация об ошибках</h3>
            <p>Нажмите кнопки выше, чтобы проверить работу ErrorBoundary.</p>
            <p>Ошибки будут перехвачены и отображены пользователю в удобной форме.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;