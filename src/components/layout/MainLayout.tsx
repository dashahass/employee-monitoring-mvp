import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './MainLayout.css';

// Типизация пропсов (свойств) компонента
interface MainLayoutProps {
  children: React.ReactNode; // То, что будет внутри компонента
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      
      <main className="main-content">
        {children} {/* Здесь будет содержимое страницы */}
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;