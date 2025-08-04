import asyncio
from app.core.database import connect_to_mongo, close_mongo_connection, get_database

async def clear_users():
    # Инициализируем подключение к базе данных
    await connect_to_mongo()
    
    db = get_database()
    result = await db.users.delete_many({})
    print(f"Cleared {result.deleted_count} users from database")
    
    # Также очистим игры
    result2 = await db.games.delete_many({})
    print(f"Cleared {result2.deleted_count} games from database")
    
    # Закрываем подключение
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(clear_users()) 