import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateReportForm from '../reports/CreateReportForm';
import { reportService } from '../../services/reportService';
import { ReportTemplate } from '../../types/reports';
import './CreateReportPage.css';

const CreateReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [departments] = useState<string[]>([
    'Разработка', 'Дизайн', 'Маркетинг', 'Тестирование', 'Поддержка'
  ]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const templatesData = await reportService.getTemplates();
      setTemplates(templatesData);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const handleSubmit = async (request: any) => {
    setIsLoading(true);
    try {
      const newReport = await reportService.createReport(request);
      navigate(`/reports/${newReport.id}`);
    } catch (error) {
      console.error('Error creating report:', error);
      alert('Ошибка при создании отчета');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/reports');
  };

  return (
    <div className="create-report-page">
      <div className="page-header">
        <button className="back-button" onClick={handleCancel}>
          ← Назад к отчетам
        </button>
        <h1>Создание отчета</h1>
      </div>

      <div className="form-container">
        <CreateReportForm
          templates={templates}
          departments={departments}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>

      <div className="creation-tips">
        <h3>💡 Советы по созданию отчетов</h3>
        <ul>
          <li>Используйте шаблоны для быстрого создания стандартных отчетов</li>
          <li>Указывайте понятные названия для легкой идентификации отчетов</li>
          <li>Выбирайте соответствующий период для анализа</li>
          <li>Используйте фильтры для фокусировки на важных данных</li>
          <li>Добавляйте получателей для автоматической отправки отчетов</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateReportPage;