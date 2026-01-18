import React, { useState, useEffect } from 'react';
import { ScheduledTask } from '../../types/settings';
import { settingsService } from '../../services/settingsService';
import './TasksSettings.css';

const TasksSettings: React.FC = () => {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningTask, setRunningTask] = useState<number | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await settingsService.getScheduledTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (id: number, enabled: boolean) => {
    try {
      await settingsService.updateScheduledTask(id, { enabled });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, enabled } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleRunTask = async (id: number) => {
    setRunningTask(id);
    try {
      await settingsService.runTaskNow(id);
      // Обновляем список задач после запуска
      setTimeout(() => {
        loadTasks();
        setRunningTask(null);
      }, 2100); // Чуть больше времени выполнения задачи
    } catch (error) {
      console.error('Error running task:', error);
      setRunningTask(null);
    }
  };

  const getTaskIcon = (type: ScheduledTask['type']) => {
    switch (type) {
      case 'report': return '📊';
      case 'backup': return '💾';
      case 'cleanup': return '🧹';
      case 'sync': return '🔄';
      default: return '⚙️';
    }
  };

  const getTaskTypeLabel = (type: ScheduledTask['type']) => {
    switch (type) {
      case 'report': return 'Отчет';
      case 'backup': return 'Резервное копирование';
      case 'cleanup': return 'Очистка';
      case 'sync': return 'Синхронизация';
      default: return 'Задача';
    }
  };

  const getStatusColor = (status: ScheduledTask['status']) => {
    switch (status) {
      case 'completed': return '#52c41a';
      case 'running': return '#1890ff';
      case 'failed': return '#ff4d4f';
      case 'pending': return '#faad14';
      default: return '#8c8c8c';
    }
  };

  const getStatusLabel = (status: ScheduledTask['status']) => {
    switch (status) {
      case 'completed': return 'Выполнено';
      case 'running': return 'Выполняется';
      case 'failed': return 'Ошибка';
      case 'pending': return 'Ожидание';
      default: return 'Неизвестно';
    }
  };

  const formatSchedule = (task: ScheduledTask) => {
    const schedule = task.schedule;
    switch (schedule.frequency) {
      case 'hourly':
        return 'Каждый час';
      case 'daily':
        return `Ежедневно в ${schedule.time}`;
      case 'weekly':
        const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        return `Еженедельно в ${days[schedule.dayOfWeek || 0]} в ${schedule.time}`;
      case 'monthly':
        return `Ежемесячно ${schedule.dayOfMonth}-го числа в ${schedule.time}`;
      case 'custom':
        return `По расписанию: ${schedule.customCron}`;
      default:
        return 'Не настроено';
    }
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Никогда';
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="tasks-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка задач...</p>
      </div>
    );
  }

  return (
    <div className="tasks-settings">
      <div className="settings-header">
        <div className="header-content">
          <h2>Запланированные задачи</h2>
        </div>
        <button className="refresh-btn" onClick={loadTasks}>
          🔄 Обновить
        </button>
      </div>

      <div className="tasks-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <div className="task-icon">
                {getTaskIcon(task.type)}
              </div>
              <div className="task-info">
                <h3>{task.name}</h3>
                <span className="task-type">{getTaskTypeLabel(task.type)}</span>
              </div>
              <div className="task-controls">
                <label className="task-switch">
                  <input
                    type="checkbox"
                    checked={task.enabled}
                    onChange={(e) => handleToggleTask(task.id, e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
                <button
                  className="run-now-btn"
                  onClick={() => handleRunTask(task.id)}
                  disabled={runningTask === task.id || task.status === 'running'}
                  title="Запустить сейчас"
                >
                  {runningTask === task.id ? '⏳' : '▶️'}
                </button>
              </div>
            </div>

            <div className="task-schedule">
              <div className="schedule-info">
                <span className="schedule-label">Расписание:</span>
                <span className="schedule-value">{formatSchedule(task)}</span>
              </div>
            </div>

            <div className="task-status">
              <div className="status-info">
                <div className="status-item">
                  <span className="status-label">Статус:</span>
                  <span 
                    className="status-value"
                    style={{ color: getStatusColor(task.status) }}
                  >
                    {getStatusLabel(task.status)}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Последний запуск:</span>
                  <span className="status-value">{formatDate(task.lastRun)}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Следующий запуск:</span>
                  <span className="status-value">{formatDate(task.nextRun)}</span>
                </div>
              </div>
            </div>

            <div className="task-progress">
              {task.status === 'running' && (
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="add-task-section">
        <h3>Добавить новую задачу</h3>
        <div className="task-types">
          <button className="task-type-btn">
            <span className="type-icon">📊</span>
            <span className="type-label">Отчет</span>
          </button>
          <button className="task-type-btn">
            <span className="type-icon">💾</span>
            <span className="type-label">Резервное копирование</span>
          </button>
          <button className="task-type-btn">
            <span className="type-icon">🧹</span>
            <span className="type-label">Очистка данных</span>
          </button>
          <button className="task-type-btn">
            <span className="type-icon">🔄</span>
            <span className="type-label">Синхронизация</span>
          </button>
        </div>
      </div>

      <div className="tasks-info">
        <h3>💡 Информация о задачах</h3>
        <div className="info-grid">
          <div className="info-item">
            <div className="info-icon">⏰</div>
            <div className="info-content">
              <h4>Время выполнения</h4>
              <p>Задачи выполняются в фоновом режиме и не мешают работе системы.</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">📧</div>
            <div className="info-content">
              <h4>Уведомления</h4>
              <p>О результате выполнения задач отправляются уведомления администраторам.</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">⚡</div>
            <div className="info-content">
              <h4>Производительность</h4>
              <p>Задачи распределяются по времени для минимизации нагрузки на систему.</p>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">📈</div>
            <div className="info-content">
              <h4>Мониторинг</h4>
              <p>Все запуски задач логируются и доступны для анализа.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksSettings;