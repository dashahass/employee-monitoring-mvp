import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeFilters, { FilterState } from '../common/EmployeeFilters';
import EmployeeCardExtended from '../common/EmployeeCardExtended';
import Loading from '../common/Loading';
import { employeeService } from '../../services/employeeService';
import { Employee, Department } from '../../types/employee';
import './EmployeesPage.css';

const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    department: '',
    status: [],
    productivityRange: [0, 100],
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Используем useCallback для стабильной ссылки на функцию
  const applyFilters = useCallback(() => {
    let filtered = [...employees];

    // Применяем фильтры
    if (filters.department) {
      filtered = filtered.filter(emp => emp.department === filters.department);
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter(emp => filters.status.includes(emp.status || ''));
    }

    if (filters.productivityRange) {
      const [min, max] = filters.productivityRange;
      filtered = filtered.filter(emp => emp.productivity >= min && emp.productivity <= max);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query)
      );
    }

    // Применяем сортировку
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof Employee];
      const bValue = b[filters.sortBy as keyof Employee];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'desc' 
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return filters.sortOrder === 'desc' 
          ? bValue - aValue
          : aValue - bValue;
      }
      
      return 0;
    });

    setFilteredEmployees(filtered);
  }, [employees, filters]); // Все зависимости указаны

  // Загрузка начальных данных
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const [employeesData, departmentsData] = await Promise.all([
          employeeService.getEmployees(),
          employeeService.getDepartments()
        ]);
        
        setEmployees(employeesData);
        setDepartments(departmentsData);
      } catch (error) {
        console.error('Error loading employees data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []); // Пустой массив зависимостей - запускается один раз при монтировании

  // Применение фильтров при изменении данных или фильтров
  useEffect(() => {
    applyFilters();
  }, [applyFilters]); // Теперь applyFilters стабильная ссылка благодаря useCallback

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Фильтры автоматически применятся благодаря useEffect
  };

  const handleEmployeeSelect = (id: number) => {
    navigate(`/employee/${id}`);
  };

  const handleStatusChange = async (id: number, status: Employee['status']) => {
    try {
      const success = await employeeService.updateEmployeeStatus(id, status);
      if (success) {
        // Обновляем локальное состояние
        setEmployees(prev => prev.map(emp => 
          emp.id === id 
            ? { ...emp, status, lastActivity: new Date() }
            : emp
        ));
      }
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  };

  const calculateStats = () => {
    const total = filteredEmployees.length;
    const active = filteredEmployees.filter(emp => emp.status === 'online').length;
    const averageProductivity = total > 0 
      ? Math.round(filteredEmployees.reduce((sum, emp) => sum + emp.productivity, 0) / total)
      : 0;
    const violations = filteredEmployees.filter(emp => emp.productivity < 50).length;

    return { total, active, averageProductivity, violations };
  };

  const handleClearAllFilters = () => {
    handleFilterChange({
      department: '',
      status: [],
      productivityRange: [0, 100],
      searchQuery: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
  };

  if (isLoading) {
    return (
      <div className="employees-loading">
        <Loading text="Загрузка данных сотрудников..." size="large" />
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="employees-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Сотрудники компании</h1>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Всего</span>
            <span className="stat-value">{stats.total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">В сети</span>
            <span className="stat-value">{stats.active}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Продуктивность</span>
            <span className="stat-value">{stats.averageProductivity}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Нарушения</span>
            <span className="stat-value">{stats.violations}</span>
          </div>
        </div>
      </div>

      <EmployeeFilters
        departments={departments}
        onFilterChange={handleFilterChange}
        initialFilters={filters}
      />

      <div className="employees-toolbar">
        <div className="results-info">
          <span className="results-count">
            Найдено: <strong>{filteredEmployees.length}</strong> сотрудников
          </span>
          {filters.searchQuery && (
            <span className="search-query">
              По запросу: "{filters.searchQuery}"
            </span>
          )}
        </div>
        <div className="view-controls">
          <button 
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Плиточный вид"
          >
            ▦
          </button>
          <button 
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="Списковый вид"
          >
            ☰
          </button>
          <button 
            className="refresh-button"
            onClick={async () => {
              setIsLoading(true);
              try {
                const [employeesData, departmentsData] = await Promise.all([
                  employeeService.getEmployees(),
                  employeeService.getDepartments()
                ]);
                setEmployees(employeesData);
                setDepartments(departmentsData);
              } catch (error) {
                console.error('Error refreshing data:', error);
              } finally {
                setIsLoading(false);
              }
            }}
            title="Обновить данные"
          >
            🔄
          </button>
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">👥</div>
          <h3>Сотрудники не найдены</h3>
          <p>Попробуйте изменить параметры фильтрации</p>
          <button 
            className="clear-search-button"
            onClick={handleClearAllFilters}
          >
            Очистить все фильтры
          </button>
        </div>
      ) : (
        <div className={`employees-container ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
          {filteredEmployees.map(employee => (
            <EmployeeCardExtended
              key={employee.id}
              employee={employee}
              onSelect={handleEmployeeSelect}
              onStatusChange={handleStatusChange}
              showActions={true}
            />
          ))}
        </div>
      )}

      <div className="page-footer">
        <div className="footer-info">
          <span>Общее количество сотрудников: {employees.length}</span>
          <span>Показано: {filteredEmployees.length}</span>
          <span>Последнее обновление: {new Date().toLocaleTimeString('ru-RU')}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;