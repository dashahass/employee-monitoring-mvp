#!/bin/bash
# final-deploy.sh

echo "🎉 ФИНАЛЬНЫЙ ДЕПЛОЙ ПРОЕКТА 🎉"
echo "==============================="

# Шаг 1: Проверка зависимостей
echo "1. Проверяем зависимости..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm не установлен!"
    exit 1
fi

echo "✅ Зависимости проверены"

# Шаг 2: Проверка ветки
echo "2. Проверяем ветку Git..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Вы не в ветке main. Текущая ветка: $CURRENT_BRANCH"
    read -p "Продолжить? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Деплой отменен"
        exit 1
    fi
fi

echo "✅ Ветка: $CURRENT_BRANCH"

# Шаг 3: Проверка изменений
echo "3. Проверяем несохраненные изменения..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Обнаружены несохраненные изменения:"
    git status --short
    
    read -p "Закоммитить изменения? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "chore: final deployment preparations"
        echo "✅ Изменения закоммичены"
    else
        echo "❌ Деплой отменен. Сначала сохраните изменения."
        exit 1
    fi
fi

echo "✅ Все изменения сохранены"

# Шаг 4: Проверка типа TypeScript
echo "4. Проверка TypeScript..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Ошибки TypeScript найдены!"
    read -p "Продолжить несмотря на ошибки? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ TypeScript проверен"

# Шаг 5: Линтинг
echo "5. Проверка стиля кода..."
npm run lint
if [ $? -ne 0 ]; then
    echo "⚠️  Предупреждения линтера найдены"
    read -p "Исправить автоматически? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run lint:fix
        echo "✅ Стиль кода исправлен"
    fi
fi

# Шаг 6: Сборка
echo "6. Сборка проекта..."
echo "📦 Запуск production сборки..."
npm run build:prod

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке проекта!"
    exit 1
fi

echo "✅ Проект успешно собран"

# Шаг 7: Анализ бандла
echo "7. Анализ размера бандла..."
BUILD_SIZE=$(du -sh build | cut -f1)
echo "📊 Размер сборки: $BUILD_SIZE"

# Проверяем основные бандлы
JS_FILES_SIZE=$(find build/static/js -name "*.js" -exec du -ch {} + | tail -1 | cut -f1)
CSS_FILES_SIZE=$(find build/static/css -name "*.css" -exec du -ch {} + | tail -1 | cut -f1)

echo "📁 JS файлы: $JS_FILES_SIZE"
echo "🎨 CSS файлы: $CSS_FILES_SIZE"

# Шаг 8: Деплой
echo "8. Деплой на GitHub Pages..."
echo "🌐 Начинаем деплой..."
npm run deploy

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при деплое!"
    exit 1
fi

echo "✅ Деплой успешно завершен!"

# Шаг 9: Финальная информация
echo ""
echo "🎊 ПРОЕКТ УСПЕШНО РАЗВЕРНУТ! 🎊"
echo "================================"
echo ""
echo "🌐 Приложение доступно по адресу:"
echo "   https://dashahass.github.io/employee-monitoring-mvp"
echo ""
echo "📊 Ключевые метрики:"
echo "   - Размер сборки: $BUILD_SIZE"
echo "   - JS файлы: $JS_FILES_SIZE"
echo "   - CSS файлы: $CSS_FILES_SIZE"
echo "   - Ветка: $CURRENT_BRANCH"
echo "   - Время: $(date)"
echo ""
echo "🔗 Полезные ссылки:"
echo "   - Демо: https://dashahass.github.io/employee-monitoring-mvp"
echo "   - GitHub: https://github.com/dashahass/employee-monitoring-mvp"
echo "   - README: https://github.com/dashahass/employee-monitoring-mvp#readme"
echo ""
echo "📝 Для презентации используйте:"
echo "   - Файл README.md в корне проекта"
echo "   - Демо страницу: demo.html"
echo "   - Презентацию в docs/presentation.md"
echo ""
echo "🎯 Тестовые пользователи:"
echo "   - Администратор: admin / admin123"
echo "   - Менеджер: manager / manager123"
echo "   - Пользователь: user / user123"
echo ""
echo "✨ Поздравляю с завершением проекта! ✨"