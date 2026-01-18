// Мок-данные для тестирования
export const generateMockEmployees = (count: number) => {
  const departments = ['Разработка', 'Дизайн', 'Маркетинг', 'Тестирование', 'Поддержка'];
  const positions = ['Разработчик', 'Дизайнер', 'Маркетолог', 'Тестировщик', 'Менеджер'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Сотрудник ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    department: departments[i % departments.length],
    position: positions[i % positions.length],
    productivity: Math.floor(Math.random() * 40) + 60, // 60-100%
    isActive: Math.random() > 0.2,
    lastActivity: new Date(Date.now() - Math.random() * 86400000) // До 24 часов назад
  }));
};

export const generateMockActivities = (employeeId: number, count: number) => {
  const activities = ['Работа с кодом', 'Совещание', 'Работа с документами', 'Аналитика', 'Тестирование'];
  const types: Array<'productive' | 'neutral' | 'distracting'> = ['productive', 'neutral', 'distracting'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    employeeId,
    timestamp: new Date(Date.now() - i * 3600000), // Каждый час назад
    type: types[i % types.length],
    application: ['VSCode', 'Figma', 'Slack', 'Chrome', 'Excel'][i % 5],
    description: activities[i % activities.length],
    duration: Math.floor(Math.random() * 45) + 15 // 15-60 минут
  }));
};