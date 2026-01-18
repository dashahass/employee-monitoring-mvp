// Типы для политик безопасности
export interface SecurityPolicy {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  conditions: PolicyCondition[];
  actions: PolicyAction[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface PolicyCondition {
  type: 'app_usage' | 'website_access' | 'idle_time' | 'working_hours' | 'custom';
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'not_equals';
  value: any;
  target: string;
  unit?: string;
}

export interface PolicyAction {
  type: 'block' | 'notify' | 'log' | 'warn' | 'escalate' | 'custom';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message?: string;
  recipients?: string[];
  delay?: number; // в минутах
}

// Типы для настроек системы
export interface SystemSettings {
  general: GeneralSettings;
  monitoring: MonitoringSettings;
  notifications: NotificationSettings;
  integration: IntegrationSettings;
  privacy: PrivacySettings;
}

export interface GeneralSettings {
  companyName: string;
  timezone: string;
  language: string;
  dateFormat: string;
  timeFormat: string;
  workHours: {
    start: string;
    end: string;
    days: number[]; // 0-6 (воскресенье-суббота)
  };
  holidays: Date[];
  autoLogout: number; // в минутах
}

export interface MonitoringSettings {
  screenshotInterval: number; // в минутах
  activityTracking: boolean;
  keystrokeLogging: boolean;
  appMonitoring: boolean;
  websiteMonitoring: boolean;
  fileTransferMonitoring: boolean;
  idleThreshold: number; // в минутах
  minActivityThreshold: number; // в процентах
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  desktopNotifications: boolean;
  violationAlerts: boolean;
  dailyReports: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
  escalationEnabled: boolean;
  escalationLevels: number;
}

export interface IntegrationSettings {
  activeDirectoryEnabled: boolean;
  activeDirectoryConfig?: ActiveDirectoryConfig;
  slackIntegration: boolean;
  slackWebhook?: string;
  emailIntegration: boolean;
  smtpConfig?: SMTPConfig;
  apiEnabled: boolean;
  apiKey?: string;
}

export interface PrivacySettings {
  dataRetention: number; // в днях
  autoDeleteOldData: boolean;
  anonymizeData: boolean;
  exportAllowed: boolean;
  screenshotBlur: boolean;
  blurIntensity: number; // 1-10
  excludeSensitiveApps: string[];
}

export interface ActiveDirectoryConfig {
  domain: string;
  server: string;
  baseDN: string;
  username: string;
  password: string;
}

export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
}

// Типы для запрещенных приложений и сайтов
export interface BlockedItem {
  id: number;
  name: string;
  type: 'application' | 'website' | 'category';
  pattern: string;
  description?: string;
  severity: 'low' | 'medium' | 'high';
  action: 'block' | 'warn' | 'notify';
  createdAt: Date;
  createdBy: string;
}

export interface BlockedCategory {
  id: number;
  name: string;
  description: string;
  items: string[];
  severity: 'medium' | 'high';
}

// Типы для уведомлений
export interface NotificationTemplate {
  id: number;
  name: string;
  type: 'violation' | 'report' | 'system' | 'custom';
  subject: string;
  body: string;
  variables: string[];
  enabled: boolean;
}

export interface ScheduledTask {
  id: number;
  name: string;
  type: 'report' | 'backup' | 'cleanup' | 'sync';
  schedule: Schedule;
  enabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface Schedule {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'custom';
  time?: string;
  dayOfWeek?: number;
  dayOfMonth?: number;
  customCron?: string;
}