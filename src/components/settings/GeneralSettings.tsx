import React from 'react';
import { GeneralSettings as GeneralSettingsType } from '../../types/settings';
import './GeneralSettings.css';

interface GeneralSettingsProps {
  settings: GeneralSettingsType;
  onChange: (settings: GeneralSettingsType) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ settings, onChange }) => {
  const handleInputChange = (field: keyof GeneralSettingsType, value: any) => {
    onChange({ ...settings, [field]: value });
  };

  const handleWorkHoursChange = (field: 'start' | 'end', value: string) => {
    onChange({
      ...settings,
      workHours: { ...settings.workHours, [field]: value }
    });
  };

  const handleDayToggle = (day: number) => {
    const newDays = settings.workHours.days.includes(day)
      ? settings.workHours.days.filter(d => d !== day)
      : [...settings.workHours.days, day].sort();
    
    onChange({
      ...settings,
      workHours: { ...settings.workHours, days: newDays }
    });
  };

  const daysOfWeek = [
    { id: 0, label: 'Вс', name: 'Воскресенье' },
    { id: 1, label: 'Пн', name: 'Понедельник' },
    { id: 2, label: 'Вт', name: 'Вторник' },
    { id: 3, label: 'Ср', name: 'Среда' },
    { id: 4, label: 'Чт', name: 'Четверг' },
    { id: 5, label: 'Пт', name: 'Пятница' },
    { id: 6, label: 'Сб', name: 'Суббота' }
  ];

  const timezones = [
    'Europe/Moscow',
    'Europe/London',
    'Europe/Berlin',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Asia/Shanghai'
  ];

  return (
    <div className="general-settings">
      <div className="settings-section">
        <h3>Основная информация</h3>
        
        <div className="form-group">
          <label>Название компании *</label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Введите название компании"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Часовой пояс *</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleInputChange('timezone', e.target.value)}
              className="form-select"
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Язык интерфейса *</label>
            <select
              value={settings.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="form-select"
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Формат даты</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleInputChange('dateFormat', e.target.value)}
              className="form-select"
            >
              <option value="DD.MM.YYYY">DD.MM.YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            </select>
          </div>

          <div className="form-group">
            <label>Формат времени</label>
            <select
              value={settings.timeFormat}
              onChange={(e) => handleInputChange('timeFormat', e.target.value)}
              className="form-select"
            >
              <option value="HH:mm">24-часовой (HH:mm)</option>
              <option value="hh:mm A">12-часовой (hh:mm AM/PM)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Рабочее время</h3>
        
        <div className="form-row">
          <div className="form-group">
            <label>Начало рабочего дня</label>
            <input
              type="time"
              value={settings.workHours.start}
              onChange={(e) => handleWorkHoursChange('start', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Окончание рабочего дня</label>
            <input
              type="time"
              value={settings.workHours.end}
              onChange={(e) => handleWorkHoursChange('end', e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Рабочие дни</label>
          <div className="days-selector">
            {daysOfWeek.map(day => (
              <button
                key={day.id}
                type="button"
                className={`day-button ${settings.workHours.days.includes(day.id) ? 'active' : ''}`}
                onClick={() => handleDayToggle(day.id)}
                title={day.name}
              >
                {day.label}
              </button>
            ))}
          </div>
          <div className="days-hint">
            Выбрано дней: {settings.workHours.days.length}
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Безопасность сессии</h3>
        
        <div className="form-group">
          <label>Автоматический выход (минут)</label>
          <div className="range-input">
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              value={settings.autoLogout}
              onChange={(e) => handleInputChange('autoLogout', parseInt(e.target.value))}
              className="range-slider"
            />
            <div className="range-value">
              {settings.autoLogout} минут
            </div>
          </div>
          <div className="range-hint">
            Пользователь будет автоматически разлогинен после указанного времени бездействия
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Праздничные дни</h3>
        <div className="holidays-info">
          <p className="holidays-text">
            Настроено праздничных дней: {settings.holidays.length}
          </p>
          <button type="button" className="manage-holidays-btn">
            Управление праздничными днями
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;