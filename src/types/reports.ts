export interface Report {
  id: number;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  dateRange: {
    start: Date;
    end: Date;
  };
  generatedAt: Date;
  generatedBy: string;
  status: 'generated' | 'pending' | 'failed';
  downloadUrl?: string;
  summary: ReportSummary;
  filters?: ReportFilters;
}

export interface ReportSummary {
  totalEmployees: number;
  averageProductivity: number;
  totalHoursTracked: number;
  violationsCount: number;
  topDepartments: DepartmentStats[];
  trend: 'up' | 'down' | 'stable';
}

export interface DepartmentStats {
  department: string;
  employeeCount: number;
  averageProductivity: number;
  totalHours: number;
}

export interface ReportFilters {
  departments?: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
  productivityThreshold?: number;
  includeInactive?: boolean;
}

export interface ReportTemplate {
  id: number;
  name: string;
  description: string;
  type: Report['type'];
  defaultFilters: ReportFilters;
  schedule?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: string[];
  };
}

export interface ReportGenerationRequest {
  templateId?: number;
  title: string;
  type: Report['type'];
  filters: ReportFilters;
  recipients?: string[];
}