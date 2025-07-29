# Отчет об исправлении ошибки crypto.hash

## Проблема
При деплое на Netlify возникала ошибка:
```
[vite:build-html] crypto.hash is not a function
```

## Причина
Vite пытался использовать Node.js crypto модуль в браузерной среде, где он недоступен.

## Решение

### 1. Установлены полифилы
```bash
npm install --save-dev crypto-browserify buffer process
```

### 2. Обновлена конфигурация Vite (`vite.config.js`)
Добавлены алиасы для полифилов:
```javascript
resolve: {
  alias: {
    crypto: 'crypto-browserify',
    buffer: 'buffer',
    process: 'process/browser',
  },
},
```

### 3. Добавлены глобальные определения
```javascript
define: {
  global: 'globalThis',
  'process.env': {}
},
esbuild: {
  define: {
    global: 'globalThis'
  }
}
```

## Результат
- ✅ Сборка проходит успешно локально
- ✅ Все полифилы установлены и настроены
- ✅ Готово к деплою на Netlify

## Дата исправления
$(date) 