import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './components/pages/DashboardPage';
import EmployeesPage from './components/pages/EmployeesPage';
import EmployeeDetailPage from './components/pages/EmployeeDetailPage';
import ReportsPage from './components/pages/ReportsPage';
import ReportDetailPage from './components/pages/ReportDetailPage';
import CreateReportPage from './components/pages/CreateReportPage';
import NotFoundPage from './components/pages/NotFoundPage';
import './App.css';

// Простой компонент для проверки авторизации
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth_token') !== null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/employees" element={
          <ProtectedRoute>
            <MainLayout>
              <EmployeesPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/employee/:id" element={
          <ProtectedRoute>
            <MainLayout>
              <EmployeeDetailPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <ProtectedRoute>
            <MainLayout>
              <ReportsPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports/new" element={
          <ProtectedRoute>
            <MainLayout>
              <CreateReportPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports/:id" element={
          <ProtectedRoute>
            <MainLayout>
              <ReportDetailPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={
          <ProtectedRoute>
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;