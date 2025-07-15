#!/bin/bash

echo "🔧 Исправление и запуск Telegram Gifts..."
echo "=========================================="

# Проверка версии Node.js
NODE_VERSION=$(node --version 2>/dev/null || echo "не установлен")
echo "Node.js версия: $NODE_VERSION"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Пожалуйста, установите Node.js 18+ или 20+"
    exit 1
fi

# Проверка версии npm
NPM_VERSION=$(npm --version 2>/dev/null || echo "не установлен")
echo "npm версия: $NPM_VERSION"

echo ""
echo "🧹 Очистка старых файлов..."
rm -rf node_modules package-lock.json

echo ""
echo "📦 Создание package.json с проверенными версиями..."
cat > package.json << 'EOF'
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0",
    "lucide-react": "^0.400.0",
    "framer-motion": "^11.5.4",
    "@twa-dev/sdk": "^7.10.1",
    "axios": "^1.7.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.30.1",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react-swc": "^3.10.2",
    "eslint": "^9.30.1",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "vite": "^5.4.8",
    "tailwindcss": "^3.4.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47"
  }
}
EOF

echo ""
echo "📥 Установка зависимостей..."
if npm install; then
    echo "✅ Зависимости установлены успешно!"
else
    echo "⚠️ Ошибка при установке. Попробуем с --legacy-peer-deps..."
    if npm install --legacy-peer-deps; then
        echo "✅ Зависимости установлены с --legacy-peer-deps!"
    else
        echo "❌ Не удалось установить зависимости. Проверьте версию Node.js и npm."
        exit 1
    fi
fi

echo ""
echo "🔍 Проверка установленных пакетов..."
MISSING_PACKAGES=""

if ! npm list react &> /dev/null; then
    MISSING_PACKAGES="$MISSING_PACKAGES react"
fi

if ! npm list react-dom &> /dev/null; then
    MISSING_PACKAGES="$MISSING_PACKAGES react-dom"
fi

if ! npm list vite &> /dev/null; then
    MISSING_PACKAGES="$MISSING_PACKAGES vite"
fi

if ! npm list tailwindcss &> /dev/null; then
    MISSING_PACKAGES="$MISSING_PACKAGES tailwindcss"
fi

if [ -n "$MISSING_PACKAGES" ]; then
    echo "⚠️ Отсутствуют пакеты:$MISSING_PACKAGES"
    echo "Попробуйте установить их вручную:"
    echo "npm install$MISSING_PACKAGES"
    exit 1
fi

echo ""
echo "🎨 Проверка конфигурации..."

# Проверка postcss.config.js
if [ ! -f "postcss.config.js" ]; then
    echo "Создание postcss.config.js..."
    cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF
fi

# Проверка vite.config.js
if [ ! -f "vite.config.js" ]; then
    echo "Создание vite.config.js..."
    cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
})
EOF
fi

echo ""
echo "✅ Все готово!"
echo ""
echo "🚀 Запуск сервера разработки..."
echo "Приложение будет доступно по адресу: http://localhost:5173"
echo ""
echo "Для остановки сервера используйте Ctrl+C"
echo ""

# Запуск сервера разработки
exec npm run dev