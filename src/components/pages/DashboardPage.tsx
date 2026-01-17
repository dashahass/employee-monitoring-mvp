import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../common/StatCard';
import Loading from '../common/Loading';
import ProductivityChart from '../charts/ProductivityChart';
import ActivityPieChart from '../charts/ActivityPieChart';
import TimeTrackingChart from '../charts/TimeTrackingChart';
import ViolationsWidget from '../common/ViolationsWidget';
import { analyticsService } from '../../services/analyticsService';
import { 
  DashboardStats, 
  ProductivityData, 
  ActivityDistribution,
  TimeTracking 
} from '../../types/analytics';
import { Employee } from '../../types/employee';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [productivityData, setProductivityData] = useState<ProductivityData[]>([]);
  const [activityDistribution, setActivityDistribution] = useState<ActivityDistribution | null>(null);
  const [timeTracking, setTimeTracking] = useState<TimeTracking[]>([]);
  const [topPerformers, setTopPerformers] = useState<Employee[]>([]);
  const [violations, setViolations] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [
        dashboardStats,
        productivity,
        activity,
        time,
        performers,
        violationsList
      ] = await Promise.all([
        analyticsService.getDashboardStats(),
        analyticsService.getProductivityData(),
        analyticsService.getActivityDistribution(),
        analyticsService.getTimeTracking(),
        analyticsService.getTopPerformers(3),
        analyticsService.getViolationsList()
      ]);
      
      setStats(dashboardStats);
      setProductivityData(productivity);
      setActivityDistribution(activity);
      setTimeTracking(time);
      setTopPerformers(performers);
      setViolations(violationsList.map(v => ({
        ...v,
        time: new Date().toISOString()
      })));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <Loading text="Загрузка статистики..." size="large" />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Панель управления</h1>
          <p className="dashboard-subtitle">
            Обзор активности и продуктивности сотрудников
            <span className="last-update">
              Обновлено: {new Date().toLocaleTimeString('ru-RU', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </p>
        </div>
        <div className="header-actions">
          <button onClick={handleRefresh} className="refresh-button">
            🔄 Обновить
          </button>
          <button onClick={handleLogout} className="logout-button">
            Выйти
          </button>
        </div>
      </div>

      {stats && (
        <div className="stats-grid">
          <StatCard
            title="Всего сотрудников"
            value={stats.totalEmployees}
            icon="👥"
            color="blue"
            subtitle="В системе"
          />
          
          <StatCard
            title="Активных сейчас"
            value={stats.activeNow}
            icon="🟢"
            color="green"
            trend={{
              value: 12,
              isPositive: true
            }}
            subtitle={`из ${stats.totalEmployees}`}
          />
          
          <StatCard
            title="Средняя продуктивность"
            value={`${stats.averageProductivity}%`}
            icon="📈"
            color="purple"
            trend={{
              value: 5,
              isPositive: stats.productivityTrend === 'up'
            }}
          />
          
          <StatCard
            title="Нарушений сегодня"
            value={stats.todayViolations}
            icon="⚠️"
            color="red"
            trend={{
              value: 3,
              isPositive: false
            }}
            subtitle="требуют внимания"
          />
          
          <StatCard
            title="Всего часов"
            value={stats.totalHoursTracked}
            icon="⏱️"
            color="orange"
            subtitle="отслежено за сегодня"
          />
          
          <StatCard
            title="Тренд продуктивности"
            value={stats.productivityTrend === 'up' ? '↗' : stats.productivityTrend === 'down' ? '↘' : '→'}
            icon="📊"
            color={stats.productivityTrend === 'up' ? 'green' : 'red'}
            subtitle={stats.productivityTrend === 'up' ? 'Растет' : 'Снижается'}
          />
        </div>
      )}

      <div className="charts-section">
        <div className="chart-container">
          {productivityData.length > 0 && (
            <ProductivityChart 
              data={productivityData} 
              title="Динамика продуктивности за неделю"
            />
          )}
        </div>
        
        <div className="small-charts">
          <div className="chart-container">
            {activityDistribution && (
              <ActivityPieChart 
                data={activityDistribution}
                title="Распределение активности"
                height={320}
              />
            )}
          </div>
          
          <div className="chart-container">
            {timeTracking.length > 0 && (
              <TimeTrackingChart 
                data={timeTracking}
                title="Активность в течение дня"
                height={320}
              />
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-left">
          <div className="top-performers-section">
            <div className="section-header">
              <h3>Топ сотрудников</h3>
              <span className="section-subtitle">По продуктивности</span>
            </div>
            <div className="performers-list">
              {topPerformers.map((employee, index) => (
                <div 
                  key={employee.id} 
                  className="performer-card"
                  onClick={() => navigate(`/employee/${employee.id}`)}
                >
                  <div className="performer-rank">
                    #{index + 1}
                  </div>
                  <div className="performer-avatar">
                    {employee.name.charAt(0)}
                  </div>
                  <div className="performer-info">
                    <h4>{employee.name}</h4>
                    <p>{employee.position} • {employee.department}</p>
                  </div>
                  <div className="performer-productivity">
                    <div className="productivity-badge">
                      {employee.productivity}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="view-all-button"
              onClick={() => navigate('/employees')}
            >
              Смотреть всех сотрудников →
            </button>
          </div>
        </div>

        <div className="content-right">
          <ViolationsWidget violations={violations} />
          
          <div className="quick-actions-section">
            <div className="section-header">
              <h3>Быстрые действия</h3>
            </div>
            <div className="actions-grid">
              <button 
                className="action-card"
                onClick={() => navigate('/reports')}
              >
                <div className="action-icon">📊</div>
                <div className="action-content">
                  <h4>Создать отчет</h4>
                  <p>Сформировать детальный отчет</p>
                </div>
              </button>
              
              <button 
                className="action-card"
                onClick={() => navigate('/employees')}
              >
                <div className="action-icon">👥</div>
                <div className="action-content">
                  <h4>Сотрудники</h4>
                  <p>Управление сотрудниками</p>
                </div>
              </button>
              
              <button 
                className="action-card"
                onClick={() => alert('Настройки пока недоступны')}
              >
                <div className="action-icon">⚙️</div>
                <div className="action-content">
                  <h4>Настройки</h4>
                  <p>Настройки системы</p>
                </div>
              </button>
              
              <button 
                className="action-card"
                onClick={() => alert('Аналитика пока недоступна')}
              >
                <div className="action-icon">📈</div>
                <div className="action-content">
                  <h4>Аналитика</h4>
                  <p>Детальная аналитика</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;