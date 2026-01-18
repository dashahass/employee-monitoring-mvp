import React, { useState, useEffect } from 'react';
import { SecurityPolicy, BlockedItem, BlockedCategory } from '../../types/settings';
import { settingsService } from '../../services/settingsService';
import './SecuritySettings.css';

const SecuritySettings: React.FC = () => {
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [blockedItems, setBlockedItems] = useState<BlockedItem[]>([]);
  const [categories, setCategories] = useState<BlockedCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [policiesData, itemsData, categoriesData] = await Promise.all([
        settingsService.getSecurityPolicies(),
        settingsService.getBlockedItems(),
        settingsService.getBlockedCategories()
      ]);
      setPolicies(policiesData);
      setBlockedItems(itemsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading security data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePolicyToggle = async (id: number, enabled: boolean) => {
    try {
      await settingsService.updateSecurityPolicy(id, { enabled });
      setPolicies(policies.map(policy => 
        policy.id === id ? { ...policy, enabled } : policy
      ));
    } catch (error) {
      console.error('Error updating policy:', error);
    }
  };

  const handleDeletePolicy = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту политику?')) {
      try {
        await settingsService.deleteSecurityPolicy(id);
        setPolicies(policies.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting policy:', error);
      }
    }
  };

  const handleDeleteBlockedItem = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      try {
        await settingsService.deleteBlockedItem(id);
        setBlockedItems(blockedItems.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting blocked item:', error);
      }
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#52c41a';
      case 'medium': return '#faad14';
      case 'high': return '#ff4d4f';
      default: return '#8c8c8c';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'block': return 'Блокировка';
      case 'warn': return 'Предупреждение';
      case 'notify': return 'Уведомление';
      default: return action;
    }
  };

  if (loading) {
    return (
      <div className="security-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка данных безопасности...</p>
      </div>
    );
  }

  return (
    <div className="security-settings">
      <div className="settings-header">
        <div className="header-content">
          <h2>Политики безопасности</h2>
        </div>
        <button 
          className="add-policy-btn"
          onClick={() => {/* В будущем: setShowPolicyForm(true) */}}
        >
          + Новая политика
        </button>
      </div>

      <div className="policies-list">
        {policies.map(policy => (
          <div key={policy.id} className="policy-card">
            <div className="policy-header">
              <div className="policy-info">
                <h3>{policy.name}</h3>
                <p className="policy-description">{policy.description}</p>
                <div className="policy-meta">
                  <span className="priority">Приоритет: {policy.priority}</span>
                  <span className="created">Создана: {new Date(policy.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
              <div className="policy-controls">
                <label className="policy-switch">
                  <input
                    type="checkbox"
                    checked={policy.enabled}
                    onChange={(e) => handlePolicyToggle(policy.id, e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
                <button 
                  className="edit-btn"
                  title="Редактировать"
                  onClick={() => {/* В будущем: открыть форму редактирования */}}
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeletePolicy(policy.id)}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            </div>
            
            <div className="policy-details">
              <div className="conditions-section">
                <h4>Условия:</h4>
                <div className="conditions-list">
                  {policy.conditions.map((condition, idx) => (
                    <div key={idx} className="condition-item">
                      <span className="condition-type">{condition.type}</span>
                      <span className="condition-operator">{condition.operator}</span>
                      <span className="condition-value">
                        {Array.isArray(condition.value) 
                          ? condition.value.join(', ')
                          : condition.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="actions-section">
                <h4>Действия:</h4>
                <div className="actions-list">
                  {policy.actions.map((action, idx) => (
                    <div key={idx} className="action-item">
                      <span 
                        className="action-type"
                        style={{ backgroundColor: getSeverityColor(action.severity) }}
                      >
                        {getActionLabel(action.type)}
                      </span>
                      {action.message && (
                        <span className="action-message">{action.message}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="settings-header">
        <div className="header-content">
          <h2>Запрещенные элементы</h2>
          <p>Управление заблокированными приложениями и сайтами</p>
        </div>
        <button 
          className="add-blocked-btn"
          onClick={() => {/* В будущем: setShowBlockedForm(true) */}}
        >
          + Добавить элемент
        </button>
      </div>

      <div className="blocked-items-grid">
        {blockedItems.map(item => (
          <div key={item.id} className="blocked-item-card">
            <div className="item-header">
              <div className="item-type" data-type={item.type}>
                {item.type === 'application' ? '💻' : 
                 item.type === 'website' ? '🌐' : '📁'}
              </div>
              <div className="item-info">
                <h4>{item.name}</h4>
                <p className="item-pattern">{item.pattern}</p>
                {item.description && (
                  <p className="item-description">{item.description}</p>
                )}
              </div>
              <div className="item-severity" style={{ backgroundColor: getSeverityColor(item.severity) }}>
                {item.severity === 'low' ? 'Низкий' :
                 item.severity === 'medium' ? 'Средний' : 'Высокий'}
              </div>
            </div>
            <div className="item-footer">
              <div className="item-action">
                <span className="action-label">Действие:</span>
                <span className="action-value">{getActionLabel(item.action)}</span>
              </div>
              <div className="item-actions">
                <button 
                  className="delete-item-btn"
                  onClick={() => handleDeleteBlockedItem(item.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="categories-section">
        <h3>Категории запрещенных элементов</h3>
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <h4>{category.name}</h4>
                <span 
                  className="category-severity"
                  style={{ backgroundColor: getSeverityColor(category.severity) }}
                >
                  {category.severity === 'medium' ? 'Средний' : 'Высокий'}
                </span>
              </div>
              <p className="category-description">{category.description}</p>
              <div className="category-items">
                <span className="items-label">Элементы ({category.items.length}):</span>
                <div className="items-list">
                  {category.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="item-tag">{item}</span>
                  ))}
                  {category.items.length > 3 && (
                    <span className="more-items">+{category.items.length - 3} еще</span>
                  )}
                </div>
              </div>
              <button 
                className="use-category-btn"
                onClick={() => {/* В будущем: использовать категорию */}}
              >
                Использовать категорию
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;