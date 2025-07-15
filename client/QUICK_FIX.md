# ⚡ Быстрое исправление проблем

## 🚨 Если у вас ошибки с зависимостями:

### Вариант 1: Автоматическое исправление
```bash
cd client
chmod +x fix-and-start.sh
./fix-and-start.sh
```

### Вариант 2: Ручное исправление
```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Вариант 3: С флагом legacy-peer-deps
```bash
cd client
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

## 🔧 Если проблемы остаются:

1. **Проверьте версии:**
   ```bash
   node --version  # должна быть 18+ или 20+
   npm --version   # должна быть 8+ или 10+
   ```

2. **Обновите Node.js до LTS версии** (если версия старая)

3. **Очистите npm cache:**
   ```bash
   npm cache clean --force
   ```

## 📱 Что должно работать:

После успешного запуска:
- Сервер запустится на `http://localhost:5173`
- Приложение отобразит интерфейс с подарками
- Дизайн будет в стиле Telegram (темная тема)
- Не будет ошибок в консоли

## 🆘 Если ничего не помогает:

1. Скачайте проект заново
2. Убедитесь, что версия Node.js 18+
3. Откройте issue на GitHub с описанием ошибки

## 📧 Нужна помощь?

Отправьте скриншот ошибки и вывод команд:
```bash
node --version
npm --version
npm list
```

---

**Проект должен запускаться без проблем! 🎉**