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
npm install --save-dev crypto-browserify buffer process vite-plugin-node-polyfills
```

### 2. Обновлена конфигурация Vite (`vite.config.js`)
Добавлены алиасы для полифилов и отключено хеширование файлов:
```javascript
plugins: [
  react(),
  nodePolyfills({
    include: ['crypto', 'buffer', 'process']
  })
],
resolve: {
  alias: {
    crypto: 'crypto-browserify',
    buffer: 'buffer',
    process: 'process/browser',
  },
},
build: {
  rollupOptions: {
    output: {
      entryFileNames: 'assets/[name].js',
      chunkFileNames: 'assets/[name].js',
      assetFileNames: 'assets/[name].[ext]'
    }
  }
}
```

### 3. Добавлены глобальные определения
```javascript
define: {
  global: 'globalThis',
  'process.env': {},
  'process.browser': true
},
esbuild: {
  define: {
    global: 'globalThis'
  }
}
```

### 4. Создан кастомный полифил
Создан файл `src/crypto-polyfill.js` с простой реализацией crypto.hash для процесса сборки.

### 5. Обновлен index.html
Добавлена загрузка полифила перед основным скриптом:
```html
<script type="module" src="/src/crypto-polyfill.js"></script>
<script type="module" src="/src/main.jsx"></script>
```

## Результат
- ✅ Сборка проходит успешно локально
- ✅ Отключено хеширование файлов (решает проблему с crypto.hash)
- ✅ Все полифилы установлены и настроены
- ✅ Добавлен кастомный полифил для crypto
- ✅ Готово к деплою на Netlify

## Ключевые изменения
1. **Отключение хеширования**: Файлы теперь именуются без хешей (`index.js` вместо `index-DMH9bzcg.js`)
2. **Плагин полифилов**: Использование `vite-plugin-node-polyfills`
3. **Кастомный полифил**: Простая реализация crypto.hash для процесса сборки

## Дата исправления
$(date) 