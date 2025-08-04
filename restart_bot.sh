#!/bin/bash

echo "🔄 Перезапуск Telegram бота..."

# Остановка бота
echo "⏹️  Останавливаем бота..."
pkill -f "python bot.py"
sleep 2

# Запуск бота
echo "🤖 Запускаем бота..."
cd /root/HG/backend/bot
source venv/bin/activate
python bot.py &
BOT_PID=$!

echo "✅ Бот перезапущен (PID: $BOT_PID)"
echo "📱 Бот готов к работе" 