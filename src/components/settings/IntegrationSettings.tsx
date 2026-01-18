import React, { useState } from 'react';
import { IntegrationSettings as IntegrationSettingsType, SMTPConfig, ActiveDirectoryConfig } from '../../types/settings';
import { settingsService } from '../../services/settingsService';
import './IntegrationSettings.css';

interface IntegrationSettingsProps {
  settings: IntegrationSettingsType;
  onChange: (settings: IntegrationSettingsType) => void;
}

const IntegrationSettings: React.FC<IntegrationSettingsProps> = ({ settings, onChange }) => {
  const [testing, setTesting] = useState<{ [key: string]: boolean }>({});
  const [testResults, setTestResults] = useState<{ [key: string]: { success: boolean; message: string } }>({});

  const handleToggle = (field: keyof IntegrationSettingsType) => {
    onChange({ ...settings, [field]: !settings[field] });
  };

  const handleInputChange = (field: keyof IntegrationSettingsType, value: any) => {
    onChange({ ...settings, [field]: value });
  };

  const handleSMTPConfigChange = (field: keyof SMTPConfig, value: any) => {
    onChange({
      ...settings,
      smtpConfig: settings.smtpConfig ? {
        ...settings.smtpConfig,
        [field]: value
      } : undefined
    });
  };

  const handleADConfigChange = (field: keyof ActiveDirectoryConfig, value: any) => {
    onChange({
      ...settings,
      activeDirectoryConfig: settings.activeDirectoryConfig ? {
        ...settings.activeDirectoryConfig,
        [field]: value
      } : undefined
    });
  };

  const testConnection = async (type: 'ad' | 'smtp') => {
    setTesting({ ...testing, [type]: true });
    
    try {
      let result;
      if (type === 'ad' && settings.activeDirectoryConfig) {
        result = await settingsService.testActiveDirectoryConnection(settings.activeDirectoryConfig);
      } else if (type === 'smtp' && settings.smtpConfig) {
        result = await settingsService.testSMTPConnection(settings.smtpConfig);
      } else {
        result = { success: false, message: 'Конфигурация не настроена' };
      }
      
      setTestResults({ ...testResults, [type]: result });
    } catch (error) {
      setTestResults({ 
        ...testResults, 
        [type]: { 
          success: false, 
          message: 'Ошибка при тестировании соединения' 
        } 
      });
    } finally {
      setTesting({ ...testing, [type]: false });
    }
  };

  return (
    <div className="integration-settings">
      <div className="settings-section">
        <h3>Интеграции</h3>
        
        <div className="integration-options">
          <div className="option-row">
            <div className="option-info">
              <h4>Active Directory</h4>
              <p>Интеграция с Microsoft Active Directory для синхронизации пользователей</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.activeDirectoryEnabled}
                onChange={() => handleToggle('activeDirectoryEnabled')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Slack</h4>
              <p>Интеграция с Slack для отправки уведомлений</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.slackIntegration}
                onChange={() => handleToggle('slackIntegration')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>Email</h4>
              <p>Интеграция с почтовым сервером для отправки email</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.emailIntegration}
                onChange={() => handleToggle('emailIntegration')}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="option-row">
            <div className="option-info">
              <h4>API</h4>
              <p>Включить REST API для интеграции с другими системами</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.apiEnabled}
                onChange={() => handleToggle('apiEnabled')}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>

      {settings.activeDirectoryEnabled && (
        <div className="settings-section">
          <h4>Настройки Active Directory</h4>
          <div className="config-form">
            <div className="form-group">
              <label>Домен</label>
              <input
                type="text"
                value={settings.activeDirectoryConfig?.domain || ''}
                onChange={(e) => handleADConfigChange('domain', e.target.value)}
                placeholder="example.local"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Сервер</label>
              <input
                type="text"
                value={settings.activeDirectoryConfig?.server || ''}
                onChange={(e) => handleADConfigChange('server', e.target.value)}
                placeholder="dc.example.local"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Base DN</label>
              <input
                type="text"
                value={settings.activeDirectoryConfig?.baseDN || ''}
                onChange={(e) => handleADConfigChange('baseDN', e.target.value)}
                placeholder="DC=example,DC=local"
                className="form-input"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Пользователь</label>
                <input
                  type="text"
                  value={settings.activeDirectoryConfig?.username || ''}
                  onChange={(e) => handleADConfigChange('username', e.target.value)}
                  placeholder="admin"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input
                  type="password"
                  value={settings.activeDirectoryConfig?.password || ''}
                  onChange={(e) => handleADConfigChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-actions">
              <button
                className="test-btn"
                onClick={() => testConnection('ad')}
                disabled={testing.ad}
              >
                {testing.ad ? 'Тестирование...' : 'Тестировать соединение'}
              </button>
              {testResults.ad && (
                <div className={`test-result ${testResults.ad.success ? 'success' : 'error'}`}>
                  {testResults.ad.success ? '✅' : '❌'} {testResults.ad.message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {settings.slackIntegration && (
        <div className="settings-section">
          <h4>Настройки Slack</h4>
          <div className="form-group">
            <label>Webhook URL</label>
            <input
              type="text"
              value={settings.slackWebhook || ''}
              onChange={(e) => handleInputChange('slackWebhook', e.target.value)}
              placeholder="https://hooks.slack.com/services/..."
              className="form-input"
            />
            <div className="input-hint">
              Создайте Incoming Webhook в настройках Slack и вставьте URL сюда
            </div>
          </div>
        </div>
      )}

      {settings.emailIntegration && (
        <div className="settings-section">
          <h4>Настройки SMTP</h4>
          <div className="config-form">
            <div className="form-row">
              <div className="form-group">
                <label>SMTP Сервер</label>
                <input
                  type="text"
                  value={settings.smtpConfig?.host || ''}
                  onChange={(e) => handleSMTPConfigChange('host', e.target.value)}
                  placeholder="smtp.gmail.com"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Порт</label>
                <input
                  type="number"
                  value={settings.smtpConfig?.port || 587}
                  onChange={(e) => handleSMTPConfigChange('port', parseInt(e.target.value))}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Отправитель</label>
              <input
                type="email"
                value={settings.smtpConfig?.from || ''}
                onChange={(e) => handleSMTPConfigChange('from', e.target.value)}
                placeholder="noreply@company.com"
                className="form-input"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Пользователь</label>
                <input
                  type="text"
                  value={settings.smtpConfig?.auth?.user || ''}
                  onChange={(e) => handleSMTPConfigChange('auth', { ...settings.smtpConfig?.auth, user: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input
                  type="password"
                  value={settings.smtpConfig?.auth?.pass || ''}
                  onChange={(e) => handleSMTPConfigChange('auth', { ...settings.smtpConfig?.auth, pass: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={settings.smtpConfig?.secure || false}
                  onChange={(e) => handleSMTPConfigChange('secure', e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                Использовать SSL/TLS
              </label>
            </div>
            <div className="form-actions">
              <button
                className="test-btn"
                onClick={() => testConnection('smtp')}
                disabled={testing.smtp}
              >
                {testing.smtp ? 'Тестирование...' : 'Тестировать соединение'}
              </button>
              {testResults.smtp && (
                <div className={`test-result ${testResults.smtp.success ? 'success' : 'error'}`}>
                  {testResults.smtp.success ? '✅' : '❌'} {testResults.smtp.message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {settings.apiEnabled && (
        <div className="settings-section">
          <h4>Настройки API</h4>
          <div className="form-group">
            <label>API Key</label>
            <div className="api-key-container">
              <input
                type="text"
                value={settings.apiKey || 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxx'}
                readOnly
                className="form-input"
              />
              <button className="regenerate-btn">
                Сгенерировать новый
              </button>
            </div>
            <div className="input-hint">
              Используйте этот ключ для аутентификации при вызовах API
            </div>
          </div>
          <div className="api-info">
            <h5>Пример использования API:</h5>
            <pre className="api-example">
{`GET /api/v1/employees
Authorization: Bearer ${settings.apiKey || 'your_api_key'}

POST /api/v1/reports
Authorization: Bearer ${settings.apiKey || 'your_api_key'}
Content-Type: application/json

{
  "type": "daily",
  "date": "2024-01-15"
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationSettings;