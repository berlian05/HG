#!/bin/bash

echo "🔄 Перезапуск фронтенда..."

# Остановка фронтенда
echo "⏹️  Останавливаем фронтенд..."
pkill -f "next dev"
sleep 2

# Запуск фронтенда
echo "🌐 Запускаем фронтенд..."
cd /root/HG
npm run dev &
FRONTEND_PID=$!

echo "✅ Фронтенд перезапущен (PID: $FRONTEND_PID)"
echo "🔗 Доступен по адресу: http://localhost:3000" 