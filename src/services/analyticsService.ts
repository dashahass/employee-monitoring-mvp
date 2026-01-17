import { 
  ProductivityData, 
  DepartmentStats, 
  ActivityDistribution,
  TimeTracking,
  DashboardStats 
} from '../types/analytics';
import { Employee } from '../types/employee';

// Мок-данные для демонстрации
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Иван Петров',
    email: 'ivan@company.com',
    department: 'Разработка',
    position: 'Frontend разработчик',
    productivity: 85,
    isActive: true,
    lastActivity: new Date()
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    email: 'maria@company.com',
    department: 'Дизайн',
    position: 'UI/UX дизайнер',
    productivity: 92,
    isActive: true,
    lastActivity: new Date()
  },
  {
    id: 3,
    name: 'Алексей Иванов',
    email: 'alex@company.com',
    department: 'Маркетинг',
    position: 'Маркетолог',
    productivity: 67,
    isActive: false,
    lastActivity: new Date(Date.now() - 3600000)
  },
  {
    id: 4,
    name: 'Ольга Кузнецова',
    email: 'olga@company.com',
    department: 'Разработка',
    position: 'Backend разработчик',
    productivity: 88,
    isActive: true,
    lastActivity: new Date()
  },
  {
    id: 5,
    name: 'Дмитрий Смирнов',
    email: 'dmitry@company.com',
    department: 'Тестирование',
    position: 'QA инженер',
    productivity: 91,
    isActive: true,
    lastActivity: new Date()
  }
];

export const analyticsService = {
  // Получить общую статистику для дашборда
  getDashboardStats(): Promise<DashboardStats> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const activeEmployees = mockEmployees.filter(emp => emp.isActive);
        const avgProductivity = Math.round(
          mockEmployees.reduce((sum, emp) => sum + emp.productivity, 0) / mockEmployees.length
        );
        
        resolve({
          totalEmployees: mockEmployees.length,
          activeNow: activeEmployees.length,
          averageProductivity: avgProductivity,
          todayViolations: 8,
          totalHoursTracked: 425,
          productivityTrend: 'up'
        });
      }, 500);
    });
  },

  // Получить данные по продуктивности за последние 7 дней
  getProductivityData(): Promise<ProductivityData[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const today = new Date();
        const data: ProductivityData[] = [];
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          
          const productiveHours = Math.floor(Math.random() * 4) + 4;
          const totalHours = 8;
          const productivity = Math.round((productiveHours / totalHours) * 100);
          
          data.push({
            date: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
            productiveHours,
            totalHours,
            productivity
          });
        }
        
        resolve(data);
      }, 500);
    });
  },

  // Получить статистику по отделам
  getDepartmentStats(): Promise<DepartmentStats[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const departments = ['Разработка', 'Дизайн', 'Маркетинг', 'Тестирование', 'Поддержка'];
        
        const stats: DepartmentStats[] = departments.map(dept => {
          const deptEmployees = mockEmployees.filter(emp => emp.department === dept);
          return {
            department: dept,
            employeeCount: deptEmployees.length,
            averageProductivity: deptEmployees.length > 0 
              ? Math.round(deptEmployees.reduce((sum, emp) => sum + emp.productivity, 0) / deptEmployees.length)
              : 0,
            violations: Math.floor(Math.random() * 5)
          };
        }).filter(stat => stat.employeeCount > 0);
        
        resolve(stats);
      }, 500);
    });
  },

  // Получить распределение активности
  getActivityDistribution(): Promise<ActivityDistribution> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          productive: 65,
          neutral: 15,
          distracting: 10,
          break: 10
        });
      }, 300);
    });
  },

  // Получить отслеживание по времени
  getTimeTracking(): Promise<TimeTracking[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const timeRanges = [
          '9:00-10:00', '10:00-11:00', '11:00-12:00',
          '12:00-13:00', '13:00-14:00', '14:00-15:00',
          '15:00-16:00', '16:00-17:00', '17:00-18:00'
        ];
        
        const data: TimeTracking[] = timeRanges.map(range => ({
          timeRange: range,
          productiveCount: Math.floor(Math.random() * 20) + 10,
          distractingCount: Math.floor(Math.random() * 5) + 1
        }));
        
        resolve(data);
      }, 500);
    });
  },

  // Получить топ продуктивных сотрудников
  getTopPerformers(limit: number = 5): Promise<Employee[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sorted = [...mockEmployees]
          .sort((a, b) => b.productivity - a.productivity)
          .slice(0, limit);
        resolve(sorted);
      }, 300);
    });
  },

  // Получить сотрудников с нарушениями
  getViolationsList(): Promise<{employee: Employee, violations: number, lastViolation: string}[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const violations = [
          {
            employee: mockEmployees[2], // Алексей Иванов
            violations: 5,
            lastViolation: 'Соцсети в рабочее время'
          },
          {
            employee: mockEmployees[0], // Иван Петров
            violations: 2,
            lastViolation: 'Запуск запрещенного ПО'
          },
          {
            employee: {
              id: 6,
              name: 'Сергей Васильев',
              email: 'sergey@company.com',
              department: 'Поддержка',
              position: 'Техподдержка',
              productivity: 45,
              isActive: true,
              lastActivity: new Date()
            },
            violations: 7,
            lastViolation: 'Длительный простой'
          }
        ];
        
        resolve(violations);
      }, 500);
    });
  }
};