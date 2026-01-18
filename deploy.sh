#!/bin/bash
# deploy.sh - Скрипт для деплоя на GitHub Pages

set -e  # Выход при ошибке

echo "🚀 Запуск деплоя на GitHub Pages..."
echo "===================================="

# 1. Проверяем, что мы в git репозитории
if [ ! -d ".git" ]; then
    echo "❌ Ошибка: Это не git репозиторий"
    exit 1
fi

# 2. Получаем текущую ветку
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || git rev-parse --abbrev-ref HEAD)
echo "📌 Текущая ветка: $CURRENT_BRANCH"

# 3. Проверяем незакоммиченные изменения
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Обнаружены незакоммиченные изменения:"
    git status --short
    echo ""
    echo "Пожалуйста, закоммитьте изменения перед деплоем:"
    echo "  git add ."
    echo "  git commit -m 'ваше сообщение'"
    exit 1
fi

# 4. Проверяем наличие package.json
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: Файл package.json не найден"
    exit 1
fi

# 5. Проверяем, что npm установлен
if ! command -v npm &> /dev/null; then
    echo "❌ Ошибка: npm не установлен"
    exit 1
fi

# 6. Сборка проекта
echo "📦 Выполняю сборку проекта..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке проекта"
    echo "Попробуйте запустить вручную: npm run build"
    exit 1
fi

# 7. Проверяем папку build
if [ ! -d "build" ]; then
    echo "❌ Ошибка: Папка build не создана после сборки"
    exit 1
fi

echo "✅ Сборка завершена успешно!"
echo "📁 Размер папки build: $(du -sh build | cut -f1)"

# 8. Проверяем установлен ли gh-pages
if ! npm list gh-pages &> /dev/null; then
    echo "📦 Устанавливаю gh-pages..."
    npm install --save-dev gh-pages
fi

# 9. Проверяем настройки в package.json
echo "🔍 Проверяю настройки package.json..."

# Проверяем homepage
if ! grep -q '"homepage"' package.json; then
    echo "⚠️  Внимание: В package.json нет поля 'homepage'"
    echo "Добавьте в package.json:"
    echo '  "homepage": "https://dashahass.github.io/employee-monitoring-mvp",'
    exit 1
fi

# Проверяем скрипт deploy
if ! grep -q '"deploy"' package.json; then
    echo "⚠️  Внимание: В package.json нет скрипта 'deploy'"
    echo "Добавьте в package.json в раздел scripts:"
    echo '  "predeploy": "npm run build",'
    echo '  "deploy": "gh-pages -d build",'
    exit 1
fi

# 10. Выполняем деплой
echo "🌐 Запускаю деплой на GitHub Pages..."
echo "Это может занять несколько минут..."
npm run deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 ДЕПЛОЙ УСПЕШНО ЗАВЕРШЕН! 🎉"
    echo "================================"
    echo ""
    echo "📱 Ваше приложение доступно по адресу:"
    echo "   https://dashahass.github.io/employee-monitoring-mvp"
    echo ""
    echo "⏱️  Время: $(date '+%H:%M:%S %d.%m.%Y')"
    echo ""
    echo "✨ Отличная работа! ✨"
else
    echo "❌ Ошибка при деплое"
    echo ""
    echo "Попробуйте вручную:"
    echo "  npx gh-pages -d build"
    exit 1
fi
