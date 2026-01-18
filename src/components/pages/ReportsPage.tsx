import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReportCard from '../reports/ReportCard';
import ReportFilters from '../reports/ReportFilters';
import Loading from '../common/Loading';
import { reportService } from '../../services/reportService';
import { Report, ReportFilters as ReportFiltersType } from '../../types/reports';
import './ReportsPage.css';

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [reportType, setReportType] = useState<'all' | 'daily' | 'weekly' | 'monthly' | 'custom'>('all');
  const [filters, setFilters] = useState<ReportFiltersType>({
    dateRange: {
      start: new Date(new Date().setDate(new Date().getDate() - 30)),
      end: new Date()
    }
  });

  // Загрузка отчетов
  const loadReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const reportsData = await reportService.getReports();
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Применение фильтров
  const applyFilters = useCallback(() => {
    let filtered = [...reports];

    // Фильтрация по типу
    if (reportType !== 'all') {
      filtered = filtered.filter(report => report.type === reportType);
    }

    // Фильтрация по дате
    filtered = filtered.filter(report => {
      const reportDate = report.generatedAt;
      return reportDate >= filters.dateRange.start && reportDate <= filters.dateRange.end;
    });

    setFilteredReports(filtered);
  }, [reports, reportType, filters]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (newFilters: ReportFiltersType) => {
    setFilters(newFilters);
  };

  const handleReportTypeChange = (type: typeof reportType) => {
    setReportType(type);
  };

  const handleViewReport = (id: number) => {
    navigate(`/reports/${id}`);
  };

  const handleDownloadReport = async (id: number) => {
    try {
      const downloadUrl = await reportService.downloadReport(id);
      // Имитация скачивания
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Ошибка при скачивании отчета');
    }
  };

  const handleDeleteReport = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отчет?')) {
      try {
        const success = await reportService.deleteReport(id);
        if (success) {
          setReports(prev => prev.filter(report => report.id !== id));
        }
      } catch (error) {
        console.error('Error deleting report:', error);
        alert('Ошибка при удалении отчета');
      }
    }
  };

  const handleCreateNewReport = () => {
    navigate('/reports/new');
  };

  const departments = ['Разработка', 'Дизайн', 'Маркетинг', 'Тестирование', 'Поддержка'];

  if (isLoading) {
    return (
      <div className="reports-loading">
        <Loading text="Загрузка отчетов..." size="large" />
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Отчеты</h1>
        </div>
        <div className="header-actions">
          <button 
            className="create-report-btn"
            onClick={handleCreateNewReport}
          >
            📊 Создать отчет
          </button>
        </div>
      </div>

      <ReportFilters
        onFilterChange={handleFilterChange}
        initialFilters={filters}
        departments={departments}
      />

      <div className="reports-toolbar">
        <div className="type-filters">
          <button 
            className={`type-filter ${reportType === 'all' ? 'active' : ''}`}
            onClick={() => handleReportTypeChange('all')}
          >
            Все отчеты
          </button>
          <button 
            className={`type-filter ${reportType === 'daily' ? 'active' : ''}`}
            onClick={() => handleReportTypeChange('daily')}
          >
            📅 Ежедневные
          </button>
          <button 
            className={`type-filter ${reportType === 'weekly' ? 'active' : ''}`}
            onClick={() => handleReportTypeChange('weekly')}
          >
            📆 Недельные
          </button>
          <button 
            className={`type-filter ${reportType === 'monthly' ? 'active' : ''}`}
            onClick={() => handleReportTypeChange('monthly')}
          >
            🗓️ Месячные
          </button>
          <button 
            className={`type-filter ${reportType === 'custom' ? 'active' : ''}`}
            onClick={() => handleReportTypeChange('custom')}
          >
            📊 Произвольные
          </button>
        </div>

        <div className="view-controls">
          <span className="results-count">
            Найдено: <strong>{filteredReports.length}</strong> отчетов
          </span>
          <div className="view-buttons">
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
              onClick={loadReports}
              title="Обновить отчеты"
            >
              🔄
            </button>
          </div>
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="no-reports">
          <div className="no-reports-icon">📊</div>
          <h3>Отчеты не найдены</h3>
          <p>Попробуйте изменить параметры фильтрации или создать новый отчет</p>
          <button 
            className="create-first-report-btn"
            onClick={handleCreateNewReport}
          >
            Создать первый отчет
          </button>
        </div>
      ) : (
        <div className={`reports-container ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}>
          {filteredReports.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              onView={handleViewReport}
              onDownload={handleDownloadReport}
              onDelete={handleDeleteReport}
            />
          ))}
        </div>
      )}

      <div className="reports-summary">
        <div className="summary-card">
          <div className="summary-icon">📄</div>
          <div className="summary-content">
            <div className="summary-value">{reports.length}</div>
            <div className="summary-label">Всего отчетов</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">✅</div>
          <div className="summary-content">
            <div className="summary-value">
              {reports.filter(r => r.status === 'generated').length}
            </div>
            <div className="summary-label">Сгенерировано</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">⏳</div>
          <div className="summary-content">
            <div className="summary-value">
              {reports.filter(r => r.status === 'pending').length}
            </div>
            <div className="summary-label">В процессе</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">📈</div>
          <div className="summary-content">
            <div className="summary-value">
              {Math.round(reports.reduce((sum, r) => sum + r.summary.averageProductivity, 0) / reports.length) || 0}%
            </div>
            <div className="summary-label">Средняя продуктивность</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;