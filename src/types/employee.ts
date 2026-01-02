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