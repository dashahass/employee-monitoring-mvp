// Тип для сотрудника
export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  productivity: number; // от 0 до 100
  isActive: boolean;
  lastActivity?: Date; // ? означает необязательное поле
}

// Тип для активности
export interface Activity {
  id: number;
  employeeId: number;
  timestamp: Date;
  type: 'productive' | 'neutral' | 'distracting';
  application: string;
  description: string;
  duration: number; // в минутах
}

// Тип для отчета
export interface Report {
  id: number;
  employeeId: number;
  date: Date;
  totalHours: number;
  productiveHours: number;
  distractions: number;
  productivityScore: number;
}


export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  productivity: number;
  isActive: boolean;
  lastActivity?: Date;
  avatarColor?: string;
  hireDate?: Date;
  phone?: string;
  location?: string;
  status?: 'online' | 'away' | 'offline' | 'busy';
}

export interface EmployeeActivity {
  id: number;
  employeeId: number;
  timestamp: Date;
  type: 'productive' | 'neutral' | 'distracting' | 'break' | 'meeting';
  application: string;
  description: string;
  duration: number;
  screenshotUrl?: string;
}

export interface EmployeeStats {
  employeeId: number;
  date: Date;
  totalHours: number;
  productiveHours: number;
  distractions: number;
  productivityScore: number;
  applicationsUsed: string[];
  topApplications: { name: string; duration: number }[];
}

export interface Department {
  id: number;
  name: string;
  managerId?: number;
  employeeCount: number;
  averageProductivity: number;
  color?: string;
}

export interface EmployeeFilter {
  department?: string;
  status?: ('online' | 'away' | 'offline' | 'busy')[];
  productivityRange?: [number, number];
  searchQuery?: string;
  sortBy?: 'name' | 'productivity' | 'department' | 'status';
  sortOrder?: 'asc' | 'desc';
}