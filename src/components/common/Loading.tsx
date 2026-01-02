import React from 'react';
import './Loading.css';

interface LoadingProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({ 
  text = 'Загрузка...', 
  size = 'medium' 
}) => {
  const sizeMap = {
    small: '30px',
    medium: '50px',
    large: '80px'
  };

  return (
    <div className="loading-container">
      <div 
        className="loading-spinner" 
        style={{ width: sizeMap[size], height: sizeMap[size] }}
      ></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;