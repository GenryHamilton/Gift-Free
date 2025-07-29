# 🚀 Быстрый деплой на Netlify

## Вариант 1: Автоматический деплой (рекомендуется)

### 1. Подготовка репозитория
```bash
# Убедитесь, что все изменения закоммичены
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### 2. Деплой через Netlify Dashboard
1. Зайдите на [netlify.com](https://netlify.com)
2. Нажмите "New site from Git"
3. Выберите ваш GitHub репозиторий
4. Настройте параметры:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 3. Настройка переменных окружения
В настройках сайта добавьте:
```
VITE_APP_TITLE=Telegram Gifts
VITE_APP_VERSION=1.0.0
```

## Вариант 2: Деплой через CLI

### 1. Установка Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Логин и деплой
```bash
# Переход в папку клиента
cd client

# Логин в Netlify
netlify login

# Инициализация проекта
netlify init

# Сборка и деплой
npm run build
netlify deploy --prod
```

## Проверка деплоя

### Локальная проверка
```bash
cd client
npm run build
npm run preview
```

### Проверка на Netlify
1. Откройте ваш сайт
2. Проверьте все функции
3. Проверьте мобильную версию
4. Проверьте консоль на ошибки

## Настройка Telegram Web App

### 1. Добавление домена в бота
После деплоя добавьте ваш домен в настройки Telegram бота:
- Перейдите в @BotFather
- Выберите вашего бота
- Настройте Web App URL

### 2. Тестирование в Telegram
1. Откройте бота в Telegram
2. Нажмите на кнопку Web App
3. Проверьте все функции

## Файлы конфигурации

Проект уже настроен со следующими файлами:

- ✅ `client/netlify.toml` - конфигурация Netlify
- ✅ `client/public/_redirects` - редиректы для SPA
- ✅ `client/DEPLOYMENT.md` - подробная инструкция

## Troubleshooting

### Проблемы с роутингом
Проверьте файл `client/public/_redirects`

### Проблемы с переменными окружения
Убедитесь, что переменные начинаются с `VITE_`

### Проблемы с Telegram Web App
Проверьте, что домен добавлен в настройках бота

## Полезные команды

```bash
# Локальная разработка
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр
npm run preview

# Проверка линтером
npm run lint
```