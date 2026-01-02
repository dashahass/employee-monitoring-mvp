import React from 'react';

const Practice: React.FC = () => {
  const userName = "Иван Петров";
  const isAdmin = true;
  const tasks = ["Создать header", "Создать footer", "Настроить стили"];

  return (
    <div>
      {/* Комментарии в JSX */}
      
      {/* 1. Простой HTML */}
      <h2>Привет, мир!</h2>
      
      {/* 2. Переменные в JSX */}
      <p>Пользователь: {userName}</p>
      
      {/* 3. Условный рендеринг */}
      {isAdmin ? (
        <button>Админ панель</button>
      ) : (
        <button>Обычный доступ</button>
      )}
      
      {/* 4. Списки */}
      <h3>Задачи на сегодня:</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
      
      {/* 5. Стили inline */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        Это div с inline стилями
      </div>
    </div>
  );
};

export default Practice;