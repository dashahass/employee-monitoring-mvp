import React, { useState, useEffect } from 'react';
import EmployeeCard from '../common/EmployeeCard';
import { Employee } from '../../types/employee';
import './EmployeesPage.css';

// Мок-данные для демонстрации
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@company.com',
    department: 'Разработка',
    position: 'Frontend разработчик',
    productivity: 85,
    isActive: true,
    lastActivity: new Date()
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    email: 'maria@company.com',
    department: 'Дизайн',
    position: 'UI/UX дизайнер',
    productivity: 92,
    isActive: true,
    lastActivity: new Date()
  },
  {
    id: 3,
    name: 'Алексей Иванов',
    email: 'alex@company.com',
    department: 'Маркетинг',
    position: 'Маркетолог',
    productivity: 67,
    isActive: false,
    lastActivity: new Date(Date.now() - 3600000) // час назад
  }
];

const EmployeesPage: React.FC = () => {
  // useState - хук для состояния
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect - хук для побочных эффектов (аналог componentDidMount)
  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  }, []); // Пустой массив зависимостей = запустить один раз при монтировании

  // Функция для фильтрации сотрудников
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(filter.toLowerCase()) ||
    employee.department.toLowerCase().includes(filter.toLowerCase())
  );

  // Функция для обработки выбора сотрудника
  const handleSelectEmployee = (id: number) => {
    alert(`Выбран сотрудник с ID: ${id}`);
    // В будущем здесь будет навигация на страницу сотрудника
  };

  // Функция для расчета средней продуктивности
  const calculateAverageProductivity = () => {
    if (employees.length === 0) return 0;
    const total = employees.reduce((sum, emp) => sum + emp.productivity, 0);
    return Math.round(total / employees.length);
  };

  // Показываем загрузку
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="employees-page">
      <h2>Сотрудники компании</h2>
      
      <div className="page-header">
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-label">Всего сотрудников:</span>
            <span className="stat-value">{employees.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Средняя продуктивность:</span>
            <span className="stat-value">{calculateAverageProductivity()}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Активных сейчас:</span>
            <span className="stat-value">
              {employees.filter(e => e.isActive).length}
            </span>
          </div>
        </div>
        
        <div className="search-filter">
          <input
            type="text"
            placeholder="Поиск по имени или отделу..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
          <button className="filter-button">
            Фильтры
          </button>
        </div>
      </div>
      
      <div className="employees-list">
        {filteredEmployees.length === 0 ? (
          <div className="no-results">
            <p>Сотрудники не найдены</p>
          </div>
        ) : (
          filteredEmployees.map(employee => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onSelect={handleSelectEmployee}
            />
          ))
        )}
      </div>
      
      <div className="page-footer">
        <p>Показано: {filteredEmployees.length} из {employees.length} сотрудников</p>
      </div>
    </div>
  );
};

export default EmployeesPage;