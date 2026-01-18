import React from 'react';
import { NotificationSettings as NotificationSettingsType } from '../../types/settings';
import './NotificationSettings.css';

interface NotificationSettingsProps {
  settings: NotificationSettingsType;
  onChange: (settings: NotificationSettingsType) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onChange }) => {
  const handleToggle = (field: keyof NotificationSettingsType) => {
    onChange({ ...settings, [field]: !settings[field] });
  };

  const handleNumberChange = (field: keyof NotificationSettingsType, value: number) => {
    onChange({ ...settings, [field]: value });
  };

  return (
    <div className="notification-settings">
      <div className="settings-section">
        <h3>Каналы уведомлений</h3>
        
        <div className="notification-options">
          <div className="option-row">
            <div className="option-info">
              <h4>Email уведомления</h4>
              <p>Отправлять уведомления на электронную почту</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Push-уведомления</h4>
              <p>Отправлять уведомления в веб-браузер</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleToggle('pushNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Уведомления на рабочем столе</h4>
              <p>Показывать уведомления на экране сотрудника</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.desktopNotifications}
                onChange={() => handleToggle('desktopNotifications')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Типы уведомлений</h3>
        
        <div className="type-options">
          <div className="option-row">
            <div className="option-info">
              <h4>Уведомления о нарушениях</h4>
              <p>Отправлять оповещения при обнаружении нарушений</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.violationAlerts}
                onChange={() => handleToggle('violationAlerts')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Ежедневные отчеты</h4>
              <p>Автоматически отправлять ежедневные отчеты</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.dailyReports}
                onChange={() => handleToggle('dailyReports')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Недельные отчеты</h4>
              <p>Автоматически отправлять недельные отчеты</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.weeklyReports}
                onChange={() => handleToggle('weeklyReports')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Месячные отчеты</h4>
              <p>Автоматически отправлять месячные отчеты</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.monthlyReports}
                onChange={() => handleToggle('monthlyReports')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Эскалация уведомлений</h3>
        
        <div className="escalation-settings">
          <div className="option-row">
            <div className="option-info">
              <h4>Включить эскалацию</h4>
              <p>Автоматически повышать уровень уведомлений при повторных нарушениях</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.escalationEnabled}
                onChange={() => handleToggle('escalationEnabled')}
              />
              <span className="slider"></span>
            </label>
          </div>

          {settings.escalationEnabled && (
            <div className="escalation-levels">
              <div className="form-group">
                <label>Уровни эскалации</label>
                <div className="range-input">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={settings.escalationLevels}
                    onChange={(e) => handleNumberChange('escalationLevels', parseInt(e.target.value))}
                    className="range-slider"
                  />
                  <div className="range-values">
                    <span>1 уровень</span>
                    <span className="current-value">{settings.escalationLevels} уровней</span>
                    <span>5 уровней</span>
                  </div>
                </div>
                <div className="range-hint">
                  Определяет количество уровней эскалации от простого уведомления до экстренного оповещения
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="settings-section">
        <h3>Шаблоны уведомлений</h3>
        <div className="templates-info">
          <p>Настроено шаблонов уведомлений: 4</p>
          <button type="button" className="manage-templates-btn">
            Управление шаблонами
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;