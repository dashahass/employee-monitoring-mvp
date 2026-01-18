import {
  SystemSettings,
  SecurityPolicy,
  BlockedItem,
  NotificationTemplate,
  ScheduledTask,
  BlockedCategory
} from '../types/settings';

// Мок-данные для настроек
const mockSystemSettings: SystemSettings = {
  general: {
    companyName: 'ТехноКорп',
    timezone: 'Europe/Moscow',
    language: 'ru',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    workHours: {
      start: '09:00',
      end: '18:00',
      days: [1, 2, 3, 4, 5] // Пн-Пт
    },
    holidays: [
      new Date('2024-01-01'),
      new Date('2024-01-02'),
      new Date('2024-01-07'),
      new Date('2024-02-23'),
      new Date('2024-03-08')
    ],
    autoLogout: 30
  },
  monitoring: {
    screenshotInterval: 5,
    activityTracking: true,
    keystrokeLogging: false,
    appMonitoring: true,
    websiteMonitoring: true,
    fileTransferMonitoring: false,
    idleThreshold: 10,
    minActivityThreshold: 30
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    desktopNotifications: true,
    violationAlerts: true,
    dailyReports: true,
    weeklyReports: true,
    monthlyReports: true,
    escalationEnabled: true,
    escalationLevels: 3
  },
  integration: {
    activeDirectoryEnabled: true,
    activeDirectoryConfig: {
      domain: 'techocorp.local',
      server: 'dc.techocorp.local',
      baseDN: 'DC=techocorp,DC=local',
      username: 'admin',
      password: '********'
    },
    slackIntegration: true,
    slackWebhook: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    emailIntegration: true,
    smtpConfig: {
      host: 'smtp.techocorp.com',
      port: 587,
      secure: false,
      auth: {
        user: 'noreply@techocorp.com',
        pass: '********'
      },
      from: 'noreply@techocorp.com'
    },
    apiEnabled: true,
    apiKey: 'sk_test_xxxxxxxxxxxxxxxxxxxxxxxx'
  },
  privacy: {
    dataRetention: 90,
    autoDeleteOldData: true,
    anonymizeData: false,
    exportAllowed: true,
    screenshotBlur: true,
    blurIntensity: 5,
    excludeSensitiveApps: ['password_manager.exe', 'vpn_client.exe', 'encryption_tool.exe']
  }
};

