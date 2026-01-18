import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Loading from './components/common/Loading';
import MainLayout from './components/layout/MainLayout';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

// Ленивая загрузка страниц
const LoginPage = lazy(() => import('./components/pages/LoginPage'));
const DashboardPage = lazy(() => import('./components/pages/DashboardPage'));
const EmployeesPage = lazy(() => import('./components/pages/EmployeesPage'));
const EmployeeDetailPage = lazy(() => import('./components/pages/EmployeeDetailPage'));
const ReportsPage = lazy(() => import('./components/pages/ReportsPage'));
const ReportDetailPage = lazy(() => import('./components/pages/ReportDetailPage'));
const CreateReportPage = lazy(() => import('./components/pages/CreateReportPage'));
const SettingsPage = lazy(() => import('./components/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));
const TestPage = lazy(() => import('./components/pages/TestPage'));

// Компонент для проверки авторизации
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <Loading text="Проверка авторизации..." />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Компонент для проверки роли администратора
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Компонент загрузки
const PageLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<Loading text="Загрузка страницы..." />}>
    {children}
  </Suspense>
);

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PageLoader>
            <LoginPage />
          </PageLoader>
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout>
              <PageLoader>
                <DashboardPage />
              </PageLoader>
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <MainLayout>
              <PageLoader>
                <DashboardPage />
              </PageLoader>
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/employees" element={
          <ProtectedRoute>
            <MainLayout>
              <PageLoader>
                <EmployeesPage />
              </PageLoader>
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/employee/:id" element={
          <ProtectedRoute>
            <MainLayout>
              <PageLoader>
                <EmployeeDetailPage />
              </PageLoader>
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <ProtectedRoute>
            <MainLayout>
              <PageLoader>
                <ReportsPage />
              </PageLoader>
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports/new" element={
          <ProtectedRoute>
            <MainLayout>
              <PageLoader>
                <CreateReportPage />
              </PageLoader>
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports/:id" element={
          <ProtectedRoute>
            <MainLayout>
              <PageLoader>
                <ReportDetailPage />
              </PageLoader>
            </MainLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <AdminRoute>
              <MainLayout>
                <PageLoader>
                  <SettingsPage />
                </PageLoader>
              </MainLayout>
            </AdminRoute>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={
          <ProtectedRoute>
            <MainLayout>
              <PageLoader>
                <NotFoundPage />
              </PageLoader>
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/test" element={
          process.env.NODE_ENV === 'development' ? (
            <ProtectedRoute>
              <MainLayout>
                <PageLoader>
                  <TestPage />
                </PageLoader>
              </MainLayout>
            </ProtectedRoute>
          ) : (
            <Navigate to="/" replace />
          )
        } />

      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}



export default App;