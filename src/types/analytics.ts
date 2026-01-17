export interface ProductivityData {
  date: string;
  productiveHours: number;
  totalHours: number;
  productivity: number; // процент
}

export interface DepartmentStats {
  department: string;
  employeeCount: number;
  averageProductivity: number;
  violations: number;
}

export interface ActivityDistribution {
  productive: number;
  neutral: number;
  distracting: number;
  break: number;
}

export interface TimeTracking {
  timeRange: string;
  productiveCount: number;
  distractingCount: number;
}

export interface DashboardStats {
  totalEmployees: number;
  activeNow: number;
  averageProductivity: number;
  todayViolations: number;
  totalHoursTracked: number;
  productivityTrend: 'up' | 'down' | 'stable';
}