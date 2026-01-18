import React from 'react';
import { Report } from '../../types/reports';
import './ReportDetail.css';

interface ReportDetailProps {
  report: Report;
  onBack: () => void;
  onDownload?: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({
  report,
  onBack,
  onDownload
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeLabel = (type: Report['type']) => {
    switch (type) {
      case 'daily': return 'Ежедневный';
      case 'weekly': return 'Недельный';
      case 'monthly': return 'Месячный';
      case 'custom': return 'Произвольный';
      default: return 'Отчет';
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'generated': return '#52c41a';
      case 'pending': return '#faad14';
      case 'failed': return '#ff4d4f';
      default: return '#8c8c8c';
    }
  };

  const getStatusLabel = (status: Report['status']) => {
    switch (status) {
      case 'generated': return 'Сгенерирован';
      case 'pending': return 'В процессе генерации';
      case 'failed': return 'Ошибка генерации';
      default: return 'Неизвестно';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      case 'stable': return '→';
      default: return '↔';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return '#52c41a';
      case 'down': return '#ff4d4f';
      case 'stable': return '#faad14';
      default: return '#8c8c8c';
    }
  };

  const getTrendLabel = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'Рост';
      case 'down': return 'Снижение';
      case 'stable': return 'Стабильно';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="report-detail">
      <div className="report-header">
        <button className="back-button" onClick={onBack}>
          ← Назад к списку
        </button>
        <div className="header-actions">
          {onDownload && report.status === 'generated' && (
            <button className="download-button" onClick={onDownload}>
              📥 Скачать PDF
            </button>
          )}
          <button className="share-button">
              ↗ Поделиться
          </button>
        </div>
      </div>

      <div className="report-title-section">
        <h1>{report.title}</h1>
        <div className="report-meta">
          <span className="report-type">{getTypeLabel(report.type)}</span>
          <span 
            className="report-status"
            style={{ backgroundColor: getStatusColor(report.status) }}
          >
            {getStatusLabel(report.status)}
          </span>
        </div>
      </div>

      <div className="report-info-grid">
        <div className="info-card">
          <div className="info-label">Период отчета</div>
          <div className="info-value">
            {formatDate(report.dateRange.start)} - {formatDate(report.dateRange.end)}
          </div>
        </div>
        <div className="info-card">
          <div className="info-label">Дата создания</div>
          <div className="info-value">{formatDateTime(report.generatedAt)}</div>
        </div>
        <div className="info-card">
          <div className="info-label">Автор отчета</div>
          <div className="info-value">{report.generatedBy}</div>
        </div>
        <div className="info-card">
          <div className="info-label">Тренд продуктивности</div>
          <div className="info-value">
            <span 
              className="trend-indicator"
              style={{ color: getTrendColor(report.summary.trend) }}
            >
              {getTrendIcon(report.summary.trend)} {getTrendLabel(report.summary.trend)}
            </span>
          </div>
        </div>
      </div>

      <div className="report-summary-section">
        <h2>Сводная информация</h2>
        <div className="summary-grid">
          <div className="summary-card large">
            <div className="summary-icon">👥</div>
            <div className="summary-content">
              <div className="summary-value">{report.summary.totalEmployees}</div>
              <div className="summary-label">Всего сотрудников</div>
            </div>
          </div>
          <div className="summary-card large">
            <div className="summary-icon">📈</div>
            <div className="summary-content">
              <div className="summary-value">{report.summary.averageProductivity}%</div>
              <div className="summary-label">Средняя продуктивность</div>
            </div>
          </div>
          <div className="summary-card large">
            <div className="summary-icon">⏱️</div>
            <div className="summary-content">
              <div className="summary-value">{report.summary.totalHoursTracked} ч</div>
              <div className="summary-label">Всего часов</div>
            </div>
          </div>
          <div className="summary-card large">
            <div className="summary-icon">⚠️</div>
            <div className="summary-content">
              <div className="summary-value">{report.summary.violationsCount}</div>
              <div className="summary-label">Нарушений</div>
            </div>
          </div>
        </div>
      </div>

      {report.summary.topDepartments && report.summary.topDepartments.length > 0 && (
        <div className="departments-section">
          <h2>Статистика по отделам</h2>
          <div className="departments-table">
            <div className="table-header">
              <div className="table-cell">Отдел</div>
              <div className="table-cell">Сотрудников</div>
              <div className="table-cell">Продуктивность</div>
              <div className="table-cell">Часов</div>
            </div>
            {report.summary.topDepartments.map((dept, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">
                  <div className="department-name">
                    <div className="dept-rank">{index + 1}</div>
                    {dept.department}
                  </div>
                </div>
                <div className="table-cell">{dept.employeeCount}</div>
                <div className="table-cell">
                  <div className="productivity-cell">
                    <div className="productivity-bar-container">
                      <div 
                        className="productivity-bar"
                        style={{ width: `${dept.averageProductivity}%` }}
                      />
                    </div>
                    <span className="productivity-value">{dept.averageProductivity}%</span>
                  </div>
                </div>
                <div className="table-cell">{dept.totalHours} ч</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {report.filters && (
        <div className="filters-section">
          <h2>Параметры фильтрации</h2>
          <div className="filters-list">
            {report.filters.departments && report.filters.departments.length > 0 && (
              <div className="filter-item">
                <span className="filter-label">Отделы:</span>
                <div className="filter-values">
                  {report.filters.departments.map(dept => (
                    <span key={dept} className="filter-value">
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {report.filters.productivityThreshold && (
              <div className="filter-item">
                <span className="filter-label">Продуктивность:</span>
                <span className="filter-value">
                  выше {report.filters.productivityThreshold}%
                </span>
              </div>
            )}
            
            {report.filters.includeInactive !== undefined && (
              <div className="filter-item">
                <span className="filter-label">Статус сотрудников:</span>
                <span className="filter-value">
                  {report.filters.includeInactive ? 'Включая неактивных' : 'Только активные'}
                </span>
              </div>
            )}
            
            <div className="filter-item">
              <span className="filter-label">Дата:</span>
              <span className="filter-value">
                {formatDate(report.filters.dateRange.start)} - {formatDate(report.filters.dateRange.end)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="report-notes">
        <h3>Примечания</h3>
        <div className="notes-content">
          <p>
            Данный отчет сгенерирован автоматически на основе данных системы мониторинга.
            Все показатели рассчитаны на основе фактической активности сотрудников.
          </p>
          {report.summary.trend === 'up' && (
            <p className="trend-note positive">
              📈 <strong>Положительная динамика:</strong> Наблюдается рост продуктивности по сравнению с предыдущим периодом.
            </p>
          )}
          {report.summary.trend === 'down' && (
            <p className="trend-note negative">
              📉 <strong>Требует внимания:</strong> Наблюдается снижение продуктивности. Рекомендуется провести анализ причин.
            </p>
          )}
          {report.summary.violationsCount > 10 && (
            <p className="violation-note">
              ⚠️ <strong>Высокий уровень нарушений:</strong> Рекомендуется провести дополнительные мероприятия по повышению дисциплины.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;