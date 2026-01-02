import React from 'react';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import EmployeesPage from './components/pages/EmployeesPage';

function App() {
  return (
    <MainLayout>
      <EmployeesPage />
    </MainLayout>
  );
}

export default App;