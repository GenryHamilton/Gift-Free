# Решение проблем с Telegram Gifts

## Проблема: "Cannot find module 'tailwindcss'"

### Симптомы:
```
Failed to load PostCSS config: Cannot find module 'tailwindcss'
```

### Решение:

1. **Удалите node_modules и package-lock.json:**
```bash
rm -rf node_modules package-lock.json
```

2. **Переустановите зависимости:**
```bash
npm install
```

3. **Если проблема не решена, попробуйте:**
```bash
npm install --legacy-peer-deps
```

## Проблема: "Failed to resolve import"

### Симптомы:
```
Failed to resolve import "react-router-dom" from "src/App.jsx"
Failed to resolve import "@twa-dev/sdk" from "src/hooks/useTelegram.js"
```

### Решение:

1. **Убедитесь, что все зависимости установлены:**
```bash
npm list
```

2. **Если какие-то пакеты отсутствуют, установите их:**
```bash
npm install react-router-dom @twa-dev/sdk framer-motion lucide-react axios
```

3. **Проверьте версию Node.js (должна быть 18+ или 20+):**
```bash
node --version
```

## Проблема: Vite не запускается

### Решение:

1. **Обновите Vite до стабильной версии:**
```bash
npm install vite@^5.0.0 --save-dev
```

2. **Или используйте альтернативную конфигурацию в package.json:**
```json
{
  "devDependencies": {
    "vite": "^5.4.8"
  }
}
```

## Быстрое решение всех проблем

**Запустите этот скрипт для полной переустановки:**

```bash
#!/bin/bash
# Очистка
rm -rf node_modules package-lock.json

# Обновление package.json с проверенными версиями
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

# Установка зависимостей
npm install

# Запуск
npm run dev
```

## Альтернативное решение без Tailwind

Если проблемы с Tailwind не решаются, используйте упрощенную версию без него:

1. **Обновите src/index.css** (используйте обычный CSS вместо Tailwind):
```css
/* Базовые стили без Tailwind */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #17212b;
  color: #ffffff;
}

/* Добавьте нужные стили вручную */
```

2. **Обновите компоненты** для использования inline стилей или обычного CSS.

## Проверка версий

Убедитесь, что у вас установлены правильные версии:

```bash
node --version    # должна быть 18+ или 20+
npm --version     # должна быть 8+ или 10+
```

## Рекомендуемые версии зависимостей

```json
{
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
    "vite": "^5.4.8",
    "tailwindcss": "^3.4.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47"
  }
}
```

## Если ничего не помогает

1. **Клонируйте проект заново**
2. **Используйте упрощенную версию App.jsx** (без внешних зависимостей)
3. **Постепенно добавляйте функциональность**

## Поддержка

Если проблема не решается, создайте issue в GitHub репозитории с подробным описанием ошибки и версиями Node.js/npm.