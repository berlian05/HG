#!/usr/bin/env python3
import asyncio
import motor.motor_asyncio
from bson import ObjectId

# Настройки подключения к MongoDB
MONGO_URL = "mongodb://localhost:27017"
DATABASE_NAME = "honest_gamble"

async def clear_games():
    """Очищает все игры из базы данных"""
    try:
        # Подключаемся к MongoDB
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
        db = client[DATABASE_NAME]
        
        # Получаем количество игр до очистки
        games_count = await db.games.count_documents({})
        print(f"Найдено игр в базе: {games_count}")
        
        if games_count > 0:
            # Удаляем все игры
            result = await db.games.delete_many({})
            print(f"Удалено игр: {result.deleted_count}")
        else:
            print("Игр в базе не найдено")
            
        # Проверяем, что все игры удалены
        remaining_games = await db.games.count_documents({})
        print(f"Осталось игр в базе: {remaining_games}")
        
        print("✅ База данных очищена от игр!")
        
    except Exception as e:
        print(f"❌ Ошибка при очистке базы данных: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(clear_games()) 