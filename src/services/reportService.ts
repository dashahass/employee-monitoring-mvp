import { 
  Report, 
  ReportTemplate, 
  ReportGenerationRequest,
  ReportSummary
} from '../types/reports';

// Мок-данные для отчетов
const mockReports: Report[] = [
  {
    id: 1,
    title: 'Ежедневный отчет за 15 января',
    type: 'daily',
    dateRange: {
      start: new Date('2024-01-15'),
      end: new Date('2024-01-15')
    },
    generatedAt: new Date('2024-01-15T18:00:00'),
    generatedBy: 'Администратор',
    status: 'generated',
    downloadUrl: '#',
    summary: {
      totalEmployees: 85,
      averageProductivity: 78,
      totalHoursTracked: 425,
      violationsCount: 8,
      topDepartments: [
        { department: 'Разработка', employeeCount: 25, averageProductivity: 86, totalHours: 120 },
        { department: 'Дизайн', employeeCount: 15, averageProductivity: 85, totalHours: 75 },
        { department: 'Маркетинг', employeeCount: 20, averageProductivity: 74, totalHours: 100 }
      ],
      trend: 'up'
    },
    filters: {
      dateRange: {
        start: new Date('2024-01-15'),
        end: new Date('2024-01-15')
      },
      includeInactive: false
    }
  },
  {
    id: 2,
    title: 'Недельный отчет за 8-14 января',
    type: 'weekly',
    dateRange: {
      start: new Date('2024-01-08'),
      end: new Date('2024-01-14')
    },
    generatedAt: new Date('2024-01-14T18:00:00'),
    generatedBy: 'Менеджер',
    status: 'generated',
    downloadUrl: '#',
    summary: {
      totalEmployees: 85,
      averageProductivity: 76,
      totalHoursTracked: 2975,
      violationsCount: 45,
      topDepartments: [
        { department: 'Разработка', employeeCount: 25, averageProductivity: 84, totalHours: 840 },
        { department: 'Дизайн', employeeCount: 15, averageProductivity: 83, totalHours: 525 },
        { department: 'Тестирование', employeeCount: 10, averageProductivity: 91, totalHours: 400 }
      ],
      trend: 'stable'
    }
  },
  {
    id: 3,
    title: 'Месячный отчет за январь',
    type: 'monthly',
    dateRange: {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-31')
    },
    generatedAt: new Date('2024-01-31T18:00:00'),
    generatedBy: 'Администратор',
    status: 'pending',
    summary: {
      totalEmployees: 85,
      averageProductivity: 77,
      totalHoursTracked: 12750,
      violationsCount: 180,
      topDepartments: [
        { department: 'Разработка', employeeCount: 25, averageProductivity: 85, totalHours: 3000 },
        { department: 'Дизайн', employeeCount: 15, averageProductivity: 84, totalHours: 1800 },
        { department: 'Маркетинг', employeeCount: 20, averageProductivity: 73, totalHours: 2400 }
      ],
      trend: 'up'
    }
  },
  {
    id: 4,
    title: 'Отчет по отделу разработки',
    type: 'custom',
    dateRange: {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-15')
    },
    generatedAt: new Date('2024-01-16T10:30:00'),
    generatedBy: 'Менеджер',
    status: 'generated',
    downloadUrl: '#',
    summary: {
      totalEmployees: 25,
      averageProductivity: 86,
      totalHoursTracked: 1500,
      violationsCount: 12,
      topDepartments: [
        { department: 'Frontend', employeeCount: 10, averageProductivity: 88, totalHours: 600 },
        { department: 'Backend', employeeCount: 8, averageProductivity: 85, totalHours: 480 },
        { department: 'DevOps', employeeCount: 7, averageProductivity: 84, totalHours: 420 }
      ],
      trend: 'up'
    },
    filters: {
      departments: ['Разработка'],
      dateRange: {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-15')
      }
    }
  }
];

