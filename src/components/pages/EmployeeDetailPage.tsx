import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
import EmployeeHeader from '../employee/EmployeeHeader';
import EmployeeStats from '../employee/EmployeeStats';
import EmployeeActivity from '../employee/EmployeeActivity';
import { employeeService } from '../../services/employeeService';
import { Employee, EmployeeActivity as ActivityType, EmployeeStats as StatsType } from '../../types/employee';
import './EmployeeDetailPage.css';

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [stats, setStats] = useState<StatsType | null>(null);

  useEffect(() => {
    if (id) {
      loadEmployeeData(parseInt(id));
    }
  }, [id]);

  const loadEmployeeData = async (employeeId: number) => {
    setIsLoading(true);
    try {
      const [employeeData, activitiesData, statsData] = await Promise.all([
        employeeService.getEmployeeById(employeeId),
        employeeService.getEmployeeActivities(employeeId),
        employeeService.getEmployeeStats(employeeId)
      ]);
      
      if (employeeData) {
        setEmployee(employeeData);
      }
      setActivities(activitiesData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading employee data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/employees');
  };

  const handleStatusChange = async (newStatus: Employee['status']) => {
    if (!employee) return;
    
    try {
      const success = await employeeService.updateEmployeeStatus(employee.id, newStatus);
      if (success) {
        setEmployee({
          ...employee,
          status: newStatus,
          lastActivity: new Date()
        });
      }
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="employee-detail-loading">
        <Loading text="Загрузка данных сотрудника..." size="large" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="employee-not-found">
        <div className="not-found-content">
          <h2>Сотрудник не найден</h2>
          <p>Запрашиваемый сотрудник не существует или был удален.</p>
          <button onClick={handleBack} className="back-button">
            Вернуться к списку сотрудников
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-detail-page">
      <EmployeeHeader
        employee={employee}
        onBack={handleBack}
        onStatusChange={handleStatusChange}
      />

      <div className="detail-content">
        <div className="content-left">
          {stats && (
            <div className="section">
              <EmployeeStats stats={stats} />
            </div>
          )}
          
          <div className="section">
            <div className="section-header">
              <h3>Общая информация</h3>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">ID сотрудника:</span>
                <span className="info-value">{employee.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Статус:</span>
                <span className="info-value status-badge">
                  <span 
                    className="status-dot" 
                    style={{ 
                      backgroundColor: employee.status === 'online' ? '#52c41a' :
                                     employee.status === 'away' ? '#faad14' :
                                     employee.status === 'busy' ? '#f5222d' : '#8c8c8c'
                    }}
                  />
                  {employee.status === 'online' ? 'В сети' :
                   employee.status === 'away' ? 'Отошел' :
                   employee.status === 'busy' ? 'Занят' : 'Не в сети'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Продуктивность:</span>
                <div className="info-value">
                  <div className="productivity-indicator">
                    <div 
                      className="productivity-fill"
                      style={{ width: `${employee.productivity}%` }}
                    />
                    <span className="productivity-text">{employee.productivity}%</span>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <span className="info-label">Активность:</span>
                <span className="info-value">
                  {employee.isActive ? 'Активен' : 'Неактивен'}
                </span>
              </div>
              {employee.hireDate && (
                <div className="info-item">
                  <span className="info-label">В компании:</span>
                  <span className="info-value">
                    {Math.floor((new Date().getTime() - new Date(employee.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44))} мес.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="section">
            <EmployeeActivity activities={activities} />
          </div>

          <div className="section">
            <div className="section-header">
              <h3>Быстрые действия</h3>
            </div>
            <div className="quick-actions">
              <button className="action-button">
                <div className="action-icon">📊</div>
                <div className="action-content">
                  <h4>Создать отчет</h4>
                  <p>Сформировать отчет по сотруднику</p>
                </div>
              </button>
              
              <button className="action-button">
                <div className="action-icon">📧</div>
                <div className="action-content">
                  <h4>Отправить уведомление</h4>
                  <p>Написать сообщение сотруднику</p>
                </div>
              </button>
              
              <button className="action-button">
                <div className="action-icon">⚙️</div>
                <div className="action-content">
                  <h4>Настройки доступа</h4>
                  <p>Управление правами доступа</p>
                </div>
              </button>
              
              <button className="action-button">
                <div className="action-icon">📈</div>
                <div className="action-content">
                  <h4>Аналитика продуктивности</h4>
                  <p>Подробная аналитика работы</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;