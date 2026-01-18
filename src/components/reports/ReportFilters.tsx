import React, { useState } from 'react';
import { ReportFilters as ReportFiltersType } from '../../types/reports';
import './ReportFilters.css';

interface ReportFiltersProps {
  onFilterChange: (filters: ReportFiltersType) => void;
  initialFilters?: ReportFiltersType;
  departments?: string[];
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  onFilterChange,
  initialFilters,
  departments = []
}) => {
  const [filters, setFilters] = useState<ReportFiltersType>(() => ({
    dateRange: initialFilters?.dateRange || {
      start: new Date(new Date().setDate(new Date().getDate() - 30)),
      end: new Date()
    },
    departments: initialFilters?.departments || [],
    productivityThreshold: initialFilters?.productivityThreshold,
    includeInactive: initialFilters?.includeInactive || false
  }));

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: new Date(value)
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDepartmentToggle = (department: string) => {
    const newDepartments = filters.departments?.includes(department)
      ? filters.departments.filter(d => d !== department)
      : [...(filters.departments || []), department];
    
    const newFilters = { ...filters, departments: newDepartments };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleProductivityChange = (value: number) => {
    const newFilters = { ...filters, productivityThreshold: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleIncludeInactiveChange = (checked: boolean) => {
    const newFilters = { ...filters, includeInactive: checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleQuickDateRange = (range: 'today' | 'week' | 'month' | 'quarter') => {
    const end = new Date();
    let start = new Date();
    
    switch (range) {
      case 'today':
        start = new Date(end);
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        start.setDate(end.getDate() - 7);
        break;
      case 'month':
        start.setMonth(end.getMonth() - 1);
        break;
      case 'quarter':
        start.setMonth(end.getMonth() - 3);
        break;
    }
    
    const newFilters = { ...filters, dateRange: { start, end } };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const newFilters: ReportFiltersType = {
      dateRange: {
        start: new Date(new Date().setDate(new Date().getDate() - 30)),
        end: new Date()
      },
      departments: [],
      productivityThreshold: undefined,
      includeInactive: false
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="report-filters">
      <div className="filters-header">
        <h3>Фильтры отчетов</h3>
        <button 
          className="toggle-advanced-btn"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Скрыть' : 'Расширенные'} фильтры
        </button>
      </div>

      <div className="date-filters">
        <div className="date-quick-buttons">
          <button 
            className="date-quick-btn"
            onClick={() => handleQuickDateRange('today')}
          >
            Сегодня
          </button>
          <button 
            className="date-quick-btn"
            onClick={() => handleQuickDateRange('week')}
          >
            Неделя
          </button>
          <button 
            className="date-quick-btn"
            onClick={() => handleQuickDateRange('month')}
          >
            Месяц
          </button>
          <button 
            className="date-quick-btn"
            onClick={() => handleQuickDateRange('quarter')}
          >
            Квартал
          </button>
        </div>

        <div className="date-range">
          <div className="date-input-group">
            <label>С</label>
            <input
              type="date"
              value={formatDateForInput(filters.dateRange.start)}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="date-input"
            />
          </div>
          <div className="date-input-group">
            <label>По</label>
            <input
              type="date"
              value={formatDateForInput(filters.dateRange.end)}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="date-input"
            />
          </div>
        </div>
      </div>

      {showAdvanced && (
        <div className="advanced-filters">
          <div className="filter-section">
            <h4 className="filter-title">Отделы</h4>
            <div className="department-filters">
              {departments.map(dept => (
                <button
                  key={dept}
                  className={`department-filter ${filters.departments?.includes(dept) ? 'active' : ''}`}
                  onClick={() => handleDepartmentToggle(dept)}
                >
                  {dept}
                </button>
              ))}
              {departments.length === 0 && (
                <div className="no-departments">Нет доступных отделов</div>
              )}
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Продуктивность</h4>
            <div className="productivity-filter">
              <div className="range-input">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.productivityThreshold || 0}
                  onChange={(e) => handleProductivityChange(Number(e.target.value))}
                  className="range-slider"
                />
                <div className="range-labels">
                  <span>0%</span>
                  <span className="current-threshold">
                    {filters.productivityThreshold || 0}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
              <div className="threshold-info">
                <span>Показывать сотрудников с продуктивностью выше:</span>
                <span className="threshold-value">
                  {filters.productivityThreshold || 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Дополнительно</h4>
            <div className="additional-filters">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.includeInactive}
                  onChange={(e) => handleIncludeInactiveChange(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                Включая неактивных сотрудников
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="active-filters">
        <div className="date-range-display">
          <span className="filter-label">Период:</span>
          <span className="filter-value">
            {filters.dateRange.start.toLocaleDateString('ru-RU')} - {filters.dateRange.end.toLocaleDateString('ru-RU')}
          </span>
        </div>
        
        {filters.departments && filters.departments.length > 0 && (
          <div className="departments-display">
            <span className="filter-label">Отделы:</span>
            <div className="filter-values">
              {filters.departments.map(dept => (
                <span key={dept} className="filter-value">
                  {dept}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {filters.productivityThreshold && filters.productivityThreshold > 0 && (
          <div className="productivity-display">
            <span className="filter-label">Продуктивность:</span>
            <span className="filter-value">
              выше {filters.productivityThreshold}%
            </span>
          </div>
        )}
        
        {filters.includeInactive && (
          <div className="inactive-display">
            <span className="filter-label">Статус:</span>
            <span className="filter-value">Включая неактивных</span>
          </div>
        )}
      </div>

      <div className="filters-actions">
        <button 
          className="clear-filters-btn"
          onClick={handleClearFilters}
        >
          Очистить фильтры
        </button>
      </div>
    </div>
  );
};

export default ReportFilters;