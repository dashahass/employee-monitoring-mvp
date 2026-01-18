import React from 'react';
import { MonitoringSettings as MonitoringSettingsType } from '../../types/settings';
import './MonitoringSettings.css';

interface MonitoringSettingsProps {
  settings: MonitoringSettingsType;
  onChange: (settings: MonitoringSettingsType) => void;
}

const MonitoringSettings: React.FC<MonitoringSettingsProps> = ({ settings, onChange }) => {
  const handleToggle = (field: keyof MonitoringSettingsType) => {
    onChange({ ...settings, [field]: !settings[field] });
  };

  const handleNumberChange = (field: keyof MonitoringSettingsType, value: number) => {
    onChange({ ...settings, [field]: value });
  };

  return (
    <div className="monitoring-settings">
      <div className="settings-section">
        <h3>Настройки мониторинга</h3>
        
        <div className="monitoring-options">
          <div className="option-row">
            <div className="option-info">
              <h4>Отслеживание активности</h4>
              <p>Записывать активность приложений и веб-сайтов</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.activityTracking}
                onChange={() => handleToggle('activityTracking')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Мониторинг приложений</h4>
              <p>Отслеживать запущенные приложения и время их использования</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.appMonitoring}
                onChange={() => handleToggle('appMonitoring')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Мониторинг веб-сайтов</h4>
              <p>Отслеживать посещаемые веб-сайты и время на них</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.websiteMonitoring}
                onChange={() => handleToggle('websiteMonitoring')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Запись нажатий клавиш</h4>
              <p>Включить мониторинг нажатий клавиш (требуется согласие сотрудника)</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.keystrokeLogging}
                onChange={() => handleToggle('keystrokeLogging')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Мониторинг передачи файлов</h4>
              <p>Отслеживать передачу файлов через USB и сеть</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.fileTransferMonitoring}
                onChange={() => handleToggle('fileTransferMonitoring')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Настройки скриншотов</h3>
        
        <div className="form-group">
          <div className="option-info">
            <h4>Интервал скриншотов</h4>
            <p>Как часто делать скриншоты экрана (в минутах)</p>
          </div>
          <div className="range-input">
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={settings.screenshotInterval}
              onChange={(e) => handleNumberChange('screenshotInterval', parseInt(e.target.value))}
              className="range-slider"
            />
            <div className="range-values">
              <span>1 мин</span>
              <span className="current-value">{settings.screenshotInterval} мин</span>
              <span>30 мин</span>
            </div>
          </div>
          <div className="range-hint">
            Меньший интервал дает более детальную картину, но увеличивает нагрузку и объем данных
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Пороговые значения</h3>
        
        <div className="thresholds-grid">
          <div className="threshold-item">
            <div className="threshold-info">
              <h4>Порог простоя</h4>
              <p>Время бездействия для определения простоя (минут)</p>
            </div>
            <div className="threshold-input">
              <input
                type="number"
                min="1"
                max="60"
                value={settings.idleThreshold}
                onChange={(e) => handleNumberChange('idleThreshold', parseInt(e.target.value))}
                className="number-input"
              />
              <span className="unit">мин</span>
            </div>
          </div>

          <div className="threshold-item">
            <div className="threshold-info">
              <h4>Минимальная активность</h4>
              <p>Минимальный процент активности для продуктивной работы</p>
            </div>
            <div className="threshold-input">
              <input
                type="number"
                min="10"
                max="100"
                value={settings.minActivityThreshold}
                onChange={(e) => handleNumberChange('minActivityThreshold', parseInt(e.target.value))}
                className="number-input"
              />
              <span className="unit">%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Предупреждения</h3>
        <div className="warnings-info">
          <div className="warning-item">
            <div className="warning-icon">⚠️</div>
            <div className="warning-content">
              <p><strong>Внимание:</strong> Мониторинг нажатий клавиш может нарушать конфиденциальность сотрудников.</p>
              <p>Рекомендуется получить письменное согласие и использовать только для специфических случаев.</p>
            </div>
          </div>
          <div className="warning-item">
            <div className="warning-icon">💾</div>
            <div className="warning-content">
              <p><strong>Хранение данных:</strong> Скриншоты и данные активности занимают значительное место на диске.</p>
              <p>Рекомендуется настроить автоматическую очистку старых данных в настройках конфиденциальности.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringSettings;