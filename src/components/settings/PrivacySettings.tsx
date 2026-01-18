import React, { useState } from 'react';
import { PrivacySettings as PrivacySettingsType } from '../../types/settings';
import './PrivacySettings.css';

interface PrivacySettingsProps {
  settings: PrivacySettingsType;
  onChange: (settings: PrivacySettingsType) => void;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({ settings, onChange }) => {
  const [newSensitiveApp, setNewSensitiveApp] = useState('');

  const handleToggle = (field: keyof PrivacySettingsType) => {
    onChange({ ...settings, [field]: !settings[field] });
  };

  const handleNumberChange = (field: keyof PrivacySettingsType, value: number) => {
    onChange({ ...settings, [field]: value });
  };

  const handleAddSensitiveApp = () => {
    if (newSensitiveApp.trim() && !settings.excludeSensitiveApps.includes(newSensitiveApp.trim())) {
      onChange({
        ...settings,
        excludeSensitiveApps: [...settings.excludeSensitiveApps, newSensitiveApp.trim()]
      });
      setNewSensitiveApp('');
    }
  };

  const handleRemoveSensitiveApp = (app: string) => {
    onChange({
      ...settings,
      excludeSensitiveApps: settings.excludeSensitiveApps.filter(a => a !== app)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSensitiveApp();
    }
  };

  return (
    <div className="privacy-settings">
      <div className="settings-section">
        <h3>Хранение данных</h3>
        
        <div className="privacy-options">
          <div className="option-row">
            <div className="option-info">
              <h4>Срок хранения данных</h4>
              <p>Количество дней для хранения данных мониторинга</p>
            </div>
            <div className="option-control">
              <input
                type="number"
                min="1"
                max="365"
                value={settings.dataRetention}
                onChange={(e) => handleNumberChange('dataRetention', parseInt(e.target.value))}
                className="number-input"
              />
              <span className="unit">дней</span>
            </div>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Автоматическое удаление старых данных</h4>
              <p>Автоматически удалять данные, превышающие срок хранения</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.autoDeleteOldData}
                onChange={() => handleToggle('autoDeleteOldData')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Анонимизация данных</h4>
              <p>Удалять персональные данные из старых записей</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.anonymizeData}
                onChange={() => handleToggle('anonymizeData')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Разрешить экспорт данных</h4>
              <p>Разрешить администраторам экспортировать данные в CSV/Excel</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.exportAllowed}
                onChange={() => handleToggle('exportAllowed')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Конфиденциальность скриншотов</h3>
        
        <div className="screenshot-settings">
          <div className="option-row">
            <div className="option-info">
              <h4>Размытие скриншотов</h4>
              <p>Автоматически размывать чувствительные области на скриншотах</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.screenshotBlur}
                onChange={() => handleToggle('screenshotBlur')}
              />
              <span className="slider"></span>
            </label>
          </div>

          {settings.screenshotBlur && (
            <div className="blur-settings">
              <div className="form-group">
                <label>Интенсивность размытия</label>
                <div className="range-input">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={settings.blurIntensity}
                    onChange={(e) => handleNumberChange('blurIntensity', parseInt(e.target.value))}
                    className="range-slider"
                  />
                  <div className="range-values">
                    <span>Слабое</span>
                    <span className="current-value">Уровень {settings.blurIntensity}</span>
                    <span>Сильное</span>
                  </div>
                </div>
                <div className="range-hint">
                  Высокий уровень размытия лучше защищает приватность, но может скрыть важную информацию
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="settings-section">
        <h3>Исключения мониторинга</h3>
        
        <div className="exclusion-settings">
          <div className="form-group">
            <label>Чувствительные приложения</label>
            <p className="section-description">
              Приложения, которые не будут отслеживаться (например, менеджеры паролей, банковские приложения)
            </p>
            
            <div className="sensitive-apps-list">
              {settings.excludeSensitiveApps.map((app, index) => (
                <div key={index} className="app-tag">
                  <span>{app}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSensitiveApp(app)}
                    className="remove-app"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="add-app-container">
              <input
                type="text"
                value={newSensitiveApp}
                onChange={(e) => setNewSensitiveApp(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введите название приложения (например: keepass.exe)"
                className="form-input"
              />
              <button
                type="button"
                onClick={handleAddSensitiveApp}
                className="add-app-btn"
                disabled={!newSensitiveApp.trim()}
              >
                Добавить
              </button>
            </div>
            <div className="input-hint">
              Используйте точные имена исполняемых файлов с расширением .exe
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Политика конфиденциальности</h3>
        <div className="privacy-policy">
          <div className="policy-item">
            <div className="policy-icon">👁️</div>
            <div className="policy-content">
              <h4>Прозрачность мониторинга</h4>
              <p>Сотрудники должны быть проинформированы о мониторинге и дать согласие на его проведение.</p>
            </div>
          </div>
          <div className="policy-item">
            <div className="policy-icon">⚖️</div>
            <div className="policy-content">
              <h4>Пропорциональность</h4>
              <p>Мониторинг должен быть пропорционален целям и не нарушать чрезмерно приватность сотрудников.</p>
            </div>
          </div>
          <div className="policy-item">
            <div className="policy-icon">🔐</div>
            <div className="policy-content">
              <h4>Защита данных</h4>
              <p>Все собранные данные должны быть защищены от несанкционированного доступа и утечек.</p>
            </div>
          </div>
          <div className="policy-item">
            <div className="policy-icon">⏰</div>
            <div className="policy-content">
              <h4>Ограничение хранения</h4>
              <p>Данные должны храниться только столько времени, сколько необходимо для достижения целей мониторинга.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;