// Мок-данные для политик безопасности
const mockSecurityPolicies: SecurityPolicy[] = [
  {
    id: 1,
    name: 'Блокировка соцсетей в рабочее время',
    description: 'Запрет доступа к социальным сетям в рабочее время',
    enabled: true,
    priority: 1,
    conditions: [
      {
        type: 'website_access',
        operator: 'contains',
        value: ['facebook.com', 'twitter.com', 'instagram.com', 'vk.com'],
        target: 'url'
      },
      {
        type: 'working_hours',
        operator: 'between',
        value: ['09:00', '18:00'],
        target: 'time'
      }
    ],
    actions: [
      {
        type: 'block',
        severity: 'medium',
        message: 'Доступ к социальным сетям запрещен в рабочее время'
      },
      {
        type: 'notify',
        severity: 'low',
        recipients: ['manager@techocorp.com'],
        message: 'Сотрудник пытался получить доступ к социальной сети в рабочее время'
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
    createdBy: 'Администратор'
  },
  {
    id: 2,
    name: 'Предупреждение о длительном простое',
    description: 'Уведомление о простое более 15 минут',
    enabled: true,
    priority: 2,
    conditions: [
      {
        type: 'idle_time',
        operator: 'greater_than',
        value: 15,
        target: 'minutes',
        unit: 'minutes'
      }
    ],
    actions: [
      {
        type: 'warn',
        severity: 'low',
        message: 'Обнаружен простой более 15 минут. Вернитесь к работе.'
      }
    ],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    createdBy: 'Менеджер'
  },
  {
    id: 3,
    name: 'Блокировка игровых приложений',
    description: 'Полный запрет запуска игровых приложений',
    enabled: true,
    priority: 1,
    conditions: [
      {
        type: 'app_usage',
        operator: 'contains',
        value: ['steam.exe', 'battle.net.exe', 'epicgameslauncher.exe'],
        target: 'process_name'
      }
    ],
    actions: [
      {
        type: 'block',
        severity: 'high',
        message: 'Запуск игровых приложений запрещен политикой безопасности'
      },
      {
        type: 'escalate',
        severity: 'high',
        recipients: ['security@techocorp.com', 'hr@techocorp.com'],
        delay: 0
      }
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    createdBy: 'Администратор'
  }
];

// Мок-данные для запрещенных элементов
const mockBlockedItems: BlockedItem[] = [
  {
    id: 1,
    name: 'Социальные сети',
    type: 'category',
    pattern: 'social_media',
    description: 'Все социальные сети',
    severity: 'medium',
    action: 'block',
    createdAt: new Date('2024-01-01'),
    createdBy: 'Администратор'
  },
  {
    id: 2,
    name: 'Facebook',
    type: 'website',
    pattern: '*facebook.com*',
    severity: 'medium',
    action: 'block',
    createdAt: new Date('2024-01-01'),
    createdBy: 'Администратор'
  },
  {
    id: 3,
    name: 'YouTube',
    type: 'website',
    pattern: '*youtube.com*',
    description: 'Только в рабочее время',
    severity: 'low',
    action: 'warn',
    createdAt: new Date('2024-01-02'),
    createdBy: 'Менеджер'
  },
  {
    id: 4,
    name: 'Steam',
    type: 'application',
    pattern: 'steam.exe',
    severity: 'high',
    action: 'block',
    createdAt: new Date('2024-01-05'),
    createdBy: 'Администратор'
  },
  {
    id: 5,
    name: 'Торрент-клиенты',
    type: 'category',
    pattern: 'torrent_clients',
    description: 'Все торрент-клиенты',
    severity: 'high',
    action: 'block',
    createdAt: new Date('2024-01-10'),
    createdBy: 'Администратор'
  }
];

// Мок-данные для категорий
const mockBlockedCategories: BlockedCategory[] = [
  {
    id: 1,
    name: 'Социальные сети',
    description: 'Популярные социальные сети',
    items: ['facebook.com', 'twitter.com', 'instagram.com', 'vk.com', 'ok.ru', 'tiktok.com'],
    severity: 'medium'
  },
  {
    id: 2,
    name: 'Игровые платформы',
    description: 'Платформы для игр и развлечений',
    items: ['steam.exe', 'battle.net.exe', 'epicgameslauncher.exe', 'origin.exe', 'ubisoftconnect.exe'],
    severity: 'high'
  },
  {
    id: 3,
    name: 'Торрент-клиенты',
    description: 'Программы для файлообмена',
    items: ['utorrent.exe', 'bittorrent.exe', 'qBittorrent.exe', 'transmission.exe'],
    severity: 'high'
  },
  {
    id: 4,
    name: 'Анонимайзеры и VPN',
    description: 'Средства обхода ограничений',
    items: ['vpn_client.exe', 'tor_browser.exe', 'hotspotshield.exe', 'expressvpn.exe'],
    severity: 'high'
  }
];

// Мок-данные для шаблонов уведомлений
const mockNotificationTemplates: NotificationTemplate[] = [
  {
    id: 1,
    name: 'Нарушение политики безопасности',
    type: 'violation',
    subject: 'Обнаружено нарушение политики безопасности',
    body: 'Уважаемый {manager_name},\n\nСотрудник {employee_name} нарушил политику безопасности: {policy_name}.\n\nДетали нарушения:\n- Время: {violation_time}\n- Тип: {violation_type}\n- Детали: {violation_details}\n\nТребуется ваше внимание.\n\nС уважением,\nСистема мониторинга',
    variables: ['manager_name', 'employee_name', 'policy_name', 'violation_time', 'violation_type', 'violation_details'],
    enabled: true
  },
  {
    id: 2,
    name: 'Ежедневный отчет',
    type: 'report',
    subject: 'Ежедневный отчет по продуктивности - {date}',
    body: 'Уважаемый {recipient_name},\n\nПредставляем ежедневный отчет по продуктивности за {date}.\n\nОбщая статистика:\n- Всего сотрудников: {total_employees}\n- Средняя продуктивность: {avg_productivity}%\n- Нарушений: {violations_count}\n\nТоп-3 сотрудника по продуктивности:\n1. {top1_name}: {top1_productivity}%\n2. {top2_name}: {top2_productivity}%\n3. {top3_name}: {top3_productivity}%\n\nС уважением,\nСистема мониторинга',
    variables: ['recipient_name', 'date', 'total_employees', 'avg_productivity', 'violations_count', 'top1_name', 'top1_productivity', 'top2_name', 'top2_productivity', 'top3_name', 'top3_productivity'],
    enabled: true
  }
];

// Мок-данные для запланированных задач
const mockScheduledTasks: ScheduledTask[] = [
  {
    id: 1,
    name: 'Ежедневный отчет по продуктивности',
    type: 'report',
    schedule: {
      frequency: 'daily',
      time: '18:00'
    },
    enabled: true,
    lastRun: new Date('2024-01-15T18:00:00'),
    nextRun: new Date('2024-01-16T18:00:00'),
    status: 'completed'
  },
  {
    id: 2,
    name: 'Очистка старых данных',
    type: 'cleanup',
    schedule: {
      frequency: 'weekly',
      dayOfWeek: 0, // Воскресенье
      time: '02:00'
    },
    enabled: true,
    lastRun: new Date('2024-01-14T02:00:00'),
    nextRun: new Date('2024-01-21T02:00:00'),
    status: 'completed'
  },
  {
    id: 3,
    name: 'Синхронизация с Active Directory',
    type: 'sync',
    schedule: {
      frequency: 'hourly'
    },
    enabled: true,
    lastRun: new Date('2024-01-15T17:00:00'),
    nextRun: new Date('2024-01-15T18:00:00'),
    status: 'pending'
  }
];

export const settingsService = {
  // Получить настройки системы
  getSystemSettings(): Promise<SystemSettings> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(mockSystemSettings))); // Глубокая копия
      }, 500);
    });
  },

  // Сохранить настройки системы
  saveSystemSettings(settings: SystemSettings): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        Object.assign(mockSystemSettings, settings);
        resolve(true);
      }, 500);
    });
  },

  // Получить политики безопасности
  getSecurityPolicies(): Promise<SecurityPolicy[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockSecurityPolicies]);
      }, 400);
    });
  },

  // Получить политику по ID
  getSecurityPolicy(id: number): Promise<SecurityPolicy | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const policy = mockSecurityPolicies.find(p => p.id === id);
        resolve(policy || null);
      }, 300);
    });
  },

  // Создать новую политику
  createSecurityPolicy(policy: Omit<SecurityPolicy, 'id' | 'createdAt' | 'updatedAt'>): Promise<SecurityPolicy> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPolicy: SecurityPolicy = {
          ...policy,
          id: mockSecurityPolicies.length + 1,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        mockSecurityPolicies.push(newPolicy);
        resolve(newPolicy);
      }, 500);
    });
  },

  // Обновить политику
  updateSecurityPolicy(id: number, updates: Partial<SecurityPolicy>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockSecurityPolicies.findIndex(p => p.id === id);
        if (index !== -1) {
          mockSecurityPolicies[index] = {
            ...mockSecurityPolicies[index],
            ...updates,
            updatedAt: new Date()
          };
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  },

  // Удалить политику
  deleteSecurityPolicy(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockSecurityPolicies.findIndex(p => p.id === id);
        if (index !== -1) {
          mockSecurityPolicies.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  // Получить запрещенные элементы
  getBlockedItems(): Promise<BlockedItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockBlockedItems]);
      }, 400);
    });
  },

  // Получить категории запрещенных элементов
  getBlockedCategories(): Promise<BlockedCategory[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockBlockedCategories]);
      }, 400);
    });
  },

  // Добавить запрещенный элемент
  addBlockedItem(item: Omit<BlockedItem, 'id' | 'createdAt'>): Promise<BlockedItem> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem: BlockedItem = {
          ...item,
          id: mockBlockedItems.length + 1,
          createdAt: new Date()
        };
        mockBlockedItems.push(newItem);
        resolve(newItem);
      }, 400);
    });
  },

  // Удалить запрещенный элемент
  deleteBlockedItem(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockBlockedItems.findIndex(item => item.id === id);
        if (index !== -1) {
          mockBlockedItems.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  // Получить шаблоны уведомлений
  getNotificationTemplates(): Promise<NotificationTemplate[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockNotificationTemplates]);
      }, 400);
    });
  },

  // Обновить шаблон уведомлений
  updateNotificationTemplate(id: number, updates: Partial<NotificationTemplate>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockNotificationTemplates.findIndex(t => t.id === id);
        if (index !== -1) {
          mockNotificationTemplates[index] = {
            ...mockNotificationTemplates[index],
            ...updates
          };
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  },

  // Получить запланированные задачи
  getScheduledTasks(): Promise<ScheduledTask[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockScheduledTasks]);
      }, 400);
    });
  },

  // Обновить запланированную задачу
  updateScheduledTask(id: number, updates: Partial<ScheduledTask>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockScheduledTasks.findIndex(t => t.id === id);
        if (index !== -1) {
          mockScheduledTasks[index] = {
            ...mockScheduledTasks[index],
            ...updates
          };
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  },

  // Запустить задачу сейчас
  runTaskNow(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = mockScheduledTasks.find(t => t.id === id);
        if (task) {
          task.status = 'running';
          // Имитация выполнения задачи
          setTimeout(() => {
            task.status = 'completed';
            task.lastRun = new Date();
          }, 2000);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  // Проверить соединение с Active Directory
  testActiveDirectoryConnection(config: any): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Успешное подключение к Active Directory'
        });
      }, 1000);
    });
  },

  // Проверить SMTP соединение
  testSMTPConnection(config: any): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'SMTP соединение успешно установлено'
        });
      }, 1000);
    });
  }
};