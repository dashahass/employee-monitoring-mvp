import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReportDetail from '../reports/ReportDetail';
import Loading from '../common/Loading';
import { reportService } from '../../services/reportService';
import { Report } from '../../types/reports';
import './ReportDetailPage.css';

const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    if (id) {
      loadReport(parseInt(id));
    }
  }, [id]);

  const loadReport = async (reportId: number) => {
    setIsLoading(true);
    try {
      const reportData = await reportService.getReportById(reportId);
      setReport(reportData);
    } catch (error) {
      console.error('Error loading report:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/reports');
  };

  const handleDownload = async () => {
    if (!report) return;
    
    try {
      const downloadUrl = await reportService.downloadReport(report.id);
      // Имитация скачивания
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Ошибка при скачивании отчета');
    }
  };

  if (isLoading) {
    return (
      <div className="report-detail-loading">
        <Loading text="Загрузка отчета..." size="large" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="report-not-found">
        <div className="not-found-content">
          <h2>Отчет не найден</h2>
          <p>Запрашиваемый отчет не существует или был удален.</p>
          <button onClick={handleBack} className="back-button">
            Вернуться к списку отчетов
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-detail-page">
      <ReportDetail
        report={report}
        onBack={handleBack}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default ReportDetailPage;