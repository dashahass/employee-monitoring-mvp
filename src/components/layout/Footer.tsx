import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>support@monitoring.ru</p>
          <p>+7 (999) 123-45-67</p>
        </div>
        
        <div className="footer-section">
          <h4>О системе</h4>
          <p>Версия: 1.0.0</p>
          <p>Дата сборки: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="footer-section">
          <h4>Помощь</h4>
          <a href="#docs">Документация</a>
          <a href="#faq">FAQ</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} Система мониторинга. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;