import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('auth_token') !== null;
  
  // Получаем данные пользователя
  const getUser = () => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };
  
  const user = getUser();
  
  // Если не авторизован - на логин
  if (!isAuthenticated) {
    // Сохраняем откуда пришли, чтобы вернуться после логина
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Если требуется определенная роль
  if (requiredRole && user) {
    const hasRequiredRole = Array.isArray(requiredRole) 
      ? requiredRole.includes(user.role)
      : user.role === requiredRole;
    
    if (!hasRequiredRole) {
      // Если нет нужной роли - на 404 или dashboard
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;