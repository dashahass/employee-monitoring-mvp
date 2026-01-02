import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import EmployeesPage from './components/pages/EmployeesPage';
import EmployeeDetailPage from './components/pages/EmployeeDetailPage';
import NotFoundPage from './components/pages/NotFoundPage';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Публичный маршрут */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Защищенные маршруты */}
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
        
        {/* Маршруты с проверкой ролей */}
        <Route path="/employees" element={
          <ProtectedRoute requiredRole={['admin', 'manager', 'viewer']}>
            <MainLayout>
              <EmployeesPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/employee/:id" element={
          <ProtectedRoute requiredRole={['admin', 'manager', 'viewer']}>
            <MainLayout>
              <EmployeeDetailPage />
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <MainLayout>
              <div className="admin-panel">
                <h2>Админ панель</h2>
                <p>Только для администраторов</p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        } />
        
        {/* Маршрут 404 */}
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