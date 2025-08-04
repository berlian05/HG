#!/bin/bash

echo "🔄 Перезапуск бэкенда..."

# Остановка бэкенда
echo "⏹️  Останавливаем бэкенд..."
pkill -f "uvicorn app.main:app"
sleep 2

# Запуск бэкенда
echo "🚀 Запускаем бэкенд..."
cd /root/HG/backend
source venv/bin/activate
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

echo "✅ Бэкенд перезапущен (PID: $BACKEND_PID)"
echo "🔗 API доступен по адресу: http://localhost:8000"
echo "🔗 Health check: http://localhost:8000/health" 