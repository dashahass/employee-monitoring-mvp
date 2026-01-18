import React from 'react';
import { Report } from '../../types/reports';
import './ReportCard.css';

interface ReportCardProps {
  report: Report;
  onView: (id: number) => void;
  onDownload?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({
  report,
  onView,
  onDownload,
  onDelete
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'daily': return '📅';
      case 'weekly': return '📆';
      case 'monthly': return '🗓️';
      case 'custom': return '📊';
      default: return '📄';
    }
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
      case 'pending': return 'В процессе';
      case 'failed': return 'Ошибка';
      default: return 'Неизвестно';
    }
  };

  const handleView = () => {
    onView(report.id);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDownload && report.status === 'generated') {
      onDownload(report.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(report.id);
    }
  };

  return (
    <div className="report-card" onClick={handleView}>
      <div className="report-header">
        <div className="report-type">
          <span className="type-icon">{getTypeIcon(report.type)}</span>
          <span className="type-label">{getTypeLabel(report.type)}</span>
        </div>
        <div 
          className="report-status"
          style={{ backgroundColor: getStatusColor(report.status) }}
        >
          {getStatusLabel(report.status)}
        </div>
      </div>

      <div className="report-content">
        <h3 className="report-title">{report.title}</h3>
        
        <div className="report-dates">
          <div className="date-info">
            <span className="date-label">Период:</span>
            <span className="date-value">
              {formatDate(report.dateRange.start)} - {formatDate(report.dateRange.end)}
            </span>
          </div>
          <div className="date-info">
            <span className="date-label">Создан:</span>
            <span className="date-value">{formatDateTime(report.generatedAt)}</span>
          </div>
          <div className="date-info">
            <span className="date-label">Автор:</span>
            <span className="date-value">{report.generatedBy}</span>
          </div>
        </div>

        <div className="report-summary">
          <div className="summary-item">
            <span className="summary-value">{report.summary.totalEmployees}</span>
            <span className="summary-label">Сотрудников</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">{report.summary.averageProductivity}%</span>
            <span className="summary-label">Продуктивность</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">{report.summary.violationsCount}</span>
            <span className="summary-label">Нарушений</span>
          </div>
          <div className="summary-item">
            <span className="summary-value">{report.summary.totalHoursTracked}</span>
            <span className="summary-label">Часов</span>
          </div>
        </div>

        {report.summary.topDepartments && report.summary.topDepartments.length > 0 && (
          <div className="top-departments">
            <span className="departments-label">Топ отделы:</span>
            <div className="departments-list">
              {report.summary.topDepartments.slice(0, 2).map((dept, index) => (
                <span key={index} className="department-tag">
                  {dept.department} ({dept.averageProductivity}%)
                </span>
              ))}
              {report.summary.topDepartments.length > 2 && (
                <span className="more-departments">
                  +{report.summary.topDepartments.length - 2} еще
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="report-actions">
        <button 
          className="action-button view-button"
          onClick={handleView}
        >
          Просмотр
        </button>
        
        {report.status === 'generated' && onDownload && (
          <button 
            className="action-button download-button"
            onClick={handleDownload}
          >
            Скачать
          </button>
        )}
        
        {onDelete && (
          <button 
            className="action-button delete-button"
            onClick={handleDelete}
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportCard;