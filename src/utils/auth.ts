import { User } from '../types/auth';

// Получить текущего пользователя
export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Проверить авторизацию
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null;
};

// Получить токен
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Выйти из системы
export const logout = (): void => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  localStorage.removeItem('rememberMe');
  window.location.href = '/login';
};

// Проверить роль пользователя
export const hasRole = (requiredRole: string | string[]): boolean => {
  const user = getCurrentUser();
  if (!user) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }
  
  return user.role === requiredRole;
};

// Получить роль с переводом
export const getRoleLabel = (role: string): string => {
  switch (role) {
    case 'admin': return 'Администратор';
    case 'manager': return 'Менеджер';
    case 'viewer': return 'Наблюдатель';
    default: return 'Пользователь';
  }
};