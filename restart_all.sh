#!/bin/bash

echo "🔄 Перезапуск всех компонентов системы..."

# Остановка всех процессов
echo "⏹️  Останавливаем все процессы..."
pkill -f "uvicorn app.main:app"
pkill -f "python bot.py"
pkill -f "next dev"

# Ждем завершения процессов
sleep 2

# Запуск бэкенда
echo "🚀 Запускаем бэкенд..."
cd /root/HG/backend
source venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
echo "✅ Бэкенд запущен (PID: $BACKEND_PID)"

# Ждем запуска бэкенда
sleep 3

# Запуск бота
echo "🤖 Запускаем Telegram бота..."
cd /root/HG/backend/bot
source venv/bin/activate
python bot.py &
BOT_PID=$!
echo "✅ Бот запущен (PID: $BOT_PID)"

# Ждем запуска бота
sleep 2

# Запуск фронтенда
echo "🌐 Запускаем фронтенд..."
cd /root/HG
npm run dev &
FRONTEND_PID=$!
echo "✅ Фронтенд запущен (PID: $FRONTEND_PID)"

echo ""
echo "🎉 Все компоненты перезапущены!"
echo "📊 Статус процессов:"
echo "   Бэкенд: $BACKEND_PID"
echo "   Бот: $BOT_PID"
echo "   Фронтенд: $FRONTEND_PID"
echo ""
echo "🔗 Ссылки:"
echo "   Фронтенд: http://localhost:3000"
echo "   Бэкенд API: http://localhost:8000"
echo "   Health check: http://localhost:8000/health"
echo ""
echo "💡 Для остановки всех процессов выполните: pkill -f 'uvicorn\|bot.py\|next dev'" 