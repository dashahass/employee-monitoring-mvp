import { Employee, EmployeeActivity, EmployeeStats, Department } from '../types/employee';

// Мок-данные сотрудников (расширяем существующие)
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@company.com',
    department: 'Разработка',
    position: 'Frontend разработчик',
    productivity: 85,
    isActive: true,
    lastActivity: new Date(),
    avatarColor: '#1890ff',
    hireDate: new Date('2022-03-15'),
    phone: '+7 (999) 123-45-67',
    location: 'Москва, офис А',
    status: 'online'
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    email: 'maria@company.com',
    department: 'Дизайн',
    position: 'UI/UX дизайнер',
    productivity: 92,
    isActive: true,
    lastActivity: new Date(),
    avatarColor: '#722ed1',
    hireDate: new Date('2021-11-20'),
    phone: '+7 (999) 234-56-78',
    location: 'Москва, офис Б',
    status: 'online'
  },
  {
    id: 3,
    name: 'Алексей Иванов',
    email: 'alex@company.com',
    department: 'Маркетинг',
    position: 'Маркетолог',
    productivity: 67,
    isActive: false,
    lastActivity: new Date(Date.now() - 3600000),
    avatarColor: '#fa8c16',
    hireDate: new Date('2023-01-10'),
    phone: '+7 (999) 345-67-89',
    location: 'Санкт-Петербург',
    status: 'away'
  },
  {
    id: 4,
    name: 'Ольга Кузнецова',
    email: 'olga@company.com',
    department: 'Разработка',
    position: 'Backend разработчик',
    productivity: 88,
    isActive: true,
    lastActivity: new Date(),
    avatarColor: '#52c41a',
    hireDate: new Date('2020-08-30'),
    phone: '+7 (999) 456-78-90',
    location: 'Москва, офис А',
    status: 'busy'
  },
  {
    id: 5,
    name: 'Дмитрий Смирнов',
    email: 'dmitry@company.com',
    department: 'Тестирование',
    position: 'QA инженер',
    productivity: 91,
    isActive: true,
    lastActivity: new Date(Date.now() - 600000),
    avatarColor: '#13c2c2',
    hireDate: new Date('2022-06-01'),
    phone: '+7 (999) 567-89-01',
    location: 'Новосибирск',
    status: 'online'
  },
  {
    id: 6,
    name: 'Екатерина Волкова',
    email: 'ekaterina@company.com',
    department: 'Дизайн',
    position: 'Графический дизайнер',
    productivity: 78,
    isActive: true,
    lastActivity: new Date(),
    avatarColor: '#eb2f96',
    hireDate: new Date('2023-03-01'),
    phone: '+7 (999) 678-90-12',
    location: 'Москва, офис Б',
    status: 'online'
  },
  {
    id: 7,
    name: 'Сергей Васильев',
    email: 'sergey@company.com',
    department: 'Поддержка',
    position: 'Техническая поддержка',
    productivity: 45,
    isActive: false,
    lastActivity: new Date(Date.now() - 7200000),
    avatarColor: '#f5222d',
    hireDate: new Date('2021-05-15'),
    phone: '+7 (999) 789-01-23',
    location: 'Екатеринбург',
    status: 'offline'
  },
  {
    id: 8,
    name: 'Анна Ковалева',
    email: 'anna@company.com',
    department: 'Маркетинг',
    position: 'SMM специалист',
    productivity: 82,
    isActive: true,
    lastActivity: new Date(),
    avatarColor: '#faad14',
    hireDate: new Date('2022-09-10'),
    phone: '+7 (999) 890-12-34',
    location: 'Москва, офис В',
    status: 'online'
  }
];

// Мок-данные отделов
const mockDepartments: Department[] = [
  { id: 1, name: 'Разработка', employeeCount: 2, averageProductivity: 86.5, color: '#1890ff' },
  { id: 2, name: 'Дизайн', employeeCount: 2, averageProductivity: 85, color: '#722ed1' },
  { id: 3, name: 'Маркетинг', employeeCount: 2, averageProductivity: 74.5, color: '#fa8c16' },
  { id: 4, name: 'Тестирование', employeeCount: 1, averageProductivity: 91, color: '#52c41a' },
  { id: 5, name: 'Поддержка', employeeCount: 1, averageProductivity: 45, color: '#f5222d' }
];

