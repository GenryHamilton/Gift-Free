# Деплой на Netlify

Этот проект настроен для автоматического деплоя на Netlify.

## Автоматический деплой (рекомендуется)

### 1. Подключение к Git репозиторию

1. Войдите в [Netlify](https://netlify.com)
2. Нажмите "New site from Git"
3. Выберите ваш Git провайдер (GitHub, GitLab, Bitbucket)
4. Выберите репозиторий с проектом
5. Настройте параметры сборки:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

### 2. Переменные окружения

Если ваше приложение использует переменные окружения, добавьте их в настройках сайта:

1. Перейдите в Site settings > Environment variables
2. Добавьте необходимые переменные (например, API URLs)

Пример переменных:
```
VITE_API_URL=https://your-api-domain.com
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
```

### 3. Настройки домена

После успешного деплоя вы можете:
- Использовать автоматически сгенерированный домен `*.netlify.app`
- Настроить собственный домен в Site settings > Domain management

## Ручной деплой

### Предварительные требования

```bash
# Установка Netlify CLI
npm install -g netlify-cli

# Авторизация
netlify login
```

### Деплой

```bash
# Переход в директорию клиента
cd client

# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Деплой на Netlify
netlify deploy --prod --dir=dist
```

## Конфигурация

Проект уже настроен со следующими файлами:

### `netlify.toml`
- Настройки сборки
- Переадресация для SPA
- Заголовки безопасности
- Кеширование статических ресурсов

### `public/_redirects`
- Резервная настройка переадресации для React Router

### `vite.config.js`
- Оптимизация сборки
- Разделение кода на чанки
- Настройки сервера разработки

## Проверка деплоя

После деплоя проверьте:

1. ✅ Сайт загружается без ошибок
2. ✅ Роутинг работает корректно (обновление страницы не дает 404)
3. ✅ Все статические ресурсы загружаются
4. ✅ API запросы работают (если используются)
5. ✅ Telegram WebApp интеграция функционирует

## Отладка

### Частые проблемы

1. **404 при обновлении страницы**
   - Проверьте наличие `_redirects` файла
   - Убедитесь, что настройки в `netlify.toml` корректны

2. **Проблемы с переменными окружения**
   - Убедитесь, что переменные начинаются с `VITE_`
   - Проверьте настройки в Netlify dashboard

3. **Ошибки сборки**
   - Проверьте логи сборки в Netlify dashboard
   - Убедитесь, что все зависимости указаны в `package.json`

### Логи деплоя

Просмотр логов:
```bash
netlify logs
```

## Дополнительные возможности

### Branch deploys
Netlify автоматически создает превью для каждой ветки

### Deploy previews
Автоматические превью для Pull Requests

### Forms
Netlify поддерживает обработку форм без серверного кода

### Functions
Можно добавить serverless функции в папку `netlify/functions/`

## Полезные ссылки

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)
- [React Router и статический хостинг](https://reactrouter.com/en/main/routers/create-browser-router)