import React, { useState } from 'react';
import { Department } from '../../types/employee';
import './EmployeeFilters.css';

interface EmployeeFiltersProps {
  departments: Department[];
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

export interface FilterState {
  department: string;
  status: string[];
  productivityRange: [number, number];
  searchQuery: string;
  sortBy: 'name' | 'productivity' | 'department' | 'status';
  sortOrder: 'asc' | 'desc';
}

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  departments,
  onFilterChange,
  initialFilters
}) => {
  const [filters, setFilters] = useState<FilterState>(() => ({
    department: initialFilters?.department || '',
    status: initialFilters?.status || [],
    productivityRange: initialFilters?.productivityRange || [0, 100],
    searchQuery: initialFilters?.searchQuery || '',
    sortBy: initialFilters?.sortBy || 'name',
    sortOrder: initialFilters?.sortOrder || 'asc'
  }));

  const statusOptions = [
    { value: 'online', label: 'В сети', color: '#52c41a' },
    { value: 'away', label: 'Отошел', color: '#faad14' },
    { value: 'busy', label: 'Занят', color: '#f5222d' },
    { value: 'offline', label: 'Не в сети', color: '#8c8c8c' }
  ];

  const sortOptions = [
    { value: 'name', label: 'По имени' },
    { value: 'productivity', label: 'По продуктивности' },
    { value: 'department', label: 'По отделу' },
    { value: 'status', label: 'По статусу' }
  ];

  const handleDepartmentChange = (value: string) => {
    const newFilters = { ...filters, department: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusToggle = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    
    const newFilters = { ...filters, status: newStatus };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleProductivityChange = (min: number, max: number) => {
    const newFilters = { ...filters, productivityRange: [min, max] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, searchQuery: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

const handleSortChange = (sortBy: typeof filters.sortBy) => {
  const newFilters = { 
    ...filters, 
    sortBy,
    sortOrder: (sortBy === filters.sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc') as "asc" | "desc"
  };
  setFilters(newFilters);
  onFilterChange(newFilters);
};

  const handleClearFilters = () => {
    const newFilters: FilterState = {
      department: '',
      status: [],
      productivityRange: [0, 100],
      searchQuery: '',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="employee-filters">
      <div className="filters-header">
        <h3>Фильтры сотрудников</h3>
        <button 
          className="clear-filters-btn"
          onClick={handleClearFilters}
        >
          Очистить все
        </button>
      </div>

      <div className="search-section">
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Поиск по имени, email или должности..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="filter-sections">
        <div className="filter-section">
          <h4 className="filter-title">Отдел</h4>
          <div className="department-filters">
            <button
              className={`department-filter ${!filters.department ? 'active' : ''}`}
              onClick={() => handleDepartmentChange('')}
            >
              Все отделы
            </button>
            {departments.map(dept => (
              <button
                key={dept.id}
                className={`department-filter ${filters.department === dept.name ? 'active' : ''}`}
                onClick={() => handleDepartmentChange(dept.name)}
                style={{ '--dept-color': dept.color } as React.CSSProperties}
              >
                {dept.name} ({dept.employeeCount})
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4 className="filter-title">Статус</h4>
          <div className="status-filters">
            {statusOptions.map(option => (
              <button
                key={option.value}
                className={`status-filter ${filters.status.includes(option.value) ? 'active' : ''}`}
                onClick={() => handleStatusToggle(option.value)}
                style={{ '--status-color': option.color } as React.CSSProperties}
              >
                <span className="status-dot" />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4 className="filter-title">Продуктивность</h4>
          <div className="productivity-filter">
            <div className="range-labels">
              <span>0%</span>
              <span className="current-range">
                {filters.productivityRange[0]}% - {filters.productivityRange[1]}%
              </span>
              <span>100%</span>
            </div>
            <div className="range-slider">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.productivityRange[0]}
                onChange={(e) => handleProductivityChange(Number(e.target.value), filters.productivityRange[1])}
                className="range-min"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.productivityRange[1]}
                onChange={(e) => handleProductivityChange(filters.productivityRange[0], Number(e.target.value))}
                className="range-max"
              />
              <div className="range-track" />
              <div 
                className="range-selection"
                style={{
                  left: `${filters.productivityRange[0]}%`,
                  width: `${filters.productivityRange[1] - filters.productivityRange[0]}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="filter-section">
          <h4 className="filter-title">Сортировка</h4>
          <div className="sort-filters">
            {sortOptions.map(option => (
              <button
                key={option.value}
                className={`sort-filter ${filters.sortBy === option.value ? 'active' : ''}`}
                onClick={() => handleSortChange(option.value as typeof filters.sortBy)}
              >
                {option.label}
                {filters.sortBy === option.value && (
                  <span className="sort-order">
                    {filters.sortOrder === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="active-filters">
        {filters.department && (
          <span className="active-filter">
            Отдел: {filters.department}
            <button onClick={() => handleDepartmentChange('')}>×</button>
          </span>
        )}
        {filters.status.map(status => {
          const option = statusOptions.find(opt => opt.value === status);
          return (
            <span key={status} className="active-filter">
              Статус: {option?.label}
              <button onClick={() => handleStatusToggle(status)}>×</button>
            </span>
          );
        })}
        {(filters.productivityRange[0] > 0 || filters.productivityRange[1] < 100) && (
          <span className="active-filter">
            Продуктивность: {filters.productivityRange[0]}%-{filters.productivityRange[1]}%
            <button onClick={() => handleProductivityChange(0, 100)}>×</button>
          </span>
        )}
        {filters.searchQuery && (
          <span className="active-filter">
            Поиск: "{filters.searchQuery}"
            <button onClick={() => handleSearchChange('')}>×</button>
          </span>
        )}
      </div>
    </div>
  );
};

export default EmployeeFilters;