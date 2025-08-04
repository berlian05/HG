#!/bin/bash

echo "🛑 Остановка всех компонентов системы..."

# Остановка всех процессов
echo "⏹️  Останавливаем все процессы..."
pkill -f "uvicorn app.main:app"
pkill -f "python bot.py"
pkill -f "next dev"

echo "✅ Все процессы остановлены"
echo "📊 Проверка оставшихся процессов:"
ps aux | grep -E "(uvicorn|bot.py|next)" | grep -v grep || echo "Нет активных процессов" 