// Шаблоны отчетов
const mockTemplates: ReportTemplate[] = [
  {
    id: 1,
    name: 'Ежедневный отчет',
    description: 'Автоматический ежедневный отчет по продуктивности',
    type: 'daily',
    defaultFilters: {
      dateRange: {
        start: new Date(),
        end: new Date()
      }
    },
    schedule: {
      enabled: true,
      frequency: 'daily',
      time: '18:00',
      recipients: ['admin@company.com', 'managers@company.com']
    }
  },
  {
    id: 2,
    name: 'Недельный отчет',
    description: 'Сводный отчет за неделю',
    type: 'weekly',
    defaultFilters: {
      dateRange: {
        start: new Date(new Date().setDate(new Date().getDate() - 7)),
        end: new Date()
      }
    },
    schedule: {
      enabled: true,
      frequency: 'weekly',
      time: '18:00',
      recipients: ['admin@company.com']
    }
  },
  {
    id: 3,
    name: 'Отчет по нарушениям',
    description: 'Отчет о нарушениях и низкой продуктивности',
    type: 'custom',
    defaultFilters: {
      dateRange: {
        start: new Date(new Date().setDate(new Date().getDate() - 30)),
        end: new Date()
      },
      productivityThreshold: 60,
      includeInactive: true
    }
  }
];

// Функция для создания мок-данных статистики отчета
const generateMockReportData = (): ReportSummary => {
  return {
    totalEmployees: Math.floor(Math.random() * 50) + 50,
    averageProductivity: Math.floor(Math.random() * 30) + 60,
    totalHoursTracked: Math.floor(Math.random() * 500) + 200,
    violationsCount: Math.floor(Math.random() * 20),
    topDepartments: [
      { 
        department: 'Разработка', 
        employeeCount: Math.floor(Math.random() * 20) + 10, 
        averageProductivity: Math.floor(Math.random() * 30) + 65, 
        totalHours: Math.floor(Math.random() * 200) + 100 
      },
      { 
        department: 'Дизайн', 
        employeeCount: Math.floor(Math.random() * 10) + 5, 
        averageProductivity: Math.floor(Math.random() * 30) + 65, 
        totalHours: Math.floor(Math.random() * 150) + 50 
      },
      { 
        department: 'Маркетинг', 
        employeeCount: Math.floor(Math.random() * 15) + 5, 
        averageProductivity: Math.floor(Math.random() * 30) + 60, 
        totalHours: Math.floor(Math.random() * 180) + 60 
      }
    ],
    trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable'
  };
};

export const reportService = {
  // Получить все отчеты
  getReports(): Promise<Report[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockReports]);
      }, 500);
    });
  },

  // Получить отчет по ID
  getReportById(id: number): Promise<Report | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const report = mockReports.find(r => r.id === id);
        resolve(report || null);
      }, 300);
    });
  },

  // Получить шаблоны отчетов
  getTemplates(): Promise<ReportTemplate[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockTemplates]);
      }, 400);
    });
  },

  // Создать новый отчет
  createReport(request: ReportGenerationRequest): Promise<Report> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReport: Report = {
          id: mockReports.length + 1,
          title: request.title,
          type: request.type,
          dateRange: request.filters.dateRange,
          generatedAt: new Date(),
          generatedBy: 'Текущий пользователь',
          status: 'generated',
          downloadUrl: `#report-${mockReports.length + 1}`,
          summary: generateMockReportData(),
          filters: request.filters
        };
        
        mockReports.unshift(newReport);
        resolve(newReport);
      }, 1000);
    });
  },

  // Удалить отчет
  deleteReport(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockReports.findIndex(r => r.id === id);
        if (index !== -1) {
          mockReports.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 300);
    });
  },

  // Скачать отчет
  downloadReport(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const report = mockReports.find(r => r.id === id);
        if (report && report.status === 'generated') {
          // Имитация генерации URL для скачивания
          resolve(`/reports/download/${id}/report.pdf`);
        } else {
          reject(new Error('Report not available for download'));
        }
      }, 500);
    });
  },

  // Получить статистику для генерации отчета
  getReportData(filters: any): Promise<ReportSummary> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Имитация вычисления статистики на основе фильтров
        const summary = generateMockReportData();
        
        // Применяем фильтры (для демонстрации)
        if (filters.departments && filters.departments.length > 0) {
          summary.topDepartments = summary.topDepartments.filter(dept => 
            filters.departments.includes(dept.department)
          );
          summary.totalEmployees = summary.topDepartments.reduce((sum, dept) => sum + dept.employeeCount, 0);
        }
        
        if (filters.productivityThreshold) {
          summary.averageProductivity = Math.max(summary.averageProductivity, filters.productivityThreshold);
          summary.topDepartments = summary.topDepartments.map(dept => ({
            ...dept,
            averageProductivity: Math.max(dept.averageProductivity, filters.productivityThreshold)
          }));
        }
        
        resolve(summary);
      }, 800);
    });
  }
};