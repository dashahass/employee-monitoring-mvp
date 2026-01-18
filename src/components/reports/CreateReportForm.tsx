import React, { useState, useEffect } from 'react';
import { 
  ReportGenerationRequest, 
  ReportTemplate 
} from '../../types/reports';
import './CreateReportForm.css';

interface CreateReportFormProps {
  templates: ReportTemplate[];
  departments: string[];
  onSubmit: (request: ReportGenerationRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const CreateReportForm: React.FC<CreateReportFormProps> = ({
  templates,
  departments,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [useTemplate, setUseTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [formData, setFormData] = useState<ReportGenerationRequest>({
    title: '',
    type: 'custom',
    filters: {
      dateRange: {
        start: new Date(new Date().setDate(new Date().getDate() - 30)),
        end: new Date()
      }
    },
    recipients: []
  });

  // При выборе шаблона
  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find(t => t.id === selectedTemplate);
      if (template) {
        setFormData(prev => ({
          ...prev,
          type: template.type,
          filters: {
            ...prev.filters,
            ...template.defaultFilters
          }
        }));
      }
    }
  }, [selectedTemplate, templates]);

  const handleInputChange = (field: keyof ReportGenerationRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFilterChange = (field: keyof ReportGenerationRequest['filters'], value: any) => {
    setFormData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [field]: value
      }
    }));
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    handleFilterChange('dateRange', {
      ...formData.filters.dateRange,
      [type]: new Date(value)
    });
  };

  const handleDepartmentToggle = (department: string) => {
    const currentDepartments = formData.filters.departments || [];
    const newDepartments = currentDepartments.includes(department)
      ? currentDepartments.filter(d => d !== department)
      : [...currentDepartments, department];
    
    handleFilterChange('departments', newDepartments);
  };

  const handleRecipientChange = (index: number, value: string) => {
    const newRecipients = [...(formData.recipients || [])];
    newRecipients[index] = value;
    handleInputChange('recipients', newRecipients);
  };

  const addRecipient = () => {
    handleInputChange('recipients', [...(formData.recipients || []), '']);
  };

  const removeRecipient = (index: number) => {
    const newRecipients = [...(formData.recipients || [])];
    newRecipients.splice(index, 1);
    handleInputChange('recipients', newRecipients);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.title.trim()) {
      alert('Введите название отчета');
      return;
    }

    if (formData.filters.dateRange.start > formData.filters.dateRange.end) {
      alert('Дата начала не может быть позже даты окончания');
      return;
    }

    onSubmit(formData);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="create-report-form">
      <div className="form-header">
        <h2>Создание нового отчета</h2>
        <div className="form-steps">
          <div className={`step ${step === 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Настройки</div>
          </div>
          <div className="step-divider"></div>
          <div className={`step ${step === 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Параметры</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 ? (
          <div className="form-step">
            <div className="form-section">
              <h3>Основные настройки</h3>
              
              <div className="form-group">
                <label>Название отчета *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Например: Ежедневный отчет за 15 января"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Тип отчета</label>
                <div className="type-options">
                  <button
                    type="button"
                    className={`type-option ${formData.type === 'daily' ? 'active' : ''}`}
                    onClick={() => handleInputChange('type', 'daily')}
                  >
                    📅 Ежедневный
                  </button>
                  <button
                    type="button"
                    className={`type-option ${formData.type === 'weekly' ? 'active' : ''}`}
                    onClick={() => handleInputChange('type', 'weekly')}
                  >
                    📆 Недельный
                  </button>
                  <button
                    type="button"
                    className={`type-option ${formData.type === 'monthly' ? 'active' : ''}`}
                    onClick={() => handleInputChange('type', 'monthly')}
                  >
                    🗓️ Месячный
                  </button>
                  <button
                    type="button"
                    className={`type-option ${formData.type === 'custom' ? 'active' : ''}`}
                    onClick={() => handleInputChange('type', 'custom')}
                  >
                    📊 Произвольный
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={useTemplate}
                    onChange={(e) => setUseTemplate(e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  Использовать шаблон
                </label>
              </div>

              {useTemplate && (
                <div className="form-group">
                  <label>Выберите шаблон</label>
                  <div className="template-options">
                    {templates.map(template => (
                      <div
                        key={template.id}
                        className={`template-option ${selectedTemplate === template.id ? 'active' : ''}`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="template-icon">
                          {template.type === 'daily' ? '📅' :
                           template.type === 'weekly' ? '📆' :
                           template.type === 'monthly' ? '🗓️' : '📊'}
                        </div>
                        <div className="template-info">
                          <h4>{template.name}</h4>
                          <p>{template.description}</p>
                          {template.schedule?.enabled && (
                            <span className="schedule-badge">
                              🔄 По расписанию
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={onCancel}
              >
                Отмена
              </button>
              <button
                type="button"
                className="next-button"
                onClick={() => setStep(2)}
                disabled={!formData.title.trim()}
              >
                Далее →
              </button>
            </div>
          </div>
        ) : (
          <div className="form-step">
            <div className="form-section">
              <h3>Параметры фильтрации</h3>
              
              <div className="form-group">
                <label>Период отчета *</label>
                <div className="date-range-inputs">
                  <div className="date-input-group">
                    <input
                      type="date"
                      value={formatDateForInput(formData.filters.dateRange.start)}
                      onChange={(e) => handleDateChange('start', e.target.value)}
                      className="form-input"
                      required
                    />
                    <span className="date-label">с</span>
                  </div>
                  <div className="date-input-group">
                    <input
                      type="date"
                      value={formatDateForInput(formData.filters.dateRange.end)}
                      onChange={(e) => handleDateChange('end', e.target.value)}
                      className="form-input"
                      required
                    />
                    <span className="date-label">по</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Отделы (необязательно)</label>
                <div className="department-options">
                  {departments.map(dept => (
                    <button
                      type="button"
                      key={dept}
                      className={`department-option ${formData.filters.departments?.includes(dept) ? 'active' : ''}`}
                      onClick={() => handleDepartmentToggle(dept)}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Минимальная продуктивность</label>
                <div className="range-input-group">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.filters.productivityThreshold || 0}
                    onChange={(e) => handleFilterChange('productivityThreshold', Number(e.target.value))}
                    className="range-slider"
                  />
                  <div className="range-value">
                    {formData.filters.productivityThreshold || 0}%
                  </div>
                </div>
                <div className="range-hint">
                  Показывать сотрудников с продуктивностью выше указанного значения
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.filters.includeInactive || false}
                    onChange={(e) => handleFilterChange('includeInactive', e.target.checked)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  Включать неактивных сотрудников
                </label>
              </div>
            </div>

            <div className="form-section">
              <h3>Получатели отчета (необязательно)</h3>
              <div className="recipients-list">
                {(formData.recipients || []).map((recipient, index) => (
                  <div key={index} className="recipient-item">
                    <input
                      type="email"
                      value={recipient}
                      onChange={(e) => handleRecipientChange(index, e.target.value)}
                      placeholder="email@example.com"
                      className="form-input"
                    />
                    <button
                      type="button"
                      className="remove-recipient"
                      onClick={() => removeRecipient(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-recipient"
                  onClick={addRecipient}
                >
                  + Добавить получателя
                </button>
              </div>
            </div>

            <div className="form-summary">
              <h4>Сводка параметров</h4>
              <div className="summary-items">
                <div className="summary-item">
                  <span className="summary-label">Название:</span>
                  <span className="summary-value">{formData.title || 'Не указано'}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Тип:</span>
                  <span className="summary-value">
                    {formData.type === 'daily' ? 'Ежедневный' :
                     formData.type === 'weekly' ? 'Недельный' :
                     formData.type === 'monthly' ? 'Месячный' : 'Произвольный'}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Период:</span>
                  <span className="summary-value">
                    {formatDateForInput(formData.filters.dateRange.start)} - {formatDateForInput(formData.filters.dateRange.end)}
                  </span>
                </div>
                {formData.filters.departments && formData.filters.departments.length > 0 && (
                  <div className="summary-item">
                    <span className="summary-label">Отделы:</span>
                    <span className="summary-value">
                      {formData.filters.departments.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="back-button"
                onClick={() => setStep(1)}
              >
                ← Назад
              </button>
              <div className="right-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={onCancel}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Создание...' : 'Создать отчет'}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateReportForm;