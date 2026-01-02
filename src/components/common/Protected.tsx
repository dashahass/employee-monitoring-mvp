import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole } from '../../utils/auth';

interface ProtectedProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
  fallback?: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ 
  children, 
  requiredRole,
  fallback = <Navigate to="/" replace />
}) => {
  const isAuth = localStorage.getItem('auth_token') !== null;
  
  // Если не авторизован - на логин
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  
  // Если требуется определенная роль и ее нет
  if (requiredRole && !hasRole(requiredRole)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

export default Protected;