// Мок-данные активности
const mockActivities: EmployeeActivity[] = [
  { id: 1, employeeId: 1, timestamp: new Date('2024-01-15T09:00:00'), type: 'productive', application: 'VSCode', description: 'Работа над компонентом Dashboard', duration: 60 },
  { id: 2, employeeId: 1, timestamp: new Date('2024-01-15T10:00:00'), type: 'productive', application: 'Slack', description: 'Совещание по проекту', duration: 30 },
  { id: 3, employeeId: 1, timestamp: new Date('2024-01-15T10:30:00'), type: 'distracting', application: 'Chrome', description: 'Просмотр YouTube', duration: 15 },
  { id: 4, employeeId: 1, timestamp: new Date('2024-01-15T11:00:00'), type: 'break', application: 'Система', description: 'Кофе-брейк', duration: 15 },
  { id: 5, employeeId: 1, timestamp: new Date('2024-01-15T11:15:00'), type: 'productive', application: 'Figma', description: 'Редактирование макетов', duration: 45 },
  { id: 6, employeeId: 1, timestamp: new Date('2024-01-15T12:00:00'), type: 'meeting', application: 'Zoom', description: 'Планирование спринта', duration: 60 },
  { id: 7, employeeId: 1, timestamp: new Date('2024-01-15T13:00:00'), type: 'productive', application: 'VSCode', description: 'Исправление багов', duration: 120 },
  { id: 8, employeeId: 1, timestamp: new Date('2024-01-15T15:00:00'), type: 'neutral', application: 'Confluence', description: 'Документирование', duration: 45 },
  { id: 9, employeeId: 1, timestamp: new Date('2024-01-15T15:45:00'), type: 'distracting', application: 'Telegram', description: 'Личные сообщения', duration: 10 },
  { id: 10, employeeId: 1, timestamp: new Date('2024-01-15T16:00:00'), type: 'productive', application: 'GitHub', description: 'Code review', duration: 60 }
];

// Мок-данные статистики
const mockStats: EmployeeStats[] = [
  {
    employeeId: 1,
    date: new Date('2024-01-15'),
    totalHours: 8,
    productiveHours: 5.5,
    distractions: 2,
    productivityScore: 85,
    applicationsUsed: ['VSCode', 'Slack', 'Chrome', 'Figma', 'Zoom', 'Confluence', 'Telegram', 'GitHub'],
    topApplications: [
      { name: 'VSCode', duration: 180 },
      { name: 'Zoom', duration: 60 },
      { name: 'GitHub', duration: 60 }
    ]
  }
];

export const employeeService = {
  // Получить всех сотрудников
  getEmployees(): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockEmployees]);
      }, 500);
    });
  },

  // Получить сотрудника по ID
  getEmployeeById(id: number): Promise<Employee | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const employee = mockEmployees.find(emp => emp.id === id);
        resolve(employee || null);
      }, 300);
    });
  },

  // Получить отделы
  getDepartments(): Promise<Department[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockDepartments]);
      }, 300);
    });
  },

  // Получить активность сотрудника
  getEmployeeActivities(employeeId: number, date?: Date): Promise<EmployeeActivity[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activities = mockActivities.filter(activity => activity.employeeId === employeeId);
        resolve([...activities]);
      }, 400);
    });
  },

  // Получить статистику сотрудника
  getEmployeeStats(employeeId: number, date?: Date): Promise<EmployeeStats | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = mockStats.find(stat => stat.employeeId === employeeId);
        resolve(stats || null);
      }, 300);
    });
  },

  // Поиск сотрудников
  searchEmployees(query: string): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockEmployees.filter(emp =>
          emp.name.toLowerCase().includes(query.toLowerCase()) ||
          emp.email.toLowerCase().includes(query.toLowerCase()) ||
          emp.department.toLowerCase().includes(query.toLowerCase()) ||
          emp.position.toLowerCase().includes(query.toLowerCase())
        );
        resolve([...results]);
      }, 400);
    });
  },

  // Фильтрация сотрудников
  filterEmployees(filters: any): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...mockEmployees];

        if (filters.department) {
          results = results.filter(emp => emp.department === filters.department);
        }

        if (filters.status && filters.status.length > 0) {
          results = results.filter(emp => filters.status.includes(emp.status));
        }

        if (filters.productivityRange) {
          const [min, max] = filters.productivityRange;
          results = results.filter(emp => emp.productivity >= min && emp.productivity <= max);
        }

        if (filters.searchQuery) {
          results = results.filter(emp =>
            emp.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            emp.email.toLowerCase().includes(filters.searchQuery.toLowerCase())
          );
        }

        // Сортировка
        if (filters.sortBy) {
          results.sort((a, b) => {
            const aValue = a[filters.sortBy as keyof Employee];
            const bValue = b[filters.sortBy as keyof Employee];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return filters.sortOrder === 'desc' 
                ? bValue.localeCompare(aValue)
                : aValue.localeCompare(bValue);
            }
            
            if (typeof aValue === 'number' && typeof bValue === 'number') {
              return filters.sortOrder === 'desc' 
                ? bValue - aValue
                : aValue - bValue;
            }
            
            return 0;
          });
        }

        resolve(results);
      }, 500);
    });
  },

  // Обновить статус сотрудника
  updateEmployeeStatus(employeeId: number, status: Employee['status']): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockEmployees.findIndex(emp => emp.id === employeeId);
        if (index !== -1) {
          mockEmployees[index].status = status;
          resolve(true);
        } else {
          resolve(false);
        }
      }, 200);
    });
  }
};