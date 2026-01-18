import React, { useState, useEffect } from 'react';
import { 
  SystemSettings, 
  GeneralSettings as GeneralSettingsType,
  MonitoringSettings as MonitoringSettingsType,
  NotificationSettings as NotificationSettingsType,
  IntegrationSettings as IntegrationSettingsType,
  PrivacySettings as PrivacySettingsType
} from '../../types/settings';
import { settingsService } from '../../services/settingsService';
import SettingsTabs from '../settings/SettingsTabs';
import GeneralSettings from '../settings/GeneralSettings';
import MonitoringSettings from '../settings/MonitoringSettings';
import SecuritySettings from '../settings/SecuritySettings';
import NotificationSettings from '../settings/NotificationSettings';
import IntegrationSettings from '../settings/IntegrationSettings';
import PrivacySettings from '../settings/PrivacySettings';
import TasksSettings from '../settings/TasksSettings';
import Loading from '../common/Loading';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState<SystemSettings | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const data = await settingsService.getSystemSettings();
      setSettings(data);
      setOriginalSettings(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsChange = <T extends keyof SystemSettings>(
    section: T,
    newSettings: SystemSettings[T]
  ) => {
    if (!settings) return;
    
    const updatedSettings = {
      ...settings,
      [section]: newSettings
    };
    
    setSettings(updatedSettings);
    
    if (originalSettings) {
      const hasSectionChanged = JSON.stringify(originalSettings[section]) !== JSON.stringify(newSettings);
      setHasChanges(hasSectionChanged);
    }
  };

  const handleSave = async () => {
    if (!settings || !hasChanges) return;
    
    setSaving(true);
    try {
      await settingsService.saveSystemSettings(settings);
      setOriginalSettings(JSON.parse(JSON.stringify(settings)));
      setHasChanges(false);
      alert('Настройки успешно сохранены!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Ошибка при сохранении настроек');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!originalSettings) return;
    
    if (window.confirm('Вы уверены, что хотите отменить изменения?')) {
      setSettings(JSON.parse(JSON.stringify(originalSettings)));
      setHasChanges(false);
    }
  };

  const renderActiveTab = () => {
    if (!settings) return null;

    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings
            settings={settings.general}
            onChange={(newSettings: GeneralSettingsType) => 
              handleSettingsChange('general', newSettings)
            }
          />
        );
      case 'monitoring':
        return (
          <MonitoringSettings
            settings={settings.monitoring}
            onChange={(newSettings: MonitoringSettingsType) => 
              handleSettingsChange('monitoring', newSettings)
            }
          />
        );
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return (
          <NotificationSettings
            settings={settings.notifications}
            onChange={(newSettings: NotificationSettingsType) => 
              handleSettingsChange('notifications', newSettings)
            }
          />
        );
      case 'integrations':
        return (
          <IntegrationSettings
            settings={settings.integration}
            onChange={(newSettings: IntegrationSettingsType) => 
              handleSettingsChange('integration', newSettings)
            }
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            settings={settings.privacy}
            onChange={(newSettings: PrivacySettingsType) => 
              handleSettingsChange('privacy', newSettings)
            }
          />
        );
      case 'tasks':
        return <TasksSettings />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="settings-loading">
        <Loading text="Загрузка настроек..." size="large" />
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Настройки системы</h1>
        <p>Настройте параметры мониторинга, безопасности и уведомлений</p>
      </div>

      <div className="settings-container">
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="settings-content">
          {renderActiveTab()}
          
          {(activeTab !== 'security' && activeTab !== 'tasks') && (
            <div className="settings-actions">
              <button
                className="reset-button"
                onClick={handleReset}
                disabled={!hasChanges || saving}
              >
                Отмена
              </button>
              <button
                className="save-button"
                onClick={handleSave}
                disabled={!hasChanges || saving}
              >
                {saving ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
              {hasChanges && (
                <div className="changes-notice">
                  ⚠️ У вас есть несохраненные изменения
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="settings-info">
        <h3>💡 Советы по настройке</h3>
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">🔒</div>
            <div className="info-content">
              <h4>Безопасность</h4>
              <p>Настройте политики безопасности в соответствии с требованиями вашей организации.</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">👁️</div>
            <div className="info-content">
              <h4>Мониторинг</h4>
              <p>Оптимизируйте интервалы мониторинга для баланса между детализацией и производительностью.</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">🔔</div>
            <div className="info-content">
              <h4>Уведомления</h4>
              <p>Настройте уведомления так, чтобы получать важные оповещения без информационного шума.</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">⚖️</div>
            <div className="info-content">
              <h4>Конфиденциальность</h4>
              <p>Соблюдайте баланс между мониторингом продуктивности и приватностью сотрудников.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;