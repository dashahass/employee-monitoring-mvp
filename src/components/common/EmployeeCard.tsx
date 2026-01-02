import React from 'react';
import { Employee } from '../../types/employee';
import './EmployeeCard.css';

// Определяем пропсы (свойства) компонента
interface EmployeeCardProps {
  employee: Employee;
  onSelect?: (id: number) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onSelect }) => {
  // Функция для обработки клика
  const handleClick = () => {
    if (onSelect) {
      onSelect(employee.id);
    }
  };

  // Определяем цвет в зависимости от продуктивности
  const getProductivityColor = (score: number) => {
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#ff4d4f';
  };

  return (
    <div 
      className={`employee-card ${employee.isActive ? 'active' : 'inactive'}`}
      onClick={handleClick}
    >
      <div className="employee-avatar">
        {employee.name.charAt(0)}
      </div>
      
      <div className="employee-info">
        <h3>{employee.name}</h3>
        <p>{employee.position}</p>
        <p className="department">{employee.department}</p>
      </div>
      
      <div className="employee-stats">
        <div className="productivity-score">
          <div 
            className="score-circle"
            style={{ 
              backgroundColor: getProductivityColor(employee.productivity),
              borderColor: getProductivityColor(employee.productivity)
            }}
          >
            {employee.productivity}%
          </div>
          <span>Продуктивность</span>
        </div>
        
        <div className="status-indicator">
          <span className={`status-dot ${employee.isActive ? 'active' : 'inactive'}`} />
          {employee.isActive ? 'В сети' : 'Неактивен'}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;