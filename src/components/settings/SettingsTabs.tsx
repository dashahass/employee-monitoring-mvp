import React from 'react';
import './SettingsTabs.css';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'general', label: 'Основные', icon: '⚙️' },
    { id: 'monitoring', label: 'Мониторинг', icon: '👁️' },
    { id: 'security', label: 'Безопасность', icon: '🔒' },
    { id: 'notifications', label: 'Уведомления', icon: '🔔' },
    { id: 'integrations', label: 'Интеграции', icon: '🔄' },
    { id: 'privacy', label: 'Конфиденциальность', icon: '👤' },
    { id: 'tasks', label: 'Задачи', icon: '⏰' }
  ];

  return (
    <div className="settings-tabs">
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="tab-indicator" style={{
        left: `${tabs.findIndex(t => t.id === activeTab) * (100 / tabs.length)}%`,
        width: `${100 / tabs.length}%`
      }} />
    </div>
  );
};

export default SettingsTabs;